const uiStyles = `
canvas {
	pointer-events: none;
	border: #ffcc29 3px solid;
	box-sizing: border-box;
	border-top-width: 45px;
}

#replay-panel {
	height: 45px;
    z-index: 100;
    position: absolute;
    top: 0;
    font-family: 'Arial';
    color: #000000;
    display: flex;
	width: 100%;
    align-items: baseline;
    justify-content: center;
	font-size: 20px;
	font-weight: 700;
}

#replay-panel button {
	height: 35px;
    line-height: 1;
	cursor: pointer;
    padding: 6px 23px;
    background: #ff8f00;
    margin: 5px;
    border-radius: 18px;
    font-size: 17px;
	font-weight: 700;
}

#replay-panel button:hover {
	outline: 1px solid #774400;
	outline-offset: 2px;
}

#replay-panel button:disabled {
	pointer-events: none;
	cursor: unset;
	opacity: 0.5;
}

.highlight {
	animation: highlight 1s ease 0s infinite normal forwards;
	outline-offset: 2px;
	outline: 3px solid #ff0000;
}

#pause-message {
	animation: flash 1s ease 0s infinite normal forwards;
    position: absolute;
	font-family: 'Arial';
    color: #ffffff;
	top: 43vh;
    font-size: 400%;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

@keyframes highlight {
	0%,
	100% {
		outline-color: #ff0000;
	}
	50% {
		outline-color: #ffcc29;
	}
}

@keyframes flash {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
`;

const uiHtml = `
    <button id="x1btn">×1</button>
    <button id="x2btn">×2</button>
    <button id="x4btn">×4</button>
    <span>replay</span>
    <button id="restartButton">⏮</button>
    <button id="playBtn"></button>
    <div id="pause-message">P A U S E</div>
`;

const GameEvent = {
  START_LOADING: "start_loading",
  GAME_RESOURCES_LOADED: "game_resources_loaded",
  GAME_LOADED: "game_loaded",
  GAME_INITIALIZED: "game_initialized",
  ACTION_EXEC: "action_exec",
  BET_CHANGED: "bet_changed",
  FINISH_SPIN_ANIMATIONS: "finish_spin_animations",
  FINISH_ROUND_ANIMATIONS: "finish_round_animations",
  API_RESPONSE: "api_response",
  BALANCE_UPDATE: "balance_update",
  BUTTON_CLICK: 'button-click',
  PRE_PLAY: "pre_play",
  PLAY: "play",
  AUTOSPINS_STOPPED: "autospins_stopped",
  GO_HOME: "go_home",
  SET_SKIN: "set_skin",
  ERROR: "game_error",
  SET_LINES_COUNT: "set_lines_count",

  CUSTOM_EVENT: "custom_event",

  PLAY_REPLAY: "play_replay",
  RESTART_GAME: 'restart_game',
  SET_SPEED: 'set_speed',

  GAME_UI_BET_PANEL_OPENED: "game_ui_bet_panel_opened",
  GAME_UI_BET_PANEL_CLOSED: "game_ui_bet_panel_closed",
  GAME_UI_SETTINGS_OPENED: "game_ui_settings_opened",
  GAME_UI_SETTINGS_CLOSED: "game_ui_settings_closed",
  GAME_UI_RULES_OPENED: "game_ui_rules_opened",
  GAME_UI_RULES_CLOSED: "game_ui_rules_closed",
  GAME_UI_PAYTABLE_OPENED: "game_ui_paytable_opened",
  GAME_UI_PAYTABLE_CLOSED: "game_ui_paytable_closed",
  GAME_UI_AUTOSPINS_PANEL_OPENED: "game_ui_autospins_panel_opened",
  GAME_UI_AUTOSPINS_PANEL_CLOSED: "game_ui_autospins_panel_closed",
  GAME_UI_QUICK_SPIN_OFFER_OPENED: "game_ui_quick_spin_offer_opened",
  GAME_UI_QUICK_SPIN_OFFER_CLOSED: "game_ui_quick_spin_offer_closed",
};

class Replays {
  constructor() {
    if (!this.isReplayMode()) {
      return;
    }

    this.gameEventHandler = this.gameEventHandler.bind(this);

    if (!window.trackGameEventListeners) {
      window.trackGameEventListeners = [];
    }

    window.trackGameEventListeners.push(this.gameEventHandler);
  }

  gameEventHandler(eventName, targetName, context) {
    switch (eventName) {
      case GameEvent.START_LOADING:
        this.initStyles();
        break;

      case GameEvent.GAME_INITIALIZED:
        this.initGame();
        break;
    }
  }

  sendEvent(eventName, targetName, context) {
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          targetName,
          context,
        },
      })
    );
  }

  initGame() {
    this.speed = 1;
    this.started = false;

    this.initView();
  }

  isReplayMode() {
    return Boolean(window.__OPTIONS__?.replay);
  }

  initStyles() {
    if (this.stylesInitialized) {
      return;
    }

    this.applyCSS(uiStyles);
    this.stylesInitialized = true;
  }

  initView() {
    if (this.viewInitialized) {
      return;
    }

    const replayPanel = document.createElement("div");
    replayPanel.id = "replay-panel";
    replayPanel.innerHTML = uiHtml;

    document.body.appendChild(replayPanel);

    this.x1btn = document.getElementById("x1btn");
    this.x2btn = document.getElementById("x2btn");
    this.x4btn = document.getElementById("x4btn");
    this.restartButton = document.getElementById("restartButton");
    this.playBtn = document.getElementById("playBtn");
    this.pauseMessage = document.getElementById("pause-message");

    this.addButtonEventListeners();
    this.refreshView();

    this.viewInitialized = true;
  }

  addButtonEventListeners() {
    this.x1btn.addEventListener("pointerdown", () => {
      this.setSpeed(1);
    });

    this.x2btn.addEventListener("pointerdown", () => {
      this.setSpeed(2);
    });

    this.x4btn.addEventListener("pointerdown", () => {
      this.setSpeed(4);
    });

    this.restartButton.addEventListener("pointerdown", () => {
      this.paused = false;
      this.started = false;
      this.sendEvent(GameEvent.RESTART_GAME, "restartButton", {});
    });

    this.playBtn.addEventListener("pointerdown", () => {
      if (!this.started) {
        this.startReplay();
      } else {
        this.paused = !this.paused;
        this.sendEvent(GameEvent.SET_SPEED, "", {
          speed: this.paused ? 0 : this.speed,
        });
        this.refreshView();
      }
    });
  }

  startReplay() {
    this.started = true;
    this.sendEvent(GameEvent.PLAY_REPLAY, "", {});
    this.refreshView();
  }

  setSpeed(val) {
    this.speed = val;
    this.sendEvent(GameEvent.SET_SPEED, "", {
      speed: val,
    });
    this.refreshView();
  }

  refreshView() {
    this.playBtn.innerText = !this.started || this.paused ? "⏵" : "⏸";
    this.pauseMessage.style.display = !this.started || this.paused ? "block" : "none";

    if (!this.started) {
      this.playBtn.classList.add("highlight");
    } else {
      this.playBtn.classList.remove("highlight");
    }
    this.restartButton.disabled = !this.started;
    this.x1btn.disabled = this.speed === 1;
    this.x2btn.disabled = this.speed === 2;
    this.x4btn.disabled = this.speed === 4;
  }

  applyCSS(css) {
    let head = document.head || document.getElementsByTagName("head")[0];
    let style = document.createElement("style");

    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  }
}

new Replays();
//# sourceMappingURL=replays.js.map