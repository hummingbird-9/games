/* Local no-ad compatibility shim for the existing Unity/Poki bridge.
 * No remote SDK is loaded and no ad request or impression is recorded.
 * Commercial breaks continue locally; rewarded breaks return false.
 */
(function (global) {
  const noop = function () {};
  global.PokiSDK = {
    init: function () { return Promise.resolve(); },
    initWithVideoHB: function () { return Promise.resolve(); },
    setDebug: noop,
    gameLoadingStart: noop,
    gameLoadingFinished: noop,
    gameLoadingProgress: noop,
    gameplayStart: noop,
    gameplayStop: noop,
    roundStart: noop,
    roundEnd: noop,
    happyTime: noop,
    muteAd: noop,
    disableProgrammatic: noop,
    customEvent: noop,
    sendHighscore: noop,
    setPlayerAge: noop,
    togglePlayerAdvertisingConsent: noop,
    toggleNonPersonalized: noop,
    setConsentString: noop,
    setDebugTouchOverlayController: noop,
    destroyAd: noop,
    getLeaderboard: function () { return Promise.resolve(null); },
    commercialBreak: function () { return Promise.resolve(); },
    rewardedBreak: function () {
      console.info("Ad unavailable — Continue");
      return Promise.resolve(false);
    }
  };
})(window);
