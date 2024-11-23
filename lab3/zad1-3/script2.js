const chars_basic = "abcdefghijklmnopqrstuvwxyz0123456789";
const chars_special =
  "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]<>.,";
const chars_large =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const chars_large_special =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]<>.,";

function getRandomInt(min_len, max_len) {
  return Math.floor(Math.random() * (max_len - min_len + 1)) + min_len;
}

function gen() {
  var min_len = parseInt(document.getElementById("min-len").value);
  var max_len = parseInt(document.getElementById("max-len").value);
  var large_let = document.getElementById("large-letters").checked;
  var special_signs = document.getElementById("special-signs").checked;
  var letters = "";
  var len = getRandomInt(min_len, max_len);

  if (large_let == true) {
    if (special_signs == true) {
      letters = chars_large_special;
    } else {
      letters = chars_large;
    }
  } else {
    if (special_signs == true) {
      letters = chars_special;
    } else {
      letters = chars_basic;
    }
  }

  let letters_len = letters.length;

  let res = "";
  let cnt = 0;
  while (cnt < len) {
    res += letters.charAt(getRandomInt(0, letters_len));
    cnt += 1;
  }

  alert(res);
}
