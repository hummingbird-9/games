/* Local ad-free Poki compatibility shim for the Moto X3M game build.
   No ad provider is contacted, no impressions are recorded, and no reward is fabricated. */
(function (global) {
  "use strict";
  global.PokiSDK = {
    init: function () { return Promise.resolve(); },
    gameLoadingStart: function () {},
    gameLoadingProgress: function () {},
    gameLoadingFinished: function () {},
    gameplayStart: function () {},
    gameplayStop: function () {},
    happyTime: function () {},
    commercialBreak: function () { return Promise.resolve(); },
    rewardedBreak: function () { return Promise.resolve(false); },
    displayAd: function () {},
    destroyAd: function () {}
  };
})(window);
