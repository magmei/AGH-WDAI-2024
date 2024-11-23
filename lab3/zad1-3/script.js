var toggled = false;
var timer = document.getElementById("timer");
var seconds = 0;
var minutes = 0;

function addTime() {
  if (toggled == true) {
    seconds += 1;
    minutes = Math.floor(seconds / 60);
    var nominutes = seconds + "s";
    var withminutes = minutes + "min " + (seconds % 60) + "s";
    if (seconds < 60) {
      timer.innerHTML = nominutes;
    } else {
      timer.innerHTML = withminutes;
    }
  }
}

var Timer = window.setInterval(addTime, 1000);

function resetTimer() {
  seconds = 0;
  timer.innerHTML = "0s";
  clearInterval(Timer);
  Timer = setInterval(addTime, 1000);
}
