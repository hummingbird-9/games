/**
 * 
 * ------- YOUTUBE -------
 * https://developers.google.com/youtube/gaming/playables/reference/sdk
 * 
 **/
if(typeof window !== "undefined") {
    window["GameInterface"] = (
    	function () {

    		let GAME_ID = "";

    		const SDK_NAME = "YouTube Playables SDK";

    		const IS_PROD = true;
    		const VERSION = "1.0.0";
    		const FORCE_MOCK_OBJECT = IS_PROD ? false : true;

    		const FILES_BEFORE = [
    			() => {} 
    		];
    		const FILES_AFTER = [
    			() => {}
    		];

    		const BRIDGE = {

    			ytgame: {

    				IN_PLAYABLES_ENV: false,
    				
    				game: {
    					loadData() {
    						return ytgame.game.loadData();
    					},
    					saveData(dataStr) {
    						return ytgame.game.saveData(dataStr);
    					},
    					firstFrameReady: function() {
    						return ytgame.game.firstFrameReady();
    					},
    					gameReady: function() {
    						return ytgame.game.gameReady();
    					}
    				},

    				system: {
    					isAudioEnabled: function() {
    						return ytgame.system.isAudioEnabled();
    					},

    					onAudioEnabledChange: function(callback) {
    						return ytgame.system.onAudioEnabledChange(callback);
    					},

    					onPause: function(callback) {
    						return ytgame.system.onPause(callback);
    					},

    					onResume: function(callback) {
    						return ytgame.system.onResume(callback);
    					}
    				}
    				
    			}
    		};

    		const FEATURES = {
    			"audio": false,
    			"pause": true,
    			"score": true,
    			"progress": true,
    			"copyright": true,
    			"credits": true,
    			"version": true,
    			"rewarded": false,
    			"tutorial": true,
    			"visibilitychange": false
    		};

    		const HELPERS = {
    			getArray: function(array = []) {

    				if(Array.isArray(array)) {
    					return array;
    				}

    				if(typeof array === "string") {
    					return [array];
    				}

    				return [];
    			}
    		};

    		const CALLBACKS = {
    			onGoToHome: null,
    			onGoToNextLevel: null,
    			onGoToLevel: null,
    			onRestartGame: null,
    			onQuitGame: null,
    			onAudioStateChange: null,
    			onPauseStateChange: null,
    			onRewardedAdAvailabilityChange: null
    		};

    		function loadFiles(files = []) {

			    let head = document.getElementsByTagName('head')[0];
			    let link;

			    if(typeof files === "string") {
			    	files = [files];
			    }

			    return new Promise((resolve, reject) => {

			        if(!Array.isArray(files)) {
			            resolve({error: "no files"});
			            return;
			        }

			        files.push(() => {
			            resolve();
			        });

			        files.reduce((prev, pSrc) => {

			            return prev.then(() => {
			                return new Promise((resolve,reject) => {
			                    let script = document.createElement('script');
			                    if(typeof pSrc === "function") {
			                        pSrc();
			                        return resolve();
			                    }
			                    switch(pSrc.split('.').pop()) {
			                        case "js":
			                            script.src = pSrc;
			                            head.appendChild(script);
			                            script.onload = () => {
			                                resolve();
			                            }
			                            script.onerror = () => {
			                                resolve();
			                            }
			                            break;
			                        case "css":
			                            link  = document.createElement('link');
			                            link.rel  = 'stylesheet';
			                            link.type = 'text/css';
			                            link.href = pSrc;
			                            head.appendChild(link);
			                            resolve();
			                            break;
			                        default:
			                            script.src = pSrc;
			                            head.appendChild(script);
			                            script.onload = () => {
			                                resolve();
			                            }
			                            script.onerror = () => {
			                                resolve();
			                            }
			                    };
			                });
			            });
			        }, Promise.resolve());
	    		});
    		};

    		const STORAGE = (
    			function () {

    				let key = "savegame";
    				let savegame = {};

    				function init() {

    					if(typeof GAME_ID === "string" && GAME_ID.length) {
    						key = GAME_ID + ":" + "savegame";
    					}

    					return new Promise(resolve => {

    						const setSavegame = data => {
		    					try {
		    						savegame = JSON.parse(data) || {};
		    					} catch(e) {
		    						savegame = {};
		    					}
	    						resolve();
    						};

	    					if(BRIDGE.ytgame.IN_PLAYABLES_ENV) {
	    						BRIDGE.ytgame.game.loadData().then(data => {
	    							setSavegame(data);
								}, (e) => {
									console.error(e);
								});
	    					} else {
	    						data = window.localStorage.getItem(key);
	    						setSavegame(data);
	    					}
    					});
    					
    				};

    				function setItem(key, value) {
    					savegame[key] = value;
    					save();
    				};

    				function getItem(key) {
    					return typeof savegame[key] !== "undefined" ? savegame[key] : null;
    				};

    				function removeItem(key) {
    					delete savegame[key];
    					save();
    				};

    				function clear() {
    					savegame = {};
    					save();
    				};

    				function save() {

    					let dataStr = JSON.stringify(savegame);

    					if(BRIDGE.ytgame.IN_PLAYABLES_ENV) {
    						BRIDGE.ytgame.game.saveData(dataStr).then(() => {
    							// Handle data save success.
							}, (e) => {
								console.error(e);
							});
    					} else {
    						window.localStorage.setItem(key, dataStr);
    					}
    				};

    				return {
    					init,
    					setItem,
    					getItem,
    					removeItem,
    					clear
    				};
    			}
    		)();

    		// --- START ---
    		function init(files = [], params = {}) {
    			
    			GAME_ID = params.gameID || "";

    			return new Promise(resolve => {

    				files = [...HELPERS.getArray(files), ...HELPERS.getArray(FILES_AFTER)];

    				loadFiles(HELPERS.getArray(FILES_BEFORE)).then(() => {
						forceMockObject().then(() => {

							BRIDGE.ytgame.SDK_VERSION = ytgame.SDK_VERSION;
							BRIDGE.ytgame.IN_PLAYABLES_ENV = ytgame.IN_PLAYABLES_ENV;

							console.log("♥ ♥ ♥ %s (%s) READY ♥ ♥ ♥ ('%s' v%s)", 
								SDK_NAME,
								BRIDGE.ytgame.SDK_VERSION,
								(typeof GAME_ID === "string" && GAME_ID.length ? GAME_ID : "GAME"),
								VERSION
							);

							BRIDGE.ytgame.game.firstFrameReady();

							STORAGE.init().then(() => {
						
    							
    							loadFiles(files).then(() => {
    								resolve();
    							});
    						});
    					});
    				});
    			});
    		};

    		// -----------------------
    		function forceMockObject() {
    			return new Promise(resolve => {
    				if(IS_PROD) {
    					return resolve();
    				}

    				ytgame = {
    					SDK_VERSION: "1.20240603.0100",
    					IN_PLAYABLES_ENV: true,

    					SdkError: {

    					},

    					SdkErrorType: {
    						0: "UNKNOWN",
    						1: "API_UNAVAILABLE",
    						2: "INVALID_PARAMS",
    						3: "SIZE_LIMIT_EXCEEDED",
    						"API_UNAVAILABLE": 1,
    						"INVALID_PARAMS": 2,
    						"SIZE_LIMIT_EXCEEDED": 3,
    						"UNKNOWN": 0
    					},

    					engagement: {},
    					game: {
    						savegame: {
    							key: "savegame" + (typeof GAME_ID === "string" && GAME_ID.length ? (":" + GAME_ID) : "")
    						},

    						firstFrameReady: function() {

    						},

    						gameReady: function() {

    						},

    						loadData: function() {
    							return new Promise((resolve, reject) => {
    								try {
    									data = window._localStorage.getItem(this.savegame.key);
    									resolve(data);
    								} catch(e) {
    									reject(e);
    								}
    							});
    						},
    						saveData: function(dataStr) {
    							return new Promise((resolve, reject) => {
    								try {
    									window._localStorage.setItem(this.savegame.key, dataStr);
    									resolve();
    								} catch(e) {
    									reject(e);
    								}
    							});
    						}
    					},
    					health: {},
    					system: {
    						callbacks: {
    							onAudioEnabledChange: null,
    							onPause: null
    						},
    						audio: {
    							isAudioEnabled: true // start value

    						},
    						isAudioEnabled: function() {
    							return this.audio.isAudioEnabled;
    						},
    						onAudioEnabledChange: function(callback) {
    							this.callbacks.onAudioEnabledChange = callback;
    						},
    						onPause: function(callback) {
    							this.callbacks.onPause = callback;
    						},
    						onResume: function(callback) {
    							this.callbacks.onResume = callback;
    						}
    					},

    					test: function() {
    						this.system.audio.isAudioEnabled = true;
    						if(typeof this.system.callbacks.onAudioEnabledChange === "function") {
    							this.system.callbacks.onAudioEnabledChange(this.system.audio.isAudioEnabled);
    						}

    					}
    				};

    				resolve();
    			});
    		};

    		// -----------------------

    		function sendPreloadProgress(progress) {
    			// TODO: INSERT YOUR LOGIC HERE
    		};

    		// --- GAME ---
    		function gameReady() {
    			return BRIDGE.ytgame.game.gameReady();
    		};

    		function gameStart(level) {
    			return Promise.resolve();
    		};

    		function sendProgress(progress) {
    			// TODO: INSERT YOUR LOGIC HERE
    		};

    		function sendScore(score) {
    			// TODO: INSERT YOUR LOGIC HERE
    		};

    		function gameComplete() {
    			return Promise.resolve(); // TODO: INSERT YOUR LOGIC HERE
    		};

    		function gameOver() {
    			return Promise.resolve(); // TODO: INSERT YOUR LOGIC HERE
    		};

    		function gameQuit() {
    			return Promise.resolve(); // TODO: INSERT YOUR LOGIC HERE
    		};

    		function onGoToHome(callback) {
    			CALLBACKS.onGoToHome = callback;
    		};

    		function onGoToNextLevel(callback) {
    			CALLBACKS.onGoToNextLevel = callback;
    		};

    		function onGoToLevel(callback) {
    			CALLBACKS.onGoToLevel = callback;
    		};

    		function onRestartGame(callback) {
    			CALLBACKS.onRestartGame = callback;
    		};

    		function onQuitGame(callback) {
    			CALLBACKS.onQuitGame = callback;
    		};

    		// --- AUDIO ---
    		function onAudioStateChange(callback) {
    			return BRIDGE.ytgame.system.onAudioEnabledChange(value => callback(!value));
    		};

    		function isMuted() {
    			return !BRIDGE.ytgame.system.isAudioEnabled();
    		};

    		// --- PAUSE ---
    		function onPauseStateChange(callback) {

    			BRIDGE.ytgame.system.onPause(() => {
    				if(typeof callback === "function") {
    					callback(true);
    				}
    			});

    			BRIDGE.ytgame.system.onResume(() => {
    				if(typeof callback === "function") {
    					callback(false);
    				}
    			});
    		};

    		function isPaused() {
    			return false; // TODO: INSERT YOUR LOGIC HERE
    		};

    		// --- ADS ---
    		function showInterstitialAd(eventId, placementType) {
    			return Promise.resolve(); // TODO: INSERT YOUR LOGIC HERE
    		};

    		function showRewardedAd(eventId, placementType) {
    			return Promise.resolve({isRewardGranted: true}); // TODO: INSERT YOUR LOGIC HERE
    		};

    		function hasRewardedAd(eventId) {
    			return false; // TODO: INSERT YOUR LOGIC HERE
    		};

    		function onRewardedAdAvailabilityChange(callback) {
    			CALLBACKS.onRewardedAdAvailabilityChange = callback;
    		};

    		function onOffsetChange(callback) {
    			CALLBACKS.onOffsetChange = callback;
    		};

    		function getOffsets() {
    			return {top: 0, right: 0, bottom: 0, left: 0}; // TODO: INSERT YOUR LOGIC HERE
    		};

    		// --- MISC ---
    		function hasFeature(feature) {
    			return !!(FEATURES[feature] || false);
    		};

    		function track(event, data) {
    			// TODO: INSERT YOUR LOGIC HERE
    		};

    		function log() {
    			console.log(... arguments); // TODO: INSERT YOUR LOGIC HERE
    		};

			return {
				init,
				sendPreloadProgress,
				gameReady,
				gameStart,
				sendProgress,
				sendScore,
				gameComplete,
				gameOver,
				gameQuit,
				onGoToHome,
				onGoToNextLevel,
				onGoToLevel,
				onRestartGame,
				onQuitGame,
				onAudioStateChange,
				isMuted,
				onPauseStateChange,
				isPaused,
				showInterstitialAd,
				showRewardedAd,
				hasRewardedAd,
				onRewardedAdAvailabilityChange,
				onOffsetChange,
				getOffsets,
				hasFeature,
				track,
				log,

				get storage() {
            		return STORAGE;
            	}
		    };
    	}
    )();
};