const SDK_ACCESS_KEY = "NZIBOoHpSqde00vdlOjBM0RN2OTbAQHtlkEQuLFW";
const SDK_LOGGING = true;

///////////////////////////////////////////* API WORKAROUND *///////////////////////////////////////////
/*
	* The youtube sdk needs to be loaded before any of our code, therefore the api should be treated
		as part of the game. This also includes calling firstFrameReady before the loading of any
		files, which includes the api itself.
	* Calling firstFrameReady directly kind of misses the point, but since the api itself counts as
		the game, it needs to be called before the api starts to load
	* Add this at the top of the index:
	{
		<script src="https://www.youtube.com/game_api/v0?key=NZIBOoHpSqde00vdlOjBM0RN2OTbAQHtlkEQuLFW"></script>
		<script>ytgame.game.firstFrameReady();</script>
	}
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////

const SDK_LOG = (msg) => {
	if(!SDK_LOGGING) return;

	let famobiStyle = `
		color: black;
		background-color: white;
	`;
	let style = `
		color: white;
	`;
	return console.log(`%c[Famobi]:%c ${msg}`, famobiStyle, style);
}

const SDK_ERROR = (msg) => {
	if(!SDK_LOGGING) return;
	
	let famobiStyle = `
		color: black;
		background-color: white;
	`;
	let style = `
		color: #ff5e5e;
	`;
	return console.log(`%c[Famobi]:%c ${msg}`, famobiStyle, style);
}

/*
	SETTINGS
*/
const SDK_INTERFACE_SETTINGS = {

	isProd: true,
	debugLevel: 1,
	forceMockObject: false,

	// ads
	interstitial: {
		enabled: false, // enable/disable interstitial ads
		initial: true, // show initial ad
		preload: 250, // preload interval in ms
		retry: 2000, // timeout before retry after preload fail
		timout: 250, // timout before calling showRewarded()
		cooldown: 90, // time between ads
	},
	rewarded: {
		enabled: false, // enable/disable rewarded ads (provided that the "rewarded" feature is enabled)
		preload: 250, // preload interval in ms
		retry: 2000, // timeout before retry after preload fail
		timout: 250, // timout before calling showRewarded()
		// cooldown: 90, // time between ads
		reward: true // reward when in doubt
	},

	// files to load
	externalFiles: ["sdk_interface_custom.js"],

	// features
	features: {
		auto_quality: false,
		copyright: true,
		credits: true,
		external_achievements: false,
		external_leaderboard: false,
		external_mute: true,
		external_pause: false,
		external_start: false,
		forced_mode: false,
		leaderboard: false,
		multiplayer: false,
		multiplayer_local: true,
		skip_title: false,
		skip_tutorial: false,
		rewarded: false,
		external_focus: true
	},

	// forced mode
	forced_mode: { },

	// misc
	aid: "A1234-5", // affiliate id
	name: "Youtube", // name of partner/customer
	branding_url: "",
	branding_image: "logo", // "logo" = transparent
	show_splash: false,
	menuless: true,

	useSafeStorage: false
};

const SDK_DATA = {};

const SDK_INTERFACE_OVERRIDES = {
	famobi: {

		/*
		getCurrentLanguage: function() {
			return "en";
		},
		*/

		/*
		setPreloadProgress: function(progress) {

		},
		*/

		localStorage: {
			setItem(key, value) {
				SDK_LOG(`Localstorage: set {${key}, ${value}}`);

				SDK_DATA[key] = value;

				window.YOUTUBE?.saveData?.(SDK_DATA);
				return SDK_DATA;
			},
			getItem(key) {
				SDK_LOG(`Localstorage: get {${key}}`);

				return SDK_DATA[key];
			},
			removeItem(key) {
				delete SDK_DATA[key];

				window.YOUTUBE?.saveData?.(SDK_DATA);
				return SDK_DATA;
			},
			clear() {
				for(let key in SDK_DATA) {
					delete SDK_DATA[key];
				}

				window.YOUTUBE?.saveData?.(SDK_DATA);
				return SDK_DATA;
			}
		},

		gameReady: function() {
			window.YOUTUBE.gameReady();
			window.YOUTUBE.playerReady();
		},

		playerReady: function() { },
	},
	famobi_analytics: {
		trackEvent: function(event, params) {
			return new Promise((resolve, reject) => {
				SDK_LOG(event, params);
				return resolve(event, params);
			});
		}
	}
};

const SDK_INTERFACE_MOCK_OBJECT = function() {

	return new Promise(function(resolve, reject) {
		resolve();
	});
}

const SDK_INTERFACE_PRELOAD_AD = function(type) {

	return new Promise(function(resolve, reject) {
		resolve(); // reject()
	});
};

const SDK_INTERFACE_SHOW_AD = function() {

	return new Promise(function(resolve, reject) {
		resolve();
	});
};

const SDK_INTERFACE_REWARDED_AD = function() {

	return new Promise(function(resolve, reject) {
		resolve(true);
	});
};

const SDK_INTERFACE_INIT = function() {
	return new Promise(function(resolve, reject) {
		if(typeof(ytgame) === "undefined") {
			SDK_LOG("ytgame not found...");
			resolve();
			return;
		}
		
		SDK_LOG(`Running on ytgame-version: ${ytgame.SDK_VERSION}`);

		window.YOUTUBE = {
			gameReady() {
				//First frame is ready to be shown
				return new Promise((res) => {
					/*
						SDK_LOG("firstFrameReady");
						ytgame.game.firstFrameReady();
					*/

					res();
				});
			},
			playerIsReady: false,
			playerReady() {
				//The player is ready to interact with the game
				return new Promise((res) => {
					if(!this.playerIsReady) {
						//Set initial mute state
						SDK_LOG("Setting initial mute state");
						this.updateAudioState();

						SDK_LOG("gameReady");
						ytgame.game.gameReady();

						this.playerIsReady = true;
					}

					res();
				});
			},
			loadData() {
				return new Promise((res) => {
					ytgame.game.loadData().then((data) => {
						if(!data) return res();

						SDK_LOG("Data received:");
						SDK_INTERFACE_SETTINGS.debugLevel && console.log(data);

						let loadData = JSON.parse(data);

						for(let key in loadData) {
							SDK_DATA[key] = loadData[key];
						}

						res();
					}).catch(error => {
						SDK_LOG("Error while retrieving data");
						SDK_ERROR(error);
						
						res();
					});
				});
			},
			saveData(data) {
				return new Promise((res) => {
					SDK_LOG("Saving data:")
					SDK_INTERFACE_SETTINGS.debugLevel && console.log(data);

					const stringified = JSON.stringify(data);

					ytgame.game.saveData(stringified).then(() => {
						SDK_LOG("Data saved");
			
						res();
					}).catch(error => {
						SDK_LOG("Error while saving data");
						SDK_ERROR(error);
						
						res();
					});
				});
			},
			sendScore(score) {
				//Totalscore
				return new Promise((res) => {
					ytgame.engagement.sendScore({
						value: Math.floor(score)
					}).then(() => {
						res();
					});
				});
			},
			isMuted: false,
			updateAudioState(state = null) {
				try {
					if(state == null) state = !!(state || ytgame?.system?.isAudioEnabled?.());
					SDK_LOG(`Update mute state: ${state ? "\x1b[32menabled" : "\x1b[31mdisabled"}`);

					if(!window.famobi.adapters) {
						SDK_ERROR("famobi.adapter is not defined yet");
						!state && (window.famobi.volume = 0);
						return;
					}

					window.famobi.setVolume(1);

					if(state) {
						//Unmute Game
						window.famobi.adapters.run("request", "enableAudio");
						SDK_LOG("Unmute game");
					} else {
						//Mute Game
						window.famobi.adapters.run("request", "disableAudio");
						SDK_LOG("Mute game");
					}
				} catch(err) {
					SDK_ERROR(err);
				}
			},
			updatePauseState(state = false) {
				try {
					SDK_LOG(`Update pause state: ${state ? "\x1b[32mpause" : "\x1b[31mresume"}`);
				
					if(state) {
						//pause Game
						window.famobi.adapters.run("request", "pauseGameplay");
						SDK_LOG("Pause game");
					} else {
						//resume Game
						window.famobi.adapters.run("request", "resumeGameplay");
						SDK_LOG("Resume game");
					}
				} catch(err) {
					SDK_ERROR(err);
				}
			}
		}

		//Set up eventlisteners
		if(ytgame?.system) {
			SDK_LOG("Setting up eventlisteners");

			ytgame?.system?.onAudioEnabledChange?.((isAudioEnabled) => {
				SDK_LOG(`On Audio Change ${isAudioEnabled}`);
				window.YOUTUBE.updateAudioState(isAudioEnabled);
			});
	
			ytgame?.system?.onPause?.(() => {
				window.YOUTUBE.updatePauseState(true);
			});
	
			ytgame?.system?.onResume?.(() => {
				window.YOUTUBE.updatePauseState(false);
			});
		}
		
		SDK_LOG("Setup completed");

		let init_completed = false;
		function complete() {
			SDK_LOG("Init completed")

			if(!init_completed) {
				init_completed = true;
				resolve();
			}
		}

		SDK_LOG("Checking for save file...");

		window.YOUTUBE.loadData().then(() => {
			SDK_LOG("Save file received");
			SDK_INTERFACE_SETTINGS.debugLevel && console.log(SDK_DATA);

			complete();
		}).catch(err => {
			SDK_LOG("No save file received");

			complete();
		});
	});
};

SDK_INTERFACE.init(SDK_INTERFACE_SETTINGS);