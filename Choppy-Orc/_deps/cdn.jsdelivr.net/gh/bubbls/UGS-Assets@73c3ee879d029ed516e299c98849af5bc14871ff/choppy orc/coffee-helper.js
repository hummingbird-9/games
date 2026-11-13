window.autosplitter = {};

var oneChestLevels = [2, 3, 5, 8, 11, 13, 14, 15];

window.stats = function() {
  var stats = getStats();
  for (i = 1; i <= 15; i++) {
    console.log("Level " + i + ": " + (stats[i - 1] || 0) + " run resets.");
  }
  console.log((stats[15] || 0) + " game finishes.");
}

var wrs = ["3.10", "2.77", "4.03", "3.38", "2.24", "4.86", "6.21", "3.94", "4.50", "5.66", "4.00", "3.90", "10.43", "4.72", "2.66"];

function chestsInLevel(num) {
  return oneChestLevels.includes(num) ? 1 : 2;
}

var state = {
  hasReset: false,
  previousTime: null,
  lastTime: null,
  damselTime: NaN,
  level: NaN,
  menu: true,
  damselCount: 0,
  levelStart: null
}

function showTime() {
  return ((state.lastTime - state.levelStart) / 1000).toFixed(2);
}

window.autosplitter.onSound = function(sound) {
  // console.log(sound);
  if (sound == "damsel") {
    state.damselTime = state.lastTime;
    state.damselCount += 1;
    // console.log("chest " + state.damselCount + " at " + showTime());
  }
}

window.autosplitter.onScene = function(name) {
  var previousState = JSON.parse(JSON.stringify(state));

  // console.log(state.lastTime - state.damselTime); // log load time

  document.getElementById("timer1").innerText = "0.00";
  document.getElementById("timer2").innerText = "0.00";

  state.level = parseInt(name.slice(5, 10));
  state.menu = name === "Menu" || (Number.isNaN(state.level));
  if (!state.menu) {
    document.getElementById("wr").innerText = wrs[state.level - 1];
  } else {
    document.getElementById("wr").innerText = "0.00";
  }
  state.damselCount = 0;
  state.levelStart = state.lastTime;
}

window.autosplitter.onUpdate = function(time) {
  state.previousTime = state.lastTime;
  state.lastTime = time;
  if (!state.menu && state.damselCount < chestsInLevel(state.level)) {
    var id = (state.damselCount == 0) ? "timer1" : "timer2";
    document.getElementById(id).innerText = showTime();
  }
}