var ytgamehelper = {
  /////////////////// variable ///////////////////
  version: 240920, // yymmddhhmm
  playableSave: {},
  inPlayablesEnv: !false,
  isDataReady: false,
  isGameReady: false,
  language: "en",
  isDataChange: false,
  dataLayerSize: 0,
	audioEnabled: true,
  g_MM: true,
  g_HIDE: true,
  g_SHOW: true,
  w_blur: true,
  w_focus: true,
  w_onPause: false,
  w_onResume: false,

  post: {
    // clone from v3Obj
    Main_Menu: {
      id: -1,
    },
  },
  /////////////////// functions ///////////////////

  myConsoleLog(...args) {
    if (this.isDebug) {
      console.log(...args);
    }
  },
  myAlert(...args) {
    if (this.isAlert) {
      alert(args.join(" "));
    }
    this.myConsoleLog(...args);
  },
  myAlertAsync(...args) {
    if (this.isDebug) {
      this.myAlert(...args);
      return new Promise((resolve) => setTimeout(resolve, 500));
    }
  },

  saveData() {
    if (ytgamehelper.inPlayablesEnv && ytgamehelper.isDataReady) {
      ytgamehelper.myConsoleLog("Saving data.....");
      ytgame.game.saveData(JSON.stringify(ytgamehelper.playableSave)).then(
        () => {
          // Handle data save success.
          ytgamehelper.isDataChange = false;
          ytgamehelper.myConsoleLog("Saved data.....");
        },
        (e) => {
          // Handle data save failure.
          console.error(e);
          // Send an error to YouTube when this happens.
          ytgame.health.logError();
        }
      );
    }
  },

  isAudioEnabled() {
    if (ytgamehelper.inPlayablesEnv) {
      //return ytgame.system.isAudioEnabled();
			return this.audioEnabled;
    }
    return true;
  },

  async initAsPlayable() {
    // Hold the YouTube Playable pause/resume callbacks.
    let unsetOnPause;
    let unsetOnResume;

    unsetOnPause = ytgame.system.onPause(() => {
      this.myConsoleLog(ytgamehelper.version, "ytgame.system.onPause");

      Object.defineProperty(document, "hidden", {
        value: true,
        writable: true,
      });
      document.dispatchEvent(
        new CustomEvent("visibilitychange", {
          detail: {
            ytGame: true,
            hidden: true,
          },
        })
      );

      if (ytgamehelper.w_onPause) {
        if(window.WebAudioPlayer && window.WebAudioPlayer.context && window.WebAudioPlayer.context.state != "running"){
          ytgamehelper.myConsoleLog("WebAudioPlayer.context.suspend");
          WebAudioPlayer.context.suspend();
        }else if(window.cc && window.cc.sys && window.cc.sys.__audioSupport && window.cc.sys.__audioSupport.context && window.cc.sys.__audioSupport.context.state != "running"){
          ytgamehelper.myConsoleLog("__audioSupport.context.suspend");
          window.cc.sys.__audioSupport.context.suspend();
        }
      }
    });

    unsetOnResume = ytgame.system.onResume(() => {
      this.myConsoleLog(ytgamehelper.version, "ytgame.system.onResume");

      Object.defineProperty(document, "hidden", {
        value: false,
        writable: true,
      });
      document.dispatchEvent(
        new CustomEvent("visibilitychange", {
          detail: {
            ytGame: true,
            hidden: false,
          },
        })
      );

      if (ytgamehelper.w_onResume) {
        var resumeSoundITV = setInterval(function(){
          if(window.WebAudioPlayer && window.WebAudioPlayer.context && window.WebAudioPlayer.context.state == "running" || window.cc && window.cc.sys && window.cc.sys.__audioSupport && window.cc.sys.__audioSupport.context && window.cc.sys.__audioSupport.context.state == "running"){
            clearInterval(resumeSoundITV);
            ytgamehelper.myConsoleLog("clearInterval, resumeSoundITV");
          }
          if(window.WebAudioPlayer && window.WebAudioPlayer.context && window.WebAudioPlayer.context.state != "running"){
            ytgamehelper.myConsoleLog("WebAudioPlayer.context.resume");
            WebAudioPlayer.context.resume();
          }else if(window.cc && window.cc.sys && window.cc.sys.__audioSupport && window.cc.sys.__audioSupport.context && window.cc.sys.__audioSupport.context.state != "running"){
            ytgamehelper.myConsoleLog("__audioSupport.context.resume");
            window.cc.sys.__audioSupport.context.resume();
          }
        }, 500);
      }
    });

    // Generally, it is best to wait for this data to avoid race conditions or
    // the need to merge with conflicting data.
    const data = await ytgame.game.loadData();

    if (data && data !== "") {
      // Process data to resume game state.
      try {
        this.playableSave = JSON.parse(data);
        console.debug("Loaded Playable save:");
        console.debug(this.playableSave);
        this.isDataReady = true;
      } catch (e) {
        // On error, the game starts from scratch.
        this.playableSave = {};

        // This isn't ideal, so log an error.
        console.error(e);
        // Send an error to YouTube when this happens.
        ytgame.health.logError();
      }
    } else {
      this.playableSave = {};
      this.isDataReady = true;
    }
		//if(this.isDataReady)
		{
			loadGame();
		}

    this.language = await ytgame.system.getLanguage();
    Object.defineProperty(navigator, "language", { value: this.language });

    // Handle the audio changing state from YouTube.
    ytgame.system.onAudioEnabledChange((isAudioEnabled) => {
      console.debug(
        `onAudioEnabledChange() - isAudioEnabled: [${isAudioEnabled}]`
      );
      window.dispatchEvent(
        new CustomEvent("audioChange", {
          detail: { enable: isAudioEnabled },
        })
      );
      if (isAudioEnabled) {
        // Allow audio.
        this.audioEnabled = true;
      } else if (!isAudioEnabled) {
        // Disable audio.
        this.audioEnabled = false;
      }
    });
		this.audioEnabled = ytgame.system.isAudioEnabled();
  },

  erudaCheck() {
    if (this.isDebug || this.urlParams.get("eruda") === "true") {
      (function () {
        var script = document.createElement("script");
        // script.src = "//cdn.jsdelivr.net/npm/eruda";
        script.src = "eruda.js";
        document.body.appendChild(script);
        script.onload = function () {
          eruda.init();
        };
      })();
    }
  },
  async init() {
    this.inPlayablesEnv =
      typeof ytgame !== "undefined" && ytgame.IN_PLAYABLES_ENV;
    this.urlQueryString = window.location.search;
    this.urlParams = new URLSearchParams(this.urlQueryString);
    // update var
    this.isDebug = this.urlParams.get("debug") === "true";
    this.isAlert = this.urlParams.get("alert") === "true";
    this.myConsoleLog(this.version, this.init.name);

    this.erudaCheck();

    if (this.inPlayablesEnv) {
      // Send first frame ready now that we've started to draw.
      ytgame.game.firstFrameReady();

      await this.initAsPlayable();
    } else {
      this.playableSave = {};
			loadGame();
    }

    window.aSContext = null
    
    
    this.myConsoleLog(this.version, this.init.name);
  },
};

window.addEventListener(
  "focus",
  function (event) {
    ytgamehelper.myConsoleLog("addEventListener", "focus");
    if (ytgamehelper.w_focus) {
      var resumeSoundITV = setInterval(function(){
        if(window.WebAudioPlayer && window.WebAudioPlayer.context && window.WebAudioPlayer.context.state == "running" || window.cc && window.cc.sys && window.cc.sys.__audioSupport && window.cc.sys.__audioSupport.context && window.cc.sys.__audioSupport.context.state == "running"){
          clearInterval(resumeSoundITV);
				  ytgamehelper.myConsoleLog("clearInterval, resumeSoundITV");
        }
        if(window.WebAudioPlayer && window.WebAudioPlayer.context && window.WebAudioPlayer.context.state != "running"){
				  ytgamehelper.myConsoleLog("WebAudioPlayer.context.resume");
          WebAudioPlayer.context.resume();
        }else if(window.cc && window.cc.sys && window.cc.sys.__audioSupport && window.cc.sys.__audioSupport.context && window.cc.sys.__audioSupport.context.state != "running"){
				  ytgamehelper.myConsoleLog("__audioSupport.context.resume");
          window.cc.sys.__audioSupport.context.resume();
        }
      }, 500);
    }
    event.stopImmediatePropagation();
  },
  true
);
window.addEventListener(
  "blur",
  function (event) {
    ytgamehelper.myConsoleLog("addEventListener", "blur");
    if (ytgamehelper.w_blur) {
      if(window.WebAudioPlayer && window.WebAudioPlayer.context && window.WebAudioPlayer.context.state != "running"){
			  ytgamehelper.myConsoleLog("WebAudioPlayer.context.suspend");
        WebAudioPlayer.context.suspend();
      }else if(window.cc && window.cc.sys && window.cc.sys.__audioSupport && window.cc.sys.__audioSupport.context && window.cc.sys.__audioSupport.context.state != "running"){
			  ytgamehelper.myConsoleLog("__audioSupport.context.suspend");
        window.cc.sys.__audioSupport.context.suspend();
      }
    }
    event.stopImmediatePropagation();
  },
  true
);
document.addEventListener(
  "visibilitychange",
  function (event) {
		ytgamehelper.myConsoleLog("addEventListener", "visibilitychange", event);

    if (!event.detail || !event.detail.ytGame) event.stopImmediatePropagation();
  },
  !true
);
document.addEventListener(
  "webkitvisibilitychange",
  function (event) {
		ytgamehelper.myConsoleLog("addEventListener", "webkitvisibilitychange", event);

    if (!event.detail || !event.detail.ytGame) event.stopImmediatePropagation();
  },
  !true
);
document.addEventListener(
  "mozvisibilitychange",
  function (event) {
		ytgamehelper.myConsoleLog("addEventListener", "mozvisibilitychange", event);

    if (!event.detail || !event.detail.ytGame) event.stopImmediatePropagation();
  },
  !true
);
document.addEventListener(
  "msvisibilitychange",
  function (event) {
		ytgamehelper.myConsoleLog("addEventListener", "msvisibilitychange", event);

    if (!event.detail || !event.detail.ytGame) event.stopImmediatePropagation();
  },
  !true
);
window.addEventListener("sendScore", (event) => {
	ytgamehelper.myConsoleLog("addEventListener", "sendScore", event);

  const score = event.detail.score;

  if (!event.detail) {
    return;
  }

  if (score) {
    sendScore(score);
  }
});
const sendScore = (newScore) => {
  if (ytgamehelper.inPlayablesEnv) {
    ytgame.engagement.sendScore({ value: newScore });
  }
};

const cusLocalStorage = {
  get length() {
    return Object.keys(ytgamehelper.playableSave).length;
  },

  key(n) {
    if (n >= Object.keys(ytgamehelper.playableSave).length) return null;
    return Object.keys(ytgamehelper.playableSave)[n];
  },

  getItem(key) {
    return ytgamehelper.playableSave[key]
      ? ytgamehelper.playableSave[key]
      : null;
  },

  setItem(key, value) {
    ytgamehelper.playableSave[key] = value;
    ytgamehelper.isDataChange = true;
  },

  removeItem(key) {
    delete ytgamehelper.playableSave[key];
    ytgamehelper.isDataChange = true;
  },

  clear() {
    ytgamehelper.playableSave = {};
    ytgamehelper.isDataChange = true;
  },
};

/*Storage.prototype._setItem = Storage.prototype.setItem
	Storage.prototype._getItem = Storage.prototype.getItem
	Storage.prototype.length = Storage.prototype.getLength
	Storage.prototype._key = Storage.prototype.key
	Storage.prototype._clear = Storage.prototype.clear
	Storage.prototype._removeItem = Storage.prototype.removeItem

	Storage.prototype.getLength = function() {
		return Object.keys(ytgamehelper.playableSave).length;
	}

	Storage.prototype.key = function(n) {
		if(n >= Object.keys(ytgamehelper.playableSave).length)
				return null;
			return Object.keys(ytgamehelper.playableSave)[n];
	}

	Storage.prototype.setItem = function(key, value) {
		ytgamehelper.playableSave[key] = value;
	}

	Storage.prototype.getItem = function(key) {
		return ytgamehelper.playableSave[key] ? ytgamehelper.playableSave[key] : null;
	}

	Storage.prototype.removeItem = function(key) {
		delete ytgamehelper.playableSave[key];
	}

	Storage.prototype.clear = function() {
		ytgamehelper.playableSave = {};
	}*/

window.addEventListener("DOMContentLoaded", () => {
  Object.defineProperty(window, "localStorage", {
    value: cusLocalStorage,
    //configurable: true,
    //enumerable: true,
    writable: false,
  });
  ytgamehelper.init();
  var reviewGALayer = setInterval(function () {
    for (i = 0; i < window.dataLayer.length; i++) {
      if (window.dataLayer[i].ga_action === "Main Menu") {
        if (!ytgamehelper.isGameReady) {
          ytgamehelper.isGameReady = true;

          ytgame.game.gameReady();
          ytgamehelper.myConsoleLog(ytgamehelper.version, "game ready");
          break;
        }
        //clearInterval(reviewGALayer);
      }
    }
    if (
      ytgamehelper.isDataChange &&
      ytgamehelper.dataLayerSize < window.dataLayer.length
    ) {
      ytgamehelper.dataLayerSize = window.dataLayer.length;
      ytgamehelper.saveData();
    }
  }, 200);
});
ytgamehelper.myConsoleLog(ytgamehelper.version, "load");