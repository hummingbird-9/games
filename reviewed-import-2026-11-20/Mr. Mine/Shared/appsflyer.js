class AppsFlyer
{
    plugin;
    conversionData = {};

    options = {
        devKey: 'jdTWw56PFi7z3946v9Er7F',  
        appId: 'com.playsaurus.mrmine',  
        isDebug: true,  
        waitForATTUserAuthorization: 10,
        onInstallConversionDataListener: true
    }

    constructor()
    {
    }

    init()
    {
        this.plugin = window.plugins.appsFlyer;
        this.plugin.initSdk(this.options, this.onInitSuccess.bind(this), this.onInitError.bind(this));
    }

    onInitSuccess(result)
    {
        try
        {
            this.conversionData = JSON.parse(result);  
        }
        catch (e)
        {
            this.conversionData = {};
        }
    }

    onInitError(error)
    {
        console.error(error);
    }

    logEvent(eventName, eventValues)
    {
        this.plugin.logEvent(eventName, eventValues, (x) => console.log(x), (x) => console.log(x));
    }

    logPurchase(sku, price)
    {
        // var purchaseInfo = {
        //     // productIdentifier: 'identifier', //iOS
        //     // transactionId: '12xxx56', //iOS
        //     publicKey: this.options.devKey,
        //     currency: 'usd',
        //     signature: "sig",
        //     purchaseData: sku,
        //     price: price,
        //     // additionalParameters: {'foo': 'bar'},
        // };
        // this.plugin.validateAndLogInAppPurchase(purchaseInfo, (x) => console.log(x), (x) => console.log(x));
        var  eventName = 'af_purchase';
        var  eventValues = {
            'af_currency':  'USD',
            'af_revenue':  price / 100,
            'af_sku': sku
        };
        this.logEvent(eventName, eventValues);
    }

    logRevenue(amount)
    {
        var  eventName = 'af_ad_revenue';
        var  eventValues = {
            'af_currency':  'USD',
            'af_revenue':  amount
        };
        this.logEvent(eventName, eventValues);
    }
}

var appsFlyer = new AppsFlyer();
document.addEventListener("deviceready", appsFlyer.init.bind(appsFlyer));