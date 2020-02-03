'use strict';
// var gTimer;
// var gSec = 0
var gLastNum;
var nextNum;
var gTime = 0;
var status = 0;
var gClickCount = 0;

function init() {
    createBoard()
}

function createBoard(num = 16) {
    resetGame()
    gLastNum = num
    var size = Math.sqrt(num)
    var nums = shuffleNums(num)
    var strHtml = ''
    for (var i = 0; i < size; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < size; j++) {
            var randNum = nums.pop()
            strHtml += `<td onclick="cellClicked(this)">${randNum}</td>`
        }

        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(elClickedNum) {

    var num = +elClickedNum.innerText;
    if (num === 1) {
        startTimer()
    }

    if (num === nextNum) {
        gClickCount++
        nextNum++
        elClickedNum.style.backgroundColor = "#000000";
    }
    if (gClickCount === gLastNum) {
        stopTimer()
    }
    return nextNum
}

function shuffleNums(length) {
    var nums = []
    var counter = 1
    for (var i = 0; i < length; i++) {
        nums.push(counter++)
    }
    for (var i = nums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    return nums;
}



function resetGame() {
    gClickCount = 0;
    resetTimer()
    nextNum = 1

}


function timer() {
    var elTimer = document.querySelector('.timer')

    gSec += 0.01
    elTimer.innerText = gSec.toFixed(3)
}


function resetTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '00:00:00';
    gSec = 0;
}


function startTimer() {
    status = 1;
    timer();

}

function resetTimer() {
    status = 0;
    gTime = 0;

    document.querySelector(".timer").innerHTML = "00:00:00";
}

function stopTimer() {
    status = 0;

}

function timer() {

    if (status == 1) {
        setTimeout(function () {
            gTime++;
            var min = Math.floor(gTime / 100 / 60);
            var sec = Math.floor(gTime / 100);
            var mSec = gTime % 100;

            if (min < 10) {
                min = "0" + min;
            }
            if (sec >= 60) {
                sec = sec % 60;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            document.querySelector(".timer").innerHTML = min + ":" + sec + ":" + mSec;
            timer();

        }, 10)
    }
}