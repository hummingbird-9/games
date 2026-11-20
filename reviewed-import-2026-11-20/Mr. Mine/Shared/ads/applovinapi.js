class AppLovinApi extends AdApi
{
    rewardedAdUnitId = "9ccd1ae067149137";
    sdkKey = "mlti1PRUENJ339Q0ifF4RJzcPxwyL_G27BG0xEvoZNtLJkm270xOqkBDMUoCWQ8izrgGmbwlRwPcqL5liFFEWT";

    adPlugin;
    adRetryAttempt = 0;

    adCompleteCallback = null;

    init() 
    {
        this.readyState = this.ApiReadyState.UNINITIALIZED;
        document.addEventListener('deviceready', async function ()
        {
            this.readyState = this.ApiReadyState.LOADING;
            this.adPlugin = cordova.require('cordova-plugin-applovin-max.AppLovinMAX');
            var sdkKey = this.sdkKey;
            this.adPlugin.initialize(sdkKey, function (configuration)
            {
                this.readyState = this.ApiReadyState.READY;
                // SDK is initialized, start loading ads
                this.initAds();
            }.bind(this));
        }.bind(this), false)
    }

    initAds()
    {
        if(!this.isReady())
        {
            console.warn("Ad plugin not initialized");
            return;
        }
        window.addEventListener('OnRewardedAdLoadedEvent', function (adInfo)
        {
            this.adRetryAttempt = 0;
        }.bind(this));

        window.addEventListener('OnRewardedAdLoadFailedEvent', function (adInfo)
        {
            // Ad failed to load 

            this.adRetryAttempt++;
            var retryDelay = Math.pow(2, Math.min(6, this.adRetryAttempt));

            console.log('Ad failed to load - retrying in ' + retryDelay + 's');
            console.log(adInfo);

            setTimeout(function ()
            {
                this.loadAd();
            }.bind(this), retryDelay * 1000);
        }.bind(this));

        window.addEventListener('OnRewardedAdClickedEvent', function (adInfo) { });
        window.addEventListener('OnRewardedAdDisplayedEvent', function (adInfo) { });
        window.addEventListener('OnRewardedAdAdFailedToDisplayEvent', function (adInfo)
        {
            // Ad failed to display. Load the next ad
            this.loadAd();
        }.bind(this));
        window.addEventListener('OnRewardedAdHiddenEvent', function (adInfo)
        {
            this.loadAd();
        }.bind(this));
        window.addEventListener('OnRewardedAdReceivedRewardEvent', function(adInfo) {
            if (this.adCompleteCallback)
            {
                this.adCompleteCallback(adInfo);
                this.adCompleteCallback = null;
            }
        }.bind(this)
        );

        // Load the first ad
        this.loadAd();
    }

    loadAd()
    {
        if(!this.isReady())
        {
            console.warn("Ad plugin not initialized");
            return;
        }
        this.adPlugin.loadRewardedAd(this.rewardedAdUnitId);
    }

    isAdReady() 
    {
        return this.isReady() && this.adPlugin.isRewardedAdReady(this.rewardedAdUnitId);
    }

    showAd(callback, placementId)
    {
        if(!this.isReady())
        {
            console.warn("Ad plugin not initialized");
            if(reject)
            {
                reject();
            }
            return;
        }

        if(this.adPlugin.isRewardedAdReady(this.rewardedAdUnitId))
        {
            this.adCompleteCallback = callback;
            this.adPlugin.showRewardedAd(this.rewardedAdUnitId, placementId);
        }
    }

    isReady()
    {
        return this.readyState == this.ApiReadyState.READY;
    }
}