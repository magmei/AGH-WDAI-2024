const crosshair = document.querySelector("#crosshair");
const board = document.querySelector("#board");
const scoreDisplay = document.querySelector("#score");
const startBox = document.querySelector("#start-box");
const resetBox = document.querySelector("#reset-box");
const shift = 200;
const mainMusic = new Audio("../sounds/main-music.mp3");
const hitSound = new Audio("../sounds/bonk.ogg");
const oofSound = new Audio("../sounds/groan4.ogg");
const sadMusic = new Audio("../sounds/sad-music.mp3");
let zombiesDict = {};

let score = 20;
let zombie_index = 0;
let health = 3;

function getRandomInt(min, max) {
  return Math.floor(getRandomNum(min, max));
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.random() * (max - min) + min;
}

function crosshairMove(e) {
  crosshair.style.top = e.pageY + "px";
  crosshair.style.left = e.pageX + "px";
}

function createZombie() {
  let speed = getRandomInt(10, 31);
  let size = getRandomNum(1, 2);
  let dist = getRandomNum(15, 19);

  placeZombie(speed, size, dist);
}

function placeZombie(speed, size, dist) {
  let zombie = document.createElement("div");
  zombie.classList.add("zombie");
  zombie.setAttribute("id", zombie_index);
  zombie.style.bottom = dist + "vh";
  zombie.style.left = "100vw";
  zombie.style.transform = "scale(" + size + ")";
  board.appendChild(zombie);
  zombie_index++;

  zombie.addEventListener("click", shotHit);
  moveZombie(zombie, speed);
}

function moveZombie(zombie, speed) {
  let zombieSpriteStage = 0;
  let position = 0;

  zombiesDict[zombie.id] = setInterval(() => {
    zombie.style.backgroundPositionX = zombieSpriteStage + shift + "px";
    zombie.style.left = 100 - position + "vw";
    zombieSpriteStage -= shift;
    position++;

    if (zombieSpriteStage == -1800) {
      zombieSpriteStage = 0;
    }

    if (position == 110) {
      oofSound.play();
      zombie.remove();
      health -= 1;
      console.log(health);
      for (i = health; i < 3; i++) {
        document.querySelectorAll(".heart")[i].src = "../img/empty_heart.png";
      }

      if (health <= 0) {
        gameEnd();
      }

      clearInterval(zombiesDict[zombie.id]);
    }
  }, speed);
}

function shotHit() {
  hitSound.play();
  score += 25;
  scoreDisplay.textContent = score;

  clearInterval(zombiesDict[this.id]);
  this.remove();
}

function shotMissed() {
  hitSound.play();
  score -= 5;
  scoreDisplay.textContent = score;
  if (score <= 0) {
    gameEnd();
  }
}

function gameLoad() {
  health = 3;
  score = 20;
  mainMusic.load();
  startBox.style.transform = "translateY(200%)";
  mainMusic.volume = 0.1;
  mainMusic.loop = true;
  mainMusic.play();
  document.body.style.cursor = "none";
  window.addEventListener("mousemove", crosshairMove);
  board.addEventListener("click", shotMissed);
  zombiesSpawning = setInterval(() => {
    createZombie();
  }, 1000);
}

function gameEnd() {
  sadMusic.load();
  sadMusic.volume = 0.1;
  sadMusic.loop = true;
  sadMusic.play();
  clearInterval(zombiesSpawning);
  mainMusic.pause();
  Object.keys(zombiesDict).forEach(function (key) {
    clearInterval(zombiesDict[key]);
  });
  document.querySelector("#final-score").textContent = score;
  board.removeEventListener("click", shotMissed);
  window.removeEventListener("mousemove", crosshairMove);
  console.log(":(");
  document.body.style.cursor = "default";
  resetBox.style.transform = "translateY(0%)";
}

function gameReset() {
  sadMusic.pause();
  resetBox.style.transform = "translateY(200%)";
  for (i = 0; i < 3; i++)
    document.querySelectorAll(".heart")[i].src = "../img/full_heart.png";

  let zombies = document.querySelectorAll(".zombie");
  for (i = 0; i < zombies.length; i++) {
    zombies[i].remove();
  }
  scoreDisplay.textContent = 20;
  gameLoad();
}
