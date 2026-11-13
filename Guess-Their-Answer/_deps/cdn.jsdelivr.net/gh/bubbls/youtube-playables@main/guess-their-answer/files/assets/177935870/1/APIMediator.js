class APIMediator {

    static isDebugMode() {
        return typeof GameInterface === 'undefined';
    }

    static isPlaycanvasEnvironment() {
        return window.location.host === 'launch.playcanvas.com' || window.location.host === 'playcanv.as'
    }

    static sendPreloadProgress(value) {
        if (!APIMediator.isDebugMode()) {
            this._lastReportedLoadingProgress = this._lastReportedLoadingProgress || 0;
            value = Math.floor(Math.min(100, Math.max(0, value)));
            if (value > this._lastReportedLoadingProgress) {
                this._lastReportedLoadingProgress = value;
                window.GameInterface.sendPreloadProgress(this._lastReportedLoadingProgress);
            }
        }
    }

    static reportGameReady() {
        if (!APIMediator.isDebugMode()) {
            window.GameInterface.gameReady();
        }
    }

    static async gameStart(level) {
        if (!APIMediator.isDebugMode()) {
            return window.GameInterface.gameStart(level);
        } else {
            return;
        }
    }

    static sendScore(value, forced = false) {
        this._lastReportedScore = this._lastReportedScore || 0;
        if (this._lastReportedScore !== value || forced) {
            this._lastReportedScore = value;
            window.GameInterface.sendScore(this._lastReportedScore);
        }
    }

    static sendProgress(value, forced = false) {
        this._lastReportedProgress = this._lastReportedProgress || 0;
        value = Math.floor(Math.min(100, Math.max(0, value)));
        if (this._lastReportedProgress !== value || forced) {
            this._lastReportedProgress = value;
            window.GameInterface.sendProgress(this._lastReportedProgress);
        }
    }


    static async gameComplete() {
        return window.GameInterface.gameComplete();
    }

    static async gameOver() {
        return window.GameInterface.gameOver();
    }

    static async gameQuit() {
        return window.GameInterface.gameQuit();
    }


    /** interstitials **/
    static async showInterstitialAd(eventId, placementType) {
        if (APIMediator.isDebugMode()) return;
        return window.GameInterface.showInterstitialAd(eventId, placementType);
    };

    /* rewarded ads */

    static areRewardedAdsSupported() {
        if (typeof this._rewardedFeatureEnabled === 'undefined') this._rewardedFeatureEnabled = window.GameInterface.hasFeature("rewarded");
        return this._rewardedFeatureEnabled;
    }

    static async checkRewardedVideoAvailability(eventID) {
        if (APIMediator.isDebugMode()) {
            return GameConfig.getAttribute('debug', 'rewardedAds');
        } else {
            /** rewarded eventID is not considered for now, subject to change in the future... */
            if (!APIMediator.areRewardedAdsSupported()) return false;

            await APIMediator._injectRewardedVideoAvailabilityCheck();
            return APIMediator._rewardedVideoAvailable;
            // return window.GameInterface.hasRewardedAd(eventID);
        }
    }

    static async _injectRewardedVideoAvailabilityCheck() {
        if(APIMediator._rewardedAvailabilityCheckInjected) return;
        APIMediator._rewardedAvailabilityCheckInjected = true;

        window.GameInterface.onRewardedAdAvailabilityChange((eventId, hasRewardedAd) => {
            APIMediator._rewardedVideoAvailable = !!hasRewardedAd;
        });

        APIMediator._rewardedVideoAvailable = await APIMediator.hasRewardedVideo();
    }


    static async hasRewardedVideo(eventID) {
        if (!eventID) console.warn('no event ID set is hasRewardedVideo() call');

        if (APIMediator.isDebugMode()) {
            return GameConfig.getAttribute('debug', 'rewardedAds');
        } else {
            if (!APIMediator.areRewardedAdsSupported()) return false;
            const result = await window.GameInterface.hasRewardedAd(eventID);
            return result;
        }
    }

    static watchRewardedVideo(eventID) {
        if (!eventID) console.warn('no event ID set is watchRewardedVideo() call');

        return new Promise((resolve, reject) => {
            if (APIMediator.hasRewardedVideo(eventID)) {
                if (APIMediator.isDebugMode()) {
                    Utils.wait(500).then(() => {
                        resolve(!!GameConfig.getAttribute('debug', 'rewardedAds'));
                    });
                } else {
                    window.GameInterface.showRewardedAd(eventID).then((result) => {
                        resolve(result.isRewardGranted);
                    })
                }
            } else {
                resolve(false);
            }
        });
    }

    /** pause */
    static isPausingAllowed() {
        if (APIMediator.isDebugMode()) return true;
        return window.GameInterface.hasFeature("pause");
    }

    static isPaused() {
        if (APIMediator.isDebugMode()) return false;
        return window.GameInterface.isPaused();
    }


    static onPauseStateChange(callback) {
        window.GameInterface.onPauseStateChange(isPaused => {
            callback(isPaused);
        });
    }

    /** audio **/
    static areAudioControlsAllowed() {
        if (APIMediator.isDebugMode()) return true;
        return window.GameInterface.hasFeature("audio");
    }

    static isMuted() {
        if (APIMediator.isDebugMode()) return false;
        return window.GameInterface.isMuted();
    }

    static onAudioStateChange(callback) {
        window.GameInterface.onAudioStateChange(isMuted => {
            callback(isMuted);
        });
    }

    /** storage **/

    static getStorageObject() {
        if (APIMediator.isDebugMode()) return window.localStorage;
        return window.GameInterface.storage;
    }

    /** callbacks  */

    static initCallbacks() {
        if (APIMediator.isDebugMode()) return;

        window.GameInterface.onRestartGame(() => {
            /* restart level/gameplay */
            MatchManager.getInstance().restartMatch();
        });

        window.GameInterface.onQuitGame(() => {
            const quitMatch = MatchManager.getInstance().quitGame(); /* quit level/gameplay */
            if (!quitMatch) {
                const quitDailyChallenge = DailyChallengeLocation.getInstance().quitDailyChallenge();
            }
        });

        window.GameInterface.onGoToHome(() => {
            const quitMatch = MatchManager.getInstance().quitGame(); /* quit level/gameplay */
            if (!quitMatch) {
                const quitDailyChallenge = DailyChallengeLocation.getInstance().quitDailyChallenge();
            }
        });

        window.GameInterface.onGoToNextLevel(() => {
            /* go to next level */
        });

        window.GameInterface.onGoToLevel(level => {
            /* go to level x */
        });


        if (!window.GameInterface.hasFeature("visibilitychange")) {
            APIMediator._injectPlaycanvasAvoidVisibilityHack();
        }
    }


    /* avoid visibility hack */

    static _injectPlaycanvasAvoidVisibilityHack() {
        /** 
         * A snippet that forces the Playcanvas app to be rendered even if the tab/page focus is lost.
         * In other words, it just disables 'pause' feature. 
         * @author Igor Parada
         */
        (function () {

            const detectApplication = () => {
                if (typeof pc !== 'undefined') {
                    const ApplicationClass = pc.AppBase || pc.Application;
                    if (ApplicationClass && ApplicationClass.getApplication()) {
                        injectHack();
                    }
                }
            };
            const _hookApplicationStart = setInterval(detectApplication, 100);

            const injectHack = () => {
                clearInterval(_hookApplicationStart);

                console.log('Injecting do-not-pause hack...')

                const ApplicationClass = pc.AppBase || pc.Application;
                const app = ApplicationClass.getApplication();
                const initialPlatformWasBrowser = pc.platform.browser;

                const MANUAL_RENDER_FPS = 60;

                let _hiddenAttr = 'hidden';
                let _manualRenderInterval = undefined;

                const setupManualRenderLoop = () => {
                    if (_manualRenderInterval) {
                        console.warn('manual render is already active!');
                        return;
                    }
                    const averageFPS = app.stats && app.stats.frame && app.stats.frame.fps || MANUAL_RENDER_FPS;
                    _manualRenderInterval = setInterval(() => app.tick(), 1000 / Math.min(averageFPS, MANUAL_RENDER_FPS));
                }

                const disableManualRenderLoop = () => {
                    if (_manualRenderInterval) {
                        clearInterval(_manualRenderInterval);
                    }
                    _manualRenderInterval = undefined;
                }

                const onDocumentHidden = () => {
                    setupManualRenderLoop();
                }

                const onDocumentRestored = () => {
                    disableManualRenderLoop();
                    if (_manualRenderInterval) {
                        app.tick();
                    }
                }

                const _visibilityChangeHandler = () => {
                    const documentHidden = document[_hiddenAttr];
                    if (documentHidden) {
                        onDocumentHidden();
                    } else {
                        onDocumentRestored();
                    }
                };


                const addVisibilityChangeListeners = () => {
                    // Depending on browser add the correct visibilitychange event and store the name of the
                    // hidden attribute in this._hiddenAttr.
                    if (typeof document !== 'undefined') {
                        if (document.hidden !== undefined) {
                            _hiddenAttr = 'hidden';
                            document.addEventListener('visibilitychange', _visibilityChangeHandler, false);
                        } else if (document.mozHidden !== undefined) {
                            _hiddenAttr = 'mozHidden';
                            document.addEventListener('mozvisibilitychange', _visibilityChangeHandler, false);
                        } else if (document.msHidden !== undefined) {
                            _hiddenAttr = 'msHidden';
                            document.addEventListener('msvisibilitychange', _visibilityChangeHandler, false);
                        } else if (document.webkitHidden !== undefined) {
                            _hiddenAttr = 'webkitHidden';
                            document.addEventListener('webkitvisibilitychange', _visibilityChangeHandler, false);
                        }
                    }
                }

                const removeVisibilityChangeListeners = () => {
                    if (typeof document !== 'undefined') {
                        document.removeEventListener('visibilitychange', _visibilityChangeHandler, false);
                        document.removeEventListener('mozvisibilitychange', _visibilityChangeHandler, false);
                        document.removeEventListener('msvisibilitychange', _visibilityChangeHandler, false);
                        document.removeEventListener('webkitvisibilitychange', _visibilityChangeHandler, false);
                    }
                }

                app.on('destroy', () => {
                    removeVisibilityChangeListeners();
                });

                /** path the playcanvas engine */
                ApplicationClass.prototype.isHidden = () => false;
                ApplicationClass.prototype.onVisibilityChange = () => {
                    //just a stub to prevent pausing the sound subsystem
                };


                /** entry point */
                addVisibilityChangeListeners();
            }

        }());
    }
}