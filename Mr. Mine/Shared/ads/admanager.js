class AdManager
{
    adApi;

    constructor(adApi=null)
    {
        if (adApi != null)
        {
            this.adApi = adApi;
            this.adApi.init();
        }
    }

    showAd(grantRewardCallback, placementId = null)
    {
        if(adManager.isReady())
        {
            var callback = this.generateRewardCallback(grantRewardCallback);
            adManager.adApi.showAd(callback, placementId);
        }
    }

    isReady()
    {
        return this.adApi && this.adApi.isReady();
    }

    logRevenue(adInfo)
    {
        if (typeof(appsFlyer) != "undefined")
        {
            appsFlyer.logRevenue(adInfo.revenue)
        }
    }

    generateRewardCallback(callbackFunction)
    {
        return function(adInfo)
        {
            this.logRevenue(adInfo);
            callbackFunction(adInfo);
        }.bind(this);
    }
}

var adManager = new AdManager(new AppLovinApi());