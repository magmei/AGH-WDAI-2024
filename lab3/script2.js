const chars_basic = "abcdefghijklmnopqrstuvwxyz0123456789";
const chars_special = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]<>.,";
const chars_large = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const chars_large_special = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]<>.,";

function getRandomInt(min_len, max_len) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function gen() {
    var min_len = document.getElementById("min-len").value;
    var max_len = document.getElementById("max-len").value;
    var large_let = document.getElementById("large-letters").checked;
    var special_signs = document.getElementById("special-signs").checked;
    var letters = "";
    var len = getRandomInt(min_len, max_len);

    if (large_let==true) {
        if (special_signs==true) {
            letters = chars_large_special;
        } else {
            letters = chars_large;
        }
    } else {
        if (special_signs==true) {
            letters = chars_special;
        } else {
            letters = chars_basic;
        }
    }

    let letters_len = letters.length;

    let res="";
    let cnt = 0;
    while (cnt < letters_len) {
        res+=letters.charAt(getRandomInt(0, letters_len));
        counter+=1
    }

    alert(res);
}