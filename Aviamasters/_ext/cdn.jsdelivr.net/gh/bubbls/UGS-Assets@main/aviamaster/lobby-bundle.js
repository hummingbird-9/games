! function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {},
      n = (new e.Error).stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "7296ad89-40b9-5280-a0ff-c101fe6a1457")
  } catch (e) {}
}();
var E = Object.defineProperty;
var p = (t, s, _) => s in t ? E(t, s, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: _
}) : t[s] = _;
var o = (t, s, _) => p(t, typeof s != "symbol" ? s + "" : s, _);
(function() {
  const t = {
      START_LOADING: "start_loading",
      BALANCE_UPDATE: "balance_update",
      GAME_INITIALIZED: "game_initialized",
      GAME_UI_OVERLAP: "game_ui_overlap",
      SHOW_MODAL: "show_modal",
      PRE_PLAY: "pre_play",
      FINISH_ROUND_ANIMATIONS: "finish_round_animations",
      AUTOSPINS_STARTED: "autospins_started",
      AUTOSPINS_STOPPED: "autospins_stopped"
    },
    s = {
      READY: "ready",
      INITED: "inited",
      INIT_EXT_WIDGETS: "init_ext_widgets",
      DISABLE_EXT_WIDGETS: "disable_ext_widgets",
      ENABLE_EXT_WIDGETS: "enable_ext_widgets",
      OPEN_LOBBY: "open_lobby",
      CLOSE_LOBBY: "close_lobby",
      JOIN_CHALLENGE: "join_challenge",
      JOIN_CHALLENGE_INT: "join_challenge_int",
      GAME_UI_OVERLAP: "game_ui_overlap",
      OPEN_GAME: "open_game",
      DISPATCH_EVENT: "dispatch_event"
    },
    _ = {
      EXTERNAL_ANALYTICS_INCOMING: "external/analytics/incoming",
      GROWTH_EXPERIMENT_ASSIGNED: "growth_experiment_assigned"
    };
  class h {
    constructor() {
      o(this, "lobby", null);
      o(this, "lobbyContainer", null);
      o(this, "isMobile", !1);
      o(this, "lobbyUrl", "lobby.html");
      o(this, "_isLobbyOpen", !1);
      o(this, "_roundCount", 0);
      o(this, "_isAutoSpining", !1);
      o(this, "_isAutoSpinCount", 0);
      o(this, "_gameBalance", 0);
      o(this, "_isOverlapped", !1);
      o(this, "_isExtEnded", !0);
      this.initialHandler = this.initialHandler.bind(this), this._onLobbyHubMessage = this._onLobbyHubMessage.bind(this), this._onGlobalError = this._onGlobalError.bind(this), window.trackGameEventListeners || (window.trackGameEventListeners = []), this._prepareLobbyUrl(), window.trackGameEventListeners.push(this.initialHandler)
    }
    _prepareLobbyUrl() {
      const e = document.currentScript.src.split("/");
      e.pop(), e[e.length - 1] === "src" && e.pop(), this.lobbyUrl = `${e.join("/")}/${this.lobbyUrl}`
    }
    _sendExternalEvent(e) {
      window.dispatchEvent(new CustomEvent(_.EXTERNAL_ANALYTICS_INCOMING, {
        detail: {
          type: "track",
          payload: e
        }
      }))
    }
    _sendExperimentAssignment(e) {
      var n, i;
      if (!(!e || Object.keys(e).length === 0)) {
        for (const [a, b] of Object.entries(e))
          if (a.startsWith("growth_")) {
            const r = {
              eventName: _.GROWTH_EXPERIMENT_ASSIGNED,
              eventData: {
                env: (n = window == null ? void 0 : window.__OPTIONS__) == null ? void 0 : n.env,
                feature_name: a,
                experiment_key: b.experiment_key,
                group_id: b.variation_id,
                timestamp: new Date().toISOString(),
                game_identifier: (i = window == null ? void 0 : window.__OPTIONS__) == null ? void 0 : i.identifier
              }
            };
            this._sendExternalEvent(r)
          }
      }
    }
    initialHandler(e, n, i) {
      var a, b, r, l, d;
      switch (e) {
        case t.START_LOADING:
          this._sendExperimentAssignment((a = window == null ? void 0 : window.__OPTIONS__) == null ? void 0 : a.growthbook_flags), this.game = i == null ? void 0 : i.game, this.isMobile = (r = (b = this.game) == null ? void 0 : b.isMobile) == null ? void 0 : r.any;
          break;
        case t.BALANCE_UPDATE: {
          this._gameBalance = i.amount, this.sendCommand({
            name: "balance_update",
            sender: "hub",
            params: {
              balance: this._gameBalance
            }
          });
          break
        }
        case t.GAME_INITIALIZED:
          (d = (l = window.__OPTIONS__) == null ? void 0 : l.lobby_v2_options) != null && d.lobby_enabled && this.init();
          break;
        case t.GAME_UI_OVERLAP:
          this._isOverlapped = i, window.postMessage({
            name: t.GAME_UI_OVERLAP,
            isOverlapped: this._isOverlapped
          }, "*");
          break;
        case t.AUTOSPINS_STARTED:
          this._isAutoSpining = !0, this._isAutoSpinCount = i === 1 ? 1 / 0 : i, this._sendDisabledExtWidgets();
          break;
        case t.AUTOSPINS_STOPPED:
          this._isAutoSpining = !1, this._isAutoSpinCount = 0, this._sendEnabledExtWidgets();
          break;
        case t.PRE_PLAY:
          if (this._closeLobby(), !(i != null && i.isFreeSpin) && !(i != null && i.isRespin) && this._roundCount++, this._isAutoSpining) break;
          this._sendDisabledExtWidgets();
          break;
        case t.FINISH_ROUND_ANIMATIONS:
          this._roundCount > 0 && this._roundCount--, this._isAutoSpining ? (this._isAutoSpinCount--, this._isAutoSpinCount === 0 && (this._isAutoSpining = !1, this._sendEnabledExtWidgets())) : this._roundCount === 0 && this._sendEnabledExtWidgets();
          break;
        case t.SHOW_MODAL:
          this._closeLobby();
          break
      }
    }
    _sendDisabledExtWidgets() {
      this._isExtEnded = !1, window.postMessage({
        name: s.DISABLE_EXT_WIDGETS
      }, "*")
    }
    _sendEnabledExtWidgets() {
      this._isExtEnded = !0, window.postMessage({
        name: s.ENABLE_EXT_WIDGETS
      }, "*")
    }
    init() {
      this._createLobby(), window.addEventListener("message", this._onLobbyHubMessage), window.addEventListener("onerror", this._onGlobalError)
    }
    _onGlobalError(e) {
      console.error("Hub error handler :::" + JSON.stringify(e)), this._closeLobby()
    }
    sendCommand(e) {
      var n, i;
      try {
        (i = (n = this.lobby) == null ? void 0 : n.contentWindow) == null || i.postMessage(e, "*")
      } catch {
        console.error("Can't send command")
      }
    }
    destroy() {
      window.removeEventListener("message", this._onLobbyHubMessage), window.removeEventListener("onerror", this._onGlobalError)
    }
    _createLobby() {
      this.lobbyContainer = document.createElement("div"), this.lobbyContainer.style.display = "none", this.lobbyContainer.style.position = "fixed", this.lobbyContainer.style.zIndex = "999", this.lobbyContainer.style.overflow = "hidden", this.lobbyContainer.style.width = "100%", this.lobbyContainer.style.height = "100%", document.body.appendChild(this.lobbyContainer), this.lobby = document.createElement("iframe"), this.lobby.src = this.lobbyUrl, this.lobby.allow = "clipboard-write", this.lobby.width = "100%", this.lobby.height = "100%", this.lobby.frameBorder = "0", this.lobby.style.position = "absolute", this.lobby.style.borderWidth = 0, this.lobby.style.top = "0%", this.lobby.style.left = "0%", this.lobby.style.overflow = "hidden", this.lobbyContainer.appendChild(this.lobby)
    }
    _setup() {
      const e = {
        ...window.__OPTIONS__,
        isMobile: this.isMobile
      };
      this.sendCommand({
        name: "setup",
        sender: "hub",
        params: {
          options: e
        }
      })
    }
    _openLobby(e = {
      eventType,
      id
    }) {
      !this._isLobbyOpen && this.lobbyContainer && (this._isLobbyOpen = !0, this.lobbyContainer.style.display = "block", this.sendCommand({
        name: "open",
        sender: "hub",
        params: {
          eventType: e.eventType || "root",
          id: e.id || "",
          balance: this._gameBalance
        }
      }), window.postMessage({
        name: s.GAME_UI_OVERLAP,
        isOverlapped: !0
      }, "*"))
    }
    _closeLobby() {
      this._isLobbyOpen && this.lobbyContainer && (this._isLobbyOpen = !1, this.lobbyContainer.style.display = "none", this.sendCommand({
        name: "close",
        sender: "hub"
      }), window.postMessage({
        name: s.GAME_UI_OVERLAP,
        isOverlapped: !1
      }, "*"))
    }
    _onLobbyHubMessage(e) {
      var i, a;
      const n = e.data;
      switch (n.name) {
        case s.READY:
          this._setup();
          break;
        case s.INITED:
          window.postMessage({
            name: s.INIT_EXT_WIDGETS,
            isOverlapped: this._isOverlapped,
            isEnabled: this._isExtEnded
          }, "*");
          break;
        case s.DISPATCH_EVENT:
          const b = (i = n == null ? void 0 : n.params) == null ? void 0 : i.payload;
          this._sendExternalEvent(b);
          break;
        case s.JOIN_CHALLENGE_INT:
          this.lobbyContainer && window.postMessage({
            name: s.JOIN_CHALLENGE
          }, "*");
          break;
        case s.CLOSE_LOBBY:
          this.lobbyContainer && this._closeLobby();
          break;
        case s.OPEN_GAME:
          if (this.lobbyContainer) {
            const r = ((a = n == null ? void 0 : n.params) == null ? void 0 : a.url) || "";
            window.location.replace(r)
          }
          break;
        case s.OPEN_LOBBY:
          this._openLobby(n);
          break
      }
    }
  }
  new h
})();
//# sourceMappingURL=lobby-bundle.js.map

//# debugId=7296ad89-40b9-5280-a0ff-c101fe6a1457