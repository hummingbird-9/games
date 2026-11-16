/* offline stand-in for the Google IMA ad SDK: every ad request fails with "no ad", so games continue. */
(function (w) {
  w.google = w.google || {};
  var ima = w.google.ima = w.google.ima || {};
  function err(msg, code) {
    return {getMessage: function () { return msg; }, getErrorCode: function () { return code; },
            getVastErrorCode: function () { return code; }, getType: function () { return 'adLoadError'; },
            getInnerError: function () { return null; }, toString: function () { return msg; }};
  }
  ima.VERSION = '3.0.0-offline';
  ima.ImaSdkSettings = function () {};
  ima.ImaSdkSettings.VpaidMode = {DISABLED: 0, ENABLED: 1, INSECURE: 2};
  ima.ImaSdkSettings.CompanionBackfillMode = {ALWAYS: 'always', ON_MASTER_AD: 'on_master_ad'};
  var settings = {};
  ['setVpaidMode', 'setLocale', 'setPlayerType', 'setPlayerVersion', 'setPpid', 'setAutoPlayAdBreaks',
   'setNumRedirects', 'setDisableCustomPlaybackForIOS10Plus', 'setDisableFlashAds', 'setCompanionBackfill',
   'setSessionId', 'setFeatureFlags'].forEach(function (n) { settings[n] = function () {}; });
  ima.settings = settings;
  ima.ViewMode = {NORMAL: 'normal', FULLSCREEN: 'fullscreen'};
  ima.AdError = function () {};
  ima.AdError.ErrorCode = {VAST_EMPTY_RESPONSE: 1009, VAST_LOAD_TIMEOUT: 301, UNKNOWN_AD_RESPONSE: 1010,
                           FAILED_TO_REQUEST_ADS: 1005, ADS_REQUEST_NETWORK_ERROR: 1012, INVALID_ARGUMENTS: 1101};
  ima.AdError.Type = {AD_LOAD: 'adLoadError', AD_PLAY: 'adPlayError'};
  ima.AdErrorEvent = function () {};
  ima.AdErrorEvent.Type = {AD_ERROR: 'adError'};
  ima.AdsManagerLoadedEvent = function () {};
  ima.AdsManagerLoadedEvent.Type = {ADS_MANAGER_LOADED: 'adsManagerLoaded'};
  ima.AdEvent = function () {};
  ima.AdEvent.Type = {AD_BREAK_READY: 'adBreakReady', AD_METADATA: 'adMetadata', ALL_ADS_COMPLETED: 'allAdsCompleted',
    CLICK: 'click', COMPLETE: 'complete', CONTENT_PAUSE_REQUESTED: 'contentPauseRequested',
    CONTENT_RESUME_REQUESTED: 'contentResumeRequested', LOADED: 'loaded', SKIPPED: 'skipped', STARTED: 'started',
    USER_CLOSE: 'userClose', IMPRESSION: 'impression', PAUSED: 'pause', RESUMED: 'resume'};
  ima.AdDisplayContainer = function () {
    this.initialize = function () {}; this.destroy = function () {};
  };
  ima.AdsRequest = function () {};
  ima.AdsLoader = function (container) {
    var L = {}, self = this;
    this.addEventListener = function (t, f) { (L[t] = L[t] || []).push(f); };
    this.removeEventListener = function (t, f) { L[t] = (L[t] || []).filter(function (x) { return x !== f; }); };
    this.getSettings = function () { return settings; };
    this.contentComplete = function () {};
    this.destroy = function () {};
    this.requestAds = function (req) {
      setTimeout(function () {
        var e = {type: 'adError', getError: function () { return err('No ad available (offline)', 1009); },
                 getUserRequestContext: function () { return req && req.userRequestContext; }};
        (L['adError'] || []).slice().forEach(function (f) { try { f.call(self, e); } catch (x) { console.warn(x); } });
      }, 0);
    };
  };
  ima.AdsRenderingSettings = function () {};
  ima.CompanionAdSelectionSettings = function () {};
  ima.CompanionAdSelectionSettings.CreativeType = {ALL: 'All', FLASH: 'Flash', IMAGE: 'Image'};
  ima.CompanionAdSelectionSettings.ResourceType = {ALL: 'All', HTML: 'Html', IFRAME: 'IFrame', STATIC: 'Static'};
  ima.CompanionAdSelectionSettings.SizeCriteria = {IGNORE: 'IgnoreSize', SELECT_EXACT_MATCH: 'SelectExactMatch',
                                                    SELECT_NEAR_MATCH: 'SelectNearMatch'};
})(window);
