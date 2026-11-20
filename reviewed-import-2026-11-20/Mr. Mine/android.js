const ID_FOR_CAPACITY_NOTIFICATION = 1;
const GLOBAL_DPI_SCALE = 3;

var store;
var ProductType;
var PurchasePlatform;

class AndroidPlatform extends Platform
{
	trackingEnabled = true;
    treatClicksAsTouches = true;
	fadeOutTooltips = true;

	wakeLock;
	pauseTime = -1;
	lastStartTime = -1;
    store;
	purchasePlatform;

	isActualDevice = false;

    constructor()
    {
        super();
        this.language = getLanguageFromCode(window.navigator.userLanguage || window.navigator.language);
		if (typeof(cordova) !== "undefined")
		{
			this.isActualDevice = true;
		}
		if (this.getCordovaPlatformId() == "ios")
		{
			this.trackingEnabled = false;
			this.enableTextOffset();
		}
    }

	getSystemLanguage()
	{
		// DP: Need to figure out correct way to do this on Android
		var systemLanguage = getLanguageFromCode(navigator.language);
		if(translations.hasOwnProperty("systemLanguage"))
		{
			return systemLanguage;
		}
		return "english";
	}
	
	initStore() 
	{
		if (typeof(CdvPurchase) == "undefined")
		{
			console.warn("Purchase plugin is not initialized");
			return;
		}
		store = CdvPurchase.store;
		ProductType = CdvPurchase.ProductType;
		PurchasePlatform = CdvPurchase.Platform;
		if (this.isIOs())
		{
			this.purchasePlatform = PurchasePlatform.APPLE_APPSTORE;
		}
		else
		{
			this.purchasePlatform = PurchasePlatform.GOOGLE_PLAY;
		}
		store.when().approved(this.finishPurchase);
		store.error((e) => { console.error(e); this.cancelPurchase() });
		this.registerPurchasePacks();
	}

	registerPurchasePacks()
	{
		if (!window.store)
		{
			console.log('Store not available');
			return;
		}

		this.registerSinglePurchasePack('mrmine_10tickets');
		this.registerSinglePurchasePack('mrmine_55tickets');
		this.registerSinglePurchasePack('mrmine_120tickets');
		this.registerSinglePurchasePack('mrmine_250tickets');
		this.registerSinglePurchasePack('mrmine_650tickets');
		this.registerSinglePurchasePack('mrmine_1400tickets');

		if (typeof(offerManager) != "undefined" && offerManager.currentOffer)
		{
			platform.registerSinglePurchasePack(offerManager.currentOffer.sku);
		}

		console.log(store.initialize([this.purchasePlatform]).then((x) => console.log("STORE IS READY")));
	}

	registerSinglePurchasePack(sku)
	{
		if (typeof(store) != "undefined")
		{
			store.register({type: store.CONSUMABLE, id: sku, platform: this.purchasePlatform});
		}
	}

	getPackPrice(packId)
	{
		try
		{
			return store.get(packId, this.purchasePlatform).getOffer().pricingPhases[0].price;
		}
		catch
		{
			return _("NOT AVAILABLE");
		}
	}

	buyPack(packId)
    {
		try
		{
			var product = store.get(packId, this.purchasePlatform);
			this.activePurchase = product;
			showPurchaseLoadingOverlay();
			product.getOffer().order(packId);
		}
		catch(e)
		{
			console.error(e);
		}
    }

	finishPurchase(purchase)
	{
		if (purchase.state == "finished")
		{
			platform.activePurchase = null;
			hidePurchaseLoadingOverlay();
			return;
		}
		platform.validatePurchase(
			purchase,
			function()
			{
				this.activePurchase = null;
				hidePurchaseLoadingOverlay();
				console.log("Purchase Id: "+purchase.products[0].id);
				var ticketSkus = [
					"mrmine_10tickets",
					"mrmine_55tickets",
					"mrmine_120tickets",
					"mrmine_250tickets",
					"mrmine_650tickets",
					"mrmine_1400tickets"
				];
				if (offerManager.currentOffer && offerManager.currentOffer.sku == purchase.products[0].id)
				{
					offerManager.completePurchase(purchase);
				}
				else if (ticketSkus.includes(purchase.products[0].id))
				{
					this.completeTicketPurchase(purchase);
				}
				purchase.finish();
				savegame();
			}.bind(platform),
			function() {
				this.activePurchase = null;
				hidePurchaseLoadingOverlay();
				alert(_("Failed to validate purchase"));
			}.bind(this)
		);		
	}

	cancelPurchase()
	{
		offerManager.unlockOffer();
		this.activePurchase = null;
		hidePurchaseLoadingOverlay();
	}

	completeTicketPurchase(purchase)
	{
		
		var ticketQuantityPurchased = 0;
		var transactionCents = 0;
		switch(purchase.products[0].id)
		{
			case "mrmine_10tickets":
				ticketQuantityPurchased = 10;
				tickets += 10;
				transactionCents = 99;
				break;
			case "mrmine_55tickets":
				ticketQuantityPurchased = 55;
				tickets += 55;
				transactionCents = 499;
				break;
			case "mrmine_120tickets":
				ticketQuantityPurchased = 120;
				tickets += 120;
				transactionCents = 999;
				break;
			case "mrmine_250tickets":
				ticketQuantityPurchased = 250;
				tickets += 250;
				transactionCents = 1999;
				break;
			case "mrmine_650tickets":
				ticketQuantityPurchased = 650;
				tickets += 650;
				transactionCents = 4999;
				break;
			case "mrmine_1400tickets":
				ticketQuantityPurchased = 1400;
				tickets += 1400;
				transactionCents = 9999;
				break;
		}
		newNews(_("You got {0} Tickets!", ticketQuantityPurchased));

		if(typeof (purchaseHistory) != "undefined")
		{
			purchaseHistory.logPurchase(
				purchase.products[0].id,
				transactionCents
			);
		}

		//Need to do currency conversion here from currency -> USD cents
		centsSpent += transactionCents;
		logRevenue(transactionCents, purchase.products[0].id);
		trackEvent_PurchasedTickets(ticketQuantityPurchased, transactionCents);
		var product = store.get(purchase.products[0].id);
		console.log("Price: "+product.offers[0].pricingPhases[0].price);
		if (typeof(appsFlyer) != "undefined")
		{
			appsFlyer.logPurchase(purchase.products[0].id, transactionCents);
		}
	}

	validatePurchase(purchase, onSuccess, onFailure)
	{
		if (chosen < 0)
		{
			setTimeout(
				() => platform.validatePurchase(purchase, onSuccess, onFailure),
				1000
			);
			return;
		}
		else if (!purchase.id)
		{
			onSuccess();
			return;
		}
		ajax(
			"https://payments.playsaurus.com/verification/verifypurchase.php",
			{
				packageName: "com.playsaurus.mrmine",
				productId: purchase.products[0].id,
				token: purchase.purchaseId,
			},
			"GET",
			function(responseString)
			{
				if (responseString)
				{
					var response = JSON.parse(responseString)
					if (response.code == 200 && response.data.success)
					{
						onSuccess();
						return;
					}
				}
				console.error("Failed to validate purchase");
				onFailure();
			}
		)
	}

    getUserId()
    {
        if (typeof(localStorage["uid"]) === "undefined" || isNaN(parseInt(localStorage["uid"])) || parseInt(localStorage["uid"]) < 100)
        {
            localStorage["uid"] = 100 + Math.floor(Math.random()*(Number.MAX_SAFE_INTEGER-100));
        }
        return parseInt(localStorage["uid"]);
    }

	initMusic()
	{
		if (!this.music)
		{
			this.music = new Media(mainMusic);
			this.setMusicVolume(0.13);
			// this.music.loop = true;
			return this.music;
		}
	}

	toggleMusic()
	{
		this.setMusicVolume((mute == 0) ? 0.13 : 0);
	}

	setMusicVolume(volume)
	{
		this.music.setVolume(volume);
	}

	playMusic()
	{
		if (!this.music)
		{
			this.initMusic();
		}
		this.music.play({numberOfLoops: 100, playAudioWhenScreenIsLocked: false});
		if (mute)
		{
			this.setMusicVolume(0);
		}
	}

	pauseMusic()
	{
		if (!this.music)
		{
			this.initMusic();
		}
		this.music.pause();
	}

    onGameLoaded()
    {
        // document.getElementById('WRAPPERD').style.background = 'url("Assets/UI/gui2.png")';
        document.getElementById('WRAPPERD').style.background = '';
    }
    getQuestData()
	{
		return [
			{"title": _("100 GOLD ORE"), "description": _("Have 100 Gold Ores in your inventory at once"), "rewardMoney": 12000, "chestType": 4, "completionPercent": function () {return worldResources[GOLD_INDEX].numOwned / 100;}},
			{"title": _("SHARE MRMINE WITH A FRIEND"), "description": _("Share MrMine with a friend"), "rewardMoney": 5000, "chestType": 103, "buttonText": "SHARE", "buttonFunction": function () {showSimpleInput(_("Send this message to a friend to share the game with them!"), _("Copy Message"), generateShareText(), () => {copyShareText(); shareMouseDown();}, "Cancel");}},
			{"title": _("PLAY FOR 2HRS"), "description": _("Play MrMine for 2HRS"), "rewardMoney": 50000, "chestType": 4, "completionPercent": function () {return playtime / 7200;}},
			{"title": _("20 DEPTH"), "description": _("Dig down to 20km"), "rewardMoney": 10000, "chestType": 4, "completionPercent": function () {return depth / 20;}},
			{"title": _("40 DEPTH"), "description": _("Dig down to 40km"), "rewardMoney": 250000, "chestType": 5, "completionPercent": function () {return depth / 40;}},
			{"title": _("GOLDEN CHEST"), "description": _("Find a golden chest"), "rewardMoney": 1000000, "chestType": 5},
			{"title": _("GOLEM"), "description": _("Talk to the golem"), "rewardMoney": 2500000, "chestType": 5},
			{"title": _("10K WATTS"), "description": _("Have 10,000 watts on your drill"), "rewardMoney": 2500000, "chestType": 5, "completionPercent": function () {return divideBigNumberToDecimalNumber(drillWattage(), 10000);}},
			{"title": _("PLAY 24HRS"), "description": _("Play MrMine for 24HRS"), "rewardMoney": 200000000, "chestType": 6, "completionPercent": function () {return playtime / 86400;}},
			{"title": _("10 WORKERS"), "description": _("Hire 10 workers"), "rewardMoney": 3500000, "chestType": 6, "completionPercent": function () {return getEarth().workersHired / 10;}},
			{"title": _("BILLIONAIRE"), "description": _("Have a billion dollars at one time"), "rewardMoney": 200000000, "chestType": 6, "completionPercent": function () {return money / 1000000000;}},
			{"title": _("70 DEPTH"), "description": _("Dig down to 70km"), "rewardMoney": 250000000, "chestType": 7, "completionPercent": function () {return depth / 70;}},
			{"title": _("10M WATTS"), "description": _("Have 10,000,000 watts on your drill"), "rewardMoney": 300000000, "chestType": 7, "completionPercent": function () {return divideBigNumberToDecimalNumber(drillWattage(), 10000000);}},
			{"title": _("100 DEPTH"), "description": _("Dig down to 100km"), "rewardMoney": 1000000000, "chestType": 8, "completionPercent": function () {return depth / 100;}},
			{"title": _("THE QUEST QUEST"), "description": _("Complete all other quests"), "rewardMoney": 1000000000, "chestType": 8, "completionPercent": function () {return numQuestsCompleted() / 14;}},
			{"title": _("REACH THE UNDERGROUND"), "description": _("Reach the ancient underground"), "rewardMoney": 1000000000000, "chestType": -9},
			{"title": _("BRUTAL KILLER"), "description": _("Kill 100 monsters"), "rewardMoney": 500000000000, "chestType": -1, "completionPercent": function () {return monsterskilled / 100;}},
			{"title": _("OIL TAP"), "description": _("Hold 4 oil at one time"), "rewardMoney": 500000000000, "chestType": -1, "completionPercent": function () {return worldResources[OIL_INDEX].numOwned / 4;}},
			{"title": _("FISTS OF FURY"), "description": _("Get Fists to Level 3"), "rewardMoney": 500000000000, "chestType": -1, "completionPercent": function () {return battleInventory[0][4] / 3;}},
			{"title": _("DEEP PUMPING"), "description": _("Get Oil Rig to Level 6"), "rewardMoney": 1000000000000, "chestType": -9, "completionPercent": function () {return oilrigStructure.level / 6;}},
			{"title": _("HELP MRMINE GROW"), "description": _("Small developers like us rely on players like YOU to grow our games. If you enjoy it, please do what you can to promote our game!"), "rewardMoney": 500000000000, "chestType": -9, "buttonText": "HELP OUT", "buttonFunction": function () {reviewMouseDown(); checkReview();}},
			{"title": _("BOSS DESTROYER"), "description": _("Defeat the third boss"), "rewardMoney": 1000000000000, "chestType": -9},
			{"title": _("FANCY PANTS"), "description": _("Get a Legendary scientist"), "rewardMoney": 1000000000000, "chestType": -9},
			{"title": _("ONE FOR EACH LIMB"), "description": _("Have 4 weapons"), "rewardMoney": 1000000000000, "chestType": 105},
			{"title": _("THE REAPER"), "description": _("Bury 30 scientists"), "rewardMoney": 1500000000000, "chestType": 105, "completionPercent": function () {return deadScientists / 30;}},
			{"title": _("GEM ENTHUSIAST"), "description": _("Craft a purple gem"), "rewardMoney": 1500000000000, "chestType": 105},
			{"title": _("GEM AFICIONADO"), "description": _("Craft a yellow gem"), "rewardMoney": 5000000000000, "chestType": 105},
			{"title": _("DAMAGE OVERLOAD"), "description": _("Reach a total of 50 DPS or higher"), "rewardMoney": 1500000000000, "chestType": 105, "completionPercent": function () {return getTotalDps() / 50;}},
			{"title": _("HIGH ROLLER"), "description": _("Sacrifice a total of 50 billion minerals to the core"), "rewardMoney": 1500000000000, "chestType": 105, "completionPercent": function () {return mineralsSacrificed / 50000000000;}},
			{"title": _("UNSTOPPABLE FOR NOW..."), "description": _("Reach level 30 on a scientist"), "rewardMoney": 5000000000000, "chestType": 105},
			{"title": _("REACH FOR THE STARS"), "description": _("Reach the moon."), "rewardMoney": 100000000000000, "chestType": 105},
			{"title": _("WHACK'O'MOLE"), "description": _("Kill a Whacko. He probably deserved it anyways..."), "rewardMoney": 1000000000000000, "chestType": 105},
			{"title": _("POWERED ON"), "description": _("Power up the reactor for the first time."), "rewardMoney": 25000000000000000, "chestType": -9},
			{"title": _("WE NEED MORE POWER!"), "description": _("Reach level 5 on the reactor."), "rewardMoney": 500000000000000000, "chestType": 105, "completionPercent": function () {return reactorStructure.level / 5;}},
			{"title": _("BEEFCAKE"), "description": _("Cast a buff from the buff lab."), "rewardMoney": 25000000000000000, "chestType": -9},
			{"title": _("BUFFINGTON VON BUFFERSON"), "description": _("Stay buffed for over 24 hours."), "rewardMoney": 50000000000000000, "chestType": 105, "completionPercent": function () {return bufflab.totalSecsBuffed / (60 * 60 * 24);}}
		];
	}

	// ########### LOCAL STORAGE BACKUP ###########

	getLocalStorageFileName()
	{
		return "backup.save";
	}

	getLocalStorageSaveFile(onSuccess, onFailure)
	{
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
			var fileName = platform.getLocalStorageFileName();
			fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
		
				onSuccess(fileEntry, null);
		
			}, onFailure);
		
		}, onFailure);
	}

	loadLocalStorageFromFile(onFailure)
	{
		this.getLocalStorageSaveFile(function(fileEntry) {
			fileEntry.file(function (file) {
				var reader = new FileReader();
		
				reader.onloadend = function() {
					if (this.result.length > 0)
					{
						alert(_("Local save data missing. Loading backup."))
						var data = JSON.parse(b64_to_utf8(this.result));
						for (var i in data)
						{
							localStorage[i] = data[i];
						}
						loadSaves();
						hideLanguageSelection();
					}
					if (!loadGame(0))
					{
						onFailure();
					}
				};
		
				reader.readAsText(file);
		
			}, onFailure);
		}, onFailure)
	}

	saveLocalStorageToFile()
	{
		this.getLocalStorageSaveFile(function(fileEntry) {
			// Create a FileWriter object for our FileEntry (log.txt).
			fileEntry.createWriter(function (fileWriter) {
	
				fileWriter.onwriteend = function() {
				};
	
				fileWriter.onerror = function (e) {
					console.log("(LOAD TEST) WRITE ERROR");
				};
	
				fileWriter.write(utf8_to_b64(JSON.stringify(localStorage)));
			});
		}, (e) => console.error("(LOAD TEST) ERROR: " + JSON.stringify(e)))
	}

	// ########### GAME EXPORTING ###########

	getGameFileName()
	{
		// if (chosen >= 0)
		// {
		// 	return "mrmine_" + sids[chosen] + ".save";
		// }
		// return null;
	}

	getGameSaveFile(onSuccess, onFailure)
	{
		// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
		// 	var fileName = platform.getGameFileName();
		// 	console.log("(LOAD TEST) LOOKING FOR GAME FILE " + fileName);
		// 	fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
		
		// 		console.log("(LOAD TEST) GOT GAME FILE " + fileEntry.fullPath);
		// 		onSuccess(fileEntry, null);
		
		// 	}, onFailure);
		
		// }, onFailure);
	}

	saveGameToFile(onSuccess)
	{
		// console.log("(LOAD TEST) SAVE GAME START");
		// this.getGameSaveFile(function(fileEntry) {
		// 	// Create a FileWriter object for our FileEntry (log.txt).
		// 	fileEntry.createWriter(function (fileWriter) {
	
		// 		fileWriter.onwriteend = function() {
		// 			console.log("(LOAD TEST) WROTE GAME TO FILE");
		// 			onSuccess(fileEntry);
		// 		};
	
		// 		fileWriter.onerror = function (e) {
		// 			console.log("(LOAD TEST) GAME WRITE ERROR");
		// 		};

		// 		var text = getB64SaveText();
		// 		var cname = sids[chosen];
		// 		var exportCode = cname + "|" + utf8_to_b64(text);

		// 		fileWriter.write(exportCode);
		// 	});
		// }, (e) => console.error("(LOAD TEST) ERROR: " + JSON.stringify(e)))
	}

	shareSave()
	{
		// this.saveGameToFile(function(fileEntry)
		// {
		// 	console.log("(SHARING TEST) fileEntry.toURL() = " + fileEntry.toURL())
		// 	var text = getB64SaveText();
		// 	var cname = sids[chosen];
		// 	var exportCode = cname + "|" + utf8_to_b64(text);
		// 	var options = {
		// 		files: [fileEntry.toURL()]
		// 	  };
			  
		// 	  var onSuccess = function(result) {
		// 		console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
		// 		console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
		// 	  };
			  
		// 	  var onError = function(msg) {
		// 		console.log("Sharing failed with message: " + msg);
		// 	  };
			  
		// 	  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
		// });
	}

	requestWakeLock()
	{
		if (cordova && window.navigator.wakeLock) 
		{
			setTimeout(() => window.navigator.wakeLock.request('screen').then((result) => this.wakeLock = result), 3000);
		}
	}

	getCordovaPlatformId()
	{
		if (this.isActualDevice) 
			return cordova.platformId;
		return "";
	}

	isIOs()
	{
		return this.getCordovaPlatformId() == "ios";
	}

	isAndroid()
	{
		return this.getCordovaPlatformId() == "android";
	}

	// Overrides context.fillText and context.strokeText to account for weird offsets on iOS
	enableTextOffset()
	{
		CanvasRenderingContext2D.prototype.oldFillText = CanvasRenderingContext2D.prototype.fillText;
		CanvasRenderingContext2D.prototype.oldStrokeText = CanvasRenderingContext2D.prototype.strokeText;
		if (typeof(this.canvasTextYOffset) == "undefined")
		{
			this.canvasTextYOffset = getCanvasFractionalYOffset();		
		}
		CanvasRenderingContext2D.prototype.fillText = function(text, x, y, maxWidth)
		{
			if (this.textBaseline == "top")
			{
				var fontSize = this.font.split("px")[0];
				y -= fontSize * platform.canvasTextYOffset;
			}
			CanvasRenderingContext2D.prototype.oldFillText.call(this, text, x, y, maxWidth);
		}
		CanvasRenderingContext2D.prototype.strokeText = function(text, x, y, maxWidth)
		{
			if (this.textBaseline == "top")
			{
				var fontSize = this.font.split("px")[0];
				y -= fontSize * platform.canvasTextYOffset;
			}
			CanvasRenderingContext2D.prototype.oldStrokeText.call(this, text, x, y, maxWidth);
		}
	}

	patchDrawImage()
	{
		function _patchDrawImage(nativeDrawImageFunction)
		{
			window.CanvasRenderingContext2D.prototype.drawImage = function (...args)
			{
				if (args.length == 9)
				{
					if (args[7] > args[0].width)
					{
						args[7] = args[0].width;
					}
					if (args[8] > args[0].height)
					{
						args[8] = args[0].height;
					}
				}
				return nativeDrawImageFunction.call(this, ...args);
			}
		}

		_patchDrawImage(CanvasRenderingContext2D.prototype.drawImage);
	}

	handleIosTrackingTransparency()
	{
		if (this.isIOs() && window.plugins && window.plugins.impacTracking)
		{
			window.plugins.impacTracking.trackingAvailable(function (result)
			{
				if (!result)
				{
					window.plugins.impacTracking.canRequestTracking(function (result)
					{
						if (result)
						{
							window.plugins.impacTracking.requestTracking(
								undefined,
								function(result) 
								{ 
									this.trackingEnabled = result; 
									if (result)
									{
										// Initialize the trackers if they're ready by the time this
										// permission is set. Otherwise initializeTrackers() will be
										// called in statstracking.js when it is loaded.
										if (typeof(initializeTrackers) !== "undefined")
										{
											initializeTrackers();
										}
									}
								}.bind(this),
								function(e) { console.error(e); }
							);
						}
					}.bind(this));
				}
			}.bind(this));
		}
	}

}

var platform = new AndroidPlatform();
var buildTarget = MOBILE_BUILD;
language = platform.language;

const SUBSCRIPTION_ENDPOINT = "https://mrmine.com/subscribe.php";
const CODE_REDEMPTION_ENDPOINT = "https://mrmine.com/redemption.php";

document.addEventListener("deviceready", () => {
	document.addEventListener("pause", pauseGame);
	document.addEventListener("resume", resumeGame);
	// window.screen.orientation.lock('portrait');
	platform.initStore();
	platform.lastStartTime = Date.now();
	platform.handleIosTrackingTransparency();
	platform.requestWakeLock()
	// window.MSBAudioCategory.setCategory('ambient');
	initSoundEffects();
}, false);


function pauseGame()
{
	// console.log("PAUSE");
	savegame();
	platform.music.pause();
	platform.pauseTime = Date.now();
	if (animationFrameRequest)
	{
		cancelAnimationFrame(animationFrameRequest);
		animationFrameRequest = null;
	}
	isWaitingForRender = false;
	lastRenderTime = 0;
	minerImageCache.clearCache();
	if (platform.wakeLock)
	{
		platform.wakeLock.release();
		platform.wakeLock = null;
	}
}

function resumeGame()
{
	platform.music.play();
	if (platform.pauseTime >= 0)
	{
		console.log("PAUSED FOR " + (Date.now() - platform.pauseTime) / 1000 + " SECONDS")
		timelapse((Date.now() - platform.pauseTime) / 60000, false);
	}
	platform.pauseTime = -1;
	platform.lastStartTime = Date.now();

	platform.requestWakeLock();
}

function getCordovaPlatformId()
{
	return cordova.platformId;
}

window.addEventListener('beforeunload', function(event) {
	console.log(event)
	// Doesn't Work
	// console.log("(IDLE TEST) BEFORE UNLOAD");
	// if (this.platform.pauseTime > 0)
	// {
	// 	console.log("(IDLE TEST) TIMELAPSE");
	// 	timelapse((Date.now() - this.platform.pauseTime) / 60000);
	// }
	// console.log("(IDLE TEST) SAVING");
	// savegame();
	// console.log("(IDLE TEST) SAVED");

	// cordova.plugins.notification.local.cancel([ID_FOR_CAPACITY_NOTIFICATION]);
});