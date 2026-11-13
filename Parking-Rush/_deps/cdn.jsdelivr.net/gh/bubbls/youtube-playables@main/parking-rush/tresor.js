window["TRESOR"] = (

	function () {

		const VERSION = "1.0.3";
		const AUTO_INIT = true;

		const STORAGE_KEY = "savegame";
		const STORAGE_PREFIX = "";

		const SEARCH_PARAMS = new URL(window.location.href).searchParams;
		const IS_LOG_ENABLED = ["1", "true"].includes(SEARCH_PARAMS.get("FG_LOG"));
		const IS_DEBUG_ENABLED = ["1", "true"].includes(SEARCH_PARAMS.get("FG_DEBUG"));

		let savegame = {};
		let isInititialized = false;

		let promiseInit = null;

		function log() {
			if(!IS_LOG_ENABLED) {
				return;
			}
			console.log(...arguments);
		};

		function debug() {
			if(!IS_DEBUG_ENABLED) {
				return;
			}
			console.debug(...arguments);
		};

		// -------------- CUSTOM STORAGE -----------------
		function getStorage() {
			if(typeof window.famobi !== "undefined" && typeof window.famobi.localStorage !== "undefined") {
				return window.famobi.localStorage;
			}
			return window.localStorage;
		};

		function getStorageKey() {
			return (STORAGE_PREFIX.length ? (STORAGE_PREFIX + ":") : "") + STORAGE_KEY;
		};

		function loadData() {
			return new Promise(resolve => {

				let storageKey = getStorageKey();
				log("[tresor] loadData (key: '%s')", storageKey);

				// -------------- STORAGE (LOADING) --------------
				let value = null;

				try {
					value = getStorage().getItem(storageKey);
				} catch(e) {
					debug("[tresor] getStorage().getItem", e);
				}
				// -----------------------------------------------

				debug("[tresor] loadData", value);

				resolve({value}); // return value (still stringified)
			});
		};

		function saveData() {
			return new Promise(resolve => {

				let storageKey = getStorageKey();
				log("[tresor] saveData (key: '%s', keys: %s) -> JSON.stringify", storageKey, Object.keys(savegame));

				let value = null;

				if(Object.keys(savegame).length) {
					value = JSON.stringify(savegame);
				}

				// ---------------- STORAGE (SAVE) ----------------
				if(value) {
					try {
						getStorage().setItem(storageKey, value);
					} catch(e) {
						debug("[tresor] getStorage().setItem", e);
					}
				} else {
					try {
						getStorage().removeItem(storageKey);
					} catch(e) {
						debug("[tresor] getStorage().removeItem", e);
					}
				}
				// -------------------------------------------------------

				resolve({});
			});
		};

		function init() {

			if(promiseInit) {
				return promiseInit;
			}

			promiseInit = new Promise(resolve => {
				log("TRESOR (v%s) init...", VERSION);
				
				loadData().then(result => {

					debug("[tresor] init.loadData", result);

					if(result.err) {
						return resolve({err: result.err});
					}

					savegame = {};
					
					if(result.value) {
						log("[tresor] value found! -> JSON.parse");
						try {
							savegame = JSON.parse(result.value);
							debug("[tresor] init JSON.parse", savegame);
						} catch(e) {
							resolve({err: e});
						}
					} else {
						log("[tresor] no savegame found!");
					}

					debug("[tresor] init savegame", savegame);
					isInititialized = true;
					resolve({});
				});
			});

			return promiseInit;
		};

		function setItem(key, value, callback) {
			savegame[key] = value;
			save().then(result => {
				if(typeof callback === "function") {
					callback(result.err || false, value);
				}
			});
		};

		function getItem(key, callback) {
			let value = typeof savegame[key] !== "undefined" ? savegame[key] : null;
			if(typeof callback === "function") {
				callback(false, value);
			}
			return value;
		};

		function keys(callback) {
			let keys = Object.keys(savegame);
			if(typeof callback === "function") {
				callback(false, keys);
			}
			return keys;
		};

		function removeItem(key, callback) {
			delete savegame[key];
			save().then(result => {
				if(typeof callback === "function") {
					callback(result.err);
				}
			});
		};

		function clear(callback) {
			savegame = {};
			save().then(result => {
				if(typeof callback === "function") {
					callback(result.err);
				}
			});
		};

		function save() {
			return new Promise(resolve => {
				saveData().then(result => {
					if(result.err) {
						resolve({err: result.err});
					}
				});
				resolve({});
			});
		};

		if(AUTO_INIT) {
			init().then(result => {
				if(result.err) {
					return log(result.err);
				}
				isInititialized = true;
			})
		}

		return {
			init,
			setItem,
			getItem,
			keys,
			removeItem,
			clear,
			get storageKey() {
				return getStorageKey();
			},
			get isInitialized() {
				return isInititialized;
			}
		};
	}
)();