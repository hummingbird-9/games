class AdApi
{
    ApiReadyState = {
        "UNINITIALIZED": 0,
        "LOADING": 1,
        "READY": 2
    }

    readyState = 0;

    init() { }
    initAds() { }
    loadAd() { }
    isAdReady() { }
    showAd() { }

    isReady()
    {
        return this.readyState = this.ApiReadyState.READY;
    }
}