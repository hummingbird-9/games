// VibrationManager.js
class VibrationManager {
    static getInstance() {
        if (VibrationManager._instance) return VibrationManager._instance;
        VibrationManager._instance = new VibrationManager();
        return VibrationManager._instance;
    }

    constructor() {
        this.vibrationSupported = window.navigator && typeof window.navigator.vibrate === "function" && pc.platform.touch && !pc.platform.desktop;
        this.vibrationEnabled = true;

        this.LightDuration = 20;
        this.MediumDuration = 40;
        this.HeavyDuration = 80;
        this.LightAmplitude = 40;
        this.MediumAmplitude = 120;
        this.HeavyAmplitude = 255;

        this._selectionPattern = [0, this.LightDuration];
        this._lightimpactPattern = [0, this.LightDuration];
        this._mediumimpactPattern = [0, this.MediumDuration];
        this._heavyImpactPattern = [0, this.HeavyDuration];
        this._successPattern = [0, this.LightDuration, this.LightDuration, this.HeavyDuration];
        this._warningPattern = [0, this.HeavyDuration, this.LightDuration, this.MediumDuration];
        this._failurePattern = [0, this.MediumDuration, this.LightDuration, this.MediumDuration, this.LightDuration, this.HeavyDuration, this.LightDuration, this.LightDuration];
    }

    isVibrationSupported() {
        return this.vibrationSupported;
    }

    isVibrationEnabled() {
        return this.vibrationEnabled;
    }


    setVibrationEnabled(value) {
        this.vibrationEnabled = value;
    }

    _hapticAllowed() {
        return this.vibrationSupported && this.vibrationEnabled;
    }

    hapticSuccess() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._successPattern);
    }


    hapticFailure() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._failurePattern);
    }

    hapticWarning() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._warningPattern);
    }

    hapticSelection() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._selectionPattern);
    }

    hapticLightImpact() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._lightimpactPattern);
    }

    hapticMediumImpact() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._mediumimpactPattern);
    }

    hapticHeavyImpact() {
        if (this._hapticAllowed()) window.navigator.vibrate(this._heavyImpactPattern);
    }

}




// Preloader.js
window._createLoadingScreen = window._createLoadingScreen || function () {

    pc.script.createLoadingScreen(function (app) {
        var showSplash = function () {
            // splash wrapper
            var wrapper = document.createElement('div');
            wrapper.id = 'application-splash-wrapper';
            document.body.appendChild(wrapper);

            // splash
            var splash = document.createElement('div');
            splash.id = 'application-splash';
            wrapper.appendChild(splash);
            splash.style.display = 'none';

            var logo = document.createElement('img');
            logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAMAAACTGUWNAAAAn1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Kd3m4AAAANHRSTlMAJeIq5fYG1VucCCP6mKbxDx7q29HORKAvX1fnu8pJC8duVDJ2UDmqgXsYhkCQZMJxarNcQ99vygAADsVJREFUeNrsnEFrg0AQRsdtWGiNq1ZcBBuJDSkEctz//9t66KWFNjo7FueDeecc3ovBqLsOrebl4/bmjslY4OjebhdPW+NjOCRjJYcQPW1KWdXJYFBXJW1I7JPBpI+0GVeXDDbuShsR7fvPwkXahNLOP5n0JW2Ar5KRSeVJTrTrn2zqSGJ8SEY2wZOUYUxGNuNAUuZkCJhJip2BRAQS0pyTIeDckIy2S4aAriUZhd0Fi3CFHQAO+g6AnYJkdK39CTNR9idsl6Eygt2IsVF2I2aPIiSMgz2M46LtYZw9jhZQR1uQ4aNtQcaWJLPpS1uUZ6NwUd62pUi3pci521mITX+3rYlc9G5NJPIx2B3ZasYQPW2NH+Zw6g4LvB7TQ46vB9XI/btTmAdP/0PTPi0wjQu/jelJNXL/tqE9KV16iCtJNej+VCwFFKQadH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/YUDTcrd36/JXQH6Av8zh1H294LB+/r4efyXkBvgpjN9f8Zk8rUKLvxoyA4rnOv2gfl5XqsRfD3kBsc+dv6/DXxFZAe/u14++0zIq/DWRExBd/qv+GvxVkRFQ9oJhFwr8dcEP8JVk3Mv+/srgB0x1+pN6ogX291cGO8AH0civ3f21wQ4YRtHQu939tcEOmGVjH3f31wY7IMgGn+7urw1uQHMWjv61AyALaDvh8Gs7AJ/snYty2jAQRbdxbAgoMbahhdRACgTzfuX+/7e1mUxnymO8kkfFK4/PF0jZPdq1vA6mG5C9YWnrqQNQB4DyKH394qgDYEbpG5C2YWnrqQNQB4DyKH394qgDYEbpG5C2YWnrqQNQB4DyKH394qgDYEbpG5C2YWnrKT8AbcqnDsD/DUC8oXzqAPzfAKAxaFEedQAMM9oz+2/lgP/Do/vhxY4HgPuDhlM6Y9UFIEiCaSirJhmzajD5vKEzxnsAgiTY+EwyrEg2XEarCZ2TARAkwUQhl670AHBTDjjSOWsAgiQ4QtaUhjFBinzWdM4HAEEScPmQBiScF8MfeJ3GgBwJghfIGhQzZ4t8hp3rM0uOBJ0h8tmSdGbI59G7Ib0YCbxH5DMj6TSRj3q/8YPRYiR4V8inSdLZhIZVuLMHxEjA6RhuSDrs3UI6vjGgLkSCcQrHH4SvyxhfBKIGIEQCtgQMpT8GaPSh2N2o20Ik2MH5LpRoCYYsuFSgB4iQIMjAsCT5sI3EY58uGPgQIUH/kW/h5OM9GqfR+AWQIMESfP2SD99WDldXQWsA5UuwGoJh70AN5i8joJp0ySRE+RI0FZy/iNDbR3qdSDOFsiXopGBQ8p+DP/H417wTuqS1VihZgokPhgcXSgBR64QCCoy3CqVKwAuAU4ucYAYOtaMrxmsfZUqwU4DzV6FfzGNwdCO6IvgVozwJoi444jm5wTgFCvUTox5Kk2ALlnRMjjADSziiG7Sf/ZIkGIWozAmk9553GNENgtduUQmeV1ScaAiWeEqu0MrA89QiuxKk34ov+Ak8mSM90CcfCizqQGRXgrRNBTnorPeD3GHVBU/8TmRXgpcOFeI9xieOz8SdsYAGyZwsSMBJxTNPoMGCXKL/AA16fbIrQeIVWWsPGjz0ySmeocObR3YlWJMx3ht0eCa3mMd6EZiSVQkaERkyfQOA6jwFGyqA7oZsSqBeyYxNF5UUQFsBPLySTQm2ZMTrAyoqgLYCCJcdbQks39d0liGqKoBuIwRAZZ6OBPaLgJcpAFVsgb5YQJdGM9CXwNZXjEGzgU+q9wxQYN7Kf/rGSGA9AN+efOjSi8hJPnwYSNDSk8DO9GzLIP3hu3QLZDZvZV+C3sp2+gMvzryIuaSfALhvJTgFhqc/T+JkBf7iqHBnCRa20x/qSO4yzoC7ShB+t5z+QObsAcQPfdqXYN+xm/5Aw41hrBvwQ5/22yG145sfM8IJOc4CuJ8EaUcz/Sv+CPYvnQzAnSpB/J07/U3JnJhHz6c9xJ0k8A+W0x9D+R9FFn7lal8CtQ7spj8SBy+hdYcO7EsQLlt20x+xC1+EabELwWDcDvVwQW/CND/GhDuqDAcfliWIFgn+IVlEltMf/oEqxFIBdisBtY+nJFSACpPTsW359AeUC58E69Na+LAtAQXRfLIbTDZRQLbTH/7CoUlQHYKZj6ISsFhPf/iziv39/3AIUVQCBuvpj7BS5/9fBj8B2G2H+JufQvwcUCUZJbAvgf30RzKiijLdA3Yrgf3TH9i78yWMMdEPZVcC++mvfjg6AqHHeBbblMB++sczp1+AaTD6zd4Z4yYMBFHUjVMYCHIQshKJxkVEEVkp9v5nowRRgGcZsX9G7x3B+/7MJNg7p+IVAn/9yylt+b8y7vriMQ75Dz+l36UuP6b6YA/BVf/6A5a/GLoe/2fkf7rqyzEihAD93xIC9HdgcHhYjoea739vT/B/XgP6v7UTUP07pU5A9W8RAvQXCQH6txuHGH6ahwD923aCaaL6tw0B+rcNAfpHDAH6O41DDD8RQ4D+1k5A9X9IrBCgvzEE6L+GKCFAf+s4xPCzGv0QoL+1E1D9jSiHAP3rQoD+RjRDgP6vjEMMP0bUQoD+r3cCqn9bNtO2VLKdUlw3Y0PqAD45AEpQbGjCRhhDM8EfYja0qj+dQEN/QtBcf0LQ8YNMMPhJ0oi+/oSA11KiwItZJkLpTwg6Xs6VhtfTjUTUnxDwiZImfKRnQkd/PlPlQ+3wcFWBESX9uayD62piw4VNNjT1JwRc2hcRrq00IqQ/F7dqVX86gYb+hKC5/oRgFRsWOJhhhUkaWOJTAWus0sAitwpYZZgGlnnWwDrbJAwsdK5AfqX53/y9zL+sNGepvzr/vbf+4/lQbjicR+8Q9In6wLL3Hn7mY7nj+PPhPA7tly4J85ez/sOFvXNbThQIwnAHAmZ1BMRDEeMRjXh2jf3+z7bW7tV6asZ0aqap+a6Tqpn8fPTM0JBVfOskrcEsQfoJlWDRZr77hxuFt+j0Q95K0F5ABWgMeS5/uqLwSzCswOdukoJ77d9L8Q78EhQJSGfJvfVNBngXfgmWIJw85j752St8SId1ORTnIBq/xn3ykxyQgFeCmg+CGRfsJz89Qin2SlBIfkR2VLyXP11T+CVQRxBL1mY/+Ay/kIBdgnYGQhlH/Of+6y4S8EsQSb0JnQL+x14NDwn4l0PBCUTS6v7AY68XOgB+CboyGyWWrHd/OgD9SlDt7VjmYTlU4WtoVUNEJgn8QmE5PIl1uInliFeJTmEfICKXBMkqxnI0QRyLFEvh9UGLHSLySdAvqWkq72C6pACdLejRV4iMEmw7FVWgpACTGVxBFwFOCWaTaipQToBJBtpsEJFTAn9SRQXKLYG6GejjtxFZJci6FVwILX/wketvhbwSLNqV2wusOz/YdJBEiLwSfKZlAlyDHE4KSYIpPEljgMgrwTRAEiXoRKheIE2zDs/yMkBeCeq/kKaQ0y06S5Fk0oLnWTcDXglaQyRJ5bw5M0eSePQ9x95rvBKMYiSZgxDKnNfs4Jv4T3+trzt68ohjIOXBTIldcKcFZwxJkE5DuKLVqc5ueI4Uag9njEkQbMa3+o2qcg+qf9EyJ3DGnARqN6Y77q75krEO8j0kCHI4Y1ICtanDJXmABJ6MJq03xS4AvwRq/oQC6g0ksNOYhzkJ4vyJK2cHAqCbN4drIOGXgG76XA+R4CChW91/RYIVnDEvwXW/1QoJXiUUgU9FzSKDM+YlCN7hgoy6dpSEt8ZWSFCE8BfjElz1W4UFEkh4eThCgj38w7wEc7hgjwQRWE8y1LiPGpag1tKtX0P7q3DD0zjSMi3BVPcY0bP/tcltjI/ZAANMEhwSzZaLeAu286a5kDAqQdzTXcLZvxee65cAgxJsroqA+APRncEypi/BJLlcQog/jIiohVwIBHwS6D/nDSPp69Bw8FQNNibBSbMKD2z/vHRCdVoegYBTAv0icKTuWbZvBKieOJUDA3wSFPA/uRLeH7cm5h1sgQE+CQ7ji20M8Us12wOgNsLxDAi4JdC7omex8K0w9RZj6gMBtwR6f1A/JX7e9n+z8eLZNAFaAu/F5vGLDwBgm7oAjE6g4bkAdCZgfDy2jd8F4AJwAbgAXAAuABeAC8AF4AJwAbgAXAAuABeAC8BmbJuAC8DwBFptfEi7Zff4xQeQTKguB7vHLz4AqlEssn384gOYEg3qto9ffADZBz7gI7N9/OIDCKPHnaq2j198AA+/BBSP7B+/+ADCJt6lGdo/fvEBQKOLd+g2JIxffADQ8+6MpSdj/OIDgNy7OZRcyvjFB/CHm3s5ARAGoig6fgiIEBXRjShI+u9R3ClWcEwF5/JW2Uysy1eyrI6fHyCqbng7hq6S/PwAkY68Pf5f+UiWnx8gIpUz73Pbzns+S/L8/AD3G6emmUbXzw/wfz8foPv5AN3PB+h+PkD38wG6nw/Q/XyA7ucDdD8foPv5AN3PB+h+PkD38wG6nw/Q/XyA7ucDdD8foPv5AN3PB+h+PkD38wG6nw/Q/XyA7ucDdD8foPv5AN3PB+h+PkD3R1/b59+vdu4lxWEYBgOw6gZvkjhJhwiDS5hSsijM0vc/20AP0ESWhtHi/05gErCth+V8/fNyPbCV+lHZrq7p17/M9Ddifj9wOHAb6kfDrXNNvf73A5AcyVrkVCqcVBJHMtWPUwWBaeyNn3mC0PpDZvZQQSzsZITx/ZsEJhM99p9Ga2807gUajZH0Ntx/mk1sMvILmqVIWhnxl0LJpPWooPAgLexAKslg9C8ofM/64deg8LWQzgVRsEq44AdI+PsB2IK0WxAOYSFnhzCuoToJgZiYs0AMqQiNkpGMk/KWjCNGOrrZxCjIyHkryKAk2WztUZQXc1iUR1tKm7CjMes/rYzWRCm/rYlEkVNX4aQucSRr8fm6h6HCgSHcX89IZ/0CYzoflCa2rF8AAAAASUVORK5CYII=';
            splash.appendChild(logo);
            logo.onload = function () {
                splash.style.display = 'block';
            };

            var container = document.createElement('div');
            container.id = 'progress-bar-container';
            splash.appendChild(container);

            var bar = document.createElement('div');
            bar.id = 'progress-bar';
            container.appendChild(bar);

            var barFrame = document.createElement('div');
            barFrame.id = 'progress-bar-frame';
            container.appendChild(barFrame);

            const loaderOverlay = document.createElement('div');
            loaderOverlay.id = 'preloader';
            loaderOverlay.classList.add('preloader-hidden');
            document.body.appendChild(loaderOverlay);

            const loaderDiv = document.createElement('div');
            loaderDiv.id = 'preloaderAnimation';
            loaderOverlay.appendChild(loaderDiv);

            const loadingTextDiv = document.createElement('div');
            loadingTextDiv.id = 'loading-text';
            loaderDiv.appendChild(loadingTextDiv);

            const ldsDiv = document.createElement('div');
            ldsDiv.classList.add('lds-default');
            loaderDiv.appendChild(ldsDiv);

            for (let i = 0; i < 12; i++) {
                const circleDiv = document.createElement('div');
                ldsDiv.appendChild(circleDiv);
            }
        };

        const backgroundImageDataURL = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFcUExURVCyy0+xy06xyk6wyk2wyk2vyUyuyUuuyUutyEqtyEqsyEmsyEirx0eqx0epxkapxkWoxkWoxUSnxUOmxUKmxEKlxEGlxEGkw0Cjwz+jwz+iwz6iwj6hwj2hwj2gwTygwTufwTqewDqdwDmdwDidvzicvzebvzebvjaavjWavjWZvjSYvTOYvTKXvDGWvDGVvDCVuy+Uuy6Uuy6Tui6Sui2SuiySuSuRuSuQuSqPuCmPuCmOuCiOtyiNtyeNtyaMtiWLtiWKtiSKtSOJtSKItCGItCGHtCCHsyCGsx+Gsx6Fsx6Esh2Esh2DshyDsRuCsRqBsBmAsBh/sBh/rxd+rxZ9rhV9rhV8rhR8rRR7rRN7rRJ6rRJ5rBF5rBF4rBB4qw93qw52qw52qg11qgx1qgx0qQtzqQpyqAlyqAlxqAhxqAhwpwdwpwZvpwZupgVupgVtpgRtpQNspf///1zWfd4AAAABYktHRHNBCT3OAAAACXBIWXMAAHUwAAB1MAHdM3LNAAAAB3RJTUUH6AMZDCghRFwWGgAACWx6VFh0UmF3IHByb2ZpbGUgdHlwZSB4bXAAAHja7V3dkrM2DL3XU3yPAJax4XGygdx1ppd9/B7JJPyDITutmXGZZrNgWzqWjiVbzH70z19/058/f0pvfE385JevfeFKx+7HVd6awhlXOe8a13FrTPf6+fl5GYP7jbNyp/Jc2ZYL2/rCMtrWriFb+4dHx4r9w3aVdfiJAZnRyRh+cVc8+OlrfvjaoaNrRZgrTSG/u6frPMszEgnQxrqX6MGP8ODTXDUZhsG9H+lhPz1MUdW2rQoyotzL6y2uTIf/W+hTsGFIZc8N7pVc4fK4jHkaeVbgnjUv+YnPkplMix8NP9jieuBBYeaXEXjhO0Aa6OL4URlrrRsAkiIMDwVk7S2ugh8A9fL6n+k8GplO9fYqv5FL9TH4NPhsKQxiWugNK8m8+BrgMFPyfNBlrhHUgfFgGuMamTuCSV+ug4p9A0y8gWxMtWiImX6YYv2aWU1ssQSlGnWDNfEdJnEt4NbQuRCAMEIhVg2i6EgWhuKV2Sugs3HPYeZIGkKDCh0r8R6ZJ2gTJJaDxCOBBF+tMSogYOrk2zmgn9707r5EfTzBMr+2Besgmq5OMgZsx0LpQCp7ayvvgjPsCaU9qbJaeLgb2rwqow74Umth6ZDhg2nEcYsHRc0G9JKB1mj01ouOZ2NPrzC86ESRFrKgkjurUd/pnEPoMgJ1a+l8xhXffd7iSOTNF4vPkqEuhyVDFosKMyf+byoZ9OWe3I0XXKoWFJHF1/JoQS1MXWlMkW5Y6dg0/FSjjMTQUk60dpW14Sd3bEilNli5C8bKKMtiZXWxf+hy/2AEAvOjwUBX9KUuYTAaRj3QpIW+ak/fjDVREbJm44tTTRrVxGg8KVUfs6nJyqAUoYmGShc6lGvaiDJ0QZvVgTc10rX6AQeXNbmVxtwBDL4hvah0beycFxGhJU2bbsBcLscPCfSgBvqGGSNFy6p8RPNt69Jqd3FO9p+oAioIxypZl2RQ8HMxHE0gvMOxJDp+XfZ6AHdPhGzugkVMp74hOYmxWEptaZEHseRe+IYwj0QH3/Q+16Ic19bK4gm7wrMNbkgeBI/QmfrIEBHbOo3bCgLagrA5/RvzR3sTOPZxDYQPK6kPq0NqdwuKhKkhnZumn5uGxbnEx2uu4HaSzdVcY3rgZ7I26b1aVnu5hwmpdCWHFoSOjK+VdByosCd/y4/GHef4teMk59UWQf/pDFKYQuhjAayEbo5lSW/xO0PlAgBYElW9h+xVwCq8Ek+R3aFnKVYnScwdL0Ct6rZnDOo7ik80YdsAKM/1geaOi2eYOZijkcXfqNLwXMCyUBrJcw9JGhd6T8wB73VGV3MJ1k4NNMJB8frse1kYCDHz45gHxPhk/rIalENbOu4irBvycNmQCQ+QifQ5im68JNEapylb4XtV0JDNPYS0rNkH0gW43ijgYaJlKieNx213FrYdeZtUHZhKU2+47gzUe8Oh/KOZozUo3oOOlcxEn9pEJBk0iaarg8VZkWa6SBzDNwxTigWtxlXx7ml+tkzPaJafNZKf2VZPAcKOUpv2OdqOSBrLPI5j21Fm249OEUSjyG8QxDENTo8hS92onCTHBrTz5ID7eLbiRyzOjhlAEic7B82tQQ64WqNOKBsKjXIYStKLUsiin07jnq749D051h3ymBxemVDqpxsyTfqeHEEV+p4cgRv0PTmCSIojx6priEZiFtEc5u+wdZs74KRJHAcpNtU74iBtkfAsB1eX2im34jhIFyd6wQHaICEjzCAggUkhQCGXRgerWaXc16xSE686hC9CJ+fCOWMl52sstL0QoCgOyoyDctjZ6mHmh4MhHFV9nKqVhOWVAEWHukRycOcAYePYYEMIzaVcZR2NOfUN6z6eHb/BWmcdHYe+ONYdhaNymhrKT+EdRM7SQ4oPgfsiKUDCQOGEoQpbQBjV6MmVPC3QBvPgWNPUcGz9gl5wjNk5pF/xJflNCxgrZw8TX+oVoakm1xOb1DN/hYgNzoXkJirz37DsxKtIZMM6p809tzZdNffc2nTV3JtcO5/HTq19Na4tQihdz2MX0C7lsXLMIpecUngJobJfw2969tLgsVT5Wt3ssZ6YstyRNAxzIwcb0rVeC6F0PY+dr0eHMTQuhNL1PHYa3eh6HjsNoXQcQ+NC6FEUmQXI7RBKZzLXPdatZyMXWEe/sXsUMtFv7B4X0C6xrj8EpSunoItD0PE265vdoyChncy1L1TE1SnoN3aPA2m/3D3K5pEOSl/R/KNzALb5R9/uHN8EojNFgvlp6MSzFwfQEcetszqABm56JzH2k0ZcS5h305q+7Bx7oHllv7jcLtIQ7Pbl7x5NC2k/3b+oQOjx4W9UIOQcl/oKxBha9EH9OrQv6xD0zdHzcPKsCXu8Ppvls1DNGjv63M83KfJ+I+FdCgkHUUM+zfL203N4C2FoOG+3mvmPJVT1m03uKS8PfQR4rUIW4dLXmfrvQTAdDXAErWpCPzoreT7Auz9FS17Rt8LMwTw2vIEwlbPbfKN8ru9rkFrmU7GuuH9ZTyrcGpTBMHW7zyshG61pT4rqiB2Tl6D5rGprdfckrsAjd5F4a2kq7ajbtlhaDNDsyd0UK4d1R3InVevZa3BDj5XTmvAWX3h9UQg5f4Ex+mjs2vVfD3ScLd0IWlzqdxNoZ8GkDG0n0boftKVh/m+NvhgoslJzD2jnKJM4tG/4nxq0yD3tPaBFHozfA9q+l90M2hnKJA/tOv8ThPZdMpMWtMgy/T2g7RnmdtDivewG0K5SJklov8P/NKCNsaSh0RcDRRah7gEt1stuAe0aZRKF9hv8TwXa4UvMd4J2+CbLnaBFvsR8D2hXKJMstO/5nw60w3f97gQt8m2fe0CLfI/tHtDOUyZhaN/yPyVoO3+54n7QcjEzVWi5mJkotFzMTBVaLmamCi0XMxOFlouZqULLxcxUoeViZqLQcjEzVWi5mJkotFzMTBVaLmamCi0XMxOFlouZqULLxcxEoeViZqrQcjEzVWi5mJkotFzMTBVaLmYmCi0XM1OFlouZqULLxcxEoeViZqrQcjEzVWi5mJkotFzMTBVaLmYmCi0XM1OFlouZqULLxcxEoeViZqrQcjEzUWi5mJkqtFzMTBVaLmYmCi0XM1OFlouZiULLxcxUoeViZqrQcjEzUWi5mPnuyk9++br/lw1+5M/wm0L+9r+z8g+7eG8Mv7ijfwGydmrVJjkcAgAAAAFvck5UAc+id5oAAAEoSURBVHjaxc7VQRAAAEDBZzcqdmIBit1dgKJid3e37v/BGHcTXGmzsGZjzcGaizUPaz7WAqyFWIuwFmMtwVqK+cAyrAGs5VgrsFZiDWI+sAprNdYarLVY67DWY23A2oi1CWsz1hasrVhDWNswH9iOtQNrJ9YurGGsEaxRrN1Ye7DGsPZiPrAPaz/mAwewDmIdwjqMdQTrKNYxrONYJ7BOYj5wCus01hmss1jnsM5jXcC6iPnAJazLWONYE5gPTGJdwbqKNYV1Des61g2saaybWLewbmPdwXzgLuYD97DuYz3Aeoj5wCOsx1hPsJ5iPcN6jvUC6yXWK6zXWG+w3mI+8A7rPdYHrI9Yn7A+Yz7wBesr1jes71g/sH5i/cL6jfUH6y/WP6z/2AycLVJTACW+9wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wMy0yNVQxMjo0MDoyMiswMDowMMU+D2EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDMtMjVUMTI6NDA6MjIrMDA6MDC0Y7fdAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTAzLTI1VDEyOjQwOjMyKzAwOjAwL9yWnAAAABN0RVh0ZGM6Zm9ybWF0AGltYWdlL3BuZ/+5Gz4AAAAVdEVYdHBob3Rvc2hvcDpDb2xvck1vZGUAM1YCs0AAAAAUdEVYdHhtcDpDb2xvclNwYWNlADY1NTM1O1RN8gAAACh0RVh0eG1wOkNyZWF0ZURhdGUAMjAxOS0wOC0yMlQxNTo1NzozMCswMjowMHA7VU0AAAAxdEVYdHhtcDpDcmVhdG9yVG9vbABBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykySyUpAAAAKnRFWHR4bXA6TWV0YWRhdGFEYXRlADIwMjItMDYtMjlUMTI6NDE6NTIrMDI6MDAgCgTtAAAAKHRFWHR4bXA6TW9kaWZ5RGF0ZQAyMDIyLTA2LTI5VDEyOjQxOjUyKzAyOjAwHK5XUwAAABh0RVh0eG1wOlBpeGVsWERpbWVuc2lvbgAxMDI0YdamzwAAABh0RVh0eG1wOlBpeGVsWURpbWVuc2lvbgAxMDI02C19JwAAAD50RVh0eG1wTU06RGVyaXZlZEZyb20AeG1wLmRpZDplY2U4OWViZi1iNmY0LTRiNzAtOWQwNC0zZjA1YjE1MmNmZjWOiz6XAAAAS3RFWHR4bXBNTTpEb2N1bWVudElEAGFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZDkxZjY5Zi1kMzcwLTM0NGYtYTMxOC04YTcxYjVhMDc5ZGMjfcu9AAAAPXRFWHR4bXBNTTpJbnN0YW5jZUlEAHhtcC5paWQ6OTRjMTI4NWUtMTg4Yy1hMTRlLThiMmMtNzVmZjczYzNmNTVlp/oOmwAAAEV0RVh0eG1wTU06T3JpZ2luYWxEb2N1bWVudElEAHhtcC5kaWQ6ZWNlODllYmYtYjZmNC00YjcwLTlkMDQtM2YwNWIxNTJjZmY1uDastAAAAABJRU5ErkJggg==") no-repeat center'

        /* loading progress */
        let loadingProgress = 0;
        let realProgress = 0;
        let simulatedProgress = 0;
        const realProgressRange = 0.875;
        const simulatedProgressRange = 1 - realProgressRange;
        let simulationStep = 0;
        let simulationTotalSteps = 0;
        let simulationInterval = null;

        const updateProgressSimulation = () => {
            simulationStep += 1;
            simulatedProgress = pc.math.clamp(simulationStep / simulationTotalSteps, 0, 1);
            updateProgress();
        }

        const finishProgressSimulation = () => {
            appReadyToStart = true;
            clearInterval(simulationInterval);
            simulatedProgress = 1;
            updateProgress();
        }

        const startProgressSimulation = (simulationTime = 10.0) => {
            const tickDuration = 0.05;
            simulationStep = 0;
            simulationTotalSteps = Math.ceil(simulationTime / tickDuration);
            simulationInterval = setInterval(updateProgressSimulation, tickDuration * 1000);
        };

        var hideSplash = function () {


            pc.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, 0);
            pc.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, 0.5, () => {
                APIMediator.initCallbacks();
                APIMediator.reportGameReady();
            });

            var splash = document.getElementById('application-splash-wrapper');
            splash.addEventListener('transitionend', () => {
                if (splash.parentElement) splash.parentElement.removeChild(splash);
            }, false);
            splash.classList.add('wrapper-hidden');
        };

        const updateProgress = () => {
            loadingProgress = realProgress * realProgressRange + simulatedProgress * simulatedProgressRange;
            setProgress(loadingProgress);
        }

        var setProgress = function (value) {
            APIMediator.sendPreloadProgress(value * 100);
            var bar = document.getElementById('progress-bar');
            if (bar) {
                value = Math.min(1, Math.max(0, value));
                bar.style.width = value * 100 + '%';
            }
        };

        var createCss = function () {
            var css = [
                'body {',
                '    background: ' + backgroundImageDataURL + ';',
                '    background-size: cover;',
                `
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                touch-action: none;
                -webkit-touch-action: none;
                -moz-touch-action: none;
                -ms-touch-action: none;
                -webkit-touch-callout: none;
            `,
                '}',

                '#application-splash-wrapper {',
                '    position: absolute;',
                '    top: 0;',
                '    left: 0;',
                '    height: 100%;',
                '    width: 100%;',
                '    background: ' + backgroundImageDataURL + ';',
                '    background-size: cover;',
                '    transition: opacity 0.1s linear;',
                '}',

                `
            .wrapper-hidden {
                opacity: 0;
            }

            .wrapper-visible {
                opacity: 1;
            }
            `,

                '#application-splash {',
                '    position: absolute;',
                '    height: 300px;',
                '    width: 400px;',
                '    left: 0;',
                '    right: 0;',
                '    top: -60px;',
                '    bottom: 0;',
                '    margin: auto;',
                '}',

                '#application-splash img {',
                '   height: calc(100% - 90px);',
                '   position: absolute;',
                '   bottom: 70px;',
                '   left: 0;',
                '   right: 0;',
                '   top: 0;',
                '   margin: auto;',
                '   -webkit-user-select: none;',
                '}',

                '#progress-bar-container {',
                '    bottom: 0;',
                '    height: 46px;',
                '    width: 100%;',
                '    position: absolute;',
                '}',

                '#progress-bar {',
                '    position: absolute;',
                '    width: 0%;',
                '    height: 100%;',
                '    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAuCAMAAAAx1r9PAAAAZlBMVEWWxtmTxNmWx9kAAACVxteTxNeTxdSSxdOTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmTxNmUxdmTxNjEpLOcAAAAH3RSTlP++P4A/f77+zjlIV0uhO3Y9K2cSQtkUD8YBMXRtW5qWDnqgQAAAdJJREFUeNrt3MuSqyAUhWESQfEaY+7pc3rh+79kVxpBraSnbAfrm2SevywUtqpsxdoBlNDT2mxlFeT0DUqurf8IcmtBItr6UxBbgoSY+i3I/ckegvrnbR3k3oFEdXYZ5F5izVECWDJ2DtKUqxYGTlECGI3DzMYgR8y03hcjKIkx32uNoAxBbgcETmsDSsho7eB1tQ9yKxGo3IESc7mCt7v8BrkgUAUvDwGmCEWGV5CmZw8pc5F4iahHjYnL2UOIyeG1Z1Vh4vZcP8Q4De+qzphozbtdMaOeilg1hEa835VkppvffwoTp0CClJt+dyFRDhJUmBhkwhVE1AhP7UBb4oNwCZGnGGRbGGRjGGRjFBf1TYpBRj6oizJ44YPhZoQHQ26dbETcOmkx0RokZP73B26/b8Ji+71CwAMqOU7DO6nHFQGPcKXMR7gPFccWOeQgZR5y6OrXGFANFhFlCgdv+J3Lsgd4HJQToeOgXH/1o6TNFyKOkiamtcakPHHYWpj5PGyd3b+w4AzcnhIARoeor2KQ7HwACeuq5SttDxYRVlbrlz7PRyYR1B2bt9eiGxYR058+fTigqXl6KOMSeoQgQXMFJfffvn1aY1ZV7Y4SOlZVtvIDELD/zRf9F7IAAAAASUVORK5CYII=");',
                '    background-repeat: no-repeat;',
                '    background-size: 400px 100%;',
                '    margin-top: 0;',
                '    margin-left: 0;',
                '}',

                '#progress-bar-frame {',
                '    height: 100%;',
                '    width: 100%;',
                '    position: absolute;',
                '    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAuCAMAAAAx1r9PAAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMArvi8+/Tp18wL2wa3UygYE/btnR8c8dKyqYhaRT8vIuJ9cw/GwKKShGxLZY5gN5YYqdamAAACLUlEQVR42u3cyZaqUAwF0IMifSeKvWLfllX5/697C4nYPKtmEgfZM5iedZMbuIAnqyjcBV6L1Nv17MHomLv4S3QemKRqlG7DDL/JFzap2q0PK7x0dkiJaB7xv6TTICUk3ft4Eq1JyTGNFR7MPFKimjHuRDbdac8dQ71fYFv3iSSoxA7d9HenGVQdksnCaNPV1gXzO1Sx9t9Q9VmNDWLmAWzcINZaT6HqFS9TkxcDV6bcIZYOY6jahR4nMnRRWBLrDRMoAaHNRWsCAN0+sbWuDyEnbu2BD2BMzNJ2LuaH2/gMcAfEFj6UkJzL1JePbotKtk4fgkY9KngJQmJ7KDnxnAqtCUZUao2hBJWdo7FAQCU7ghK05FEENpWaUJKmJhUcpFTqQEnizZWHtgbyETgQSwP5EFUglgbyEaqS1afSRud0UZNrUw+o5Om2V1K17dXB8EME18HwSGwEJafLj06myHpU8vThoqCvsqfbCVyD2F7bupiZfStTIbFUDziI6ZhUMCMAmUPMyaBEHBp0YfiXK2I9Q1+qixh7dGFOUcjWVSKDHKp257n5eHYxbBNr9ydQ9cr3Lc5jHoHtqJLuNJI6JacmscbpdndDN952+e1C1SA7fgUmXXV8VHKH7piWHTTV223mPboZuLgT9UmJGqzwoLshJcfcuniy2unfAsRYS7wQ6iIRYkzxUnzQL9UFBGMXv8nCYZtUjayfSYK/uNlxZPTThno7yxkuprGPR/8AaTgKsiMstmsAAAAASUVORK5CYII=");',
                '    background-repeat: no-repeat;',
                '    background-position: left center;',
                '    background-size: 400px 100%;',
                '    margin-top: 0;',
                '    margin-left: 0;',
                '}',

                '@media (max-width: 480px) or (max-height: 480px) {',
                '#application-splash {',
                '   width: 200px;',
                '   height: 150px;',
                '   top: 0;',
                '}',

                '#application-splash img {',
                '   height: calc(100% - 40px);',
                '   bottom: 40px;',
                '}',

                '#progress-bar-container {',
                '   background-size: 200px 100%;',
                '   height: 20px;',
                '}',

                '#progress-bar {',
                '   background-size: 200px 100%;',
                '}',

                '#progress-bar-frame {',
                '   background-size: 200px 100%;',
                '}',
                '}',

                `
            :root {
                --preloader-transition-duration: 0.2s;
            }

            #preloader {
                display: block;
                position: absolute;
                background: ${backgroundImageDataURL};
                background-size: cover !important;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                margin: 0;
                z-index: 9999;
                transition: visibility var(--preloader-transition-duration), opacity var(--preloader-transition-duration) linear;
            }

            .preloader-hidden {
                opacity: 0;
                visibility: hidden;
            }

            .preloader-visible {
                opacity: 1;
                visibility: visible;
            }

            #preloaderAnimation {
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 9999;
                transform: scale(175%);
            }

            #loading-text {
                position: absolute;
                font-family: 'system-ui';
                font-size: 14px;
                text-align: center;
                font-weight: lighter;
                color: #ffffff;
                width: 80px;
                margin-left: -40px;
                margin-top: -10px;
            }


            .lds-default {
                position: absolute;
                width: 80px;
                height: 80px;
                margin-top: -40px;
                margin-left: -40px;
            }

            .lds-default div {
                position: absolute;
                width: 6px;
                height: 6px;
                background: #ffffff;
                border-radius: 50%;
                animation: lds-default 0.6s linear infinite;
            }

            .lds-default div:nth-child(1) {
                animation-delay: 0s;
                top: 37px;
                left: 66px;
            }

            .lds-default div:nth-child(2) {
                animation-delay: -0.05s;
                top: 22px;
                left: 62px;
            }

            .lds-default div:nth-child(3) {
                animation-delay: -0.1s;
                top: 11px;
                left: 52px;
            }

            .lds-default div:nth-child(4) {
                animation-delay: -0.15s;
                top: 7px;
                left: 37px;
            }

            .lds-default div:nth-child(5) {
                animation-delay: -0.2s;
                top: 11px;
                left: 22px;
            }

            .lds-default div:nth-child(6) {
                animation-delay: -0.25s;
                top: 22px;
                left: 11px;
            }

            .lds-default div:nth-child(7) {
                animation-delay: -0.3s;
                top: 37px;
                left: 7px;
            }

            .lds-default div:nth-child(8) {
                animation-delay: -0.35s;
                top: 52px;
                left: 11px;
            }

            .lds-default div:nth-child(9) {
                animation-delay: -0.4s;
                top: 62px;
                left: 22px;
            }

            .lds-default div:nth-child(10) {
                animation-delay: -0.45s;
                top: 66px;
                left: 37px;
            }

            .lds-default div:nth-child(11) {
                animation-delay: -0.5s;
                top: 62px;
                left: 52px;
            }

            .lds-default div:nth-child(12) {
                animation-delay: -0.55s;
                top: 52px;
                left: 62px;
            }


            @keyframes lds-default {
                0%, 20%, 80%, 100% {
                    transform: scale(1);
                    opacity: 25%;
                }
                50% {
                    transform: scale(2);
                    opacity: 100%;
                }
            }`
            ].join('\n');

            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            document.head.appendChild(style);
        };

        createCss();
        showSplash();
        app.on('preload:start', function () {
            startProgressSimulation(10);
        });
        app.on('preload:end', function () {
            app.off('preload:progress');
        });
        app.on('preload:progress', (progress) => {
            realProgress = progress;
            updateProgress();
        });
        app.on('start', () => {
            /* wait until all the scene assets loaded, then remove the loading screen */
            app.once(EventTypes.SCENE_CHANGED, () => {
                AssetsLoader.getInstance().loadPendingAssets().then(() => {
                    finishProgressSimulation();
                    hideSplash();
                });
            });
        });
    });
}

if (APIMediator.isPlaycanvasEnvironment()) {
    window.GameInterface.init().then(() => {
        window._createLoadingScreen();
    });
} else {
    window._createLoadingScreen();
}


// Question.js
class Question {

    constructor(rawLine) {
        this.rawLine = rawLine;
        this.id = 0;
        this.questionText = "[Question]";
        this.answers = [];
        this.givenAnswers = [];
        this.numberOfGivenAnswers = 0;

        this._parseRawLine(rawLine);
    }

    _parseRawLine(rawLine) {
        const fieldSeparator = ',';
        const subFieldSeparator = '/';
        const fields = rawLine.split(fieldSeparator);
        let index = 0;
        let answerID = 0;
        while (index < fields.length) {
            const field = fields[index];
            if (index == 0) {
                this.questionText = field.replace("$", ",").replace("\\u200B", "\u200B").replace("\\n", "\n");
            } else if (index == 1) {
                this.id = +`${field}`;
            } else if (index > 1 && index % 2 == 0) {

                const answersLine = field;
                const scoreLine = fields[++index];

                if (answersLine && typeof scoreLine !== 'undefined') {
                    const variants = answersLine.split(subFieldSeparator).map(dirtyAnswer => dirtyAnswer.replace("$", ",").replace("\\u200B", "\u200B").replace("\\n", "\n"));
                    const score = +`${scoreLine}`;

                    const answer = new Answer(answerID++, variants, score);
                    this.answers.push(answer);
                }
            }
            index++;
        }
    }

    initialize() {
        console.log(`[Question] Initializing #${this.id} ${this.questionText}...`);
        this.givenAnswers = [];
        this.numberOfGivenAnswers = 0;
        for (let i = 0; i < 6; i++) {
            this.givenAnswers.push(new GivenAnswer(this.answers[i], this.answers[i].points, i === 0, null));
        }
    }

    checkAnswer(_value) {
        let bestLevenshtein = 0;
        let _bestAnswer = null;

        for (let answer of this.answers) {
            for (let variant of answer.variants) {
                const levenshteinValue = Levenshtein(variant, _value);
                if (levenshteinValue > GameConfig.getAttribute('gameplay', 'minAnswerLevenshtein') && levenshteinValue > bestLevenshtein) {
                    bestLevenshtein = levenshteinValue;
                    _bestAnswer = answer;
                }
            }
        }

        return _bestAnswer;
    }

    checkAnwerAlreadyGiven(answer) {
        let givenAnswer = this.givenAnswers.find(_ga => _ga.answer.id === answer.id);
        if (givenAnswer) {
            const isTaken = !!givenAnswer.contestantData;
            return isTaken;
        }
        return false;
    }

    getRandomUnusedAnswer() {
        const answers = this.givenAnswers.filter(_ga => !_ga.contestantData);
        if(answers.length > 0) {
            return Utils.getRandomItem(answers).answer;
        }
        return null;
    }

    tryGetAnswerSlot(_answer, _contestantData) {
        let points = 0;
        let hasKey = false;

        // Check if in the list
        let index = this.givenAnswers.findIndex(x => x.answer.id == _answer.id);
        if (index >= 0) {
            points = this.givenAnswers[index].points;
            hasKey = index == 0;
            this.givenAnswers[index].setContestant(_contestantData);
            this.numberOfGivenAnswers++;
            return {
                success: true,
                points,
                hasKey
            };
        }

        // If not in the list add at the last available place between except in the first 2
        for (let i = 5; i > 1; i--) {
            if (!this.givenAnswers[i].contestantData) {
                points = this.givenAnswers[i].points;
                hasKey = false;
                this.givenAnswers[i].setAnswerAndContestant(_answer, _contestantData);
                this.numberOfGivenAnswers++;
                return {
                    success: true,
                    points,
                    hasKey
                };
            }
        }

        return {
            success: false,
            points: 0,
            hasKey: false
        };
    }

    _findBestNotTakenAnswer() {
        for(let i = 0; i < this.answers.length; i++) {
            const answer = this.answers[i];
            if(this.givenAnswers.find(_ga => _ga.answer.id === answer.id)) continue;
            return answer;
        }
        return undefined;
    }

    reset() {
        this.givenAnswers = [];
    }

    toString() {
        return `#${this.id}: ${this.questionText} - ${this.answers.map(a => a.variants.join('/') + ': ' + a.score).join(', ')}`
    }

    clone() {
        return new Question(this.rawLine);
    }

}

// Answer.js
class Answer {

    constructor(id, variants, points) {
        this.id = id;
        this.variants = variants;
        this.points = points;
    }

    getAnswerText() {
        return this.variants[0];
    }
}

// GivenAnswer.js
class GivenAnswer {

    constructor(_answer, _points, _hasKey, _contestantData) {
        this.answer = _answer;
        this.points = _points;
        this.hasKey = _hasKey;
        this.contestantData = _contestantData;
    }

    setContestant(_contestantData) {
        this.contestantData = _contestantData;
    }

    setAnswerAndContestant(_answer, _contestantData) {
        this.answer = _answer;
        this.contestantData = _contestantData;
    }

}

// DailyChallengeAnswer.js
class DailyChallengeAnswer {

    constructor(id, answer) {
        this.id = id;
        this.answer = answer;
        this.isCorrect = false;
        this.percent = answer.points || Math.floor(pc.math.random(1, 5));
        this.aiAnswerPercent = 0;
        this._answerPercentRangeFrom = 0;
        this._answerPercentRangeTo = 100;
    }

    linkButton(buttonIndex) {
        this.buttonIndex = buttonIndex;
    }

    linkDoor(door) {
        this.door = door;
    }

    setCorrect(value) {
        this.isCorrect = value;
    }

    getAnswerText() {
        return this.answer.getAnswerText();
    }

    setAnswerPercentRange(from, to) {
        this._answerPercentRangeFrom = from;
        this._answerPercentRangeTo = to;
    }

    checkAnswerPercentRangeContains(value) {
        return this._answerPercentRangeFrom <= value && this._answerPercentRangeTo >= value;
    }
}

// ContestantAI.js
class ContestantAI {

    constructor(difficulty, settings) {
        this.difficulty = difficulty;
        this.settings = settings;

        this.answerIndex = 0;
        this.answers = [];
    }

    _buildOpponentsAnswers() {
        this.opponentAnswers = [];

        let randomFLoat = Math.random() * 0.1;
        let firstTimingToAdd = 0.85 + randomFLoat;
        let answersP2num = Math.floor(pc.math.random(6, 10));

        const firstItem = { timing: firstTimingToAdd, index: -1 };
        this.opponentAnswers.push(firstItem);

        for (let i = 1; i < answersP2num; i++) {
            let n = (answersP2num - 1 - i) / answersP2num * firstTimingToAdd;
            randomFLoat = Math.random() * 0.14;
            let timingToAdd = n + randomFLoat - 0.07;
            let itemToAdd = { timing: timingToAdd, index: -1 };
            this.opponentAnswers.push(itemToAdd);
        }

        const totalAnswers = this.opponentAnswers.length;

        switch (this.settings.index) {
            case 0:
                this.opponentAnswers[0].index = 5;
                this.opponentAnswers[totalAnswers - 2].index = 3;
                break;
            case 1:
                this.opponentAnswers[2].index = 3;
                this.opponentAnswers[totalAnswers - 2].index = 5;
                break;
            case 2:
                this.opponentAnswers[0].index = 4;
                this.opponentAnswers[2].index = 1;
                break;
            case 3:
                this.opponentAnswers[0].index = 2;
                this.opponentAnswers[2].index = 5;
                this.opponentAnswers[totalAnswers - 2].index = 3;
                break;
            case 4:
                this.opponentAnswers[0].index = 1;
                this.opponentAnswers[2].index = 5;
                this.opponentAnswers[totalAnswers - 2].index = 3;
                this.opponentAnswers[totalAnswers - 1].index = 4;
                break;
            case 5:
                this.opponentAnswers[0].index = 1;
                this.opponentAnswers[2].index = 4;
                this.opponentAnswers[totalAnswers - 2].index = 5;
                this.opponentAnswers[totalAnswers - 1].index = 2;
                break;
            case 6:
                this.opponentAnswers[0].index = 4;
                this.opponentAnswers[2].index = 0;
                this.opponentAnswers[totalAnswers - 2].index = 5;
                this.opponentAnswers[totalAnswers - 1].index = 3;
                break;
            case 7:
                this.opponentAnswers[0].index = 3;
                this.opponentAnswers[2].index = 0;
                this.opponentAnswers[totalAnswers - 2].index = 5;
                this.opponentAnswers[totalAnswers - 1].index = 2;
                break;
            case 8:
                this.opponentAnswers[0].index = 0;
                this.opponentAnswers[2].index = 5;
                this.opponentAnswers[totalAnswers - 2].index = 4;
                this.opponentAnswers[totalAnswers - 1].index = 3;
                break;
            case 9:
                this.opponentAnswers[0].index = 0;
                this.opponentAnswers[2].index = 4;
                this.opponentAnswers[totalAnswers - 2].index = 2;
                this.opponentAnswers[totalAnswers - 1].index = 1;
                break;
            case 10:
                this.opponentAnswers[0].index = 0;
                this.opponentAnswers[2].index = 2;
                this.opponentAnswers[totalAnswers - 2].index = 3;
                this.opponentAnswers[totalAnswers - 1].index = 1;
                break;
            case 11:
                this.opponentAnswers[0].index = 0;
                this.opponentAnswers[2].index = 1;
                this.opponentAnswers[totalAnswers - 2].index = 3;
                this.opponentAnswers[totalAnswers - 1].index = 2;
                break;
            case 12:
                this.opponentAnswers[0].index = 0;
                this.opponentAnswers[2].index = 1;
                this.opponentAnswers[totalAnswers - 2].index = 2;
                this.opponentAnswers[totalAnswers - 1].index = 3;
                break;
        }
    }

    initialize() {
        this._buildOpponentsAnswers();

        for (let record of this.opponentAnswers) {
            let bAnswer = new AIAnswer(1 - record.timing);
            if (record.index >= 0)
                bAnswer.setCorrect(record.index);

            this.answers.push(bAnswer);
            // console.log("> at " + bAnswer.time + " correct: " + bAnswer.correct + " index " + bAnswer.index);
        }
    }

    update(roundProgress) {
        if (this.answerIndex < this.answers.length && roundProgress > this.answers[this.answerIndex].time) {
            const result = {
                correct: this.answers[this.answerIndex].correct,
                answerIndex: this.answers[this.answerIndex].index
            }
            this.answerIndex += 1;
            return result;
        }
        return undefined;
    }

    destroy() {
        delete this.settings;
    }
}

// soundController.js
/* jshint esversion: 6 */
var SoundController = pc.createScript('soundController');

SoundController.attributes.add('preloadSoundAssets', {
    title: "Preload sounds",
    type: 'boolean',
    default: false
});

SoundController.attributes.add('preloadMusicAssets', {
    title: "Preload music",
    type: 'boolean',
    default: false
});

SoundController.attributes.add('autoPlayMelodyKey', {
    title: "Auto play melody key",
    type: 'string',
    default: ''
});


SoundController.attributes.add('musicAssets', {
    title: "Music assets",
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'asset',
        type: 'asset',
        assetType: 'audio'
    },
    {
        name: 'overlap',
        type: 'boolean',
        default: false
    },
    {
        name: 'volume',
        type: 'number',
        default: 1.0
    },
    {
        name: 'loop',
        type: 'boolean',
        default: true
    }],
    array: true
});

SoundController.attributes.add('soundAssets', {
    title: "Sound assets",
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'asset',
        type: 'asset',
        assetType: 'audio'
    },
    {
        name: 'overlap',
        type: 'boolean',
        default: false
    },
    {
        name: 'volume',
        type: 'number',
        default: 1.0
    },
    {
        name: 'autoPlay',
        type: 'boolean',
        default: false
    },
    {
        name: 'loop',
        type: 'boolean',
        default: false
    }],
    array: true
});

SoundController.attributes.add('soundSeries', {
    title: "Sound series",
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'startPitch',
        type: 'number',
        default: 1.0
    },
    {
        name: 'endPitch',
        type: 'number',
        default: 1.5
    },
    {
        name: 'steps',
        type: 'number',
        default: 10,
        min: 2,
        max: 25
    }, {
        name: 'timeout',
        type: 'number',
        default: 1000
    }],
    array: true
});


SoundController.sfxStateLoaded = false;
SoundController.sfxVolume = 0.5;
SoundController.musicStateLoaded = false;
SoundController.musicVolume = 0.5;

Object.defineProperty(SoundController, "musicEnabled", {
    get() {
        return SoundController.musicVolume > 0;
    },
    set(value) {
        if (!value) {
            SoundController._prevMusicVolume = SoundController.musicVolume;
            SoundController.musicVolume = 0;
        } else {
            SoundController.musicVolume = SoundController._prevMusicVolume || 0.5;
        }
        pc.AppBase.getApplication().fire(EventTypes.SET_MUSIC_VOLUME, SoundController.musicVolume);
    }
});


Object.defineProperty(SoundController, "sfxEnabled", {
    get() {
        return SoundController.sfxVolume > 0;
    },
    set(value) {
        if (!value) {
            SoundController._prevSFXVolume = SoundController.sfxVolume;
            SoundController.sfxVolume = 0;
        } else {
            SoundController.sfxVolume = SoundController._prevSFXVolume || 0.5;
        }
        pc.AppBase.getApplication().fire(EventTypes.SET_SFX_VOLUME, SoundController.sfxVolume);
    }
});

SoundController.masterVolume = 1.0;
SoundController.apiVolumeMultiplier = 1.0;

SoundController.prototype.initialize = function () {

    /* music assets */
    this.musicSlotKeys = new Set();
    this.sfxSlotKeys = new Set();


    /* events handlung */
    this.app.on(EventTypes.PLAY_SFX, this.playSfx, this);
    this.app.on(EventTypes.PLAY_EXTERNAL_SFX, this.playExternalSfx, this);
    this.app.on(EventTypes.STOP_SFX, this.stopSfx, this);

    this.app.on(EventTypes.PLAY_MUSIC, this.playMusic, this);
    this.app.on(EventTypes.STOP_MUSIC, this.stopMusic, this);

    this.app.on(EventTypes.MUTE_SOUND, this.muteSound, this);
    this.app.on(EventTypes.UNMUTE_SOUND, this.unmuteSound, this);
    this.app.on(EventTypes.ENABLE_SFX, this.enableSfx, this);
    this.app.on(EventTypes.DISABLE_SFX, this.disableSfx, this);
    this.app.on(EventTypes.ENABLE_MUSIC, this.enableMusic, this);
    this.app.on(EventTypes.DISABLE_MUSIC, this.disableMusic, this);
    this.app.on(EventTypes.CHOKE_MUSIC, this.chokeMusic, this);
    this.app.on(EventTypes.UNCHOKE_MUSIC, this.unchokeMusic, this);
    this.app.on(EventTypes.SET_MUSIC_VOLUME, this.setMusicVolume, this);
    this.app.on(EventTypes.SET_SFX_VOLUME, this.setSFXVolume, this);
    this.app.on('postinitialize', this.onAppLoaded, this);
    this.app.on(EventTypes.SET_MASTER_VOLUME, this.setMasterVolume, this);
    this.app.on(EventTypes.SET_VOLUME_MULTIPLIER, this.setVolumeMultiplier, this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this.loadSavedValues, this);


    this.setMasterVolume(1);
    this.setSFXVolume(1);
    this.setMusicVolume(1);

    /* init sound series params */
    this.soundSeriesMap = new Map();
    this.soundSeries.forEach(soundConfig => {
        const keys = soundConfig.key.split(',');
        keys.forEach(key => this.soundSeriesMap.set(key, soundConfig));
    });

    this.fireSoundStateChangedEvent();
    this.fireMusicStateChangedEvent();

    /** ios suspended context fix */
    this._applyIOSAudioContextFix();

    /* apply master volume */
    const giMuteState = APIMediator.isMuted();
    SoundController.sfxEnabled = !giMuteState;
    SoundController.musicEnabled = !giMuteState;

    /* API Events */
    APIMediator.onAudioStateChange((isMuted) => {
        SoundController.externalMuteStatus = isMuted;
        SoundController.sfxEnabled = !isMuted;
        SoundController.musicEnabled = !isMuted;
    });
};


SoundController.prototype._applyIOSAudioContextFix = function () {
    if (pc.platform.ios) {
        this.app.touch.on(pc.EVENT_TOUCHEND, () => {
            if (this.app.soundManager.context.state === 'interrupted' || this.app.soundManager.context.state === 'suspended') {
                this.app.soundManager.context.resume().then(() => {
                    console.log('[iOS audio] Audio context restored')
                }).catch(e => {
                    console.log('[iOS audio] Can not resume audio context')
                });
            }
        });
    }
}


SoundController.prototype.postInitialize = function () {

};

SoundController.prototype.update = function (dt) {

};

SoundController.prototype.loadSavedValues = function () {
    const savedSFXVolume = LocalStorageController.getSavedValue(Constants.Storage.SFX_VOLUME);
    if (savedSFXVolume != undefined) {
        SoundController.sfxStateLoaded = true;
        this.setSFXVolume(savedSFXVolume);
    } else {
        SoundController.sfxStateLoaded = true;
        this.setSFXVolume(1);
    }

    const savedMusicVolume = LocalStorageController.getSavedValue(Constants.Storage.MUSIC_VOLUME);
    if (savedMusicVolume != undefined) {
        SoundController.musicStateLoaded = true;
        this.setMusicVolume(savedMusicVolume);
    } else {
        SoundController.musicStateLoaded = true;
        this.setMusicVolume(1);
    }

    /* override with external mute values */
    const giMuteState = APIMediator.isMuted();
    SoundController.sfxEnabled = !giMuteState;
    SoundController.musicEnabled = !giMuteState;
};

SoundController.prototype.playSfx = function (key, debounceDelay) {
    if (Array.isArray(key)) key = Utils.getRandomItem(key);

    const currentTimestamp = new Date().getTime();
    const soundSlot = this.entity.sound.slot(key);
    if (!soundSlot) return console.warn('wrong sound slot ', soundSlot);
    const lastTimestamp = soundSlot.lastTimeStamp;

    if (debounceDelay) {
        const lastTimestamp = soundSlot.lastTimeStamp;
        if (lastTimestamp && currentTimestamp - lastTimestamp < debounceDelay) {
            return;
        }
    }

    if (this.soundSeriesMap.has(key)) {
        const seriesConfig = this.soundSeriesMap.get(key);
        const seriesIndex = seriesConfig._lastSeriesIndex || 0;
        const lastSeriesTimestamp = seriesConfig.lastTimeStamp || 0;
        if (currentTimestamp - lastSeriesTimestamp <= seriesConfig.timeout) {
            soundSlot.pitch = pc.math.clamp(seriesConfig.startPitch + seriesIndex * (seriesConfig.endPitch - seriesConfig.startPitch) / (seriesConfig.steps - 1), seriesConfig.startPitch, seriesConfig.endPitch);
            seriesConfig._lastSeriesIndex += 1;
        } else {
            soundSlot.pitch = seriesConfig.startPitch;
            seriesConfig._lastSeriesIndex = 0;
        }
        seriesConfig.lastTimeStamp = currentTimestamp;
    }

    /* remember current timestamp */
    soundSlot.lastTimeStamp = currentTimestamp;

    if (soundSlot) {
        this._loadAndPlayAsset(key);
    } else {
        console.warn("No sound with key '" + key + "' in storage!");
    }
};


SoundController.prototype.playExternalSfx = function (key, targetEntity, debounceDelay) {
    if (!targetEntity || !targetEntity.sound || !targetEntity.sound.slot(key)) {
        return;
    }

    if (SoundController.sfxEnabled) {
        targetEntity.sound.play(key);
    }
};

SoundController.prototype.stopSfx = function (key) {
    this.entity.sound.stop(key);
};

SoundController.prototype.playMusic = function (key, stopOthers = true) {
    this.currentMusicKey = key;
    if (stopOthers) {
        this.musicAssets.forEach(asset => {
            const slot = this.entity.sound.slot(asset.key);
            if (slot && slot.isPlaying) {
                slot.stop();
            }
        });
    }
    this._loadAndPlayAsset(key);
};

SoundController.prototype.stopMusic = function (key) {
    if (key) {
        this.entity.sound.stop(key);
    } else {
        this.musicAssets.forEach(asset => {
            const slot = this.entity.sound.slot(asset.key);
            if (slot && slot.isPlaying) {
                slot.stop();
            }
        });
    }
};


SoundController.prototype.muteSound = function (key) {
    this.entity.sound.slot(key)._initialVolume = 0;
    this.entity.sound.slot(key).volume = 0;
};

SoundController.prototype.unmuteSound = function (key, volume) {
    this.entity.sound.slot(key)._initialVolume = volume * SoundController.sfxVolume;
    this.entity.sound.slot(key).volume = volume * SoundController.sfxVolume;
};

SoundController.prototype.enableSfx = function (saveApp = true) {
    SoundController.sfxEnabled = true;
};

SoundController.prototype.disableSfx = function (saveApp = true) {
    SoundController.sfxEnabled = false;
};



SoundController.prototype.enableMusic = function (saveApp = true) {
    SoundController.musicEnabled = true;
    if (this.currentMusicKey) {
        this.app.fire(EventTypes.PLAY_MUSIC, this.currentMusicKey);
    }
};

SoundController.prototype.disableMusic = function (saveApp = true) {
    SoundController.musicEnabled = false;
};

SoundController.prototype.chokeMusic = function () {
    this.musicSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.musicVolume * 0.2;
    });
};

SoundController.prototype.unchokeMusic = function () {
    this.musicSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.musicVolume * 1.0;
    });
};


SoundController.prototype.fireSoundStateChangedEvent = function () {
    this.app.fire(EventTypes.SOUND_STATE_CHANGED, SoundController.sfxEnabled, SoundController.sfxVolume);
};

SoundController.prototype.fireMusicStateChangedEvent = function () {
    this.app.fire(EventTypes.MUSIC_STATE_CHANGED, SoundController.musicEnabled, SoundController.musicVolume);
};

SoundController.prototype.setMusicVolume = function (volume) {
    SoundController.musicVolume = volume;
    this.musicSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.musicVolume;
    });
    this.fireMusicStateChangedEvent();
};

SoundController.prototype.setSFXVolume = function (volume) {
    SoundController.sfxVolume = volume;
    this.sfxSlotKeys.forEach(key => {
        const slot = this.entity.sound.slot(key);
        if (slot) slot.volume = slot._initialVolume * SoundController.sfxVolume;
    });
    this.fireSoundStateChangedEvent();
};



SoundController.prototype.onAppLoaded = function () {
    this.createSoundsSlots();
    this.createMusicSlots();
    // if (this.currentMusicKey) {
    //     this.playMusic(this.currentMusicKey);
    // }
};

SoundController.prototype.createSoundsSlots = function () {
    if (this.preloadSoundAssets) console.log('Preloading ' + this.soundAssets.length + ' sfx...');

    this.soundAssets.forEach(asset => {
        const slot = this.entity.sound.addSlot(asset.key, asset);
        slot._initialVolume = slot.volume;
        this.sfxSlotKeys.add(asset.key);
        if (this.preloadSoundAssets) {
            if (this.entity.sound.slot(asset.key) && !this.entity.sound.slot(asset.key).isLoaded) {
                this.entity.sound.slot(asset.key).load();
            }
        }
    });

    this.setSFXVolume(SoundController.sfxVolume);
};

SoundController.prototype.createMusicSlots = function () {
    if (this.preloadMusicAssets) console.log('Preloading ' + this.musicAssets.length + ' melodies...');

    const playMusicTask = (key) => {
        if (this.autoPlayMelodyKey === key || this.currentMusicKey === key) {
            this.entity.sound.slot(key).play();
        }
    };
    this.musicAssets.forEach(asset => {
        const slot = this.entity.sound.addSlot(asset.key, asset);
        slot._initialVolume = slot.volume;
        this.musicSlotKeys.add(asset.key);
        if (this.preloadMusicAssets) {
            if (this.entity.sound.slot(asset.key) && !this.entity.sound.slot(asset.key).isLoaded) {
                this.entity.sound.slot(asset.key).load();
                this.entity.sound.slot(asset.key).once('load', () => {
                    playMusicTask(asset.key);
                });
            } else {
                if (this.entity.sound.slot(asset.key).isLoaded) {
                    playMusicTask(asset.key);
                }
            }
        }
    });

    this.setMusicVolume(SoundController.musicVolume);
};

SoundController.prototype._loadAndPlayAsset = function (key) {
    if (!this.entity.sound.slot(key)) return console.warn('No sound with key ' + key);

    if (!this.entity.sound.slot(key).isLoaded) {
        this.entity.sound.slot(key).load();
        this.entity.sound.slot(key).once('load', () => {
            this.entity.sound.slot(key).play();
        });
    } else {
        this.entity.sound.slot(key).play();
    }
};


/* volume control */

SoundController.prototype.updateVolume = function () {
    this.app.systems.sound.volume = SoundController.masterVolume * SoundController.apiVolumeMultiplier;
};

SoundController.prototype.setMasterVolume = function (volume) {
    SoundController.masterVolume = volume;
    this.updateVolume();
};

SoundController.prototype.setVolumeMultiplier = function (volume) {
    SoundController.apiVolumeMultiplier = volume;
    this.updateVolume();
};


// fps.js
if (typeof(document) !== "undefined") {
    /*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
    (function(m,j){function s(a,e){for(var g in e)try{a.style[g]=e[g]}catch(j){}return a}function H(a){return null==a?String(a):"object"===typeof a||"function"===typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}function R(a,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(a);for(var g=0,j=e.length;g<j;g++)if(e[g]===a)return g;return-1}function I(){var a=arguments,e;for(e in a[1])if(a[1].hasOwnProperty(e))switch(H(a[1][e])){case "object":a[0][e]=
    I({},a[0][e],a[1][e]);break;case "array":a[0][e]=a[1][e].slice(0);break;default:a[0][e]=a[1][e]}return 2<a.length?I.apply(null,[a[0]].concat(Array.prototype.slice.call(a,2))):a[0]}function N(a){a=Math.round(255*a).toString(16);return 1===a.length?"0"+a:a}function S(a,e,g,j){if(a.addEventListener)a[j?"removeEventListener":"addEventListener"](e,g,!1);else if(a.attachEvent)a[j?"detachEvent":"attachEvent"]("on"+e,g)}function D(a,e){function g(a,b,d,c){return y[0|a][Math.round(Math.min((b-d)/(c-d)*J,J))]}
    function r(){f.legend.fps!==q&&(f.legend.fps=q,f.legend[T]=q?"FPS":"ms");K=q?b.fps:b.duration;f.count[T]=999<K?"999+":K.toFixed(99<K?0:d.decimals)}function m(){z=A();L<z-d.threshold&&(b.fps-=b.fps/Math.max(1,60*d.smoothing/d.interval),b.duration=1E3/b.fps);for(c=d.history;c--;)E[c]=0===c?b.fps:E[c-1],F[c]=0===c?b.duration:F[c-1];r();if(d.heat){if(w.length)for(c=w.length;c--;)w[c].el.style[h[w[c].name].heatOn]=q?g(h[w[c].name].heatmap,b.fps,0,d.maxFps):g(h[w[c].name].heatmap,b.duration,d.threshold,
    0);if(f.graph&&h.column.heatOn)for(c=u.length;c--;)u[c].style[h.column.heatOn]=q?g(h.column.heatmap,E[c],0,d.maxFps):g(h.column.heatmap,F[c],d.threshold,0)}if(f.graph)for(p=0;p<d.history;p++)u[p].style.height=(q?E[p]?Math.round(O/d.maxFps*Math.min(E[p],d.maxFps)):0:F[p]?Math.round(O/d.threshold*Math.min(F[p],d.threshold)):0)+"px"}function k(){20>d.interval?(x=M(k),m()):(x=setTimeout(k,d.interval),P=M(m))}function G(a){a=a||window.event;a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=
    !1,a.cancelBubble=!0);b.toggle()}function U(){d.toggleOn&&S(f.container,d.toggleOn,G,1);a.removeChild(f.container)}function V(){f.container&&U();h=D.theme[d.theme];y=h.compiledHeatmaps||[];if(!y.length&&h.heatmaps.length){for(p=0;p<h.heatmaps.length;p++){y[p]=[];for(c=0;c<=J;c++){var b=y[p],e=c,g;g=0.33/J*c;var j=h.heatmaps[p].saturation,m=h.heatmaps[p].lightness,n=void 0,k=void 0,l=void 0,t=l=void 0,v=n=k=void 0,v=void 0,l=0.5>=m?m*(1+j):m+j-m*j;0===l?g="#000":(t=2*m-l,k=(l-t)/l,g*=6,n=Math.floor(g),
    v=g-n,v*=l*k,0===n||6===n?(n=l,k=t+v,l=t):1===n?(n=l-v,k=l,l=t):2===n?(n=t,k=l,l=t+v):3===n?(n=t,k=l-v):4===n?(n=t+v,k=t):(n=l,k=t,l-=v),g="#"+N(n)+N(k)+N(l));b[e]=g}}h.compiledHeatmaps=y}f.container=s(document.createElement("div"),h.container);f.count=f.container.appendChild(s(document.createElement("div"),h.count));f.legend=f.container.appendChild(s(document.createElement("div"),h.legend));f.graph=d.graph?f.container.appendChild(s(document.createElement("div"),h.graph)):0;w.length=0;for(var q in f)f[q]&&
    h[q].heatOn&&w.push({name:q,el:f[q]});u.length=0;if(f.graph){f.graph.style.width=d.history*h.column.width+(d.history-1)*h.column.spacing+"px";for(c=0;c<d.history;c++)u[c]=f.graph.appendChild(s(document.createElement("div"),h.column)),u[c].style.position="absolute",u[c].style.bottom=0,u[c].style.right=c*h.column.width+c*h.column.spacing+"px",u[c].style.width=h.column.width+"px",u[c].style.height="0px"}s(f.container,d);r();a.appendChild(f.container);f.graph&&(O=f.graph.clientHeight);d.toggleOn&&("click"===
    d.toggleOn&&(f.container.style.cursor="pointer"),S(f.container,d.toggleOn,G))}"object"===H(a)&&a.nodeType===j&&(e=a,a=document.body);a||(a=document.body);var b=this,d=I({},D.defaults,e||{}),f={},u=[],h,y,J=100,w=[],W=0,B=d.threshold,Q=0,L=A()-B,z,E=[],F=[],x,P,q="fps"===d.show,O,K,c,p;b.options=d;b.fps=0;b.duration=0;b.isPaused=0;b.tickStart=function(){Q=A()};b.tick=function(){z=A();W=z-L;B+=(W-B)/d.smoothing;b.fps=1E3/B;b.duration=Q<L?B:z-Q;L=z};b.pause=function(){x&&(b.isPaused=1,clearTimeout(x),
    C(x),C(P),x=P=0);return b};b.resume=function(){x||(b.isPaused=0,k());return b};b.set=function(a,c){d[a]=c;q="fps"===d.show;-1!==R(a,X)&&V();-1!==R(a,Y)&&s(f.container,d);return b};b.showDuration=function(){b.set("show","ms");return b};b.showFps=function(){b.set("show","fps");return b};b.toggle=function(){b.set("show",q?"ms":"fps");return b};b.hide=function(){b.pause();f.container.style.display="none";return b};b.show=function(){b.resume();f.container.style.display="block";return b};b.destroy=function(){b.pause();
    U();b.tick=b.tickStart=function(){}};V();k()}var A,r=m.performance;A=r&&(r.now||r.webkitNow)?r[r.now?"now":"webkitNow"].bind(r):function(){return+new Date};for(var C=m.cancelAnimationFrame||m.cancelRequestAnimationFrame,M=m.requestAnimationFrame,r=["moz","webkit","o"],G=0,k=0,Z=r.length;k<Z&&!C;++k)M=(C=m[r[k]+"CancelAnimationFrame"]||m[r[k]+"CancelRequestAnimationFrame"])&&m[r[k]+"RequestAnimationFrame"];C||(M=function(a){var e=A(),g=Math.max(0,16-(e-G));G=e+g;return m.setTimeout(function(){a(e+
    g)},g)},C=function(a){clearTimeout(a)});var T="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I;window.FPSMeter=D;D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var X=["toggleOn","theme","heat","graph","history"],Y="position zIndex left top right bottom margin".split(" ")})(window);(function(m,j){j.theme={};var s=j.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",
    textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};j.theme.dark=j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}});j.theme.light=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.5}],
    container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}});j.theme.colorful=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}});j.theme.transparent=
    j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:0.5}})})(window,FPSMeter);    
}

var Fps = pc.createScript('fps');

Fps.prototype.initialize = function () {
    this.fps = new FPSMeter({heat: true, graph: true});
};

Fps.prototype.update = function (dt) {
    this.fps.tick();
};


// eventTypes.js
var EventTypes = pc.createScript('eventTypes');

/* General */
EventTypes.APP_LOADED = 'app:onLoaded';
EventTypes.SAVE_APP = 'app:save';
EventTypes.SAVEDATA_LOADED = 'app:savedataLoaded';
EventTypes.POSTINITIALIZE = 'postinitialize';

/* Performance */
EventTypes.STOP_AUTO_SHADOWS_TRACKING = 'performanceMonitor:suspendTracking';
EventTypes.RESUME_AUTO_SHADOWS_TRACKING = 'performanceMonitor:resumeTracking';

/* Assets loader */
EventTypes.ASSETS_LOADER_STARTED_LOADING = 'assetsLoader:started';
EventTypes.ASSETS_LOADER_PROGRESS = 'assetsLoader:progress';
EventTypes.ASSETS_LOADER_COMPLETE = 'assetsLoader:complete';
EventTypes.ASSETS_LOADER_ASSET_LOADED = 'assetsLoader:assetLoaded';
EventTypes.ASSETS_LOADER_ASSET_FAILED = 'assetsLoader:assetFailed';

/* Gameplay */
EventTypes.LEVEL_RESET = 'level:reset';
EventTypes.LEVEL_FINISHED = 'level:finished';

/* Contestant */
EventTypes.Contestant = {
    MOVEMENT_FINISHED: "contestant:movementFinished"
}

/* Match */
EventTypes.MATCH_STARTED = 'match:started';
EventTypes.MATCH_FINISHED = 'match:finished';

/* Scene */
EventTypes.SET_SCENE = 'scene:setScene';
EventTypes.SHOW_AUDIENCE_AREAS = 'scene:showAudienceAreas';
EventTypes.HIDE_AUDIENCE_AREAS = 'scene:hideAudienceAreas';
EventTypes.SET_CONTESTANT_COLORS = 'scene:setContestantColors';
EventTypes.SCENE_CHANGED = 'scene:sceneChanged';
EventTypes.OPEN_HATCHES = 'scene:openHatches';
EventTypes.CLOSE_HATCHES = 'scene:closeHatch';

/* Round */
EventTypes.ROUND_STARTED = 'round:started';
EventTypes.ROUND_TIMER_UPDATED = 'round:timerUpdated';
EventTypes.ROUND_FINISHED = 'round:finished';

EventTypes.RoundEvents = {
    CORRECT_ANSWER_GIVEN: 'round:correctAnswerGiven',
    WRONG_ANSWER_GIVEN: 'round:wrongAnswerGiven',
};

/* Daily challenge */
EventTypes.DAILY_CHALLENGE_LOCATION_READY = 'dailyChallenge:ready';
EventTypes.DAILY_CHALLENGE_ROUND_TIMER_UPDATED = 'dailyChallenge:roundTimerUpdated';
EventTypes.DAILY_CHALLENGE_ROUND_TIMER_FINISHED = 'dailyChallenge:roundTimerFinished';
EventTypes.DAILY_CHALLENGE_ON_ANSWER_SELECTED = 'dailyChallenge:answerSelected';
EventTypes.DAILY_CHALLENGE_REVEAL_CORRECT_ANSWER = 'dailyChallenge:revealCorrect';
EventTypes.DAILY_CHALLENGE_SET_DEFEAT_REASON = 'dailyChallenge:setDefeatReason';

/* Main menu */
EventTypes.SET_MAIN_MENU_VIEW_MODE = 'mainmenu:setViewMode';
EventTypes.SET_TOURNAMENT_BANNER_VISIBLE = 'tournamentBanner:setVisible';
EventTypes.SET_TOURNAMENT_BANNER_INFO = 'tournamentBanner:setInfo';
EventTypes.SET_TOURNAMENT_SEARCH_PROGRESS = 'tournament:setSearchProgress';
EventTypes.SET_TOURNAMENT_REMAINING_AMOUNT = 'tournament:setRemainingAmount';

/* Tournament info */
EventTypes.UPDATE_CURRENT_TOURNAMENT_INFO = 'turnament:updateInfo';

/* Audience */
EventTypes.RESET_AUDIENCE = 'audience:reset';
EventTypes.MOVE_AUDIENCE_TO = 'audience:moveTo';
EventTypes.AUDIENCE_CELEBRATE_VICTORY = 'audience:celebrateVictory';

/* contestants */
EventTypes.SET_CONTESTANT_SCORE = 'round:setContestantScore';

/* Buzzers */
EventTypes.SHOW_BUZZERS = 'buzzer:show';
EventTypes.HIDE_BUZZERS = 'buzzer:hide';
EventTypes.SHOW_BUZZER_LIGHTS = 'buzzerLights:show';
EventTypes.HIDE_BUZZER_LIGHTS = 'buzzerLights:hide';
EventTypes.HIDE_SINGLE_BUZZER_LIGHT = 'buzzerLights:hideSingle';
EventTypes.BUZZER_PLAY_ANSWER_ANIM = 'buzzer:playAnim';
EventTypes.BUZZER_PRESS_BUTTON_ANIM = 'buzzer:pressButtonAnim';
EventTypes.FIRE_BUZZER_PARTICLES = 'buzzer:fireParticles';

/* Keyboard */
EventTypes.CHANGE_KEYBOARD = 'keyboard:changeLang';

EventTypes.KEYBOARD_SYMBOL_TYPED = 'keyboard:symbolTyped';
EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED = 'keyboard:specialKeyPressed';
EventTypes.KEYBOARD_ANSWER_SUBMITTED = 'keyboard:answerSubmitted';
EventTypes.TYPED_TEXT_CHANGED = 'keyboard:typedTextChanged';
EventTypes.SWITCH_TO_PRIMARY_KEYBOARD = 'keyboard:openPrimary';
EventTypes.SWITCH_TO_SECONDARY_KEYBOARD = 'keyboard:openSecondary';
EventTypes.UPPERCASE_MODE_CHANGED = 'keyboard:uppercaseModeChanged';

EventTypes.SHOW_EXTRA_SYMBOLS_PANEL = 'extraSymbols:show';
EventTypes.HIDE_EXTRA_SYMBOLS_PANEL = 'extraSymbols:hide';
EventTypes.EXTRA_SYMBOLS_PANEL_DISPATCH_DRAG = 'extraSymbols:drag';
EventTypes.EXTRA_SYMBOLS_PANEL_DISPATCH_RELEASE = 'extraSymbols:release';
EventTypes.EXTRA_SYMBOLS_PANEL_SYMBOL_ENTERED = 'extraSymbols:symbolEntered';


/* Score */
EventTypes.USERNAME_CHANGED = 'username:changed';
EventTypes.SCORE_CHANGED = 'score:changed';
EventTypes.MONEY_AMOUNT_CHANGED = 'money:amountChanged';
EventTypes.KEYS_AMOUNT_CHANGED = 'keys:amountChanged';
EventTypes.LEVEL_NUMBER_CHANGED = 'levelNumber:changed';
EventTypes.PLAYER_COLOR_CHANGED = 'playerColor:changed';
EventTypes.OPPONENT_NAME_CHANGED = 'opponent:nameChanged';
EventTypes.NEXT_RANDOM_SKIN_PRICE_CHANGED = 'shop:nextRandomSkinPriceChanged';

/* Chestroom */
EventTypes.CHEST_OPENED  = 'chestroom:chestOpenend';
EventTypes.CLAIM_CHESTROOM_PRIZE = 'chestroom:claimPrize';

/* Puzzle unlock screen */
EventTypes.PUZZLE_UNLOCK_POPUP_CLOSED = 'puzzleUnlock:closed';

/* Locations */
EventTypes.CHANGE_LOCATION = 'location:change';
EventTypes.HIDE_LOCATION = 'location:hide';

/* Punishments */
EventTypes.PUNISHMENT_COMPLETED = 'punishment:completed';

/* Shop */
EventTypes.ShopTab = {
    CONTENT_BUILT: 'shopTab:contentBuild',
    SKIN_BUTTON_INPUT_DOWN: 'skinButton:down',
    SKIN_BUTTON_INPUT_UP: 'skinButton:up',
    SKIN_BUTTON_DRAG: 'skinButton:drag',
    UPDATE_SCENES: 'shopTab:scenes:update',
    UPDATE_SKINS: 'shopTab:skins:update'
};
EventTypes.SHOP_PAGINATION_DRAG = 'shop:paginationDrag';
EventTypes.SHOP_PAGINATION_RELEASE = 'shop:paginationReleased';
EventTypes.SHOP_SELECT_SKIN = 'shop:selectSkin'; 
EventTypes.EQUIP_PLAYER_SKIN = 'player:equipSkin'; 

EventTypes.PLAY_SKIN_UNLOCK_EFFECT = 'shop:playUnlockSkinEffect';

/* Camera */
EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED = 'camera:internalTransitionFinished';
EventTypes.CAMERA_TRANSITION_FINISHED = 'camera:transitionFinished';

/* FX */
EventTypes.ADD_OUTLINE = 'outline:add';
EventTypes.REMOVE_OUTLINE = 'outline:remove';

/* Button */
EventTypes.BUTTON_PRESSED = 'button:pressed';
EventTypes.BUTTON_UP = 'button:up';
EventTypes.BUTTON_DOWN = 'button:down';
EventTypes.BUTTON_DRAG = 'button:drag';

/* Localization */
EventTypes.LANGUAGE_SELECTED = 'localization:selectedLanguage';

/* Screen size/scale */
EventTypes.Screen = {
    RESIZED: 'app:screen:resized',
    SET_SCALE_BLEND: 'app:screen:setScaleBlend',
    SET_SHADOWS_ENABLED: 'app:screen:shadowsEnabled'
};

/* UI */
EventTypes.GUI = {
    SCREEN_SHOWN:'gui:screenShown',
    SCREEN_HIDDEN: 'gui:screenHidden'
};

/* UI elements animation */
EventTypes.UI_ELEMENT = {
    APPEAR: 'uiElement:appear',
    APPEAR_MANUALLY: 'uiElement:appearManually',
    DISAPPEAR: 'uiElement:disappear',
    APPEARED: 'uiElement:appeared',
    DISAPPEARED: 'uiElement:disappeared',
};

/* transition screen */
EventTypes.SHOW_TRANSITION_SCREEN = 'show:transitionScreen';
EventTypes.HIDE_TRANSITION_SCREEN = 'hide:transitionScreen';

/* Audio */
EventTypes.ENABLE_MUSIC = 'music:enable';
EventTypes.DISABLE_MUSIC = 'music:disable';
EventTypes.ENABLE_SFX = 'sfx:enable';
EventTypes.DISABLE_SFX = 'sfx:disable';
EventTypes.SET_SFX_VOLUME = 'sfx:setVolume';
EventTypes.SET_MUSIC_VOLUME = 'music:setVolume';
EventTypes.PLAY_MUSIC = 'music:play';
EventTypes.STOP_MUSIC = 'music:stop';
EventTypes.CHOKE_MUSIC = 'music:choke';
EventTypes.UNCHOKE_MUSIC = 'music:unchoke';
EventTypes.PLAY_EXTERNAL_SFX = 'sfx:playExternal';
EventTypes.PLAY_SFX = 'sfx:play';
EventTypes.STOP_SFX = 'sfx:stop';
EventTypes.MUTE_SOUND = 'audio:mute';
EventTypes.UNMUTE_SOUND = 'audio:unmute';
EventTypes.SOUND_STATE_CHANGED = 'sound:stateChanged';
EventTypes.MUSIC_STATE_CHANGED = 'music:stateChanged';
EventTypes.SET_VOLUME_MULTIPLIER = 'audio:setVolumeMultiplier';
EventTypes.SET_MASTER_VOLUME = 'audio:setMasterVolume';


/* Input */
EventTypes.TAP_AT = 'input:tapAt';
EventTypes.INPUT_DOWN = 'input:down';
EventTypes.INPUT_UP = 'input:up';
EventTypes.INPUT_MOVE = 'input:move';
EventTypes.SWIPE_LEFT = 'input:swipeLeft';
EventTypes.SWIPE_RIGHT = 'input:swipeRight';
EventTypes.SWIPE_UP = 'input:swipeUp';
EventTypes.SWIPE_DOWN = 'input:swipeDown';

/* GameInput */
EventTypes.GameInput = {
    MOUSE_DOWN: "gameInput:mouse_down",
    MOUSE_UP: "gameInput:mouse_up",
    MOUSE_MOVE: "gameInput:mouse_move",
    TOUCH_STARTED: "gameInput:touch_started",
    TOUCH_ENDED: "gameInput:touch_ended",
    TOUCH_UPDATED: "gameInput:touch_updated",
    TOUCH_MOVE: "gameInput:touch_move",
    KEYBOARD_STARTED: "gameInput:keyboard_started",
    KEYBOARD_ENDED: "gameInput:keyboard_ended",
    KEYBOARD_UPDATED: "gameInput:keyboard_updated",
};


EventTypes.afterAll = async function (...eventNames) {
    return Promise.all(eventNames.map(eventKey => new Promise((resolve, reject) => {
        pc.AppBase.getApplication().once(eventKey, () => resolve());
    }))); 
};

EventTypes.afterAny = async function (...eventNames) {
    let _alreadyFulfilled = false;
    const promises = eventNames.map(eventKey => new Promise((resolve, reject) => {
        pc.AppBase.getApplication().once(eventKey, () => {
            if(!_alreadyFulfilled) {
                _alreadyFulfilled = true;
                resolve(eventKey);
            }
        });
    }));
    return Promise.any(promises); 
};

// utils.js
/* jshint esversion: 6 */
var Utils = pc.createScript('utils');

Utils.prototype.initialize = function () {
    Utils.app = this.app;
};

Utils.prototype.update = function (dt) {

};

Utils.postMessage = function (message) {
    if (window.parent) {
        window.parent.postMessage(message, "*");
    }
};

Utils.wait = function (duration) {
    return new Promise((resolve, reject) => {
        if (duration !== undefined) {
            setTimeout(() => resolve(), duration);
        } else {
            resolve();
        }
    })
};

Utils.formatMoney = function (value, locale = undefined) {
    return new Intl.NumberFormat(locale || LocalizationManager.getClientLanguage()).format(value);
};


Utils.worldToLocalPosition = function (entity, worldPosition) {
    if (!entity.parent) {
        console.warn('worldToLocalPosition: entity is not parented!');
        return pc.Vec3.ZERO;
    }
    this._transformMatrix = this._transformMatrix || new pc.Mat4();
    this._transformMatrix.copy(entity.parent.getWorldTransform());
    return this._transformMatrix.invert().transformPoint(worldPosition)
};

Utils.localToWorldPosition = function (entity, localPosition) {
    this._transformMatrix = this._transformMatrix || new pc.Mat4();
    this._transformMatrix.copy(entity.getWorldTransform());
    return this._transformMatrix.transformPoint(localPosition)
};

Utils.getGammaCorrectedColorUniform = function (color, g, b) {
    const app = pc.AppBase.getApplication();
    const gammaCorrectionFactor = app.scene.gammaCorrection === pc.GAMMA_SRGB ? 2.2 : 1;

    if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
        return [
            Math.pow(color.r, gammaCorrectionFactor),
            Math.pow(color.g, gammaCorrectionFactor),
            Math.pow(color.b, gammaCorrectionFactor)
        ]
    } else {
        return [
            Math.pow(color, gammaCorrectionFactor),
            Math.pow(g, gammaCorrectionFactor),
            Math.pow(b, gammaCorrectionFactor)
        ]
    }
};

Utils._fadeDiffuseRecursive = function (entity, fadeValue, duration) {
    if (entity.render) {
        entity.render.meshInstances.forEach(mi => {
            if (mi.material.diffuse.equals(pc.Color.WHITE)) {
                mi.material = mi.material.clone();
                mi.material.diffuse = new pc.Color().fromString("#FEFEFE");
                mi.material.update();
            }
            if (!mi.__originalDiffuse) mi.__originalDiffuse = mi.material.diffuse.clone();
            mi.__diffuseValues = mi.__diffuseValues || mi.__originalDiffuse.clone();
            const targetDiffise = { r: mi.__originalDiffuse.r * fadeValue, g: mi.__originalDiffuse.g * fadeValue, b: mi.__originalDiffuse.b * fadeValue }
            entity.tween(mi.__diffuseValues)
                .to(targetDiffise, duration, pc.Linear)
                .onUpdate(() => {
                    mi.setParameter('material_diffuse', Utils.getGammaCorrectedColorUniform(mi.__diffuseValues));
                })
                .start();
        })
    }
    entity.children.forEach(child => Utils._fadeDiffuseRecursive(child, fadeValue, duration));
};


Utils._tweenOpacityRecursive = function (entity, opacityValue, duration) {
    if (entity.render) {
        entity.render.meshInstances.forEach(mi => {
            if (mi.material.blendType !== pc.BLEND_NORMAL && mi.material.blendType !== pc.BLEND_ADDITIVEALPHA) {
                mi.material = mi.material.clone();
                mi.material.blendType = pc.BLEND_NORMAL;
                mi.material.opacity = 0.999;
                mi.material.update();
            }
            if (!mi.__originalOpacity) mi.__originalOpacity = mi.material.opacity;
            mi.__currentOpacity = mi.__originalOpacity;
            if (duration > 0) {
                entity.tween(mi)
                    .to({ __currentOpacity: opacityValue }, duration, pc.Linear)
                    .onUpdate(() => {
                        mi.setParameter('material_opacity', mi.__currentOpacity);
                    })
                    .start();
            } else {
                mi.setParameter('material_opacity', opacityValue);
            }

        })
    }
    entity.children.forEach(child => Utils._tweenOpacityRecursive(child, opacityValue, duration))
};


pc.Entity.prototype.delayedCall = function (durationMS, f, scope) {
    var n = 0;
    while (this["delayedExecuteTween" + n]) {
        n++;
    }
    var id = "delayedExecuteTween" + n;
    var m;
    this[id] = this.tween(m)
        .to(1, durationMS / 1000, pc.Linear)
        ;
    this[id].start();

    this[id].once("complete", function () {
        f.call(scope);
        this[id] = null;
    }, this);

    return this[id];
};

Utils.raycastAll = function (from, to, results) {
    results = results || [];
    lastResult = this.app.systems.rigidbody.raycastFirst(from, to);
    if (lastResult) {
        if (lastResult.entity) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] === lastResult.entity) {
                    return results;
                }
            }
            results.push(lastResult.entity);
            Utils.raycastAll(lastResult.point.sub(lastResult.normal.scale(0.01)), to, results);
        }
    }
    return results;
};

/**
 *  Raycast through multiple entities returning RaycastResult instances (entity, point, normal) instead of entities. 
 **/
Utils.raycastAllAdvanced = function (from, to, results) {
    results = results || [];
    lastResult = this.app.systems.rigidbody.raycastFirst(from, to);
    if (lastResult) {
        if (lastResult.entity) {
            // this prevents rays from bouncing off the same entities
            // in a loop causing ammojs to crash
            for (var i = 0; i < results.length; i++) {
                if (results[i].entity === lastResult.entity) {
                    return results;
                }
            }
            results.push(lastResult);
            Utils.raycastAllAdvanced(lastResult.point.sub(lastResult.normal.scale(0.01)), to, results);
        }
    }
    return results;
};

pc.Entity.prototype.childrenAlphaAppear = function (initialAlpha, duration, sine, delay) {
    for (var i = this.children.length - 1; i > -1; i--) {
        var child = this.children[i];
        if (child instanceof pc.Entity) {
            child.childrenAlphaAppear(initialAlpha, duration, sine, delay);
        }
        if (child.element) {
            var targetAlpha = child.element.opacity;
            child.element.opacity = initialAlpha;
            child.tween(child.element)
                .to({ opacity: targetAlpha }, duration, sine)
                .delay(delay)
                .start();
        }
    }
};

pc.GraphicsDevice.prototype.updateClientRect = function () {
    if (window.visualViewport) {
        this.clientRect = this.canvas.getBoundingClientRect();
        this.clientRect.x = window.visualViewport.offsetLeft;
        this.clientRect.y = window.visualViewport.offsetTop;
        this.clientRect.width = window.visualViewport.width;
        this.clientRect.height = window.visualViewport.height;
    } else {
        this.clientRect = this.canvas.getBoundingClientRect();
    }
};

Utils.lerpColor = function (colorA, colorB, progress, targetColor) {
    return targetColor.set(colorA.r + (colorB.r - colorA.r) * progress, colorA.g + (colorB.g - colorA.g) * progress, colorA.b + (colorB.b - colorA.b) * progress, 1);
};

Utils.distanceBetween = function (x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

Utils.checkContact = function (entityA, entityB) {
    var pos1 = entityA.getPosition();
    var pos2 = entityB.getPosition();
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z)) <= (entityA.script.item.collisionDiameter * entityA.collisionScale / 2 + entityB.script.item.collisionDiameter * entityB.collisionScale / 2) &&
        Math.abs(pos1.y - pos2.y) <= (entityA.script.item.collisionHeight * entityA.collisionScale / 2 + entityB.script.item.collisionHeight * entityB.collisionScale / 2);
};


Utils.checkContactRough = function (entityA, entityB) {
    var scaleFactor = 1.1;
    var pos1 = entityA.getPosition();
    var pos2 = entityB.getPosition();
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z)) <= (entityA.script.item.collisionDiameter * entityA.collisionScale * scaleFactor / 2 + entityB.script.item.collisionDiameter * entityB.collisionScale * scaleFactor / 2) &&
        Math.abs(pos1.y - pos2.y) <= (entityA.script.item.collisionHeight * entityA.collisionScale * scaleFactor / 2 + entityB.script.item.collisionHeight * entityB.collisionScale * scaleFactor / 2);
};


Utils.distanceXZ = function (pos1, pos2) {
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z));
};

Utils.distanceBetweenEntities = function (posA, posB) {
    return Math.sqrt((posA.x - posB.x) * (posA.x - posB.x) + (posA.y - posB.y) * (posA.y - posB.y) + (posA.z - posB.z) * (posA.z - posB.z));
};


Utils.tweenText = function (textElement, initialValue, targetValue, duration, delay, easing, formatMoney = false) {
    return new Promise((resolve, reject) => {
        textElement.element.textValue = initialValue;
        textElement.element.text = '' + Math.round(initialValue);
        textElement.tween(textElement.element)
            .to({ textValue: targetValue }, duration, easing)
            .delay(delay)
            .onUpdate(() => {
                const roundValue = Math.round(textElement.element.textValue);
                textElement.element.text = formatMoney ? Utils.formatMoney(roundValue) : `${roundValue}`;
            })
            .onComplete(() => {
                textElement.element.text = formatMoney ? Utils.formatMoney(targetValue) : `${targetValue}`;
                resolve();
            })
            .start();
    })

};

Utils.tweenColor = function (color, targetColor, duration, updateCallback, delay = 0, ease = pc.Linear) {
    pc.AppBase.getApplication()
        .tween(color)
        .to(targetColor, duration, ease)
        .delay(delay)
        .onUpdate(() => {
            if (updateCallback) {
                updateCallback(color);
            }
        })
        .onComplete(() => {
            if (updateCallback) {
                updateCallback(color);
            }
        })
        .start();
};

Utils.getRandomItem = function (objects, startIndex, length) {

    if (objects === null) { return null; }
    if (startIndex === undefined) { startIndex = 0; }
    if (length === undefined) { length = objects.length; }

    var randomIndex = startIndex + Math.floor(Math.random() * length);

    return objects[randomIndex] === undefined ? null : objects[randomIndex];

};


Utils.getRandomItemBut = function (objects, butObject) {
    return Utils.getRandomItem(objects.slice().filter(o => o !== butObject));
};

Utils.removeRandomItem = function (objects, startIndex, length) {

    if (objects === null) { // undefined or null
        return null;
    }

    if (startIndex === undefined) { startIndex = 0; }
    if (length === undefined) { length = objects.length; }

    var randomIndex = startIndex + Math.floor(Math.random() * length);
    if (randomIndex < objects.length) {
        var removed = objects.splice(randomIndex, 1);
        return removed[0] === undefined ? null : removed[0];
    }
    else {
        return null;
    }

};

Utils.shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

Utils.humanizeTime = function (seconds) {
    var restSeconds = seconds;
    var hours = Math.floor(restSeconds / 3600);
    restSeconds %= 3600;
    var minutes = Math.floor(restSeconds / 60);
    restSeconds %= 60;

    return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + Math.floor(restSeconds);
};

Utils.humanizeTimeShort = function (seconds) {
    var restSeconds = seconds;
    var hours = Math.floor(restSeconds / 3600);
    restSeconds %= 3600;
    var minutes = Math.floor(restSeconds / 60);
    restSeconds %= 60;

    return (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + Math.floor(restSeconds);
};

Utils.getBoundingBox = function (entity, extendDistance) {
    if (entity.model && entity.model.meshInstances && entity.model.meshInstances.length > 0) {
        var meshInstances = entity.model.meshInstances;
        var bbox = new pc.BoundingBox();
        bbox.copy(meshInstances[0].aabb);
        for (var i = 1; i < meshInstances.length; i++) {
            bbox.add(meshInstances[i].aabb);
        }
        if (extendDistance) {
            bbox.halfExtents.add(extendDistance);
        }
        return bbox;
    }
    return null;

};

/* Logger */
var log = function (...args) {
    if (GameConfig.getAttribute('enableLogging')) {
        console.log(1, arguments);
        console.log(...args);
    } else {
        console.log(2);
    }

};


/**
 * Normalize an angle to the [-Pi, Pi] range.
 */
Utils.normalizeAngle = function (angle) {
    angle = angle % (2 * Math.PI);

    return angle > Math.PI ? angle - 2 * Math.PI : angle < -Math.PI ? angle + 2 * Math.PI : angle;
};

Utils.normalizeAngleDegrees = function (angle) {
    angle = angle % 360;

    return angle > 180 ? angle - 360 : angle < -180 ? angle + 360 : angle;
};

Utils.getYawFromRotation = function (quat) {
    Utils._transformedForward = Utils._transformedForward || new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, Utils._transformedForward);
    return Math.atan2(-Utils._transformedForward.x, -Utils._transformedForward.z) * pc.math.RAD_TO_DEG;
};


Utils.getYawBetweenVectors = function (positionA, positionB) {
    return Math.atan2(positionB.x - positionA.x, positionB.z - positionA.z) * pc.math.RAD_TO_DEG;
};

/**
 *  Returns the value (angle)/360
 */

Utils.getAngleValue = function (angle) {
    angle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    return angle / (2 * Math.PI);
};

Utils.angleDifference = function (angle1, angle2) {
    const diff = (angle2 - angle1 + 180) % 360 - 180;
    return diff < -180 ? diff + 360 : diff;
};

Utils.randomInRangeSigned = function (a, b) {
    if (Math.random() <= 0.5) {
        return pc.math.random(Math.min(-a, -b), Math.max(-a, -b));
    } else {
        return pc.math.random(Math.min(a, b), Math.max(a, b));
    }
};

Utils.vibrate = function (pattern) {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(pattern);
    }
};

Utils.setMat4Forward = (function () {
    var x, y, z;

    x = new pc.Vec3();
    y = new pc.Vec3();
    z = new pc.Vec3();

    return function (mat4, forward, up) {
        // Inverse the forward direction as +z is pointing backwards due to the coordinate system
        z.copy(forward).scale(-1);
        y.copy(up).normalize();
        x.cross(y, z).normalize();
        y.cross(z, x);

        var r = mat4.data;

        r[0] = x.x;
        r[1] = x.y;
        r[2] = x.z;
        r[3] = 0;
        r[4] = y.x;
        r[5] = y.y;
        r[6] = y.z;
        r[7] = 0;
        r[8] = z.x;
        r[9] = z.y;
        r[10] = z.z;
        r[11] = 0;
        r[15] = 1;

        return mat4;
    };
}());


Utils.checkPointBelongsToSegment = function (px, py, startX, startY, endX, endY) {
    return (px >= Math.min(startX, endX) && px <= Math.max(startX, endX) && py >= Math.min(startY, endY) && py <= Math.max(startY, endY));
};

Utils.findLineCircleIntersections = function (cx, cy, radius, segmentStartX, segmentStartY, segmentEndX, segmentEndY, closerToSegmentStart = true) {
    let dx, dy, A, B, C, det, t;

    dx = segmentEndX - segmentStartX;
    dy = segmentEndY - segmentStartY;

    A = dx * dx + dy * dy;
    B = 2 * (dx * (segmentStartX - cx) + dy * (segmentStartY - cy));
    C = (segmentStartX - cx) * (segmentStartX - cx) +
        (segmentStartY - cy) * (segmentStartY - cy) -
        radius * radius;

    det = B * B - 4 * A * C;
    if ((A <= 0.0000001) || (det < 0)) {
        // No real solutions.
        return null;
    }
    else if (det == 0) {
        // One solution.
        t = -B / (2 * A);
        let resultingPoint = new pc.Vec2(segmentStartX + t * dx, segmentStartY + t * dy);
        return Utils.checkPointBelongsToSegment(resultingPoint.x, resultingPoint.y, segmentStartX, segmentStartY, segmentEndX, segmentEndY) ? resultingPoint : null;
    }
    else {
        // Two solutions.
        t = ((-B + Math.sqrt(det)) / (2 * A));
        let p1 = new pc.Vec2(segmentStartX + t * dx, segmentStartY + t * dy);

        t = ((-B - Math.sqrt(det)) / (2 * A));
        let p2 = new pc.Vec2(segmentStartX + t * dx, segmentStartY + t * dy);

        p1 = Utils.checkPointBelongsToSegment(p1.x, p1.y, segmentStartX, segmentStartY, segmentEndX, segmentEndY) ? p1 : null;
        p2 = Utils.checkPointBelongsToSegment(p2.x, p2.y, segmentStartX, segmentStartY, segmentEndX, segmentEndY) ? p2 : null;

        if (p1 && p2) {
            return (Utils.distanceBetween(segmentStartX, segmentStartY, p1.x, p1.y) <= Utils.distanceBetween(segmentStartX, segmentStartY, p2.x, p2.y)) ? (closerToSegmentStart ? p1 : p2) : (closerToSegmentStart ? p2 : p1);
        } else if (p1) {
            return p1;
        } else if (p2) {
            return p2;
        } else {
            return null;
        }
    }
};



!(function () {
    var MAX_CACHE = 256;

    var quats = [];
    var vecs = [];
    var nextQuat = 0;
    var nextVec = 0;

    for (var i = 0; i < MAX_CACHE; i++) {
        vecs.push(new pc.Vec3());
        quats.push(new pc.Quat());
    }

    function Q(existing) {
        var q = quats[nextQuat++ & (MAX_CACHE - 1)];
        if (existing !== false) q.copy(existing || pc.Quat.IDENTITY);
        return q;
    }

    function V(existing, y, z) {
        var v = vecs[nextVec++ & (MAX_CACHE - 1)];
        if (y !== undefined && z !== undefined) {
            var d = v.data;
            d[0] = existing;
            d[1] = y;
            d[2] = z;
            return v;
        }
        if (existing !== undefined) {
            var d1 = v.data;
            var d2 = existing.data;
            d1[0] = d2[0];
            d1[1] = d2[1];
            d1[2] = d2[2];
        }
        return v;
    }

    pc.Vec3.temp = V;
    pc.Quat.temp = Q;

    function angleBetween(vector1, vector2, up) {
        up = up || pc.Vec3.UP;
        return Math.atan2(V().cross(vector1, vector2).dot(up), vector1.dot(vector2)) * pc.math.RAD_TO_DEG;
    }

    pc.Vec3.prototype.angle = function (vector, up) { return angleBetween(this, vector, up); };

    function orthogonal(v) {

        var x = Math.abs(v.x);
        var y = Math.abs(v.y);
        var z = Math.abs(v.z);
        var other = x < y ? (x < z ? pc.Vec3.RIGHT : pc.Vec3.FORWARD)
            : (y < z ? pc.Vec3.UP : pc.Vec3.FORWARD);
        return V().cross(v, other);
    }

    function fromToRotation(v1, v2, q) {
        var kct = v1.dot(v2);
        q = q || Q();
        if (kct <= -0.999) {
            q.w = 0;
            var v = orthogonal(v1).normalize();
            q.x = v.x;
            q.y = v.y;
            q.z = v.z;
            return q;
        }

        var half = V(v1).add(v2).scale(0.5);
        q.w = v1.dot(half);
        var cross = V().cross(v1, half);
        q.x = cross.x;
        q.y = cross.y;
        q.z = cross.z;
        return q.normalize();
    }

    pc.Quat.prototype.fromToRotation = function (v1, v2) {
        return fromToRotation(v1, v2, this);
    };

    pc.Quat.prototype.twist = function (axis) {
        var orth = orthogonal(axis);
        var transformed = this.transformVector(orth, V());
        var flattened = V(transformed).sub(V(axis).scale(transformed.dot(axis))).normalize();
        var angle = Math.acos(orth.dot(flattened)) * pc.math.RAD_TO_DEG;
        return V(this.x, this.y, this.z).dot(axis) > 0 ? -angle : angle;
    };

    var m = new pc.Mat4();

    pc.Quat.prototype.lookAt = function (from, to, up) {
        m.setLookAt(from, to, up || pc.Vec3.UP);
        this.setFromMat4(m);
        return this;
    };

    var oldMul = pc.Vec3.prototype.mul;

    pc.Vec3.prototype.mul = function (p0, p1, p2) {
        if (p0 instanceof pc.Quat) {
            return p0.transformVector(this, this);
        } else
            return oldMul.call(this, p0, p1, p2);
    };
})();

// Constants.js
var Constants = pc.createScript('constants');

Constants.GAME_NAME = 'GuessTheirAnswer';
Constants.GAME_VERSION = 'v0.9.8';

Constants.Screens = {
    MAIN_MENU: 'Screen_MainMenu',
    USERNAME: 'Popup_Username',
    ROUND_SEARCH: 'Screen_RoundSearch',
    ROUND_PRESENTER: 'Screen_RoundPresenter',
    ROUND: 'Screen_Round',
    PUNISHMENT: 'Screen_Punishment',
    HINT: 'Popup_Hint',
    ANSWER_PANEL: 'Popup_AnswerPanel',
    KEYBOARD: 'Popup_Keyboard',
    ROUND_RESULTS: 'Popup_RoundResults',
    ANSWERS_RECAP: 'Popup_AnswersRecap',
    SCORE_RECAP: 'Popup_ScoreRecap',
    MATCH_RESULTS: 'Popup_MatchResults', 
    CLAIM_REWARD: 'Screen_ClaimReward',
    VICTORY: 'Screen_Victory',
    SETTINGS: 'Popup_Settings',
    SHOP: 'Screen_Shop',
    CHESTROOM: 'Screen_Chestroom',
    PUZZLE: 'Popup_Puzzle',
    DAILY_CHALLENGE_PRESENTER: 'Screen_DailyChallengePresenter',
    DAILY_CHALLENGE_INTRO: 'Screen_DailyChallengeIntro',
    DAILY_CHALLENGE_ROUND: 'Screen_DailyChallengeRound',
    DAILY_CHALLENGE_VICTORY: 'Screen_DailyChallengeVictory',
    DAILY_CHALLENGE_DEFEAT: 'Screen_DailyChallengeDefeat',
    TOURNAMENT_START: 'Screen_TournamentStart',
    TOURNAMENT_TICKET: 'Screen_TournamentTicket',
    TOURNAMENT_DEFEAT: 'Screen_TournamentDefeat',
    TOURNAMENT_CLAIM_PRIZE: 'Screen_TournamentClaimPrize'
};

Constants.Cameras = {
    LOBBY: 'Camera_Lobby',
    TRANSITION_LOBBY_TO_ROUND_SEARCH: 'Camera_TransitionLobbyToRoundSearch',
    LOBBY_TOURNAMENT_SEARCH_TRANSITION: 'Camera_Lobby_TournamentSearchTransition',
    LOBBY_TOURNAMENT_SEARCH_QUICK_TRANSITION: 'Camera_Lobby_TournamentSearchTransitionQuick',
    LOBBY_TOURNAMENT: 'Camera_Lobby_Tournament',
    TRANSITION_LOBBY_TOURNAMENT_TO_TOURNAMENT_START: 'Camera_TransitionLobbyTournamentToTournamentStart',
    ROUND_SEARCH: 'Camera_RoundSearch',
    TRANSITION_ROUND_SEARCH_TO_ROUND: 'Camera_TransitionRoundSearchToRound',
    HINT: 'Camera_Hint',
    ROUND: 'Camera_Round',
    TRANSITION_ROUND_TO_PUNISHMENTS: 'Camera_TransitionRoundToPunishments',
    PUNISHMENTS: 'Camera_Punishments',
    SHOP: 'Camera_Shop',
    DAILY_CHALLENGE_PRESENTER: 'Camera_DailyChallenge_Presenter',
    DAILY_CHALLENGE_INTRO: 'Camera_DailyChallenge_Intro',
    DAILY_CHALLENGE_TRANSITION_A: 'Camera_DailyChallenge_Transition_A',
    DAILY_CHALLENGE_TRANSITION_B: 'Camera_DailyChallenge_Transition_B',
    DAILY_CHALLENGE_TRANSITION_C: 'Camera_DailyChallenge_Transition_C',
    DAILY_CHALLENGE: 'Camera_DailyChallenge',
    DAILY_CHALLENGE_TRANSITION_VICTORY: 'Camera_DailyChallenge_Transition_Victory',
    DAILY_CHALLENGE_VICTORY: 'Camera_DailyChallenge_Victory',
    DEBUG: 'Camera_Debug',
};

Constants.Locations = {
    STAGE: 'Stage',
    SHOP: 'Shop',
    HINT: 'HintLocation',
    DAILY_CHALLENGE_PRESENTER: 'DailyChallengePresenter',
    DAILY_CHALLENGE: 'DailyChallenge'
}

Constants.Contestants = {
    PLAYER: "Player",
    OPPONENT: "Opponent"
};

Constants.SkinState = {
    NONE: 0,
    OWNED: 1,
    EQUIPPED: 2,
};

Constants.SkinType = {
    DEFAULT: 0,
    REWARDED_SHOP: 1,
    VIP: 2,
};

Constants.SkinDefaultSubtype = {
    CURRENCY: 0,
    REWARDED: 1,
    REWARDED_PREMIUM: 2,
};

Constants.SkinStatus = {
    LOCKED: 0,
    OWNED: 1,
    ACTIVE: 2
};

Constants.RoundState = {
    NOT_STARTED: "NotStart",
    INTRO: "Intro",
    GAME: "Game",
    PAUSE: "Pause",
    OUTRO: "Outro",
    CLOSED: "Closed"
};

Constants.RewardMultiplier = {
    KEYS: 'keys',
    X2: 'x2',
    X3: 'x3'
}

Constants.AUDIENCE_IDLE_ANIM_PROBABILITIES = [
    200, 100, 100, 8, 20, 18, 15, 10, 5, 5, 5, 5, 1
];

Constants.ChestPrizeType = {
    MONEY: 'money',
    SKIN: 'skin',
    PUZZLE: 'puzzle'
};

Constants.Scenes = {
    DEFAULT: 'Default',
    BEACH: 'Beach',
    SNOW: 'Snow',
    ESTRADE: 'Estrade',
    FUN_FAIR: 'FunFair'
};

Constants.Punishments = {
    LAVA: 'Lava',
    WRECKING_BALL: 'WreckingBall',
    WATERFALL: 'Waterfall',
    TORNADO: 'Tornado',
    ICE: 'Ice'
};


Constants.MAIN_MENU_VIEW_MODE = {
    DEFAULT: 'default',
    JOIN_CHAMPIONSHIP: 'joinChampionship',
    SEARCHING_OPPONENTS: 'searchingOpponents',
    REMAINING: 'remaining',
    NEXT_MATCH_READY: 'nextMatchReady',
    VICTORY: 'victory',
};

Constants.TOURNAMENT_TYPE = {
    QUALIFIER: 'qualifier',
    SEMI_FINAL: 'semi-final',
    FINAL: 'final' 
};

Constants.Storage = {
    CURRENT_LEVEL: 'level',
    USERNAME: 'username',
    MONEY: 'money',
    KEYS: 'keys',
    VIBRATION: 'vibration',
    MUSIC_VOLUME: 'musicVolue',
    SFX_VOLUME: 'sfxVolume',
    SKIN_STATUSES: 'skins',
    PLAYER_SKIN: 'playerSkin',
    SCENE_STATUSES: 'scenes',
    ACTIVE_SCENE: 'actveScene',
    NEXT_RANDOM_SKIN_PRICE: 'skinPrice',
    FREE_HINT_CLAIMED: 'freeHintClaimed',
    LAST_DAILY_CHALLENGE_TIMESTAMP: 'lastDailyChallengeTimestamp',
    USED_QUESTIONS_IDS: 'usedQuestions',
    LAST_10_ROUNDS_RESULTS: 'lastRoundResults',
    RECENT_MATCH_RESULTS: 'recentMatchResults',
    TOTAL_MATCHES: 'matchesPlayed',
    COMPLETED_TOURNAMENTS: 'completedTournaments',
    TOURNAMENT_DATA: 'tournamentData'
};

// gameConfig.js
var GameConfig = pc.createScript('gameConfig');

GameConfig.EASINGS = [
    { "Linear": "Linear" },
    { "QuadraticIn": "QuadraticIn" },
    { "QuadraticOut": "QuadraticOut" },
    { "QuadraticInOut": "QuadraticInOut" },
    { "CubicIn": "CubicIn" },
    { "CubicOut": "CubicOut" },
    { "CubicInOut": "CubicInOut" },
    { "QuarticIn": "QuarticIn" },
    { "QuarticOut": "QuarticOut" },
    { "QuarticInOut": "QuarticInOut" },
    { "QuinticIn": "QuinticIn" },
    { "QuinticOut": "QuinticOut" },
    { "QuinticInOut": "QuinticInOut" },
    { "SineIn": "SineIn" },
    { "SineOut": "SineOut" },
    { "SineInOut": "SineInOut" },
    { "ExponentialIn": "ExponentialIn" },
    { "ExponentialOut": "ExponentialOut" },
    { "ExponentialInOut": "ExponentialInOut" },
    { "CircularIn": "CircularIn" },
    { "CircularOut": "CircularOut" },
    { "CircularInOut": "CircularInOut" },
    { "BackIn": "BackIn" },
    { "BackOut": "BackOut" },
    { "BackInOut": "BackInOut" },
    { "BounceIn": "BounceIn" },
    { "BounceOut": "BounceOut" },
    { "BounceInOut": "BounceInOut" },
    { "ElasticIn": "ElasticIn" },
    { "ElasticOut": "ElasticOut" },
    { "ElasticInOut": "ElasticInOut" }
];


GameConfig.attributes.add('gameplay', {
    type: 'json',
    schema: [{
        name: 'roundDuration',
        type: 'number',
        default: 40
    }, {
        name: 'minAnswerLevenshtein',
        type: 'number',
        default: 0.7
    }, {
        name: 'buzzerColorCorrect',
        type: 'rgb',
        default: [0, 1, 0]
    }, {
        name: 'buzzerColorWrong',
        type: 'rgb',
        default: [1, 0, 0]
    }]
});


GameConfig.attributes.add('UI', {
    type: 'json',
    schema: [{
        name: 'enablePrivacyPolicy',
        type: 'boolean',
        default: true
    }, {
        name: 'showGrayscaleDailyChallengeButtonIfNotAvailable',
        type: 'boolean',
        default: true
    }, {
        name: 'enableVibration',
        type: 'boolean',
        default: true
    }, {
        name: 'keyboardDefaultHeight',
        type: 'number',
        default: 440
    }, {
        name: 'keyboardMaxPortraitRatio',
        type: 'number',
        default: 0.5625
    }, {
        name: 'keyboardPortraitUpscaleFactror',
        type: 'number',
        default: 1.25
    }, {
        name: 'keyboardExtraSymbolsPanelDelay',
        type: 'number',
        default: 0.5
    }, {
        name: 'answerBoxVisibilityDuration',
        type: 'number',
        default: 2
    }, {
        name: 'roundResultsVisibilityDuration',
        type: 'number',
        default: 2.5
    }]
});


GameConfig.attributes.add('shop', {
    type: 'json',
    schema: [{
        name: 'nextRandomSkinPriceIncrement',
        title: 'Skin Price Increment',
        type: 'number',
        default: 200
    }, {
        name: 'rewardedButtonReward',
        type: 'number',
        default: 200
    }, {
        name: 'skinColorDefault',
        type: 'rgb',
        default: [0.4156, 0.4156, 0.4156]
    }, {
        name: 'skinColorRewarded',
        type: 'rgb',
        default: [0.396, 0.812, 0]
    }, {
        name: 'skinColorVip',
        type: 'rgb',
        default: [0.745, 0, 1]
    }]
});


GameConfig.attributes.add('audience', {
    type: 'json',
    schema: [{
        name: 'speed',
        type: 'number',
        default: 5
    }, {
        name: 'angularSpeed',
        type: 'number',
        default: 120
    }, {
        name: 'acceleration',
        type: 'number',
        default: 20
    }, {
        name: 'gravity',
        type: 'number',
        default: -20
    }, {
        name: 'groundY',
        type: 'number',
        default: 0
    }, {
        name: 'linearGravity',
        type: 'boolean',
        default: true
    }]
});


GameConfig.attributes.add('contestant', {
    type: 'json',
    schema: [{
        name: 'speed',
        type: 'number',
        default: 5
    }, {
        name: 'angularSpeed',
        type: 'number',
        default: 270
    }, {
        name: 'acceleration',
        type: 'number',
        default: 20
    }, {
        name: 'gravity',
        type: 'number',
        default: -20
    }, {
        name: 'groundY',
        type: 'number',
        default: 0
    }, {
        name: 'lookingAngleCorrection',
        type: 'number',
        default: 180
    }, {
        name: 'linearGravity',
        type: 'boolean',
        default: true
    }]
});



GameConfig.attributes.add('dailyChallenge', {
    type: 'json',
    schema: [{
        name: 'victoryReward',
        type: 'number',
        default: 600
    }, {
        name: 'rounds',
        type: 'number',
        default: 3
    }, {
        name: 'answerTimeFirstRound',
        type: 'number',
        default: 10
    }, {
        name: 'answerTime',
        type: 'number',
        default: 7
    }, {
        name: 'questionDifficulties',
        type: 'vec3',
        array: true
    }, {
        name: 'aiAnswerCurve',
        type: 'curve',
        curves: ['x']
    }, {
        name: 'firethrowersDuration',
        type: 'number',
        default: 2.5
    }, {
        name: 'areaPointSelectionPower',
        type: 'number',
        default: 1.5,
        min: 1,
        max: 4
    }]
});


GameConfig.attributes.add('tournament', {
    type: 'json',
    schema: [{
        name: 'victoryMoneyReward',
        type: 'number',
        default: 500
    }, {
        name: 'victoryPuzzleReward',
        type: 'number',
        default: 1
    }]
});


GameConfig.attributes.add('chestroom', {
    type: 'json',
    schema: [{
        name: 'bestMoneyPrize',
        type: 'number',
        default: 500
    }, {
        name: 'moneyPrizes',
        type: 'number',
        array: true
    }]
});


GameConfig.attributes.add('debug', {
    type: 'json',
    schema: [{
        name: 'rewardedAds',
        title: 'Rewarded Ads',
        type: 'boolean',
        default: true
    }, {
        name: 'overlay',
        type: 'boolean',
        default: false
    }, {
        name: 'physics',
        type: 'boolean',
        default: false
    }, {
        name: 'hotkeys',
        type: 'boolean',
        default: false
    }, {
        name: 'audienceAreaTargetPoints',
        title: 'Audience Points',
        type: 'boolean',
        default: false
    }, {
        name: 'stairPositions',
        title: 'Stair Positions',
        type: 'boolean',
        default: false
    }, {
        name: 'unlockAllSkins',
        title: 'Unlock All Skins',
        type: 'boolean',
        default: false
    }, {
        name: 'unlockAllScenes',
        title: 'Unlock All Scenes',
        type: 'boolean',
        default: false
    }]
});


GameConfig.attributes.add('playerColor', {
    type: 'json',
    schema: [{
        name: 'skin',
        type: 'rgb',
        default: [1, 1, 1]
    }, {
        name: 'UI',
        type: 'rgb',
        default: [1, 1, 1]
    }, {
        name: 'name',
        type: 'rgb',
        default: [1, 1, 1]
    }]
});



GameConfig.attributes.add('opponentColors', {
    type: 'json',
    schema: [{
        name: 'skin',
        type: 'rgb',
        default: [1, 1, 1]
    }, {
        name: 'UI',
        type: 'rgb',
        default: [1, 1, 1]
    }, {
        name: 'name',
        type: 'rgb',
        default: [1, 1, 1]
    }],
    array: true
});





/* Global methods */

GameConfig.prototype.initialize = function () {
    GameConfig.app = this.app;
    GameConfig.instance = this;
};

GameConfig.getAttribute = function (category, key) {
    if (!category) {
        console.warn('GameConfig.getAttribute: invalid category param ', category);
        return null;
    }
    if (GameConfig.instance[category] === undefined) {
        console.warn('GameConfig doesn\'t contain  category  ' + category);
        return null;
    } else {
        if (key !== undefined) {
            if (GameConfig.instance[category][key] === undefined) {
                console.warn('GameConfig doesn\'t contain key  ' + category + " > " + key);
                return null;
            } else {
                return GameConfig.instance[category][key];
            }
        } else {
            return GameConfig.instance[category];
        }
    }
};

GameConfig.setAttribute = function (category, key, value) {
    if (GameConfig.instance[category] === undefined) {
        console.warn('GameConfig.setAttribute: invalid category  ' + category);
        return;
    } else if (GameConfig.instance[category][key] === undefined) {
        console.warn('GameConfig.setAttribute: invalid key  ' + category + " > " + key);
        return;
    } else {
        GameConfig.instance[category][key] = value;
    }
};

// tween.js
pc.extend(pc, function () {

    /**
     * @name pc.TweenManager
     * @description Handles updating tweens
     * @param {pc.AppBase} app - The AppBase instance.
     */
    var TweenManager = function (app) {
        this._app = app;
        this._tweens = [];
        this._add = []; // to be added
    };

    TweenManager.prototype = {
        add: function (tween) {
            this._add.push(tween);
            return tween;
        },

        update: function (dt) {
            var i = 0;
            var n = this._tweens.length;
            while (i < n) {
                if (this._tweens[i].update(dt)) {
                    i++;
                } else {
                    this._tweens.splice(i, 1);
                    n--;
                }
            }

            // add any tweens that were added mid-update
            if (this._add.length) {
                for (let i = 0; i < this._add.length; i++) {
                    if (this._tweens.indexOf(this._add[i]) > -1) continue;
                    this._tweens.push(this._add[i]);
                }
                this._add.length = 0;
            }
        }
    };

    /**
     * @name  pc.Tween
     * @param {object} target - The target property that will be tweened
     * @param {pc.TweenManager} manager - The tween manager
     * @param {pc.Entity} entity - The pc.Entity whose property we are tweening
     */
    var Tween = function (target, manager, entity) {
        pc.events.attach(this);

        this.manager = manager;

        if (entity) {
            this.entity = null; // if present the tween will dirty the transforms after modify the target
        }

        this.time = 0;

        this.complete = false;
        this.playing = false;
        this.stopped = true;
        this.pending = false;

        this.target = target;

        this.duration = 0;
        this._currentDelay = 0;
        this.timeScale = 1;
        this._reverse = false;

        this._delay = 0;
        this._yoyo = false;

        this._count = 0;
        this._numRepeats = 0;
        this._repeatDelay = 0;

        this._from = false; // indicates a "from" tween

        // for rotation tween
        this._slerp = false; // indicates a rotation tween
        this._fromQuat = new pc.Quat();
        this._toQuat = new pc.Quat();
        this._quat = new pc.Quat();

        this.easing = pc.Linear;

        this._sv = {}; // start values
        this._ev = {}; // end values
    };

    var _parseProperties = function (properties) {
        var _properties;
        if (properties instanceof pc.Vec2) {
            _properties = {
                x: properties.x,
                y: properties.y
            };
        } else if (properties instanceof pc.Vec3) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z
            };
        } else if (properties instanceof pc.Vec4) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof pc.Quat) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof pc.Color) {
            _properties = {
                r: properties.r,
                g: properties.g,
                b: properties.b
            };
            if (properties.a !== undefined) {
                _properties.a = properties.a;
            }
        } else {
            _properties = properties;
        }
        return _properties;
    };
    Tween.prototype = {
        // properties - js obj of values to update in target
        to: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);
            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            return this;
        },

        from: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);
            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            this._from = true;

            return this;
        },

        rotate: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);

            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            this._slerp = true;

            return this;
        },

        start: function () {
            var prop, _x, _y, _z;

            this.playing = true;
            this.complete = false;
            this.stopped = false;
            this._count = 0;
            this.pending = (this._delay > 0);

            if (this._reverse && !this.pending) {
                this.time = this.duration;
            } else {
                this.time = 0;
            }

            if (this._from) {
                for (prop in this._properties) {
                    if (this._properties.hasOwnProperty(prop)) {
                        this._sv[prop] = this._properties[prop];
                        this._ev[prop] = this.target[prop];
                    }
                }

                if (this._slerp) {
                    this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);

                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;
                    this._fromQuat.setFromEulerAngles(_x, _y, _z);
                }
            } else {
                for (prop in this._properties) {
                    if (this._properties.hasOwnProperty(prop)) {
                        this._sv[prop] = this.target[prop];
                        this._ev[prop] = this._properties[prop];
                    }
                }

                if (this._slerp) {
                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;

                    if (this._properties.w !== undefined) {
                        this._fromQuat.copy(this.target);
                        this._toQuat.set(_x, _y, _z, this._properties.w);
                    } else {
                        this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);
                        this._toQuat.setFromEulerAngles(_x, _y, _z);
                    }
                }
            }

            // set delay
            this._currentDelay = this._delay;

            // add to manager when started
            this.manager.add(this);

            this.fire("start");

            return this;
        },

        pause: function () {
            this.playing = false;
        },

        resume: function () {
            this.playing = true;
        },

        stop: function () {
            this.playing = false;
            this.stopped = true;
        },

        delay: function (delay) {
            this._delay = delay;
            this.pending = true;

            return this;
        },

        repeat: function (num, delay) {
            this._count = 0;
            this._numRepeats = num;
            if (delay) {
                this._repeatDelay = delay;
            } else {
                this._repeatDelay = 0;
            }

            return this;
        },

        loop: function (loop) {
            if (loop) {
                this._count = 0;
                this._numRepeats = Infinity;
            } else {
                this._numRepeats = 0;
            }

            return this;
        },

        yoyo: function (yoyo) {
            this._yoyo = yoyo;
            return this;
        },

        reverse: function () {
            this._reverse = !this._reverse;

            return this;
        },

        chain: function () {
            var n = arguments.length;

            while (n--) {
                if (n > 0) {
                    arguments[n - 1]._chained = arguments[n];
                } else {
                    this._chained = arguments[n];
                }
            }

            return this;
        },

        onStart: function (callback) {
            this.on('start', callback);
            return this;
        },

        onUpdate: function (callback) {
            this.on('update', callback);
            return this;
        },

        onComplete: function (callback) {
            this.on('complete', callback);
            return this;
        },

        onLoop: function (callback) {
            this.on('loop', callback);
            return this;
        },

        update: function (dt) {
            if (this.stopped) return false;

            if (!this.playing) return true;

            if (!this._reverse || this.pending) {
                this.time += dt * this.timeScale;
            } else {
                this.time -= dt * this.timeScale;
            }

            // delay start if required
            if (this.pending) {
                if (this.time > this._currentDelay) {
                    if (this._reverse) {
                        this.time = this.duration - (this.time - this._currentDelay);
                    } else {
                        this.time -= this._currentDelay;
                    }
                    this.pending = false;
                } else {
                    return true;
                }
            }

            var _extra = 0;
            if ((!this._reverse && this.time > this.duration) || (this._reverse && this.time < 0)) {
                this._count++;
                this.complete = true;
                this.playing = false;
                if (this._reverse) {
                    _extra = this.duration - this.time;
                    this.time = 0;
                } else {
                    _extra = this.time - this.duration;
                    this.time = this.duration;
                }
            }

            var elapsed = (this.duration === 0) ? 1 : (this.time / this.duration);

            // run easing
            var a = this.easing(elapsed);

            // increment property
            var s, e;
            for (var prop in this._properties) {
                if (this._properties.hasOwnProperty(prop)) {
                    s = this._sv[prop];
                    e = this._ev[prop];
                    this.target[prop] = s + (e - s) * a;
                }
            }

            if (this._slerp) {
                this._quat.slerp(this._fromQuat, this._toQuat, a);
            }

            // if this is a entity property then we should dirty the transform
            if (this.entity) {
                this.entity._dirtifyLocal();

                // apply element property changes
                if (this.element && this.entity.element) {
                    this.entity.element[this.element] = this.target;
                }

                if (this._slerp) {
                    this.entity.setLocalRotation(this._quat);
                }
            }

            this.fire("update", dt);

            if (this.complete) {
                var repeat = this._repeat(_extra);
                if (!repeat) {
                    this.fire("complete", _extra);
                    if (this.entity)
                        this.entity.off('destroy', this.stop, this);
                    if (this._chained) this._chained.start();
                } else {
                    this.fire("loop");
                }

                return repeat;
            }

            return true;
        },

        _repeat: function (extra) {
            // test for repeat conditions
            if (this._count < this._numRepeats) {
                // do a repeat
                if (this._reverse) {
                    this.time = this.duration - extra;
                } else {
                    this.time = extra; // include overspill time
                }
                this.complete = false;
                this.playing = true;

                this._currentDelay = this._repeatDelay;
                this.pending = true;

                if (this._yoyo) {
                    // swap start/end properties
                    for (var prop in this._properties) {
                        var tmp = this._sv[prop];
                        this._sv[prop] = this._ev[prop];
                        this._ev[prop] = tmp;
                    }

                    if (this._slerp) {
                        this._quat.copy(this._fromQuat);
                        this._fromQuat.copy(this._toQuat);
                        this._toQuat.copy(this._quat);
                    }
                }

                return true;
            }
            return false;
        }

    };


    /**
     * Easing methods
     */

    var Linear = function (k) {
        return k;
    };

    var QuadraticIn = function (k) {
        return k * k;
    };

    var QuadraticOut = function (k) {
        return k * (2 - k);
    };

    var QuadraticInOut = function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    };

    var CubicIn = function (k) {
        return k * k * k;
    };

    var CubicOut = function (k) {
        return --k * k * k + 1;
    };

    var CubicInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k;
        return 0.5 * ((k -= 2) * k * k + 2);
    };

    var QuarticIn = function (k) {
        return k * k * k * k;
    };

    var QuarticOut = function (k) {
        return 1 - (--k * k * k * k);
    };

    var QuarticInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k;
        return -0.5 * ((k -= 2) * k * k * k - 2);
    };

    var QuinticIn = function (k) {
        return k * k * k * k * k;
    };

    var QuinticOut = function (k) {
        return --k * k * k * k * k + 1;
    };

    var QuinticInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    };

    var SineIn = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 1 - Math.cos(k * Math.PI / 2);
    };

    var SineOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return Math.sin(k * Math.PI / 2);
    };

    var SineInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 0.5 * (1 - Math.cos(Math.PI * k));
    };

    var ExponentialIn = function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    };

    var ExponentialOut = function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    };

    var ExponentialInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    };

    var CircularIn = function (k) {
        return 1 - Math.sqrt(1 - k * k);
    };

    var CircularOut = function (k) {
        return Math.sqrt(1 - (--k * k));
    };

    var CircularInOut = function (k) {
        if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    };

    var ElasticIn = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    };

    var ElasticOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    };

    var ElasticInOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    };

    var BackIn = function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    };

    var BackOut = function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    };

    var BackInOut = function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    };

    var BounceOut = function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;

    };

    var BounceIn = function (k) {
        return 1 - BounceOut(1 - k);
    };

    var BounceInOut = function (k) {
        if (k < 0.5) return BounceIn(k * 2) * 0.5;
        return BounceOut(k * 2 - 1) * 0.5 + 0.5;
    };

    return {
        TweenManager: TweenManager,
        Tween: Tween,
        Linear: Linear,
        QuadraticIn: QuadraticIn,
        QuadraticOut: QuadraticOut,
        QuadraticInOut: QuadraticInOut,
        CubicIn: CubicIn,
        CubicOut: CubicOut,
        CubicInOut: CubicInOut,
        QuarticIn: QuarticIn,
        QuarticOut: QuarticOut,
        QuarticInOut: QuarticInOut,
        QuinticIn: QuinticIn,
        QuinticOut: QuinticOut,
        QuinticInOut: QuinticInOut,
        SineIn: SineIn,
        SineOut: SineOut,
        SineInOut: SineInOut,
        ExponentialIn: ExponentialIn,
        ExponentialOut: ExponentialOut,
        ExponentialInOut: ExponentialInOut,
        CircularIn: CircularIn,
        CircularOut: CircularOut,
        CircularInOut: CircularInOut,
        BackIn: BackIn,
        BackOut: BackOut,
        BackInOut: BackInOut,
        BounceIn: BounceIn,
        BounceOut: BounceOut,
        BounceInOut: BounceInOut,
        ElasticIn: ElasticIn,
        ElasticOut: ElasticOut,
        ElasticInOut: ElasticInOut
    };
}());

// Expose prototype methods and create a default tween manager on the AppBase
(function () {
    // Add pc.AppBase#addTweenManager method
    pc.AppBase.prototype.addTweenManager = function () {
        this._tweenManager = new pc.TweenManager(this);

        this.on("update", function (dt) {
            this._tweenManager.update(dt);
        });
    };

    pc.AppBase.prototype.stopAllTweens = function (target) {
        for (var i = this._tweenManager._tweens.length - 1; i > -1; i--) {
            if (this._tweenManager._tweens[i].entity === target) {
                this._tweenManager._tweens[i].stop();
            }
        }
    };

    // Add pc.AppBase#tween method
    pc.AppBase.prototype.tween = function (target) {
        return new pc.Tween(target, this._tweenManager);
    };

    // Add pc.Entity#tween method
    pc.Entity.prototype.tween = function (target, options) {
        var tween = this._app.tween(target);
        tween.entity = this;

        this.once('destroy', tween.stop, tween);

        if (options && options.element) {
            // specifiy a element property to be updated
            tween.element = options.element;
        }
        return tween;
    };

    // Create a default tween manager on the AppBase
    var AppBase = pc.AppBase.getApplication();
    if (AppBase) {
        AppBase.addTweenManager();
    }
})();   

// UIController.js
/* jshint esversion: 9 */
var UIController = pc.createScript('uicontroller');

UIController.attributes.add('initialWindow', {
    type: 'entity'
});

UIController.attributes.add('initialPopups', {
    type: 'entity',
    array: true
});

UIController.attributes.add('autoEnableOnStart', {
    type: 'boolean',
    default: false
});


UIController.getInstance = function () {
    if (!UIController._instance) console.error('UIController is not initialized yet');
    return UIController._instance;
};

UIController.prototype.initialize = function () {
    UIController._app = this.app;
    if (!UIController._instance) {
        UIController._instance = this;
    }

    /* scale blend listener */
    this.app.on(EventTypes.Screen.SET_SCALE_BLEND, this.setScaleBlend, this);

    /* auto-enable */
    if (this.autoEnableOnStart) {
        this._initializeWindows();
        this._autoInitializeElements();
    }

    /* screen hide waiters */
    this._screenHideWaiters = new Map();

    /* enable screen blocker */
    const screenBlocker = this.entity.findByName('ScreenBlocker');
    screenBlocker.enabled = true;
};


UIController.prototype.postInitialize = function () {
    this.hideAllImmediately();

    const showInitialWindows = () => {
        if (this.initialWindow) {
            this.showWindow(this.initialWindow.name);
        }

        if (this.initialPopups) {
            this.initialPopups.forEach(popup => {
                if (popup) this.showPopup(popup.name);
            });
        }
    };

    this.on('attr:initialWindow', showInitialWindows);
    this.on('attr:initialPopups', showInitialWindows);

    showInitialWindows();
};





UIController.prototype.update = function (dt) {

};

UIController.prototype._initializeWindows = function () {
    this.entity.children.forEach(child => {
        if (child.tags.has('ui-window')) {
            if (child.enabled) {
                console.error("Please disable UI '" + child.name + "'!");
            } else {
                child.enabled = true;
            }
            child.enabled = false;
        } else if (!child.tags.has('common-ui')) {
            console.log("[Note] UI location " + child.name + " should probably have a 'ui-window' tag in order to be properly initialized");
        }
    });
};

UIController.prototype._autoInitializeElements = function () {
    this.entity.children.forEach(child => {
        if (child.tags.has('auto-initialize')) {
            if (!child.enabled) {
                child.enabled = true;
            }
        }
    });
};



UIController.prototype.showWindow = function (windowName, hideOthers = true, windowToOpenOnExit = null) {
    const windowEntity = this.entity.children.find(window => window.name === windowName);
    if (!windowEntity) console.warn('Attempt to display non-existent screen: ' + windowName);
    if (hideOthers) {
        this.hideAll(windowEntity).then(() => {
            if (windowEntity) {
                this._showWindow(windowEntity, windowToOpenOnExit);
            }
        });
    } else {
        if (windowEntity) {
            this._showWindow(windowEntity, windowToOpenOnExit);
        }
    }
};


UIController.prototype.showPopup = function (popupName) {
    const popupEntity = this.entity.children.find(p => p.name === popupName);
    if (popupEntity) {
        this._showWindow(popupEntity);
    }
};

UIController.prototype.hide = function (elementName, immediately = false) {
    return new Promise((resolve, reject) => {
        const windowEntity = this.entity.children.find(p => p.name === elementName);
        if (windowEntity) {
            this._hideWindow(windowEntity, immediately).then(() => resolve());
        } else {
            resolve();
        }
    })
};

UIController.prototype.showWindowOverTransition = function (windowName, options) {
    options = options || {};
    const windowEntity = this.entity.children.find(window => window.name === windowName);
    const hideOthers = options.hideOthers !== undefined ? options.hideOthers : true;
    const windowToOpenOnExit = options.windowToOpenOnExit !== undefined ? options.windowToOpenOnExit : null;
    const fadeInDuration = options.fadeInDuration !== undefined ? options.fadeInDuration : 0.175;
    const fadeOutDuration = options.fadeOutDuration !== undefined ? options.fadeOutDuration : 0.35;
    const callback = options.callback !== undefined ? options.callback : undefined;

    this.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, fadeInDuration, () => {

        if (hideOthers) {
            this.hideAllImmediately(windowEntity).then(() => {
                if (windowEntity) {
                    this._showWindow(windowEntity, windowToOpenOnExit);
                }
            });
        } else {
            if (windowEntity) {
                this._showWindow(windowEntity, windowToOpenOnExit);
            }
        }

        if (callback) callback();

        this.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, fadeOutDuration);
    });
};



UIController.prototype.transition = function (options) {
    options = options || {};
    const fadeInDuration = options.fadeInDuration !== undefined ? options.fadeInDuration : 0.15;
    const fadeOutDuration = options.fadeOutDuration !== undefined ? options.fadeOutDuration : 0.25;
    const callback = options.callback !== undefined ? options.callback : undefined;

    this.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, fadeInDuration, () => {
        if (callback) callback();
        this.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, fadeOutDuration);
    });
};



UIController.prototype.showWindowImmediately = function (windowName, hideOthers = true, windowToOpenOnExit = null) {
    const windowEntity = this.entity.children.find(window => window.name === windowName);
    if (hideOthers) this.hideAll(windowEntity);
    if (windowEntity) {
        this._showWindow(windowEntity, windowToOpenOnExit);
    }
};


UIController.prototype.hideAll = async function (...skipWindows) {
    const windowToHidePromises = this.entity.children.filter(windowEntity => windowEntity.tags.has('ui-window') && skipWindows.indexOf(windowEntity) === -1)
        .map(windowEntity => this._hideWindow(windowEntity));

    return await Promise.all(windowToHidePromises);
};

UIController.prototype.hideAllImmediately = async function (...skipWindows) {
    const windowToHidePromises = this.entity.children.filter(windowEntity => windowEntity.tags.has('ui-window') && skipWindows.indexOf(windowEntity) === -1)
        .map(windowEntity => this._hideWindow(windowEntity, true));

    return await Promise.all(windowToHidePromises);
};


UIController.prototype._showWindow = async function (windowEntity, windowToOpenOnExit = null) {
    if (windowEntity.show && typeof windowEntity.show === 'function') {
        return windowEntity.show(windowToOpenOnExit);
    } else {
        windowEntity.enabled = true;
        return true;
    }
};


UIController.prototype._hideWindow = async function (windowEntity, immediately = false) {
    if (windowEntity.hide && typeof windowEntity.hide === 'function') {
        return windowEntity.hide(immediately);
    } else {
        return new Promise((resolve, reject) => {
            windowEntity.enabled = false;
            resolve();
        });
    }
};

UIController.prototype.dispatchWindowShown = function (windowName) {
    this.app.fire(EventTypes.GUI.SCREEN_SHOWN, windowName);
};

UIController.prototype.dispatchWindowHidden = function (windowName) {
    const waitersList = this._screenHideWaiters.get(windowName);
    if(waitersList && waitersList.length > 0) {
        while(waitersList.length > 0) {
            const waiterCallback = waitersList.pop();
            waiterCallback(windowName);
        }
    }

    this.app.fire(EventTypes.GUI.SCREEN_HIDDEN, windowName);
};

UIController.prototype.waitWhenScreenHidden = function (screenName) {
    return new Promise((resolve, reject) => {
        if (!this._screenHideWaiters.has(screenName)) this._screenHideWaiters.set(screenName, []);
        const waitersList = this._screenHideWaiters.get(screenName);
        waitersList.push((_name) => resolve(_name));            
    });
};

UIController.prototype.getWindow = function (windowName) {
    return this.entity.children.find(window => window.name === windowName);
};


UIController.prototype.getScreenResolution = function () {
    return this.entity.screen.resolution;
};

UIController.prototype.getScreenReferenceResolution = function () {
    return this.entity.screen.referenceResolution;
};

UIController.prototype.getScreenScale = function () {
    return this.entity.screen.scale;
};

UIController.prototype.getScreenWidth = function () {
    return this.entity.screen.resolution.x / this.entity.screen.scale;
};


UIController.prototype.getScreenHeight = function () {
    return this.entity.screen.resolution.y / this.entity.screen.scale;
};

UIController.prototype.getScaleBlend = function () {
    return this.entity.screen.scaleBlend;
};

UIController.prototype.setScaleBlend = function (scaleBlend) {
    this.entity.screen.scaleBlend = scaleBlend;
};


UIController.prototype.worldToScreen = function (worldPosition) {
    this._screenPos = this._screenPos || new pc.Vec3();
    CameraController.getInstance().getActiveCamera().camera.worldToScreen(worldPosition, this._screenPos);

    // Take into account of pixel ratio
    const pixelRatio = this.app.graphicsDevice.maxPixelRatio;
    this._screenPos.x *= pixelRatio;
    this._screenPos.y *= pixelRatio;

    const device = this.app.graphicsDevice;

    // Global position of elements is normalised between -1 and 1 on both axis
    return new pc.Vec3(
        ((this._screenPos.x / device.width) * 2) - 1,
        ((1 - (this._screenPos.y / device.height)) * 2) - 1,
        0);
};

// inputController.js
/* jshint esversion: 6 */
var InputController = pc.createScript('inputController');

InputController.tapDistanceTolerance = 1;
InputController.clickDistanceTolerance = 1;
InputController.inputPosition = null;

InputController.attributes.add('listenToSwipes', {
    type: 'boolean',
    default: true
});

InputController.attributes.add('minSwipeDistance', {
    type: 'number',
    default: 75
});


InputController.getInstance = function () {
    if (!InputController._instance) console.error('InputController is not initialized yet');
    return InputController._instance;
};


InputController.prototype.initialize = function () {
    InputController._app = this.app;
    if (!InputController._instance) {
        InputController._instance = this;
    }

    const mouseSupported = !!this.app.mouse;
    const touchSupported = !!this.app.touch;

    if (touchSupported) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);

        this.app.touch.on(pc.EVENT_TOUCHEND, function (event) {
            // This prevents that a mouse click event will be executed after a touch event.
            event.event.preventDefault();
        });
    }

    if (mouseSupported) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }

    if (this.app.keyboard) {
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }

    if (this.app.mouse) {
        this.app.mouse.disableContextMenu();
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);
    }

    this.on("destroy", this.destroy, this);
};

InputController.prototype.update = function (dt) {

};

InputController.prototype.postUpdate = function (dt) {
   
};

InputController.prototype.onTouchStart = function (event) {
    if (event.touches.length >= 1) {
        this.touchDownPosition = { id: event.touches[0].id, x: event.touches[0].x, y: event.touches[0].y };
        InputController.inputPosition = { x: event.touches[0].x, y: event.touches[0].y, traveledDistance: 0 };
        this.app.fire(EventTypes.INPUT_DOWN, event.touches[0].x, event.touches[0].y, event.touches[0].x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.touches[0].y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }
};

InputController.prototype.onTouchMove = function (event) {
    if (event.changedTouches && event.changedTouches[0]) {
        if (InputController.inputPosition) {
            InputController.inputPosition.traveledDistance += Utils.distanceBetween(InputController.inputPosition.x || 0, InputController.inputPosition.y || 0, event.changedTouches[0].x, event.changedTouches[0].y);
            InputController.inputPosition.x = event.changedTouches[0].x;
            InputController.inputPosition.y = event.changedTouches[0].y;
        } else {
            InputController.inputPosition = { x: event.changedTouches[0].x, y: event.changedTouches[0].y, traveledDistance: 0 };
        }

        if(this.touchDownPosition) {
            const touchDistance =  Utils.distanceBetween(this.touchDownPosition.x, this.touchDownPosition.y, event.changedTouches[0].x, event.changedTouches[0].y) * (window.devicePixelRatio || 1) * 1.25;
            if(this.listenToSwipes && touchDistance >= this.minSwipeDistance) {
                let dx = event.changedTouches[0].x - this.touchDownPosition.x;
                let dy =  event.changedTouches[0].y - this.touchDownPosition.y;

                if(Math.abs(dx) / Math.abs(dy || 1) > 1.8) {
                    this.app.fire((dx > 0) ? EventTypes.SWIPE_RIGHT : EventTypes.SWIPE_LEFT);
                    this.touchDownPosition = null;
                    InputController.inputPosition = null;
                } else if(Math.abs(dy) / Math.abs(dx || 1) > 1.8) {
                    this.app.fire((dy > 0) ? EventTypes.SWIPE_DOWN : EventTypes.SWIPE_UP);
                    this.touchDownPosition = null;
                    InputController.inputPosition = null;
                }
            }
        }

        this.app.fire(EventTypes.GameInput.TOUCH_MOVE, event.changedTouches[0].x, event.changedTouches[0].y);
        this.app.fire(EventTypes.INPUT_MOVE, event.changedTouches[0].x, event.changedTouches[0].y,  event.changedTouches[0].x / this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.changedTouches[0].y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }
};


InputController.prototype.onTouchEnd = function (event) {
    if (event.changedTouches.length >= 1) {
        if (this.touchDownPosition && InputController.inputPosition && InputController.inputPosition.traveledDistance < InputController.tapDistanceTolerance) {
            if (this.touchDownPosition.id === event.changedTouches[0].id) {
                this.handleTouch(event.changedTouches[0].x, event.changedTouches[0].y);
            }
        }
        this.app.fire(EventTypes.INPUT_UP, event.changedTouches[0].x, event.changedTouches[0].y, event.changedTouches[0].x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.changedTouches[0].y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }
};


InputController.prototype.onTouchCancel = function (event) {
    this.touchDownPosition = null;
};


InputController.prototype.onKeyDown = function (event) {

};


InputController.prototype.onMouseWheel = function (event) {
    event.event.preventDefault();
};


InputController.prototype.onMouseDown = function (event) {
    InputController.inputPosition = { x: event.x, y: event.y, traveledDistance: 0 };
    this.mouseDownPosition = { x: event.x, y: event.y };
    this.app.fire(EventTypes.INPUT_DOWN, event.x, event.y, event.x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    this.app.fire(EventTypes.GameInput.MOUSE_DOWN, event.x, event.y);
};


InputController.prototype.onMouseUp = function (event) {
    this.app.fire(EventTypes.INPUT_UP, event.x, event.y, event.x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    this.app.fire(EventTypes.GameInput.MOUSE_UP, event.x, event.y);

    if (InputController.inputPosition && InputController.inputPosition.traveledDistance < InputController.clickDistanceTolerance) {
        this.handleTouch(event.x, event.y);
    }

    this.mouseDownPosition = null;
    InputController.inputPosition = null;
};


InputController.prototype.onMouseMove = function (event) {
    this.lastMouseX = event.x;
    this.lastMouseY = event.y;
    if (InputController.inputPosition) {
        InputController.inputPosition.traveledDistance += Utils.distanceBetween(InputController.inputPosition.x || 0, InputController.inputPosition.y || 0, event.x, event.y);
        InputController.inputPosition.x = event.x;
        InputController.inputPosition.y = event.y;
        this.app.fire(EventTypes.GameInput.MOUSE_MOVE, event.x, event.y);
        this.app.fire(EventTypes.INPUT_MOVE, event.x, event.y, event.x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), event.y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
    }

    if(this.mouseDownPosition) {
        const mouseDistance =  Utils.distanceBetween(this.mouseDownPosition.x, this.mouseDownPosition.y, event.x, event.y) * (window.devicePixelRatio || 1);

        if(this.listenToSwipes && mouseDistance >= this.minSwipeDistance) {
            let dx = event.x - this.mouseDownPosition.x;
            let dy = event.y - this.mouseDownPosition.y;

            if(Math.abs(dx) / Math.abs(dy || 1) > 1.8) {
                this.app.fire((dx > 0) ? EventTypes.SWIPE_RIGHT : EventTypes.SWIPE_LEFT);
                this.mouseDownPosition = null;
                InputController.inputPosition = null;
            } else if(Math.abs(dy) / Math.abs(dx || 1) > 1.8) {
                this.app.fire((dy > 0) ? EventTypes.SWIPE_DOWN : EventTypes.SWIPE_UP);
                this.mouseDownPosition = null;
                InputController.inputPosition = null;
            }
        }
    }
};


InputController.prototype.handleTouch = function (x, y) {
    this.app.fire(EventTypes.TAP_AT, x, y, x /  this.app.graphicsDevice.canvas.width * (window.devicePixelRatio || 1), y /  this.app.graphicsDevice.canvas.height* (window.devicePixelRatio || 1));
};


InputController.prototype.destroy = function () {
    this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
    this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
    this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
    this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    if (this.app.mouse) {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }
    if (this.app.keyboard) {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }
};

// DataManager.js
var DataManager = pc.createScript('dataManager');

DataManager.getInstance = function () {
    if (!DataManager._instance) console.error('DataManager is not initialized yet');
    return DataManager._instance;
};

DataManager.prototype.initialize = function () {
    DataManager._app = this.app;
    if (!DataManager._instance) {
        DataManager._instance = this;
    }

   
    this.app.on(EventTypes.LEVEL_RESET, () => this.resetData(), this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSavedData, this);
    

    /* level */
    this._level = 1;
    Object.defineProperty(this, 'level', {
        get: () => this._level,
        set: (value) => {
            this._level = Math.max(value, 0);
            this.app.fire(EventTypes.LEVEL_NUMBER_CHANGED, this._level);
        }
    });

    /* total matches */
    this._totalMatches = 1;
    Object.defineProperty(this, 'totalMatches', {
        get: () => this._totalMatches,
        set: (value) => {
            this._totalMatches = Math.max(value, 0);            
        }
    });

    /* keys */
    this._keys = 0;
    Object.defineProperty(this, 'keys', {
        get: () => this._keys,
        set: (value) => {
            this._keys = pc.math.clamp(value, 0, this.requiredKeys);
            this.app.fire(EventTypes.KEYS_AMOUNT_CHANGED, this._keys);
        }
    });

    /* required keys */
    this._requiredKeys = 3;
    Object.defineProperty(this, 'requiredKeys', {
        get: () => this._requiredKeys,
        set: (value) => {
            this._requiredKeys = Math.max(value, 0);
        }
    });

    /* money */
    this._money = 0;
    Object.defineProperty(this, 'money', {
        get: () => this._money,
        set: (value) => {
            this._money = Math.max(value, 0);
            this.app.fire(EventTypes.MONEY_AMOUNT_CHANGED, this._money);
        }
    });

    /* typed answer */
    this._typedText = "";
    Object.defineProperty(this, 'typedText', {
        get: () => this._typedText,
        set: (value) => {
            this._typedText = value;
            this.app.fire(EventTypes.TYPED_TEXT_CHANGED, this._typedText);
        }
    });

    /* uppercase mode */
    this._uppercaseMode = "";
    Object.defineProperty(this, 'uppercaseMode', {
        get: () => this._uppercaseMode,
        set: (value) => {
            this._uppercaseMode = value;
            this.app.fire(EventTypes.UPPERCASE_MODE_CHANGED, this._uppercaseMode);
        }
    });

    /* score */
    this._score = 0;
    Object.defineProperty(this, 'score', {
        get: () => this._score,

        set: (value) => {
            this._score = value;
            this.app.fire(EventTypes.SCORE_CHANGED, this._score);
        }
    });

    /* player color */
    this._playerColor = GameConfig.getAttribute('playerColor');
    Object.defineProperty(this, 'playerColor', {
        get: () => this._playerColor,
        set: (value) => {
            this._playerColor = value;
            this.app.fire(EventTypes.PLAYER_COLOR_CHANGED, this._playerColor);
        }
    });

    /* username */
    this._username = "";
    Object.defineProperty(this, 'username', {
        get: () => this._username,
        set: (value) => {
            this._username = value;
            this.app.fire(EventTypes.USERNAME_CHANGED, this._username);
        }
    });

    /* opponent name */
    this._opponentName = '<Opponent name>';
    Object.defineProperty(this, 'opponentName', {
        get: () => this._opponentName,
        set: (value) => {
            this._opponentName = value;
            this.app.fire(EventTypes.OPPONENT_NAME_CHANGED, this._opponentName);
        }
    });

    /* next skin price */
    this._nextRandomSkinPrice = GameConfig.getAttribute('shop', 'nextRandomSkinPriceIncrement');
    Object.defineProperty(this, 'nextRandomSkinPrice', {
        get: () => this._nextRandomSkinPrice,
        set: (value) => {
            this._nextRandomSkinPrice = Math.max(value, 0);
            this.app.fire(EventTypes.NEXT_RANDOM_SKIN_PRICE_CHANGED, this._nextRandomSkinPrice);
        }
    });
    
    /* fre hint claimed? */
    this._freeHintClaimed = 1;
    Object.defineProperty(this, 'freeHintClaimed', {
        get: () => this._freeHintClaimed,
        set: (value) => {
            this._freeHintClaimed = value;
        }
    });

    /* daily challenge day */
    this._lastDailyChallengeTimestamp = 0;
    Object.defineProperty(this, 'lastDailyChallengeTimestamp', {
        get: () => this._lastDailyChallengeTimestamp,
        set: (value) => {
            this._lastDailyChallengeTimestamp = value;
        }
    });


    /* last 10 round resutls */
    this._last10RoundsResults = [];
    Object.defineProperty(this, 'last10RoundsResults', {
        get: () => this._last10RoundsResults,
        set: (value) => {
            this._last10RoundsResults = value;
        }
    });

    /* recent games victories */
    this._recentMatchResults = [];
    Object.defineProperty(this, 'recentMatchResults', {
        get: () => this._recentMatchResults,
        set: (value) => {
            this._recentMatchResults = value;
        }
    });

};


DataManager.prototype._loadSavedData = function() {
    DataManager.getInstance().username = LocalStorageController.getSavedValue(Constants.Storage.USERNAME) || "";
    DataManager.getInstance().money = LocalStorageController.getSavedValue(Constants.Storage.MONEY) || 0;
    DataManager.getInstance().keys = LocalStorageController.getSavedValue(Constants.Storage.KEYS) || 0;
    DataManager.getInstance().level = LocalStorageController.getSavedValue(Constants.Storage.CURRENT_LEVEL) || 1;
    DataManager.getInstance().totalMatches = LocalStorageController.getSavedValue(Constants.Storage.TOTAL_MATCHES) || 0;
    DataManager.getInstance().nextRandomSkinPrice = LocalStorageController.getSavedValue(Constants.Storage.NEXT_RANDOM_SKIN_PRICE) || GameConfig.getAttribute('shop', 'nextRandomSkinPriceIncrement');
    DataManager.getInstance().freeHintClaimed = LocalStorageController.getSavedValue(Constants.Storage.FREE_HINT_CLAIMED) || false;
    DataManager.getInstance().lastDailyChallengeTimestamp = LocalStorageController.getSavedValue(Constants.Storage.LAST_DAILY_CHALLENGE_TIMESTAMP) || 0;
    DataManager.getInstance().last10RoundsResults = LocalStorageController.getSavedValue(Constants.Storage.LAST_10_ROUNDS_RESULTS) || [];
    DataManager.getInstance().recentMatchResults = LocalStorageController.getSavedValue(Constants.Storage.RECENT_MATCH_RESULTS) || [];
};

DataManager.prototype.resetData = function() {
    this.score = 0;
    this.lastWindow = null;
};

DataManager.prototype.saveRoundResult = function(resultInteger) {
    this.last10RoundsResults.push(resultInteger);
    while(this.last10RoundsResults.length > 10) {
        this.last10RoundsResults.shift();
    }
    LocalStorageController.save();
};

DataManager.prototype.saveMatchResult = function(resultInteger) {
    this.totalMatches += 1;
    this.recentMatchResults.push(resultInteger);
    while(this.recentMatchResults.length > 8) {
        this.recentMatchResults.shift();
    }
    LocalStorageController.save();
};


DataManager.prototype.getNumVictoriesPerLast10Rounds = function() {
    return this.last10RoundsResults.reduce((a,b) => a + b, 0);
};

DataManager.prototype.getRecentMatchResults = function() {
    return this.recentMatchResults;
};

DataManager.prototype.update = function(dt) {

};

// HierarchyManager.js
var HierarchyManager = pc.createScript('hierarchyManager');


HierarchyManager.getInstance = function () {
    if (!HierarchyManager._instance) console.error('HierarchyManager is not initialized yet');
    return HierarchyManager._instance;
};

HierarchyManager.prototype.initialize = function () {
    HierarchyManager._app = this.app;
    if (!HierarchyManager._instance) {
        HierarchyManager._instance = this;
    }

    this.hierarchyNameMap = new Map();
    this.hierarchyPathMap = new Map();
};

HierarchyManager.prototype.getByName = function (name) {
    const result = this.hierarchyNameMap.get(name);
    if (result) {
        return result;
    } else {
        const foundResult = this.app.root.findByName(name);
        if (foundResult) {
            this.hierarchyNameMap.set(name, foundResult);
            return foundResult;
        } else {
            console.error(`Entity [ ${name} ] not found in hierarchy!`);
        }
    }
};


HierarchyManager.prototype.getByPath = function (path) {
    if (!path.startsWith("Root")) path = "Root/" + path;
    const result = this.hierarchyPathMap.get(path);
    if (result) {
        return result;
    } else {
        const foundResult = this.app.root.findByPath(path);
        if (foundResult) {
            this.hierarchyPathMap.set(path, foundResult);
            return foundResult;
        } else {
            console.error(`Entity path ${path} not found in hierarchy!`);
        }
    }
};



HierarchyManager.prototype.update = function (dt) {

};


// touch-input.js
var TouchInput = pc.createScript('touchInput');

TouchInput.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.4, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

TouchInput.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.2, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

// initialize code called once per entity
TouchInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    
    // Store the position of the touch so we can calculate the distance moved
    this.lastTouchPoint = new pc.Vec2();
    this.lastPinchMidPoint = new pc.Vec2();
    this.lastPinchDistance = 0;
    
    if (this.orbitCamera && this.app.touch) {
        // Use the same callback for the touchStart, touchEnd and touchCancel events as they 
        // all do the same thing which is to deal the possible multiple touches to the screen
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
        
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        });
    }
};


TouchInput.prototype.getPinchDistance = function (pointA, pointB) {
    // Return the distance between the two points
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;    
    
    return Math.sqrt((dx * dx) + (dy * dy));
};


TouchInput.prototype.calcMidPoint = function (pointA, pointB, result) {
    result.set(pointB.x - pointA.x, pointB.y - pointA.y);
    result.scale(0.5);
    result.x += pointA.x;
    result.y += pointA.y;
};


TouchInput.prototype.onTouchStartEndCancel = function(event) {
    // We only care about the first touch for camera rotation. As the user touches the screen, 
    // we stored the current touch position
    var touches = event.touches;
    if (touches.length == 1) {
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
    
    } else if (touches.length == 2) {
        // If there are 2 touches on the screen, then set the pinch distance
        this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        this.calcMidPoint(touches[0], touches[1], this.lastPinchMidPoint);
    }
};


TouchInput.fromWorldPoint = new pc.Vec3();
TouchInput.toWorldPoint = new pc.Vec3();
TouchInput.worldDiff = new pc.Vec3();


TouchInput.prototype.pan = function(midPoint) {
    var fromWorldPoint = TouchInput.fromWorldPoint;
    var toWorldPoint = TouchInput.toWorldPoint;
    var worldDiff = TouchInput.worldDiff;
    
    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space 
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;
    
    camera.screenToWorld(midPoint.x, midPoint.y, distance, fromWorldPoint);
    camera.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, distance, toWorldPoint);
    
    worldDiff.sub2(toWorldPoint, fromWorldPoint);
     
    this.orbitCamera.pivotPoint.add(worldDiff);    
};


TouchInput.pinchMidPoint = new pc.Vec2();

TouchInput.prototype.onTouchMove = function(event) {
    var pinchMidPoint = TouchInput.pinchMidPoint;
    
    // We only care about the first touch for camera rotation. Work out the difference moved since the last event
    // and use that to update the camera target position 
    var touches = event.touches;
    if (touches.length == 1) {
        var touch = touches[0];
        
        this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
        this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;
        
        this.lastTouchPoint.set(touch.x, touch.y);
    
    } else if (touches.length == 2) {
        // Calculate the difference in pinch distance since the last event
        var currentPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        var diffInPinchDistance = currentPinchDistance - this.lastPinchDistance;
        this.lastPinchDistance = currentPinchDistance;
                
        this.orbitCamera.distance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.distance * 0.1);
        
        // Calculate pan difference
        this.calcMidPoint(touches[0], touches[1], pinchMidPoint);
        this.pan(pinchMidPoint);
        this.lastPinchMidPoint.copy(pinchMidPoint);
    }
};


// orbit-camera.js
var OrbitCamera = pc.createScript('orbitCamera');

OrbitCamera.attributes.add('autoRender', {
    type: 'boolean', 
    default: true, 
    title: 'Auto Render', 
    description: 'Disable to only render when camera is moving (saves power when the camera is still)'
});

OrbitCamera.attributes.add('distanceMax', {type: 'number', default: 0, title: 'Distance Max', description: 'Setting this at 0 will give an infinite distance limit'});
OrbitCamera.attributes.add('distanceMin', {type: 'number', default: 0, title: 'Distance Min'});
OrbitCamera.attributes.add('pitchAngleMax', {type: 'number', default: 90, title: 'Pitch Angle Max (degrees)'});
OrbitCamera.attributes.add('pitchAngleMin', {type: 'number', default: -90, title: 'Pitch Angle Min (degrees)'});

OrbitCamera.attributes.add('inertiaFactor', {
    type: 'number',
    default: 0,
    title: 'Inertia Factor',
    description: 'Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive.'
});

OrbitCamera.attributes.add('focusEntity', {
    type: 'entity',
    title: 'Focus Entity',
    description: 'Entity for the camera to focus on. If blank, then the camera will use the whole scene'
});

OrbitCamera.attributes.add('frameOnStart', {
    type: 'boolean',
    default: true,
    title: 'Frame on Start',
    description: 'Frames the entity or scene at the start of the application."'
});


// Property to get and set the distance between the pivot point and camera
// Clamped between this.distanceMin and this.distanceMax
Object.defineProperty(OrbitCamera.prototype, "distance", {
    get: function() {
        return this._targetDistance;
    },

    set: function(value) {
        this._targetDistance = this._clampDistance(value);
    }
});


// Property to get and set the pitch of the camera around the pivot point (degrees)
// Clamped between this.pitchAngleMin and this.pitchAngleMax
// When set at 0, the camera angle is flat, looking along the horizon
Object.defineProperty(OrbitCamera.prototype, "pitch", {
    get: function() {
        return this._targetPitch;
    },

    set: function(value) {
        this._targetPitch = this._clampPitchAngle(value);
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(OrbitCamera.prototype, "yaw", {
    get: function() {
        return this._targetYaw;
    },

    set: function(value) {
        this._targetYaw = value;

        // Ensure that the yaw takes the shortest route by making sure that 
        // the difference between the targetYaw and the actual is 180 degrees
        // in either direction
        var diff = this._targetYaw - this._yaw;
        var reminder = diff % 360;
        if (reminder > 180) {
            this._targetYaw = this._yaw - (360 - reminder);
        } else if (reminder < -180) {
            this._targetYaw = this._yaw + (360 + reminder);
        } else {
            this._targetYaw = this._yaw + reminder;
        }
    }
});


// Property to get and set the world position of the pivot point that the camera orbits around
Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
    get: function() {
        return this._pivotPoint;
    },

    set: function(value) {
        this._pivotPoint.copy(value);
    }
});


// Moves the camera to look at an entity and all its children so they are all in the view
OrbitCamera.prototype.focus = function (focusEntity) {
    // Calculate an bounding box that encompasses all the models to frame in the camera view
    this._buildAabb(focusEntity, 0);

    var halfExtents = this._modelsAabb.halfExtents;

    var distance = Math.max(halfExtents.x, Math.max(halfExtents.y, halfExtents.z));
    distance = (distance / Math.tan(0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD));
    distance = (distance * 2);

    this.distance = distance;

    this._removeInertia();

    this._pivotPoint.copy(this._modelsAabb.center);
};


OrbitCamera.distanceBetween = new pc.Vec3();

// Set the camera position to a world position and look at a world position
// Useful if you have multiple viewing angles to swap between in a scene
OrbitCamera.prototype.resetAndLookAtPoint = function (resetPoint, lookAtPoint) {
    this.pivotPoint.copy(lookAtPoint);
    this.entity.setPosition(resetPoint);

    this.entity.lookAt(lookAtPoint);

    var distance = OrbitCamera.distanceBetween;
    distance.sub2(lookAtPoint, resetPoint);
    this.distance = distance.length();

    this.pivotPoint.copy(lookAtPoint);

    var cameraQuat = this.entity.getRotation();
    this.yaw = this._calcYaw(cameraQuat);
    this.pitch = this._calcPitch(cameraQuat, this.yaw);

    this._removeInertia();
    this._updatePosition();

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }
};


// Set camera position to a world position and look at an entity in the scene
// Useful if you have multiple models to swap between in a scene
OrbitCamera.prototype.resetAndLookAtEntity = function (resetPoint, entity) {
    this._buildAabb(entity, 0);
    this.resetAndLookAtPoint(resetPoint, this._modelsAabb.center);
};


// Set the camera at a specific, yaw, pitch and distance without inertia (instant cut)
OrbitCamera.prototype.reset = function (yaw, pitch, distance) {
    this.pitch = pitch;
    this.yaw = yaw;
    this.distance = distance;

    this._removeInertia();

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Private methods

OrbitCamera.prototype.initialize = function () {
    this._checkAspectRatio();

    // Find all the models in the scene that are under the focused entity
    this._modelsAabb = new pc.BoundingBox();
    this._buildAabb(this.focusEntity || this.app.root, 0);

    this.entity.lookAt(this._modelsAabb.center);

    this._pivotPoint = new pc.Vec3();
    this._pivotPoint.copy(this._modelsAabb.center);

    this._lastFramePivotPoint = this._pivotPoint.clone();

    // Calculate the camera euler angle rotation around x and y axes
    // This allows us to place the camera at a particular rotation to begin with in the scene
    var cameraQuat = this.entity.getRotation();

    // Preset the camera
    this._yaw = this._calcYaw(cameraQuat);
    this._pitch = this._clampPitchAngle(this._calcPitch(cameraQuat, this._yaw));
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    this._distance = 0;

    this._targetYaw = this._yaw;
    this._targetPitch = this._pitch;

    // If we have ticked focus on start, then attempt to position the camera where it frames
    // the focused entity and move the pivot point to entity's position otherwise, set the distance
    // to be between the camera position in the scene and the pivot point
    if (this.frameOnStart) {
        this.focus(this.focusEntity || this.app.root);
    } else {
        var distanceBetween = new pc.Vec3();
        distanceBetween.sub2(this.entity.getPosition(), this._pivotPoint);
        this._distance = this._clampDistance(distanceBetween.length());
    }

    this._targetDistance = this._distance;

    this._autoRenderDefault = this.app.autoRender;

    // Do not enable autoRender if it's already off as it's controlled elsewhere
    if (this.app.autoRender) {
        this.app.autoRender = this.autoRender;
    }

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }

    this.on('attr:autoRender', function (value, prev) {
        this.app.autoRender = value;
        if (!this.autoRender) {
            this.app.renderNextFrame = true;
        }
    }, this);

    // Reapply the clamps if they are changed in the editor
    this.on('attr:distanceMin', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    }, this);

    this.on('attr:distanceMax', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    }, this);

    this.on('attr:pitchAngleMin', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    }, this);

    this.on('attr:pitchAngleMax', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    }, this);

    // Focus on the entity if we change the focus entity
    this.on('attr:focusEntity', function (value, prev) {
        if (this.frameOnStart) {
            this.focus(value || this.app.root);
        } else {
            this.resetAndLookAtEntity(this.entity.getPosition(), value || this.app.root);
        }
    }, this);

    this.on('attr:frameOnStart', function (value, prev) {
        if (value) {
            this.focus(this.focusEntity || this.app.root);
        }
    }, this);

    var onResizeCanvas = function () {
        this._checkAspectRatio();
        if (!this.autoRender) {
            this.app.renderNextFrame = true;
        }
    };

    this.app.graphicsDevice.on('resizecanvas', onResizeCanvas, this);

    this.on('destroy', function() {
        this.app.graphicsDevice.off('resizecanvas', onResizeCanvas, this);
        this.app.autoRender = this._autoRenderDefault;
    }, this);
};


OrbitCamera.prototype.update = function(dt) {
    // Check if we have are still moving for autorender
    if (!this.autoRender) {
        var distanceDiff = Math.abs(this._targetDistance - this._distance);
        var yawDiff = Math.abs(this._targetYaw - this._yaw);
        var pitchDiff = Math.abs(this._targetPitch - this._pitch);
        var pivotPointDiff = this._lastFramePivotPoint.distance(this._pivotPoint);
    
        this.app.renderNextFrame = this.app.renderNextFrame || 
            distanceDiff > 0.01 || yawDiff > 0.01 || pitchDiff > 0.01 || pivotPointDiff > 0;
    }

    // Add inertia, if any
    var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

    this._lastFramePivotPoint.copy(this._pivotPoint);

    this._updatePosition();
};


OrbitCamera.prototype._updatePosition = function () {
    // Work out the camera position based on the pivot point, pitch, yaw and distance
    this.entity.setLocalPosition(0,0,0);
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    var position = this.entity.getPosition();
    position.copy(this.entity.forward);
    position.scale(-this._distance);
    position.add(this.pivotPoint);
    this.entity.setPosition(position);
};


OrbitCamera.prototype._removeInertia = function () {
    this._yaw = this._targetYaw;
    this._pitch = this._targetPitch;
    this._distance = this._targetDistance;
};


OrbitCamera.prototype._checkAspectRatio = function () {
    var height = this.app.graphicsDevice.height;
    var width = this.app.graphicsDevice.width;

    // Match the axis of FOV to match the aspect ratio of the canvas so
    // the focused entities is always in frame
    this.entity.camera.horizontalFov = height > width;
};


OrbitCamera.prototype._buildAabb = function (entity, modelsAdded) {
    var i = 0, j = 0, meshInstances;
    
    if (entity instanceof pc.Entity) {
        var allMeshInstances = [];
        var renders = entity.findComponents('render');

        for (i = 0; i < renders.length; ++i) {
            meshInstances = renders[i].meshInstances;
            if (meshInstances) {
                for (j = 0; j < meshInstances.length; j++) {
                    allMeshInstances.push(meshInstances[j]);
                }
            }
        }  

        var models = entity.findComponents('model');
        for (i = 0; i < models.length; ++i) {
            meshInstances = models[i].meshInstances;
            if (meshInstances) {
                for (j = 0; j < meshInstances.length; j++) {
                    allMeshInstances.push(meshInstances[j]);
                }
            }
        }  

        for (i = 0; i < allMeshInstances.length; i++) {
            if (modelsAdded === 0) {
                this._modelsAabb.copy(allMeshInstances[i].aabb);
            } else {
                this._modelsAabb.add(allMeshInstances[i].aabb);
            }

            modelsAdded += 1;
        }
    }

    for (i = 0; i < entity.children.length; ++i) {
        modelsAdded += this._buildAabb(entity.children[i], modelsAdded);
    }

    return modelsAdded;
};


OrbitCamera.prototype._calcYaw = function (quat) {
    var transformedForward = new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
};


OrbitCamera.prototype._clampDistance = function (distance) {
    if (this.distanceMax > 0) {
        return pc.math.clamp(distance, this.distanceMin, this.distanceMax);
    } else {
        return Math.max(distance, this.distanceMin);
    }
};


OrbitCamera.prototype._clampPitchAngle = function (pitch) {
    // Negative due as the pitch is inversed since the camera is orbiting the entity
    return pc.math.clamp(pitch, -this.pitchAngleMax, -this.pitchAngleMin);
};


OrbitCamera.quatWithoutYaw = new pc.Quat();
OrbitCamera.yawOffset = new pc.Quat();

OrbitCamera.prototype._calcPitch = function(quat, yaw) {
    var quatWithoutYaw = OrbitCamera.quatWithoutYaw;
    var yawOffset = OrbitCamera.yawOffset;

    yawOffset.setFromEulerAngles(0, -yaw, 0);
    quatWithoutYaw.mul2(yawOffset, quat);

    var transformedForward = new pc.Vec3();

    quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
};

// mouse-input.js
var MouseInput = pc.createScript('mouseInput');

MouseInput.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.3, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

MouseInput.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.15, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

// initialize code called once per entity
MouseInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
        
    if (this.orbitCamera) {
        var self = this;
        
        var onMouseOut = function (e) {
           self.onMouseOut(e);
        };
        
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

        // Listen to when the mouse travels out of the window
        window.addEventListener('mouseout', onMouseOut, false);
        
        // Remove the listeners so if this entity is destroyed
        this.on('destroy', function() {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

            window.removeEventListener('mouseout', onMouseOut, false);
        });
    }
    
    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();
  
    this.lookButtonDown = false;
    this.panButtonDown = false;
    this.lastPoint = new pc.Vec2();
};


MouseInput.fromWorldPoint = new pc.Vec3();
MouseInput.toWorldPoint = new pc.Vec3();
MouseInput.worldDiff = new pc.Vec3();


MouseInput.prototype.pan = function(screenPoint) {
    var fromWorldPoint = MouseInput.fromWorldPoint;
    var toWorldPoint = MouseInput.toWorldPoint;
    var worldDiff = MouseInput.worldDiff;
    
    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space 
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;
    
    camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
    camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);

    worldDiff.sub2(toWorldPoint, fromWorldPoint);
       
    this.orbitCamera.pivotPoint.add(worldDiff);    
};


MouseInput.prototype.onMouseDown = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = true;
        } break;
            
        case pc.MOUSEBUTTON_MIDDLE: 
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = true;
        } break;
    }
};


MouseInput.prototype.onMouseUp = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = false;
        } break;
            
        case pc.MOUSEBUTTON_MIDDLE: 
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = false;            
        } break;
    }
};


MouseInput.prototype.onMouseMove = function (event) {    
    var mouse = pc.app.mouse;
    if (this.lookButtonDown) {
        this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
        this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;
        
    } else if (this.panButtonDown) {
        this.pan(event);   
    }
    
    this.lastPoint.set(event.x, event.y);
};


MouseInput.prototype.onMouseWheel = function (event) {
    this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
    event.event.preventDefault();
};


MouseInput.prototype.onMouseOut = function (event) {
    this.lookButtonDown = false;
    this.panButtonDown = false;
};

// camera-path.js
var CameraPath = pc.createScript('cameraPath');

CameraPath.attributes.add("pathRoot", { type: "entity", title: "Path Root" });
CameraPath.attributes.add("duration", { type: "number", default: 10, title: "Duration Secs" });

CameraPath.attributes.add("startTime", {
    type: "number",
    default: 0,
    title: "Start Time (Secs)",
    description: "Start the path from a specific point in time"
});

CameraPath.attributes.add('manualMovement', {
    type: 'boolean',
    default: false
});

CameraPath.attributes.add('progressEvent', {
    type: 'string'
});

CameraPath.attributes.add('tweenCurve', {
    type: 'curve',
    curves: ['time'],
    default: {
        keys: [0, 0, 1, 1]
    }
});

CameraPath.attributes.add('useEasing', {
    type: 'boolean',
    default: true
});

CameraPath.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});


CameraPath.attributes.add("loop", { type: "boolean", default: false, title: "Loop" });



CameraPath.prototype.initialize = function () {
    this.createPath();

    this.on("attr:pathRoot", function (value, prev) {
        if (value) {
            this.createPath();
            this.time = 0;
        }
    });

    this.on("attr:duration", function (value, prev) {
        if (value) {
            this.createPath();
            this.time = 0;
        }
    });

    this.on("attr:startTime", function (value, prev) {
        this.time = pc.math.clamp(this.startTime, 0, this.duration);
    });

    
    this.on('state', (enabled) => {
        if (enabled) {
            this.time = 0;
            this.finished = false;
        }
    });

    this.time = pc.math.clamp(this.startTime, 0, this.duration);
    this.finished = false;

    this.entity.setPathProgress = progress => this.setPathProgress(progress);

    this.lookAt = new pc.Vec3();
    this.up = new pc.Vec3();

    this.flyingThrough = true;

    if(this.manualMovement) {
        if(this.progressEvent) {
            this.app.on(this.progressEvent, this._setManualProgress, this);
        }
    }
};



CameraPath.prototype.update = function (dt) {
    if (this.finished) return;
    if (this.manualMovement) return;

    this.time += dt;
    if (this.time >= this.duration) {
        if (this.loop) {
            this.time -= this.duration;
        } else {
            this.time = this.duration;
        }
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};


CameraPath.prototype._setManualProgress = function (progress) {
    if (this.finished) return;

    this.time = progress * this.duration;
    if (this.time >= this.duration) {
        if (this.loop) {
            this.time -= this.duration;
        } else {
            this.time = this.duration;
        }
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};


CameraPath.prototype.setPathProgress = function (progress) {

    let percent = progress;
    if (this.useEasing) {
        percent = pc[this.easing](progress);
    } else {
        percent = this.tweenCurve.value(progress);
    }

    
    if(!this.finished && percent >= 1.0) {
        this.finished = true;
        this.app.fire(EventTypes.CAMERA_TRANSITION_FINISHED, this.entity.name);
    }


    // Get the interpolated values for the position from the curves     
    this.entity.setPosition(this.px.value(percent), this.py.value(percent), this.pz.value(percent));

    // Get the interpolated values for the look at point from the curves 
    this.lookAt.set(this.tx.value(percent), this.ty.value(percent), this.tz.value(percent));

    // Get the interpolated values for the up vector from the curves     
    this.up.set(this.ux.value(percent), this.uy.value(percent), this.uz.value(percent));

    // Make the camera look at the interpolated target position with the correct
    // up direction to allow for camera roll and to avoid glimbal lock
    this.entity.lookAt(this.lookAt, this.up);
};


CameraPath.prototype.createPath = function () {
    var curveMode = pc.CURVE_CARDINAL;

    // Create curves for position
    this.px = new pc.Curve();
    this.px.type = curveMode;

    this.py = new pc.Curve();
    this.py.type = curveMode;

    this.pz = new pc.Curve();
    this.pz.type = curveMode;

    // Create curves for target look at position
    this.tx = new pc.Curve();
    this.tx.type = curveMode;

    this.ty = new pc.Curve();
    this.ty.type = curveMode;

    this.tz = new pc.Curve();
    this.tz.type = curveMode;

    // Create curves for the 'up' vector for use with the lookAt function to 
    // allow for roll and avoid gimbal lock
    this.ux = new pc.Curve();
    this.ux.type = curveMode;

    this.uy = new pc.Curve();
    this.uy.type = curveMode;

    this.uz = new pc.Curve();
    this.uz.type = curveMode;

    var nodes = this.pathRoot.children;

    // Get the total linear distance of the path (this isn't correct but gives a decent approximation in length)
    var pathLength = 0;

    // Store the distance from the start of the path for each path node
    var nodePathLength = [];

    // For use when calculating the distance between two nodes on the path
    var distanceBetween = new pc.Vec3();

    // Push 0 as we are starting our loop from 1 for ease
    nodePathLength.push(0);

    for (i = 1; i < nodes.length; i++) {
        var prevNode = nodes[i - 1];
        var nextNode = nodes[i];

        // Work out the distance between the current node and the one before in the path
        distanceBetween.sub2(prevNode.getPosition(), nextNode.getPosition());
        pathLength += distanceBetween.length();

        nodePathLength.push(pathLength);
    }

    for (i = 0; i < nodes.length; i++) {
        // Calculate the time for the curve key based on the distance of the path to the node
        // and the total path length so the speed of the camera travel stays relatively
        // consistent throughout
        var t = nodePathLength[i] / pathLength;

        var node = nodes[i];

        var pos = node.getPosition();
        this.px.add(t, pos.x);
        this.py.add(t, pos.y);
        this.pz.add(t, pos.z);

        // Create and store a lookAt position based on the node position and the forward direction
        var lookAt = pos.clone().add(node.forward);
        this.tx.add(t, lookAt.x);
        this.ty.add(t, lookAt.y);
        this.tz.add(t, lookAt.z);

        var up = node.up;
        this.ux.add(t, up.x);
        this.uy.add(t, up.y);
        this.uz.add(t, up.z);
    }
};

// keyboard-input.js
var KeyboardInput = pc.createScript('keyboardInput');

// initialize code called once per entity
KeyboardInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
};


KeyboardInput.prototype.postInitialize = function() {
    if (this.orbitCamera) {
        this.startDistance = this.orbitCamera.distance;
        this.startYaw = this.orbitCamera.yaw;
        this.startPitch = this.orbitCamera.pitch;
        this.startPivotPosition = this.orbitCamera.pivotPoint.clone();
    }
};

// update code called every frame
KeyboardInput.prototype.update = function(dt) {
    if (this.orbitCamera) {
        if (this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
            this.orbitCamera.reset(this.startYaw, this.startPitch, this.startDistance);
            this.orbitCamera.pivotPoint = this.startPivotPosition;
        }
    }
};


// lerp-and-slerp-camera.js
var LerpAndSlerpCamera = pc.createScript('lerpAndSlerpCamera');

LerpAndSlerpCamera.attributes.add("pointA", { type: "entity", title: "Point A" });
LerpAndSlerpCamera.attributes.add("pointB", { type: "entity", title: "Point B" });

LerpAndSlerpCamera.attributes.add('manualMovement', {
    type: 'boolean',
    default: false
});

LerpAndSlerpCamera.attributes.add('tweenCurve', {
    type: 'curve',
    curves: ['time'],
    default: {
        keys: [0, 0, 1, 1]
    }
});


LerpAndSlerpCamera.attributes.add('useEasing', {
    type: 'boolean',
    default: false
});


LerpAndSlerpCamera.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});

LerpAndSlerpCamera.attributes.add("duration", { type: "number", default: 5, title: "Duration (Secs)" });
LerpAndSlerpCamera.attributes.add("loop", { type: "boolean", default: false, title: "Loop" });
LerpAndSlerpCamera.attributes.add("fireEventOnComplete", { type: "string", default: "", title: "Fire event on complete" });



// initialize code called once per entity
LerpAndSlerpCamera.prototype.initialize = function () {
    this.time = 0;
    this.finished = false;

    this.on('state', (enabled) => {
        if (enabled) {
            this.time = 0;
            this.finished = false;
        }
    });

    this.entity.setPathProgress = progress => this.setPathProgress(progress);
};

// update code called every frame
LerpAndSlerpCamera.prototype.update = function (dt) {
    if (this.finished) return;
    if (this.manualMovement) return; 
    
    this.time += dt;
    if (this.time >= this.duration) {
        if (this.loop) {
            this.time -= this.duration;
        } else {
            this.time = this.duration;
        }
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};


LerpAndSlerpCamera.prototype.setPathProgress = function (progress) {
      
    let percent = progress;
    if (this.useEasing) {
        percent = pc[this.easing](progress);
    } else {
        percent = this.tweenCurve.value(progress);
    }

    if(!this.finished && percent >= 1.0) {
        this.finished = true;
        this.app.fire(EventTypes.CAMERA_TRANSITION_FINISHED, this.entity.name);
    }

    var angle = this.entity.getRotation();
    var position = this.entity.getPosition();

    // Use slerp to smoothly interpolate between two angles
    // http://developer.playcanvas.com/en/api/pc.Quat.html#slerp
    angle.slerp(this.pointA.getRotation(), this.pointB.getRotation(), percent);

    // Use lerp to smoothly interpolate between two positions
    // http://developer.playcanvas.com/en/api/pc.Vec3.html#lerp
    position.lerp(this.pointA.getPosition(), this.pointB.getPosition(), percent);

    this.entity.setRotation(angle);
    this.entity.setPosition(position);

    if (!this.loop && progress >= 1 && !this.finished) {
        this.finished = true;
        if (this.fireEventOnComplete) {
            this.app.fire(this.fireEventOnComplete);
        }
    }
};


// CameraController.js
var CameraController = pc.createScript('cameraController');

CameraController.attributes.add('initialCamera', {
    type: 'entity'
});


CameraController.getInstance = function () {
    if (!CameraController._instance) console.error('CameraController is not initialized yet');
    return CameraController._instance;
};

CameraController.prototype.initialize = function () {
    CameraController._app = this.app;
    if (!CameraController._instance) {
        CameraController._instance = this;
    }

    this.activeCamera = undefined;
    this.activeCameraName = undefined;
};

CameraController.prototype.postInitialize = function() {
    if (this.initialCamera) {
        CameraController.getInstance().changeCamera(this.initialCamera.name);
    }
}

CameraController.prototype.changeCamera = function (cameraName, syncWithPrevCamera = false) {
    return new Promise((resolve, reject) => {
        const prevCamera = this.getActiveCamera();
        const cameraEntity = this.entity.findByName(cameraName);
        if (cameraEntity) {
            this.activeCameraName = cameraName;
            this.activeCamera = cameraEntity;
            this.entity.children.forEach(child => child.enabled = false);
            if (syncWithPrevCamera) {
                this.activeCamera.setPosition(prevCamera.getPosition());
                this.activeCamera.setRotation(prevCamera.getRotation());
            }
            cameraEntity.enabled = true;
            if (cameraEntity.startTransition) {
                cameraEntity.startTransition().then(() => {
                    resolve(cameraEntity);
                });
            } else {
                resolve(cameraEntity);
            }
        } else {
            console.warn(`Camera ${cameraName} not exists!`);
            resolve(null);
        }
    })

};

CameraController.prototype.getActiveCamera = function () {
    return this.activeCamera;
};

CameraController.prototype.getCameraByName = function (cameraName) {
    return this.entity.findByName(cameraName);
};

CameraController.prototype.getActiveCameraName = function () {
    return this.activeCamera.name;
};

CameraController.prototype._switchToNextCamera = function () {
    this._testCameraIndex = ((this._testCameraIndex || 0) + 1) % this.entity.children.length;
    const child = this.entity.children[this._testCameraIndex];
    if (child.camera) {
        CameraController.getInstance().changeCamera(child.name);
    }
};

CameraController.prototype.update = function (dt) {
    if (GameConfig.getAttribute('debug', 'hotkeys')) {
        if (this.app.keyboard.wasPressed(pc.KEY_C)) {
            this._switchToNextCamera();
        }
    }

    if (GameConfig.getAttribute('debug', 'overlay')) {
        HierarchyManager.getInstance().getByPath('UIContainer/Debug/ActiveCameraText').element.text = this.activeCameraName;
    }
};


// scaleManager.js
/* jshint esversion: 6 */
var ScaleManager = pc.createScript('scaleManager');

ScaleManager.attributes.add('minPortraitScreenRatio', {
    type: 'number',
    default: 0.5625
});

ScaleManager.attributes.add('landscapeBlend', {
    type: 'number',
    default: 0.75
});

ScaleManager.attributes.add('portraitBlend', {
    type: 'number',
    default: 0
});


ScaleManager.getInstance = function () {
    if (!ScaleManager._instance) console.error('ScaleManager is not initialized yet');
    return ScaleManager._instance;
};

ScaleManager.prototype.initialize = function () {
    ScaleManager._app = this.app;
    if (!ScaleManager._instance) {
        ScaleManager._instance = this;
    }

    this.app.graphicsDevice.on('resizecanvas', this.onCanvasResized, this);
    // this.app.on('famobi:resizeCanvas', this.onCanvasResized, this);
    this.on('attr:landscapeBlend', this.refresh, this);
    this.on('attr:portraitBlend', this.refresh, this);
    
    this.onCanvasResized(this.app.graphicsDevice.canvas.width, this.app.graphicsDevice.canvas.height);
};

ScaleManager.prototype.update = function(dt) {
    
};

ScaleManager.prototype.refresh = function() {
    this.onCanvasResized(this.app.graphicsDevice.canvas.width, this.app.graphicsDevice.canvas.height);
};


ScaleManager.prototype.onCanvasResized = function(width, height) {
    const isLandscape = this.isLandscape();
    const scaleBlend = isLandscape ? this.landscapeBlend : this.portraitBlend;
    const fireResizedEvent = () => {
        this.app.fire(EventTypes.Screen.RESIZED, width, height, isLandscape);
        this.app.fire(EventTypes.Screen.SET_SCALE_BLEND, scaleBlend);
    };
    
    setTimeout(() => fireResizedEvent(), 0);
    
    if(pc.platform.ios) {
        setTimeout(() => fireResizedEvent(), 500);
    }
};


ScaleManager.prototype.isLandscape = function() {
    return (this.app.graphicsDevice.canvas.width / this.app.graphicsDevice.canvas.height) >= this.minPortraitScreenRatio;    
};


ScaleManager.prototype.isPortrait = function() {
    return !this.isLandscape();
};

ScaleManager.prototype.getWidth = function() {
    return this.app.graphicsDevice.canvas.width * this.app.graphicsDevice.maxPixelRatio;
};


ScaleManager.prototype.getHeight = function() {
    return this.app.graphicsDevice.canvas.height * this.app.graphicsDevice.maxPixelRatio;
};


// performanceMonitor.js
var PerformanceMonitor = pc.createScript('performanceMonitor');

PerformanceMonitor.attributes.add('autoAdjustQuality', {
    type: 'boolean',
    default: true
});

PerformanceMonitor.attributes.add('autoShadows', {
    title: "Auto shadows",
    type: 'boolean',
    deafult: false
});

PerformanceMonitor.attributes.add('shadowLights', {
    title: "Shadow lights",
    type: 'entity',
    array: true
});




PerformanceMonitor.attributes.add('debugOutput', {
    type: 'boolean',
    default: false
});


PerformanceMonitor.attributes.add('maxDevicePixelRatio', {
    type: 'number',
    default: 3
});

PerformanceMonitor.attributes.add('minDevicePixelRatio', {
    type: 'number',
    default: 1.0
});


PerformanceMonitor.attributes.add('pixelRatioStep', {
    type: 'number',
    default: 0.25,
    min: 0,
    max: 1
});

PerformanceMonitor.attributes.add('targetFPS', {
    type: 'number',
    default: 60
});

PerformanceMonitor.attributes.add('acceptableFPS', {
    type: 'number',
    default: 45
});

PerformanceMonitor.attributes.add('minAcceptableFPS', {
    type: 'number',
    default: 30
});

PerformanceMonitor.attributes.add('fpsCheckInterval', {
    type: 'number',
    default: 1.5
});

PerformanceMonitor.attributes.add('sampleFrames', {
    type: 'number',
    default: 100
});

PerformanceMonitor.attributes.add('confidenceInterval', {
    type: 'number',
    default: 0.8,
    min: 0.4,
    max: 1
});




PerformanceMonitor.prototype.initialize = function () {
    this._shadowsTurnOffCounter = 0;
    this.maxSupportedPixelRatio = window.devicePixelRatio || 1;
    this.debugText = HierarchyManager.getInstance().getByPath('UIContainer/Debug/PerformanceMonitorText');

    this.on('attr:debugOutput', this._switchDebugTextVisibility, this);
    this._switchDebugTextVisibility();

    this.app.on(EventTypes.STOP_AUTO_SHADOWS_TRACKING, this._stopAutoShadowsTracking, this);
    this.app.on(EventTypes.RESUME_AUTO_SHADOWS_TRACKING, this._resumeAutoShadowsTracking, this);

    /* set initial pixel ratio */
    /* for MacBookPro and desktops with retina displays */
    if (pc.platform.desktop && this.app.graphicsDevice.maxPixelRatio > 1.99) {
        this.setPixelRatio(this.getDeviceOptimalDPR());
    } else {
        this.setPixelRatio(this.getDeviceOptimalDPR());
    }

    this.startPerformanceMonitoring(2000);
};


PerformanceMonitor.prototype.update = function (dt) {
    if (document.hidden) {
        return;
    }
    this.updatePerformanceMonitor(dt);
};

PerformanceMonitor.prototype.swap = function (old) {
    this.initialize();
};


PerformanceMonitor.prototype._stopAutoShadowsTracking = function() {
    this.suspendAutoShadowsTracking = true;
};

PerformanceMonitor.prototype._resumeAutoShadowsTracking = function() {
    this.suspendAutoShadowsTracking = false;
};

PerformanceMonitor.prototype.updateShadowsSettings = function(shadowsEnabled, forced = false) {
    if(this.shadowLights.length > 0 && (this.autoShadows || forced)) {
        this.shadowLights.forEach(light => {
            if(!shadowsEnabled) {
                this._shadowsTurnOffCounter += 1;
            } else if(this._shadowsTurnOffCounter > 1) return;
            if(light.enabled && light.light.castShadows !== shadowsEnabled) {
                light.light.castShadows = shadowsEnabled;
            }
        });
    }
};

PerformanceMonitor.prototype.startPerformanceMonitoring = function (delay) {
    this.app.root.delayedCall(delay, () => {
        this.performanceMonitoringStarted = true;
        this.performanceMonitoringCounter = 0;
        this.elapsedTime = 0;
        this.frameTimes = [];
        this.lastFPSMeasurements = [];
    });
};


PerformanceMonitor.prototype.updatePerformanceMonitor = function (dt) {
    if (this.performanceMonitoringStarted) {
        /* increase the counter */
        this.performanceMonitoringCounter += 1;
        this.elapsedTime += dt;

        const frameTime = dt;

        if (this.autoAdjustQuality) {
            this.frameTimes.push(frameTime);
            if (this.frameTimes.length >= this.sampleFrames || this.elapsedTime >= this.fpsCheckInterval) {
                this.elapsedTime = 0;
                this.calculateAverageFPS();
            }
        }

    }
};


PerformanceMonitor.prototype.calculateAverageFPS = function () {
    if (this.frameTimes.length < 12) return;
    // console.log('Calculating average FPS based of ' + this.frameTimes.length + ' frames...');
    const sortedTimes = this.frameTimes.slice().sort((a, b) => a - b);
    const lowerBoundFrames = Math.floor(sortedTimes.length * (1 - this.confidenceInterval) / 2);
    const upperBoundFrames = Math.floor(sortedTimes.length * (0.5 + this.confidenceInterval / 2));
    const effectiveFrameTimes = sortedTimes.slice(lowerBoundFrames, upperBoundFrames);
    const totalTime = effectiveFrameTimes.reduce((sum, current) => sum + current, 0);

    const averageFPS = (effectiveFrameTimes.length / totalTime);

    this.lastFPSMeasurements.push(averageFPS);
    while (this.lastFPSMeasurements.length > 20) {
        this.lastFPSMeasurements.shift();
    }

    this.adjustRendererScale(averageFPS);

    this.frameTimes.splice(0, this.frameTimes.length);
};



PerformanceMonitor.prototype.adjustRendererScale = function (averageFPS) {
    if (averageFPS < this.minAcceptableFPS) {
        this.decreaseQuality();
    } else if (averageFPS <= this.acceptableFPS) {
        this.setMediumQuality();
    } else if (averageFPS > this.targetFPS * 0.95) {
        this.increaseQuality();
    }

    this.calculateShadowSettings();

    if (this.debugOutput && this.debugText.enabled) {
        this.debugText.element.text = `${averageFPS.toFixed(1)} / ${this.app.graphicsDevice.maxPixelRatio.toFixed(3)} of ${this.maxDevicePixelRatio}, frames ${this.frameTimes.length}, fps-samples ${this.lastFPSMeasurements.length}`;
    }
};


PerformanceMonitor.prototype.calculateShadowSettings = function () {
    if(this.suspendAutoShadowsTracking) return;

    const currentPixelRatio = this.app.graphicsDevice.maxPixelRatio;
    if (this.lastFPSMeasurements.length > 3 && this.lastFPSMeasurements.slice(this.lastFPSMeasurements.length - 3).every(fpsValue => fpsValue < this.minAcceptableFPS)) {
        this.updateShadowsSettings(false);
    } else if (currentPixelRatio >= this.getDeviceOptimalDPR() && this.lastFPSMeasurements.length > 3 && this.lastFPSMeasurements.slice(this.lastFPSMeasurements.length - 3).every(fpsValue => fpsValue >= this.acceptableFPS)) {
        this.updateShadowsSettings(true);
    }
};


PerformanceMonitor.prototype.decreaseQuality = function () {
    const targetRatio = pc.math.clamp(this.app.graphicsDevice.maxPixelRatio - this.pixelRatioStep, this.getMinDPR(), this.getMaxDPR());
    this.setPixelRatio(targetRatio);
};

PerformanceMonitor.prototype.increaseQuality = function () {
    const targetRatio = pc.math.clamp(this.app.graphicsDevice.maxPixelRatio + this.pixelRatioStep, this.getMinDPR(), this.getMaxDPR());
    this.setPixelRatio(targetRatio);
};

PerformanceMonitor.prototype.setMediumQuality = function () {
    this.setPixelRatio(this.getDeviceOptimalDPR());
};

/* private */

PerformanceMonitor.prototype.setPixelRatio = function (value) {
    if (value !== this.app.graphicsDevice.maxPixelRatio) {
        // console.warn('Pixel ratio set to ', value);
        this.app.graphicsDevice.maxPixelRatio = value;
    }
};


PerformanceMonitor.prototype.getDeviceOptimalDPR = function () {
    const minDPR = this.getMinDPR();
    const maxDPR = this.getMaxDPR();
    return pc.math.clamp(minDPR + (maxDPR - minDPR) / 2, minDPR, maxDPR);
};

PerformanceMonitor.prototype.getMinDPR = function () {
    return Math.min(window.devicePixelRatio || 1, this.minDevicePixelRatio);
};

PerformanceMonitor.prototype.getMaxDPR = function () {
    return Math.min(this.maxSupportedPixelRatio, this.maxDevicePixelRatio);
};


PerformanceMonitor.prototype._switchDebugTextVisibility = function () {
    if (this.debugText) {
        this.debugText.enabled = this.debugOutput;
    }
};


// basicButton.js
/* jshint esversion: 6 */
var BasicButton = pc.createScript('basicButton');

BasicButton.attributes.add('applyScalingTween', {
    title: "Apply scaling tween",
    type: 'boolean',
    default: true
});

BasicButton.attributes.add('defaultScale', {
    title: "Default scale",
    type: 'number',
    default: 1,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('hoverScale', {
    title: "Hover scale",
    type: 'number',
    default: 1.03,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('pressedScale', {
    title: "Pressed scale",
    type: 'number',
    default: 0.97,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('upScaleDuration', {
    title: "Tween duration",
    type: 'number',
    default: 0.085,
    min: 0.005,
    max: 1
});

BasicButton.attributes.add('clickSound', {
    title: "Play sound",
    type: 'boolean',
    default: true
});

BasicButton.attributes.add('soundOnRelease', {
    title: "Sound on release",
    type: 'boolean',
    default: true
});


BasicButton.attributes.add('allowClickThrough', {
    title: "Click through",
    type: 'boolean',
    default: false
});

BasicButton.attributes.add('preventDoubleClick', {
    title: "Prevent rapid double click",
    type: 'boolean',
    default: true
});

BasicButton.attributes.add('doubleClickMinCooldown', {
    title: "Double click min cooldown",
    type: 'number',
    default: 30
});



BasicButton.prototype.initialize = function () {
    this.hovered = false;
    this.lastClickTimestamp = 0;

    this._addEventListeners(this.entity);

    this.available = true;
    this.entity.setAvailable = this._setAvailable.bind(this);
};

BasicButton.prototype._addEventListeners = function (targetEntity) {
    if (this.app.touch) {
        targetEntity.element.on('touchstart', this.onPress, this);
        targetEntity.element.on('touchend', this.onRelease, this);
        targetEntity.element.on('touchleave', this.onLeave, this);
    }
    if (this.app.mouse) {
        targetEntity.element.on('mouseenter', this.onEnter, this);
        targetEntity.element.on('mousedown', this.onPress, this);
        targetEntity.element.on('mouseup', this.onRelease, this);
        targetEntity.element.on('mouseleave', this.onLeave, this);
    }
};

BasicButton.prototype._setAvailable = function (value) {
    this.available = value;
    this.entity.element.useInput = this.available;
};


// When the cursor enters the element assign the hovered texture
BasicButton.prototype.onEnter = function (event) {
    this.hovered = true;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'pointer';
};

BasicButton.prototype.onLeave = function (event) {
    this.hovered = false;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
BasicButton.prototype.onPress = function (event) {
    this.hovered = true;
    if (!this.allowClickThrough) event.stopPropagation();
    if (this.clickSound && !this.soundOnRelease) {
        //play click sound
        this.app.fire(EventTypes.PLAY_SFX, 'click');
    }
    this.wasPressed = true;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale), this.upScaleDuration * 0.5, pc.SineOut)
            .start();
    }
};

BasicButton.prototype.onRelease = function (event) {
    if (this.applyScalingTween) {
        if (this.hovered) {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        } else {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        }
    }


    const now = new Date().getTime();
    const elapsedSinceLastClick = now - this.lastClickTimestamp;

    if (this.hovered && this.wasPressed) {
        if(!this.preventDoubleClick || elapsedSinceLastClick >= this.doubleClickMinCooldown) {
            this.triggerClick();
        }
    }

    this.wasPressed = false;
};

BasicButton.prototype.triggerClick = function () {
    this.entity.fire(EventTypes.BUTTON_PRESSED);
    if (this.clickSound && this.soundOnRelease) this.app.fire(EventTypes.PLAY_SFX, 'click');
    VibrationManager.getInstance().hapticSuccess();
    this.lastClickTimestamp = new Date().getTime();
};

BasicButton.assignSimpleAction = function (button, handler, handlerContext) {
    this.triggerEvent = this.triggerEvent || "down";
    if (pc.app.touch) {
        button.element.on(this.triggerEvent === 'down' ? 'touchstart' : 'touchend', handler, handlerContext);
    }
    if (pc.app.mouse) {
        button.element.on(this.triggerEvent === 'down' ? 'mousedown' : 'mouseup', handler, handlerContext);
    }
};


BasicButton.assignAction = BasicButton.assignTapAction = function (button, handler, handlerContext) {

    if (pc.app.touch) {
        button.element.on('touchstart', (event) => {
            button.inputDownParams = { x: event.touch.clientX, y: event.touch.clientY };
        });
        button.element.on('touchend', (event) => {
            if (button.inputDownParams && Utils.distanceBetween(event.touch.clientX, event.touch.clientY, button.inputDownParams.x, button.inputDownParams.y) < 10) {
                handler.call(handlerContext, event);
            }
            button.inputDownParams = null;
        });
    }

    if (pc.app.mouse) {
        button.element.on('mousedown', (event) => {
            button.inputDownParams = { x: event.x, y: event.y };
        });
        button.element.on('mouseup', (event) => {
            if (button.inputDownParams && Utils.distanceBetween(event.x, event.y, button.inputDownParams.x, button.inputDownParams.y) < 10) {
                handler.call(handlerContext, event);
            }
            button.inputDownParams = null;
        });
    }
};

// ScreenBlocker.js
var ScreenBlocker = pc.createScript('screenBlocker');

ScreenBlocker.attributes.add('windowOpacity', {
    type: 'number',
    default: 1
});

ScreenBlocker.prototype.initialize = function () {
    this.app.on(EventTypes.SHOW_TRANSITION_SCREEN, this.showTransitionScreen, this);
    this.app.on(EventTypes.HIDE_TRANSITION_SCREEN, this.hideTransitionScreen, this);

    this.initialColor = this.entity.element.color.clone();
};

ScreenBlocker.prototype.postInitialize = function() {
    this.entity.enabled = false; 
};

ScreenBlocker.prototype.update = function (dt) {
  
};


ScreenBlocker.prototype.swap = function (old) {

};


ScreenBlocker.prototype.showTransitionScreen = function (duration = 0.3, onCompleteCallback = null, splashColor = null) {
    this.resetActiveTween();

    this.entity.enabled = true;
    this.entity.element.color = new pc.Color().copy(splashColor || this.initialColor.toString());

    if (duration > 0) {
        this.entity.element.opacity = 0.0;
        this.transitionTween = this.entity
            .tween(this.entity.element)
            .to({ opacity: this.windowOpacity }, duration, pc.Linear)
            .onComplete(() => {
                if (onCompleteCallback) onCompleteCallback();
            })
            .start();
    } else {
        this.entity.element.opacity = this.windowOpacity;
        if (onCompleteCallback) onCompleteCallback();
    }
};


ScreenBlocker.prototype.hideTransitionScreen = function (duration = 0.25, onCompleteCallback = null) {

    this.resetActiveTween();

    this.entity.element.opacity = 1.0;
    this.transitionTween = this.entity
        .tween(this.entity.element)
        .to({ opacity: 0 }, duration, pc.SineOut)
        .onComplete(() => {
            this.entity.enabled = false;
            if (onCompleteCallback) onCompleteCallback();
        })
        .start();
};


ScreenBlocker.prototype.resetActiveTween = function () {
    if (this.transitionTween && this.transitionTween.playing) {
        this.transitionTween.stop();
    }
    this.transitionTween = null;
};

// rotateLocal.js
var RotateLocal = pc.createScript('rotateLocal');

RotateLocal.attributes.add('angularSpeed', {
    type: 'vec3',
    default: [0, 180, 0]
});

RotateLocal.prototype.initialize = function() {

};

RotateLocal.prototype.update = function(dt) {
    this.entity.rotateLocal(this.angularSpeed.x * dt, this.angularSpeed.y * dt, this.angularSpeed.z * dt)
};

// uiElementAnimator.js
var UiElementAnimator = pc.createScript('uiElementAnimator');

UiElementAnimator.EASINGS = [
    { "Linear": "Linear" },
    { "QuadraticIn": "QuadraticIn" },
    { "QuadraticOut": "QuadraticOut" },
    { "QuadraticInOut": "QuadraticInOut" },
    { "CubicIn": "CubicIn" },
    { "CubicOut": "CubicOut" },
    { "CubicInOut": "CubicInOut" },
    { "QuarticIn": "QuarticIn" },
    { "QuarticOut": "QuarticOut" },
    { "QuarticInOut": "QuarticInOut" },
    { "QuinticIn": "QuinticIn" },
    { "QuinticOut": "QuinticOut" },
    { "QuinticInOut": "QuinticInOut" },
    { "SineIn": "SineIn" },
    { "SineOut": "SineOut" },
    { "SineInOut": "SineInOut" },
    { "ExponentialIn": "ExponentialIn" },
    { "ExponentialOut": "ExponentialOut" },
    { "ExponentialInOut": "ExponentialInOut" },
    { "CircularIn": "CircularIn" },
    { "CircularOut": "CircularOut" },
    { "CircularInOut": "CircularInOut" },
    { "BackIn": "BackIn" },
    { "BackOut": "BackOut" },
    { "BackInOut": "BackInOut" },
    { "BounceIn": "BounceIn" },
    { "BounceOut": "BounceOut" },
    { "BounceInOut": "BounceInOut" },
    { "ElasticIn": "ElasticIn" },
    { "ElasticOut": "ElasticOut" },
    { "ElasticInOut": "ElasticInOut" }
];


UiElementAnimator.attributes.add('appearManually', {
    type: 'boolean',
    default: false
});

UiElementAnimator.attributes.add('stopAllTweensOnStart', {
    type: 'boolean',
    default: true
});

UiElementAnimator.attributes.add('disabledUntilTweenStarts', {
    type: 'boolean',
    default: false
});

UiElementAnimator.attributes.add('disableInputWhileTweening', {
    type: 'boolean',
    default: true
});

UiElementAnimator.attributes.add('delayDependsOnChildIndex', {
    type: 'boolean',
    default: false
});

UiElementAnimator.attributes.add('resetTransformOnStart', {
    type: 'boolean',
    default: true
});

UiElementAnimator.attributes.add('commonAppearDelay', {
    type: 'number',
    default: 0
});

UiElementAnimator.attributes.add('commonDisappearDelay', {
    type: 'number',
    default: 0
});


UiElementAnimator.attributes.add('autoDisappearAfter', {
    type: 'number',
    default: 0
});

UiElementAnimator.attributes.add('appearOpacityTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'applyToChildrenRecursive',
        type: 'boolean',
        default: true
    }, {
        name: 'startOpacity',
        type: 'number',
        default: 0
    }, {
        name: 'targetOpacity',
        type: 'number',
        default: 1
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});


UiElementAnimator.attributes.add('appearScaleTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'startScale',
        type: 'vec3',
        default: [0, 0, 0]
    }, {
        name: 'targetScale',
        type: 'vec3',
        default: [1, 1, 1]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});

UiElementAnimator.attributes.add('appearPositionTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'startDeltaPosition',
        type: 'vec3',
        default: [0, -50, 0]
    }, {
        name: 'toCustomPosition',
        type: 'boolean',
        default: false
    }, {
        name: 'customTargetPosition',
        type: 'vec3',
        default: [0, 0, 0]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});




UiElementAnimator.attributes.add('disappearOpacityTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'applyToChildrenRecursive',
        type: 'boolean',
        default: true
    }, {
        name: 'targetOpacity',
        type: 'number',
        default: 0
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});


UiElementAnimator.attributes.add('disappearScaleTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'targetScale',
        type: 'vec3',
        default: [0, 0, 0]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});

UiElementAnimator.attributes.add('disappearPositionTween', {
    type: 'json',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'endDeltaPosition',
        type: 'vec3',
        default: [0, -50, 0]
    }, {
        name: 'duration',
        type: 'number',
        default: 0.25
    }, {
        name: 'delay',
        type: 'number',
        default: 0
    }, {
        name: 'easing',
        type: 'string',
        default: "Linear",
        enum: UiElementAnimator.EASINGS
    }]
});


UiElementAnimator.prototype.initialize = function () {
    this.entity._isAnimatedUIElement = true;
    this.entity._uiElementAppearManually = this.appearManually;
    this.initialScale = this.entity.getLocalScale().clone();
    this.initialPosition = this.entity.getLocalPosition().clone();
    this.initialOpacity = this.entity.element.opacity;
    this.initialInputStatus = this.entity.element.useInput;

    if (this.appearManually) {
        this.entity.on(EventTypes.UI_ELEMENT.APPEAR_MANUALLY, this.doAppearManually, this);
    } else {
        this.entity.on(EventTypes.UI_ELEMENT.APPEAR, this.doAppear, this);
    }
    this.entity.on(EventTypes.UI_ELEMENT.DISAPPEAR, this.doDisappear, this);
};


UiElementAnimator.prototype.doAppearManually = function () {
    this.doAppear();
    if (this.appearManually) {
        this.entity.children.forEach(child => child.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY));
    }
};

UiElementAnimator.prototype.doAppear = function () {
    if (this.stopAllTweensOnStart) {
        this.app.stopAllTweens(this.entity);
    }

    /* reset state on start */
    if(this.resetTransformOnStart) {
        this.entity.setLocalScale(this.initialScale);
        this.entity.setLocalPosition(this.initialPosition);
        this.entity.element.opacity = this.initialOpacity;
        this.entity.element.useInput = this.initialInputStatus;
    }

    this._processAppearTweens().then(() => {
        this.entity.fire(EventTypes.UI_ELEMENT.APPEARED);

        if(this.autoDisappearAfter > 0) {
            this.entity.delayedCall(this.autoDisappearAfter * 1000, () => {
                this.doDisappear();
            });
        }
    });
};

UiElementAnimator.prototype.doDisappear = function () {
    if (this.stopAllTweensOnStart) {
        this.app.stopAllTweens(this.entity);
    }

    this._processDisappearTweens().then(() => {
        this.entity.fire(EventTypes.UI_ELEMENT.DISAPPEARED)
    });
};

UiElementAnimator.prototype.findChildrenWithOpacityValue = function (item, childrenList) {
    childrenList = childrenList || [item];
    for (let i = 0; i < item.children.length; i++) {
        const child = item.children[i];
        if (child.element && child.element.opacity !== undefined && !child.tags.has('keep-opacity')) {
            childrenList.push(child);
        }
        if(!child.tags.has('keep-opacity')) this.findChildrenWithOpacityValue(child, childrenList);
    }
    return childrenList;
};


UiElementAnimator.prototype._processAppearTweens = async function () {
    const tweenCompletePromises = [];

    /* disable input if needed */
    if (this.disableInputWhileTweening) {
        this.entity.element.useInput = false;
    }

    if (this.disabledUntilTweenStarts) {
        this.entity.enabled = false;
    }

    const parentAppearDelay = this.entity.parent && this.entity.parent.script && this.entity.parent.script.uiElementAnimator ? (this.entity.parent.script.uiElementAnimator.commonAppearDelay || 0) : 0;
    const commonAppearDelay = this.commonAppearDelay + parentAppearDelay;


    /* opacity tween */
    if (this.appearOpacityTween.enabled) {
        const targets = this.appearOpacityTween.applyToChildrenRecursive ? this.findChildrenWithOpacityValue(this.entity) : [this.entity];
        tweenCompletePromises.push(... (targets.map(target => new Promise((resolve, reject) => {
            const tweenConfig = this.appearOpacityTween;
            target.element.opacity = tweenConfig.startOpacity;
            target.tween(target.element)
                .to({ opacity: tweenConfig.targetOpacity }, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonAppearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .onStart(() => { if (this.disabledUntilTweenStarts) this.entity.enabled = true; })
                .start();
        }))));
    }

    /* scale tween */
    if (this.appearScaleTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.appearScaleTween;
            this.entity.setLocalScale(tweenConfig.startScale);
            this.entity.tween(this.entity.getLocalScale())
                .to(tweenConfig.targetScale, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonAppearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .onStart(() => { if (this.disabledUntilTweenStarts) this.entity.enabled = true; })
                .start();
        }));
    }

    /* position tween */
    if (this.appearPositionTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.appearPositionTween;
            this.entity.setLocalPosition(this.initialPosition.x + tweenConfig.startDeltaPosition.x, this.initialPosition.y + tweenConfig.startDeltaPosition.y, this.initialPosition.z + tweenConfig.startDeltaPosition.z);
            this.entity.tween(this.entity.getLocalPosition())
                .to(tweenConfig.toCustomPosition ? tweenConfig.customTargetPosition : this.initialPosition, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonAppearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .onStart(() => { if (this.disabledUntilTweenStarts) this.entity.enabled = true; })
                .start();
        }));
    }


    await Promise.all(tweenCompletePromises);

    this.entity.element.useInput = this.initialInputStatus;

    return true;
};



UiElementAnimator.prototype._processDisappearTweens = async function () {
    const tweenCompletePromises = [];

    /* disable input if needed */
    if (this.disableInputWhileTweening) {
        this.entity.element.useInput = false;
    }

    const parentDisappearDelay = this.entity.parent && this.entity.parent.script && this.entity.parent.script.uiElementAnimator ? this.entity.parent.script.uiElementAnimator.commonDisappearDelay : 0;
    const commonDisappearDelay = this.commonDisappearDelay + parentDisappearDelay;

    /* opacity tween */
    if (this.disappearOpacityTween.enabled) {
        const targets = this.disappearOpacityTween.applyToChildrenRecursive ? this.findChildrenWithOpacityValue(this.entity) : [this.entity];

        tweenCompletePromises.push(... (targets.map(target => new Promise((resolve, reject) => {
            const tweenConfig = this.disappearOpacityTween;
            target.tween(target.element)
                .to({ opacity: tweenConfig.targetOpacity }, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonDisappearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .start();
        }))));
    }

    /* scale tween */
    if (this.disappearScaleTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.disappearScaleTween;
            this.entity.tween(this.entity.getLocalScale())
                .to(tweenConfig.targetScale, tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonDisappearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .start();
        }));
    }

    /* position tween */
    if (this.disappearPositionTween.enabled) {
        tweenCompletePromises.push(new Promise((resolve, reject) => {
            const tweenConfig = this.disappearPositionTween;
            this.entity.tween(this.entity.getLocalPosition())
                .to(this.initialPosition.clone().add(tweenConfig.endDeltaPosition), tweenConfig.duration, pc[tweenConfig.easing])
                .delay(commonDisappearDelay + tweenConfig.delay * (this.delayDependsOnChildIndex ? (this.entity.parent.children.indexOf(this.entity) + 1) : 1))
                .onComplete(() => resolve())
                .start();
        }));
    }


    await Promise.all(tweenCompletePromises);

    this.entity.element.useInput = this.initialInputStatus;

    return true;
};


UiElementAnimator.prototype.update = function (dt) {

};



// DebugOverlay.js
var DebugOverlay = pc.createScript('debugOverlay');


DebugOverlay.prototype.initialize = function() {
    this.changeCameraButton = this.entity.findByName('ButtonChangeCamera');
    this.nextScreenButton = this.entity.findByName('ButtonNextScreen');

    if(this.changeCameraButton) BasicButton.assignAction(this.changeCameraButton, this.onChangeCameraClicked, this);
    if(this.nextScreenButton) BasicButton.assignAction(this.nextScreenButton, this.onNextScreenClicked, this);
};


DebugOverlay.prototype.onChangeCameraClicked = function() {
    CameraController.getInstance()._switchToNextCamera();
};


DebugOverlay.prototype.onNextScreenClicked = function() {
    const screens = [
        Constants.Screens.START,
        Constants.Screens.RESULTS
    ];
    if(!this._lastScreenIndex) this._lastScreenIndex = 0;
    this._lastScreenIndex = (this._lastScreenIndex + 1) % screens.length;
    const screenKey = screens[this._lastScreenIndex];
    UIController.getInstance().showWindow(screenKey);
};

DebugOverlay.prototype.update = function(dt) {
    this.entity.enabled = GameConfig.getAttribute('debug', 'overlay');
};



// scalePulseTween.js
/* jshint esversion: 6 */
var ScalePulseTween = pc.createScript('scalePulseTween');

ScalePulseTween.attributes.add('targetScale', {
    type: 'vec3',
    default: [1.1, 0.925, 1]
});

ScalePulseTween.attributes.add('duration', {
    type: 'number',
    default: 0.9
});

ScalePulseTween.attributes.add('yoyo', {
    type: 'boolean',
    default: true
});

ScalePulseTween.attributes.add('loop', {
    type: 'boolean',
    default: true
});

ScalePulseTween.attributes.add('startOnlyAfterElementAppeared', {
    type: 'boolean',
    default: false
});


ScalePulseTween.attributes.add('easing', {
    type: 'string',
    enum: [
        {"Linear": "Linear"},
        {"QuadraticIn": "QuadraticIn"},
        {"QuadraticOut": "QuadraticOut"},
        {"QuadraticInOut": "QuadraticInOut"},
        {"CubicIn": "CubicIn"},
        {"CubicOut": "CubicOut"},
        {"CubicInOut": "CubicInOut"},
        {"QuarticIn": "QuarticIn"},
        {"QuarticOut": "QuarticOut"},
        {"QuarticInOut": "QuarticInOut"},
        {"QuinticIn": "QuinticIn"},
        {"QuinticOut": "QuinticOut"},
        {"QuinticInOut": "QuinticInOut"},
        {"SineIn": "SineIn"},
        {"SineOut": "SineOut"},
        {"SineInOut": "SineInOut"},
        {"ExponentialIn": "ExponentialIn"},
        {"ExponentialOut": "ExponentialOut"},
        {"ExponentialInOut": "ExponentialInOut"},
        {"CircularIn": "CircularIn"},
        {"CircularOut": "CircularOut"},
        {"CircularInOut": "CircularInOut"},
        {"BackIn": "BackIn"},
        {"BackOut": "BackOut"},
        {"BackInOut": "BackInOut"},
        {"BounceIn": "BounceIn"},
        {"BounceOut": "BounceOut"},
        {"BounceInOut": "BounceInOut"},
        {"ElasticIn": "ElasticIn"},
        {"ElasticOut": "ElasticOut"},
        {"ElasticInOut": "ElasticInOut"}
    ],
    default: "Linear"
});

ScalePulseTween.prototype.initialize = function() {
    this.initialScale = this.entity.getLocalScale().clone();
    
    if(this.startOnlyAfterElementAppeared) {
        this.entity.once(EventTypes.UI_ELEMENT.APPEARED, () => this._restartTween());
    } else {
        this._restartTween();
    }
    this.on('attr', this._restartTween, this);
};


ScalePulseTween.prototype.update = function(dt) {
    
};


ScalePulseTween.prototype._restartTween = function() {
    // this.app.stopAllTweens(this.entity);
    this.entity.setLocalScale(this.initialScale);
    
    this.entity.tween(this.entity.getLocalScale())
        .to(this.targetScale, this.duration, pc[this.easing])
        .yoyo(this.yoyo)
        .loop(this.loop)
        .start(); 
};


// holdButton.js
/* jshint esversion: 6 */
var HoldButton = pc.createScript('holdButton');


HoldButton.attributes.add('applyScalingTween', {
    title: "Apply scaling tween",
    type: 'boolean',
    default: true
});

HoldButton.attributes.add('defaultScale', {
    title: "Default scale",
    type: 'number',
    default: 1,
    min: 0.5,
    max: 1.5
});

HoldButton.attributes.add('hoverScale', {
    title: "Hover scale",
    type: 'number',
    default: 1.03,
    min: 0.5,
    max: 1.5
});

HoldButton.attributes.add('pressedScale', {
    title: "Pressed scale",
    type: 'number',
    default: 0.97,
    min: 0.5,
    max: 1.5
});

HoldButton.attributes.add('upScaleDuration', {
    title: "Tween duration",
    type: 'number',
    default: 0.085,
    min: 0.005,
    max: 1
});

HoldButton.attributes.add('allowClickThrough', {
    title: "Click through",
    type: 'boolean',
    default: false
});



HoldButton.prototype.initialize = function () {
    this.hovered = false;
    this.pressed = false;

    const scriptContext = this;

    Object.defineProperty(this.entity, 'isPressed', {
        get: () => scriptContext.pressed
    });

    if (this.app.touch) {
        this.entity.element.on('touchstart', this.onPress, this);
        this.entity.element.on('touchend', this.onRelease, this);
    } 
    
    if(this.app.mouse) {
        this.entity.element.on('mouseenter', this.onEnter, this);
        this.entity.element.on('mousedown', this.onPress, this);
        this.entity.element.on('mouseup', this.onRelease, this);
        this.entity.element.on('mouseleave', this.onLeave, this);
    }
};


// When the cursor enters the element assign the hovered texture
HoldButton.prototype.onEnter = function (event) {
    this.hovered = true;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'pointer';
};

HoldButton.prototype.onLeave = function (event) {
    this.hovered = false;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration, pc.Linear)
            .start();
    }


    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
HoldButton.prototype.onPress = function (event) {
    if (!this.allowClickThrough) event.stopPropagation();
    this.pressed = true;

    this.entity.element.opacity = 0.9;

    if (this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale), this.upScaleDuration * 0.5, pc.SineOut)
            .start();
    }

};

HoldButton.prototype.onRelease = function (event) {
    if (this.applyScalingTween) {
        if (this.hovered) {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        } else {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        }
    }
    this.entity.element.opacity = 0.4;
    
    this.pressed = false;
};

// BaseWindow.js
class BaseWindow extends pc.ScriptType {

    initialize() {
        this._initEntityMethods();
        this._initComponents();

        this._pointerDown = false;
        this._pointerX = 0;
        this._pointerY = 0;
        this.app.on(EventTypes.INPUT_DOWN, this._handleInputDown, this);
        this.app.on(EventTypes.INPUT_UP, this._handleInputUp, this);
        this.app.on(EventTypes.TAP_AT, this._handleTapAt, this);
        this.app.on(EventTypes.SWIPE_LEFT, this._handleSwipeLeft, this);
        this.app.on(EventTypes.SWIPE_RIGHT, this._handleSwipeRight, this);
        this.app.on(EventTypes.SWIPE_UP, this._handleSwipeUp, this);
        this.app.on(EventTypes.SWIPE_DOWN, this._handleSwipeDown, this);
    }


    _handleTapAt(x, y, relX, relY) {
        if (!this.entity.enabled) return;

        this.onTap(relX, relY);
    }

    _handleInputDown(x, y, relX, relY) {
        if (!this.entity.enabled) return;

        this._pointerDown = true;
        this._pointerX = relX;
        this._pointerY = relY;

        this.onPointerDown(relX, relY);
    }

    _handleInputUp(x, y, relX, relY) {
        if (!this.entity.enabled) return;

        if (this._pointerDown) {
            this._pointerDown = false;
        }

        this.onPointerUp(relX, relY);
    }

    _handleSwipeLeft() {
        if (!this.entity.enabled) return;

        this.onSwipeLeft();
    }


    _handleSwipeRight() {
        if (!this.entity.enabled) return;

        this.onSwipeRight();
    }


    _handleSwipeUp() {
        if (!this.entity.enabled) return;

        this.onSwipeUp();
    }


    _handleSwipeDown() {
        if (!this.entity.enabled) return;

        this.onSwipeDown();
    }


    onSwipeLeft() {

    }


    onSwipeRight() {

    }


    onSwipeUp() {

    }


    onSwipeDown() {

    }

    onTap(relX, relY) {

    }

    onPointerDown(relX, relY) {

    }

    onPointerUp(relX, relY) {

    }


    update(dt) {

    }


    appearElements() {
        const elements = this.entity.find(node => node._isAnimatedUIElement && !node._uiElementAppearManually);
        elements.forEach(element => {
            element.fire(EventTypes.UI_ELEMENT.APPEAR);
        });

        const completionPromises = elements.map(element => new Promise((resolve, reject) => {
            element.once(EventTypes.UI_ELEMENT.APPEARED, () => resolve());
        }));

        /* listen to animation complete events */
        return Promise.all(completionPromises);
    }


    disappearElements() {
        const elements = this.entity.find(node => node._isAnimatedUIElement);
        elements.forEach(element => {
            element.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        });

        const completionPromises = elements.map(element => new Promise((resolve, reject) => {
            element.once(EventTypes.UI_ELEMENT.DISAPPEARED, () => resolve());
        }));

        /* listen to animation complete events */
        return Promise.all(completionPromises);
    }


    /* private */
    _initEntityMethods() {
        const scriptContext = this;

        this.entity.show = function (windowToOpenOnExit) {
            return new Promise((resolve, reject) => {
                this._windowToOpenOnExit = windowToOpenOnExit;
                this.enabled = true;
                scriptContext.appearElements().then(() => {
                    resolve();
                    if (scriptContext._onAppeared) scriptContext._onAppeared();
                    UIController.getInstance().dispatchWindowShown(this.name);
                });
                scriptContext._onShow();
                scriptContext._justShown = true;
                setTimeout(() => scriptContext._justShown = false, 0);
            });

        }.bind(this.entity);


        this.entity.hide = function (immediately) {
            return new Promise((resolve, reject) => {
                const disableWindow = () => {
                    if (this.enabled) scriptContext._onHide();
                    this.enabled = false;
                    UIController.getInstance().dispatchWindowHidden(this.name);
                    if (this._windowToOpenOnExit) {
                        const nextWindowName = this._windowToOpenOnExit;
                        this._windowToOpenOnExit = null;
                        UIController.getInstance().showWindow(nextWindowName);
                    }
                };

                if (immediately || !this.enabled) {
                    disableWindow();
                    resolve();
                    if (scriptContext._onHidden) scriptContext._onHidden();
                } else {
                    scriptContext.disappearElements().then(() => {
                        disableWindow();
                        resolve();
                        if (scriptContext._onHidden) scriptContext._onHidden();
                    });
                }
            });
        }.bind(this.entity);


        this.entity.clearPendingWindow = function () {
            this._windowToOpenOnExit = null;
        }.bind(this.entity);
    }

    _initComponents() {

    }

    _onShow() {

    }

    _onHide() {

    }
}


pc.registerScript(BaseWindow, 'baseWindow');

// CloseableWindow.js
class CloseableWindow extends BaseWindow {
    
    initialize() {
        super.initialize();
    }

    _initComponents() {
        /* components */
        this.closeButton = this.entity.findByName('CloseButton');
        
        /* listeners */
        BasicButton.assignAction(this.closeButton, this.onCloseClicked, this);
    }
    
    
    /* event handlers */
    onCloseClicked() {
        this.entity.hide();
    }
}

pc.registerScript(CloseableWindow, 'closeableWindow');

// LibraryManager.js
var LibraryManager = pc.createScript('libraryManager');

LibraryManager.attributes.add('assets', {
    type: 'json',
    schema: [{
        name: 'key',
        type: 'string',
        default: ''
    },
    {
        name: 'asset',
        type: 'asset'
    }],
    array: true
});

LibraryManager.getInstance = function () {
    if (!LibraryManager._instance) console.error('LibraryManager is not initialized yet');
    return LibraryManager._instance;
};

LibraryManager.prototype.initialize = function () {
    LibraryManager._app = this.app;
    if (!LibraryManager._instance) {
        LibraryManager._instance = this;
    }
};

LibraryManager.prototype.isEditorEnvironment = function() {
    return window.location.host === 'launch.playcanvas.com';
};

LibraryManager.prototype.getAsset = function(key) {
    let assetRecord = this.assets.find(asset => asset.key === key);
    if(!assetRecord || !assetRecord.asset) {
        console.warn('No assets with key ' + key);
        return null;
    }
    return assetRecord.asset;
};

LibraryManager.prototype.getAssetURL = function(key) {
    let assetRecord = this.assets.find(asset => asset.key === key);
    if(!assetRecord || !assetRecord.asset) {
        console.warn('No assets with key ' + key);
        return null;
    }
    if(this.isEditorEnvironment()) {
        const assetID = assetRecord.asset.id;
        return `api/assets/${assetID}/file/${key}`;
    }
    return assetRecord.asset.file.url;
};

LibraryManager.prototype.getAssetURLFromLibrary = function(key) {
    let assetRecord = this.app.assets.find(key);
    if(!assetRecord) {
        console.warn('No assets with key ' + key);
        return null;
    }
    if(this.isEditorEnvironment()) {
        const assetID = assetRecord.id;
        const assetName = assetRecord.name;
        return `api/assets/${assetID}/file/${assetName}`;
    }
    return assetRecord.file.url;
};

LibraryManager.prototype.update = function(dt) {

};


// ArabicConverter.js
/**
 * Converter from Arabic to Arabic Presentation Forms-B
 * http://en.wikipedia.org/wiki/Arabic_(Unicode_block)
 * http://en.wikipedia.org/wiki/Arabic_Presentation_Forms-B
 *
 * Usage:
 * var arabicFormBText = arabicConverter.convertArabic(arabicText);
 * var arabicText = convertArabicBack.convertArabic(arabicFormBText);
 *
 * @link https://github.com/lamerw/Arabic-Converter-From-and-To-Arabic-Presentation-Forms-B
 */
(function (root, factory) {
    "use strict";
    /* global define:true */
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        //Module pattern
        root.arabicConverter = factory();
    }
}(this, function () {
    "use strict";


    /**
     * @private
     * @type {number}
     */
    var NIL = 0x0000;

    /**
     * @TODO replace with charsMap.length
     * @private
     * @type {number}
     */
    var MAP_LENGTH = 37;

    /**
     * @TODO replace with combCharsMap.length
     * @private
     * @type {number}
     */
    var COMB_MAP_LENGTH = 4;

    /**
     * @TODO replace with transChars.length
     * @private
     * @type {number}
     */
    var TRANS_CHARS_LENGTH = 39;


    /**
     * TODO refactor charsMap for the following structure
     * @private
     * @type {{code: number, mIsolated: number, mInitial: number, mMedial: number, mFinal: number}}
     */
    //var CharRep = {
    //    code: 0,
    //    mIsolated: 0,
    //    mInitial: 0,
    //    mMedial: 0,
    //    mFinal: 0
    //};

    /**
     * TODO refactor combCharsMap for the following structure
     * @private
     * @type {{code: number, mIsolated: number, mInitial: number, mMedial: number, mFinal: number}}
     */
    //var CombCharRep = {
    //    code: 0,
    //    mIsolated: 0,
    //    mInitial: 0,
    //    mMedial: 0,
    //    mFinal: 0
    //};

    /**
     * @private
     * @type {*[]}
     */
    var charsMap = [
        [0x0621, 0xFE80, NIL, NIL, NIL], /* HAMZA */
        [0x0622, 0xFE81, NIL, NIL, 0xFE82], /* ALEF_MADDA */
        [0x0623, 0xFE83, NIL, NIL, 0xFE84], /* ALEF_HAMZA_ABOVE */
        [0x0624, 0xFE85, NIL, NIL, 0xFE86], /* WAW_HAMZA */
        [0x0625, 0xFE87, NIL, NIL, 0xFE88], /* ALEF_HAMZA_BELOW */
        [0x0626, 0xFE89, 0xFE8B, 0xFE8C, 0xFE8A], /* YEH_HAMZA */
        [0x0627, 0xFE8D, NIL, NIL, 0xFE8E], /* ALEF */
        [0x0628, 0xFE8F, 0xFE91, 0xFE92, 0xFE90], /* BEH */
        [0x0629, 0xFE93, NIL, NIL, 0xFE94], /* TEH_MARBUTA */
        [0x062A, 0xFE95, 0xFE97, 0xFE98, 0xFE96], /* TEH */
        [0x062B, 0xFE99, 0xFE9B, 0xFE9C, 0xFE9A], /* THEH */
        [0x062C, 0xFE9D, 0xFE9F, 0xFEA0, 0xFE9E], /* JEEM */
        [0x062D, 0xFEA1, 0xFEA3, 0xFEA4, 0xFEA2], /* HAH */
        [0x062E, 0xFEA5, 0xFEA7, 0xFEA8, 0xFEA6], /* KHAH */
        [0x062F, 0xFEA9, NIL, NIL, 0xFEAA], /* DAL */
        [0x0630, 0xFEAB, NIL, NIL, 0xFEAC], /* THAL */
        [0x0631, 0xFEAD, NIL, NIL, 0xFEAE], /* REH */
        [0x0632, 0xFEAF, NIL, NIL, 0xFEB0], /* ZAIN */
        [0x0633, 0xFEB1, 0xFEB3, 0xFEB4, 0xFEB2], /* SEEN */
        [0x0634, 0xFEB5, 0xFEB7, 0xFEB8, 0xFEB6], /* SHEEN */
        [0x0635, 0xFEB9, 0xFEBB, 0xFEBC, 0xFEBA], /* SAD */
        [0x0636, 0xFEBD, 0xFEBF, 0xFEC0, 0xFEBE], /* DAD */
        [0x0637, 0xFEC1, 0xFEC3, 0xFEC4, 0xFEC2], /* TAH */
        [0x0638, 0xFEC5, 0xFEC7, 0xFEC8, 0xFEC6], /* ZAH */
        [0x0639, 0xFEC9, 0xFECB, 0xFECC, 0xFECA], /* AIN */
        [0x063A, 0xFECD, 0xFECF, 0xFED0, 0xFECE], /* GHAIN */
        [0x0640, 0x0640, NIL, NIL, NIL], /* TATWEEL */
        [0x0641, 0xFED1, 0xFED3, 0xFED4, 0xFED2], /* FEH */
        [0x0642, 0xFED5, 0xFED7, 0xFED8, 0xFED6], /* QAF */
        [0x0643, 0xFED9, 0xFEDB, 0xFEDC, 0xFEDA], /* KAF */
        [0x0644, 0xFEDD, 0xFEDF, 0xFEE0, 0xFEDE], /* LAM */
        [0x0645, 0xFEE1, 0xFEE3, 0xFEE4, 0xFEE2], /* MEEM */
        [0x0646, 0xFEE5, 0xFEE7, 0xFEE8, 0xFEE6], /* NOON */
        [0x0647, 0xFEE9, 0xFEEB, 0xFEEC, 0xFEEA], /* HEH */
        [0x0648, 0xFEED, NIL, NIL, 0xFEEE], /* WAW */
//[ 0x0649, 0xFEEF, 0xFBE8, 0xFBE9, 0xFEF0 ],    /* ALEF_MAKSURA */
        [0x0649, 0xFEEF, NIL, NIL, 0xFEF0], /* ALEF_MAKSURA */
        [0x064A, 0xFEF1, 0xFEF3, 0xFEF4, 0xFEF2] /* YEH */
    ];

    /**
     * @private
     * @type {*[]}
     */
    var combCharsMap = [
        [[0x0644, 0x0622], 0xFEF5, NIL, NIL, 0xFEF6], /* LAM_ALEF_MADDA */
        [[0x0644, 0x0623], 0xFEF7, NIL, NIL, 0xFEF8], /* LAM_ALEF_HAMZA_ABOVE */
        [[0x0644, 0x0625], 0xFEF9, NIL, NIL, 0xFEFA], /* LAM_ALEF_HAMZA_BELOW */
        [[0x0644, 0x0627], 0xFEFB, NIL, NIL, 0xFEFC] /* LAM_ALEF */
    ];

    var transChars = [
        0x0610, /* ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM */
        0x0612, /* ARABIC SIGN ALAYHE ASSALLAM */
        0x0613, /* ARABIC SIGN RADI ALLAHOU ANHU */
        0x0614, /* ARABIC SIGN TAKHALLUS */
        0x0615, /* ARABIC SMALL HIGH TAH */
        0x064B, /* ARABIC FATHATAN */
        0x064C, /* ARABIC DAMMATAN */
        0x064D, /* ARABIC KASRATAN */
        0x064E, /* ARABIC FATHA */
        0x064F, /* ARABIC DAMMA */
        0x0650, /* ARABIC KASRA */
        0x0651, /* ARABIC SHADDA */
        0x0652, /* ARABIC SUKUN */
        0x0653, /* ARABIC MADDAH ABOVE */
        0x0654, /* ARABIC HAMZA ABOVE */
        0x0655, /* ARABIC HAMZA BELOW */
        0x0656, /* ARABIC SUBSCRIPT ALEF */
        0x0657, /* ARABIC INVERTED DAMMA */
        0x0658, /* ARABIC MARK NOON GHUNNA */
        0x0670, /* ARABIC LETTER SUPERSCRIPT ALEF */
        0x06D6, /* ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA */
        0x06D7, /* ARABIC SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA */
        0x06D8, /* ARABIC SMALL HIGH MEEM INITIAL FORM */
        0x06D9, /* ARABIC SMALL HIGH LAM ALEF */
        0x06DA, /* ARABIC SMALL HIGH JEEM */
        0x06DB, /* ARABIC SMALL HIGH THREE DOTS */
        0x06DC, /* ARABIC SMALL HIGH SEEN */
        0x06DF, /* ARABIC SMALL HIGH ROUNDED ZERO */
        0x06E0, /* ARABIC SMALL HIGH UPRIGHT RECTANGULAR ZERO */
        0x06E1, /* ARABIC SMALL HIGH DOTLESS HEAD OF KHAH */
        0x06E2, /* ARABIC SMALL HIGH MEEM ISOLATED FORM */
        0x06E3, /* ARABIC SMALL LOW SEEN */
        0x06E4, /* ARABIC SMALL HIGH MADDA */
        0x06E7, /* ARABIC SMALL HIGH YEH */
        0x06E8, /* ARABIC SMALL HIGH NOON */
        0x06EA, /* ARABIC EMPTY CENTRE LOW STOP */
        0x06EB, /* ARABIC EMPTY CENTRE HIGH STOP */
        0x06EC, /* ARABIC ROUNDED HIGH STOP WITH FILLED CENTRE */
        0x06ED /* ARABIC SMALL LOW MEEM */
    ];


    /**
     * TODO rename into camelCase
     * @private
     *
     * @param code
     * @returns {boolean}
     */
    function characterMapContains(code)
    {
        for (var i = 0; i < MAP_LENGTH; i++)
        {
            //[0] == .code
            if (charsMap[i][0] === code) {
                return true;
            }
        }

        return false;
    }

    /**
     * TODO rename into camelCase
     * @private
     *
     * @param code
     * @returns {CharRep}
     */
    function getCharRep(code)
    {
        for (var i = 0; i < MAP_LENGTH; i++)
        {
            //[0] == .code
            if (charsMap[i][0] === code) {
                return charsMap[i];
            }
        }

        //FIXME CharRep object
        return [ NIL, NIL, NIL, NIL ];
    }


    /**
     * @TODO rename into camelCase
     * @private
     *
     * @param code1
     * @param code2
     * @returns {CombCharRep}
     */
    function  getCombCharRep( code1, code2)
    {
        for (var i = 0; i < COMB_MAP_LENGTH; i++)
        {
            //[0] == .code
            if (combCharsMap[i][0][0] === code1 && combCharsMap[i][0][1] === code2) {
                return combCharsMap[i];
            }
        }

        //FIXME CombCharRep object
        return [[ NIL, NIL ], NIL, NIL, NIL ];
    }

    /**
     * @TODO rename into camelCase
     * @private
     *
     * @param code
     * @returns {boolean}
     */
    function isTransparent(code)
    {
        for (var i = 0; i < TRANS_CHARS_LENGTH; i++)
        {
            if (transChars[i] === code) {
                return true;
            }
        }
        return false;
    }

    /**
     * convert to Arabic Presentation Forms B
     * @param normal
     * @returns {string}
     */
    function convertArabic(normal) {
        if (!normal){
            return '';
        }

        var len = normal.length;
        /* typeof CharRep*/
        var crep;

        /* typeof CombCharRep*/
        var combcrep;

        var shaped = [];

        var writeCount = 0;
        for (var i = 0; i < len; i++) {
            var current = normal.charCodeAt(i);
            if (characterMapContains(current)) {
                var prev = NIL;
                var next = NIL;
                var prevID = i - 1;
                var nextID = i + 1;

                /*
                 Transparent characters have no effect in the shaping process.
                 So, ignore all the transparent characters that are BEFORE the
                 current character.
                 */
                for (; prevID >= 0; prevID--) {
                    if (!isTransparent(normal.charCodeAt(prevID))) {
                        break;
                    }
                }


                //[2] == .mInitial
                //[3] == .mMedial
                if ((prevID < 0) || !characterMapContains(prev = normal.charCodeAt(prevID)) ||
                    (((crep = getCharRep(prev))[2] === NIL) && (crep[3] === NIL))) {
                    prev = NIL;
                }

                /*
                 Transparent characters have no effect in the shaping process.
                 So, ignore all the transparent characters that are AFTER the
                 current character.
                 */
                for (; nextID < len; nextID++) {
                    if (!isTransparent(normal.charCodeAt(nextID))) {
                        break;
                    }
                }

                //[3] == .mMedial
                //[4] == .mFinal
                if ((nextID >= len) || !characterMapContains(next = normal.charCodeAt(nextID)) ||
                    (((crep = getCharRep(next))[3] === NIL) &&
                    ((crep = getCharRep(next))[4] === NIL) && (next !== 0x0640))) {
                    next = NIL;
                }

                /* Combinations */
                if (current === 0x0644 && next !== NIL && (next === 0x0622 || next === 0x0623 ||
                    next === 0x0625 || next === 0x0627)) {
                    combcrep = getCombCharRep(current, next);
                    if (prev !== NIL) {
                        //[4] == .mFinal
                        shaped[writeCount++] = combcrep[4];
                    }
                    else {
                        //[1] == .mIsolated
                        shaped[writeCount++] = combcrep[1];
                    }
                    i++;
                    continue;
                }

                crep = getCharRep(current);

                /* Medial */
                //[3] == .mMedial
                if (prev !== NIL && next !== NIL && crep[3] !== NIL) {
                    shaped[writeCount++] = crep[3];
                    continue;
                    /* Final */
                }
                //[4] == .mFinal
                else if (prev !== NIL && crep[4] !== NIL) {
                    //[4] == .mFinal
                    shaped[writeCount++] = crep[4];
                    continue;
                    /* Initial */
                }

                //[2] == .mInitial
                else if (next !== NIL && crep[2] !== NIL) {
                    shaped[writeCount++] = crep[2];
                    continue;
                }
                /* Isolated */
                //[1] == .mIsolated
                shaped[writeCount++] = crep[1];
            }
            else {
                shaped[writeCount++] = current;
            }
        }
        shaped[writeCount] = NIL;
        var toReturn = '';
        for (var d = 0; d < writeCount; d++) {

            if (typeof shaped[d] !== 'undefined') {
                //toReturn += shaped[d] +' ';
                toReturn += String.fromCharCode(shaped[d]);
            } else {
                //console.error('Undefined symbol # ', d);
            }
        }

        return toReturn;
    }


    /**
     * convert from Arabic Presentation Forms B
     * @param apfb
     * @returns {string}
     */
    function convertArabicBack(apfb) {
        if (!apfb) {
            return '';
        }

        var toReturn = "";
        var charCode;
        var selectedChar;

        for (var i = 0; i < apfb.length; i++) {
            selectedChar = apfb.charCodeAt(i);
            charCode = null;
            if (selectedChar >= 65136 && selectedChar <= 65279) {

                for (var j = 0; j < MAP_LENGTH; j++) {
                    //[4] == .mFinal
                    //[2] == .mInitial
                    //[1] == .mIsolated
                    //[3] == .mMedial
                    if (charsMap[j][4] === selectedChar || charsMap[j][2] === selectedChar ||
                        charsMap[j][1] === selectedChar || charsMap[j][3] === selectedChar) {
                        //[0] == .code
                        charCode = charsMap[j][0];
                    }
                }

                //check for combChar
                if (!charCode) {
                    for (var l = 0; l < COMB_MAP_LENGTH; l++) {
                        //[4] == .mFinal
                        //[1] == .mIsolated
                        if (combCharsMap[l][1] === selectedChar || combCharsMap[l][4] === selectedChar) {
                            charCode = selectedChar;
                        }
                    }
                }

                toReturn += charCode ? String.fromCharCode(charCode) : '';
            } else {
                toReturn += apfb[i];
            }
        }

        return toReturn;
    }

    return {
        convertArabic: convertArabic,
        convertArabicBack: convertArabicBack
    };
}));



// RTLSetup.js
// PlayCanvas RTLSetup.js v0.1
var rtlReorder = function (symbols) {
    // Convert array of symbols to codepoints
    var codes = symbols.map(function (s) {
        return s.codePointAt(0);
    });

    // resolve levels and generate mapping
    var levels = UnicodeBidirectional.resolve(codes, 0, true);
    var indices = UnicodeBidirectional.reorderPermutation(levels);
    var rtl = (levels[0] === 1);

    return {
        rtl: rtl,
        mapping: rtl ? indices.reverse() : indices
    };
};

var app = pc.AppBase.getApplication();

// Unicode Converter takes the original unicode string and transforms into a different set of unicode charactesr
// In the case of arabic, we convert the unicode input string which contains the regular arabic alphabet and
// converts it into the "presentation forms" which are the characters that are specific to the location in the word
app.systems.element.registerUnicodeConverter(arabicConverter.convertArabic);

// register function for calculating bidi mapping
app.systems.element.registerRtlReorder(rtlReorder);

// UnicodeBidirectional.js
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("UnicodeBidirectional",[],e):"object"==typeof exports?exports.UnicodeBidirectional=e():t.UnicodeBidirectional=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(u[r])return u[r].exports;var n=u[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var u={};return e.m=t,e.c=u,e.d=function(t,u,r){e.o(t,u)||Object.defineProperty(t,u,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var u=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(u,"a",u),u},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=17)}([function(t,e,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isNonFormatting=e.isX9ControlCharacter=e.isStrong=e.isPDI=e.isIsolateInitiator=e.isR=e.isNI=e.isET=e.MAX_DEPTH=e.RIGHT_CURLY=e.LEFT_CURLY=e.RIGHT_SQUARE=e.LEFT_SQUARE=e.RIGHT_PAR=e.LEFT_PAR=e.WS1=e.BN1=e.EN1=e.AN1=e.ON1=e.R1=e.L1=e.S1=e.B1=e.G=e.F=e.E=e.D=e.C=e.B=e.A=e.RLO=e.RLM=e.RLI=e.RLE=e.PDI=e.PDF=e.LRO=e.LRM=e.LRI=e.LRE=e.FSI=e.ALM=void 0;var r=u(2),n=function(t){return t&&t.__esModule?t:{default:t}}(r),i=function(t){return"ET"===t},o=function(t){return(0,n.default)(["B","S","WS","ON","FSI","LRI","RLI","PDI"],t)},a=function(t){return(0,n.default)(["R","AN","EN"],t)},s=function(t){return(0,n.default)(["LRI","RLI","FSI"],t)},f=function(t){return 8297===t},c=function(t){return(0,n.default)(["L","R","AL"],t)},D=function(t){return(0,n.default)(["RLE","LRE","RLO","LRO","PDF","BN"],t)},l=function(t){return(0,n.default)(["B","BN","RLE","LRE","RLO","LRO","PDF","RLI","LRI","FSI","PDI"],t)};e.ALM=1564,e.FSI=8296,e.LRE=8234,e.LRI=8294,e.LRM=8206,e.LRO=8237,e.PDF=8236,e.PDI=8297,e.RLE=8235,e.RLI=8295,e.RLM=8207,e.RLO=8238,e.A=65,e.B=66,e.C=67,e.D=68,e.E=69,e.F=70,e.G=71,e.B1=8233,e.S1=9,e.L1=109,e.R1=1488,e.ON1=34,e.AN1=1633,e.EN1=50,e.BN1=0,e.WS1=32,e.LEFT_PAR=40,e.RIGHT_PAR=41,e.LEFT_SQUARE=91,e.RIGHT_SQUARE=93,e.LEFT_CURLY=123,e.RIGHT_CURLY=125,e.MAX_DEPTH=125,e.isET=i,e.isNI=o,e.isR=a,e.isIsolateInitiator=s,e.isPDI=f,e.isStrong=c,e.isX9ControlCharacter=D,e.isNonFormatting=l},function(t,e,u){!function(e,u){t.exports=u()}(0,function(){"use strict";function t(t,e){e&&(t.prototype=Object.create(e.prototype)),t.prototype.constructor=t}function e(t){return i(t)?t:I(t)}function u(t){return o(t)?t:x(t)}function r(t){return a(t)?t:L(t)}function n(t){return i(t)&&!s(t)?t:M(t)}function i(t){return!(!t||!t[su])}function o(t){return!(!t||!t[fu])}function a(t){return!(!t||!t[cu])}function s(t){return o(t)||a(t)}function f(t){return!(!t||!t[Du])}function c(t){return t.value=!1,t}function D(t){t&&(t.value=!0)}function l(){}function h(t,e){e=e||0;for(var u=Math.max(0,t.length-e),r=new Array(u),n=0;n<u;n++)r[n]=t[n+e];return r}function p(t){return void 0===t.size&&(t.size=t.__iterate(_)),t.size}function d(t,e){if("number"!=typeof e){var u=e>>>0;if(""+u!==e||4294967295===u)return NaN;e=u}return e<0?p(t)+e:e}function _(){return!0}function v(t,e,u){return(0===t||void 0!==u&&t<=-u)&&(void 0===e||void 0!==u&&e>=u)}function F(t,e){return C(t,e,0)}function E(t,e){return C(t,e,e)}function C(t,e,u){return void 0===t?u:t<0?Math.max(0,e+t):void 0===e?t:Math.min(e,t)}function A(t){this.next=t}function y(t,e,u,r){var n=0===t?e:1===t?u:[e,u];return r?r.value=n:r={value:n,done:!1},r}function B(){return{value:void 0,done:!0}}function g(t){return!!w(t)}function m(t){return t&&"function"==typeof t.next}function S(t){var e=w(t);return e&&e.call(t)}function w(t){var e=t&&(Au&&t[Au]||t[yu]);if("function"==typeof e)return e}function b(t){return t&&"number"==typeof t.length}function I(t){return null===t||void 0===t?P():i(t)?t.toSeq():N(t)}function x(t){return null===t||void 0===t?P().toKeyedSeq():i(t)?o(t)?t.toSeq():t.fromEntrySeq():T(t)}function L(t){return null===t||void 0===t?P():i(t)?o(t)?t.entrySeq():t.toIndexedSeq():q(t)}function M(t){return(null===t||void 0===t?P():i(t)?o(t)?t.entrySeq():t:q(t)).toSetSeq()}function z(t){this._array=t,this.size=t.length}function O(t){var e=Object.keys(t);this._object=t,this._keys=e,this.size=e.length}function R(t){this._iterable=t,this.size=t.length||t.size}function k(t){this._iterator=t,this._iteratorCache=[]}function j(t){return!(!t||!t[gu])}function P(){return mu||(mu=new z([]))}function T(t){var e=Array.isArray(t)?new z(t).fromEntrySeq():m(t)?new k(t).fromEntrySeq():g(t)?new R(t).fromEntrySeq():"object"==typeof t?new O(t):void 0;if(!e)throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: "+t);return e}function q(t){var e=U(t);if(!e)throw new TypeError("Expected Array or iterable object of values: "+t);return e}function N(t){var e=U(t)||"object"==typeof t&&new O(t);if(!e)throw new TypeError("Expected Array or iterable object of values, or keyed object: "+t);return e}function U(t){return b(t)?new z(t):m(t)?new k(t):g(t)?new R(t):void 0}function W(t,e,u,r){var n=t._cache;if(n){for(var i=n.length-1,o=0;o<=i;o++){var a=n[u?i-o:o];if(!1===e(a[1],r?a[0]:o,t))return o+1}return o}return t.__iterateUncached(e,u)}function K(t,e,u,r){var n=t._cache;if(n){var i=n.length-1,o=0;return new A(function(){var t=n[u?i-o:o];return o++>i?B():y(e,r?t[0]:o-1,t[1])})}return t.__iteratorUncached(e,u)}function J(t,e){return e?H(e,t,"",{"":t}):X(t)}function H(t,e,u,r){return Array.isArray(e)?t.call(r,u,L(e).map(function(u,r){return H(t,u,r,e)})):G(e)?t.call(r,u,x(e).map(function(u,r){return H(t,u,r,e)})):e}function X(t){return Array.isArray(t)?L(t).map(X).toList():G(t)?x(t).map(X).toMap():t}function G(t){return t&&(t.constructor===Object||void 0===t.constructor)}function V(t,e){if(t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1;if("function"==typeof t.valueOf&&"function"==typeof e.valueOf){if(t=t.valueOf(),e=e.valueOf(),t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1}return!("function"!=typeof t.equals||"function"!=typeof e.equals||!t.equals(e))}function Y(t,e){if(t===e)return!0;if(!i(e)||void 0!==t.size&&void 0!==e.size&&t.size!==e.size||void 0!==t.__hash&&void 0!==e.__hash&&t.__hash!==e.__hash||o(t)!==o(e)||a(t)!==a(e)||f(t)!==f(e))return!1;if(0===t.size&&0===e.size)return!0;var u=!s(t);if(f(t)){var r=t.entries();return e.every(function(t,e){var n=r.next().value;return n&&V(n[1],t)&&(u||V(n[0],e))})&&r.next().done}var n=!1;if(void 0===t.size)if(void 0===e.size)"function"==typeof t.cacheResult&&t.cacheResult();else{n=!0;var c=t;t=e,e=c}var D=!0,l=e.__iterate(function(e,r){if(u?!t.has(e):n?!V(e,t.get(r,du)):!V(t.get(r,du),e))return D=!1,!1});return D&&t.size===l}function Q(t,e){if(!(this instanceof Q))return new Q(t,e);if(this._value=t,this.size=void 0===e?1/0:Math.max(0,e),0===this.size){if(Su)return Su;Su=this}}function $(t,e){if(!t)throw new Error(e)}function Z(t,e,u){if(!(this instanceof Z))return new Z(t,e,u);if($(0!==u,"Cannot step a Range by 0"),t=t||0,void 0===e&&(e=1/0),u=void 0===u?1:Math.abs(u),e<t&&(u=-u),this._start=t,this._end=e,this._step=u,this.size=Math.max(0,Math.ceil((e-t)/u-1)+1),0===this.size){if(wu)return wu;wu=this}}function tt(){throw TypeError("Abstract")}function et(){}function ut(){}function rt(){}function nt(t){return t>>>1&1073741824|3221225471&t}function it(t){if(!1===t||null===t||void 0===t)return 0;if("function"==typeof t.valueOf&&(!1===(t=t.valueOf())||null===t||void 0===t))return 0;if(!0===t)return 1;var e=typeof t;if("number"===e){if(t!==t||t===1/0)return 0;var u=0|t;for(u!==t&&(u^=4294967295*t);t>4294967295;)t/=4294967295,u^=t;return nt(u)}if("string"===e)return t.length>Ru?ot(t):at(t);if("function"==typeof t.hashCode)return t.hashCode();if("object"===e)return st(t);if("function"==typeof t.toString)return at(t.toString());throw new Error("Value type "+e+" cannot be hashed.")}function ot(t){var e=Pu[t];return void 0===e&&(e=at(t),ju===ku&&(ju=0,Pu={}),ju++,Pu[t]=e),e}function at(t){for(var e=0,u=0;u<t.length;u++)e=31*e+t.charCodeAt(u)|0;return nt(e)}function st(t){var e;if(Mu&&void 0!==(e=bu.get(t)))return e;if(void 0!==(e=t[Ou]))return e;if(!Lu){if(void 0!==(e=t.propertyIsEnumerable&&t.propertyIsEnumerable[Ou]))return e;if(void 0!==(e=ft(t)))return e}if(e=++zu,1073741824&zu&&(zu=0),Mu)bu.set(t,e);else{if(void 0!==xu&&!1===xu(t))throw new Error("Non-extensible objects are not allowed as keys.");if(Lu)Object.defineProperty(t,Ou,{enumerable:!1,configurable:!1,writable:!1,value:e});else if(void 0!==t.propertyIsEnumerable&&t.propertyIsEnumerable===t.constructor.prototype.propertyIsEnumerable)t.propertyIsEnumerable=function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments)},t.propertyIsEnumerable[Ou]=e;else{if(void 0===t.nodeType)throw new Error("Unable to set a non-enumerable property on object.");t[Ou]=e}}return e}function ft(t){if(t&&t.nodeType>0)switch(t.nodeType){case 1:return t.uniqueID;case 9:return t.documentElement&&t.documentElement.uniqueID}}function ct(t){$(t!==1/0,"Cannot perform this action with an infinite size.")}function Dt(t){return null===t||void 0===t?yt():lt(t)&&!f(t)?t:yt().withMutations(function(e){var r=u(t);ct(r.size),r.forEach(function(t,u){return e.set(u,t)})})}function lt(t){return!(!t||!t[Tu])}function ht(t,e){this.ownerID=t,this.entries=e}function pt(t,e,u){this.ownerID=t,this.bitmap=e,this.nodes=u}function dt(t,e,u){this.ownerID=t,this.count=e,this.nodes=u}function _t(t,e,u){this.ownerID=t,this.keyHash=e,this.entries=u}function vt(t,e,u){this.ownerID=t,this.keyHash=e,this.entry=u}function Ft(t,e,u){this._type=e,this._reverse=u,this._stack=t._root&&Ct(t._root)}function Et(t,e){return y(t,e[0],e[1])}function Ct(t,e){return{node:t,index:0,__prev:e}}function At(t,e,u,r){var n=Object.create(qu);return n.size=t,n._root=e,n.__ownerID=u,n.__hash=r,n.__altered=!1,n}function yt(){return Nu||(Nu=At(0))}function Bt(t,e,u){var r,n;if(t._root){var i=c(_u),o=c(vu);if(r=gt(t._root,t.__ownerID,0,void 0,e,u,i,o),!o.value)return t;n=t.size+(i.value?u===du?-1:1:0)}else{if(u===du)return t;n=1,r=new ht(t.__ownerID,[[e,u]])}return t.__ownerID?(t.size=n,t._root=r,t.__hash=void 0,t.__altered=!0,t):r?At(n,r):yt()}function gt(t,e,u,r,n,i,o,a){return t?t.update(e,u,r,n,i,o,a):i===du?t:(D(a),D(o),new vt(e,r,[n,i]))}function mt(t){return t.constructor===vt||t.constructor===_t}function St(t,e,u,r,n){if(t.keyHash===r)return new _t(e,r,[t.entry,n]);var i,o=(0===u?t.keyHash:t.keyHash>>>u)&pu,a=(0===u?r:r>>>u)&pu;return new pt(e,1<<o|1<<a,o===a?[St(t,e,u+lu,r,n)]:(i=new vt(e,r,n),o<a?[t,i]:[i,t]))}function wt(t,e,u,r){t||(t=new l);for(var n=new vt(t,it(u),[u,r]),i=0;i<e.length;i++){var o=e[i];n=n.update(t,0,void 0,o[0],o[1])}return n}function bt(t,e,u,r){for(var n=0,i=0,o=new Array(u),a=0,s=1,f=e.length;a<f;a++,s<<=1){var c=e[a];void 0!==c&&a!==r&&(n|=s,o[i++]=c)}return new pt(t,n,o)}function It(t,e,u,r,n){for(var i=0,o=new Array(hu),a=0;0!==u;a++,u>>>=1)o[a]=1&u?e[i++]:void 0;return o[r]=n,new dt(t,i+1,o)}function xt(t,e,r){for(var n=[],o=0;o<r.length;o++){var a=r[o],s=u(a);i(a)||(s=s.map(function(t){return J(t)})),n.push(s)}return zt(t,e,n)}function Lt(t,e,u){return t&&t.mergeDeep&&i(e)?t.mergeDeep(e):V(t,e)?t:e}function Mt(t){return function(e,u,r){if(e&&e.mergeDeepWith&&i(u))return e.mergeDeepWith(t,u);var n=t(e,u,r);return V(e,n)?e:n}}function zt(t,e,u){return u=u.filter(function(t){return 0!==t.size}),0===u.length?t:0!==t.size||t.__ownerID||1!==u.length?t.withMutations(function(t){for(var r=e?function(u,r){t.update(r,du,function(t){return t===du?u:e(t,u,r)})}:function(e,u){t.set(u,e)},n=0;n<u.length;n++)u[n].forEach(r)}):t.constructor(u[0])}function Ot(t,e,u,r){var n=t===du,i=e.next();if(i.done){var o=n?u:t,a=r(o);return a===o?t:a}$(n||t&&t.set,"invalid keyPath");var s=i.value,f=n?du:t.get(s,du),c=Ot(f,e,u,r);return c===f?t:c===du?t.remove(s):(n?yt():t).set(s,c)}function Rt(t){return t-=t>>1&1431655765,t=(858993459&t)+(t>>2&858993459),t=t+(t>>4)&252645135,t+=t>>8,127&(t+=t>>16)}function kt(t,e,u,r){var n=r?t:h(t);return n[e]=u,n}function jt(t,e,u,r){var n=t.length+1;if(r&&e+1===n)return t[e]=u,t;for(var i=new Array(n),o=0,a=0;a<n;a++)a===e?(i[a]=u,o=-1):i[a]=t[a+o];return i}function Pt(t,e,u){var r=t.length-1;if(u&&e===r)return t.pop(),t;for(var n=new Array(r),i=0,o=0;o<r;o++)o===e&&(i=1),n[o]=t[o+i];return n}function Tt(t){var e=Kt();if(null===t||void 0===t)return e;if(qt(t))return t;var u=r(t),n=u.size;return 0===n?e:(ct(n),n>0&&n<hu?Wt(0,n,lu,null,new Nt(u.toArray())):e.withMutations(function(t){t.setSize(n),u.forEach(function(e,u){return t.set(u,e)})}))}function qt(t){return!(!t||!t[Ju])}function Nt(t,e){this.array=t,this.ownerID=e}function Ut(t,e){function u(t,e,u){return 0===e?r(t,u):n(t,e,u)}function r(t,u){var r=u===a?s&&s.array:t&&t.array,n=u>i?0:i-u,f=o-u;return f>hu&&(f=hu),function(){if(n===f)return Gu;var t=e?--f:n++;return r&&r[t]}}function n(t,r,n){var a,s=t&&t.array,f=n>i?0:i-n>>r,c=1+(o-n>>r);return c>hu&&(c=hu),function(){for(;;){if(a){var t=a();if(t!==Gu)return t;a=null}if(f===c)return Gu;var i=e?--c:f++;a=u(s&&s[i],r-lu,n+(i<<r))}}}var i=t._origin,o=t._capacity,a=Qt(o),s=t._tail;return u(t._root,t._level,0)}function Wt(t,e,u,r,n,i,o){var a=Object.create(Hu);return a.size=e-t,a._origin=t,a._capacity=e,a._level=u,a._root=r,a._tail=n,a.__ownerID=i,a.__hash=o,a.__altered=!1,a}function Kt(){return Xu||(Xu=Wt(0,0,lu))}function Jt(t,e,u){if((e=d(t,e))!==e)return t;if(e>=t.size||e<0)return t.withMutations(function(t){e<0?Vt(t,e).set(0,u):Vt(t,0,e+1).set(e,u)});e+=t._origin;var r=t._tail,n=t._root,i=c(vu);return e>=Qt(t._capacity)?r=Ht(r,t.__ownerID,0,e,u,i):n=Ht(n,t.__ownerID,t._level,e,u,i),i.value?t.__ownerID?(t._root=n,t._tail=r,t.__hash=void 0,t.__altered=!0,t):Wt(t._origin,t._capacity,t._level,n,r):t}function Ht(t,e,u,r,n,i){var o=r>>>u&pu,a=t&&o<t.array.length;if(!a&&void 0===n)return t;var s;if(u>0){var f=t&&t.array[o],c=Ht(f,e,u-lu,r,n,i);return c===f?t:(s=Xt(t,e),s.array[o]=c,s)}return a&&t.array[o]===n?t:(D(i),s=Xt(t,e),void 0===n&&o===s.array.length-1?s.array.pop():s.array[o]=n,s)}function Xt(t,e){return e&&t&&e===t.ownerID?t:new Nt(t?t.array.slice():[],e)}function Gt(t,e){if(e>=Qt(t._capacity))return t._tail;if(e<1<<t._level+lu){for(var u=t._root,r=t._level;u&&r>0;)u=u.array[e>>>r&pu],r-=lu;return u}}function Vt(t,e,u){void 0!==e&&(e|=0),void 0!==u&&(u|=0);var r=t.__ownerID||new l,n=t._origin,i=t._capacity,o=n+e,a=void 0===u?i:u<0?i+u:n+u;if(o===n&&a===i)return t;if(o>=a)return t.clear();for(var s=t._level,f=t._root,c=0;o+c<0;)f=new Nt(f&&f.array.length?[void 0,f]:[],r),s+=lu,c+=1<<s;c&&(o+=c,n+=c,a+=c,i+=c);for(var D=Qt(i),h=Qt(a);h>=1<<s+lu;)f=new Nt(f&&f.array.length?[f]:[],r),s+=lu;var p=t._tail,d=h<D?Gt(t,a-1):h>D?new Nt([],r):p;if(p&&h>D&&o<i&&p.array.length){f=Xt(f,r);for(var _=f,v=s;v>lu;v-=lu){var F=D>>>v&pu;_=_.array[F]=Xt(_.array[F],r)}_.array[D>>>lu&pu]=p}if(a<i&&(d=d&&d.removeAfter(r,0,a)),o>=h)o-=h,a-=h,s=lu,f=null,d=d&&d.removeBefore(r,0,o);else if(o>n||h<D){for(c=0;f;){var E=o>>>s&pu;if(E!==h>>>s&pu)break;E&&(c+=(1<<s)*E),s-=lu,f=f.array[E]}f&&o>n&&(f=f.removeBefore(r,s,o-c)),f&&h<D&&(f=f.removeAfter(r,s,h-c)),c&&(o-=c,a-=c)}return t.__ownerID?(t.size=a-o,t._origin=o,t._capacity=a,t._level=s,t._root=f,t._tail=d,t.__hash=void 0,t.__altered=!0,t):Wt(o,a,s,f,d)}function Yt(t,e,u){for(var n=[],o=0,a=0;a<u.length;a++){var s=u[a],f=r(s);f.size>o&&(o=f.size),i(s)||(f=f.map(function(t){return J(t)})),n.push(f)}return o>t.size&&(t=t.setSize(o)),zt(t,e,n)}function Qt(t){return t<hu?0:t-1>>>lu<<lu}function $t(t){return null===t||void 0===t?ee():Zt(t)?t:ee().withMutations(function(e){var r=u(t);ct(r.size),r.forEach(function(t,u){return e.set(u,t)})})}function Zt(t){return lt(t)&&f(t)}function te(t,e,u,r){var n=Object.create($t.prototype);return n.size=t?t.size:0,n._map=t,n._list=e,n.__ownerID=u,n.__hash=r,n}function ee(){return Vu||(Vu=te(yt(),Kt()))}function ue(t,e,u){var r,n,i=t._map,o=t._list,a=i.get(e),s=void 0!==a;if(u===du){if(!s)return t;o.size>=hu&&o.size>=2*i.size?(n=o.filter(function(t,e){return void 0!==t&&a!==e}),r=n.toKeyedSeq().map(function(t){return t[0]}).flip().toMap(),t.__ownerID&&(r.__ownerID=n.__ownerID=t.__ownerID)):(r=i.remove(e),n=a===o.size-1?o.pop():o.set(a,void 0))}else if(s){if(u===o.get(a)[1])return t;r=i,n=o.set(a,[e,u])}else r=i.set(e,o.size),n=o.set(o.size,[e,u]);return t.__ownerID?(t.size=r.size,t._map=r,t._list=n,t.__hash=void 0,t):te(r,n)}function re(t,e){this._iter=t,this._useKeys=e,this.size=t.size}function ne(t){this._iter=t,this.size=t.size}function ie(t){this._iter=t,this.size=t.size}function oe(t){this._iter=t,this.size=t.size}function ae(t){var e=be(t);return e._iter=t,e.size=t.size,e.flip=function(){return t},e.reverse=function(){var e=t.reverse.apply(this);return e.flip=function(){return t.reverse()},e},e.has=function(e){return t.includes(e)},e.includes=function(e){return t.has(e)},e.cacheResult=Ie,e.__iterateUncached=function(e,u){var r=this;return t.__iterate(function(t,u){return!1!==e(u,t,r)},u)},e.__iteratorUncached=function(e,u){if(e===Cu){var r=t.__iterator(e,u);return new A(function(){var t=r.next();if(!t.done){var e=t.value[0];t.value[0]=t.value[1],t.value[1]=e}return t})}return t.__iterator(e===Eu?Fu:Eu,u)},e}function se(t,e,u){var r=be(t);return r.size=t.size,r.has=function(e){return t.has(e)},r.get=function(r,n){var i=t.get(r,du);return i===du?n:e.call(u,i,r,t)},r.__iterateUncached=function(r,n){var i=this;return t.__iterate(function(t,n,o){return!1!==r(e.call(u,t,n,o),n,i)},n)},r.__iteratorUncached=function(r,n){var i=t.__iterator(Cu,n);return new A(function(){var n=i.next();if(n.done)return n;var o=n.value,a=o[0];return y(r,a,e.call(u,o[1],a,t),n)})},r}function fe(t,e){var u=be(t);return u._iter=t,u.size=t.size,u.reverse=function(){return t},t.flip&&(u.flip=function(){var e=ae(t);return e.reverse=function(){return t.flip()},e}),u.get=function(u,r){return t.get(e?u:-1-u,r)},u.has=function(u){return t.has(e?u:-1-u)},u.includes=function(e){return t.includes(e)},u.cacheResult=Ie,u.__iterate=function(e,u){var r=this;return t.__iterate(function(t,u){return e(t,u,r)},!u)},u.__iterator=function(e,u){return t.__iterator(e,!u)},u}function ce(t,e,u,r){var n=be(t);return r&&(n.has=function(r){var n=t.get(r,du);return n!==du&&!!e.call(u,n,r,t)},n.get=function(r,n){var i=t.get(r,du);return i!==du&&e.call(u,i,r,t)?i:n}),n.__iterateUncached=function(n,i){var o=this,a=0;return t.__iterate(function(t,i,s){if(e.call(u,t,i,s))return a++,n(t,r?i:a-1,o)},i),a},n.__iteratorUncached=function(n,i){var o=t.__iterator(Cu,i),a=0;return new A(function(){for(;;){var i=o.next();if(i.done)return i;var s=i.value,f=s[0],c=s[1];if(e.call(u,c,f,t))return y(n,r?f:a++,c,i)}})},n}function De(t,e,u){var r=Dt().asMutable();return t.__iterate(function(n,i){r.update(e.call(u,n,i,t),0,function(t){return t+1})}),r.asImmutable()}function le(t,e,u){var r=o(t),n=(f(t)?$t():Dt()).asMutable();t.__iterate(function(i,o){n.update(e.call(u,i,o,t),function(t){return t=t||[],t.push(r?[o,i]:i),t})});var i=we(t);return n.map(function(e){return ge(t,i(e))})}function he(t,e,u,r){var n=t.size;if(void 0!==e&&(e|=0),void 0!==u&&(u===1/0?u=n:u|=0),v(e,u,n))return t;var i=F(e,n),o=E(u,n);if(i!==i||o!==o)return he(t.toSeq().cacheResult(),e,u,r);var a,s=o-i;s===s&&(a=s<0?0:s);var f=be(t);return f.size=0===a?a:t.size&&a||void 0,!r&&j(t)&&a>=0&&(f.get=function(e,u){return e=d(this,e),e>=0&&e<a?t.get(e+i,u):u}),f.__iterateUncached=function(e,u){var n=this;if(0===a)return 0;if(u)return this.cacheResult().__iterate(e,u);var o=0,s=!0,f=0;return t.__iterate(function(t,u){if(!s||!(s=o++<i))return f++,!1!==e(t,r?u:f-1,n)&&f!==a}),f},f.__iteratorUncached=function(e,u){if(0!==a&&u)return this.cacheResult().__iterator(e,u);var n=0!==a&&t.__iterator(e,u),o=0,s=0;return new A(function(){for(;o++<i;)n.next();if(++s>a)return B();var t=n.next();return r||e===Eu?t:e===Fu?y(e,s-1,void 0,t):y(e,s-1,t.value[1],t)})},f}function pe(t,e,u){var r=be(t);return r.__iterateUncached=function(r,n){var i=this;if(n)return this.cacheResult().__iterate(r,n);var o=0;return t.__iterate(function(t,n,a){return e.call(u,t,n,a)&&++o&&r(t,n,i)}),o},r.__iteratorUncached=function(r,n){var i=this;if(n)return this.cacheResult().__iterator(r,n);var o=t.__iterator(Cu,n),a=!0;return new A(function(){if(!a)return B();var t=o.next();if(t.done)return t;var n=t.value,s=n[0],f=n[1];return e.call(u,f,s,i)?r===Cu?t:y(r,s,f,t):(a=!1,B())})},r}function de(t,e,u,r){var n=be(t);return n.__iterateUncached=function(n,i){var o=this;if(i)return this.cacheResult().__iterate(n,i);var a=!0,s=0;return t.__iterate(function(t,i,f){if(!a||!(a=e.call(u,t,i,f)))return s++,n(t,r?i:s-1,o)}),s},n.__iteratorUncached=function(n,i){var o=this;if(i)return this.cacheResult().__iterator(n,i);var a=t.__iterator(Cu,i),s=!0,f=0;return new A(function(){var t,i,c;do{if(t=a.next(),t.done)return r||n===Eu?t:n===Fu?y(n,f++,void 0,t):y(n,f++,t.value[1],t);var D=t.value;i=D[0],c=D[1],s&&(s=e.call(u,c,i,o))}while(s);return n===Cu?t:y(n,i,c,t)})},n}function _e(t,e){var r=o(t),n=[t].concat(e).map(function(t){return i(t)?r&&(t=u(t)):t=r?T(t):q(Array.isArray(t)?t:[t]),t}).filter(function(t){return 0!==t.size});if(0===n.length)return t;if(1===n.length){var s=n[0];if(s===t||r&&o(s)||a(t)&&a(s))return s}var f=new z(n);return r?f=f.toKeyedSeq():a(t)||(f=f.toSetSeq()),f=f.flatten(!0),f.size=n.reduce(function(t,e){if(void 0!==t){var u=e.size;if(void 0!==u)return t+u}},0),f}function ve(t,e,u){var r=be(t);return r.__iterateUncached=function(r,n){function o(t,f){var c=this;t.__iterate(function(t,n){return(!e||f<e)&&i(t)?o(t,f+1):!1===r(t,u?n:a++,c)&&(s=!0),!s},n)}var a=0,s=!1;return o(t,0),a},r.__iteratorUncached=function(r,n){var o=t.__iterator(r,n),a=[],s=0;return new A(function(){for(;o;){var t=o.next();if(!1===t.done){var f=t.value;if(r===Cu&&(f=f[1]),e&&!(a.length<e)||!i(f))return u?t:y(r,s++,f,t);a.push(o),o=f.__iterator(r,n)}else o=a.pop()}return B()})},r}function Fe(t,e,u){var r=we(t);return t.toSeq().map(function(n,i){return r(e.call(u,n,i,t))}).flatten(!0)}function Ee(t,e){var u=be(t);return u.size=t.size&&2*t.size-1,u.__iterateUncached=function(u,r){var n=this,i=0;return t.__iterate(function(t,r){return(!i||!1!==u(e,i++,n))&&!1!==u(t,i++,n)},r),i},u.__iteratorUncached=function(u,r){var n,i=t.__iterator(Eu,r),o=0;return new A(function(){return(!n||o%2)&&(n=i.next(),n.done)?n:o%2?y(u,o++,e):y(u,o++,n.value,n)})},u}function Ce(t,e,u){e||(e=xe);var r=o(t),n=0,i=t.toSeq().map(function(e,r){return[r,e,n++,u?u(e,r,t):e]}).toArray();return i.sort(function(t,u){return e(t[3],u[3])||t[2]-u[2]}).forEach(r?function(t,e){i[e].length=2}:function(t,e){i[e]=t[1]}),r?x(i):a(t)?L(i):M(i)}function Ae(t,e,u){if(e||(e=xe),u){var r=t.toSeq().map(function(e,r){return[e,u(e,r,t)]}).reduce(function(t,u){return ye(e,t[1],u[1])?u:t});return r&&r[0]}return t.reduce(function(t,u){return ye(e,t,u)?u:t})}function ye(t,e,u){var r=t(u,e);return 0===r&&u!==e&&(void 0===u||null===u||u!==u)||r>0}function Be(t,u,r){var n=be(t);return n.size=new z(r).map(function(t){return t.size}).min(),n.__iterate=function(t,e){for(var u,r=this.__iterator(Eu,e),n=0;!(u=r.next()).done&&!1!==t(u.value,n++,this););return n},n.__iteratorUncached=function(t,n){var i=r.map(function(t){return t=e(t),S(n?t.reverse():t)}),o=0,a=!1;return new A(function(){var e;return a||(e=i.map(function(t){return t.next()}),a=e.some(function(t){return t.done})),a?B():y(t,o++,u.apply(null,e.map(function(t){return t.value})))})},n}function ge(t,e){return j(t)?e:t.constructor(e)}function me(t){if(t!==Object(t))throw new TypeError("Expected [K, V] tuple: "+t)}function Se(t){return ct(t.size),p(t)}function we(t){return o(t)?u:a(t)?r:n}function be(t){return Object.create((o(t)?x:a(t)?L:M).prototype)}function Ie(){return this._iter.cacheResult?(this._iter.cacheResult(),this.size=this._iter.size,this):I.prototype.cacheResult.call(this)}function xe(t,e){return t>e?1:t<e?-1:0}function Le(t){var u=S(t);if(!u){if(!b(t))throw new TypeError("Expected iterable or array-like: "+t);u=S(e(t))}return u}function Me(t,e){var u,r=function(i){if(i instanceof r)return i;if(!(this instanceof r))return new r(i);if(!u){u=!0;var o=Object.keys(t);Re(n,o),n.size=o.length,n._name=e,n._keys=o,n._defaultValues=t}this._map=Dt(i)},n=r.prototype=Object.create(Yu);return n.constructor=r,r}function ze(t,e,u){var r=Object.create(Object.getPrototypeOf(t));return r._map=e,r.__ownerID=u,r}function Oe(t){return t._name||t.constructor.name||"Record"}function Re(t,e){try{e.forEach(ke.bind(void 0,t))}catch(t){}}function ke(t,e){Object.defineProperty(t,e,{get:function(){return this.get(e)},set:function(t){$(this.__ownerID,"Cannot set on an immutable record."),this.set(e,t)}})}function je(t){return null===t||void 0===t?Ne():Pe(t)&&!f(t)?t:Ne().withMutations(function(e){var u=n(t);ct(u.size),u.forEach(function(t){return e.add(t)})})}function Pe(t){return!(!t||!t[Qu])}function Te(t,e){return t.__ownerID?(t.size=e.size,t._map=e,t):e===t._map?t:0===e.size?t.__empty():t.__make(e)}function qe(t,e){var u=Object.create($u);return u.size=t?t.size:0,u._map=t,u.__ownerID=e,u}function Ne(){return Zu||(Zu=qe(yt()))}function Ue(t){return null===t||void 0===t?Je():We(t)?t:Je().withMutations(function(e){var u=n(t);ct(u.size),u.forEach(function(t){return e.add(t)})})}function We(t){return Pe(t)&&f(t)}function Ke(t,e){var u=Object.create(tr);return u.size=t?t.size:0,u._map=t,u.__ownerID=e,u}function Je(){return er||(er=Ke(ee()))}function He(t){return null===t||void 0===t?Ve():Xe(t)?t:Ve().unshiftAll(t)}function Xe(t){return!(!t||!t[ur])}function Ge(t,e,u,r){var n=Object.create(rr);return n.size=t,n._head=e,n.__ownerID=u,n.__hash=r,n.__altered=!1,n}function Ve(){return nr||(nr=Ge(0))}function Ye(t,e){var u=function(u){t.prototype[u]=e[u]};return Object.keys(e).forEach(u),Object.getOwnPropertySymbols&&Object.getOwnPropertySymbols(e).forEach(u),t}function Qe(t,e){return e}function $e(t,e){return[e,t]}function Ze(t){return function(){return!t.apply(this,arguments)}}function tu(t){return function(){return-t.apply(this,arguments)}}function eu(t){return"string"==typeof t?JSON.stringify(t):String(t)}function uu(){return h(arguments)}function ru(t,e){return t<e?1:t>e?-1:0}function nu(t){if(t.size===1/0)return 0;var e=f(t),u=o(t),r=e?1:0;return iu(t.__iterate(u?e?function(t,e){r=31*r+ou(it(t),it(e))|0}:function(t,e){r=r+ou(it(t),it(e))|0}:e?function(t){r=31*r+it(t)|0}:function(t){r=r+it(t)|0}),r)}function iu(t,e){return e=Iu(e,3432918353),e=Iu(e<<15|e>>>-15,461845907),e=Iu(e<<13|e>>>-13,5),e=(e+3864292196|0)^t,e=Iu(e^e>>>16,2246822507),e=Iu(e^e>>>13,3266489909),e=nt(e^e>>>16)}function ou(t,e){return t^e+2654435769+(t<<6)+(t>>2)|0}var au=Array.prototype.slice;t(u,e),t(r,e),t(n,e),e.isIterable=i,e.isKeyed=o,e.isIndexed=a,e.isAssociative=s,e.isOrdered=f,e.Keyed=u,e.Indexed=r,e.Set=n;var su="@@__IMMUTABLE_ITERABLE__@@",fu="@@__IMMUTABLE_KEYED__@@",cu="@@__IMMUTABLE_INDEXED__@@",Du="@@__IMMUTABLE_ORDERED__@@",lu=5,hu=1<<lu,pu=hu-1,du={},_u={value:!1},vu={value:!1},Fu=0,Eu=1,Cu=2,Au="function"==typeof Symbol&&Symbol.iterator,yu="@@iterator",Bu=Au||yu;A.prototype.toString=function(){return"[Iterator]"},A.KEYS=Fu,A.VALUES=Eu,A.ENTRIES=Cu,A.prototype.inspect=A.prototype.toSource=function(){return this.toString()},A.prototype[Bu]=function(){return this},t(I,e),I.of=function(){return I(arguments)},I.prototype.toSeq=function(){return this},I.prototype.toString=function(){return this.__toString("Seq {","}")},I.prototype.cacheResult=function(){return!this._cache&&this.__iterateUncached&&(this._cache=this.entrySeq().toArray(),this.size=this._cache.length),this},I.prototype.__iterate=function(t,e){return W(this,t,e,!0)},I.prototype.__iterator=function(t,e){return K(this,t,e,!0)},t(x,I),x.prototype.toKeyedSeq=function(){return this},t(L,I),L.of=function(){return L(arguments)},L.prototype.toIndexedSeq=function(){return this},L.prototype.toString=function(){return this.__toString("Seq [","]")},L.prototype.__iterate=function(t,e){return W(this,t,e,!1)},L.prototype.__iterator=function(t,e){return K(this,t,e,!1)},t(M,I),M.of=function(){return M(arguments)},M.prototype.toSetSeq=function(){return this},I.isSeq=j,I.Keyed=x,I.Set=M,I.Indexed=L;var gu="@@__IMMUTABLE_SEQ__@@";I.prototype[gu]=!0,t(z,L),z.prototype.get=function(t,e){return this.has(t)?this._array[d(this,t)]:e},z.prototype.__iterate=function(t,e){for(var u=this._array,r=u.length-1,n=0;n<=r;n++)if(!1===t(u[e?r-n:n],n,this))return n+1;return n},z.prototype.__iterator=function(t,e){var u=this._array,r=u.length-1,n=0;return new A(function(){return n>r?B():y(t,n,u[e?r-n++:n++])})},t(O,x),O.prototype.get=function(t,e){return void 0===e||this.has(t)?this._object[t]:e},O.prototype.has=function(t){return this._object.hasOwnProperty(t)},O.prototype.__iterate=function(t,e){for(var u=this._object,r=this._keys,n=r.length-1,i=0;i<=n;i++){var o=r[e?n-i:i];if(!1===t(u[o],o,this))return i+1}return i},O.prototype.__iterator=function(t,e){var u=this._object,r=this._keys,n=r.length-1,i=0;return new A(function(){var o=r[e?n-i:i];return i++>n?B():y(t,o,u[o])})},O.prototype[Du]=!0,t(R,L),R.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);var u=this._iterable,r=S(u),n=0;if(m(r))for(var i;!(i=r.next()).done&&!1!==t(i.value,n++,this););return n},R.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var u=this._iterable,r=S(u);if(!m(r))return new A(B);var n=0;return new A(function(){var e=r.next();return e.done?e:y(t,n++,e.value)})},t(k,L),k.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);for(var u=this._iterator,r=this._iteratorCache,n=0;n<r.length;)if(!1===t(r[n],n++,this))return n;for(var i;!(i=u.next()).done;){var o=i.value;if(r[n]=o,!1===t(o,n++,this))break}return n},k.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var u=this._iterator,r=this._iteratorCache,n=0;return new A(function(){if(n>=r.length){var e=u.next();if(e.done)return e;r[n]=e.value}return y(t,n,r[n++])})};var mu;t(Q,L),Q.prototype.toString=function(){return 0===this.size?"Repeat []":"Repeat [ "+this._value+" "+this.size+" times ]"},Q.prototype.get=function(t,e){return this.has(t)?this._value:e},Q.prototype.includes=function(t){return V(this._value,t)},Q.prototype.slice=function(t,e){var u=this.size;return v(t,e,u)?this:new Q(this._value,E(e,u)-F(t,u))},Q.prototype.reverse=function(){return this},Q.prototype.indexOf=function(t){return V(this._value,t)?0:-1},Q.prototype.lastIndexOf=function(t){return V(this._value,t)?this.size:-1},Q.prototype.__iterate=function(t,e){for(var u=0;u<this.size;u++)if(!1===t(this._value,u,this))return u+1;return u},Q.prototype.__iterator=function(t,e){var u=this,r=0;return new A(function(){return r<u.size?y(t,r++,u._value):B()})},Q.prototype.equals=function(t){return t instanceof Q?V(this._value,t._value):Y(t)};var Su;t(Z,L),Z.prototype.toString=function(){return 0===this.size?"Range []":"Range [ "+this._start+"..."+this._end+(1!==this._step?" by "+this._step:"")+" ]"},Z.prototype.get=function(t,e){return this.has(t)?this._start+d(this,t)*this._step:e},Z.prototype.includes=function(t){var e=(t-this._start)/this._step;return e>=0&&e<this.size&&e===Math.floor(e)},Z.prototype.slice=function(t,e){return v(t,e,this.size)?this:(t=F(t,this.size),e=E(e,this.size),e<=t?new Z(0,0):new Z(this.get(t,this._end),this.get(e,this._end),this._step))},Z.prototype.indexOf=function(t){var e=t-this._start;if(e%this._step==0){var u=e/this._step;if(u>=0&&u<this.size)return u}return-1},Z.prototype.lastIndexOf=function(t){return this.indexOf(t)},Z.prototype.__iterate=function(t,e){for(var u=this.size-1,r=this._step,n=e?this._start+u*r:this._start,i=0;i<=u;i++){if(!1===t(n,i,this))return i+1;n+=e?-r:r}return i},Z.prototype.__iterator=function(t,e){var u=this.size-1,r=this._step,n=e?this._start+u*r:this._start,i=0;return new A(function(){var o=n;return n+=e?-r:r,i>u?B():y(t,i++,o)})},Z.prototype.equals=function(t){return t instanceof Z?this._start===t._start&&this._end===t._end&&this._step===t._step:Y(this,t)};var wu;t(tt,e),t(et,tt),t(ut,tt),t(rt,tt),tt.Keyed=et,tt.Indexed=ut,tt.Set=rt;var bu,Iu="function"==typeof Math.imul&&-2===Math.imul(4294967295,2)?Math.imul:function(t,e){t|=0,e|=0;var u=65535&t,r=65535&e;return u*r+((t>>>16)*r+u*(e>>>16)<<16>>>0)|0},xu=Object.isExtensible,Lu=function(){try{return Object.defineProperty({},"@",{}),!0}catch(t){return!1}}(),Mu="function"==typeof WeakMap;Mu&&(bu=new WeakMap);var zu=0,Ou="__immutablehash__";"function"==typeof Symbol&&(Ou=Symbol(Ou));var Ru=16,ku=255,ju=0,Pu={};t(Dt,et),Dt.of=function(){var t=au.call(arguments,0);return yt().withMutations(function(e){for(var u=0;u<t.length;u+=2){if(u+1>=t.length)throw new Error("Missing value for key: "+t[u]);e.set(t[u],t[u+1])}})},Dt.prototype.toString=function(){return this.__toString("Map {","}")},Dt.prototype.get=function(t,e){return this._root?this._root.get(0,void 0,t,e):e},Dt.prototype.set=function(t,e){return Bt(this,t,e)},Dt.prototype.setIn=function(t,e){return this.updateIn(t,du,function(){return e})},Dt.prototype.remove=function(t){return Bt(this,t,du)},Dt.prototype.deleteIn=function(t){return this.updateIn(t,function(){return du})},Dt.prototype.update=function(t,e,u){return 1===arguments.length?t(this):this.updateIn([t],e,u)},Dt.prototype.updateIn=function(t,e,u){u||(u=e,e=void 0);var r=Ot(this,Le(t),e,u);return r===du?void 0:r},Dt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._root=null,this.__hash=void 0,this.__altered=!0,this):yt()},Dt.prototype.merge=function(){return xt(this,void 0,arguments)},Dt.prototype.mergeWith=function(t){return xt(this,t,au.call(arguments,1))},Dt.prototype.mergeIn=function(t){var e=au.call(arguments,1);return this.updateIn(t,yt(),function(t){return"function"==typeof t.merge?t.merge.apply(t,e):e[e.length-1]})},Dt.prototype.mergeDeep=function(){return xt(this,Lt,arguments)},Dt.prototype.mergeDeepWith=function(t){var e=au.call(arguments,1);return xt(this,Mt(t),e)},Dt.prototype.mergeDeepIn=function(t){var e=au.call(arguments,1);return this.updateIn(t,yt(),function(t){return"function"==typeof t.mergeDeep?t.mergeDeep.apply(t,e):e[e.length-1]})},Dt.prototype.sort=function(t){return $t(Ce(this,t))},Dt.prototype.sortBy=function(t,e){return $t(Ce(this,e,t))},Dt.prototype.withMutations=function(t){var e=this.asMutable();return t(e),e.wasAltered()?e.__ensureOwner(this.__ownerID):this},Dt.prototype.asMutable=function(){return this.__ownerID?this:this.__ensureOwner(new l)},Dt.prototype.asImmutable=function(){return this.__ensureOwner()},Dt.prototype.wasAltered=function(){return this.__altered},Dt.prototype.__iterator=function(t,e){return new Ft(this,t,e)},Dt.prototype.__iterate=function(t,e){var u=this,r=0;return this._root&&this._root.iterate(function(e){return r++,t(e[1],e[0],u)},e),r},Dt.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?At(this.size,this._root,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},Dt.isMap=lt;var Tu="@@__IMMUTABLE_MAP__@@",qu=Dt.prototype;qu[Tu]=!0,qu.delete=qu.remove,qu.removeIn=qu.deleteIn,ht.prototype.get=function(t,e,u,r){for(var n=this.entries,i=0,o=n.length;i<o;i++)if(V(u,n[i][0]))return n[i][1];return r},ht.prototype.update=function(t,e,u,r,n,i,o){for(var a=n===du,s=this.entries,f=0,c=s.length;f<c&&!V(r,s[f][0]);f++);var l=f<c;if(l?s[f][1]===n:a)return this;if(D(o),(a||!l)&&D(i),!a||1!==s.length){if(!l&&!a&&s.length>=Uu)return wt(t,s,r,n);var p=t&&t===this.ownerID,d=p?s:h(s);return l?a?f===c-1?d.pop():d[f]=d.pop():d[f]=[r,n]:d.push([r,n]),p?(this.entries=d,this):new ht(t,d)}},pt.prototype.get=function(t,e,u,r){void 0===e&&(e=it(u));var n=1<<((0===t?e:e>>>t)&pu),i=this.bitmap;return 0==(i&n)?r:this.nodes[Rt(i&n-1)].get(t+lu,e,u,r)},pt.prototype.update=function(t,e,u,r,n,i,o){void 0===u&&(u=it(r));var a=(0===e?u:u>>>e)&pu,s=1<<a,f=this.bitmap,c=0!=(f&s);if(!c&&n===du)return this;var D=Rt(f&s-1),l=this.nodes,h=c?l[D]:void 0,p=gt(h,t,e+lu,u,r,n,i,o);if(p===h)return this;if(!c&&p&&l.length>=Wu)return It(t,l,f,a,p);if(c&&!p&&2===l.length&&mt(l[1^D]))return l[1^D];if(c&&p&&1===l.length&&mt(p))return p;var d=t&&t===this.ownerID,_=c?p?f:f^s:f|s,v=c?p?kt(l,D,p,d):Pt(l,D,d):jt(l,D,p,d);return d?(this.bitmap=_,this.nodes=v,this):new pt(t,_,v)},dt.prototype.get=function(t,e,u,r){void 0===e&&(e=it(u));var n=(0===t?e:e>>>t)&pu,i=this.nodes[n];return i?i.get(t+lu,e,u,r):r},dt.prototype.update=function(t,e,u,r,n,i,o){void 0===u&&(u=it(r));var a=(0===e?u:u>>>e)&pu,s=n===du,f=this.nodes,c=f[a];if(s&&!c)return this;var D=gt(c,t,e+lu,u,r,n,i,o);if(D===c)return this;var l=this.count;if(c){if(!D&&--l<Ku)return bt(t,f,l,a)}else l++;var h=t&&t===this.ownerID,p=kt(f,a,D,h);return h?(this.count=l,this.nodes=p,this):new dt(t,l,p)},_t.prototype.get=function(t,e,u,r){for(var n=this.entries,i=0,o=n.length;i<o;i++)if(V(u,n[i][0]))return n[i][1];return r},_t.prototype.update=function(t,e,u,r,n,i,o){void 0===u&&(u=it(r));var a=n===du;if(u!==this.keyHash)return a?this:(D(o),D(i),St(this,t,e,u,[r,n]));for(var s=this.entries,f=0,c=s.length;f<c&&!V(r,s[f][0]);f++);var l=f<c;if(l?s[f][1]===n:a)return this;if(D(o),(a||!l)&&D(i),a&&2===c)return new vt(t,this.keyHash,s[1^f]);var p=t&&t===this.ownerID,d=p?s:h(s);return l?a?f===c-1?d.pop():d[f]=d.pop():d[f]=[r,n]:d.push([r,n]),p?(this.entries=d,this):new _t(t,this.keyHash,d)},vt.prototype.get=function(t,e,u,r){return V(u,this.entry[0])?this.entry[1]:r},vt.prototype.update=function(t,e,u,r,n,i,o){var a=n===du,s=V(r,this.entry[0]);return(s?n===this.entry[1]:a)?this:(D(o),a?void D(i):s?t&&t===this.ownerID?(this.entry[1]=n,this):new vt(t,this.keyHash,[r,n]):(D(i),St(this,t,e,it(r),[r,n])))},ht.prototype.iterate=_t.prototype.iterate=function(t,e){for(var u=this.entries,r=0,n=u.length-1;r<=n;r++)if(!1===t(u[e?n-r:r]))return!1},pt.prototype.iterate=dt.prototype.iterate=function(t,e){for(var u=this.nodes,r=0,n=u.length-1;r<=n;r++){var i=u[e?n-r:r];if(i&&!1===i.iterate(t,e))return!1}},vt.prototype.iterate=function(t,e){return t(this.entry)},t(Ft,A),Ft.prototype.next=function(){for(var t=this._type,e=this._stack;e;){var u,r=e.node,n=e.index++;if(r.entry){if(0===n)return Et(t,r.entry)}else if(r.entries){if(u=r.entries.length-1,n<=u)return Et(t,r.entries[this._reverse?u-n:n])}else if(u=r.nodes.length-1,n<=u){var i=r.nodes[this._reverse?u-n:n];if(i){if(i.entry)return Et(t,i.entry);e=this._stack=Ct(i,e)}continue}e=this._stack=this._stack.__prev}return B()};var Nu,Uu=hu/4,Wu=hu/2,Ku=hu/4;t(Tt,ut),Tt.of=function(){return this(arguments)},Tt.prototype.toString=function(){return this.__toString("List [","]")},Tt.prototype.get=function(t,e){if((t=d(this,t))>=0&&t<this.size){t+=this._origin;var u=Gt(this,t);return u&&u.array[t&pu]}return e},Tt.prototype.set=function(t,e){return Jt(this,t,e)},Tt.prototype.remove=function(t){return this.has(t)?0===t?this.shift():t===this.size-1?this.pop():this.splice(t,1):this},Tt.prototype.insert=function(t,e){return this.splice(t,0,e)},Tt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=this._origin=this._capacity=0,this._level=lu,this._root=this._tail=null,this.__hash=void 0,this.__altered=!0,this):Kt()},Tt.prototype.push=function(){var t=arguments,e=this.size;return this.withMutations(function(u){Vt(u,0,e+t.length);for(var r=0;r<t.length;r++)u.set(e+r,t[r])})},Tt.prototype.pop=function(){return Vt(this,0,-1)},Tt.prototype.unshift=function(){var t=arguments;return this.withMutations(function(e){Vt(e,-t.length);for(var u=0;u<t.length;u++)e.set(u,t[u])})},Tt.prototype.shift=function(){return Vt(this,1)},Tt.prototype.merge=function(){return Yt(this,void 0,arguments)},Tt.prototype.mergeWith=function(t){return Yt(this,t,au.call(arguments,1))},Tt.prototype.mergeDeep=function(){return Yt(this,Lt,arguments)},Tt.prototype.mergeDeepWith=function(t){var e=au.call(arguments,1);return Yt(this,Mt(t),e)},Tt.prototype.setSize=function(t){return Vt(this,0,t)},Tt.prototype.slice=function(t,e){var u=this.size;return v(t,e,u)?this:Vt(this,F(t,u),E(e,u))},Tt.prototype.__iterator=function(t,e){var u=0,r=Ut(this,e);return new A(function(){var e=r();return e===Gu?B():y(t,u++,e)})},Tt.prototype.__iterate=function(t,e){for(var u,r=0,n=Ut(this,e);(u=n())!==Gu&&!1!==t(u,r++,this););return r},Tt.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Wt(this._origin,this._capacity,this._level,this._root,this._tail,t,this.__hash):(this.__ownerID=t,this)},Tt.isList=qt;var Ju="@@__IMMUTABLE_LIST__@@",Hu=Tt.prototype;Hu[Ju]=!0,Hu.delete=Hu.remove,Hu.setIn=qu.setIn,Hu.deleteIn=Hu.removeIn=qu.removeIn,Hu.update=qu.update,Hu.updateIn=qu.updateIn,Hu.mergeIn=qu.mergeIn,Hu.mergeDeepIn=qu.mergeDeepIn,Hu.withMutations=qu.withMutations,Hu.asMutable=qu.asMutable,Hu.asImmutable=qu.asImmutable,Hu.wasAltered=qu.wasAltered,Nt.prototype.removeBefore=function(t,e,u){if(u===e?1<<e:0===this.array.length)return this;var r=u>>>e&pu;if(r>=this.array.length)return new Nt([],t);var n,i=0===r;if(e>0){var o=this.array[r];if((n=o&&o.removeBefore(t,e-lu,u))===o&&i)return this}if(i&&!n)return this;var a=Xt(this,t);if(!i)for(var s=0;s<r;s++)a.array[s]=void 0;return n&&(a.array[r]=n),a},Nt.prototype.removeAfter=function(t,e,u){if(u===(e?1<<e:0)||0===this.array.length)return this;var r=u-1>>>e&pu;if(r>=this.array.length)return this;var n;if(e>0){var i=this.array[r];if((n=i&&i.removeAfter(t,e-lu,u))===i&&r===this.array.length-1)return this}var o=Xt(this,t);return o.array.splice(r+1),n&&(o.array[r]=n),o};var Xu,Gu={};t($t,Dt),$t.of=function(){return this(arguments)},$t.prototype.toString=function(){return this.__toString("OrderedMap {","}")},$t.prototype.get=function(t,e){var u=this._map.get(t);return void 0!==u?this._list.get(u)[1]:e},$t.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._map.clear(),this._list.clear(),this):ee()},$t.prototype.set=function(t,e){return ue(this,t,e)},$t.prototype.remove=function(t){return ue(this,t,du)},$t.prototype.wasAltered=function(){return this._map.wasAltered()||this._list.wasAltered()},$t.prototype.__iterate=function(t,e){var u=this;return this._list.__iterate(function(e){return e&&t(e[1],e[0],u)},e)},$t.prototype.__iterator=function(t,e){return this._list.fromEntrySeq().__iterator(t,e)},$t.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t),u=this._list.__ensureOwner(t);return t?te(e,u,t,this.__hash):(this.__ownerID=t,this._map=e,this._list=u,this)},$t.isOrderedMap=Zt,$t.prototype[Du]=!0,$t.prototype.delete=$t.prototype.remove;var Vu;t(re,x),re.prototype.get=function(t,e){return this._iter.get(t,e)},re.prototype.has=function(t){return this._iter.has(t)},re.prototype.valueSeq=function(){return this._iter.valueSeq()},re.prototype.reverse=function(){var t=this,e=fe(this,!0);return this._useKeys||(e.valueSeq=function(){return t._iter.toSeq().reverse()}),e},re.prototype.map=function(t,e){var u=this,r=se(this,t,e);return this._useKeys||(r.valueSeq=function(){return u._iter.toSeq().map(t,e)}),r},re.prototype.__iterate=function(t,e){var u,r=this;return this._iter.__iterate(this._useKeys?function(e,u){return t(e,u,r)}:(u=e?Se(this):0,function(n){return t(n,e?--u:u++,r)}),e)},re.prototype.__iterator=function(t,e){if(this._useKeys)return this._iter.__iterator(t,e);var u=this._iter.__iterator(Eu,e),r=e?Se(this):0;return new A(function(){var n=u.next();return n.done?n:y(t,e?--r:r++,n.value,n)})},re.prototype[Du]=!0,t(ne,L),ne.prototype.includes=function(t){return this._iter.includes(t)},ne.prototype.__iterate=function(t,e){var u=this,r=0;return this._iter.__iterate(function(e){return t(e,r++,u)},e)},ne.prototype.__iterator=function(t,e){var u=this._iter.__iterator(Eu,e),r=0;return new A(function(){var e=u.next();return e.done?e:y(t,r++,e.value,e)})},t(ie,M),ie.prototype.has=function(t){return this._iter.includes(t)},ie.prototype.__iterate=function(t,e){var u=this;return this._iter.__iterate(function(e){return t(e,e,u)},e)},ie.prototype.__iterator=function(t,e){var u=this._iter.__iterator(Eu,e);return new A(function(){var e=u.next();return e.done?e:y(t,e.value,e.value,e)})},t(oe,x),oe.prototype.entrySeq=function(){return this._iter.toSeq()},oe.prototype.__iterate=function(t,e){var u=this;return this._iter.__iterate(function(e){if(e){me(e);var r=i(e);return t(r?e.get(1):e[1],r?e.get(0):e[0],u)}},e)},oe.prototype.__iterator=function(t,e){var u=this._iter.__iterator(Eu,e);return new A(function(){for(;;){var e=u.next();if(e.done)return e;var r=e.value;if(r){me(r);var n=i(r);return y(t,n?r.get(0):r[0],n?r.get(1):r[1],e)}}})},ne.prototype.cacheResult=re.prototype.cacheResult=ie.prototype.cacheResult=oe.prototype.cacheResult=Ie,t(Me,et),Me.prototype.toString=function(){return this.__toString(Oe(this)+" {","}")},Me.prototype.has=function(t){return this._defaultValues.hasOwnProperty(t)},Me.prototype.get=function(t,e){if(!this.has(t))return e;var u=this._defaultValues[t];return this._map?this._map.get(t,u):u},Me.prototype.clear=function(){if(this.__ownerID)return this._map&&this._map.clear(),this;var t=this.constructor;return t._empty||(t._empty=ze(this,yt()))},Me.prototype.set=function(t,e){if(!this.has(t))throw new Error('Cannot set unknown key "'+t+'" on '+Oe(this));if(this._map&&!this._map.has(t)){if(e===this._defaultValues[t])return this}var u=this._map&&this._map.set(t,e);return this.__ownerID||u===this._map?this:ze(this,u)},Me.prototype.remove=function(t){if(!this.has(t))return this;var e=this._map&&this._map.remove(t);return this.__ownerID||e===this._map?this:ze(this,e)},Me.prototype.wasAltered=function(){return this._map.wasAltered()},Me.prototype.__iterator=function(t,e){var r=this;return u(this._defaultValues).map(function(t,e){return r.get(e)}).__iterator(t,e)},Me.prototype.__iterate=function(t,e){var r=this;return u(this._defaultValues).map(function(t,e){return r.get(e)}).__iterate(t,e)},Me.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map&&this._map.__ensureOwner(t);return t?ze(this,e,t):(this.__ownerID=t,this._map=e,this)};var Yu=Me.prototype;Yu.delete=Yu.remove,Yu.deleteIn=Yu.removeIn=qu.removeIn,Yu.merge=qu.merge,Yu.mergeWith=qu.mergeWith,Yu.mergeIn=qu.mergeIn,Yu.mergeDeep=qu.mergeDeep,Yu.mergeDeepWith=qu.mergeDeepWith,Yu.mergeDeepIn=qu.mergeDeepIn,Yu.setIn=qu.setIn,Yu.update=qu.update,Yu.updateIn=qu.updateIn,Yu.withMutations=qu.withMutations,Yu.asMutable=qu.asMutable,Yu.asImmutable=qu.asImmutable,t(je,rt),je.of=function(){return this(arguments)},je.fromKeys=function(t){return this(u(t).keySeq())},je.prototype.toString=function(){return this.__toString("Set {","}")},je.prototype.has=function(t){return this._map.has(t)},je.prototype.add=function(t){return Te(this,this._map.set(t,!0))},je.prototype.remove=function(t){return Te(this,this._map.remove(t))},je.prototype.clear=function(){return Te(this,this._map.clear())},je.prototype.union=function(){var t=au.call(arguments,0);return t=t.filter(function(t){return 0!==t.size}),0===t.length?this:0!==this.size||this.__ownerID||1!==t.length?this.withMutations(function(e){for(var u=0;u<t.length;u++)n(t[u]).forEach(function(t){return e.add(t)})}):this.constructor(t[0])},je.prototype.intersect=function(){var t=au.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return n(t)});var e=this;return this.withMutations(function(u){e.forEach(function(e){t.every(function(t){return t.includes(e)})||u.remove(e)})})},je.prototype.subtract=function(){var t=au.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return n(t)});var e=this;return this.withMutations(function(u){e.forEach(function(e){t.some(function(t){return t.includes(e)})&&u.remove(e)})})},je.prototype.merge=function(){return this.union.apply(this,arguments)},je.prototype.mergeWith=function(t){var e=au.call(arguments,1);return this.union.apply(this,e)},je.prototype.sort=function(t){return Ue(Ce(this,t))},je.prototype.sortBy=function(t,e){return Ue(Ce(this,e,t))},je.prototype.wasAltered=function(){return this._map.wasAltered()},je.prototype.__iterate=function(t,e){var u=this;return this._map.__iterate(function(e,r){return t(r,r,u)},e)},je.prototype.__iterator=function(t,e){return this._map.map(function(t,e){return e}).__iterator(t,e)},je.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t);return t?this.__make(e,t):(this.__ownerID=t,this._map=e,this)},je.isSet=Pe;var Qu="@@__IMMUTABLE_SET__@@",$u=je.prototype;$u[Qu]=!0,$u.delete=$u.remove,$u.mergeDeep=$u.merge,$u.mergeDeepWith=$u.mergeWith,$u.withMutations=qu.withMutations,$u.asMutable=qu.asMutable,$u.asImmutable=qu.asImmutable,$u.__empty=Ne,$u.__make=qe;var Zu;t(Ue,je),Ue.of=function(){return this(arguments)},Ue.fromKeys=function(t){return this(u(t).keySeq())},Ue.prototype.toString=function(){return this.__toString("OrderedSet {","}")},Ue.isOrderedSet=We;var tr=Ue.prototype;tr[Du]=!0,tr.__empty=Je,tr.__make=Ke;var er;t(He,ut),He.of=function(){return this(arguments)},He.prototype.toString=function(){return this.__toString("Stack [","]")},He.prototype.get=function(t,e){var u=this._head;for(t=d(this,t);u&&t--;)u=u.next;return u?u.value:e},He.prototype.peek=function(){return this._head&&this._head.value},He.prototype.push=function(){if(0===arguments.length)return this;for(var t=this.size+arguments.length,e=this._head,u=arguments.length-1;u>=0;u--)e={value:arguments[u],next:e};return this.__ownerID?(this.size=t,this._head=e,this.__hash=void 0,this.__altered=!0,this):Ge(t,e)},He.prototype.pushAll=function(t){if(t=r(t),0===t.size)return this;ct(t.size);var e=this.size,u=this._head;return t.reverse().forEach(function(t){e++,u={value:t,next:u}}),this.__ownerID?(this.size=e,this._head=u,this.__hash=void 0,this.__altered=!0,this):Ge(e,u)},He.prototype.pop=function(){return this.slice(1)},He.prototype.unshift=function(){return this.push.apply(this,arguments)},He.prototype.unshiftAll=function(t){return this.pushAll(t)},He.prototype.shift=function(){return this.pop.apply(this,arguments)},He.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._head=void 0,this.__hash=void 0,this.__altered=!0,this):Ve()},He.prototype.slice=function(t,e){if(v(t,e,this.size))return this;var u=F(t,this.size);if(E(e,this.size)!==this.size)return ut.prototype.slice.call(this,t,e);for(var r=this.size-u,n=this._head;u--;)n=n.next;return this.__ownerID?(this.size=r,this._head=n,this.__hash=void 0,this.__altered=!0,this):Ge(r,n)},He.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Ge(this.size,this._head,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},He.prototype.__iterate=function(t,e){if(e)return this.reverse().__iterate(t);for(var u=0,r=this._head;r&&!1!==t(r.value,u++,this);)r=r.next;return u},He.prototype.__iterator=function(t,e){if(e)return this.reverse().__iterator(t);var u=0,r=this._head;return new A(function(){if(r){var e=r.value;return r=r.next,y(t,u++,e)}return B()})},He.isStack=Xe;var ur="@@__IMMUTABLE_STACK__@@",rr=He.prototype;rr[ur]=!0,rr.withMutations=qu.withMutations,rr.asMutable=qu.asMutable,rr.asImmutable=qu.asImmutable,rr.wasAltered=qu.wasAltered;var nr;e.Iterator=A,Ye(e,{toArray:function(){ct(this.size);var t=new Array(this.size||0);return this.valueSeq().__iterate(function(e,u){t[u]=e}),t},toIndexedSeq:function(){return new ne(this)},toJS:function(){return this.toSeq().map(function(t){return t&&"function"==typeof t.toJS?t.toJS():t}).__toJS()},toJSON:function(){return this.toSeq().map(function(t){return t&&"function"==typeof t.toJSON?t.toJSON():t}).__toJS()},toKeyedSeq:function(){return new re(this,!0)},toMap:function(){return Dt(this.toKeyedSeq())},toObject:function(){ct(this.size);var t={};return this.__iterate(function(e,u){t[u]=e}),t},toOrderedMap:function(){return $t(this.toKeyedSeq())},toOrderedSet:function(){return Ue(o(this)?this.valueSeq():this)},toSet:function(){return je(o(this)?this.valueSeq():this)},toSetSeq:function(){return new ie(this)},toSeq:function(){return a(this)?this.toIndexedSeq():o(this)?this.toKeyedSeq():this.toSetSeq()},toStack:function(){return He(o(this)?this.valueSeq():this)},toList:function(){return Tt(o(this)?this.valueSeq():this)},toString:function(){return"[Iterable]"},__toString:function(t,e){return 0===this.size?t+e:t+" "+this.toSeq().map(this.__toStringMapper).join(", ")+" "+e},concat:function(){return ge(this,_e(this,au.call(arguments,0)))},includes:function(t){return this.some(function(e){return V(e,t)})},entries:function(){return this.__iterator(Cu)},every:function(t,e){ct(this.size);var u=!0;return this.__iterate(function(r,n,i){if(!t.call(e,r,n,i))return u=!1,!1}),u},filter:function(t,e){return ge(this,ce(this,t,e,!0))},find:function(t,e,u){var r=this.findEntry(t,e);return r?r[1]:u},forEach:function(t,e){return ct(this.size),this.__iterate(e?t.bind(e):t)},join:function(t){ct(this.size),t=void 0!==t?""+t:",";var e="",u=!0;return this.__iterate(function(r){u?u=!1:e+=t,e+=null!==r&&void 0!==r?r.toString():""}),e},keys:function(){return this.__iterator(Fu)},map:function(t,e){return ge(this,se(this,t,e))},reduce:function(t,e,u){ct(this.size);var r,n;return arguments.length<2?n=!0:r=e,this.__iterate(function(e,i,o){n?(n=!1,r=e):r=t.call(u,r,e,i,o)}),r},reduceRight:function(t,e,u){var r=this.toKeyedSeq().reverse();return r.reduce.apply(r,arguments)},reverse:function(){return ge(this,fe(this,!0))},slice:function(t,e){return ge(this,he(this,t,e,!0))},some:function(t,e){return!this.every(Ze(t),e)},sort:function(t){return ge(this,Ce(this,t))},values:function(){return this.__iterator(Eu)},butLast:function(){return this.slice(0,-1)},isEmpty:function(){return void 0!==this.size?0===this.size:!this.some(function(){return!0})},count:function(t,e){return p(t?this.toSeq().filter(t,e):this)},countBy:function(t,e){return De(this,t,e)},equals:function(t){return Y(this,t)},entrySeq:function(){var t=this;if(t._cache)return new z(t._cache);var e=t.toSeq().map($e).toIndexedSeq();return e.fromEntrySeq=function(){return t.toSeq()},e},filterNot:function(t,e){return this.filter(Ze(t),e)},findEntry:function(t,e,u){var r=u;return this.__iterate(function(u,n,i){if(t.call(e,u,n,i))return r=[n,u],!1}),r},findKey:function(t,e){var u=this.findEntry(t,e);return u&&u[0]},findLast:function(t,e,u){return this.toKeyedSeq().reverse().find(t,e,u)},findLastEntry:function(t,e,u){return this.toKeyedSeq().reverse().findEntry(t,e,u)},findLastKey:function(t,e){return this.toKeyedSeq().reverse().findKey(t,e)},first:function(){return this.find(_)},flatMap:function(t,e){return ge(this,Fe(this,t,e))},flatten:function(t){return ge(this,ve(this,t,!0))},fromEntrySeq:function(){return new oe(this)},get:function(t,e){return this.find(function(e,u){return V(u,t)},void 0,e)},getIn:function(t,e){for(var u,r=this,n=Le(t);!(u=n.next()).done;){var i=u.value;if((r=r&&r.get?r.get(i,du):du)===du)return e}return r},groupBy:function(t,e){return le(this,t,e)},has:function(t){return this.get(t,du)!==du},hasIn:function(t){return this.getIn(t,du)!==du},isSubset:function(t){return t="function"==typeof t.includes?t:e(t),this.every(function(e){return t.includes(e)})},isSuperset:function(t){return t="function"==typeof t.isSubset?t:e(t),t.isSubset(this)},keyOf:function(t){return this.findKey(function(e){return V(e,t)})},keySeq:function(){return this.toSeq().map(Qe).toIndexedSeq()},last:function(){return this.toSeq().reverse().first()},lastKeyOf:function(t){return this.toKeyedSeq().reverse().keyOf(t)},max:function(t){return Ae(this,t)},maxBy:function(t,e){return Ae(this,e,t)},min:function(t){return Ae(this,t?tu(t):ru)},minBy:function(t,e){return Ae(this,e?tu(e):ru,t)},rest:function(){return this.slice(1)},skip:function(t){return this.slice(Math.max(0,t))},skipLast:function(t){return ge(this,this.toSeq().reverse().skip(t).reverse())},skipWhile:function(t,e){return ge(this,de(this,t,e,!0))},skipUntil:function(t,e){return this.skipWhile(Ze(t),e)},sortBy:function(t,e){return ge(this,Ce(this,e,t))},take:function(t){return this.slice(0,Math.max(0,t))},takeLast:function(t){return ge(this,this.toSeq().reverse().take(t).reverse())},takeWhile:function(t,e){return ge(this,pe(this,t,e))},takeUntil:function(t,e){return this.takeWhile(Ze(t),e)},valueSeq:function(){return this.toIndexedSeq()},hashCode:function(){return this.__hash||(this.__hash=nu(this))}});var ir=e.prototype;ir[su]=!0,ir[Bu]=ir.values,ir.__toJS=ir.toArray,ir.__toStringMapper=eu,ir.inspect=ir.toSource=function(){return this.toString()},ir.chain=ir.flatMap,ir.contains=ir.includes,Ye(u,{flip:function(){return ge(this,ae(this))},mapEntries:function(t,e){var u=this,r=0;return ge(this,this.toSeq().map(function(n,i){return t.call(e,[i,n],r++,u)}).fromEntrySeq())},mapKeys:function(t,e){var u=this;return ge(this,this.toSeq().flip().map(function(r,n){return t.call(e,r,n,u)}).flip())}});var or=u.prototype;return or[fu]=!0,or[Bu]=ir.entries,or.__toJS=ir.toObject,or.__toStringMapper=function(t,e){return JSON.stringify(e)+": "+eu(t)},Ye(r,{toKeyedSeq:function(){return new re(this,!1)},filter:function(t,e){return ge(this,ce(this,t,e,!1))},findIndex:function(t,e){var u=this.findEntry(t,e);return u?u[0]:-1},indexOf:function(t){var e=this.keyOf(t);return void 0===e?-1:e},lastIndexOf:function(t){var e=this.lastKeyOf(t);return void 0===e?-1:e},reverse:function(){return ge(this,fe(this,!1))},slice:function(t,e){return ge(this,he(this,t,e,!1))},splice:function(t,e){var u=arguments.length;if(e=Math.max(0|e,0),0===u||2===u&&!e)return this;t=F(t,t<0?this.count():this.size);var r=this.slice(0,t);return ge(this,1===u?r:r.concat(h(arguments,2),this.slice(t+e)))},findLastIndex:function(t,e){var u=this.findLastEntry(t,e);return u?u[0]:-1},first:function(){return this.get(0)},flatten:function(t){return ge(this,ve(this,t,!1))},get:function(t,e){return t=d(this,t),t<0||this.size===1/0||void 0!==this.size&&t>this.size?e:this.find(function(e,u){return u===t},void 0,e)},has:function(t){return(t=d(this,t))>=0&&(void 0!==this.size?this.size===1/0||t<this.size:-1!==this.indexOf(t))},interpose:function(t){return ge(this,Ee(this,t))},interleave:function(){var t=[this].concat(h(arguments)),e=Be(this.toSeq(),L.of,t),u=e.flatten(!0);return e.size&&(u.size=e.size*t.length),ge(this,u)},keySeq:function(){return Z(0,this.size)},last:function(){return this.get(-1)},skipWhile:function(t,e){return ge(this,de(this,t,e,!1))},zip:function(){return ge(this,Be(this,uu,[this].concat(h(arguments))))},zipWith:function(t){var e=h(arguments);return e[0]=this,ge(this,Be(this,t,e))}}),r.prototype[cu]=!0,r.prototype[Du]=!0,Ye(n,{get:function(t,e){return this.has(t)?t:e},includes:function(t){return this.has(t)},keySeq:function(){return this.valueSeq()}}),n.prototype.has=ir.includes,n.prototype.contains=n.prototype.includes,Ye(x,u.prototype),Ye(L,r.prototype),Ye(M,n.prototype),Ye(et,u.prototype),Ye(ut,r.prototype),Ye(rt,n.prototype),{Iterable:e,Seq:I,Collection:tt,Map:Dt,OrderedMap:$t,List:Tt,Stack:He,Set:je,OrderedSet:Ue,Record:Me,Range:Z,Repeat:Q,is:V,fromJS:J}})},function(t,e){function u(t,e){for(var u=-1,r=t?t.length:0,n=Array(r);++u<r;)n[u]=e(t[u],u,t);return n}function r(t,e,u,r){for(var n=t.length,i=u+(r?1:-1);r?i--:++i<n;)if(e(t[i],i,t))return i;return-1}function n(t,e,u){if(e!==e)return r(t,i,u);for(var n=u-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function i(t){return t!==t}function o(t,e){for(var u=-1,r=Array(t);++u<t;)r[u]=e(u);return r}function a(t,e){return u(e,function(e){return t[e]})}function s(t,e){var u=G(t)||h(t)?o(t.length,String):[],r=u.length,n=!!r;for(var i in t)!e&&!W.call(t,i)||n&&("length"==i||c(i,r))||u.push(i);return u}function f(t){if(!D(t))return H(t);var e=[];for(var u in Object(t))W.call(t,u)&&"constructor"!=u&&e.push(u);return e}function c(t,e){return!!(e=null==e?b:e)&&("number"==typeof t||q.test(t))&&t>-1&&t%1==0&&t<e}function D(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||U)}function l(t,e,u,r){t=p(t)?t:S(t),u=u&&!r?B(u):0;var i=t.length;return u<0&&(u=X(i+u,0)),C(t)?u<=i&&t.indexOf(e,u)>-1:!!i&&n(t,e,u)>-1}function h(t){return d(t)&&W.call(t,"callee")&&(!J.call(t,"callee")||K.call(t)==L)}function p(t){return null!=t&&v(t.length)&&!_(t)}function d(t){return E(t)&&p(t)}function _(t){var e=F(t)?K.call(t):"";return e==M||e==z}function v(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=b}function F(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function E(t){return!!t&&"object"==typeof t}function C(t){return"string"==typeof t||!G(t)&&E(t)&&K.call(t)==O}function A(t){return"symbol"==typeof t||E(t)&&K.call(t)==R}function y(t){if(!t)return 0===t?t:0;if((t=g(t))===w||t===-w){return(t<0?-1:1)*I}return t===t?t:0}function B(t){var e=y(t),u=e%1;return e===e?u?e-u:e:0}function g(t){if("number"==typeof t)return t;if(A(t))return x;if(F(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=F(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(k,"");var u=P.test(t);return u||T.test(t)?N(t.slice(2),u?2:8):j.test(t)?x:+t}function m(t){return p(t)?s(t):f(t)}function S(t){return t?a(t,m(t)):[]}var w=1/0,b=9007199254740991,I=1.7976931348623157e308,x=NaN,L="[object Arguments]",M="[object Function]",z="[object GeneratorFunction]",O="[object String]",R="[object Symbol]",k=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,P=/^0b[01]+$/i,T=/^0o[0-7]+$/i,q=/^(?:0|[1-9]\d*)$/,N=parseInt,U=Object.prototype,W=U.hasOwnProperty,K=U.toString,J=U.propertyIsEnumerable,H=function(t,e){return function(u){return t(e(u))}}(Object.keys,Object),X=Math.max,G=Array.isArray;t.exports=l},function(t,e,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Sequence=e.Run=e.Pairing=e.EmbeddingLevelState=e.DirectionalStatusStackEntry=e.BracketPairState=e.BracketPairStackEntry=e.decrease=e.increase=void 0;var r=u(1),n=function(t){return t+1},i=function(t){return t-1},o=(0,r.Record)({isolate:!1,level:0,override:"neutral"}),a=(0,r.Record)({directionalStatusStack:r.Stack.of(new o),bidiTypes:r.List.of(),embeddingLevels:r.List.of(),overflowEmbeddingCount:0,overflowIsolateCount:0,validIsolateCount:0}),s=(0,r.Record)({level:-1,from:0,to:0},"Run"),f=(0,r.Record)({runs:r.List.of(),eos:"",sos:""},"Sequence"),c=(0,r.Record)({point:0,position:0}),D=(0,r.Record)({open:0,close:0}),l=(0,r.Record)({stack:r.Stack.of(),pairings:r.List.of(),stackoverflow:!1});e.increase=n,e.decrease=i,e.BracketPairStackEntry=c,e.BracketPairState=l,e.DirectionalStatusStackEntry=o,e.EmbeddingLevelState=a,e.Pairing=D,e.Run=s,e.Sequence=f},function(t,e,u){(function(e){function u(t,e,u){switch(u.length){case 0:return t.call(e);case 1:return t.call(e,u[0]);case 2:return t.call(e,u[0],u[1]);case 3:return t.call(e,u[0],u[1],u[2])}return t.apply(e,u)}function r(t,e){for(var u=-1,r=e.length,n=t.length;++u<r;)t[n+u]=e[u];return t}function n(t,e,u,i,a){var s=-1,f=t.length;for(u||(u=o),a||(a=[]);++s<f;){var c=t[s];e>0&&u(c)?e>1?n(c,e-1,u,i,a):r(a,c):i||(a[a.length]=c)}return a}function i(t,e){return e=b(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,i=b(r.length-e,0),o=Array(i);++n<i;)o[n]=r[e+n];n=-1;for(var a=Array(e+1);++n<e;)a[n]=r[n];return a[e]=o,u(t,this,a)}}function o(t){return I(t)||a(t)||!!(w&&t&&t[w])}function a(t){return f(t)&&B.call(t,"callee")&&(!S.call(t,"callee")||g.call(t)==_)}function s(t){return null!=t&&D(t.length)&&!c(t)}function f(t){return h(t)&&s(t)}function c(t){var e=l(t)?g.call(t):"";return e==v||e==F}function D(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=d}function l(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function h(t){return!!t&&"object"==typeof t}var p="Expected a function",d=9007199254740991,_="[object Arguments]",v="[object Function]",F="[object GeneratorFunction]",E="object"==typeof e&&e&&e.Object===Object&&e,C="object"==typeof self&&self&&self.Object===Object&&self,A=E||C||Function("return this")(),y=Object.prototype,B=y.hasOwnProperty,g=y.toString,m=A.Symbol,S=y.propertyIsEnumerable,w=m?m.isConcatSpreadable:void 0,b=Math.max,I=Array.isArray,x=function(t){return i(function(e){e=n(e,1);var u=e.length,r=u;for(t&&e.reverse();r--;)if("function"!=typeof e[r])throw new TypeError(p);return function(){for(var t=0,r=u?e[t].apply(this,arguments):arguments[0];++t<u;)r=e[t].call(this,r);return r}})}();t.exports=x}).call(e,u(5))},function(t,e){var u;u=function(){return this}();try{u=u||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(u=window)}t.exports=u},function(t,e){function u(t){return void 0===t}t.exports=u},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e){function u(t){var e=t.last().get("to")-1,r=B.get(e,-1);if(r>-1){var n=(0,_.default)(o,r);return u(t.push(n))}return t}var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=(0,c.default)(t,e,r),o=n.runs,f=n.bidiTypes,D=n.levels,h=(0,l.default)(t.zip(f,e).filter(function(t){var e=i(t,3),u=(e[0],e[1]);e[2];return!1===(0,v.isX9ControlCharacter)(u)})),d=i(h,3),E=d[0],C=d[1],A=d[2],y=(0,p.default)(E),B=y.initiatorToPDI,g=y.initiatorFromPDI;return{sequences:function(t){return t.map(function(t,e){var u=E.size,n=t.get("runs").first().get("from"),i=t.get("runs").last().get("to"),f=function(t){return(0,s.Range)(0,u).contains(t)?(0,_.default)(o,t).get("level"):r},c=f(n-1),D=f(n),l=function(t){var e=E.get(i-1),u=B.get(e,-1);return(0,a.default)([v.LRI,v.RLI,v.FSI],e)&&-1===u?r:f(i)}(),h=Math.max(c,D)%2==1?"R":"L",p=Math.max(D,l)%2==1?"R":"L";return t.set("sos",h).set("eos",p)})}(o.filter(function(t){var e=t.get("from"),u=E.get(e),r=g.get(e,-1);return u!==v.PDI||-1===r}).reduce(function(t,e,r){var n=new F.Sequence({runs:u(s.List.of(e))});return t.push(n)},s.List.of())),codepoints:E,bidiTypes:C,paragraphBidiTypes:A,levels:D}}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=u(2),a=r(o),s=u(1),f=u(19),c=r(f),D=u(30),l=r(D),h=u(11),p=r(h),d=u(31),_=r(d),v=u(0),F=u(3);e.default=n},function(t,e,u){"use strict";function r(t){var e=t.get("overflowIsolateCount"),u=t.get("overflowEmbeddingCount");return e>0||u>0}function n(t,e,u,n){if(t!==a.RLI)return n;var i=n.get("directionalStatusStack").peek(),f=i.get("level");return(0,o.default)(function(t){return t.update("embeddingLevels",function(t){return t.set(u,f)})},function(t){var e=i.get("override");if("neutral"!==e){var r="left-to-right"===e?"L":"R";return t.update("bidiTypes",function(t){return t.set(u,r)})}return t},function(t){var e=f+1+f%2;return e>a.MAX_DEPTH||r(t)?t.update("overflowIsolateCount",s.increase):t.update("validIsolateCount",s.increase).update("directionalStatusStack",function(t){return t.push(new s.DirectionalStatusStackEntry({isolate:!0,level:e}))})})(n)}Object.defineProperty(e,"__esModule",{value:!0});var i=u(4),o=function(t){return t&&t.__esModule?t:{default:t}}(i),a=u(0),s=u(3);e.default=n},function(t,e,u){"use strict";function r(t){var e=t.get("overflowIsolateCount"),u=t.get("overflowEmbeddingCount");return e>0||u>0}function n(t,e,u,n){if(t!==s.LRI)return n;var i=n.get("directionalStatusStack").peek(),f=i.get("level");return(0,o.default)(function(t){return t.update("embeddingLevels",function(t){return t.set(u,f)})},function(t){var e=i.get("override");if("neutral"!==e){var r="left-to-right"===e?"L":"R";return t.update("bidiTypes",function(t){return t.set(u,r)})}return t},function(t){var e=f+1+(f+1)%2;return e>s.MAX_DEPTH||r(t)?t.update("overflowIsolateCount",a.increase):t.update("validIsolateCount",a.increase).update("directionalStatusStack",function(t){return t.push(new a.DirectionalStatusStackEntry({isolate:!0,level:e}))})})(n)}Object.defineProperty(e,"__esModule",{value:!0});var i=u(4),o=function(t){return t&&t.__esModule?t:{default:t}}(i),a=u(3),s=u(0);e.default=n},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e){var u=((0,f.Record)({inside:!1,counter:0},"P2State"),t.reduce(function(t,e){var u=t.get(-1,0);return t.push(function(){return(0,s.default)([c.LRI,c.RLI,c.FSI],e)?u+1:e===c.PDI&&u>0?u-1:u}())},f.List.of()).map(function(t){return t>0})),r=t.zip(e,u).filter(function(t){var e=i(t,3);e[0],e[1];return!1===e[2]}).map(function(t){var e=i(t,3),u=(e[0],e[1]);e[2];return u}).find(function(t){return(0,s.default)(["L","R","AL"],t)});return(0,s.default)(["R","AL"],r)?1:0}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=u(6),a=(r(o),u(2)),s=r(a),f=u(1),c=u(0);e.default=n},function(t,e,u){"use strict";function r(t){var e=t.size,u=(0,i.Range)().zip((0,i.Range)(0,e).map(function(e){return(0,a.default)(t,e)})).filter(function(t){var e=n(t,2);e[0];return-1!==e[1]}),r=u.map(function(t){var e=n(t,2),u=e[0];return[e[1],u]});return{initiatorToPDI:(0,i.Map)(u),initiatorFromPDI:(0,i.Map)(r)}}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=u(1),o=u(26),a=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default=r},function(t,e,u){"use strict";function r(t){var e=t.reduce(function(t,e){var u=n(e,2),r=u[0],i=u[1];return t.update(0,function(t){return t.push(r)}).update(1,function(t){return t.push(i)})},i.List.of(i.List.of(),i.List.of()));return[e.get(0),e.get(1)]}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=u(1);e.default=r},function(t,e,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=new Set([40,91,123,3898,3900,5787,8261,8317,8333,8968,8970,9001,10088,10090,10092,10094,10096,10098,10100,10181,10214,10216,10218,10220,10222,10627,10629,10631,10633,10635,10637,10639,10641,10643,10645,10647,10712,10714,10748,11810,11812,11814,11816,12296,12298,12300,12302,12304,12308,12310,12312,12314,65113,65115,65117,65288,65339,65371,65375,65378]);e.default=r},function(t,e,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=new Set([41,93,125,3899,3901,5788,8262,8318,8334,8969,8971,9002,10089,10091,10093,10095,10097,10099,10101,10182,10215,10217,10219,10221,10223,10628,10630,10632,10634,10636,10638,10640,10642,10644,10646,10648,10713,10715,10749,11811,11813,11815,11817,12297,12299,12301,12303,12305,12309,12311,12313,12315,65114,65116,65118,65289,65341,65373,65376,65379]);e.default=r},function(t,e,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=new Map([[40,41],[41,40],[91,93],[93,91],[123,125],[125,123],[3898,3899],[3899,3898],[3900,3901],[3901,3900],[5787,5788],[5788,5787],[8261,8262],[8262,8261],[8317,8318],[8318,8317],[8333,8334],[8334,8333],[8968,8969],[8969,8968],[8970,8971],[8971,8970],[9001,9002],[9002,9001],[10088,10089],[10089,10088],[10090,10091],[10091,10090],[10092,10093],[10093,10092],[10094,10095],[10095,10094],[10096,10097],[10097,10096],[10098,10099],[10099,10098],[10100,10101],[10101,10100],[10181,10182],[10182,10181],[10214,10215],[10215,10214],[10216,10217],[10217,10216],[10218,10219],[10219,10218],[10220,10221],[10221,10220],[10222,10223],[10223,10222],[10627,10628],[10628,10627],[10629,10630],[10630,10629],[10631,10632],[10632,10631],[10633,10634],[10634,10633],[10635,10636],[10636,10635],[10637,10640],[10638,10639],[10639,10638],[10640,10637],[10641,10642],[10642,10641],[10643,10644],[10644,10643],[10645,10646],[10646,10645],[10647,10648],[10648,10647],[10712,10713],[10713,10712],[10714,10715],[10715,10714],[10748,10749],[10749,10748],[11810,11811],[11811,11810],[11812,11813],[11813,11812],[11814,11815],[11815,11814],[11816,11817],[11817,11816],[12296,12297],[12297,12296],[12298,12299],[12299,12298],[12300,12301],[12301,12300],[12302,12303],[12303,12302],[12304,12305],[12305,12304],[12308,12309],[12309,12308],[12310,12311],[12311,12310],[12312,12313],[12313,12312],[12314,12315],[12315,12314],[65113,65114],[65114,65113],[65115,65116],[65116,65115],[65117,65118],[65118,65117],[65288,65289],[65289,65288],[65339,65341],[65341,65339],[65371,65373],[65373,65371],[65375,65376],[65376,65375],[65378,65379],[65379,65378]]);e.default=r},function(t,e){t.exports=new Map([[40,")"],[41,"("],[60,">"],[62,"<"],[91,"]"],[93,"["],[123,"}"],[125,"{"],[171,"»"],[187,"«"],[3898,"༻"],[3899,"༺"],[3900,"༽"],[3901,"༼"],[5787,"᚜"],[5788,"᚛"],[8249,"›"],[8250,"‹"],[8261,"⁆"],[8262,"⁅"],[8317,"⁾"],[8318,"⁽"],[8333,"₎"],[8334,"₍"],[8712,"∋"],[8713,"∌"],[8714,"∍"],[8715,"∈"],[8716,"∉"],[8717,"∊"],[8725,"⧵"],[8764,"∽"],[8765,"∼"],[8771,"⋍"],[8786,"≓"],[8787,"≒"],[8788,"≕"],[8789,"≔"],[8804,"≥"],[8805,"≤"],[8806,"≧"],[8807,"≦"],[8808,"≩"],[8809,"≨"],[8810,"≫"],[8811,"≪"],[8814,"≯"],[8815,"≮"],[8816,"≱"],[8817,"≰"],[8818,"≳"],[8819,"≲"],[8820,"≵"],[8821,"≴"],[8822,"≷"],[8823,"≶"],[8824,"≹"],[8825,"≸"],[8826,"≻"],[8827,"≺"],[8828,"≽"],[8829,"≼"],[8830,"≿"],[8831,"≾"],[8832,"⊁"],[8833,"⊀"],[8834,"⊃"],[8835,"⊂"],[8836,"⊅"],[8837,"⊄"],[8838,"⊇"],[8839,"⊆"],[8840,"⊉"],[8841,"⊈"],[8842,"⊋"],[8843,"⊊"],[8847,"⊐"],[8848,"⊏"],[8849,"⊒"],[8850,"⊑"],[8856,"⦸"],[8866,"⊣"],[8867,"⊢"],[8870,"⫞"],[8872,"⫤"],[8873,"⫣"],[8875,"⫥"],[8880,"⊱"],[8881,"⊰"],[8882,"⊳"],[8883,"⊲"],[8884,"⊵"],[8885,"⊴"],[8886,"⊷"],[8887,"⊶"],[8905,"⋊"],[8906,"⋉"],[8907,"⋌"],[8908,"⋋"],[8909,"≃"],[8912,"⋑"],[8913,"⋐"],[8918,"⋗"],[8919,"⋖"],[8920,"⋙"],[8921,"⋘"],[8922,"⋛"],[8923,"⋚"],[8924,"⋝"],[8925,"⋜"],[8926,"⋟"],[8927,"⋞"],[8928,"⋡"],[8929,"⋠"],[8930,"⋣"],[8931,"⋢"],[8932,"⋥"],[8933,"⋤"],[8934,"⋧"],[8935,"⋦"],[8936,"⋩"],[8937,"⋨"],[8938,"⋫"],[8939,"⋪"],[8940,"⋭"],[8941,"⋬"],[8944,"⋱"],[8945,"⋰"],[8946,"⋺"],[8947,"⋻"],[8948,"⋼"],[8950,"⋽"],[8951,"⋾"],[8954,"⋲"],[8955,"⋳"],[8956,"⋴"],[8957,"⋶"],[8958,"⋷"],[8968,"⌉"],[8969,"⌈"],[8970,"⌋"],[8971,"⌊"],[9001,"〉"],[9002,"〈"],[10088,"❩"],[10089,"❨"],[10090,"❫"],[10091,"❪"],[10092,"❭"],[10093,"❬"],[10094,"❯"],[10095,"❮"],[10096,"❱"],[10097,"❰"],[10098,"❳"],[10099,"❲"],[10100,"❵"],[10101,"❴"],[10179,"⟄"],[10180,"⟃"],[10181,"⟆"],[10182,"⟅"],[10184,"⟉"],[10185,"⟈"],[10187,"⟍"],[10189,"⟋"],[10197,"⟖"],[10198,"⟕"],[10205,"⟞"],[10206,"⟝"],[10210,"⟣"],[10211,"⟢"],[10212,"⟥"],[10213,"⟤"],[10214,"⟧"],[10215,"⟦"],[10216,"⟩"],[10217,"⟨"],[10218,"⟫"],[10219,"⟪"],[10220,"⟭"],[10221,"⟬"],[10222,"⟯"],[10223,"⟮"],[10627,"⦄"],[10628,"⦃"],[10629,"⦆"],[10630,"⦅"],[10631,"⦈"],[10632,"⦇"],[10633,"⦊"],[10634,"⦉"],[10635,"⦌"],[10636,"⦋"],[10637,"⦐"],[10638,"⦏"],[10639,"⦎"],[10640,"⦍"],[10641,"⦒"],[10642,"⦑"],[10643,"⦔"],[10644,"⦓"],[10645,"⦖"],[10646,"⦕"],[10647,"⦘"],[10648,"⦗"],[10680,"⊘"],[10688,"⧁"],[10689,"⧀"],[10692,"⧅"],[10693,"⧄"],[10703,"⧐"],[10704,"⧏"],[10705,"⧒"],[10706,"⧑"],[10708,"⧕"],[10709,"⧔"],[10712,"⧙"],[10713,"⧘"],[10714,"⧛"],[10715,"⧚"],[10741,"∕"],[10744,"⧹"],[10745,"⧸"],[10748,"⧽"],[10749,"⧼"],[10795,"⨬"],[10796,"⨫"],[10797,"⨮"],[10798,"⨭"],[10804,"⨵"],[10805,"⨴"],[10812,"⨽"],[10813,"⨼"],[10852,"⩥"],[10853,"⩤"],[10873,"⩺"],[10874,"⩹"],[10877,"⩾"],[10878,"⩽"],[10879,"⪀"],[10880,"⩿"],[10881,"⪂"],[10882,"⪁"],[10883,"⪄"],[10884,"⪃"],[10891,"⪌"],[10892,"⪋"],[10897,"⪒"],[10898,"⪑"],[10899,"⪔"],[10900,"⪓"],[10901,"⪖"],[10902,"⪕"],[10903,"⪘"],[10904,"⪗"],[10905,"⪚"],[10906,"⪙"],[10907,"⪜"],[10908,"⪛"],[10913,"⪢"],[10914,"⪡"],[10918,"⪧"],[10919,"⪦"],[10920,"⪩"],[10921,"⪨"],[10922,"⪫"],[10923,"⪪"],[10924,"⪭"],[10925,"⪬"],[10927,"⪰"],[10928,"⪯"],[10931,"⪴"],[10932,"⪳"],[10939,"⪼"],[10940,"⪻"],[10941,"⪾"],[10942,"⪽"],[10943,"⫀"],[10944,"⪿"],[10945,"⫂"],[10946,"⫁"],[10947,"⫄"],[10948,"⫃"],[10949,"⫆"],[10950,"⫅"],[10957,"⫎"],[10958,"⫍"],[10959,"⫐"],[10960,"⫏"],[10961,"⫒"],[10962,"⫑"],[10963,"⫔"],[10964,"⫓"],[10965,"⫖"],[10966,"⫕"],[10974,"⊦"],[10979,"⊩"],[10980,"⊨"],[10981,"⊫"],[10988,"⫭"],[10989,"⫬"],[10999,"⫸"],[11e3,"⫷"],[11001,"⫺"],[11002,"⫹"],[11778,"⸃"],[11779,"⸂"],[11780,"⸅"],[11781,"⸄"],[11785,"⸊"],[11786,"⸉"],[11788,"⸍"],[11789,"⸌"],[11804,"⸝"],[11805,"⸜"],[11808,"⸡"],[11809,"⸠"],[11810,"⸣"],[11811,"⸢"],[11812,"⸥"],[11813,"⸤"],[11814,"⸧"],[11815,"⸦"],[11816,"⸩"],[11817,"⸨"],[12296,"〉"],[12297,"〈"],[12298,"》"],[12299,"《"],[12300,"」"],[12301,"「"],[12302,"』"],[12303,"『"],[12304,"】"],[12305,"【"],[12308,"〕"],[12309,"〔"],[12310,"〗"],[12311,"〖"],[12312,"〙"],[12313,"〘"],[12314,"〛"],[12315,"〚"],[65113,"﹚"],[65114,"﹙"],[65115,"﹜"],[65116,"﹛"],[65117,"﹞"],[65118,"﹝"],[65124,"﹥"],[65125,"﹤"],[65288,"）"],[65289,"（"],[65308,"＞"],[65310,"＜"],[65339,"］"],[65341,"［"],[65371,"｝"],[65373,"｛"],[65375,"｠"],[65376,"｟"],[65378,"｣"],[65379,"｢"]])},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e){var u=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=p.default.ucs2.encode(t),n=r.normalize("NFC"),i=p.default.ucs2.decode(n),o=(0,d.fromJS)(i),a=o.map(l.default);return(0,s.resolvedLevelsWithInvisibles)(o,a,e,u).toJS()}function i(t,e){var u=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return(0,c.default)((0,d.fromJS)(t),(0,d.fromJS)(e),u).toJS()}function o(t){return(0,f.reorderPermutation)((0,d.fromJS)(t)).toJS()}function a(t,e){return(0,m.default)((0,d.fromJS)(t),(0,d.fromJS)(e)).toJS()}Object.defineProperty(e,"__esModule",{value:!0}),e.constants=e.mirror=e.reorderPermutation=e.reorder=e.resolve=void 0;var s=u(18),f=u(48),c=r(f),D=u(50),l=r(D),h=u(51),p=r(h),d=u(1),_=u(13),v=r(_),F=u(14),E=r(F),C=u(15),A=r(C),y=u(16),B=r(y),g=u(53),m=r(g),S={mirrorMap:B.default,oppositeBracket:A.default,openingBrackets:v.default,closingBrackets:E.default};e.resolve=n,e.reorder=i,e.reorderPermutation=o,e.mirror=a,e.constants=S},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e,u){function r(t,e,u){return 0===t.size?u:(0,c.isX9ControlCharacter)(t.first())?r(t.rest(),e,u.push("x")):r(t.rest(),e.rest(),u.push(e.first()))}return r(e,i(t,e,u,arguments.length>3&&void 0!==arguments[3]&&arguments[3]),a.List.of())}function i(t,e,u){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=!0===r?(0,p.default)(t,e):u,i=(0,f.default)(t,e,n),s=i.sequences,c=i.codepoints,D=i.bidiTypes,l=i.paragraphBidiTypes,h=(i.levels,(0,F.default)(c,D,s)),d=D.size,v=s.reduce(o,(0,a.List)((0,a.Range)(0,d)).map(function(t){return 0})),E=(0,_.default)(h,v);return(0,A.default)(l,E,n)}function o(t,e){return e.get("runs").reduce(function(t,e){var u=e.toJS(),r=u.from,n=u.to,i=n-r,o=e.get("level"),s=(0,a.List)((0,a.Range)(0,i)).map(function(t){return o});return t.slice(0,r).concat(s).concat(t.slice(n))},t)}Object.defineProperty(e,"__esModule",{value:!0}),e.resolvedLevelsWithInvisibles=void 0;var a=u(1),s=u(7),f=r(s),c=u(0),D=u(12),l=(r(D),u(32)),h=(r(l),u(10)),p=r(h),d=u(33),_=r(d),v=u(34),F=r(v),E=u(2),C=(r(E),u(47)),A=r(C);e.resolvedLevelsWithInvisibles=n,e.default=i},function(t,e,u){"use strict";function r(t,e){var u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=[f.rle,f.lre,f.rlo,f.lro,f.rli,f.lri,f.fsi,f.other,f.pdi,f.pdf],i=o.Stack.of(new s.DirectionalStatusStackEntry({level:u})),c=new s.EmbeddingLevelState({directionalStatusStack:i}).set("bidiTypes",e).set("embeddingLevels",t.map(function(t){return u})),D=t.zip(e).reduce(function(u,i,o){var a=n(i,2),s=a[0],f=a[1];return r.reduce(function(u,r){return r(s,f,o,u,t,e)},u)},c);return{runs:t.zip(e,D.get("embeddingLevels")).filter(function(t){var e=n(t,3),u=(e[0],e[1]);e[2];return!1===(0,a.isX9ControlCharacter)(u)}).reduce(function(t,e,u){var r=n(e,3),i=(r[0],r[1],r[2]),o=t.size-1;return t.getIn([o,"level"],-1)===i?t.updateIn([o,"to"],s.increase):t.push(new s.Run({level:i,from:u,to:u+1}))},o.List.of()),bidiTypes:D.get("bidiTypes"),levels:D.get("embeddingLevels")}}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=u(2),o=(function(t){t&&t.__esModule}(i),u(1)),a=u(0),s=u(3),f=u(20);e.default=r},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.pdf=e.pdi=e.other=e.fsi=e.lri=e.rli=e.lro=e.rlo=e.lre=e.rle=void 0;var n=u(21),i=u(22),o=r(i),a=u(23),s=r(a),f=u(24),c=r(f),D=u(8),l=r(D),h=u(9),p=r(h),d=u(25),_=r(d),v=u(27),F=r(v),E=u(28),C=u(29);e.rle=n.rle,e.lre=o.default,e.rlo=s.default,e.lro=c.default,e.rli=l.default,e.lri=p.default,e.fsi=_.default,e.other=F.default,e.pdi=E.pdi,e.pdf=C.pdf},function(t,e,u){"use strict";function r(t,e,u,r){if(t!==n.RLE)return r;var o=r.get("directionalStatusStack").peek().get("level");return(0,a.default)(function(t){return t.setIn(["embeddingLevels","levels",u],o)},function(t){var e=o+1+o%2,u=e>n.MAX_DEPTH,r=t.get("overflowIsolateCount"),a=t.get("overflowEmbeddingCount"),s=r>0||a>0;if(u||s)return 0===r?t.update("overflowEmbeddingCount",i.increase):t;var f=new i.DirectionalStatusStackEntry({level:e});return t.update("directionalStatusStack",function(t){return t.push(f)})})(r)}Object.defineProperty(e,"__esModule",{value:!0}),e.rle=void 0;var n=u(0),i=u(3),o=u(4),a=function(t){return t&&t.__esModule?t:{default:t}}(o);e.rle=r},function(t,e,u){"use strict";function r(t,e,u,r){if(t!==o.LRE)return r;var n=r.get("directionalStatusStack").peek().get("level");return(0,i.default)(function(t){return t.setIn(["embeddingLevels","levels",u],n)},function(t){var e=n+1+(n+1)%2,u=e>o.MAX_DEPTH,r=t.get("overflowIsolateCount"),i=t.get("overflowEmbeddingCount"),s=r>0||i>0;if(u||s)return 0===r?t.update("overflowEmbeddingCount",a.increase):t;var f=new a.DirectionalStatusStackEntry({level:e});return t.update("directionalStatusStack",function(t){return t.push(f)})})(r)}Object.defineProperty(e,"__esModule",{value:!0});var n=u(4),i=function(t){return t&&t.__esModule?t:{default:t}}(n),o=u(0),a=u(3);e.default=r},function(t,e,u){"use strict";function r(t,e,u,r){if(t!==n.RLO)return r;var o=r.get("directionalStatusStack").peek().get("level"),a=r.get("overflowIsolateCount"),s=r.get("overflowEmbeddingCount"),f=o+1+o%2,c=f>n.MAX_DEPTH,D=a>0||s>0;return c||D?0===a?r.update("overflowEmbeddingCount",i.increase):r:r.update("directionalStatusStack",function(t){return t.push(new i.DirectionalStatusStackEntry({level:f,override:"right-to-left"}))})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0),i=u(3);e.default=r},function(t,e,u){"use strict";function r(t,e,u,r){if(t!==n.LRO)return r;var o=r.get("directionalStatusStack").peek().get("level"),a=r.get("overflowIsolateCount"),s=r.get("overflowEmbeddingCount"),f=o+1+(o+1)%2,c=f>n.MAX_DEPTH,D=a>0||s>0;return c||D?0===a?r.update("overflowEmbeddingCount",i.increase):r:r.update("directionalStatusStack",function(t){return t.push(new i.DirectionalStatusStackEntry({level:f,override:"left-to-right"}))})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0),i=u(3);e.default=r},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e,u,r,n,i){if(t!==h.FSI)return r;var a=(0,l.default)(n),f=a.initiatorToPDI,D=f.get(u,-1),p=u+1,d=D>-1?D:n.size,_=n.slice(p,d),v=i.slice(p,d);return 1===(0,c.default)(_,v)?(0,o.default)(h.RLI,e,u,r,n):(0,s.default)(h.LRI,e,u,r,n)}Object.defineProperty(e,"__esModule",{value:!0});var i=u(8),o=r(i),a=u(9),s=r(a),f=u(10),c=r(f),D=u(11),l=r(D),h=u(0);e.default=n},function(t,e,u){"use strict";function r(t,e){if(e>=t.size)return-1;if(!(0,i.default)([o.LRI,o.RLI,o.FSI],t.get(e)))return-1;var u=t.slice(e+1),r=(0,a.Record)({counter:1,index:-1},"BD9State");return u.reduce(function(t,u,n){if(t.get("index")>-1)return t;var a=function(){var e=t.get("counter");return(0,i.default)([o.LRI,o.RLI,o.FSI],u)?e+1:u===o.PDI?e-1:e}();return u===o.PDI&&0===a?new r({counter:a,index:e+(n+1)}):t.set("counter",a)},new r).get("index")}Object.defineProperty(e,"__esModule",{value:!0});var n=u(2),i=function(t){return t&&t.__esModule?t:{default:t}}(n),o=u(0),a=u(1);e.default=r},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e,u,r){if((0,s.isNonFormatting)(e))return r;var n=r.get("directionalStatusStack").peek(),i=n.get("level");return(0,o.default)(function(t){return t.update("embeddingLevels",function(t){return t.set(u,i)})},function(t){var e=n.get("override");if("neutral"!==e){var r="left-to-right"===e?"L":"R";return t.update("bidiTypes",function(t){return t.set(u,r)})}return t})(r)}Object.defineProperty(e,"__esModule",{value:!0});var i=u(4),o=r(i),a=u(2),s=(r(a),u(0));e.default=n},function(t,e,u){"use strict";function r(t,e,u,r){if(t!==o.PDI)return r;var n=r.get("overflowIsolateCount"),s=r.get("validIsolateCount");return(0,i.default)(function(t){return n>0?t.update("overflowIsolateCount",a.decrease):0===s?t:t.set("overflowEmbeddingCount",0).update("directionalStatusStack",function(t){return t.skipWhile(function(t){return!1===t.get("isolate")})}).update("directionalStatusStack",function(t){return t.pop()}).update("validIsolateCount",a.decrease)},function(t){var e=t.get("directionalStatusStack").peek(),r=e.get("level");return t.update("embeddingLevels",function(t){return t.set(u,r)})},function(t){var e=t.get("directionalStatusStack").peek().get("override");if("neutral"!==e){var r="left-to-right"===e?"L":"R";return t.setIn(["bidiTypes",u],r)}return t})(r)}Object.defineProperty(e,"__esModule",{value:!0}),e.pdi=void 0;var n=u(4),i=function(t){return t&&t.__esModule?t:{default:t}}(n),o=u(0),a=u(3);e.pdi=r},function(t,e,u){"use strict";function r(t,e,u,r){return t!==n.PDF?r:(0,a.default)(function(t){var e=t.get("directionalStatusStack").peek().get("level");return t.setIn(["embeddingLevels","levels",u],e)},function(t){var e=t.get("overflowIsolateCount"),u=t.get("overflowEmbeddingCount"),r=t.get("directionalStatusStack"),n=r.peek().get("isolate");return e>0?t:u>0?t.update("overflowEmbeddingCount",i.decrease):!1===n&&r.size>=2?t.set("directionalStatusStack",r.pop()):t})(r)}Object.defineProperty(e,"__esModule",{value:!0}),e.pdf=void 0;var n=u(0),i=u(3),o=u(4),a=function(t){return t&&t.__esModule?t:{default:t}}(o);e.pdf=r},function(t,e,u){"use strict";function r(t){var e=t.reduce(function(t,e){var u=n(e,3),r=u[0],i=u[1],o=u[2];return t.update(0,function(t){return t.push(r)}).update(1,function(t){return t.push(i)}).update(2,function(t){return t.push(o)})},i.List.of(i.List.of(),i.List.of(),i.List.of()));return[e.get(0),e.get(1),e.get(2)]}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=u(1);e.default=r},function(t,e,u){"use strict";function r(t,e){var u=t.filter(function(t){return e>=t.get("from")&&e<t.get("to")});return u.size>0?u.last():new n.Run}Object.defineProperty(e,"__esModule",{value:!0});var n=u(3);e.default=r},function(t,e,u){"use strict";function r(t){return t.butLast().reduce(function(t,e){var u=e.toJS(),r=u.from,n=u.to,i=n-r,o=t.get(-1);return t.push(i+o)},n.List.of(0))}Object.defineProperty(e,"__esModule",{value:!0});var n=u(1);e.default=r},function(t,e,u){"use strict";function r(t,e){return t.zipWith(function(t,e){return"L"===t?e+e%2:"R"===t?e+(e+1)%2:"AN"===t||"EN"===t?e+1+(e+1)%2:void 0},e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e,u){return u.reduce(function(e,u){return i(t,e,u)},e)}function i(t,e,u){var r=t.zip(e),n=(0,D.default)(u.get("runs").map(function(t){var e=t.toJS(),u=e.from,n=e.to;return r.slice(u,n)}).flatten()),i=o(n,2),f=i[0],c=i[1],l=[s.nsm,s.en,s.al,s.es,s.et,s.on,s.enToL,d.default,h.default,v.default],p=l.reduce(function(t,e){var r=u.get("runs").first().get("level");return e(t,f,u.get("sos"),u.get("eos"),r,c)},c),_=u.get("runs").butLast().reduce(function(t,e){var u=e.toJS(),r=u.from,n=u.to,i=n-r,o=t.get(-1);return t.push(i+o)},a.List.of(0)),F=u.get("runs").zip(_).map(function(t){var e=o(t,2),u=e[0],r=e[1],n=u.toJS(),i=n.from,a=n.to,s=a-i;return p.slice(r,r+s)});return u.get("runs").zip(F).reduce(function(t,e){var u=o(e,2),r=u[0],n=u[1],i=r.toJS(),a=i.from,s=i.to;return t.slice(0,a).concat(n).concat(t.slice(s))},e)}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=u(1),s=u(35),f=u(7),c=(r(f),u(0),u(12)),D=r(c),l=u(43),h=r(l),p=u(44),d=r(p),_=u(46),v=r(_);e.default=n},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.enToL=e.on=e.et=e.es=e.al=e.en=e.nsm=void 0;var n=u(36),i=r(n),o=u(37),a=r(o),s=u(38),f=r(s),c=u(39),D=r(c),l=u(40),h=r(l),p=u(41),d=r(p),_=u(42),v=r(_);e.nsm=i.default,e.en=a.default,e.al=f.default,e.es=D.default,e.et=h.default,e.on=d.default,e.enToL=v.default},function(t,e,u){"use strict";function r(t,e,u,r){return t.reduce(function(t,r,n){if("NSM"!==r)return t.push(r);if(n<=0)return t.push(u);var o=t.get(n-1),a=e.get(n-1);return(0,i.isIsolateInitiator)(o)||(0,i.isPDI)(a)?t.push("ON"):t.push(o)},n.List.of())}Object.defineProperty(e,"__esModule",{value:!0});var n=u(1),i=u(0);e.default=r},function(t,e,u){"use strict";function r(t,e,u,r,i){return t.map(function(e,r){return"EN"!==e?e:"AL"===t.slice(0,r).reverse().push(u).find(function(t){return(0,n.isStrong)(t)})?"AN":e})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0);e.default=r},function(t,e,u){"use strict";function r(t){return t.map(function(t){return"AL"===t?"R":t})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,u){"use strict";function r(t){if(t.size<3)return t;var e=function(t){return(0,i.default)(["AN","EN"],t)},u=t.take(1),r=t.skip(2).zipWith(function(t,u,r){return"EN"===t&&t===r&&"ES"===u?"EN":"CS"===u&&e(t)&&t===r?t:u},t.skip(1),t),n=t.last();return u.concat(r).push(n)}Object.defineProperty(e,"__esModule",{value:!0});var n=u(2),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=r},function(t,e,u){"use strict";function r(t){return t.map(function(e,u){if("ET"!==e)return e;var r=t.slice(0,u).reverse(),i=t.slice(u),o="EN"===r.skipWhile(n.isET).first(),a="EN"===i.skipWhile(n.isET).first();return o||a?"EN":e})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0);e.default=r},function(t,e,u){"use strict";function r(t,e){return t.map(function(t,e){return(0,i.default)(["ET","ES","CS","B","S"],t)?"ON":t})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(2),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=r},function(t,e,u){"use strict";function r(t,e,u,r,i){return t.map(function(e,r){return"EN"!==e?e:"L"===t.slice(0,r).reverse().push(u).find(function(t){return(0,n.isStrong)(t)})?"L":e})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0);e.default=r},function(t,e,u){"use strict";function r(t,e,u,r,i){return t.map(function(e,i){if(!(0,n.isNI)(e))return e;var o=t.slice(0,i).reverse().push(u),a=t.slice(i).push(r),s=o.skipWhile(n.isNI).first(),f=a.skipWhile(n.isNI).first();return"L"===s&&"L"===f?"L":(0,n.isR)(s)&&(0,n.isR)(f)?"R":e})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0);e.default=r},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e,u,r,n,i){var o=(0,a.default)(e);return(0,f.default)(function(){return o.reduce(function(t,e){var r=e.get("open"),i=e.get("close");if(t.get(r)!==t.get(i))return t;var o=t.slice(r,i+1).map(function(t){return(0,D.default)(["EN","AN"],t)?"R":t}),a=n%2==0?"L":"R",s=n%2==0?"R":"L",f=o.find(function(t){return t===a}),c=o.find(function(t){return t===s});if(f)return t.set(r,a).set(i,a);if(c){return t.slice(0,r).map(function(t){return(0,D.default)(["EN","AN"],t)?"R":t}).reverse().push(u).find(function(t){return(0,D.default)(["L","R"],t)})===s?t.set(r,s).set(i,s):t.set(r,a).set(i,a)}return t},t)},function(t){return o.reduce(function(t,e){var u=e.get("open"),r=e.get("close"),n=(0,D.default)(["L","R"],t.get(u)),o=(0,D.default)(["L","R"],t.get(r));return(0,f.default)(function(t){return"NSM"===i.get(u+1)&&n?t.set(u+1,t.get(u)):t},function(t){return"NSM"===i.get(r+1)&&o?t.set(r+1,t.get(r)):t})(t)},t)})()}Object.defineProperty(e,"__esModule",{value:!0});var i=u(6),o=(r(i),u(45)),a=r(o),s=u(4),f=r(s),c=u(2),D=r(c);e.default=n},function(t,e,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function n(t,e){var u=new s.BracketPairState;return t.reduce(function(t,e,u){if(!0===t.get("stackoverflow"))return t;var r=t.get("stack");if(c.default.has(e))return 63==r.size?t.set("stackoverflow",!0):t.set("stack",r.push(new s.BracketPairStackEntry({point:p.default.get(e),position:u})));if(l.default.has(e)&&r.size>0){var n=r.findKey(function(t){return t.get("point")===e});if((0,o.default)(n))return t;var i=r.getIn([n,"position"]);return t.set("stack",r.slice(n+1)).update("pairings",function(t){return t.push(new s.Pairing({open:i,close:u}))})}return t},u).get("pairings").sort(function(t,e){return t.get("open")-e.get("open")})}Object.defineProperty(e,"__esModule",{value:!0});var i=u(6),o=r(i),a=u(2),s=(r(a),u(3)),f=(u(0),u(13)),c=r(f),D=u(14),l=r(D),h=u(15),p=r(h);e.default=n},function(t,e,u){"use strict";function r(t,e,u,r,i){var o=i%2==0?"L":"R";return t.map(function(t,e){return(0,n.isNI)(t)?o:t})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(0);e.default=r},function(t,e,u){"use strict";function r(t,e,u){return t.zip(e).map(function(e,r){var i=n(e,2),s=i[0],f=i[1];if((0,o.default)(["S","B"],s))return u;if(!a(s))return f;var c=t.slice(r).push("<EOL>"),D=c.skipWhile(a).first();return(0,o.default)(["<EOL>","S","B"],D)?u:f})}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var u=[],r=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(u.push(o.value),!e||u.length!==e);r=!0);}catch(t){n=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(n)throw i}}return u}return function(e,u){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,u);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=u(2),o=function(t){return t&&t.__esModule?t:{default:t}}(i),a=function(t){return(0,o.default)(["WS","FSI","LRI","RLI","PDI"],t)};e.default=r},function(t,e,u){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"x",r=(0,o.List)((0,o.Range)(0,t.size)).map(function(e){return(0,o.Map)({strip:t.get(e)===u,index:e})}).filter(function(t){return!1===t.get("strip")}).map(function(t){return t.get("index")}),i=t.filter(function(t){return t!=u}),a=n(r,i),s=(0,o.Record)({remaining:(0,o.List)(),result:(0,o.List)()},"Reduction"),f=new s({remaining:a,result:(0,o.List)()}),c=(0,o.List)((0,o.Range)(0,t.size)).reduce(function(e,r){if(t.get(r)==u){var n=e.get("result").size;return e.setIn(["result",r],n)}var i=e.get("remaining");return e.setIn(["result",r],i.first()).set("remaining",i.shift())},f).get("result");return e?a:c}function n(t,e){var u=i(e,0).groupBy(function(t){return t.get("level")}),r=u.keySeq().max();if(!(0,s.default)(r)||r<0)return t;if(0===r)return t;var a=u.get(r);return n(a.reduce(function(t,e){var u=e.toJS(),r=u.from,n=u.to,i=t.slice(r,n).reverse();return c(t,r,n,i)},t),a.reduce(function(t,e){var u=e.toJS(),n=u.from,i=u.to,a=(0,o.List)((0,o.Range)(0,i-n)).map(function(t){return r-1});return c(t,n,i,a)},e))}function i(t,e){var u=t.size;if(0===u)return o.List.of();var r=t.first(),n=t.findKey(function(t){return t!=r}),a=void 0===n?u:n,s=new f({level:r,from:e,to:e+a});return o.List.of(s).concat(i(t.slice(a),e+a))}Object.defineProperty(e,"__esModule",{value:!0}),e.reorderPermutation=void 0;var o=u(1),a=u(49),s=function(t){return t&&t.__esModule?t:{default:t}}(a),f=(0,o.Record)({level:-1,from:0,to:0},"ReorderPair"),c=function(t,e,u,r){var n=t.slice(0,e),i=t.slice(u);return n.concat(r).concat(i)};e.reorderPermutation=r,e.default=n},function(t,e){function u(t){return!!t&&"object"==typeof t}function r(t){return"number"==typeof t||u(t)&&o.call(t)==n}var n="[object Number]",i=Object.prototype,o=i.toString;t.exports=r},function(t,e,u){(function(e){var u,u;!function(e){t.exports=e()}(function(){var t;return function t(e,r,n){function i(a,s){if(!r[a]){if(!e[a]){var f="function"==typeof u&&u;if(!s&&f)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var D=r[a]={exports:{}};e[a][0].call(D.exports,function(t){var u=e[a][1][t];return i(u||t)},D,D.exports,t,e,r,n)}return r[a].exports}for(var o="function"==typeof u&&u,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(u,r,n){(function(e){!function(u){function i(t){throw new RangeError(O[t])}function o(t,e){for(var u=t.length,r=[];u--;)r[u]=e(t[u]);return r}function a(t,e){var u=t.split("@"),r="";return u.length>1&&(r=u[0]+"@",t=u[1]),t=t.replace(z,"."),r+o(t.split("."),e).join(".")}function s(t){for(var e,u,r=[],n=0,i=t.length;n<i;)e=t.charCodeAt(n++),e>=55296&&e<=56319&&n<i?(u=t.charCodeAt(n++),56320==(64512&u)?r.push(((1023&e)<<10)+(1023&u)+65536):(r.push(e),n--)):r.push(e);return r}function f(t){return o(t,function(t){var e="";return t>65535&&(t-=65536,e+=j(t>>>10&1023|55296),t=56320|1023&t),e+=j(t)}).join("")}function c(t){return t-48<10?t-22:t-65<26?t-65:t-97<26?t-97:B}function D(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function l(t,e,u){var r=0;for(t=u?k(t/w):t>>1,t+=k(t/e);t>R*m>>1;r+=B)t=k(t/R);return k(r+(R+1)*t/(t+S))}function h(t){var e,u,r,n,o,a,s,D,h,p,d=[],_=t.length,v=0,F=I,E=b;for(u=t.lastIndexOf(x),u<0&&(u=0),r=0;r<u;++r)t.charCodeAt(r)>=128&&i("not-basic"),d.push(t.charCodeAt(r));for(n=u>0?u+1:0;n<_;){for(o=v,a=1,s=B;n>=_&&i("invalid-input"),D=c(t.charCodeAt(n++)),(D>=B||D>k((y-v)/a))&&i("overflow"),v+=D*a,h=s<=E?g:s>=E+m?m:s-E,!(D<h);s+=B)p=B-h,a>k(y/p)&&i("overflow"),a*=p;e=d.length+1,E=l(v-o,e,0==o),k(v/e)>y-F&&i("overflow"),F+=k(v/e),v%=e,d.splice(v++,0,F)}return f(d)}function p(t){var e,u,r,n,o,a,f,c,h,p,d,_,v,F,E,C=[];for(t=s(t),_=t.length,e=I,u=0,o=b,a=0;a<_;++a)(d=t[a])<128&&C.push(j(d));for(r=n=C.length,n&&C.push(x);r<_;){for(f=y,a=0;a<_;++a)(d=t[a])>=e&&d<f&&(f=d);for(v=r+1,f-e>k((y-u)/v)&&i("overflow"),u+=(f-e)*v,e=f,a=0;a<_;++a)if(d=t[a],d<e&&++u>y&&i("overflow"),d==e){for(c=u,h=B;p=h<=o?g:h>=o+m?m:h-o,!(c<p);h+=B)E=c-p,F=B-p,C.push(j(D(p+E%F,0))),c=k(E/F);C.push(j(D(c,0))),o=l(u,v,r==n),u=0,++r}++u,++e}return C.join("")}function d(t){return a(t,function(t){return L.test(t)?h(t.slice(4).toLowerCase()):t})}function _(t){return a(t,function(t){return M.test(t)?"xn--"+p(t):t})}var v="object"==typeof n&&n&&!n.nodeType&&n,F="object"==typeof r&&r&&!r.nodeType&&r,E="object"==typeof e&&e;E.global!==E&&E.window!==E&&E.self!==E||(u=E);var C,A,y=2147483647,B=36,g=1,m=26,S=38,w=700,b=72,I=128,x="-",L=/^xn--/,M=/[^\x20-\x7E]/,z=/[\x2E\u3002\uFF0E\uFF61]/g,O={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},R=B-g,k=Math.floor,j=String.fromCharCode;if(C={version:"1.4.1",ucs2:{decode:s,encode:f},decode:h,encode:p,toASCII:_,toUnicode:d},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return C});else if(v&&F)if(r.exports==v)F.exports=C;else for(A in C)C.hasOwnProperty(A)&&(v[A]=C[A]);else u.punycode=C}(this)}).call(this,void 0!==e?e:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(t,e,u){e.exports=/[\u0608\u060B\u060D\u061B\u061C\u061E-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u08A0-\u08B4\u08B6-\u08BD\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]/},{}],3:[function(t,e,u){e.exports=/[\u0600-\u0605\u0660-\u0669\u066B\u066C\u06DD\u08E2]|\uD803[\uDE60-\uDE7E]/},{}],4:[function(t,e,u){e.exports=/[\0-\x08\x0E-\x1B\x7F-\x84\x86-\x9F\xAD\u180E\u200B-\u200D\u2060-\u2064\u206A-\u206F\uFEFF]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/},{}],5:[function(t,e,u){e.exports=/[,\.\/:\xA0\u060C\u202F\u2044\uFE50\uFE52\uFE55\uFF0C\uFF0E\uFF0F\uFF1A]/},{}],6:[function(t,e,u){e.exports=/[0-9\xB2\xB3\xB9\u06F0-\u06F9\u2070\u2074-\u2079\u2080-\u2089\u2488-\u249B\uFF10-\uFF19]|\uD800[\uDEE1-\uDEFB]|\uD835[\uDFCE-\uDFFF]|\uD83C[\uDD00-\uDD0A]/},{}],7:[function(t,e,u){e.exports=/[\+\-\u207A\u207B\u208A\u208B\u2212\uFB29\uFE62\uFE63\uFF0B\uFF0D]/},{}],8:[function(t,e,u){e.exports=/[#-%\xA2-\xA5\xB0\xB1\u058F\u0609\u060A\u066A\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u2030-\u2034\u20A0-\u20BE\u212E\u2213\uA838\uA839\uFE5F\uFE69\uFE6A\uFF03-\uFF05\uFFE0\uFFE1\uFFE5\uFFE6]/},{}],9:[function(t,e,u){e.exports=/\u2068/},{}],10:[function(t,e,u){e.exports=/[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0482\u048A-\u052F\u0531-\u0556\u0559-\u055F\u0561-\u0587\u0589\u0903-\u0939\u093B\u093D-\u0940\u0949-\u094C\u094E-\u0950\u0958-\u0961\u0964-\u0980\u0982\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C0\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09FA\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC0\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0\u0AE1\u0AE6-\u0AF0\u0AF9\u0B02\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C7F\u0C80\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D4F\u0D54-\u0D61\u0D66-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E4F-\u0E5B\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F17\u0F1A-\u0F34\u0F36\u0F38\u0F3E-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u1000-\u102C\u1031\u1038\u103B\u103C\u103F-\u1057\u105A-\u105D\u1061-\u1070\u1075-\u1081\u1083\u1084\u1087-\u108C\u108E-\u109C\u109E-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u167F\u1681-\u169A\u16A0-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1735\u1736\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5\u17C7\u17C8\u17D4-\u17DA\u17DC\u17E0-\u17E9\u1810-\u1819\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A19\u1A1A\u1A1E-\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1B04-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B4B\u1B50-\u1B6A\u1B74-\u1B7C\u1B82-\u1BA1\u1BA6\u1BA7\u1BAA\u1BAE-\u1BE5\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1BFC-\u1C2B\u1C34\u1C35\u1C3B-\u1C49\u1C4D-\u1C88\u1CC0-\u1CC7\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u302E\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31F0-\u321C\u3220-\u324F\u3260-\u327B\u327F-\u32B0\u32C0-\u32CB\u32D0-\u32FE\u3300-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA60C\uA610-\uA62B\uA640-\uA66E\uA680-\uA69D\uA6A0-\uA6EF\uA6F2-\uA6F7\uA722-\uA787\uA789-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA824\uA827\uA830-\uA837\uA840-\uA873\uA880-\uA8C3\uA8CE-\uA8D9\uA8F2-\uA8FD\uA900-\uA925\uA92E-\uA946\uA952\uA953\uA95F-\uA97C\uA983-\uA9B2\uA9B4\uA9B5\uA9BA\uA9BB\uA9BD-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA2F\uAA30\uAA33\uAA34\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA7B\uAA7D-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAAEB\uAAEE-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB65\uAB70-\uABE4\uABE6\uABE7\uABE9-\uABEC\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uE000-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD00\uDD02\uDD07-\uDD33\uDD37-\uDD3F\uDD8D\uDD8E\uDDD0-\uDDFC\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF23\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDF9F-\uDFC3\uDFC8-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD6F\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD804[\uDC00\uDC02-\uDC37\uDC47-\uDC4D\uDC66-\uDC6F\uDC82-\uDCB2\uDCB7\uDCB8\uDCBB-\uDCC1\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD2C\uDD36-\uDD43\uDD50-\uDD72\uDD74-\uDD76\uDD82-\uDDB5\uDDBF-\uDDC9\uDDCD\uDDD0-\uDDDF\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2E\uDE32\uDE33\uDE35\uDE38-\uDE3D\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9\uDEB0-\uDEDE\uDEE0-\uDEE2\uDEF0-\uDEF9\uDF02\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC37\uDC40\uDC41\uDC45\uDC47-\uDC59\uDC5B\uDC5D\uDC80-\uDCB2\uDCB9\uDCBB-\uDCBE\uDCC1\uDCC4-\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB1\uDDB8-\uDDBB\uDDBE\uDDC1-\uDDDB\uDE00-\uDE32\uDE3B\uDE3C\uDE3E\uDE41-\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEAC\uDEAE\uDEAF\uDEB6\uDEC0-\uDEC9\uDF00-\uDF19\uDF20\uDF21\uDF26\uDF30-\uDF3F]|\uD806[\uDCA0-\uDCF2\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2F\uDC3E-\uDC45\uDC50-\uDC6C\uDC70-\uDC8F\uDCA9\uDCB1\uDCB4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uDB80-\uDBBE\uDBC0-\uDBFE][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE6E\uDE6F\uDED0-\uDEED\uDEF5\uDF00-\uDF2F\uDF37-\uDF45\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9C\uDC9F]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD66\uDD6A-\uDD72\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEDA\uDEDC-\uDF14\uDF16-\uDF4E\uDF50-\uDF88\uDF8A-\uDFC2\uDFC4-\uDFCB]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B]|\uD83C[\uDD10-\uDD2E\uDD30-\uDD69\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|[\uDBBF\uDBFF][\uDC00-\uDFFD]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/},{}],11:[function(t,e,u){e.exports=/\u202A/},{}],12:[function(t,e,u){e.exports=/\u2066/},{}],13:[function(t,e,u){e.exports=/\u202D/},{}],14:[function(t,e,u){e.exports=/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/},{}],15:[function(t,e,u){e.exports=/[!"&-\*;-@\[-`\{-~\xA1\xA6-\xA9\xAB\xAC\xAE\xAF\xB4\xB6-\xB8\xBB-\xBF\xD7\xF7\u02B9\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u02FF\u0374\u0375\u037E\u0384\u0385\u0387\u03F6\u058A\u058D\u058E\u0606\u0607\u060E\u060F\u06DE\u06E9\u07F6-\u07F9\u0BF3-\u0BF8\u0BFA\u0C78-\u0C7E\u0F3A-\u0F3D\u1390-\u1399\u1400\u169B\u169C\u17F0-\u17F9\u1800-\u180A\u1940\u1944\u1945\u19DE-\u19FF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2010-\u2027\u2035-\u2043\u2045-\u205E\u207C-\u207E\u208C-\u208E\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u213A\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189-\u218B\u2190-\u2211\u2214-\u2335\u237B-\u2394\u2396-\u23FE\u2400-\u2426\u2440-\u244A\u2460-\u2487\u24EA-\u26AB\u26AD-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2CF9-\u2CFF\u2E00-\u2E44\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u31C0-\u31E3\u321D\u321E\u3250-\u325F\u327C-\u327E\u32B1-\u32BF\u32CC-\u32CF\u3377-\u337A\u33DE\u33DF\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA60D-\uA60F\uA673\uA67E\uA67F\uA700-\uA721\uA788\uA828-\uA82B\uA874-\uA877\uFD3E\uFD3F\uFDFD\uFE10-\uFE19\uFE30-\uFE4F\uFE51\uFE54\uFE56-\uFE5E\uFE60\uFE61\uFE64-\uFE66\uFE68\uFE6B\uFF01\uFF02\uFF06-\uFF0A\uFF1B-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE2-\uFFE4\uFFE8-\uFFEE\uFFF9-\uFFFD]|\uD800[\uDD01\uDD40-\uDD8C\uDD90-\uDD9B\uDDA0]|\uD802[\uDD1F\uDF39-\uDF3F]|\uD804[\uDC52-\uDC65]|\uD805[\uDE60-\uDE6C]|\uD834[\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEDB\uDF15\uDF4F\uDF89\uDFC3]|\uD83B[\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0B\uDD0C\uDD6A\uDD6B\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]/},{}],16:[function(t,e,u){e.exports=/[\n\r\x1C-\x1E\x85\u2029]/},{}],17:[function(t,e,u){e.exports=/\u202C/},{}],18:[function(t,e,u){e.exports=/\u2069/},{}],19:[function(t,e,u){e.exports=/[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05F0-\u05F4\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC57-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD3F\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE40-\uDE47\uDE50-\uDE58\uDE60-\uDE9F\uDEC0-\uDEE4\uDEEB-\uDEF6\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD50-\uDD59\uDD5E\uDD5F]/},{}],20:[function(t,e,u){e.exports=/\u202B/},{}],21:[function(t,e,u){e.exports=/\u2067/},{}],22:[function(t,e,u){e.exports=/\u202E/},{}],23:[function(t,e,u){e.exports=/[\t\x0B\x1F]/},{}],24:[function(t,e,u){e.exports=/[\f \u1680\u2000-\u200A\u2028\u205F\u3000]/},{}],25:[function(t,e,u){"use strict";function r(t){var e,u=w.ucs2.encode([t]);for(e in b)if(!0===b[e].test(u))return e}var n=t("unicode-9.0.0/Bidi_Class/Arabic_Letter/regex"),i=t("unicode-9.0.0/Bidi_Class/Arabic_Number/regex"),o=t("unicode-9.0.0/Bidi_Class/Boundary_Neutral/regex"),a=t("unicode-9.0.0/Bidi_Class/Common_Separator/regex"),s=t("unicode-9.0.0/Bidi_Class/European_Number/regex"),f=t("unicode-9.0.0/Bidi_Class/European_Separator/regex"),c=t("unicode-9.0.0/Bidi_Class/European_Terminator/regex"),D=t("unicode-9.0.0/Bidi_Class/First_Strong_Isolate/regex"),l=t("unicode-9.0.0/Bidi_Class/Left_To_Right/regex"),h=t("unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/regex"),p=t("unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/regex"),d=t("unicode-9.0.0/Bidi_Class/Left_To_Right_Override/regex"),_=t("unicode-9.0.0/Bidi_Class/Nonspacing_Mark/regex"),v=t("unicode-9.0.0/Bidi_Class/Other_Neutral/regex"),F=t("unicode-9.0.0/Bidi_Class/Paragraph_Separator/regex"),E=t("unicode-9.0.0/Bidi_Class/Pop_Directional_Format/regex"),C=t("unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/regex"),A=t("unicode-9.0.0/Bidi_Class/Right_To_Left/regex"),y=t("unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/regex"),B=t("unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/regex"),g=t("unicode-9.0.0/Bidi_Class/Right_To_Left_Override/regex"),m=t("unicode-9.0.0/Bidi_Class/Segment_Separator/regex"),S=t("unicode-9.0.0/Bidi_Class/White_Space/regex"),w=t("punycode"),b={AL:n,AN:i,BN:o,CS:a,EN:s,ES:f,ET:c,FSI:D,L:l,LRE:h,LRI:p,LRO:d,NSM:_,ON:v,B:F,PDF:E,PDI:C,R:A,RLE:y,RLI:B,RLO:g,S:m,WS:S};e.exports=r},{punycode:1,"unicode-9.0.0/Bidi_Class/Arabic_Letter/regex":2,"unicode-9.0.0/Bidi_Class/Arabic_Number/regex":3,"unicode-9.0.0/Bidi_Class/Boundary_Neutral/regex":4,"unicode-9.0.0/Bidi_Class/Common_Separator/regex":5,"unicode-9.0.0/Bidi_Class/European_Number/regex":6,"unicode-9.0.0/Bidi_Class/European_Separator/regex":7,"unicode-9.0.0/Bidi_Class/European_Terminator/regex":8,"unicode-9.0.0/Bidi_Class/First_Strong_Isolate/regex":9,"unicode-9.0.0/Bidi_Class/Left_To_Right/regex":10,"unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/regex":11,"unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/regex":12,"unicode-9.0.0/Bidi_Class/Left_To_Right_Override/regex":13,"unicode-9.0.0/Bidi_Class/Nonspacing_Mark/regex":14,"unicode-9.0.0/Bidi_Class/Other_Neutral/regex":15,"unicode-9.0.0/Bidi_Class/Paragraph_Separator/regex":16,"unicode-9.0.0/Bidi_Class/Pop_Directional_Format/regex":17,"unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/regex":18,"unicode-9.0.0/Bidi_Class/Right_To_Left/regex":19,"unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/regex":20,"unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/regex":21,"unicode-9.0.0/Bidi_Class/Right_To_Left_Override/regex":22,"unicode-9.0.0/Bidi_Class/Segment_Separator/regex":23,"unicode-9.0.0/Bidi_Class/White_Space/regex":24}]},{},[25])(25)})}).call(e,u(5))},function(t,e,u){(function(t,r){var n;!function(i){function o(t){throw new RangeError(M[t])}function a(t,e){for(var u=t.length,r=[];u--;)r[u]=e(t[u]);return r}function s(t,e){var u=t.split("@"),r="";return u.length>1&&(r=u[0]+"@",t=u[1]),t=t.replace(L,"."),r+a(t.split("."),e).join(".")}function f(t){for(var e,u,r=[],n=0,i=t.length;n<i;)e=t.charCodeAt(n++),e>=55296&&e<=56319&&n<i?(u=t.charCodeAt(n++),56320==(64512&u)?r.push(((1023&e)<<10)+(1023&u)+65536):(r.push(e),n--)):r.push(e);return r}function c(t){return a(t,function(t){var e="";return t>65535&&(t-=65536,e+=R(t>>>10&1023|55296),t=56320|1023&t),e+=R(t)}).join("")}function D(t){return t-48<10?t-22:t-65<26?t-65:t-97<26?t-97:A}function l(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function h(t,e,u){var r=0;for(t=u?O(t/m):t>>1,t+=O(t/e);t>z*B>>1;r+=A)t=O(t/z);return O(r+(z+1)*t/(t+g))}function p(t){var e,u,r,n,i,a,s,f,l,p,d=[],_=t.length,v=0,F=w,E=S;for(u=t.lastIndexOf(b),u<0&&(u=0),r=0;r<u;++r)t.charCodeAt(r)>=128&&o("not-basic"),d.push(t.charCodeAt(r));for(n=u>0?u+1:0;n<_;){for(i=v,a=1,s=A;n>=_&&o("invalid-input"),f=D(t.charCodeAt(n++)),(f>=A||f>O((C-v)/a))&&o("overflow"),v+=f*a,l=s<=E?y:s>=E+B?B:s-E,!(f<l);s+=A)p=A-l,a>O(C/p)&&o("overflow"),a*=p;e=d.length+1,E=h(v-i,e,0==i),O(v/e)>C-F&&o("overflow"),F+=O(v/e),v%=e,d.splice(v++,0,F)}return c(d)}function d(t){var e,u,r,n,i,a,s,c,D,p,d,_,v,F,E,g=[];for(t=f(t),_=t.length,e=w,u=0,i=S,a=0;a<_;++a)(d=t[a])<128&&g.push(R(d));for(r=n=g.length,n&&g.push(b);r<_;){for(s=C,a=0;a<_;++a)(d=t[a])>=e&&d<s&&(s=d);for(v=r+1,s-e>O((C-u)/v)&&o("overflow"),u+=(s-e)*v,e=s,a=0;a<_;++a)if(d=t[a],d<e&&++u>C&&o("overflow"),d==e){for(c=u,D=A;p=D<=i?y:D>=i+B?B:D-i,!(c<p);D+=A)E=c-p,F=A-p,g.push(R(l(p+E%F,0))),c=O(E/F);g.push(R(l(c,0))),i=h(u,v,r==n),u=0,++r}++u,++e}return g.join("")}function _(t){return s(t,function(t){return I.test(t)?p(t.slice(4).toLowerCase()):t})}function v(t){return s(t,function(t){return x.test(t)?"xn--"+d(t):t})}var F=("object"==typeof e&&e&&e.nodeType,"object"==typeof t&&t&&t.nodeType,"object"==typeof r&&r);var E,C=2147483647,A=36,y=1,B=26,g=38,m=700,S=72,w=128,b="-",I=/^xn--/,x=/[^\x20-\x7E]/,L=/[\x2E\u3002\uFF0E\uFF61]/g,M={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},z=A-y,O=Math.floor,R=String.fromCharCode;E={version:"1.4.1",ucs2:{decode:f,encode:c},decode:p,encode:d,toASCII:v,toUnicode:_},void 0!==(n=function(){return E}.call(e,u,e,t))&&(t.exports=n)}()}).call(e,u(52)(t),u(5))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,u){"use strict";function r(t,e){return t.map(function(t,u){var r=i.default.get(t),n=void 0!==r,o=e.get(u)%2==1;return n&&o?r.charCodeAt(0):t})}Object.defineProperty(e,"__esModule",{value:!0});var n=u(16),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=r}])});

// localizationManager.js
var LocalizationManager = pc.createScript('localizationManager');

LocalizationManager.attributes.add('autoDetectLanguage', {
    type: 'boolean',
    default: true
});

LocalizationManager._currentLocale = null;

LocalizationManager.getInstance = function () {
    if (!LocalizationManager._instance) throw new Error('LocalizationManager is not initialized yet');
    return LocalizationManager._instance;
};


LocalizationManager.prototype.initialize = function () {
    LocalizationManager._app = this.app;
    if (!LocalizationManager._instance) {
        LocalizationManager._instance = this;
    }
};

LocalizationManager.prototype.postInitialize = function () {
    this.detectAndSetBrowserLanguage();
};

LocalizationManager.prototype.addJSON = function (json) {
    if (json) {
        this.app.i18n.addData(json);
    }
};

LocalizationManager.prototype.detectAndSetBrowserLanguage = function () {
    if (this.autoDetectLanguage) {
        const urlParams = new URLSearchParams(window.location.search);
        const forcedLanguage = urlParams.get('language');

        if (forcedLanguage) {
            this._setCurrentLocale(this.app.i18n.findAvailableLocale(forcedLanguage));
        } else {

            const shortLocaleCode = (window.location.search || "").replace('?', '');
            if (shortLocaleCode && shortLocaleCode.length < 7) {
                this._setCurrentLocale(this.app.i18n.findAvailableLocale(shortLocaleCode));
            } else {
                const browserLanguage = LocalizationManager.getClientLanguage();
                console.log('Browser language: ' + browserLanguage);
                this._setCurrentLocale(this.app.i18n.findAvailableLocale(browserLanguage));
            }
        }
    }
};


LocalizationManager.prototype.update = function (dt) {

};

LocalizationManager.prototype.changeLocale = function (locale) {
    const closestLocale = this.app.i18n.findAvailableLocale(locale);
    if (closestLocale !== this.app.i18n.locale) {
        this._setCurrentLocale(closestLocale, true);
    }
}


LocalizationManager.prototype._setCurrentLocale = async function (locale, showLoadingOverlay = false) {
    LocalizationManager._currentLocale = locale;
    this.app.i18n.locale = LocalizationManager._currentLocale;
    this.app.fire('app:changeLocale', this.app.i18n.locale);
    console.log('Locale set to ' + this.app.i18n.locale);

    this.app.fire(EventTypes.CHANGE_KEYBOARD, locale);

    if(showLoadingOverlay) LoadingOverlay.show({ color: '#000000', transitionDuration: 0 });
    await QuestionsManager.getInstance().loadLocalizedQuestions(locale);
    if(showLoadingOverlay) LoadingOverlay.hide({ color: '#000000' });
};




LocalizationManager.prototype.getCurrentLocale = function () {
    return LocalizationManager._currentLocale;
};

LocalizationManager.prototype.getCountryCode = function () {
    return this.getCurrentLocale().substr(0, 2);
};


LocalizationManager.prototype.getLocalizedText = function (textKey, ...replaceParams) {
    let text = this.app.i18n.getText(textKey, this.getCurrentLocale());
    for (let i = 0; i < replaceParams.length; i++) {
        text = text.replace(`{${i}}`, replaceParams[i]);
    }
    return text;
};

LocalizationManager.prototype.getPlayerNames = function () {
    return LocalizationManager.getInstance().getLocalizedText(`PLAYER_NAMES`).split(',')
};

LocalizationManager.prototype.getCityNames = function () {
    return LocalizationManager.getInstance().getLocalizedText(`CITY_NAMES`).split(',')
};


LocalizationManager.prototype.getCharactersList = async function (...locales) {
    const baseChars = `!"#\$%&'()*+,-0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯЇабвгдеєжзиіїйклмнопрстуфхцчшщьюяїЁё¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`;
    const allCharacters = new Set(baseChars.split(''));
    const promises = [];

   

    const parseLocaleSymbols = async locale =>  {
        const localeFileName = this.app.i18n.findAvailableLocale(locale);
        const localeFile = this.app.assets.find(localeFileName, 'json');
        if (!localeFile) {
            console.warn('No locale file for ' + locale);
            return;
        }

        localeFile.resource.data.forEach(item => {
            Object.keys(item.messages).forEach(key => {
                const string = item.messages[key];
                string.split('').forEach(char => allCharacters.add(char));
            });
        });

        const questionsFileName = 'Questions_' + locale + '.csv';
        console.log('Loading questions file ' + locale + '...');
        const questionData = await QuestionsManager.getInstance()._loadQuestionsFile(questionsFileName);
        console.log('File for ' + localeFileName + ': ', localeFile + ' questions: ' + questionsFileName);

        questionData.split('').forEach(char => allCharacters.add(char));
    };

    for(let locale of locales) {
        promises.push(parseLocaleSymbols(locale));
    }
    
    await Promise.all(promises);

    console.log(Array.from(allCharacters).sort().join(''));
};

/* Static */

LocalizationManager.getClientLanguage = function () {
    const browserLanguage = navigator.language || "en-US";
    return browserLanguage;
};



// CanvasFontHelper.js
var CanvasFontHelper = pc.createScript('canvasFontHelper');

CanvasFontHelper.attributes.add('fontAssets', {
    type: 'json',
    array: true,
    schema: [{
        name: 'name',
        type: 'string',
        description: 'Name for the font face for the canvas font to reference'
    }, {
        name: 'asset',
        type: 'asset',
        assetType: 'binary',
        description: 'Font asset'
    }]
});



CanvasFontHelper.attributes.add('canvasFonts', {
    type: 'json', 
    array: true,
    schema: [{
        name: 'assetName',
        type: 'string',
        default: 'Arial Canvas Font White',
        description: 'If possible, keep this unique to make this easy to find in the assets registry!'
    }, {
        name: 'fontFaces',
        type: 'string',
        default: 'Arial',
        description: 'This has to be written as though it was in a CSS file (https://www.w3schools.com/cssref/pr_font_font-family.asp)'      
    }, {
        name: 'textureSize', 
        type: 'vec2', 
        default: [2048, 2048],
        description: 'The larger the size, the more VRAM is used. More textures are created to fit the glyphs as the canvas font is updated'
    }, {
        name: 'fontSize', 
        type: 'number',
        default: 64,
        description: 'The larger the size, the sharper the glyph but the more space it takes up on the texture'
    }, {
        name: 'padding', 
        type: 'number',
        default: 0,
        description: 'Glyph padding, try to keep it reasonably small (~1/4 of font size)'
    },  {
        name: 'color',
        type: 'rgb',
        default: [1, 1, 1]
    }]
});

// initialize code called once per entity
CanvasFontHelper.prototype.initialize = function() {
    var self = this;
    var app = this.app;
    var i;
    
    // Create the canvas font assets
    for (i = 0; i < this.canvasFonts.length; ++i) {
        var canvasFont = this.canvasFonts[i];
        canvasFont.asset = new pc.Asset(canvasFont.assetName, 'font', {});
        app.assets.add(canvasFont.asset);
        canvasFont.asset.loaded = false;
    }

    // Load the font files
    var fontsLoadedCount = 0;
    var fontsFacesAdded = [];
    
    for (i = 0; i < this.fontAssets.length; ++i) {
        // Fontface API not supported in IE 11
        var fontAsset = this.fontAssets[i];
        var font = new FontFace(fontAsset.name, 'url(' + fontAsset.asset.getFileUrl() + ')');  
        font.load().then((loadedFace) => {
            document.fonts.add(loadedFace);    
            fontsFacesAdded.push(loadedFace);
            fontsLoadedCount += 1;
            
            if (fontsLoadedCount == self.fontAssets.length) {
                self._onFontFacesLoaded();
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    // Remove the fonts and canvas fonts when this script is destroyed
       
    // Cleanup if destroyed
    this.on('destroy', function () {
        var i;
        
        for (i = 0; i < fontsFacesAdded.length; ++i) {
            document.fonts.delete(fontsFacesAdded[i]);
        }
        
        for (i = 0; i < this.canvasFonts.length; ++i) {
            var canvasFont = this.canvasFonts[i];
            canvasFont.asset.resource.destroy();
            app.assets.remove(canvasFont.asset);
        }
    }, this);
};


CanvasFontHelper.prototype._onFontFacesLoaded = function () {
    for (var i = 0; i < this.canvasFonts.length; ++i) {
        var canvasFont = this.canvasFonts[i];
        
        var cf = new pc.CanvasFont(this.app, {
            color: canvasFont.color,
            fontName: canvasFont.fontFaces, // Font has to be added as a font face or exist already on the user's PC
            fontSize: canvasFont.fontSize,
            width: canvasFont.textureSize.x,
            height: canvasFont.textureSize.y,
            padding: canvasFont.padding,
            getCharScale: function (code) {
                // Finger pointing up and rainbow
                if (code === 0x261D || code === 0x1F308) {
                    return 0.8;
                }

                return -1; // use default scale
            }
        });

        canvasFont.asset.resource = cf;

        // Create the textures first
        cf.createTextures(' ');
        canvasFont.asset.loaded = true;
        canvasFont.asset.fire('load', canvasFont.asset);
    }
};


/** Inject Text Element helpers */
const _setTextOriginal = pc.TextElement.prototype._setText;

pc.TextElement.prototype._setText = function() {
    this._entity.fire('bitmaptext:render',  ...arguments);
    _setTextOriginal.call(this, ...arguments);
};

// BitmapText.js
var BitmapText = pc.createScript('bitmapText');


BitmapText.attributes.add('fontAssetName', { 
    type: 'string',
    default: 'Booster Next FY Black'
});


BitmapText.prototype.initialize = function () {
    this.entity.__useBitmapFontRenderer__ = true;
    this.initialString = this.entity.element.key || this.entity.element.text;
    this.initialKey = this.entity.element.key;

    if(this.entity.element) {
        this.entity.element.rtlReorder = true;
        this.entity.element.unicodeConverter = true;
    }

    this.on('destroy', this._destroy, this);
};


BitmapText.prototype.postInitialize = function () {
    this._canvasFontAsset = this.app.assets.find(this.fontAssetName);

    if (this._canvasFontAsset == null) {
        console.warn("Can't find font asset: " + this.fontAssetName + ' on ' + this.entity.path);
    } else {
        if (this._canvasFontAsset.loaded) {
            this._onCanvasFontAssetLoaded(this._canvasFontAsset);
        } else {
            this._canvasFontAsset.ready(this._onCanvasFontAssetLoaded, this);
        }
    }
};


BitmapText.prototype._onCanvasFontAssetLoaded = function (asset) {
    this.entity.element.fontAsset = this._canvasFontAsset;
    this.entity.on('bitmaptext:render', this._renderText, this);
    this._updateText(this.entity.element.text);
};


BitmapText.prototype._updateText = function (text) {
    if(!this._canvasFontAsset) return console.error('Asset not loaded: ', this.entity.path);
    if (this._canvasFontAsset.loaded) {
        this._canvasFontAsset.resource.updateTextures(text);
        this.entity.element.text = text;
    } else {
        this.initialString = text;
    }
};

BitmapText.prototype._renderText = function (text) {
    if (this._canvasFontAsset.loaded) {
        this._lastLocale = this.app.i18n.locale;
        this._canvasFontAsset.resource.updateTextures(text);
    }
};



BitmapText.prototype.update = function (dt) {
    if(this.entity.element.key || this.initialKey) {
        if(this.app.i18n.locale !== this._lastLocale) {
            this._updateText(this.app.i18n.getText(this.entity.element.key || this.initialKey));   
        }
    }
};



BitmapText.prototype._destroy = function() {
    this.entity.off('bitmaptext:render', this._renderText, this);
}

// TemplateManager.js
var TemplateManager = pc.createScript('templateManager');

TemplateManager.getInstance = function () {
    if (!TemplateManager._instance) console.error('TemplateManager is not initialized yet');
    return TemplateManager._instance;
};

TemplateManager.prototype.initialize = function () {
    TemplateManager._app = this.app;
    if (!TemplateManager._instance) {
        TemplateManager._instance = this;
    }

    this.templateAssets = new Map();
};

TemplateManager.prototype.instantiate = function (templateKey) {
    const template = this.templateAssets.get(templateKey);
    if (template) {
        return template.resource.instantiate();
    } else {
        const templateAsset = this.app.assets.find(templateKey, 'template');
        if (templateAsset) {
            this.templateAssets.set(templateKey, templateAsset);
            if (!templateAsset.resource) {
                console.warn(`No resource in template '${templateAsset.name}'`);
            }
            return templateAsset.resource.instantiate();
        } else {
            console.error('No template "' + templateKey + '" in library!');
        }
    }
};


TemplateManager.prototype.update = function (dt) {

};

// AssetsLoader.js
/* jshint esversion: 6 */
var AssetsLoader = pc.createScript('assetsLoader');

AssetsLoader.attributes.add('debugOutput', {
    type: 'boolean',
    default: false
});

AssetsLoader.getInstance = function () {
    if (!AssetsLoader._instance) console.error('AssetsLoader is not initialized yet');
    return AssetsLoader._instance;
};


AssetsLoader.prototype.initialize = function () {
    AssetsLoader._app = this.app;
    if (!AssetsLoader._instance) {
        AssetsLoader._instance = this;
    }

    /* init variables */
    this.pendingAssets = [];
    this.numAssetsLoaded = 0;
    this.totalAssetsInQueue = 0;
};

AssetsLoader.prototype.update = function (dt) {

};


AssetsLoader.prototype.loadAsset = function (asset) {
    return new Promise((resolve, reject) => {

        if (asset.loaded) {
            resolve(asset);
            return;
        }

        asset.once('load', () => {
            this.app.fire(EventTypes.ASSETS_LOADER_ASSET_LOADED, asset);
            resolve(asset);
        });

        asset.once('error', () => {
            console.warn('failed to load ' + asset.id + ' ' + asset.name);
            this.app.fire(EventTypes.ASSETS_LOADER_ASSET_FAILED, asset);
            reject('an error occurred during asset ' + asset.id + ' (' + assetName + ') loading');
        });

        this.app.assets.load(asset);
    });
};


AssetsLoader.prototype.loadAssetByName = function (assetName, assetType) {
    const asset = this.app.assets.find(assetName, assetType);
    if (!asset) {
        return Pormise.reject(`Asset '${assetName}' not found in the app library!`);
    }

    return this.loadAsset(asset);
};



AssetsLoader.prototype.loadAssets = function (assetsList) {
    return new Promise((resolve, reject) => {

        let pendingAssets = assetsList.filter(a => !a.loaded);
        let totalAssetsInQueue = pendingAssets.length;
        let numAssetsLoaded = 0;

        if(this.debugOutput) console.log(`Preloading ${pendingAssets.length} assets ...`);
        this.app.fire(EventTypes.ASSETS_LOADER_STARTED_LOADING, totalAssetsInQueue);

        const handleAsset = asset => {
            const assetIndex = pendingAssets.indexOf(asset);
            if (assetIndex !== -1) {
                numAssetsLoaded += 1;
            }
            this.app.fire(EventTypes.ASSETS_LOADER_PROGRESS, numAssetsLoaded / totalAssetsInQueue);
        };

        this.app.on(EventTypes.ASSETS_LOADER_ASSET_LOADED, handleAsset);
        this.app.on(EventTypes.ASSETS_LOADER_ASSET_FAILED, handleAsset);

        const promises = pendingAssets.map(asset => this.loadAsset(asset));

        Promise.all(promises).then((result) => {
            if(this.debugOutput) console.log('Assets have finished loading ', pendingAssets.map(a => a.name));
            this.app.fire(EventTypes.ASSETS_LOADER_COMPLETE);
            resolve();
        }).catch(error => {
            if(this.debugOutput) console.log('All the assets have finished loading, however some failed ', pendingAssets.map(a => [a.name, a.loaded]));
            this.app.fire(EventTypes.ASSETS_LOADER_COMPLETE);
            reject(error);
        }).finally(result => {
            this.app.off(EventTypes.ASSETS_LOADER_ASSET_LOADED, handleAsset);
            this.app.off(EventTypes.ASSETS_LOADER_ASSET_FAILED, handleAsset);
        });
    });
};



AssetsLoader.prototype.loadByTag = function (...tags) {
    return this.loadAssets(this.app.assets.findByTag(...tags));
};

AssetsLoader.prototype.getAssetsByTag = function (...tags) {
    return this.app.assets.findByTag(...tags);
};


AssetsLoader.prototype.loadByTagWithLoadingOverlay = function(assetTagsList, config) {
    if(typeof assetTagsList === 'string') assetTagsList = [assetTagsList];

    const {postDelay = 0, color = "#000000"} = config;

    return new Promise((resolve, reject) => {
        const assetsList = AssetsLoader.getInstance().getAssetsByTag(...assetTagsList);

        if (assetsList.length > 0) {
            LoadingOverlay.show({color});
            AssetsLoader.getInstance().loadAssets(assetsList).then(result => {

            }).catch(error => {
                console.warn('asset loading error', error)
            }).finally(() => {
                Utils.wait(postDelay).then(() => {
                    LoadingOverlay.hide({color});
                });
                resolve();
            })
        } else {
            resolve();
        }
    });
}


AssetsLoader.prototype.loadPendingAssets = function () {
    return this.loadAssets(this.app.assets.filter(asset => asset.loading));
};


AssetsLoader.prototype.loadNotLoadedAssets = function () {
    return this.loadAssets(this.app.assets.filter(asset => !asset.loaded));
};


// LoadingOverlay.js
var LoadingOverlay = pc.createScript('loadingOverlay');


LoadingOverlay.show = function (config = {}) {
    return new Promise((resolve, reject) => {
        const displayLoadingAnimation = typeof config.displayLoadingAnimation !== 'undefined' ? config.displayLoadingAnimation : true;
        const color = typeof config.color !== 'undefined' ? config.color : '#000000';
        const transitionDuration = Math.max(0.001, typeof config.transitionDuration !== 'undefined' ? config.transitionDuration : 0.2);

        const preloader = document.querySelector("#preloader");
        if (!preloader) return;

        const preloaderAnimation = document.querySelector("#preloaderAnimation");
        if (preloaderAnimation) preloaderAnimation.style.display = displayLoadingAnimation ? 'block' : 'none';

        preloader.style.background = color;

        document.documentElement.style.setProperty('--preloader-transition-duration', transitionDuration + 's');


        function onTransitionEnd() {
            preloader.removeEventListener('transitionend', onTransitionEnd);
            resolve();
        }
        if(transitionDuration > 0) preloader.addEventListener('transitionend', onTransitionEnd, false)
            else setTimeout(() => resolve(), 0);

        if (preloader.classList.contains('preloader-hidden')) preloader.classList.remove('preloader-hidden');
        if (!preloader.classList.contains('preloader-visible')) preloader.classList.add('preloader-visible');

    })

};

LoadingOverlay.hide = function (config = {}) {
    return new Promise((resolve, reject) => {

        const transitionDuration = Math.max(0.001, typeof config.transitionDuration !== 'undefined' ? config.transitionDuration : 0.2);

        const preloader = document.querySelector("#preloader");
        if (!preloader) return;

        if (typeof config.color !== 'undefined') preloader.style.background = config.color;
        document.documentElement.style.setProperty('--preloader-transition-duration', transitionDuration + 's');

        const preloaderAnimation = document.querySelector("#preloaderAnimation");
        if (preloaderAnimation) preloaderAnimation.style.display = 'none';


        if (preloader.classList.contains('preloader-visible')) preloader.classList.remove('preloader-visible');
        if (!preloader.classList.contains('preloader-hidden')) preloader.classList.add('preloader-hidden');
        
        function onTransitionEnd() {
            preloader.removeEventListener('transitionend', onTransitionEnd);
            resolve();
        }
        if(transitionDuration > 0) setTimeout(() => preloader.addEventListener('transitionend', onTransitionEnd, false), 0);
            else setTimeout(() => resolve(), 0);
    });
};

LoadingOverlay.transition = async function (inConfig, outConfig) {
    await LoadingOverlay.show(inConfig);
    await LoadingOverlay.hide(outConfig);
    return Promise.resolve(true);
}


// WaitingScreen.js
var WaitingScreen = pc.createScript('waitingScreen');

WaitingScreen.attributes.add('opacity', {
    type: 'number',
    default: 0.925,
    min: 0,
    max: 1
});

WaitingScreen.getInstance = function () {
    if (!WaitingScreen._instance) console.error('WaitingScreen is not initialized yet');
    return WaitingScreen._instance;
};


WaitingScreen.prototype.initialize = function () {
    WaitingScreen._app = this.app;
    if (!WaitingScreen._instance) {
        WaitingScreen._instance = this;
    }

    this.hourglassIcon = this.entity.findByName('Hourglass');
};


WaitingScreen.prototype.update = function (dt) {

};

WaitingScreen.prototype.show = function (config = {}) {
    const duration = config.duration || 0;
    const onCompleteCallback = config.callback || undefined;


    return new Promise((resolve, reject) => {
        this._resetActiveTween();

        this.entity.enabled = true;

        if (duration > 0) {
            this.entity.element.opacity = 0.0;
            this.transitionTween = this.entity
                .tween(this.entity.element)
                .to({ opacity: this.opacity }, duration, pc.Linear)
                .onComplete(() => {
                    if (onCompleteCallback) onCompleteCallback();
                })
                .start();
            this.hourglassIcon.element.opacity = 0;
            this.iconTween = this.hourglassIcon
                .tween(this.hourglassIcon.element)
                .to({ opacity: 1 }, duration, pc.SineOut)
                .start();
        } else {
            this.entity.element.opacity = this.opacity;
            this.hourglassIcon.element.opacity = 1;
            if (onCompleteCallback) onCompleteCallback();
        }
    });

};



WaitingScreen.prototype.hide = function (config = {}) {
    const duration = config.duration || 0;
    const onCompleteCallback = config.callback || undefined;

    return new Promise((resolve, reject) => {
        this._resetActiveTween();

        if (duration > 0) {

            this.entity.element.opacity = this.opacity;
            this.transitionTween = this.entity
                .tween(this.entity.element)
                .to({ opacity: 0 }, duration, pc.SineOut)
                .onComplete(() => {
                    this.entity.enabled = false;
                    if (onCompleteCallback) onCompleteCallback();
                })
                .start();
            this.iconTween = this.hourglassIcon
                .tween(this.hourglassIcon.element)
                .to({ opacity: 0 }, duration, pc.SineOut)
                .start();
        } else {
            this.entity.enabled = false;
            if (onCompleteCallback) onCompleteCallback();
            
        }

    });
};

WaitingScreen.prototype._resetActiveTween = function () {
    if (this.transitionTween && this.transitionTween.playing) {
        this.transitionTween.stop();
    }
    this.transitionTween = null;
    if (this.iconTween && this.iconTween.playing) {
        this.iconTween.stop();
    }
    this.iconTween = null;
};

// autoIntializeScreen.js
var AutoIntializeScreen = pc.createScript('autoIntializeScreen');

AutoIntializeScreen.prototype.initialize = function() {

};

AutoIntializeScreen.prototype.postInitialize = function () {
    if(this.entity.tags.has('auto-initialize')) {
        this.entity.enabled = false;
    }
};

AutoIntializeScreen.prototype.update = function(dt) {

};


// Screen_MainMenu.js
class ScreenMainMenu extends BaseWindow {

    initialize() {
        super.initialize();

        this.menuViewMode = Constants.MAIN_MENU_VIEW_MODE.DEFAULT;

        this.logoBanner = this.entity.findByName('LogoBanner');
        this._logoBannerInitialPosition = this.logoBanner.getLocalPosition().clone();

        this.tournamentBanner = this.entity.findByName('TournamentBanner');
        this._tournamentBannerTopPosition = this.tournamentBanner.getLocalPosition().clone();
        this._tournamentBannerMenuPosition = this._tournamentBannerTopPosition.clone().add(new pc.Vec3(0, -175, 0));


        this.playButtonContainer = this.entity.findByName('PlayButtonContainer');
        this.buttonPlay = this.playButtonContainer.findByName('PlayButton');

        this.joinButtonContainer = this.entity.findByName('JoinButtonContainer');
        this.buttonJoin = this.joinButtonContainer.findByName('JoinButton');

        this.tournamentVictoryContainer = this.entity.findByName('TournamentVictoryContainer');
        this.tournamentVinnerName = this.entity.findByName('WinnerPlayerName');

        this.playerNamePanel = this.entity.findByName('UsernamePanel');
        this.usernameText = this.playerNamePanel.findByName('UsernameText');
        this.remainingContainer = this.entity.findByName('RemainingContainer');
        this.remainingAmountText = this.remainingContainer.findByName('RemainingAmountText');
        this.tapToContinueContainer = this.entity.findByName('TapToContinueContainer');
        this.butonTapToContinue = this.tapToContinueContainer.findByName('TapToContinueButton');
        this.searchingOpponentsContainer = this.entity.findByName('SearchingOpponentsContainer');
        this.searchProgressText = this.searchingOpponentsContainer.findByName('SearchProgressText');
        this.buttonSettings = this.entity.findByName('ButtonSettings');
        this.dailyChallengeContainer = this.entity.findByName('DailyChallengeContainer');
        this.buttonDailyChallenge = this.entity.findByName('DailyChallengeButton');
        this.dailyChallengeNotification = this.buttonDailyChallenge.findByName('NotificationCircle');
        this.buttonDailyChallengeInactive = this.entity.findByName('DailyChallengeButtonInactive');
        this.dailyChallengeCooldownText = this.buttonDailyChallengeInactive.findByName('CooldownText');
        this.buttonShop = this.entity.findByName('ShopButton');
        this.shopNotification = this.buttonShop.findByName('NotificationCircle');
        this.currencyCounter = this.entity.findByName('CurrencyCounterLarge');

        this.tournamentVictoryParticles = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentVictoryParticles');
        this.tournamentVictoryParticles.enabled = false;

        this._dailyChallengeButtonVisible = false;
        this._opponentsSearchCompleted = false;

        this.app.on(EventTypes.SET_MAIN_MENU_VIEW_MODE, this._setMenuViewMode, this);
        this.app.on(EventTypes.SET_TOURNAMENT_SEARCH_PROGRESS, this._setSearchProgress, this);
        this.app.on(EventTypes.SET_TOURNAMENT_REMAINING_AMOUNT, this._setRemainingAmount, this);
        

        this.buttonPlay.on(EventTypes.BUTTON_PRESSED, this.onPlayPressed, this);
        this.buttonJoin.on(EventTypes.BUTTON_PRESSED, this.onJoinPressed, this);
        this.buttonDailyChallenge.on(EventTypes.BUTTON_PRESSED, this.onDailyChallengePressed, this);
        this.buttonShop.on(EventTypes.BUTTON_PRESSED, this.onShopPressed, this);
        this.buttonSettings.on(EventTypes.BUTTON_PRESSED, this.onSettingsPressed, this);
        this.playerNamePanel.on(EventTypes.BUTTON_PRESSED, this.onUsernameChangePressed, this);
        this.butonTapToContinue.on(EventTypes.BUTTON_PRESSED, this.onTapToContinuePressed, this);
        this.app.on(EventTypes.USERNAME_CHANGED, this.onUsernameChanged, this);
        this.app.on(EventTypes.LANGUAGE_SELECTED, this.onLanguageSelected, this);
        this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);
    }

    postInitialize() {
        this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.DEFAULT);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        this._disableButtons();

        this.app.fire(EventTypes.CHANGE_LOCATION, Constants.Locations.STAGE);

        SkyboxManager.getInstance().restoreOriginalSkybox();

        this.tournamentBanner.enabled = false;
        this.remainingContainer.enabled = false;
        this.tapToContinueContainer.enabled = false;
        this.onUsernameChanged();

        this._setMenuViewMode(this.menuViewMode);

        /* shop notification */
        this.shopNotification.enabled = SkinManager.getInstance().hasAvailableForPurchaseSkins() || SceneManager.getInstance().hasCompletedButNotUnlockedScenes();

        /* init daily challenge button availability interval */
        this.dailyChallengeContainer.enabled = false;
        this._dailyChallengeButtonVisible = false;
        this._dailyChallengeAvailabilityInterval = setInterval(() => this._updateDailyChallengeButton(), 500);
        this._updateDailyChallengeButton();

        if (GameConfig.getAttribute('UI', 'showGrayscaleDailyChallengeButtonIfNotAvailable')) {
            this.dailyChallengeContainer.enabled = true;
            this.dailyChallengeContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        }
    }

    _onAppeared() {
        this._enableButtons();
    }

    _onHide() {
        if (this._dailyChallengeAvailabilityInterval) {
            clearInterval(this._dailyChallengeAvailabilityInterval);
        }
        this._dailyChallengeAvailabilityInterval = undefined;

        super._onHide();
    }

    update(dt) {
        if (this.buttonDailyChallengeInactive.enabled) {
            const d = new Date();
            const h = d.getHours();
            const m = d.getMinutes();
            const s = d.getSeconds();
            const secondsUntilEndOfDay = (24 * 60 * 60) - (h * 60 * 60) - (m * 60) - s;
            this.dailyChallengeCooldownText.element.text = Utils.humanizeTime(secondsUntilEndOfDay);
        }
    }

    onResize(width, height) {
        const aspectRatio = width / height;
        const logoPosition = this.logoBanner.getLocalPosition();
        if (aspectRatio > 0.5625) {
            const deltaY = pc.math.clamp((aspectRatio / 0.5625 - 1) * 0.5, 0, 1) * 175;
            logoPosition.y = this._logoBannerInitialPosition.y + deltaY;
        } else {
            logoPosition.y = this._logoBannerInitialPosition.y;
        }
        this.logoBanner.setLocalPosition(logoPosition);
    }


    onUsernameChanged() {
        this.usernameText.element.text = DataManager.getInstance().username || LocalizationManager.getInstance().getLocalizedText('Nickname');
        this.tournamentVinnerName.element.text = DataManager.getInstance().username || LocalizationManager.getInstance().getLocalizedText('Nickname');
    }

    onLanguageSelected() {
        this.onUsernameChanged();
    }


    onDailyChallengePressed() {
        this._disableButtons();
        UIController.getInstance().showWindow(Constants.Screens.DAILY_CHALLENGE_PRESENTER);
    }

    onPlayPressed() {
        this._disableButtons();
        MatchManager.getInstance().initializeMatch();
        APIMediator.showInterstitialAd('button:mainmenu:start', 'start').then(() => {
            MatchManager.getInstance().startMatch();
        });
    }

    onJoinPressed() {
        this._disableButtons();
        APIMediator.showInterstitialAd('button:mainmenu:joinTournament', 'start').then(() => {
            TournamentManager.getInstance().playTournament(true);
        });
    }

    onShopPressed() {
        UIController.getInstance().showWindowOverTransition(Constants.Screens.SHOP, {
            inDuration: 0.075,
            outDuration: 0.25,
            callback: () => {
            }
        });
    }

    onSettingsPressed() {
        UIController.getInstance().showPopup(Constants.Screens.SETTINGS);
    }

    onUsernameChangePressed() {
        UIController.getInstance().showPopup(Constants.Screens.USERNAME);
        UIController.getInstance().showPopup(Constants.Screens.KEYBOARD);

        this.playerNamePanel.enabled = false;
        UIController.getInstance().waitWhenScreenHidden(Constants.Screens.USERNAME).then(() => {
            this.playerNamePanel.enabled = true;
        });
    }

    onTapToContinuePressed() {
        TournamentManager.getInstance().continueTournament();
    }

    async _updateDailyChallengeButton() {
        const currentDateString = new Date().toDateString();
        const lastCompletedDailyChallengeDate = new Date(DataManager.getInstance().lastDailyChallengeTimestamp).toDateString();

        const hasAvailableFreeDailyChallenge = currentDateString != lastCompletedDailyChallengeDate;
        const hasRewardedVideo = await APIMediator.checkRewardedVideoAvailability('button:dailychallenge:start');

        const showDailyChallenge = hasAvailableFreeDailyChallenge || hasRewardedVideo;
        this.buttonDailyChallenge.enabled = showDailyChallenge;
        this.buttonDailyChallengeInactive.enabled = !showDailyChallenge;
        this.dailyChallengeNotification.enabled = hasAvailableFreeDailyChallenge;

        if (!GameConfig.getAttribute('UI', 'showGrayscaleDailyChallengeButtonIfNotAvailable')) {
            if (showDailyChallenge !== this._dailyChallengeButtonVisible) {
                this._dailyChallengeButtonVisible = showDailyChallenge;
                if (showDailyChallenge) {
                    this.dailyChallengeContainer.enabled = true;
                    this.dailyChallengeContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
                } else {
                    this.dailyChallengeContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
                }
            }
        }
    }

    _disableButtons() {
        this.buttonPlay.setAvailable(false);
        this.buttonShop.setAvailable(false);
        this.buttonDailyChallenge.setAvailable(false);
    }

    _enableButtons() {
        this.buttonPlay.setAvailable(true);
        this.buttonShop.setAvailable(true);
        this.buttonDailyChallenge.setAvailable(true);
    }

    /* player */
    _showPlayerDancing() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        playerA.reset();
        const playerStartPosition = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentPositions');
        playerA.setPosition(playerStartPosition.getPosition());
        playerA.setLocalScale(1.75, 1.75, 1.75);
        Utils.wait(500).then(() => {
            playerA.setTrigger('mainMenu');
        });
        Utils.wait(1500).then(() => {
            playerA.setTrigger('mainMenu');
        });
    }

    _showPlayerTournament() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        playerA.reset();
        // const playerStartPosition = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentPositions');
        // playerA.setPosition(playerStartPosition.getPosition());
        // playerA.setLocalScale(pc.Vec3.ONE);

        playerA.setTrigger('idle');
        Utils.wait(1000).then(() => {
            playerA.setTrigger('idle');
        });
    }

    _showPlayerTournamentVictory() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        playerA.reset();
        const playerStartPosition = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentPositions');
        playerA.setPosition(playerStartPosition.getPosition());
        playerA.setLocalScale(1.75, 1.75, 1.75);
        Utils.wait(500).then(() => {
            playerA.setTrigger('roundVictory');
        });
        Utils.wait(1500).then(() => {
            playerA.setTrigger('roundVictory');
        });
    }

    _hideOpponent() {
        /* opponent */
        const playerB = ContestantsManager.getInstance().getOpponentContestant();
        playerB.setPosition(HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentPositions').getPosition());
        playerB.reset();
        playerB.setLocalScale(0, 0, 0);
    }


    _setSearchProgress(playersCurrent, playersTotal) {
        this.searchProgressText.element.text = `${playersCurrent}/${playersTotal}`;
    }

    _setRemainingAmount(amount) {
        this.remainingAmountText.element.text = `${amount}`;
    }

    /** Menu view modes */
    _setMenuViewMode(viewMode) {
        this.menuViewMode = viewMode;
        if(!this.entity.enabled) return;
        switch (viewMode) {
            case Constants.MAIN_MENU_VIEW_MODE.DEFAULT:
                this._setDefaultView();
                break;
            case Constants.MAIN_MENU_VIEW_MODE.JOIN_CHAMPIONSHIP:
                this._setJoinChampionshipView();
                break;
            case Constants.MAIN_MENU_VIEW_MODE.SEARCHING_OPPONENTS:
                this._setSearchingOpponentsView();
                break;
            case Constants.MAIN_MENU_VIEW_MODE.REMAINING:
                this._setRemainingView();
                break;
            case Constants.MAIN_MENU_VIEW_MODE.NEXT_MATCH_READY:
                this._setNextMatchReadyView();
                break;
            case Constants.MAIN_MENU_VIEW_MODE.VICTORY:
                this._setVictoryView();
                break;
        }
    }

    _setDefaultView() {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY);

        this.logoBanner.enabled = true;
        this.playButtonContainer.enabled = true;
        this.playerNamePanel.enabled = true;
        this.joinButtonContainer.enabled = false;
        this.tournamentBanner.enabled = false;
        this.searchingOpponentsContainer.enabled = false;
        this.remainingContainer.enabled = false;
        this.tournamentVictoryContainer.enabled = false;
        this.tapToContinueContainer.enabled = false;
        this.currencyCounter.show();
        this.buttonSettings.enabled = true;
        this.tournamentVictoryParticles.enabled = false;

        this._showPlayerDancing();
        this._hideOpponent();
        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, false);
    }

    _setJoinChampionshipView() {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY);

        this.logoBanner.enabled = false;
        this.playButtonContainer.enabled = false;
        this.playerNamePanel.enabled = true;
        this.joinButtonContainer.enabled = true;
        this.tournamentBanner.enabled = true;
        this.tournamentBanner.setLocalPosition(this._tournamentBannerMenuPosition);
        this.searchingOpponentsContainer.enabled = false;
        this.remainingContainer.enabled = false;
        this.tournamentVictoryContainer.enabled = false;
        this.tapToContinueContainer.enabled = false;
        this.currencyCounter.show();
        this.buttonSettings.enabled = true;
        this.tournamentVictoryParticles.enabled = false;

        this._showPlayerDancing();
        this._hideOpponent();
        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, false);
    }

    _setSearchingOpponentsView() {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);

        this.logoBanner.enabled = false;
        this.playButtonContainer.enabled = false;
        this.playerNamePanel.enabled = false;
        this.joinButtonContainer.enabled = false;
        this.tournamentBanner.enabled = true;
        this.tournamentBanner.tween(this.tournamentBanner.getLocalPosition())
            .to(this._tournamentBannerTopPosition, 0.55, pc.SineOut)
            .start();
        this.searchingOpponentsContainer.enabled = true;
        this.remainingContainer.enabled = false;
        this.tournamentVictoryContainer.enabled = false;
        this.tapToContinueContainer.enabled = false;
        this.currencyCounter.enabled = false;
        this.buttonSettings.enabled = false;
        this.tournamentVictoryParticles.enabled = false;

        this._showPlayerTournament();
        this._hideOpponent();
        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, false);
    }

    _setRemainingView() {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);

        this.logoBanner.enabled = false;
        this.playButtonContainer.enabled = false;
        this.playerNamePanel.enabled = false;
        this.joinButtonContainer.enabled = false;
        this.tournamentBanner.enabled = true;
        this.tournamentBanner.setLocalPosition(this._tournamentBannerTopPosition);
        this.searchingOpponentsContainer.enabled = false;
        this.remainingContainer.enabled = true;
        this.tournamentVictoryContainer.enabled = false;
        this.tapToContinueContainer.enabled = false;
        this.currencyCounter.enabled = false;
        this.buttonSettings.enabled = false;
        this.tournamentVictoryParticles.enabled = false;

        this._showPlayerTournament();
        this._hideOpponent();
        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, false);
    }


    _setNextMatchReadyView() {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);

        this.logoBanner.enabled = false;
        this.playButtonContainer.enabled = false;
        this.playerNamePanel.enabled = false;
        this.joinButtonContainer.enabled = false;
        this.tournamentBanner.enabled = true;
        this.tournamentBanner.setLocalPosition(this._tournamentBannerTopPosition);
        this.searchingOpponentsContainer.enabled = false;
        this.remainingContainer.enabled = false;
        this.tournamentVictoryContainer.enabled = false;
        this.tapToContinueContainer.enabled = true;
        this.currencyCounter.enabled = false;
        this.buttonSettings.enabled = false;
        this.tournamentVictoryParticles.enabled = false;

        this._showPlayerTournament();
        this._hideOpponent();
        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, false);
    }


    _setVictoryView() {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);

        this.logoBanner.enabled = false;
        this.playButtonContainer.enabled = false;
        this.playerNamePanel.enabled = false;
        this.joinButtonContainer.enabled = false;
        this.tournamentBanner.enabled = true;
        this.tournamentBanner.setLocalPosition(this._tournamentBannerTopPosition);
        this.searchingOpponentsContainer.enabled = false;
        this.remainingContainer.enabled = false;
        this.tournamentVictoryContainer.enabled = true;
        this.tapToContinueContainer.enabled = true;
        this.currencyCounter.enabled = false;
        this.buttonSettings.enabled = false;
        this.tournamentVictoryParticles.enabled = true;

        this._showPlayerTournamentVictory();
        this._hideOpponent();
        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, false);

        this.tournamentVictoryParticles.children.forEach((child, index) => {
            child.particlesystem.stop();
            const delay = index % (this.tournamentVictoryParticles.children.length / 2);
            Utils.wait(pc.math.random(250, 750) * delay).then(() => {
                child.particlesystem.reset();
                child.particlesystem.play();
            })
        });
    }

}

pc.registerScript(ScreenMainMenu, 'screenMainMenu');

// AudienceManager.js
var AudienceManager = pc.createScript('audienceManager');

AudienceManager.attributes.add('totalCharacters', {
    type: 'number',
    default: 45
})

AudienceManager.attributes.add('randomize', {
    type: 'boolean',
    default: false
});

AudienceManager.attributes.add('defaultCharacterRotation', {
    type: 'vec3',
    default: [0, 180, 0]
});

AudienceManager.attributes.add('characterTemplates', {
    type: 'asset',
    assetType: 'template',
    array: true
});



AudienceManager.prototype.initialize = function () {
    this.spots = this.entity.findByName('Spots').children.slice();
    this.charactersContainer = this.entity.findByName('Characters');
    this.characterPositions = this.spots.map(spot => spot.getLocalPosition().clone());
    this.charactersList = [];
    this.charactersUncertain = [];
    this.charactersPlayerA = [];
    this.charactersPlayerB = [];
    this.areaA = HierarchyManager.getInstance().getByPath('Stage/StageContent/Areas/Area1');
    this.areaB = HierarchyManager.getInstance().getByPath('Stage/StageContent/Areas/Area2');

    this.app.on(EventTypes.MOVE_AUDIENCE_TO, this._moveAudienceTo, this);
    this.app.on(EventTypes.RESET_AUDIENCE, this._resetAudience, this);
    this.app.on(EventTypes.AUDIENCE_CELEBRATE_VICTORY, this._celebrateVictory, this);
};

AudienceManager.prototype.postInitialize = function () {
    /* spawn characters */
    const possibleTemplates = this.randomize ? Utils.shuffle(this.characterTemplates.slice()) : this.characterTemplates.slice();

    for (let i = 0; i < this.characterPositions.length; i++) {
        if (possibleTemplates.length === 0) {
            if (this.randomize) possibleTemplates.push(...Utils.shuffle(this.characterTemplates.slice()));
            else possibleTemplates.push(...this.characterTemplates);
        }
        const characterTemplate = possibleTemplates.shift();
        const character = characterTemplate.resource.instantiate();
        this.charactersContainer.addChild(character);
        this.charactersList.push(character);
        this.charactersUncertain.push(character);
        character.setLocalPosition(this.characterPositions[i]);
        character.setLocalEulerAngles(this.defaultCharacterRotation);
        character.setYaw(this.defaultCharacterRotation.y, true);
    }
}

AudienceManager.prototype._resetAudience = function () {
    this.charactersUncertain.push(...this.charactersPlayerA);
    this.charactersUncertain.push(...this.charactersPlayerB);
    this.charactersPlayerA.splice(0, this.charactersPlayerA.length);
    this.charactersPlayerB.splice(0, this.charactersPlayerB.length);

    this.charactersList.forEach((character, index) => {
        character.setLocalPosition(this.characterPositions[index]);
        character.setLocalEulerAngles(this.defaultCharacterRotation);
        character.setYaw(this.defaultCharacterRotation.y, true);
    })
};

AudienceManager.prototype.update = function (dt) {
    if (GameConfig.getAttribute('debug', 'hotkeys')) {

        if (this.app.keyboard.wasPressed(pc.KEY_V)) {
            this.charactersList.forEach(character => character.playVictoryAnim())
        }

    }
};

AudienceManager.prototype._celebrateVictory = function (contestantType) {
    const audienceList = contestantType === Constants.Contestants.PLAYER ? this.charactersPlayerA : this.charactersPlayerB;
    audienceList.forEach(character => {
        character.playVictoryAnim();
    });
}

AudienceManager.prototype._moveAudienceTo = function (contestantType, _percent, _percentageLeft, _leftAnswers) {
    if (contestantType === Constants.Contestants.PLAYER) {
        this.moveAudienceToPlayerOne(_percent, _percentageLeft, _leftAnswers);
    } else {
        this.moveAudienceToPlayerTwo(_percent, _percentageLeft, _leftAnswers);
    }
}


AudienceManager.prototype.moveAudienceToPlayerOne = function (_percent, _percentageLeft, _leftAnswers) {
    const characterLeft = Math.max(_leftAnswers, Math.ceil(_percentageLeft * this.totalCharacters));
    const characterToMove = Math.min(Math.max(1, this.charactersUncertain.length - characterLeft), this.charactersUncertain.length);
    for (let i = 0; i < characterToMove; i++) {
        const bAudienceCharacter = this.charactersUncertain.shift();
        this.charactersPlayerA.push(bAudienceCharacter);
        bAudienceCharacter.moveFromStairsToAreaPoint(this.areaA.getAreaPoint(), 400 + i * 100);
    }
};



AudienceManager.prototype.moveAudienceToPlayerTwo = function (_percent, _percentageLeft, _leftAnswers) {
    const characterLeft = Math.max(_leftAnswers, Math.ceil(_percentageLeft * this.totalCharacters));
    const characterToMove = Math.min(Math.max(1, this.charactersUncertain.length - characterLeft), this.charactersUncertain.length);
    for (let i = 0; i < characterToMove; i++) {
        const bAudienceCharacter = this.charactersUncertain.shift();
        this.charactersPlayerB.push(bAudienceCharacter);
        bAudienceCharacter.moveFromStairsToAreaPoint(this.areaB.getAreaPoint(), 400 + i * 100);
    }
};

// posteffect-outline.js
// --------------- POST EFFECT DEFINITION --------------- //
Object.assign(pc, function () {

    /**
     * @class
     * @name pc.OutlineEffect
     * @classdesc Applies an outline effect on input render target
     * @description Creates new instance of the post effect.
     * @augments pc.PostEffect
     * @param {pc.GraphicsDevice} graphicsDevice - The graphics device of the application.
     * @property {pc.Texture} texture The outline texture to use.
     * @property {pc.Color} color The outline color.
     */
    var OutlineEffect = function (graphicsDevice, thickness) {
        pc.PostEffect.call(this, graphicsDevice);

        this.shader = new pc.Shader(graphicsDevice, {
            attributes: {
                aPosition: pc.SEMANTIC_POSITION
            },
            vshader: [
                "attribute vec2 aPosition;",
                "",
                "varying vec2 vUv0;",
                "",
                "void main(void)",
                "{",
                "    gl_Position = vec4(aPosition, 0.0, 1.0);",
                "    vUv0 = (aPosition.xy + 1.0) * 0.5;",
                "}"
            ].join("\n"),
            fshader: [
                "precision " + graphicsDevice.precision + " float;",
                "",
                "#define THICKNESS "+thickness.toFixed(0),
                "uniform float uWidth;",
                "uniform float uHeight;",
                "uniform vec4 uOutlineCol;",
                "uniform sampler2D uColorBuffer;",
                "uniform sampler2D uOutlineTex;",
                "",
                "varying vec2 vUv0;",
                "",
                "void main(void)",
                "{",
                "    vec4 texel1 = texture2D(uColorBuffer, vUv0);",
                "    float sample0 = texture2D(uOutlineTex, vUv0).a;",
                "    float outline = 0.0;",
                "    if (sample0==0.0)",
                "    {",
                "        for (int x=-THICKNESS;x<=THICKNESS;x++)",
                "        {",
                "            for (int y=-THICKNESS;y<=THICKNESS;y++)",
                "            {    ",
                "                float sample=texture2D(uOutlineTex, vUv0+vec2(float(x)/uWidth, float(y)/uHeight)).a;",
                "                if (sample>0.0)",
                "                {",
                "                    outline=1.0;",
                "                }",
                "            }",
                "        } ",
                "    }",
                "    gl_FragColor = mix(texel1, uOutlineCol, outline * uOutlineCol.a);",
                "}"
            ].join("\n")
        });

        // Uniforms
        this.color = new pc.Color(1, 1, 1, 1);
        this.texture = new pc.Texture(graphicsDevice);
        this.texture.name = 'pe-outline';
    };

    OutlineEffect.prototype = Object.create(pc.PostEffect.prototype);
    OutlineEffect.prototype.constructor = OutlineEffect;
    
    var colorArray = [0,0,0,0];

    Object.assign(OutlineEffect.prototype, {
        render: function (inputTarget, outputTarget, rect) {
            var device = this.device;
            var scope = device.scope;

            scope.resolve("uWidth").setValue(inputTarget.width);
            scope.resolve("uHeight").setValue(inputTarget.height);
            
            colorArray[0] = this.color.r;
            colorArray[1] = this.color.g;
            colorArray[2] = this.color.b;
            colorArray[3] = this.color.a;
            scope.resolve("uOutlineCol").setValue(colorArray);
            
            scope.resolve("uColorBuffer").setValue(inputTarget.colorBuffer);
            scope.resolve("uOutlineTex").setValue(this.texture);
            pc.drawFullscreenQuad(device, outputTarget, this.vertexBuffer, this.shader, rect);
        }
    });

    return {
        OutlineEffect: OutlineEffect
    };
}());

// ----------------- SCRIPT DEFINITION ------------------ //
var Outline = pc.createScript('outline');

Outline.attributes.add('color', {
    type: 'rgb',
    default: [0.5, 0.5, 0.5, 1],
    title: 'Color'
});

Outline.attributes.add('texture', {
    type: 'asset',
    assetType: 'texture',
    title: 'Texture'
});

Outline.prototype.initialize = function () {
    this.effect = new pc.OutlineEffect(this.app.graphicsDevice);
    this.effect.color = this.color;
    this.effect.texture = this.texture.resource;

    var queue = this.entity.camera.postEffects;

    queue.addEffect(this.effect);

    this.on('state', function (enabled) {
        if (enabled) {
            queue.addEffect(this.effect);
        } else {
            queue.removeEffect(this.effect);
        }
    });

    this.on('destroy', function () {
        queue.removeEffect(this.effect);
    });

    this.on('attr:color', function (value) {
        this.effect.color = value;
    }, this);

    this.on('attr:texture', function (value) {
        this.effect.texture = value ? value.resource : null;
    }, this);
};


// outlineFX.js
var OutlineFx = pc.createScript('outlineFx');

OutlineFx.attributes.add('color', { type: 'rgba' });

OutlineFx.attributes.add("thickness", {
    type: "number",
    default: 3.0,
    min: 1.0,
    max: 10,
    precision: 0,
    title: "Thickness"
});

OutlineFx.attributes.add("mainCamera", {
    type: "entity",
});


OutlineFx.prototype.initialize = function () {

    // --- variables
    this.vec = new pc.Vec3();

    // --- execute
    this.prepare();

    // --- events
    this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);

    this.app.on(EventTypes.ADD_OUTLINE, this.addOutline, this);
    this.app.on(EventTypes.REMOVE_OUTLINE, this.removeOutline , this);
};

OutlineFx.prototype.addOutline = function (entity, recursive = true) {
    if(recursive) entity.children.forEach(child => this.addOutline(child, recursive));

    if(!entity) return;
    const model = entity.render || entity.model;
    if(!model) return;

    if (model.layers.indexOf(this.outlineLayer.id) === -1) {
        const layers = model.layers.slice();
        layers.push(this.outlineLayer.id);
        model.layers = layers;
    }
};


OutlineFx.prototype.removeOutline = function (entity, recursive = true) {
    if(recursive) entity.children.forEach(child => this.removeOutline(child, recursive));

    if(!entity) return;
    const model = entity.render || entity.model;
    if(!model) return;

    const index = model.layers.indexOf(this.outlineLayer.id);
    if (index > -1) {
        var layers = model.layers.slice();
        layers.splice(index, 1);
        model.layers = layers;
    }
};

OutlineFx.prototype.prepare = function () {

    // create texture and render target for rendering into, including depth buffer
    this.texture = new pc.Texture(this.app.graphicsDevice, {
        width: this.app.graphicsDevice.width,
        height: this.app.graphicsDevice.height,
        format: pc.PIXELFORMAT_R8_G8_B8_A8,
        autoMipmap: true,
        minFilter: pc.FILTER_LINEAR,
        magFilter: pc.FILTER_LINEAR
    });
    this.renderTarget = new pc.RenderTarget({
        colorBuffer: this.texture,
        depth: true,
        samples: 8
    });

    // get layers
    this.worldLayer = this.app.scene.layers.getLayerByName("World");
    this.outlineLayer = this.app.scene.layers.getLayerByName("Outline");

    // set up layer to render to the render target
    this.outlineLayer.renderTarget = this.renderTarget;

    // Create outline camera, which renders entities in outline layer
    this.outlineCamera = new pc.Entity();
    this.outlineCamera.addComponent("camera", {
        clearColor: new pc.Color(0.0, 0.0, 0.0, 0.0),
        layers: [this.outlineLayer.id],
        fov: this.mainCamera.camera.fov
    });
    this.app.root.addChild(this.outlineCamera);
    this.outlineCamera.camera.priority = 0;

    // instanciate outline post process effect
    this.outline = new pc.OutlineEffect(this.app.graphicsDevice, this.thickness);
    this.outline.color = new pc.Color(0, 0, 1, 1);
    this.outline.texture = this.texture;
    this.entity.camera.postEffects.addEffect(this.outline);
};

OutlineFx.prototype.onResize = function () {

    this.entity.camera.postEffects.removeEffect(this.outline);

    this.app.scene.layers.remove(this.outlineLayer);

    this.texture.destroy();
    this.texture = new pc.Texture(this.app.graphicsDevice, {
        width: this.app.graphicsDevice.width,
        height: this.app.graphicsDevice.height,
        format: pc.PIXELFORMAT_R8_G8_B8_A8,
        autoMipmap: true,
        minFilter: pc.FILTER_LINEAR,
        magFilter: pc.FILTER_LINEAR
    });
    this.renderTarget.destroy();
    this.renderTarget = new pc.RenderTarget({
        colorBuffer: this.texture,
        depth: true,
        samples: 8
    });

    this.outlineLayer.renderTarget = this.renderTarget;

    this.app.scene.layers.insert(this.outlineLayer, 0);

    this.outline.texture = this.texture;
    this.entity.camera.postEffects.addEffect(this.outline);
};

// update code called every frame
OutlineFx.prototype.update = function (dt) {

    var transform = this.entity.getWorldTransform();

    this.outlineCamera.setPosition(transform.getTranslation());
    this.outlineCamera.setEulerAngles(transform.getEulerAngles());
    this.outlineCamera.setLocalScale(transform.getScale());

    this.outlineCamera.camera.horizontalFov = this.mainCamera.camera.horizontalFov;
    this.outlineCamera.camera.fov = this.mainCamera.camera.fov;

    // update color
    this.outline.color.copy(this.color);
};


// AudienceCharacter.js
var AudienceCharacter = pc.createScript('audienceCharacter');

AudienceCharacter.prototype.initialize = function () {
    this._initialYaw = undefined;
    this._sourceWorldPosition = this.entity.getPosition().clone();
    this._movementStartWorldPosition = new pc.Vec3();
    this._movementEndWorldPosition = new pc.Vec3();
    this._speed = GameConfig.getAttribute('audience', 'speed');
    this._angularSpeed = GameConfig.getAttribute('audience', 'angularSpeed');
    this._acceleration = GameConfig.getAttribute('audience', 'acceleration');
    this._velocity = new pc.Vec3();

    /** movement */
    this._resetMovementData();

    this.entity.moveToPosition = this._moveToPosition.bind(this);
    this.entity.moveFromStairsToAreaPoint = this._moveFromStairsToAreaPoint.bind(this);
    this.entity.setYaw = this._setYaw.bind(this);

    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

AudienceCharacter.prototype.reset = function () {
    this._resetMovementData();
    this.entity.setPosition(this._sourceWorldPosition);
    this.entity.setYaw(this._initialYaw, true);
    this.entity.stopRunningAnim(false);
    this.entity.playRandomIdleAnim();
}

AudienceCharacter.prototype._resetMovementData = function () {
    this._inMovement = false;
    this._gravity = GameConfig.getAttribute('audience', 'gravity');
    this._groundY = GameConfig.getAttribute('audience', 'groundY');
    this._useLinearGravity = GameConfig.getAttribute('audience', 'linearGravity');
    this._currentYaw = 0;
    this._targetYaw = 0;
    this._currentVelocity = 0;
    this._targetVelocity = 0;
    this._velocity.set(0, 0, 0);
    this._prevFrameDistanceToTarget = Number.MAX_SAFE_INTEGER;
}


AudienceCharacter.prototype.update = function (dt) {
    const worldPosition = this.entity.getPosition();
    if (this._inMovement) {
        this._updateHorizontalMovement(worldPosition, dt);
        this._updateLookingAngle(worldPosition, dt);
    }
    this._updateGroundPosition(worldPosition, dt);
    this._applyGravity(worldPosition, dt);

    /* apply updated position */
    this.entity.setPosition(worldPosition);

};


AudienceCharacter.prototype._setYaw = function (yaw, immediately = false) {
    this._targetYaw = yaw;
    if (this._initialYaw === undefined) this._initialYaw = yaw;
    if (immediately) {
        this._currentYaw = yaw;
        this.entity.setLocalEulerAngles(0, this._currentYaw, 0);
    }
};

AudienceCharacter.prototype._moveFromStairsToAreaPoint = function (areaPoint, delay = 0) {
    Utils.wait(delay).then(() => {
        this._moveToPosition(areaPoint.getPosition());
    });
}

AudienceCharacter.prototype._moveToPosition = function (worldPosition) {
    this._movementStartWorldPosition.copy(this.entity.getPosition());
    this._movementEndWorldPosition.copy(worldPosition);
    const distanceHorizontal = Utils.distanceXZ(this._movementStartWorldPosition, this._movementEndWorldPosition);
    const dx = this._movementEndWorldPosition.x - this._movementStartWorldPosition.x;
    const dz = this._movementEndWorldPosition.z - this._movementStartWorldPosition.z;
    const duration = distanceHorizontal / this._speed;
    this._prevFrameDistanceToTarget = distanceHorizontal;

    this._velocity.x = dx / duration;
    this._velocity.z = dz / duration;
    this._inMovement = true;

    /* set looking direction */
    this._targetYaw = Utils.getYawBetweenVectors(this._movementStartWorldPosition, this._movementEndWorldPosition);

    this.entity.playRunningAnim();
};

AudienceCharacter.prototype._finishMovement = function () {
    this._inMovement = false;
    this._currentVelocity = 0;
    this._targetVelocity = 0;
    this._velocity.x = 0;
    this._velocity.z = 0;
    this._prevFrameDistanceToTarget = Number.MAX_SAFE_INTEGER;

    this.entity.stopRunningAnim(true);
}



AudienceCharacter.prototype._updateHorizontalMovement = function (worldPosition, dt) {
    /* horizontal movement */
    const maxFrameWalkingDistance = this._speed * dt;
    const distanceToTarget = Utils.distanceXZ(worldPosition, this._movementEndWorldPosition);
    if (distanceToTarget <= maxFrameWalkingDistance || distanceToTarget > this._prevFrameDistanceToTarget) {
        /* destination reached */
        worldPosition.x = this._movementEndWorldPosition.x;
        worldPosition.z = this._movementEndWorldPosition.z;
        this._finishMovement();
    } else {
        worldPosition.x += this._velocity.x * dt;
        worldPosition.z += this._velocity.z * dt;
        this._prevFrameDistanceToTarget = distanceToTarget;
    }
};


AudienceCharacter.prototype._updateLookingAngle = function (worldPosition, dt) {
    /* looking direction */
    const maxFrameDeltaAngle = this._angularSpeed * dt;
    const deltaAngle = Utils.angleDifference(this._currentYaw, this._targetYaw);
    if (Math.abs(deltaAngle) <= maxFrameDeltaAngle) {
        this._currentYaw = this._targetYaw;
    } else {
        this._currentYaw = Utils.normalizeAngleDegrees(this._currentYaw + maxFrameDeltaAngle * Math.sign(deltaAngle));
    }
    this.entity.setLocalEulerAngles(0, this._currentYaw, 0);
};


AudienceCharacter.prototype._updateGroundPosition = function (worldPosition, dt) {
    this._groundY = StairsMovementHelper.getInstance().getGroundY(worldPosition);
};


AudienceCharacter.prototype._applyGravity = function (worldPosition, dt) {
    const gravity = this._gravity;
    if (this._useLinearGravity) {
        this._velocity.y = gravity;
    } else {
        this._velocity.y += dt * gravity;
    }

    worldPosition.y = Math.max(worldPosition.y + dt * this._velocity.y, this._groundY);
    // this.entity.setPosition(worldPosition);

    if (worldPosition.y <= this._groundY) this._velocity.y = 0;
};

// AudienceAnimationBehavior.js
var AudienceAnimationBehavior = pc.createScript('audienceAnimationBehavior');

AudienceAnimationBehavior.prototype.initialize = function () {
    this._lastStateName = undefined;
    this._lastReportedProgress = 0;
    this._lastIdleAnimationIndex = 0;

    this.normalizedAnimWeights = [];
    const totalProbability = Constants.AUDIENCE_IDLE_ANIM_PROBABILITIES.reduce((sum, item) => sum + item, 0);

    let lastProbability = 0;
    for (let prob of Constants.AUDIENCE_IDLE_ANIM_PROBABILITIES) {
        lastProbability += prob / totalProbability
        this.normalizedAnimWeights.push(lastProbability);
    };


    /* expose anim accessors */
    this.entity.playRandomIdleAnim  = this.playRandomIdleAnim.bind(this);
    this.entity.playDefeatAnim      = this.playDefeatAnim.bind(this);
    this.entity.playVictoryAnim     = this.playVictoryAnim.bind(this);
    this.entity.playRunningAnim     = this.playRunningAnim.bind(this);
    this.entity.stopRunningAnim     = this.stopRunningAnim.bind(this);
};

AudienceAnimationBehavior.prototype.postInitialize = function () {
    setTimeout(() => this.playRandomIdleAnim(), pc.math.random(250, 3000));
};


AudienceAnimationBehavior.prototype.update = function (dt) {
    /* manage idle animations looping */
    if (!this.entity.anim.getBoolean('moving')) {
        if (this.entity.anim.baseLayer.activeState === this._lastStateName) {
            if (this.entity.anim.baseLayer.activeStateProgress === 1) {
                this.handleAnimFinished(this.entity.anim.baseLayer.activeState);
            }
            this._lastReportedProgress = this.entity.anim.baseLayer.activeStateProgress;
        } else {
            this._lastStateName = this.entity.anim.baseLayer.activeState;
            this._lastReportedProgress = this.entity.anim.baseLayer.activeStateProgress;
        }
    }
};

AudienceAnimationBehavior.prototype.handleAnimFinished = function(stateName) {
    this.playRandomIdleAnim();

    // if(stateName === 'Victory') this.playRandomIdleAnim();
};


AudienceAnimationBehavior.prototype.playRandomIdleAnim = function () {
    let idleAnimKey = 0;
    const randomValue = Math.random();
    for (let i = this.normalizedAnimWeights.length - 1; i > -1; i--) {
        if (randomValue >= this.normalizedAnimWeights[i]) {
            idleAnimKey = i;
            break;
        }
    }

    /* if attempting to play the same anim 2nd time in a row, insert random anim in the queue to prevent State Graph from stucking */
    if (idleAnimKey === this._lastIdleAnimationIndex) {
        this.entity.anim.setInteger('idle', (idleAnimKey + 1) % this.normalizedAnimWeights.length);
        setTimeout(() => this.entity.anim.setInteger('idle', idleAnimKey));
    } else {
        this.entity.anim.setInteger('idle', idleAnimKey)
    }

    this._lastIdleAnimationIndex = idleAnimKey;
};


AudienceAnimationBehavior.prototype.playDefeatAnim = function () {
    this.entity.anim.setInteger('idle', -1);
    this.entity.anim.setTrigger('defeat', true);
};


AudienceAnimationBehavior.prototype.playVictoryAnim = function () {
    this.entity.anim.setInteger('idle', -1);
    this.entity.anim.setTrigger('victory', true);
};

AudienceAnimationBehavior.prototype.playRunningAnim = function () {
    this.entity.anim.setInteger('idle', -1);
    this.entity.anim.setBoolean('moving', true);
};

AudienceAnimationBehavior.prototype.stopRunningAnim = function (randomIndleAnim = true) {
    this.entity.anim.setBoolean('moving', false);
    if(randomIndleAnim) this.playRandomIdleAnim();
};

// uiParticleSystemFix.js
var UiParticleSystemFix = pc.createScript('uiParticleSystemFix');

UiParticleSystemFix.attributes.add('reverseScale', {
    type: 'boolean',
    default: false
})

UiParticleSystemFix.prototype.initialize = function () {
    this.app.on(EventTypes.Screen.RESIZED, this.onScreenResized, this);
    this._originalScale = this.entity.getLocalScale().clone();
    this._scaleCorrectionVec = new pc.Vec2(1, 1);

    this.onScreenResized(UIController.getInstance().getScreenWidth(), UIController.getInstance().getScreenHeight());
};


UiParticleSystemFix.prototype.update = function (dt) {

};

UiParticleSystemFix.prototype.onScreenResized = function (width, height, isLandscape) {
    const aspectRatio = UIController.getInstance().getScreenWidth() / UIController.getInstance().getScreenHeight();

    if(aspectRatio >= 1) {
        if(this.reverseScale) 
            this._scaleCorrectionVec.set(1, height / width);
        else 
            this._scaleCorrectionVec.set(width / height, 1);
    } else {
        if(this.reverseScale) 
            this._scaleCorrectionVec.set(aspectRatio, 1);
        else 
            this._scaleCorrectionVec.set(1, 1 / aspectRatio);
    }

    /* swap width & height */
    this.entity.setLocalScale(this._scaleCorrectionVec.y, this._scaleCorrectionVec.x, this._originalScale.z);
};


// commonButton.js
var CommonButton = pc.createScript('commonButton');

CommonButton.attributes.add('pressTweenDuration', {
    title: "Tween duration",
    type: 'number',
    default: 0.065,
    min: 0.005,
    max: 1
});

CommonButton.attributes.add('clickSound', {
    title: "Play sound",
    type: 'boolean',
    default: true
});

CommonButton.attributes.add('soundOnRelease', {
    title: "Sound on release",
    type: 'boolean',
    default: true
});

CommonButton.attributes.add('tweenMargins', {
    title: "Tween Margins",
    type: 'boolean',
    default: false
});

CommonButton.attributes.add('marginsPressed', {
    title: "Margins Pressed",
    type: 'vec4',
    default: [0, -5, 0, 5]
});

CommonButton.attributes.add('marginsReleased', {
    title: "Margins Released",
    type: 'vec4',
    default: [0, 0, 0, 0]
});

CommonButton.attributes.add('preventDoubleClick', {
    title: "Prevent rapid double click",
    type: 'boolean',
    default: true
});

CommonButton.attributes.add('doubleClickMinCooldown', {
    title: "Double click min cooldown",
    type: 'number',
    default: 30
});



CommonButton.prototype.initialize = function () {

    this.shadow = this.entity.findByName('Shadow');
    this.face = this.entity.findByName('Face');

    if (!this.shadow) return console.error('Make sure Shadow is present in button ' + this.entity.path);
    if (!this.face) return console.error('Make sure Face is present in button ' + this.entity.path);

    this._shadowPosition = this.shadow.getLocalPosition().clone();
    this._facePosition = this.face.getLocalPosition().clone();

    this._margins = new pc.Vec4().copy(this.marginsReleased);
    this._marginsA = new pc.Vec4().copy(this.marginsReleased);
    this._marginsB = new pc.Vec4().copy(this.marginsReleased);

    this.available = true;
    this.entity.setAvailable = this._setAvailable.bind(this);

    this.hovered = false;
    this.wasPressed = false;
    this.lastClickTimestamp = 0;


    if (this.app.touch) {
        this.entity.element.on('touchstart', this.onPress, this);
        this.entity.element.on('touchend', this.onRelease, this);
        this.entity.element.on('touchleave', this.onLeave, this);
        this.entity.element.on('touchmove', this.onMove, this);
    }
    if (this.app.mouse) {
        this.entity.element.on('mouseenter', this.onEnter, this);
        this.entity.element.on('mousedown', this.onPress, this);
        this.entity.element.on('mouseup', this.onRelease, this);
        this.entity.element.on('mouseleave', this.onLeave, this);
        this.entity.element.on('mousemove', this.onMove, this);
    }

    this.on('destroy', this._destroy, this);
};

CommonButton.prototype._setAvailable = function (value) {
    this.available = value;
    this.entity.element.useInput = this.available;
};

// When the cursor enters the element assign the hovered texture
CommonButton.prototype.onEnter = function (event) {
    this.hovered = true;
    document.body.style.cursor = 'pointer';
};

CommonButton.prototype.onLeave = function (event) {
    this.hovered = false;
    document.body.style.cursor = 'default';
};

CommonButton.prototype.onMove = function (event) {
    this.entity.fire(EventTypes.BUTTON_DRAG, event);
};


CommonButton.prototype.onPress = function (event) {
    if (!this.available) return;

    this._downTime = this.app._time;

    this.hovered = true;
    this.wasPressed = true;
    document.body.style.cursor = 'pointer';

    event.stopPropagation();

    this.entity.fire(EventTypes.BUTTON_DOWN);

    if (this.clickSound && !this.soundOnRelease) this.app.fire(EventTypes.PLAY_SFX, 'click');

    if (this.tweenMargins) {
        this.entity.tween(this._margins)
            .to(this.marginsPressed, this.pressTweenDuration, pc.SineOut)
            .onUpdate(() => this._syncMargins())
            .onComplete(() => this._syncMargins())
            .start();
    } else {
        this.face.tween(this.face.getLocalPosition())
            .to(this._shadowPosition, this.pressTweenDuration, pc.SineOut)
            .start();
    }
};

CommonButton.prototype._syncMargins = function () {
    if (this.face.element.margin === this._marginsA) {
        this._marginsB.copy(this._margins);
        this.face.element.margin = this._marginsB;
    } else {
        this._marginsA.copy(this._margins);
        this.face.element.margin = this._marginsA;
    }
}

CommonButton.prototype.onRelease = function (event) {
    if (!this.available) return;

    if (this.tweenMargins) {
        this.entity.tween(this._margins)
            .to(this.marginsReleased, this.pressTweenDuration, pc.SineIn)
            .onUpdate(() => this._syncMargins())
            .onComplete(() => this._syncMargins())
            .start();
    } else {
        this.face.tween(this.face.getLocalPosition())
            .to(this._facePosition, this.pressTweenDuration, pc.SineIn)
            .start();
    }

    this.entity.fire(EventTypes.BUTTON_UP, event);

    const now = new Date().getTime();
    const elapsedSinceLastClick = now - this.lastClickTimestamp;

    if (this.hovered && this.wasPressed) {
        if (!this.preventDoubleClick || elapsedSinceLastClick >= this.doubleClickMinCooldown) {
            this.triggerClick();
        }
    }
    this.wasPressed = false;
};

CommonButton.prototype.triggerClick = function () {
    this.entity.fire(EventTypes.BUTTON_PRESSED);
    VibrationManager.getInstance().hapticSuccess();
    if (this.clickSound && this.soundOnRelease) this.app.fire(EventTypes.PLAY_SFX, 'click');
    this.lastClickTimestamp = new Date().getTime();
};


CommonButton.prototype._destroy = function () {
    if (!this.app || !this.entity || !this.entity.element) return;
    if (this.app.touch) {
        this.entity.element.off('touchstart', this.onPress, this);
        this.entity.element.off('touchend', this.onRelease, this);
        this.entity.element.off('touchleave', this.onLeave, this);
        this.entity.element.off('touchmove', this.onMove, this);
    }

    if (this.app.mouse) {
        this.entity.element.off('mouseenter', this.onEnter, this);
        this.entity.element.off('mousedown', this.onPress, this);
        this.entity.element.off('mouseup', this.onRelease, this);
        this.entity.element.off('mouseleave', this.onLeave, this);
        this.entity.element.off('mousemove', this.onMove, this);
    }
}

// audienceTargetPointRenderer.js
var AudienceTargetPointRenderer = pc.createScript('audienceTargetPointRenderer');


AudienceTargetPointRenderer.prototype.initialize = function() {
    this.entity.render.enabled = GameConfig.getAttribute('debug', 'audienceAreaTargetPoints');

    // this.entity.children.forEach(child => child.rotateLocal(0, 180, 0));
};


AudienceTargetPointRenderer.prototype.update = function(dt) {

};


// Area.js
var Area = pc.createScript('area');

Area.attributes.add('owner', {
    type: 'number',
    enum: [
        { 'Player': 0 },
        { 'Opponent': 1 }
    ], 
    default: 0
});

Area.prototype.initialize = function () {
    this.contenstantTypes = [Constants.Contestants.PLAYER, Constants.Contestants.OPPONENT];
    this.areaColor = this.entity.findByName('AreaColor');
    this.audienceCharacterPoints = this.entity.findByName('AudiencePointsArea').children;
    this.audienceCharacterPositionCount = this.audienceCharacterPoints.length;
    this.audienceCharacterPositionIndex = 0;

    this.entity.resetAudienceCharacterPosition = this.resetAudienceCharacterPosition.bind(this);
    this.entity.getAreaPoint = this.getAreaPoint.bind(this);

    this.app.on(EventTypes.SET_CONTESTANT_COLORS, this._setColor, this);

    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};


Area.prototype.reset = function () {
    this.resetAudienceCharacterPosition();
};

Area.prototype.resetAudienceCharacterPosition = function () {
    this.audienceCharacterPositionIndex = 0;
}

Area.prototype.getAreaPoint = function () {
    return this.audienceCharacterPoints[this.audienceCharacterPositionIndex++ % this.audienceCharacterPositionCount];
}

Area.prototype._setColor = function (contenstantType, colorData) {
    if(this.contenstantTypes[this.owner] !== contenstantType) return;

    this._tempColor = this._tempColor || new pc.Color();
    this._tempColor.copy(colorData.UI);
    this.areaColor.render.meshInstances.forEach(meshInstance => meshInstance.setParameter('material_diffuse', Utils.getGammaCorrectedColorUniform(this._tempColor)));
};


Area.prototype.update = function (dt) {

};

// stairPositionRenderer.js
var StairPositionRenderer = pc.createScript('stairPositionRenderer');

StairPositionRenderer.prototype.initialize = function () {
    this.entity.render.enabled = GameConfig.getAttribute('debug', 'stairPositions');
};



// StairsMovementHelper.js
var StairsMovementHelper = pc.createScript('stairsMovementHelper');

StairsMovementHelper.getInstance = function () {
    if (!StairsMovementHelper._instance) console.error('StairsMovementHelper is not initialized yet');
    return StairsMovementHelper._instance;
};


StairsMovementHelper.prototype.initialize = function () {
    StairsMovementHelper._app = this.app;
    if (!StairsMovementHelper._instance) {
        StairsMovementHelper._instance = this;
    }

    this._stairEndPosition = this.entity.getPosition();
    this._stairStartPositions = this.entity.children.map(c => c.getPosition());
    this._stairsHalfWidth = this.entity.children[0].getLocalScale().x / 2;
};

StairsMovementHelper.prototype.getStairIndexForPosition = function(worldPosition) {
    for(let i = 0; i < this._stairStartPositions.length; i++) {
        const startPosition = this._stairStartPositions[i];
        if(startPosition.z < worldPosition.z && this._stairEndPosition.z > worldPosition.z && Math.abs(worldPosition.x - startPosition.x) <= this._stairsHalfWidth) return i;
    }
    return -1;
};

StairsMovementHelper.prototype.getGroundY = function(worldPosition) {
    const stairIndex = this.getStairIndexForPosition(worldPosition);
    if(stairIndex === -1) return GameConfig.getAttribute('audience', 'groundY');

    return this._stairStartPositions[stairIndex].y;
}

// Screen_RoundSearch.js
class ScreenRoundSearch extends BaseWindow {

    initialize() {
        super.initialize();

        this.overlay = this.entity.findByName('Overlay');
        this.roundTitle = this.entity.findByName('RoundTitle');
        this.textScoreMultiplier = this.entity.findByName('ScoreMultiplierText');
        this.textCountdown = this.entity.findByName('TextCountdown');
        this.textGo = this.entity.findByName('TextGo');
        this.playerName = this.entity.findByName('PlayerName');
        this.opponentName = this.entity.findByName('OpponentName');
        this.searchingOpponentsContainer = this.entity.findByName('SearchingOpponentsContainer');
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        /* hide texts */
        this.textCountdown.element.opacity = 0;
        this.textGo.element.opacity = 0;
        this.roundTitle.enabled = false;
        this.textScoreMultiplier.enabled = false;

        /* contestants */
        this._showPlayerContenstant();


        /* show grey opponent */
        const greyOpponentColor = GameConfig.getAttribute('opponentColors')[10];
        const greyOpponentData = new ContestantData(
            Constants.Contestants.OPPONENT,
            '?',
            greyOpponentColor, //grey
            SkinManager.getInstance().getSkinByName('Default')
        );
        ContestantsManager.getInstance().getOpponentContestant().setFromContestantData(greyOpponentData).then(() => {
            ContestantsManager.getInstance().getOpponentContestant().setAboveUI(true);
        });



        /* set their data */
        this.playerName.element.text = DataManager.getInstance().username || "You";
        this.playerName.element.color = new pc.Color().copy(MatchManager.getInstance().getPlayerContestantData().color.UI);
        this.opponentName.element.text = '';
        this.opponentName.element.color = new pc.Color().copy(greyOpponentColor.UI);




        /* camera transition */
        CameraController.getInstance().changeCamera(Constants.Cameras.TRANSITION_LOBBY_TO_ROUND_SEARCH).then(() => {
            CameraController.getInstance().changeCamera(Constants.Cameras.ROUND_SEARCH).then(() => {
                this._searchOpponents().then(async () => {
                    await this._onOpponentFound();
                    this.startCountdown();
                });
                this._showOpponentContestant().then(() => {

                });
            });
        });
    }

    _onHide() {
        /* show buzzers */
        this.app.fire(EventTypes.SHOW_BUZZER_LIGHTS);
        this.app.fire(EventTypes.SHOW_BUZZERS);
        this.app.fire(EventTypes.SHOW_AUDIENCE_AREAS);

        super._onHide();
    }


    _showPlayerContenstant() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();

        const duration = 0.75;
        const playerPositionA = HierarchyManager.getInstance().getByPath('Stage/StageContent/RoundSearchPositions').children[0];

        playerA.setAboveUI(true);
        playerA.setYaw(180);
        playerA.setTrigger('mainMenu');
        ContestantsManager.getInstance().tweenContestantTo(playerA, playerPositionA, duration, pc.Linear);
        playerA.tween(playerA.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, duration, pc.SineOut)
            .start();
    }

    async _showOpponentContestant() {
        const playerB = ContestantsManager.getInstance().getOpponentContestant();
        const playerPositionB = HierarchyManager.getInstance().getByPath('Stage/StageContent/RoundSearchPositions').children[1];

        playerB.setAboveUI(true);
        playerB.setYaw(180, true);
        ContestantsManager.getInstance().tweenContestantTo(playerB, playerPositionB, 0.01, pc.Linear);
        await ContestantsManager.getInstance().appearOpponentContestant();
    }

    async _onOpponentFound() {

        /* restore its original skin */
        const opponentData = MatchManager.getInstance().getOpponentContestantData();
        this.opponentName.element.color = new pc.Color().copy(opponentData.color.UI);
        this.app.fire(EventTypes.SET_CONTESTANT_COLORS, Constants.Contestants.OPPONENT, opponentData.color);
        await ContestantsManager.getInstance().getOpponentContestant().setFromContestantData(opponentData);
        ContestantsManager.getInstance().getOpponentContestant().setAboveUI(true);
    }

    _searchOpponents(duration = 3) {
        return new Promise((resolve, reject) => {
            const nameDuration = 0.425;
            const numNames = Math.floor(duration / nameDuration) - 1;
            const names = this._prepareOpponentNames(numNames);
            names.push(DataManager.getInstance().opponentName);

            names.forEach((name, index) => {
                Utils.wait(nameDuration * index * 1000).then(() => this._showOpponentName(name, nameDuration, index === names.length - 1));
            });

            Utils.wait(duration * 1000).then(() => resolve());
        });
    }

    _prepareOpponentNames(amount) {
        const namesArray = LocalizationManager.getInstance().getPlayerNames();
        const names = [];
        for (let i = 0; i < amount; i++) names.push(Utils.removeRandomItem(namesArray) || "Opponent");
        return names;
    }

    _showOpponentName(name, duration, saveName) {
        if (saveName) {
            DataManager.getInstance().opponentName = name;
        }
        this.opponentName.element.text = `${name}`;
        this.opponentName.setLocalScale(0.5, 0.5, 0.5);
        this.opponentName.tween(this.opponentName.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, duration * 0.9, pc.BackOut)
            .start();
    }

    startCountdown() {
        this.searchingOpponentsContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);

        Utils.wait(150).then(() => {
            ContestantsManager.getInstance().getOpponentContestant().setTrigger('victory');
        })

        const baseDelay = 500;
        const tickDelay = 850;
        const roundIndex = RoundManager.getInstance().getRoundIndex();

        this.roundTitle.enabled = true;
        this.roundTitle.element.text = LocalizationManager.getInstance().getLocalizedText(`ROUND ${roundIndex}`);
        this.roundTitle.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        if (roundIndex >= 1) {
            this.textScoreMultiplier.enabled = true;
            const textValues = ['', '', 'DOUBLE POINTS', 'TRIPLE POINTS']
            this.textScoreMultiplier.element.text = LocalizationManager.getInstance().getLocalizedText(textValues[roundIndex] || "");
            this.textScoreMultiplier.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        }

        Utils.wait(baseDelay).then(() => this._tweenCountdownText(3));
        Utils.wait(baseDelay + tickDelay).then(() => this._tweenCountdownText(2));
        Utils.wait(baseDelay + tickDelay * 2).then(() => this._tweenCountdownText(1));
        Utils.wait(baseDelay + tickDelay * 3).then(() => this._tweenGoText());
        Utils.wait(baseDelay + tickDelay * 4.25).then(() => this.proceedToNextScreen())
    }

    _tweenCountdownText(value) {
        this.textCountdown.element.text = `${value}`;
        this.textCountdown.setLocalScale(0, 0, 0);
        this.textCountdown.tween(this.textCountdown.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, 0.425, pc.SineInOut)
            .repeat(2)
            .yoyo(true)
            .start();

        this.textCountdown.element.opacity = 0;
        this.textCountdown.tween(this.textCountdown.element)
            .to({ opacity: 1 }, 0.25, pc.SineInOut)
            .repeat(2, 0.35)
            .yoyo(true)
            .start();
    }

    _tweenGoText() {
        this.textGo.setLocalScale(0, 0, 0);
        this.textGo.tween(this.textGo.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, 0.5, pc.BackOut)
            .repeat(2, 0.75)
            .yoyo(true)
            .start();

        this.textGo.element.opacity = 0;
        this.textGo.tween(this.textGo.element)
            .to({ opacity: 1 }, 0.25, pc.SineInOut)
            .repeat(2, 0.5)
            .yoyo(true)
            .start();

    }

    _tweenContestantsToRoundPositions() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        const playerB = ContestantsManager.getInstance().getOpponentContestant();
        const contestantPositionA = HierarchyManager.getInstance().getByPath('Stage/StageContent/ContestantPositions/ContenstantPositionA');
        const contestantPositionB = HierarchyManager.getInstance().getByPath('Stage/StageContent/ContestantPositions/ContenstantPositionB');

        playerA.setAboveUI(false);
        playerB.setAboveUI(false);

        ContestantsManager.getInstance().tweenContestantTo(playerA, contestantPositionA, 0.5, pc.SineOut);//.then(() => playerA.setAboveUI(false));
        ContestantsManager.getInstance().tweenContestantTo(playerB, contestantPositionB, 0.5, pc.SineOut);//.then(() => playerB.setAboveUI(false));
    }

    update(dt) {

    }

    proceedToNextScreen() {
        this._tweenContestantsToRoundPositions();

        CameraController.getInstance().changeCamera(Constants.Cameras.TRANSITION_ROUND_SEARCH_TO_ROUND).then(() => {
            CameraController.getInstance().changeCamera(Constants.Cameras.ROUND);
        });

        UIController.getInstance().hide(Constants.Screens.ROUND_SEARCH);

        MatchManager.getInstance().showHintAndProceedToRound();
    }

}

pc.registerScript(ScreenRoundSearch, 'screenRoundSearch');

// dynamicFov.js
var DynamicFov = pc.createScript('dynamicFov');


DynamicFov.attributes.add('minLandscapeAspectRatio', {
    type: 'number',
    default: 0.8
});

DynamicFov.attributes.add('customLandscapeFov', {
    type: 'boolean',
    default: false
});

DynamicFov.attributes.add('landscapeFov', {
    type: 'number',
    default: 45
});

DynamicFov.prototype.initialize = function () {
    this._originalFov = this.entity.camera.fov;

    this.app.graphicsDevice.on('resizecanvas', this.onResizeCanvas, this);
    this.onResizeCanvas();
};

DynamicFov.prototype.update = function (dt) {

};

DynamicFov.prototype.onResizeCanvas = function () {
    // if (this.enabled) {
        const height = this.app.graphicsDevice.height;
        const width = this.app.graphicsDevice.width;
        const aspectRatio = width / height;
        
        this.entity.camera.horizontalFov = aspectRatio <= this.minLandscapeAspectRatio;

        if(aspectRatio > this.minLandscapeAspectRatio && this.customLandscapeFov) {
            this.entity.camera.fov = this.landscapeFov;
        } else {
            this.entity.camera.fov = this._originalFov;
        }
    // }
};

// cameraTransition.js
var CameraTransition = pc.createScript('cameraTransition');


CameraTransition.attributes.add('autoStart', {
    title: "Auto Start On Enable",
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add("startCamera", { type: "entity", title: "Start Camera" });
CameraTransition.attributes.add("endCamera", { type: "entity", title: "End Camera" });
CameraTransition.attributes.add("duration", { type: "number", default: 1, title: "Duration (Secs)" });

CameraTransition.attributes.add('tweenCurve', {
    type: 'curve',
    curves: ['time'],
    default: {
        keys: [0, 0, 1, 1]
    }
});

CameraTransition.attributes.add('useEasing', {
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});


CameraTransition.attributes.add('tweenPosition', {
    type: 'boolean',
    default: true
});


CameraTransition.attributes.add('tweenRotation', {
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add('tweenFov', {
    type: 'boolean',
    default: true
});

CameraTransition.attributes.add('createPathOnceInitialized', {
    type: 'boolean',
    default: false
});


CameraTransition.attributes.add('recreatePathEveryStart', {
    type: 'boolean',
    default: true
});

CameraTransition.prototype.initialize = function () {

    this._initialWorldPosition = this.entity.getPosition().clone();
    this._initialWorldRotation = this.entity.getRotation().clone();

    this.time = pc.math.clamp(this.startTime, 0, this.duration);
    this.started = false;
    this.finished = false;
    this.lookAt = new pc.Vec3();
    this.up = new pc.Vec3();


    this.on('state', (enabled) => {
        if (enabled && this.autoStart) {
            this.reset();
            this.startTransition();
        }
    });

    if(this.createPathOnceInitialized) {
        this.createPath();
    }


    this.entity.setPathProgress = this.setPathProgress.bind(this);
    this.entity.startTransition = this.startTransition.bind(this);
    this.entity.reset = this.reset.bind(this);
};

CameraTransition.prototype.reset = function () {
    this.started = false;
    this.finished = false;
    this.time = 0;
    if (this.px) this.setPathProgress(0);
};

CameraTransition.prototype.startTransition = function () {
    return new Promise((resolve, reject) => {
        if (!this.startCamera) {
            this.entity.setPosition(this._initialWorldPosition);
            this.entity.setRotation(this._initialWorldRotation);
        }

        if (this.recreatePathEveryStart || !this._pathCreated) {
            this.createPath();
        }

        this.time = 0;
        this.started = true;
        this.finished = false;

        this.entity.off(EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED);
        this.entity.once(EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED, () => resolve(this.entity));
    });
};

CameraTransition.prototype.update = function (dt) {
    if (this.started && !this.finished) {
        this._updatePlayback(dt);
    }
};

CameraTransition.prototype._updatePlayback = function (dt) {
    this.time += dt;
    if (this.time >= this.duration) {
        this.time = this.duration;
    }

    this.setPathProgress(pc.math.clamp(this.time / this.duration, 0, 1));
};

CameraTransition.prototype.setPathProgress = function (progress) {

    let percent = progress;
    if (this.useEasing) {
        percent = pc[this.easing](progress);
    } else {
        percent = this.tweenCurve.value(progress);
    }


    if (!this.finished && percent >= 1.0) {
        this.finished = true;
        this.entity.fire(EventTypes.INTERNAL_CAMERA_TRANSITION_FINISHED);
        this.app.fire(EventTypes.CAMERA_TRANSITION_FINISHED, this.entity.name);
    }


    if (this.tweenPosition) {
        // Get the interpolated values for the position from the curves     
        this.entity.setPosition(this.px.value(percent), this.py.value(percent), this.pz.value(percent));
    }

    if (this.tweenRotation) {
        // Get the interpolated values for the look at point from the curves 
        this.lookAt.set(this.tx.value(percent), this.ty.value(percent), this.tz.value(percent));

        // Get the interpolated values for the up vector from the curves     
        this.up.set(this.ux.value(percent), this.uy.value(percent), this.uz.value(percent));

        // Make the camera look at the interpolated target position with the correct
        // up direction to allow for camera roll and to avoid glimbal lock
        this.entity.lookAt(this.lookAt, this.up);
    }

    if (this.tweenFov) {
        const startCamera = this.startCamera ? this.startCamera : this.entity;
        this.entity.camera.fov = pc.math.lerp(startCamera.camera.fov, this.endCamera.camera.fov, percent);
        this.entity.camera.horizontalFov = percent > 0.5 ? this.endCamera.camera.horizontalFov : startCamera.camera.horizontalFov;
    }
};


CameraTransition.prototype.createPath = function () {
    const curveMode = pc.CURVE_CARDINAL;

    // Create curves for position
    this.px = new pc.Curve();
    this.px.type = curveMode;

    this.py = new pc.Curve();
    this.py.type = curveMode;

    this.pz = new pc.Curve();
    this.pz.type = curveMode;

    // Create curves for target look at position
    this.tx = new pc.Curve();
    this.tx.type = curveMode;

    this.ty = new pc.Curve();
    this.ty.type = curveMode;

    this.tz = new pc.Curve();
    this.tz.type = curveMode;

    // Create curves for the 'up' vector for use with the lookAt function to 
    // allow for roll and avoid gimbal lock
    this.ux = new pc.Curve();
    this.ux.type = curveMode;

    this.uy = new pc.Curve();
    this.uy.type = curveMode;

    this.uz = new pc.Curve();
    this.uz.type = curveMode;

    var nodes = [this.startCamera || this.entity, this.endCamera];

    // Get the total linear distance of the path (this isn't correct but gives a decent approximation in length)
    var pathLength = 0;

    // Store the distance from the start of the path for each path node
    var nodePathLength = [];

    // For use when calculating the distance between two nodes on the path
    var distanceBetween = new pc.Vec3();

    // Push 0 as we are starting our loop from 1 for ease
    nodePathLength.push(0);

    for (i = 1; i < nodes.length; i++) {
        var prevNode = nodes[i - 1];
        var nextNode = nodes[i];

        // Work out the distance between the current node and the one before in the path
        distanceBetween.sub2(prevNode.getPosition(), nextNode.getPosition());
        pathLength += distanceBetween.length();

        nodePathLength.push(pathLength);
    }

    for (i = 0; i < nodes.length; i++) {
        // Calculate the time for the curve key based on the distance of the path to the node
        // and the total path length so the speed of the camera travel stays relatively
        // consistent throughout
        var t = nodePathLength[i] / pathLength;

        var node = nodes[i];

        var pos = node.getPosition();
        this.px.add(t, pos.x);
        this.py.add(t, pos.y);
        this.pz.add(t, pos.z);

        // Create and store a lookAt position based on the node position and the forward direction
        var lookAt = pos.clone().add(node.forward);
        this.tx.add(t, lookAt.x);
        this.ty.add(t, lookAt.y);
        this.tz.add(t, lookAt.z);

        var up = node.up;
        this.ux.add(t, up.x);
        this.uy.add(t, up.y);
        this.uz.add(t, up.z);
    }

    this._pathCreated = true;
};


// lookAtActiveCamera.js
/* jshint esversion: 6 */
var LookAtactiveCamera = pc.createScript('lookAtactiveCamera');


LookAtactiveCamera.prototype.initialize = function() {

};


LookAtactiveCamera.prototype.update = function(dt) {
    const activeCamera = CameraController.getInstance().getActiveCamera();
    if(activeCamera) {
        this.entity.lookAt(activeCamera.getPosition());
    } 
};


// lookAt.js
var LookAt = pc.createScript('lookAt');

LookAt.attributes.add('targetEntity', {
    type: 'entity'
})

LookAt.prototype.initialize = function () {

};

LookAt.prototype.update = function (dt) {
    if(this.targetEntity)
        this.entity.lookAt(this.targetEntity.getPosition());
    
};


// Levenshtein.js
const Levenshtein = (function () {
    function _min(d0, d1, d2, bx, ay) {
        return d0 < d1 || d2 < d1
            ? d0 > d2
                ? d2 + 1
                : d0 + 1
            : bx === ay
                ? d1
                : d1 + 1;
    }

    function _standartizeString(str) {
        str = str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") //remove diacritics;
        if(str.endsWith('s')) str = str.slice(0, -1);
        return str;
    }

    function _normalize(value, a, b) {
        const maxLength = Math.max(a.length, b.length);
        return (maxLength - value) / maxLength;
    }

    return function (a, b) {
        if (a === b) {
            return 1;
        }

        a = _standartizeString(a);
        b = _standartizeString(b);

        if (a.length > b.length) {
            var tmp = a;
            a = b;
            b = tmp;
        }

        var la = a.length;
        var lb = b.length;

        while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
            la--;
            lb--;
        }

        var offset = 0;

        while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
            offset++;
        }

        la -= offset;
        lb -= offset;

        if (la === 0 || lb < 3) {
            return _normalize(lb, a, b);
        }

        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;

        var vector = [];

        for (y = 0; y < la; y++) {
            vector.push(y + 1);
            vector.push(a.charCodeAt(offset + y));
        }

        var len = vector.length - 1;

        for (; x < lb - 3;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            bx1 = b.charCodeAt(offset + (d1 = x + 1));
            bx2 = b.charCodeAt(offset + (d2 = x + 2));
            bx3 = b.charCodeAt(offset + (d3 = x + 3));
            dd = (x += 4);
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                ay = vector[y + 1];
                d0 = _min(dy, d0, d1, bx0, ay);
                d1 = _min(d0, d1, d2, bx1, ay);
                d2 = _min(d1, d2, d3, bx2, ay);
                dd = _min(d2, d3, dd, bx3, ay);
                vector[y] = dd;
                d3 = d2;
                d2 = d1;
                d1 = d0;
                d0 = dy;
            }
        }

        for (; x < lb;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            dd = ++x;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
                d0 = dy;
            }
        }

        return _normalize(dd, a, b);
    };
})();

// ScrollingTexture.js
var ScrollingTexture = pc.createScript('scrollingTexture');

ScrollingTexture.attributes.add('speed', {
    type: 'vec2',
    default: [0, -0.1]
});

ScrollingTexture.attributes.add('viaShaderParameter', {
    title: "Use Shader Param",
    type: 'boolean',
    default: true
});

ScrollingTexture.attributes.add('meshInstanceIndices', {
    title: "Mesh Instance #",
    type: 'number',
    array: true,
    default: [0]
});

ScrollingTexture.prototype.initialize = function () {
    this.offset = new pc.Vec2(0, 0);
    this.uniform0 = [];
    this.uniform1 = [];
};

ScrollingTexture.prototype.update = function (dt) {

    if (!this.entity.render) return;

    this.offset.x += this.speed.x * dt;
    this.offset.y += this.speed.y * dt;

    const meshInstances = this.entity.render.meshInstances;

    if (this.viaShaderParameter) {
        meshInstances.forEach((meshInstance, index) => {
            if (this.meshInstanceIndices.indexOf(index) !== -1) {
                this.uniform0[0] = meshInstance.material.diffuseMapTiling.x;
                this.uniform0[1] = 0;
                this.uniform0[2] = this.offset.x % 1;

                this.uniform1[0] = 0;
                this.uniform1[1] = meshInstance.material.diffuseMapTiling.y;
                this.uniform1[2] = this.offset.y % 1;

                meshInstance.setParameter("texture_diffuseMapTransform0", this.uniform0);
                meshInstance.setParameter("texture_diffuseMapTransform1", this.uniform1);
            }
        });
    } else {
        meshInstances.forEach((meshInstance, index) => {
            if (this.meshInstanceIndices.indexOf(index) !== -1) {
                meshInstance.material.diffuseMapOffset.set(this.offset.x % 1, this.offset.y % 1);
                meshInstance.material.update();
            }
        });
    }
};




// ContestantsManager.js
var ContestantsManager = pc.createScript('contestantsManager');


ContestantsManager.getInstance = function () {
    if (!ContestantsManager._instance) console.error('ContestantsManager is not initialized yet');
    return ContestantsManager._instance;
};

ContestantsManager.prototype.initialize = function () {
    ContestantsManager._app = this.app;
    if (!ContestantsManager._instance) {
        ContestantsManager._instance = this;
    }

    this.playerContestant = this.entity.children[0];
    this.opponentContestant = this.entity.children[1];

    this.opponentContestant.setLocalScale(0, 0, 0);
};

ContestantsManager.prototype.postInitialize = function () {

};

ContestantsManager.prototype.getContestant = function (contestantType) {
    return (contestantType === Constants.Contestants.PLAYER) ? this.playerContestant : this.opponentContestant;
};

ContestantsManager.prototype.getPlayerContestant = function () {
    return this.playerContestant;
};

ContestantsManager.prototype.getOpponentContestant = function () {
    return this.opponentContestant;
};

ContestantsManager.prototype.appearOpponentContestant = function (immediately = false) {
    return new Promise((resolve, reject) => {
        if (immediately) {
            this.opponentContestant.setLocalScale(pc.Vec3.ONE);
            this.opponentContestant.setTrigger('idle');
            resolve();
        } else {
            this.opponentContestant.tween(this.opponentContestant.getLocalScale())
                .to({ x: 1, y: 1, z: 1 }, 0.5, pc.SineOut)
                .onComplete(() => {
                    this.opponentContestant.setTrigger('idle');
                    resolve();
                })
                .start();
        }
    });
};

ContestantsManager.prototype.tweenContestantTo = function (contestant, targetEntity, duration, ease = pc.Linear) {
    return new Promise((resolve, reject) => {
        const targetPosition = targetEntity.getPosition();
        const targetRotation = targetEntity.getRotation();

        const sourcePosition = contestant.getPosition().clone();
        const sourceRotation = contestant.getRotation().clone();

        contestant.setPosition(targetPosition);
        contestant.setRotation(targetRotation);

        const targetLocalPosition = contestant.getLocalPosition().clone();
        const targetLocalEulerAngles = contestant.getLocalEulerAngles().clone();

        contestant.setPosition(sourcePosition);
        contestant.setRotation(sourceRotation);

        contestant.setYaw(Utils.getYawFromRotation(targetRotation));

        contestant.tween(contestant.getLocalPosition())
            .to(targetLocalPosition, duration, ease)
            .onComplete(() => resolve())
            .start();
    });
};

ContestantsManager.prototype.pressButton = function (contestantType, answerCorrect) {
    this.getContestant(contestantType).setTrigger('button', true);
    Utils.wait(300).then(() => {
        this.app.fire(EventTypes.BUZZER_PRESS_BUTTON_ANIM, contestantType);
        this.app.fire(EventTypes.BUZZER_PLAY_ANSWER_ANIM, contestantType, answerCorrect);
    });

    /* fix to bring it back to idle state */
    Utils.wait(500).then(() => this.getContestant(contestantType).setTrigger('idle'));
};


ContestantsManager.prototype.update = function (dt) {

};


// Screen_Round.js
class ScreenRound extends BaseWindow {

    initialize() {
        super.initialize();

        this.questionText = this.entity.findByName('QuestionText');
        this.scorePlayer1 = this.entity.findByName('ScorePlayer1');
        this.scorePlayer2 = this.entity.findByName('ScorePlayer2');

        this.tutorialSkipContainer = this.entity.findByName('TutorialSkipContainer');
        this.tapToContinueContainer = this.entity.findByName('TapToContinueContainer');

        this.app.on(EventTypes.SET_CONTESTANT_SCORE, this._setContestantScore, this);
        this.app.on(EventTypes.SET_CONTESTANT_COLORS, this._setupColors, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        /* reset audience */
        this.app.fire(EventTypes.RESET_AUDIENCE);

        this.app.fire(EventTypes.CHANGE_LOCATION, Constants.Locations.STAGE);

        this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, true);
        if (TournamentManager.getInstance().tournamentActive) {
            this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_INFO, TournamentManager.getInstance().getCurrentTournamentInfo());
        } else {
            this.app.fire(EventTypes.SET_TOURNAMENT_BANNER_INFO, null);
        }

        SkyboxManager.getInstance().restoreOriginalSkybox();

        UIController.getInstance().showPopup(Constants.Screens.ANSWER_PANEL);
        UIController.getInstance().showPopup(Constants.Screens.KEYBOARD);

        /* camera transition */
        if (CameraController.getInstance().getActiveCameraName() !== Constants.Cameras.ROUND) {
            CameraController.getInstance().changeCamera(Constants.Cameras.ROUND);
        }

        this.tutorialSkipContainer.enabled = false;
        this.tapToContinueContainer.enabled = false;

        this.launchRound();
    }

    _onAppeared() {

        this.app.once(EventTypes.ROUND_FINISHED, this._onRoundFinished, this);

        RoundManager.getInstance().getActiveRound().setState(Constants.RoundState.GAME);
    }

    _onHide() {
        this.app.off(EventTypes.ROUND_FINISHED, this._onRoundFinished, this);
        super._onHide();
    }

    _onRoundFinished() {
        this.proceedToNextScreen();
    }

    _setContestantScore(contestantType, value) {
        if (contestantType === Constants.Contestants.PLAYER) {
            this.scorePlayer1.setScore(value);
        } else {
            this.scorePlayer2.setScore(value);
        }
    }

    _setupColors(contenstantType, colorsData) {
        if (contenstantType === Constants.Contestants.PLAYER) {
            this.scorePlayer1.setColor(colorsData.UI);
        } else {
            this.scorePlayer2.setColor(colorsData.UI);
        }
    }

    launchRound() {
        RoundManager.getInstance().getActiveRound().setState(Constants.RoundState.INTRO);

        /* reset players */
        ContestantsManager.getInstance().getPlayerContestant().setTrigger('idle');
        ContestantsManager.getInstance().getOpponentContestant().setTrigger('idle');

        /* set question */
        this.questionText.element.text = `${RoundManager.getInstance().getActiveRound().question.questionText}`;
    }

    update(dt) {

    }

    proceedToNextScreen() {
        Promise.all([
            UIController.getInstance().hide(Constants.Screens.ANSWER_PANEL),
            UIController.getInstance().hide(Constants.Screens.KEYBOARD),
        ])
            .then(() => {
                UIController.getInstance().showPopup(Constants.Screens.ROUND_RESULTS);
            })
    }

}

pc.registerScript(ScreenRound, 'screenRound');

// Contestant.js
var Contestant = pc.createScript('contestant');

Contestant.attributes.add('defaultSkinScale', {
    type: 'vec3',
    default: [0.018, 0.018, 0.018]
})

Contestant.prototype.initialize = function () {

    this._sourceWorldPosition = this.entity.getPosition().clone();
    this._movementStartWorldPosition = new pc.Vec3();
    this._movementEndWorldPosition = new pc.Vec3();
    this._speed = GameConfig.getAttribute('contestant', 'speed');
    this._angularSpeed = GameConfig.getAttribute('contestant', 'angularSpeed');
    this._acceleration = GameConfig.getAttribute('contestant', 'acceleration');
    this._lookingAngleCorrection = GameConfig.getAttribute('contestant', 'lookingAngleCorrection');
    this._velocity = new pc.Vec3();
    this._gravityEnabled = true;
    this._pendingAnimTrigger = undefined;

    this.contestantType = Constants.Contestants.OPPONENT;
    this.contestantData = null;
    this.threeDimensionScreenDailyChallenge = this.entity.findByName('3D Screen Daily Challenge');
    this.dailyChallengeNameContainer = this.threeDimensionScreenDailyChallenge.findByName('DailyChallengeName');
    this.dailyChallengeNameText = this.dailyChallengeNameContainer.findByName('PlayerNameText');

    this.threeDimensionScreenTournament = this.entity.findByName('3D Screen Tournament');
    this.tournamentNameContainer = this.threeDimensionScreenTournament.findByName('TournamentName');
    this.tournamentNameText = this.tournamentNameContainer.findByName('PlayerNameText');

    this.visualContainer = this.entity.findByName('Visual');
    this.character = this.visualContainer.children[0];

    this.skinData = null;

    /** movement */
    this._resetMovementData();

    this.entity.setFromContestantData = this._setFromContestantData.bind(this);
    this.entity.getContestantData = this._getContestantData.bind(this);
    this.entity.setAboveUI = this._setAboveUI.bind(this);
    this.entity.setTrigger = this._setTrigger.bind(this);
    this.entity.moveToPosition = this._moveToPosition.bind(this);
    this.entity.getYaw = this._getYaw.bind(this);
    this.entity.setYaw = this._setYaw.bind(this);
    this.entity.reset = this.reset.bind(this);
    this.entity.setDefaultSkinScale = this._setDefaultSkinScale.bind(this);
    this.entity.setGravityEnabled = this._setGravityEnabled.bind(this);
    this.entity.showTournamentName = this._showTournamentName.bind(this);
    this.entity.hideTournamentName = this._hideTournamentName.bind(this);
    this.entity.showDailyChallengeName = this._showDailyChallengeName.bind(this);

    /* remember yaw from initial rotation */
    this.entity.setYaw(Utils.getYawFromRotation(this.entity.getRotation()), true);

    /* event listeners */
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

Contestant.prototype.reset = function () {
    this._resetMovementData();
    this.entity.setYaw(this._initialYaw, true);
    this._stopRunningAnim(true);
    this.entity.setTrigger('idle');
}

Contestant.prototype._setDefaultSkinScale = function (value) {
    this.defaultSkinScale.set(value, value, value);
    if (this.character) {
        this.character.setLocalScale(this.defaultSkinScale);
    }
};

Contestant.prototype._setGravityEnabled = function(value) {
    this._gravityEnabled = value;
}

Contestant.prototype._showTournamentName = function () {
    this.tournamentNameContainer.enabled = true;
}

Contestant.prototype._hideTournamentName = function () {
    this.tournamentNameContainer.enabled = false;
}

Contestant.prototype._showDailyChallengeName = function () {
    this.dailyChallengeNameContainer.enabled = true;
}

Contestant.prototype._getContestantData = function() {
    return this.contestantData;  
};

Contestant.prototype._setFromContestantData = function (contestantData) {
    this.contestantData = contestantData;
    this.contestantType = contestantData.contestantType;
    this.setName(contestantData.name, contestantData.color.name);
    return this.setSkinAndColor(contestantData.skin, contestantData.color.skin);
};

Contestant.prototype.setSkinAndColor = function (skin, skinColor) {
    return new Promise((resolve, reject) => {
        if (this.skinData && this.skinData.name === skin.name) {
            // console.warn('Contestant ' + this.contestantType + ' has already equipped skin ' + skin.name);
            resolve();
            return;
        }

        this.skinData = skin || SkinManager.getInstance().getDefaultSkin();
        AssetsLoader.getInstance().loadByTag('skin_' + this.skinData.name).then(() => {
            for (let i = this.visualContainer.children.length - 1; i > -1; i--) {
                this.visualContainer.children[i].destroy();
            }
            try {
                const skinInstance = this.skinData.template.resource.instantiate();
                this.visualContainer.addChild(skinInstance);
                skinInstance.setLocalEulerAngles(pc.Vec3.ZERO);
                skinInstance.setLocalPosition(pc.Vec3.ZERO);
                skinInstance.setLocalScale(this.defaultSkinScale);
                this.character = skinInstance;

                /* color */
                if (this.skinData.colored) {
                    this.character.children[0].render.meshInstances.forEach(mi => mi.setParameter('material_diffuse', Utils.getGammaCorrectedColorUniform(skinColor)));
                }

                resolve();

            } catch (e) {
                console.warn('Can not instantiate skin template ' + this.skinData.name + ': error details', e);
                reject('skin error: ' + e.toString());
            }
        })

    })

};


Contestant.prototype.setName = function (string, color) {
    this.tournamentNameText.element.text = `${string}`;
    this.tournamentNameText.element.color = new pc.Color().copy(color);

    this.dailyChallengeNameText.element.text = `${string}`;
};

Contestant.prototype._resetMovementData = function () {
    this._inMovement = false;
    this._gravity = GameConfig.getAttribute('contestant', 'gravity');
    this._groundY = GameConfig.getAttribute('contestant', 'groundY');
    this._useLinearGravity = GameConfig.getAttribute('contestant', 'linearGravity');
    this._currentYaw = 0;
    this._targetYaw = 0;
    this._currentVelocity = 0;
    this._targetVelocity = 0;
    this._velocity.set(0, 0, 0);
    this._prevFrameDistanceToTarget = Number.MAX_SAFE_INTEGER;
};

Contestant.prototype._setTrigger = function (key, singleFrame = true) {
    if (this.character.anim) {
        this.character.anim.setTrigger(key, singleFrame);
    } else {
        console.warn('Can not set trigger "' + key + '": no anim component');
        this._pendingAnimTrigger = key;
    }
};

Contestant.prototype._setAboveUI = function (value) {
    if (value) {
        LayersHelper.getInstance().addLayer('Above', this.visualContainer);
    } else {
        LayersHelper.getInstance().removeLayer('Above', this.visualContainer);
    }
};

Contestant.prototype.update = function (dt) {
    const worldPosition = this.entity.getPosition();
    if (this._inMovement) {
        this._updateHorizontalMovement(worldPosition, dt);
    }
    this._updateLookingAngle(worldPosition, dt);
    this._updateGroundPosition(worldPosition, dt);
    this._applyGravity(worldPosition, dt);

    /* apply updated position */
    this.entity.setPosition(worldPosition);
};

Contestant.prototype.postUpdate = function (dt) {
    if (this.character && this.character.anim && this._pendingAnimTrigger) {
        console.warn('set pending anim trigger ' + this._pendingAnimTrigger)
        this.character.anim.setTrigger(this._pendingAnimTrigger, true);
        this._pendingAnimTrigger = undefined;
    }
}

Contestant.prototype._getYaw = function () {
    return this._currentYaw;
};


Contestant.prototype._setYaw = function (yaw, immediately = false) {
    this._targetYaw = yaw;
    if (this._initialYaw === undefined) this._initialYaw = yaw;
    if (immediately) {
        this._currentYaw = yaw;
        this.entity.setLocalEulerAngles(0, this._currentYaw, 0);
    }
};


/** movement **/

Contestant.prototype._moveToPosition = function (worldPosition, slowly = false) {
    this._movementStartWorldPosition.copy(this.entity.getPosition());
    this._movementEndWorldPosition.copy(worldPosition);
    const distanceHorizontal = Utils.distanceXZ(this._movementStartWorldPosition, this._movementEndWorldPosition);
    const dx = this._movementEndWorldPosition.x - this._movementStartWorldPosition.x;
    const dz = this._movementEndWorldPosition.z - this._movementStartWorldPosition.z;
    const duration = distanceHorizontal / this._speed * (slowly ? 2 : 1);
    this._prevFrameDistanceToTarget = distanceHorizontal;

    this._velocity.x = dx / duration;
    this._velocity.z = dz / duration;
    this._inMovement = true;

    /* set looking direction */
    this._targetYaw = Utils.getYawBetweenVectors(this._movementStartWorldPosition, this._movementEndWorldPosition);

    if(slowly) {
        this._playWalkingAnim();
    } else {
        this._playRunningAnim();
    }

    return new Promise((resolve, reject) => {
        this.entity.once(EventTypes.Contestant.MOVEMENT_FINISHED, () => resolve(this.entity));
    });
};

Contestant.prototype._finishMovement = function () {
    this._inMovement = false;
    this._currentVelocity = 0;
    this._targetVelocity = 0;
    this._velocity.x = 0;
    this._velocity.z = 0;
    this._prevFrameDistanceToTarget = Number.MAX_SAFE_INTEGER;

    this._stopRunningAnim();

    Utils.wait(0).then(() => {
        this.entity.fire(EventTypes.Contestant.MOVEMENT_FINISHED);
    });
}



Contestant.prototype._updateHorizontalMovement = function (worldPosition, dt) {
    /* horizontal movement */
    const maxFrameWalkingDistance = this._speed * dt;
    const distanceToTarget = Utils.distanceXZ(worldPosition, this._movementEndWorldPosition);
    if (distanceToTarget <= maxFrameWalkingDistance || distanceToTarget > this._prevFrameDistanceToTarget) {
        /* destination reached */
        worldPosition.x = this._movementEndWorldPosition.x;
        worldPosition.z = this._movementEndWorldPosition.z;
        this._finishMovement();
    } else {
        worldPosition.x += this._velocity.x * dt;
        worldPosition.z += this._velocity.z * dt;
        this._prevFrameDistanceToTarget = distanceToTarget;
    }
};


Contestant.prototype._updateLookingAngle = function (worldPosition, dt) {
    /* looking direction */
    const maxFrameDeltaAngle = this._angularSpeed * dt;
    const deltaAngle = Utils.angleDifference(this._currentYaw, this._targetYaw);
    if (Math.abs(deltaAngle) <= maxFrameDeltaAngle) {
        this._currentYaw = this._targetYaw;
    } else {
        this._currentYaw = Utils.normalizeAngleDegrees(this._currentYaw + maxFrameDeltaAngle * Math.sign(deltaAngle));
    }
    this.entity.setLocalEulerAngles(0, this._currentYaw, 0);
};


Contestant.prototype._updateGroundPosition = function (worldPosition, dt) {
    this._groundY = 0;
};


Contestant.prototype._applyGravity = function (worldPosition, dt) {
    if(!this._gravityEnabled) return;
    const gravity = this._gravity;
    if (this._useLinearGravity) {
        this._velocity.y = gravity;
    } else {
        this._velocity.y += dt * gravity;
    }

    worldPosition.y = Math.max(worldPosition.y + dt * this._velocity.y, this._groundY);
    if (worldPosition.y <= this._groundY) this._velocity.y = 0;
};

Contestant.prototype._playRunningAnim = function () {
    this.character.anim.setBoolean('moving', true);
    this.character.anim.setBoolean('walking', false);
};

Contestant.prototype._playWalkingAnim = function () {
    this.character.anim.setBoolean('moving', true);
    this.character.anim.setBoolean('walking', true);
};

Contestant.prototype._stopRunningAnim = function (playIdleAnim = false) {
    this.character.anim.setBoolean('moving', false);
    this.character.anim.setBoolean('walking', false);
    if (playIdleAnim) this.entity.setTrigger('idle');
};

// punishmentButton.js
var PunishmentButton = pc.createScript('punishmentButton');

PunishmentButton.prototype.initialize = function () {
    this.redPart = this.entity.findByName('RedPart');
    this._depressedPosition = new pc.Vec3(0, 0, 0);
    this._pressedPosition = new pc.Vec3(0, -0.22, 0);

    this.stopped = false;
    this._pendingClosestIcon = false;
    this.offsetX = 0;
    this.scrollSpeed = 0.5;

    this.iconTypes = [
        Constants.Punishments.LAVA,
        Constants.Punishments.WRECKING_BALL,
        Constants.Punishments.ICE,
        Constants.Punishments.WATERFALL,
        Constants.Punishments.TORNADO
    ];

    this.entity.start = this._start.bind(this);
    this.entity.press = this._press.bind(this);
    this.entity.release = this._release.bind(this);
};

PunishmentButton.prototype.update = function (dt) {
    if (!this.stopped) {
        this.offsetX = (this.offsetX + this.scrollSpeed * dt) % 1;

        let iconIndex = this.offsetX * 5;

        if (this._pendingClosestIcon && iconIndex >= this._closestNeededIndex) {
            iconIndex = this._closestNeededIndex;
            this.offsetX = iconIndex / 5;
            this._pendingClosestIcon = false;
            this.stopped = true;
        }

        this.redPart.render.meshInstances.forEach((meshInstance, index) => {
            meshInstance.material.diffuseMapOffset.set(this.offsetX, 0);
            meshInstance.material.update();
        });
    }
};

PunishmentButton.prototype._start = function () {
   this.stopped = false;
   this.offsetX = Math.random();
   this._pendingClosestIcon = false;
   this._closestNeededIndex = 0;
};


PunishmentButton.prototype._press = function (delay = 0) {
    return new Promise((resolve, reject) => {
        this.redPart.tween(this.redPart.getLocalPosition())
            .to(this._pressedPosition, 0.15, pc.Linear)
            .delay(delay / 1000)
            .onComplete(() => {
                this.stopAtClosestIcon();
                resolve(this.getClosestIconType())
            })
            .start();
    })
};

PunishmentButton.prototype._release = function () {
    return new Promise((resolve, reject) => {
        this.redPart.setLocalPosition(this._depressedPosition);
        resolve();
    })
};

PunishmentButton.prototype.stopAtClosestIcon = function () {
    this._closestNeededIndex = Math.ceil(this.offsetX * 5) % 5;
    this._pendingClosestIcon = true;
};

PunishmentButton.prototype.getClosestIconType = function () {
    return this.iconTypes[this._closestNeededIndex];
};

// KeyboardKey.js
var KeyboardKey = pc.createScript('keyboardKey');

KeyboardKey.attributes.add('symbol', {
    type: 'string',
    default: '?'
});

KeyboardKey.attributes.add('additionalSymbols', {
    type: 'string',
    default: ''
});


KeyboardKey.attributes.add('specialKeyCode', {
    type: 'string',
    default: ''
});

KeyboardKey.attributes.add('specialKeyName', {
    type: 'string',
    default: ''
});

KeyboardKey.attributes.add('localized', {
    type: 'boolean',
    default: false
});

KeyboardKey.prototype.initialize = function () {
    this.innerKey = this.entity.findByName('InnerKey');
    this.face = this.innerKey.findByName('Face');
    this.symbolElement = this.entity.findByName('Symbol');

    this.on('attr', this._updateView, this);
    this._updateView();

    this.allGlyphs = [this.symbol, ...this.additionalSymbols.split('')].filter(s => !!s);

    this.innerKey.on(EventTypes.BUTTON_DOWN, this.onKeyDown, this);
    this.innerKey.on(EventTypes.BUTTON_UP, this.onKeyUp, this);
    this.innerKey.on(EventTypes.BUTTON_DRAG, this.onKeyDrag, this);
    this.innerKey.on(EventTypes.BUTTON_PRESSED, this.onKeyPressed, this);
    this.app.on(EventTypes.UPPERCASE_MODE_CHANGED, this._updateView, this);

    this.entity.getSymbol = () => this.symbol || this.specialKeyCode;

    this.on('destroy', this._destroy, this);
};

KeyboardKey.prototype.onKeyPressed = function () {
    if (this.symbol) this.app.fire(EventTypes.KEYBOARD_SYMBOL_TYPED, DataManager.getInstance().uppercaseMode ? `${this.symbol}`.toUpperCase() : this.symbol);
    if (this.specialKeyCode) this.app.fire(EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED, this.specialKeyCode);
};

KeyboardKey.prototype.onKeyDown = function (event) {
    this.face.element.opacity = 0.6;

    if(this.symbol && !this.specialKeyCode) {
        this.app.fire(EventTypes.SHOW_EXTRA_SYMBOLS_PANEL, [this.symbol], this.entity.getPosition());

        this._showAllGlyphsTimeout = setTimeout(() => {
            if(this.allGlyphs.length > 1) {                
                this.app.fire(EventTypes.SHOW_EXTRA_SYMBOLS_PANEL, this.allGlyphs, this.entity.getPosition());
            }
        }, GameConfig.getAttribute('UI', 'keyboardExtraSymbolsPanelDelay') * 1000);
    }
};

KeyboardKey.prototype.onKeyDrag = function (event) {
    this.app.fire(EventTypes.EXTRA_SYMBOLS_PANEL_DISPATCH_DRAG, event);
};


KeyboardKey.prototype.onKeyUp = function (event) {
    this.face.element.opacity = 1;
    this.app.fire(EventTypes.EXTRA_SYMBOLS_PANEL_DISPATCH_RELEASE, event);
    this.app.fire(EventTypes.HIDE_EXTRA_SYMBOLS_PANEL);
    if(this._showAllGlyphsTimeout) {
        clearTimeout(this._showAllGlyphsTimeout);
        this._showAllGlyphsTimeout = undefined;
    }
};


KeyboardKey.prototype.update = function (dt) {

};

KeyboardKey.prototype._updateView = function () {
    if (this.symbolElement) {
        if (DataManager.getInstance().uppercaseMode) {
            if (this.symbol) this.symbolElement.element.text = `${this.symbol}`.toUpperCase();
            else {
                if (this.localized) {
                    this.symbolElement.element.key = `${this.specialKeyName}`;
                } else {
                    this.symbolElement.element.text = `${this.specialKeyName}`;
                }
            }
        } else {
            if (this.localized) {
                this.symbolElement.element.key = `${this.symbol || this.specialKeyName}`;
            } else {
                this.symbolElement.element.text = `${this.symbol || this.specialKeyName}`;
            }
        }
    }
};


KeyboardKey.prototype._destroy = function () {
    this.off('attr', this._updateView, this);
    this.innerKey.off(EventTypes.BUTTON_DOWN, this.onKeyDown, this);
    this.innerKey.off(EventTypes.BUTTON_UP, this.onKeyUp, this);
    this.innerKey.off(EventTypes.BUTTON_PRESSED, this.onKeyPressed, this);
    this.app.off(EventTypes.UPPERCASE_MODE_CHANGED, this._updateView, this);
};

// Popup_Keyboard.js
class PopupKeyboard extends BaseWindow {

    initialize() {
        super.initialize();

        // this._whitelistedCharacters = /^[\w\d]$/;
        // this._whitelistedCharacters =  /[\p{Letter}\p{Mark}]/gu;

        this.pad = this.entity.findByName('KeyboardPad');
        this.keyboardContainer = this.entity.findByName('KeyboardContainer');
        this.secondaryKeyboard = this.entity.findByName('KeyboardSymbols');
        this.extraSymbolsPanel = this.entity.findByName('ExtraSymbolsPanel');

        this.primaryKeyboard = this.entity.findByName('KeyboardPrimary');
        if(this.primaryKeyboard) {
            this.shiftKeyDarkener = this.primaryKeyboard.findByName('KeyShift').findByName('Darkener');
        }

        this.app.on(EventTypes.SWITCH_TO_PRIMARY_KEYBOARD, this.switchToPrimaryKeyboard, this);
        this.app.on(EventTypes.SWITCH_TO_SECONDARY_KEYBOARD, this.switchToSecondaryKeyboard, this);
        this.app.on(EventTypes.UPPERCASE_MODE_CHANGED, this.onUppercaseModeChanged, this);
        this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);
        this.app.on(EventTypes.CHANGE_KEYBOARD, this._changeKeyboard, this);

        this._keydownEventListener = this.onPhysicalKeyPressed.bind(this);

        // this.extraSymbolsPanel.enabled = false;
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        document.addEventListener('keydown', this._keydownEventListener);

        this.switchToPrimaryKeyboard();
        
    /* force resize */
        this.onResize(ScaleManager.getInstance().getWidth(), ScaleManager.getInstance().getHeight());
    }

    _onHide() {
        document.removeEventListener('keydown', this._keydownEventListener);
    }

    _changeKeyboard(locale) {
        if(this.primaryKeyboard) {
            this.primaryKeyboard.destroy();
        }
        this.primaryKeyboard = TemplateManager.getInstance().instantiate(`KeyboardPrimary_${locale}`);
        this.keyboardContainer.addChild(this.primaryKeyboard);
        this.primaryKeyboard.enabled = false;

        this.shiftKeyDarkener = this.primaryKeyboard.findByName('KeyShift').findByName('Darkener');
    }


    onPhysicalKeyPressed(e) {
        const key = e.key;
        if(/*this._whitelistedCharacters.test(key) && */ key.length === 1) {
            this.app.fire(EventTypes.KEYBOARD_SYMBOL_TYPED, key);
        } else if(key === 'Backspace') {
            this.app.fire(EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED, 'backspace');
        } else if(key === 'Enter') {
            this.app.fire(EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED, 'enter');
        } else if(key === ' ') {
            this.app.fire(EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED, 'space');
        }
    }

    switchToPrimaryKeyboard() {
        if(this.primaryKeyboard) this.primaryKeyboard.enabled = true;
        this.secondaryKeyboard.enabled = false;
    }

    switchToSecondaryKeyboard() {
        if(this.primaryKeyboard) this.primaryKeyboard.enabled = false;
        this.secondaryKeyboard.enabled = true;
    }

    onUppercaseModeChanged() {
        if(this.shiftKeyDarkener) this.shiftKeyDarkener.enabled = DataManager.getInstance().uppercaseMode;
    }

    onResize(width, height) {
        const aspectRatio = width / height;
        const maxPortraitAspectRatio = GameConfig.getAttribute('UI', 'keyboardMaxPortraitRatio');
        if(aspectRatio > maxPortraitAspectRatio) {
            /* landscape mode */
            this.keyboardContainer.element.height = GameConfig.getAttribute('UI', 'keyboardDefaultHeight');
        } else {
            /* portrait mode */
            this.keyboardContainer.element.height =  GameConfig.getAttribute('UI', 'keyboardDefaultHeight') * (1 + Math.pow((maxPortraitAspectRatio / aspectRatio - 1), GameConfig.getAttribute('UI', 'keyboardPortraitUpscaleFactror')));
        }
    }



    update(dt) {

    }
}

pc.registerScript(PopupKeyboard, 'popupKeyboard');

// Popup_AnswerPanel.js
class PopupAnswerPanel extends BaseWindow {

    initialize() {
        super.initialize();

        this._answerText = "";
        this._answerGapX = 50;
        this._cursorSymbol = '|';
        this._cursorVisible = false;

        this.answersContainer = this.entity.findByName('AnswersContainer');
        this.answerBoxPlayer = this.entity.findByName('AnswerBoxPlayer');
        this.answerBoxOpponent = this.entity.findByName('AnswerBoxOpponent');
        this.roundTimerMask = this.entity.findByName('RoundTimerMask');
        this.inputContainer = this.entity.findByName('InputContainer');
        this.answerPlaceholder = this.entity.findByName('AnswerPlaceholder');
        this.answerField = this.entity.findByName('AnswerField');
        this.buttonHint = this.entity.findByName('HintButton');
        this.buttonEnter = this.entity.findByName('EnterButton');

        this.app.on(EventTypes.TYPED_TEXT_CHANGED, this.onTypedTextChanged, this);
        this.app.on(EventTypes.KEYBOARD_SYMBOL_TYPED, this.onSymbolTyped, this);
        this.app.on(EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED, this.onSpecialKeyPressed, this);
        this.app.on(EventTypes.ROUND_TIMER_UPDATED, this.onRoundTimeUpdated, this);
        this.app.on(EventTypes.RoundEvents.WRONG_ANSWER_GIVEN, this.onWrongAnswerGiven, this);
        this.app.on(EventTypes.RoundEvents.CORRECT_ANSWER_GIVEN, this.onCorrectAnswerGiven, this);

        
        this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);
        this.buttonHint.on(EventTypes.BUTTON_PRESSED, this.onHintPressed, this);
        this.buttonEnter.on(EventTypes.BUTTON_PRESSED, this.onEnterPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();
        this._cursorBlinkingInterval = setInterval(this._switchCursorVisibility.bind(this), 150);

        DataManager.getInstance().typedText = "";

        this.buttonHint.enabled = RoundManager.getInstance().getActiveRound().hasHint();

        /* force resize */
        this.onResize(ScaleManager.getInstance().getWidth(), ScaleManager.getInstance().getHeight());
    }

    _onHide() {
        super._onHide();
        clearInterval(this._cursorBlinkingInterval);
        this._cursorBlinkingInterval = undefined;
    }


    _repositionAnswerText() {
        const margins = this.inputContainer.element.margin;
        margins.z = Math.abs(this.buttonEnter.getLocalPosition().x - this.buttonEnter.element.width / 2 - this.buttonEnter.parent.layoutgroup.spacing.x);
        this.inputContainer.element.margin = margins;
        if (this.answerField.element.width > this.inputContainer.element.width) {
            this.answerField.setLocalPosition(this.inputContainer.element.width - this.answerField.element.width, 0, 0);
        } else {
            this.answerField.setLocalPosition(this._answerGapX, 0, 0);
        }
    }

    onTypedTextChanged(textValue) {
        if (!this.entity.enabled) return;
        if (textValue && textValue.length > 0) {
            this.answerPlaceholder.enabled = false;
            this.answerField.enabled = true;
            this._setAnswerText(textValue);
        } else {
            this.answerPlaceholder.enabled = true;
            this.answerField.enabled = true;
            this._setAnswerText('');
        }
        this._repositionAnswerText();
    }

    onSymbolTyped(typedSymbol) {
        if(!this.entity.enabled) return;
        DataManager.getInstance().typedText = "".concat(DataManager.getInstance().typedText, typedSymbol);
    }


    onSpecialKeyPressed(specialKeyCode) {
        if(!this.entity.enabled) return;
        switch (specialKeyCode) {
            case "space":
                this.onSymbolTyped(" ");
                break;
            case "backspace":
                this.removeLastSymbol();
                break;
            case "enter":
                this.onEnterPressed();
                break;
            case "shift":
                this.onShiftToggled();
                break;
            case "digits_mode":
                this.app.fire(EventTypes.SWITCH_TO_SECONDARY_KEYBOARD);
                break;
            case "letters_mode":
                this.app.fire(EventTypes.SWITCH_TO_PRIMARY_KEYBOARD);
                break;
        }
    }

    removeLastSymbol() {
        if (DataManager.getInstance().typedText.length > 0) {
            DataManager.getInstance().typedText = DataManager.getInstance().typedText.slice(0, -1);
        }
    }


    onRoundTimeUpdated(time, progress) {
        this.roundTimerMask.setProgress(progress);
    }

    _setAnswerText(textValue) {
        this._answerText = `${textValue}`;
        this.answerField.element.text = `${this._answerText}${this._cursorVisible ? this._cursorSymbol : ' '}`;
    }

    _switchCursorVisibility() {
        this._cursorVisible = !this._cursorVisible;
        this._setAnswerText(this._answerText);
    }

    onShiftToggled() {
        DataManager.getInstance().uppercaseMode = !DataManager.getInstance().uppercaseMode;
    }

    onHintPressed() {
        this.buttonHint.enabled = false;
        this._repositionAnswerText();
        RoundManager.getInstance().playerRequestHint();
    }

    onEnterPressed() {
        if(DataManager.getInstance().typedText.trim().length > 0) {
            RoundManager.getInstance().submitPlayerAnswer(DataManager.getInstance().typedText);
        }
        DataManager.getInstance().typedText = '';
    }

    onCorrectAnswerGiven(contestantType, answerText, points, hasKey) {
        if(contestantType === Constants.Contestants.PLAYER) {
            this.answerBoxPlayer.showCorrectAnswer(answerText, points, hasKey);
        } else {
            this.answerBoxOpponent.showCorrectAnswer(answerText, points, hasKey);
        }
    }

    onWrongAnswerGiven(contestantType, errorMessage) {
        if(contestantType === Constants.Contestants.PLAYER) {
            this.answerBoxPlayer.showWrongAnswer(errorMessage);
        } else {
            this.answerBoxOpponent.showWrongAnswer(errorMessage);
        }
    }


    onResize(width, height) {
        this._repositionAnswerText();
        Utils.wait(100).then(() => this._repositionAnswerText());

        /* adjust element height */
        const aspectRatio = width / height;
        const maxPortraitAspectRatio = GameConfig.getAttribute('UI', 'keyboardMaxPortraitRatio');
        if (aspectRatio > maxPortraitAspectRatio) {
            /* landscape mode */
            this.answersContainer.element.height = GameConfig.getAttribute('UI', 'keyboardDefaultHeight');
        } else {
            /* portrait mode */
            this.answersContainer.element.height = GameConfig.getAttribute('UI', 'keyboardDefaultHeight') * (1 + Math.pow((maxPortraitAspectRatio / aspectRatio - 1), GameConfig.getAttribute('UI', 'keyboardPortraitUpscaleFactror')));
        }
    }


    update(dt) {

    }
}

pc.registerScript(PopupAnswerPanel, 'popupAnswerPanel');

// famobiSafeArea.js
/**
 * A script that automatically adds required gaps & resizes game canvas to fit Famobi interstitial banner.
 * 
 * How to use: just attach that script to the Root component of your Playcanvas app.
 * To test how it works, please use 'Debug / Testing Mode' attribute of the script. Don't forget to disable debug mode before publising a build! :)
 * 
 *  If you are using Window Resize API (window.onresize(...) or window.addEventListener('resize', ....)),
 *  please get rid of these. Instead , please listen to 'famobi:resizeCanvas' in-app event. For example: 
 * 
 *      this.app.on('famobi:resizeCanvas', function(canvasWidth, canvasHeight) {
 *          console.log('Adjusted canvas size is ', canvasWidth, canvasHeight);
 *      })
 * 
 * 
 * @author Igor Parada / ©Famobi 2023
 */

var FamobiSafeArea = pc.createScript('famobiSafeArea');


FamobiSafeArea.attributes.add('forceBodyBackgroundColor', {
    type: 'boolean',
    default: true,
    title: 'Change <body> background',
    default: true
});

FamobiSafeArea.attributes.add('bodyBackgroundColor', {
    type: 'rgba',
    title: 'Body Background Color',
    description: "Background color of body element (where the banner should be displayed). Make sure the checkbox above is checked!",
    default: [0, 0, 0, 1.0]
})

FamobiSafeArea.attributes.add('debugConfig', {
    type: 'json',
    title: 'Debug / Testing Mode',
    description: 'Force safe areas to be applied to the UI. Useful testing layouts without a device.',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'top',
        type: 'number',
        default: 0
    }, {
        name: 'bottom',
        type: 'number',
        default: 0
    }, {
        name: 'left',
        type: 'number',
        default: 0
    }, {
        name: 'right',
        type: 'number',
        default: 0
    }]
});



FamobiSafeArea.prototype.initialize = function () {
    this.app.graphicsDevice.on('resizecanvas', this._onCanvasResize, this);

    this.on('attr:debugConfig', function (value, prev) {
        this._updateCanvasSizeAndPosition();
    }, this);

    this.on('attr:bodyBackgroundColor', function (value, prev) {
        this._backgroundColorUpdate();
    }, this);

    this.on('destroy', function () {
        this.app.graphicsDevice.off('resizecanvas', this._onCanvasResize, this);
    }, this);


    if (window.GameInterface && typeof window.GameInterface.onOffsetChange === 'function') {
        window.GameInterface.onOffsetChange(offsets => this._onCanvasResize());
    } else if (window.famobi && typeof window.famobi.onOffsetChange === 'function') {
        window.famobi.onOffsetChange(offsets => this._onCanvasResize());
    }


    /** viewport resize handling **/
    if (window.visualViewport) {
        this.useVisualViewport = true;
        window.visualViewport.addEventListener('resize', this._onCanvasResize.bind(this));
    } else {
        this.useVisualViewport = false;
        window.addEventListener('resize', this._onCanvasResize.bind(this), true);
    }

    this._onCanvasResize();

    this.app.getFamobiAdjustedCanvasSize = () => {
        return {
            width: this._currentCanvasWidth,
            height: this._currentCanvasHeight
        }
    }

};

FamobiSafeArea.prototype._onCanvasResize = function () {
    this._updateCanvasSizeAndPosition();

    /* known issue on iOS - window.resize may report incorrect window size, so we slightly delay the resize logic */
    if (pc.platform.ios || pc.platform.mobile) {
        setTimeout(() => this._updateCanvasSizeAndPosition(), 1500);
    }
};


FamobiSafeArea.prototype._updateCanvasSizeAndPosition = function () {

    let topPixels = 0;
    let bottomPixels = 0;
    let leftPixels = 0;
    let rightPixels = 0;

    if (this.debugConfig.enabled) {
        topPixels = this.debugConfig.top;
        bottomPixels = this.debugConfig.bottom;
        leftPixels = this.debugConfig.left;
        rightPixels = this.debugConfig.right;
    } else {
        let famobiOffsets = { left: 0, top: 0, right: 0, bottom: 0 };
        if (window.GameInterface && window.GameInterface.getOffsets) {
            famobiOffsets = window.GameInterface.getOffsets();
        } else if (window.famobi && window.famobi.getOffsets) {
            famobiOffsets = window.famobi.getOffsets();
        }

        topPixels = famobiOffsets.top;
        bottomPixels = famobiOffsets.bottom;
        leftPixels = famobiOffsets.left;
        rightPixels = famobiOffsets.right;
    }


    const screenResHeight = this.useVisualViewport ? window.visualViewport.height : window.innerHeight;
    const screenResWidth = this.useVisualViewport ? window.visualViewport.width : window.innerWidth;

    leftPixels = Math.min(screenResWidth * 0.9, leftPixels);
    rightPixels = Math.min(screenResWidth * 0.9, rightPixels);
    topPixels = Math.min(screenResHeight * 0.9, topPixels);
    bottomPixels = Math.min(screenResHeight * 0.9, bottomPixels);

    const availableWidth = screenResWidth - leftPixels - rightPixels;
    const availableHeight = screenResHeight - topPixels - bottomPixels;

    this._currentCanvasWidth = availableWidth;
    this._currentCanvasHeight = availableHeight;

    this.app.setCanvasResolution(pc.RESOLUTION_FIXED, availableWidth, availableHeight);
    this.app.graphicsDevice.canvas.style.width = availableWidth + 'px';
    this.app.graphicsDevice.canvas.style.height = availableHeight + 'px';

    this.app.graphicsDevice.canvas.style.left = leftPixels + 'px';
    this.app.graphicsDevice.canvas.style.right = rightPixels + 'px';
    this.app.graphicsDevice.canvas.style.top = topPixels + 'px';
    this.app.graphicsDevice.canvas.style.bottom = bottomPixels + 'px';

    if (this.debugConfig.enabled) {
        console.log(`Canvas size set to ${availableWidth}x${availableHeight} (window ${window.innerWidth}x${window.innerHeight})`);
    }

    this.app.fire('famobi:resizeCanvas', availableWidth, availableHeight);

    this._backgroundColorUpdate();
};

FamobiSafeArea.prototype._backgroundColorUpdate = function () {
    if (!this.forceBodyBackgroundColor) return;
    const parentElement = this.app.graphicsDevice.canvas.parentElement;
    if (parentElement) {
        parentElement.style.background = this.bodyBackgroundColor.toString();
    }
}


FamobiSafeArea.prototype.update = function (dt) {

};


/** Fix for camera/input **/

pc.CameraComponent.prototype.screenToWorld = function (screenx, screeny, cameraz, worldCoord) {
    const device = this.system.app.graphicsDevice;
    const w = device.width / device.maxPixelRatio;
    const h = device.height / device.maxPixelRatio;
    return this._camera.screenToWorld(screenx, screeny, cameraz, w, h, worldCoord);
}


pc.CameraComponent.prototype.worldToScreen = function (worldCoord, screenCoord) {
    const device = this.system.app.graphicsDevice;
    const w = device.width / device.maxPixelRatio;
    const h = device.height / device.maxPixelRatio;
    return this._camera.worldToScreen(worldCoord, w, h, screenCoord);
}

// QuestionsManager.js
var QuestionsManager = pc.createScript('questionsManager');

QuestionsManager.attributes.add('randomizeQuestions', {
    type: 'boolean',
    default: true
})

QuestionsManager.getInstance = function () {
    if (!QuestionsManager._instance) console.error('QuestionsManager is not initialized yet');
    return QuestionsManager._instance;
};


QuestionsManager.prototype.initialize = function () {
    QuestionsManager._app = this.app;
    if (!QuestionsManager._instance) {
        QuestionsManager._instance = this;
    }

    /* internal data */
    this.allQuestions = [];
    this.availableQuestions = [];
    this._usedQuestionIDs = [];
    this._usedQuestionsLoaded = false;

    this.saveDataObject = {};

    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSavedQuestionIDs, this);
};



QuestionsManager.prototype.loadLocalizedQuestions = function (localeCode) {
    return new Promise((resolve, reject) => {
        const fileName = 'Questions_' + localeCode + '.csv';
        this.loadQuestions(fileName).then(() => {
            console.log('Questions loaded for ' + localeCode + ': ' + this.allQuestions.length);
            this.reset();
            resolve();
        }).catch(e => {
            console.error('Can not load questions file ' + fileName, e);
            resolve();
        });
    });
};


QuestionsManager.prototype._loadSavedQuestionIDs = function () {
    const dataObject = LocalStorageController.getSavedValue(Constants.Storage.USED_QUESTIONS_IDS) || {};
    this.saveDataObject = dataObject;
    let dataLoaded = false;
    for (let localeKey in dataObject) {
        this.saveDataObject[localeKey] = dataObject[localeKey];

        if (localeKey === LocalizationManager.getInstance().getCurrentLocale()) {
            this._usedQuestionIDs = dataObject[localeKey] ? dataObject[localeKey].slice() : [];
            dataLoaded = true;
        }
    }

    if (!dataLoaded) {
        this._usedQuestionIDs = [];
    }

    this._usedQuestionsLoaded = true;
};

QuestionsManager.prototype.getUsedQuestionIDs = function () {
    const currentLocale = LocalizationManager.getInstance().getCurrentLocale();
    this.saveDataObject[currentLocale] = [...this._usedQuestionIDs];
    return this.saveDataObject;
};

QuestionsManager.prototype.getQuestionById = function (id) {
    let index = this.allQuestions.findIndex(q => q.id === id);
    if (index !== -1) return question;
    console.warn('No question with ID = ' + id);
    return Utils.getRandomItem(this.availableQuestions);
}

QuestionsManager.prototype._removeUsedQuestionsFromTheList = function () {
    this.availableQuestions = this.allQuestions.filter(q => this._usedQuestionIDs.indexOf(q.id) === -1);
    console.log('Available questions: ' + this.availableQuestions.length + ' from ' + this.allQuestions.length)
}

QuestionsManager.prototype._getRandomQuestion = function () {
    this._refillAvailableQuestionsIfNeeded();
    return Utils.getRandomItem(this.availableQuestions);
}

QuestionsManager.prototype.getNextQuestion = function () {
    this._refillAvailableQuestionsIfNeeded(true);
    const question = this.availableQuestions.shift();
    this._usedQuestionIDs.push(question.id);
    LocalStorageController.save();
    return question;
}

/** internal **/
QuestionsManager.prototype.reset = function () {
    this._loadSavedQuestionIDs();
    this._removeUsedQuestionsFromTheList();
    this._refillAvailableQuestionsIfNeeded();
};

QuestionsManager.prototype._refillAvailableQuestionsIfNeeded = function (force = false) {
    if (this.availableQuestions.length === 0) {
        console.log('Refilling questions....')
        this.availableQuestions = this.allQuestions.slice();
        this._usedQuestionIDs = [];

        if (this.randomizeQuestions || force) {
            this.availableQuestions = Utils.shuffle(this.availableQuestions);
        }
    }
};



QuestionsManager.prototype.loadQuestions = function (assetName) {
    return new Promise(async (resolve, reject) => {
        const csvFile = await this._loadQuestionsFile(assetName);
        const lineSeparator = '\n';

        this.allQuestions = [];

        const records = csvFile.split(lineSeparator);
        for (let record of records) {
            const question = new Question(record);
            this.allQuestions.push(question);
        }

        resolve();
    });
};

QuestionsManager.prototype._loadQuestionsFile = async function (assetName) {
    console.log('loading questions file  ' + assetName + '...');

    const questionsAsset = this.app.assets.find(assetName); //LibraryManager.getInstance().getAsset(assetName);
    await AssetsLoader.getInstance().loadAsset(questionsAsset);
    console.log('Questions asset/file ' + assetName + ' has been loaded');

    return new TextDecoder().decode(questionsAsset.resource);
};



QuestionsManager.prototype.update = function (dt) {

};


// RoundManager.js
var RoundManager = pc.createScript('roundManager');


RoundManager.getInstance = function () {
    if (!RoundManager._instance) console.error('RoundManager is not initialized yet');
    return RoundManager._instance;
};


RoundManager.prototype.initialize = function () {
    RoundManager._app = this.app;
    if (!RoundManager._instance) {
        RoundManager._instance = this;
    }

    /* data */
    this.rounds = [];
    this.activeRound = undefined;
    this.roundIndex = 0;
    this.totalRounds = 3;
    this.multiplier = 1;

    this.roundResults = [];

    /* events */
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

RoundManager.prototype.isRoundBeingPlayed = function () {
    return this.activeRound && this.activeRound.state === Constants.RoundState.GAME;
}


RoundManager.prototype.startNextRound = function () {
    return new Promise((resolve, reject) => {

        this.roundIndex += 1;
        this.multiplier = this.roundIndex;
        // console.warn(`Starting round ${this.roundIndex} of ${this.totalRounds}...`);
        const question = QuestionsManager.getInstance().getNextQuestion();
        question.initialize();
        this.activeRound = new Round(this.roundIndex, question, this.multiplier);

        resolve();
    })
};

RoundManager.prototype.finishRound = function () {
    return new Promise(async (resolve, reject) => {
        // console.log(`Finishing round ${this.roundIndex} of ${this.totalRounds}...`);
        const playerWon = this.activeRound.playerScore >= this.activeRound.opponentScore;

        /* increment level */
        DataManager.getInstance().level += 1;

        /* save round result */
        DataManager.getInstance().saveRoundResult(playerWon ? 1 : 0);

        /* Determine results */
        const roundResult = {};
        roundResult.roundIndex = this.activeRound.roundIndex;
        roundResult.question = this.activeRound.question;
        roundResult.givenAnswers = this.activeRound.question.givenAnswers;
        roundResult.winner = playerWon ? Constants.Contestants.PLAYER : Constants.Contestants.OPPONENT;
        roundResult.loser = playerWon ? Constants.Contestants.OPPONENT : Constants.Contestants.PLAYER;
        roundResult.playerScore = this.activeRound.playerScore;
        roundResult.opponentScore = this.activeRound.opponentScore;
        roundResult.playerContestantData = MatchManager.getInstance().getPlayerContestantData();
        roundResult.opponentContestantData = MatchManager.getInstance().getOpponentContestantData();
        roundResult.multiplier = this.activeRound.multiplier;
        this.roundResults.push(roundResult);

        /* check for match finish condition & determine winner */
        if (this.activeRound.roundIndex >= this.totalRounds) {
            MatchManager.getInstance().dispatchMatchFinished(this._determineMatchWinner());
            if (playerWon) {
                await APIMediator.gameComplete();
            } else {
                await APIMediator.gameOver();
            }
        }


        /* finish round */
        MatchManager.getInstance().dispatchRoundFinished(roundResult);

        resolve();
    })
};

RoundManager.prototype.dispatchRoundStateChanged = function (round, state) {
    if (round === this.activeRound) {
        if (state === Constants.RoundState.GAME) {
            MatchManager.getInstance().dispatchRoundStarted();
        } else if (state === Constants.RoundState.OUTRO) {
            this.finishRound();
        } else if (state === Constants.RoundState.CLOSED) {
            MatchManager.getInstance().dispatchRoundClosed();
        }
    }
};



RoundManager.prototype.getRoundResults = function () {
    return this.roundResults;
};

RoundManager.prototype.getLastRoundResult = function () {
    return this.roundResults[this.roundResults.length - 1];
};

RoundManager.prototype.getRoundIndex = function () {
    return this.roundIndex;
};

RoundManager.prototype.getTotalRounds = function () {
    return this.totalRounds;
};

RoundManager.prototype.getActiveRound = function () {
    return this.activeRound;
};

RoundManager.prototype.getActiveQuestion = function () {
    return this.activeRound.question;
};

RoundManager.prototype.playerRequestHint = function () {
    this.activeRound.playerRequestHint();
}

RoundManager.prototype.submitPlayerAnswer = function (textValue) {
    this.activeRound.checkAnswerPlayer(textValue);
}


RoundManager.prototype.update = function (dt) {
    if (this.activeRound) {
        if (this.activeRound.state === Constants.RoundState.GAME) {
            this.activeRound.timeLeft = Math.max(this.activeRound.timeLeft - dt, 0);
            this.app.fire(EventTypes.ROUND_TIMER_UPDATED, this.activeRound.timeLeft, 1 - this.activeRound.timeLeft / this.activeRound.totalTime);
            if (this.activeRound.timeLeft <= 0 || this.activeRound.question.numberOfGivenAnswers >= 6) {
                this.activeRound.setState(Constants.RoundState.OUTRO);
            } else {
                this.activeRound.update(dt);
            }
        }
    }
};


RoundManager.prototype._determineMatchWinner = function () {
    let playerFinalTotalScore = 0;
    let opponentFinalTotalScore = 0;

    this.roundResults.forEach((result) => {
        const playerScore = Math.floor(result.playerScore * result.multiplier);
        const opponentScore = Math.floor(result.opponentScore * result.multiplier);
        playerFinalTotalScore += playerScore;
        opponentFinalTotalScore += opponentScore;
    });

    if (playerFinalTotalScore >= opponentFinalTotalScore) {
        return { winner: Constants.Contestants.PLAYER, winnerScore: playerFinalTotalScore, loserScore: opponentFinalTotalScore };
    } else {
        return { winner: Constants.Contestants.OPPONENT, winnerScore: opponentFinalTotalScore, loserScore: playerFinalTotalScore };
    }
};

RoundManager.prototype.getPlayersCompletedRoundsScore = function () {
    let playerTotalScore = 0;
    this.roundResults.forEach((result) => {
        playerTotalScore += Math.floor(result.playerScore * result.multiplier);
    });
    return playerTotalScore;
}

RoundManager.prototype.reset = function () {
    while (this.rounds.length > 0) this.rounds.pop().destroy();
    this.rounds = [];
    this.activeRound = undefined;
    this.roundIndex = 0;
    this.totalRounds = 3;
    this.multiplier = 1;
    this.roundResults = [];
};

// progressGauge.js
var ProgressGauge = pc.createScript('progressGauge');

ProgressGauge.attributes.add('minWidth', {type: 'number', default: 29});
ProgressGauge.attributes.add('maxWidth', {type: 'number', default: 711});
ProgressGauge.attributes.add('lerpFactor', {type: 'number', default: 0.15, min: 0, max: 1});

ProgressGauge.prototype.initialize = function() {
    this.gauge = this.entity.findByName('Gauge');
    this.frontCircle = this.entity.findByName('Front');
    this.scoreText = this.entity.findByName('ScoreText');

    this._targetScore = 0;
    this._visibleScore = 0;

    this.entity.setColor = this._setColor.bind(this);
    this.entity.setScore = this._setScore.bind(this);
    this.entity.setScore(0);
};

ProgressGauge.prototype._setColor = function(color) {
    this.gauge.element.color = this.frontCircle.element.color = new pc.Color().copy(color);
};


ProgressGauge.prototype._setScore = function(score, instant = false) {
    this._targetScore = score;
    this.scoreText.element.text = `${Math.floor(this._targetScore)}`;
    if(instant) this._visibleScore = this._targetScore;
    this._updateView();
};


ProgressGauge.prototype.update = function(dt) {
    if(this._visibleScore === this._targetScore) return;

    if(Math.abs(this._targetScore - this._visibleScore) < 0.5) {
        this._visibleScore = this._targetScore;
        this._updateView();
    } else {
        this._visibleScore = pc.math.lerp(this._visibleScore, this._targetScore, this.lerpFactor * dt * 60);
    }
    this._updateView();
};


ProgressGauge.prototype._updateView = function() {
    // this.scoreText.element.text = `${Math.floor(this._visibleScore)}`;
    this.gauge.element.width = pc.math.lerp(this.minWidth, this.maxWidth, this._visibleScore / 100);
};



// progress-radial.js
var ProgressRadial = pc.createScript('progressRadial');

ProgressRadial.prototype.initialize = function() {
    this._element = this.entity.element;
    // this._element.material = this._element.material.clone();

    this._element.material.alphaTest = 0.999;
    this._element.material.update(); 

    this.entity.setProgress = this.setProgress.bind(this);

    this.setProgress(0);
};


ProgressRadial.prototype.setProgress = function (value) {    
    value = pc.math.clamp(value, 0.0, 1); 
    this._progress = value;
    // 0.001 to workaround > 0 optimisation check in engine code
    this._element.material.alphaTest = value + 0.001; 
};


ProgressRadial.prototype.update = function(dt) {

};

// Round.js

class Round {

    constructor(roundIndex, question, multiplier) {
        this.app = pc.AppBase.getApplication();
        this.roundIndex = roundIndex;
        this.question = question;
        this.multiplier = multiplier;
        this.hintAvailable = false;
        this.difficulty = 0;
        this.playerScore = 0;
        this.opponentScore = 0;
        this.playerGoodAnswerCount = 0;
        this.opponentGoodAnswerCount = 0;
        this.totalTime = GameConfig.getAttribute('gameplay', 'roundDuration');
        this.timeLeft = GameConfig.getAttribute('gameplay', 'roundDuration');

        this.contestantAI = this.createContestantAI();
        this.contestantAI.initialize();

        this.setState(Constants.RoundState.NOT_STARTED);
    }

    update(dt) {
        const roundProgress = 1 - this.timeLeft / this.totalTime;
        // APIMediator.sendProgress(roundProgress * 100);

        const aiAnswerData = this.contestantAI.update(roundProgress);
        if (aiAnswerData) {
            this.checkAnswerOpponent(aiAnswerData.correct, aiAnswerData.answerIndex);
        }
    }

    setState(state) {
        this.state = state;
        RoundManager.getInstance().dispatchRoundStateChanged(this, this.state);

        if (this.state === Constants.RoundState.INTRO) {
            this.app.fire(EventTypes.SET_CONTESTANT_SCORE, Constants.Contestants.PLAYER, this.playerScore);
            this.app.fire(EventTypes.SET_CONTESTANT_SCORE, Constants.Contestants.OPPONENT, this.opponentScore);
        }
    }

    enableHint() {
        this.hintAvailable = true;
    }

    hasHint() {
        return this.hintAvailable;
    }

    useHint() {

    }

    playerRequestHint() {
        this.hintAvailable = false;
        const answer = this.question.getRandomUnusedAnswer();
        if (answer) {
            this.checkAnswerPlayer(answer.getAnswerText());
        }
    }


    checkAnswerPlayer(_value) {
        _value = _value.trim();

        let closestAnswer = this.question.checkAnswer(_value);
        if (closestAnswer) {

            if (this.question.checkAnwerAlreadyGiven(closestAnswer)) {
                this.doAnswerAlreadyTaken(Constants.Contestants.PLAYER);
            } else {

                const requestSlotResult = this.question.tryGetAnswerSlot(closestAnswer, MatchManager.getInstance().getContestantData(Constants.Contestants.PLAYER));
                if (requestSlotResult.success) {
                    this.doAnswerCorrect(Constants.Contestants.PLAYER, closestAnswer.getAnswerText(), requestSlotResult.points, requestSlotResult.hasKey);
                } else {
                    this.doAnswerWrong(Constants.Contestants.PLAYER);
                }
            }
        } else {
            this.doAnswerWrong(Constants.Contestants.PLAYER);
        }
    }

    checkAnswerOpponent(_correct, _answerIndex) {
        if (_correct) {
            const answer = this.question.answers[Math.floor(_answerIndex % this.question.answers.length)];
            if (this.question.checkAnwerAlreadyGiven(answer)) {
                this.doAnswerAlreadyTaken(Constants.Contestants.OPPONENT);
            } else {
                const requestSlotResult = this.question.tryGetAnswerSlot(answer, MatchManager.getInstance().getContestantData(Constants.Contestants.OPPONENT));
                if (requestSlotResult.success) {
                    this.doAnswerCorrect(Constants.Contestants.OPPONENT, answer.getAnswerText(), requestSlotResult.points, requestSlotResult.hasKey);
                } else {
                    this.doAnswerWrong(Constants.Contestants.OPPONENT);
                }
            }
        } else {
            this.doAnswerWrong(Constants.Contestants.OPPONENT);
        }
    }



    doAnswerAlreadyTaken(contestantType) {
        if (contestantType === Constants.Contestants.PLAYER) VibrationManager.getInstance().hapticFailure();

        /* press button * display answer box */
        ContestantsManager.getInstance().pressButton(contestantType, false);
        this.app.fire(EventTypes.RoundEvents.WRONG_ANSWER_GIVEN, contestantType, LocalizationManager.getInstance().getLocalizedText('Already given'));
    }

    doAnswerWrong(contestantType) {
        if (contestantType === Constants.Contestants.PLAYER) VibrationManager.getInstance().hapticFailure();

        /* press button * display answer box */
        ContestantsManager.getInstance().pressButton(contestantType, false);
        this.app.fire(EventTypes.RoundEvents.WRONG_ANSWER_GIVEN, contestantType, LocalizationManager.getInstance().getLocalizedText('Wrong'));
    }

    doAnswerCorrect(contestantType, answerText, points, hasKey) {
        if (contestantType === Constants.Contestants.PLAYER) {
            this.playerGoodAnswerCount += 1;
            this.playerScore += points;
            APIMediator.sendScore(this.playerScore + RoundManager.getInstance().getPlayersCompletedRoundsScore());
            this.app.fire(EventTypes.SET_CONTESTANT_SCORE, contestantType, this.playerScore);
            VibrationManager.getInstance().hapticSuccess();
            if (hasKey) DataManager.getInstance().keys += 1;
        } else {
            this.opponentGoodAnswerCount += 1;
            this.opponentScore += points;
            this.app.fire(EventTypes.SET_CONTESTANT_SCORE, contestantType, this.opponentScore);
        }

        /* press button */
        ContestantsManager.getInstance().pressButton(contestantType, true);

        /* move audience */
        const pointsLeft = 100 - this.playerScore - this.opponentScore;
        this.app.fire(EventTypes.MOVE_AUDIENCE_TO, contestantType, points / 100, pointsLeft / 100, 6 - this.playerGoodAnswerCount - this.opponentGoodAnswerCount);

        /* show answer box */
        this.app.fire(EventTypes.RoundEvents.CORRECT_ANSWER_GIVEN, contestantType, answerText, points, hasKey);
    }

    createContestantAI() {
        let difficulty = 0;
        let maxDifficultyIncrease = 0;
        let difficultyIncrease = -1;  // +1 for android
        let difficultyRnd3Increase = -2; // -4 for android

        let sumVictories = DataManager.getInstance().getNumVictoriesPerLast10Rounds();
        let maxDifficulty = pc.math.clamp(maxDifficultyIncrease + 9, 1, 12);
        let level = DataManager.getInstance().level;

        if ([0, 1, 2].includes(level)) {
            difficulty = 0;
        } else if ([4, 5].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 2);
        } else if ([3, 7, 8].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 3);
        } else if ([6, 10, 11].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 4);
        } else if ([9, 13, 14].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 5);
        } else if ([12, 16, 17].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 6);
        } else if ([15, 19].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 7);
        } else if ([15, 19].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 7);
        } else if ([18].includes(level)) {
            difficulty = Math.min(sumVictories + 1, 8);
        } else if (this.roundIndex === 2) {

            const recentMatchResults = DataManager.getInstance().getRecentMatchResults();
            const lastGameResult = recentMatchResults[recentMatchResults.length - 1] || 0;
            const prevGameResult = recentMatchResults[recentMatchResults.length - 2] || 0;
            let resultRnd12 = lastGameResult + prevGameResult;
            let beforeSerie = sumVictories - resultRnd12;
            let beforeSerieBonus = 0;
            if (beforeSerie <= 2)
                beforeSerieBonus = 0;
            if (beforeSerie <= 5)
                beforeSerieBonus = 1;
            else
                beforeSerieBonus = 2;

            const numTournaments = Math.floor(DataManager.getInstance().length / 3);
            let tournamentBonus = 0;
            if (numTournaments <= 1)
                tournamentBonus = 0;
            else if (numTournaments <= 4)
                tournamentBonus = 1;
            else if (numTournaments <= 7)
                tournamentBonus = 2;
            else if (numTournaments <= 11)
                tournamentBonus = 3;
            else
                tournamentBonus = 4;

            let randomParam = Math.round(Math.random());

            difficulty = 1 + resultRnd12 + beforeSerieBonus + tournamentBonus - randomParam;
            difficulty = pc.math.clamp(difficulty, 1, maxDifficulty);

        } else if (this.roundIndex === 0) {
            difficulty = Math.min(sumVictories + 2, maxDifficulty);
        } else if (this.roundIndex === 1) {
            difficulty = Math.max(sumVictories, 1);
        }

        if (difficulty > 0) difficulty = pc.math.clamp(difficulty + difficultyIncrease, 1, maxDifficulty);
        if (difficulty > 0 && this.roundIndex === 2) difficulty = pc.math.clamp(difficulty + difficultyRnd3Increase, 1, maxDifficulty);

        // console.log('final difficulty: ' + difficulty);

        this.difficulty = difficulty;

        return AIManager.getInstance().getContestantAIInstance(difficulty);
    }

    destroy() {
        this.contestantAI.destroy();
        delete this.contestantAI;
    }
}

// answerBox.js
var AnswerBox = pc.createScript('answerBox');

AnswerBox.attributes.add('animDuration', {
    type: 'number',
    default: 0.25
})

AnswerBox.prototype.initialize = function () {
    this._hiddenPosition = new pc.Vec3(0, -110, 0);
    this._shownPosition = new pc.Vec3(0, 0, 0);

    this._activePanel = null;
    this._queue = [];

    this.answerCorrect = this.entity.findByName("AnswerCorrect");
    this.answerCorrectText = this.answerCorrect.findByName("AnswerText");
    this.answerCorrectPoints = this.answerCorrect.findByName("PointsText");
    this.answerCorrectKey = this.answerCorrect.findByName("IconKey");
    this.answerWrong = this.entity.findByName("AnswerWrong");
    this.answerWrongReasonText = this.answerWrong.findByName("ReasonText");

    this._keyInitialPosition = this.answerCorrectKey.getLocalPosition().clone();
    this._keyAppearedPosition = this._keyInitialPosition.clone().add(new pc.Vec3(0, 175, 0));

    this.entity.showCorrectAnswer = this._showCorrectAnswer.bind(this);
    this.entity.showWrongAnswer = this._showWrongAnswer.bind(this);

    this.hideAll(true);

    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};


AnswerBox.prototype.reset = function () {
    this._queue = [];
    this.hideAll(true);
};

AnswerBox.prototype._showCorrectAnswer = function (answerText, points, hasKey) {
    this._queue.push({ type: 'correct', text: answerText, points, hasKey });
    if (!this._activePanel) this._processNextInQueue();
};


AnswerBox.prototype._showWrongAnswer = function (reasonText) {
    this._queue.push({ type: 'wrong', text: reasonText });
    if (!this._activePanel) this._processNextInQueue();
};

AnswerBox.prototype._showPanel = function (data) {
    return new Promise((resolve, reject) => {
        if (this._activePanel) this.app.stopAllTweens(this._activePanel);

        const { type, text, points, hasKey } = data;
        const panel = type === 'correct' ? this.answerCorrect : this.answerWrong;

        /* set text */
        if (type === 'correct') {
            this.answerCorrectText.element.text = `${text}`;
            this.answerCorrectPoints.element.text = `${points}`;
            this.answerCorrectKey.element.opacity = 0;
            this.answerCorrectKey.setLocalPosition(this._keyInitialPosition);
            this.answerCorrectKey.setLocalScale(pc.Vec3.ONE);
            if (hasKey) {
                this.showAnswerKey();
            }
        } else if (panel === this.answerWrong) {
            this.answerWrongReasonText.element.text = `${text}`;
        }

        this._activePanel = panel;
        this._activePanel.enabled = true;
        const visibilityDuration = GameConfig.getAttribute('UI', 'answerBoxVisibilityDuration');

        /* tween */
        panel.setLocalPosition(this._hiddenPosition);
        panel.tween(panel.getLocalPosition())
            .to(this._shownPosition, this.animDuration, pc.SineOut)
            .onComplete(() => {
                Utils.wait(visibilityDuration * 1000).then(() => {
                    this._hidePanel(panel).then(() => {
                        this._processNextInQueue().then(() => {
                            resolve();
                        })
                    })
                })
            })
            .start();
    })
};

AnswerBox.prototype._hidePanel = function (panel) {
    return new Promise((resolve, reject) => {
        panel.tween(panel.getLocalPosition())
            .to(this._hiddenPosition, this.animDuration, pc.SineIn)
            .onComplete(() => {
                this._activePanel.enabled = false;
                this._activePanel = null;
                resolve();
            })
            .start();
    });
};

AnswerBox.prototype._processNextInQueue = function () {
    return new Promise((resolve, reject) => {
        if (this._queue.length > 0) {
            const nextItem = this._queue.shift();
            return this._showPanel(nextItem);
        } else {
            resolve();
        }
    });
}

AnswerBox.prototype.showAnswerKey = function () {
    const duration = 0.75;
    const disappearDelay = 0.5;
    this.answerCorrectKey.tween(this.answerCorrectKey.getLocalPosition())
        .to(this._keyAppearedPosition, duration, pc.Linear)
        .delay(this.animDuration)
        .start();
    this.answerCorrectKey.tween(this.answerCorrectKey.getLocalScale())
        .to({ x: 2.5, y: 2.5, z: 2.5 }, duration, pc.Linear)
        .delay(this.animDuration)
        .start();
    this.answerCorrectKey.tween(this.answerCorrectKey.element)
        .to({ opacity: 1 }, duration * 0.75, pc.Linear)
        .delay(this.animDuration)
        .start();

    Utils.wait((duration + disappearDelay) * 1000).then(() => {
        this.answerCorrectKey.tween(this.answerCorrectKey.element)
            .to({ opacity: 0 }, 0.25, pc.Linear)
            .start();
    });
}

AnswerBox.prototype.hideAll = function (immediately = false) {
    if (immediately) {
        this.app.stopAllTweens(this.answerCorrect);
        this.app.stopAllTweens(this.answerWrong);
        this.answerCorrect.setLocalPosition(this._hiddenPosition);
        this.answerWrong.setLocalPosition(this._hiddenPosition);
        this.answerWrong.enabled = false;
        this.answerCorrect.enabled = false;
    } else {
        this._hidePanel(this.answerCorrect);
        this._hidePanel(this.answerWrong);
    }
};

AnswerBox.prototype.update = function (dt) {

};



// ContestantData.js
class ContestantData {
    constructor(contestantType, name, color, skin) {
        this.contestantType = contestantType;
        this.name = name;
        this.color = color;
        this.skin = skin;
    }

    getSaveObject() {
        return {
            contestantType: this.contestantType,
            name: this.name,
            skinName: this.skin ? this.skin.name : undefined,
            color: this.color
        }
    }

    parseFromSaveObject(saveObject) {
        this.contestantType = saveObject.contestantType;
        this.name = saveObject.name;
        this.skin = saveObject.skinName ? SkinManager.getInstance().getSkinByName(saveObject.skinName) : undefined;
        this.color = saveObject.color;
        return this;
    }
}

// Buzzer.js
var Buzzer = pc.createScript('buzzer');

Buzzer.attributes.add('owner', {
    type: 'number',
    enum: [
        { 'Player': 0 },
        { 'Opponent': 1 }
    ], 
    default: 0
});

Buzzer.attributes.add('nameTextField', {
    type: 'entity'
});

Buzzer.attributes.add('lightScreen', {
    type: 'entity'
});

Buzzer.attributes.add('defaultColor', {
    type: 'rgb',
    default: [1, 1, 1]
});

Buzzer.attributes.add('tweenEmissive', {
    type: 'boolean',
    default: true
});

Buzzer.attributes.add('answerButton', {
    type: 'entity'
});

Buzzer.attributes.add('answerButtonDeltaPosition', {
    type: 'vec3',
    default: [0, -9, 0]
});

Buzzer.prototype.initialize = function() {
    this.colorDefault = this.defaultColor.clone();
    this.colorRed = GameConfig.getAttribute('gameplay', 'buzzerColorWrong');
    this.colorGreen = GameConfig.getAttribute('gameplay', 'buzzerColorCorrect');
    this.color = new pc.Color().copy(this.defaultColor);

    this.contenstantTypes = [Constants.Contestants.PLAYER, Constants.Contestants.OPPONENT];
    this.answerButttonInitialPosition = this.answerButton.getLocalPosition().clone();
    this.answerButttonDownPosition = this.answerButttonInitialPosition.clone().add(this.answerButtonDeltaPosition);

    if(this.owner === 0) {
        this._setPlayerName(DataManager.getInstance().username);
        this.app.on(EventTypes.USERNAME_CHANGED, (value) => this._setPlayerName(value));
    } else {
        this.app.on(EventTypes.OPPONENT_NAME_CHANGED, (value) => this._setPlayerName(value));
    }
    this.app.on(EventTypes.BUZZER_PLAY_ANSWER_ANIM, this._playAnswerAnim, this);
    this.app.on(EventTypes.BUZZER_PRESS_BUTTON_ANIM, this._pressButtonAnim, this);
};


Buzzer.prototype._playAnswerAnim = function(contenstantType, answerCorrect) {
    if(this.contenstantTypes[this.owner] !== contenstantType) return;

    this._tweenColor(answerCorrect ? this.colorGreen : this.colorRed, 0.1);
    Utils.wait(800).then(() => {
        this._tweenColor(this.colorDefault, 0.4)
    })
};

Buzzer.prototype._pressButtonAnim = function(contenstantType) {
    if(this.contenstantTypes[this.owner] !== contenstantType) return;

    this.answerButton.setLocalPosition(this.answerButttonInitialPosition);
    this.answerButton.tween(this.answerButton.getLocalPosition())
        .to(this.answerButttonDownPosition, 0.15, pc.SineOut)
        .yoyo(true)
        .repeat(2)
        .start();
};

Buzzer.prototype._tweenColor = function(targetColor, duration) {
    const meshInstances = this.lightScreen.render.meshInstances;
    meshInstances.forEach(mi => {
        Utils.tweenColor(this.color, targetColor, duration, (_color) => {
            mi.setParameter('material_diffuse', Utils.getGammaCorrectedColorUniform(_color));
            if(this.tweenEmissive) mi.setParameter('material_emissive', Utils.getGammaCorrectedColorUniform(_color));
        }, 0, pc.Linear);
    });
}

Buzzer.prototype._setPlayerName = function(value) {
    this.nameTextField.element.text = `${value}`;
};



Buzzer.prototype.update = function(dt) {

};


// Scene.js
var Scene = pc.createScript('scene');

Scene.attributes.add('buzzerLeft', {
    type: 'entity'
});

Scene.attributes.add('buzzerRight', {
    type: 'entity'
});

Scene.attributes.add('lightLeft', {
    type: 'entity'
});

Scene.attributes.add('lightRight', {
    type: 'entity'
});

Scene.attributes.add('particlesLeft', {
    type: 'entity'
});

Scene.attributes.add('particlesRight', {
    type: 'entity'
});

Scene.attributes.add('hatchesPlayer', {
    type: 'entity',
    array: true
});

Scene.attributes.add('hatchesOpponent', {
    type: 'entity',
    array: true
});



Scene.prototype.initialize = function () {
    this._buzzerLeftInitialPosition = this.buzzerLeft.getLocalPosition().clone();
    this._buzzerLeftAppearingPosition = this.buzzerLeft.getLocalPosition().clone().add(new pc.Vec3(0, -2, 0));
    this._buzzerLeftDisappearingPosition = this.buzzerLeft.getLocalPosition().clone().add(new pc.Vec3(0, -2, 0));

    this._buzzerRightInitialPosition = this.buzzerRight.getLocalPosition().clone();
    this._buzzerRightAppearingPosition = this.buzzerRight.getLocalPosition().clone().add(new pc.Vec3(0, -2, 0));
    this._buzzerRightDisappearingPosition = this.buzzerRight.getLocalPosition().clone().add(new pc.Vec3(0, -2, 0));

    this._lightLeftInitialScale = this.lightLeft.getLocalScale().clone();
    this._lightRightInitialScale = this.lightRight.getLocalScale().clone();

    /* hatches */
    [...this.hatchesPlayer, ...this.hatchesOpponent].forEach(hatch => {
        hatch._closedPosition = hatch._closedPosition || hatch.getLocalPosition().clone();
    });

    this.app.on(EventTypes.SHOW_BUZZERS, this._showBuzzers, this);
    this.app.on(EventTypes.HIDE_BUZZERS, this._hideBuzzers, this);
    this.app.on(EventTypes.SHOW_BUZZER_LIGHTS, this._showBuzzerLights, this);
    this.app.on(EventTypes.HIDE_BUZZER_LIGHTS, this._hideBuzzerLights, this);
    this.app.on(EventTypes.HIDE_SINGLE_BUZZER_LIGHT, this._hideSingleBuzzerLight, this);
    this.app.on(EventTypes.FIRE_BUZZER_PARTICLES, this._fireBuzzerParticles, this);
    this.app.on(EventTypes.OPEN_HATCHES, this._openHatches, this);
    this.app.on(EventTypes.CLOSE_HATCHES, this._closeHatches, this);
};

Scene.prototype.postInitialize = function () {
    this._hideBuzzers(true);
    this._hideBuzzerLights(true);
}


Scene.prototype._fireBuzzerParticles = function (contestantData) {
    const particlesContainer = contestantData === Constants.Contestants.PLAYER ? this.particlesLeft : this.particlesRight;
    if (!particlesContainer) {
        console.warn('No particles container set in scene');
        return;
    }

    particlesContainer.children.forEach(child => {
        if (child.particlesystem) {
            child.particlesystem.reset();
            child.particlesystem.play();
        }
    })
}

Scene.prototype._showBuzzers = function (immeadiately = false) {
    if (!this.entity.enabled) return;

    const duration = immeadiately ? 0.01 : 0.2;

    this.buzzerLeft.enabled = true;
    this.buzzerLeft.setLocalScale(pc.Vec3.ONE);
    this.buzzerLeft.setLocalPosition(this._buzzerLeftAppearingPosition);
    this.buzzerLeft.tween(this.buzzerLeft.getLocalPosition())
        .to(this._buzzerLeftInitialPosition, duration, pc.SineOut)
        .start();

    this.buzzerRight.enabled = true;
    this.buzzerRight.setLocalScale(pc.Vec3.ONE);
    this.buzzerRight.setLocalPosition(this._buzzerRightAppearingPosition);
    this.buzzerRight.tween(this.buzzerRight.getLocalPosition())
        .to(this._buzzerRightInitialPosition, duration, pc.SineOut)
        .start();
};

Scene.prototype._hideBuzzers = function (immediately) {
    if (!this.entity.enabled) return;

    const duration = immediately ? 0.001 : 0.4;

    this.buzzerLeft.tween(this.buzzerLeft.getLocalPosition())
        .to(this._buzzerLeftDisappearingPosition, duration, pc.BackIn)
        .start();

    this.buzzerRight.tween(this.buzzerRight.getLocalPosition())
        .to(this._buzzerRightDisappearingPosition, duration, pc.BackIn)
        .start();

    this.buzzerLeft.tween(this.buzzerLeft.getLocalScale())
        .to(pc.Vec3.ZERO, duration, pc.SineIn)
        .start();

    this.buzzerRight.tween(this.buzzerRight.getLocalScale())
        .to(pc.Vec3.ZERO, duration, pc.SineIn)
        .start();
};



Scene.prototype._showBuzzerLights = function (immeadiately = false) {
    if (!this.entity.enabled) return;

    const duration = immeadiately ? 0.01 : 0.2;

    this.lightLeft.setLocalScale(0, 0, 0);
    this.lightLeft.tween(this.lightLeft.getLocalScale())
        .to(this._lightLeftInitialScale, duration, pc.SineOut)
        .start();

    this.lightRight.setLocalScale(0, 0, 0);
    this.lightRight.tween(this.lightRight.getLocalScale())
        .to(this._lightRightInitialScale, duration, pc.SineOut)
        .start();

};

Scene.prototype._hideBuzzerLights = function (immediately) {
    if (!this.entity.enabled) return;

    const duration = immediately ? 0.001 : 0.175;

    this.lightLeft.tween(this.lightLeft.getLocalScale())
        .to({ x: 0, y: 0, z: 0 }, duration, pc.SineOut)
        .start();

    this.lightRight.tween(this.lightRight.getLocalScale())
        .to({ x: 0, y: 0, z: 0 }, duration, pc.SineOut)
        .start();
};

Scene.prototype._hideSingleBuzzerLight = function (contestantType) {
    if (!this.entity.enabled) return;

    const duration = 0.175;
    const light = contestantType === Constants.Contestants.PLAYER ? this.lightLeft : this.lightRight;

    light.tween(light.getLocalScale())
        .to({ x: 0, y: 0, z: 0 }, duration, pc.SineOut)
        .start();
};


Scene.prototype._openHatches = function (contestantType) {
    const hatches = contestantType === Constants.Contestants.PLAYER ? this.hatchesPlayer : this.hatchesOpponent;
    hatches.forEach((hatch, index) => {
        hatch.tween(hatch.getLocalPosition())
            .to({ x: hatch._closedPosition.x - 330 * Math.sign(index - 0.5) }, 0.3, pc.Linear)
            .start();
    });
};

Scene.prototype._closeHatches = function () {
    const hatches = [...this.hatchesPlayer, ...this.hatchesOpponent];
    hatches.forEach((hatch, index) => {
        const localPosition = hatch.getLocalPosition();
        localPosition.x = hatch._closedPosition.x;
        hatch.setLocalPosition(localPosition);
    });
};


Scene.prototype.update = function (dt) {

};


// positionTween.js
var PositionTween = pc.createScript('positionTween');

PositionTween.attributes.add('deltaPosition', {
    type: 'vec3',
    default: [0, 1, 0]
});

PositionTween.attributes.add('duration', {
    type: 'number',
    default: 0.9
});

PositionTween.attributes.add('yoyo', {
    type: 'boolean',
    default: true
});

PositionTween.attributes.add('loop', {
    type: 'boolean',
    default: true
});

PositionTween.attributes.add('randomPhase', {
    type: 'boolean',
    default: true
});




PositionTween.attributes.add('easing', {
    type: 'string',
    enum: [
        {"Linear": "Linear"},
        {"QuadraticIn": "QuadraticIn"},
        {"QuadraticOut": "QuadraticOut"},
        {"QuadraticInOut": "QuadraticInOut"},
        {"CubicIn": "CubicIn"},
        {"CubicOut": "CubicOut"},
        {"CubicInOut": "CubicInOut"},
        {"QuarticIn": "QuarticIn"},
        {"QuarticOut": "QuarticOut"},
        {"QuarticInOut": "QuarticInOut"},
        {"QuinticIn": "QuinticIn"},
        {"QuinticOut": "QuinticOut"},
        {"QuinticInOut": "QuinticInOut"},
        {"SineIn": "SineIn"},
        {"SineOut": "SineOut"},
        {"SineInOut": "SineInOut"},
        {"ExponentialIn": "ExponentialIn"},
        {"ExponentialOut": "ExponentialOut"},
        {"ExponentialInOut": "ExponentialInOut"},
        {"CircularIn": "CircularIn"},
        {"CircularOut": "CircularOut"},
        {"CircularInOut": "CircularInOut"},
        {"BackIn": "BackIn"},
        {"BackOut": "BackOut"},
        {"BackInOut": "BackInOut"},
        {"BounceIn": "BounceIn"},
        {"BounceOut": "BounceOut"},
        {"BounceInOut": "BounceInOut"},
        {"ElasticIn": "ElasticIn"},
        {"ElasticOut": "ElasticOut"},
        {"ElasticInOut": "ElasticInOut"}
    ],
    default: "Linear"
});

PositionTween.prototype.initialize = function() {
    this.initialLocalPosition = this.entity.getLocalPosition().clone();
    
    this._restartTween();
    this.on('attr', this._restartTween, this);
};


PositionTween.prototype.update = function(dt) {
    
};


PositionTween.prototype._restartTween = function() {
    this.entity.setLocalPosition(this.initialLocalPosition);
    this._targetLocalPosition = this.initialLocalPosition.clone().add(this.deltaPosition);
    
    this.entity.tween(this.entity.getLocalPosition())
        .to(this._targetLocalPosition, this.duration, pc[this.easing])
        .delay(this.randomPhase ? pc.math.random(0, this.duration) : 0)
        .yoyo(this.yoyo)
        .loop(this.loop)
        .start(); 
};





// opacityTween.js
var OpacityTween = pc.createScript('opacityTween');

OpacityTween.attributes.add('targetOpacity', {
    type: 'number',
    default: 0.5
});

OpacityTween.attributes.add('duration', {
    type: 'number',
    default: 0.9
});

OpacityTween.attributes.add('yoyo', {
    type: 'boolean',
    default: true
});

OpacityTween.attributes.add('loop', {
    type: 'boolean',
    default: true
});


OpacityTween.attributes.add('sprite', {
    type: 'boolean',
    default: false
});


OpacityTween.attributes.add('easing', {
    type: 'string',
    enum: [
        { "Linear": "Linear" },
        { "QuadraticIn": "QuadraticIn" },
        { "QuadraticOut": "QuadraticOut" },
        { "QuadraticInOut": "QuadraticInOut" },
        { "CubicIn": "CubicIn" },
        { "CubicOut": "CubicOut" },
        { "CubicInOut": "CubicInOut" },
        { "QuarticIn": "QuarticIn" },
        { "QuarticOut": "QuarticOut" },
        { "QuarticInOut": "QuarticInOut" },
        { "QuinticIn": "QuinticIn" },
        { "QuinticOut": "QuinticOut" },
        { "QuinticInOut": "QuinticInOut" },
        { "SineIn": "SineIn" },
        { "SineOut": "SineOut" },
        { "SineInOut": "SineInOut" },
        { "ExponentialIn": "ExponentialIn" },
        { "ExponentialOut": "ExponentialOut" },
        { "ExponentialInOut": "ExponentialInOut" },
        { "CircularIn": "CircularIn" },
        { "CircularOut": "CircularOut" },
        { "CircularInOut": "CircularInOut" },
        { "BackIn": "BackIn" },
        { "BackOut": "BackOut" },
        { "BackInOut": "BackInOut" },
        { "BounceIn": "BounceIn" },
        { "BounceOut": "BounceOut" },
        { "BounceInOut": "BounceInOut" },
        { "ElasticIn": "ElasticIn" },
        { "ElasticOut": "ElasticOut" },
        { "ElasticInOut": "ElasticInOut" }
    ],
    default: "Linear"
});


OpacityTween.prototype.initialize = function () {
    this.targetElement = this.sprite ? this.entity.sprite : this.entity.element;
    this.initialOpacity =  this.targetElement.opacity;

    this._restartTween();
    this.on('attr', this._restartTween, this);
};

OpacityTween.prototype._restartTween = function() {
    // this.app.stopAllTweens(this.entity);
    this.targetElement.opacity = this.initialOpacity;
    
    this.entity.tween(this.targetElement)
        .to({opacity: this.targetOpacity}, this.duration, pc[this.easing])
        .yoyo(this.yoyo)
        .loop(this.loop)
        .start(); 
};


OpacityTween.prototype.update = function (dt) {

};


// Popup_RoundResults.js

class PopupRoundResults extends BaseWindow {

    initialize() {
        super.initialize();

        this.firstLine = this.entity.findByName('FirstLine');
        this.secondLine = this.entity.findByName('SecondLine');
        this.nameText = this.entity.findByName('NameText');
        this.winnerText = this.entity.findByName('WinnerText');
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        const roundResult = RoundManager.getInstance().getLastRoundResult();


        const roundWinner = roundResult.winner;
        const winnerContestantData = roundWinner === Constants.Contestants.PLAYER ? MatchManager.getInstance().getPlayerContestantData() : MatchManager.getInstance().getOpponentContestantData();

        this.nameText.element.text = winnerContestantData.name;
        this.nameText.element.color = new pc.Color().copy(winnerContestantData.color.UI);

        Utils.wait(GameConfig.getAttribute('UI', 'roundResultsVisibilityDuration') * 1000).then(() => {
            this.proceedToNextScreen();
        });
    }

    _onHide() {
        super._onHide();
    }

    update(dt) {

    }

    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.ROUND_RESULTS).then(() => {
            UIController.getInstance().showPopup(Constants.Screens.ANSWERS_RECAP);
        })
    }
}

pc.registerScript(PopupRoundResults, 'popupRoundResults');

// Popup_AnswersRecap.js
class PopupAnswersRecap extends BaseWindow {

    initialize() {
        super.initialize();

        this.levelText = this.entity.findByName('LevelText');
        this.answerPanels = this.entity.findByName('AnswersGroup').children;

        this.app.on(EventTypes.LEVEL_NUMBER_CHANGED, this._onLevelNumberChanged, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        /* hide buzzers */
        this.app.fire(EventTypes.HIDE_BUZZERS);

        /* fetch round result */
        const roundResult = RoundManager.getInstance().getLastRoundResult();

        this.answerPanels.forEach((panel, index) => {
            const givenAnswer = roundResult.givenAnswers[index];
            panel.fillData(givenAnswer.answer.getAnswerText(), givenAnswer.hasKey, givenAnswer.points, givenAnswer.contestantData);
        });
    }

    _onAppeared() {
        this.app.once(EventTypes.TAP_AT, this._handleTap, this);
    }

    _onHide() {
        this.app.off(EventTypes.TAP_AT, this._handleTap, this);
        super._onHide();
    }

    _handleTap() {
        this.proceedToNextScreen();
    }

    _onLevelNumberChanged(value) {
        this.levelText.element.text = `--- ` + LocalizationManager.getInstance().getLocalizedText(`LEVEL #value#`).replace('#value#', `${value}`) + ` ---`;
    }

    update(dt) {

    }

    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.ANSWERS_RECAP).then(() => {
            UIController.getInstance().showPopup(Constants.Screens.SCORE_RECAP);
        })
    }
}

pc.registerScript(PopupAnswersRecap, 'popupAnswersRecap');

// Popup_ScoreRecap.js
class PopupScoreRecap extends BaseWindow {

    initialize() {
        super.initialize();

        this.winnerPanel1 = this.entity.findByName('WinnerPanel1');
        this.winnerPanel2 = this.entity.findByName('WinnerPanel2');
        this.winnerText1 = this.winnerPanel1.findByName('WinnerText');
        this.winnerText2 = this.winnerPanel2.findByName('WinnerText');

        this.lines = [
            this.entity.findByName('Line1'),
            this.entity.findByName('Line2'),
            this.entity.findByName('Line3')
        ];
        this.lineScores = this.lines.map(line => [line.findByName('Player01Score'), line.findByName('Player02Score')]);

        this.lineTotal = this.entity.findByName('LineTotal')
        this.lineTotalScores = [this.lineTotal.findByName('Player01Score'), this.lineTotal.findByName('Player02Score')]
    }

    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();
        this._tweenTexts();

    }

    _onAppeared() {
        this.app.once(EventTypes.TAP_AT, this._handleTap, this);
    }

    _onHide() {
        this.app.off(EventTypes.TAP_AT, this._handleTap, this);
        super._onHide();
    }

    _handleTap() {
        this.proceedToNextScreen();
    }

    _clearTexts() {
        this.winnerPanel1.enabled = false;
        this.winnerPanel2.enabled = false;

        this.lineScores.forEach(line => {
            line.forEach(item => {
                item.element.text = '-';
                item.element.color = pc.Color.BLACK;
            });
        });
        this.lineTotalScores.forEach(item => {
            item.element.text = '-';
        });
    }

    async _tweenTexts() {
        this._clearTexts();

        const lastRoundIndex = RoundManager.getInstance().getRoundIndex();
        const lastRoundResult = RoundManager.getInstance().getLastRoundResult();
        const lastRoundWinner = lastRoundResult.winner;
        const roundResults = RoundManager.getInstance().getRoundResults();
        const tweenPromises = [];

        let playerPrevTotalScore = 0;
        let opponentPrevTotalScore = 0;
        let playerFinalTotalScore = 0;
        let opponentFinalTotalScore = 0;

        roundResults.forEach((result) => {
            const index = result.roundIndex;

            const playerScore = Math.floor(result.playerScore * result.multiplier);
            const opponentScore = Math.floor(result.opponentScore * result.multiplier);
            const scoresTexts = this.lineScores[index - 1];

            /* sum scores */
            if (index !== lastRoundIndex) {
                playerPrevTotalScore += playerScore;
                opponentPrevTotalScore += opponentScore;
            }
            playerFinalTotalScore += playerScore;
            opponentFinalTotalScore += opponentScore;
            this.lineTotalScores[0].element.text = '-';// `${playerPrevTotalScore}`;
            this.lineTotalScores[1].element.text = '-'; //`${opponentPrevTotalScore}`;


            /* set colors */
            if (result.winner === Constants.Contestants.PLAYER) {
                scoresTexts[0].element.color = result.playerContestantData.color.UI;
                scoresTexts[1].element.color = pc.Color.BLACK;
            } else {
                scoresTexts[0].element.color = pc.Color.BLACK;
                scoresTexts[1].element.color = result.opponentContestantData.color.UI;
            }

            if (index === lastRoundIndex) {
                tweenPromises.push(Utils.tweenText(scoresTexts[0], 0, playerScore, 0.8, 0, pc.Linear));
                tweenPromises.push(Utils.tweenText(scoresTexts[1], 0, opponentScore, 0.8, 0, pc.Linear));
            } else {
                scoresTexts[0].element.text = `${playerScore}`;
                scoresTexts[1].element.text = `${opponentScore}`;
            }
        });

        await Promise.all(tweenPromises);

        const winnerPanel = lastRoundWinner === Constants.Contestants.PLAYER ? this.winnerPanel1 : this.winnerPanel2;
        const winnerText = lastRoundWinner === Constants.Contestants.PLAYER ? this.winnerText1 : this.winnerText2;
        const winnerColor = lastRoundWinner === Constants.Contestants.PLAYER ? lastRoundResult.playerContestantData.color.UI : lastRoundResult.opponentContestantData.color.UI;
        await this._showWinnerPlate(winnerPanel, winnerText, winnerColor, false);

        const totalScorePromises = [];
        /* tween total score */
        totalScorePromises.push(Utils.tweenText(this.lineTotalScores[0], playerPrevTotalScore, playerFinalTotalScore, 0.8, 0, pc.Linear));
        totalScorePromises.push(Utils.tweenText(this.lineTotalScores[1], opponentPrevTotalScore, opponentFinalTotalScore, 0.8, pc.Linear));

        await Promise.all(totalScorePromises);

        if (lastRoundIndex === RoundManager.getInstance().totalRounds) {
            /* show final winner */
            const finalWinner = playerFinalTotalScore >= opponentFinalTotalScore ? Constants.Contestants.PLAYER : Constants.Contestants.OPPONENT;
            const finalWinnerPanel = finalWinner === Constants.Contestants.PLAYER ? this.winnerPanel1 : this.winnerPanel2;
            const finalWinnerText = finalWinner === Constants.Contestants.PLAYER ? this.winnerText1 : this.winnerText2;
            const finalWinnerColor = finalWinner === Constants.Contestants.PLAYER ? lastRoundResult.playerContestantData.color.UI : lastRoundResult.opponentContestantData.color.UI;
            await this._showWinnerPlate(finalWinnerPanel, finalWinnerText, finalWinnerColor, true);
        }
    }

    _showWinnerPlate(plate, text, winnerColor, matchWinner = false) {
        return new Promise((resolve, reject) => {
            plate.enabled = true;
            plate.element.color = winnerColor;
            text.element.text = `${matchWinner ? LocalizationManager.getInstance().getLocalizedText('Winner').toUpperCase() : LocalizationManager.getInstance().getLocalizedText('Round Winner').toUpperCase()}`;

            plate.setLocalScale(0, 0, 0);
            plate.tween(plate.getLocalScale())
                .to({ x: 1, y: 1, z: 1 }, 0.45, pc.BackOut)
                .delay(0.175)
                .onComplete(() => {
                    plate.tween(plate.getLocalScale())
                        .to({ x: 0, y: 0, z: 0 }, 0.175, pc.SineOut)
                        .delay(1.325)
                        .onComplete(() => {
                            plate.enabled = false;
                            resolve();
                        })
                        .start();
                })
                .start();

        });
    }

    update(dt) {

    }


    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.SCORE_RECAP);

        if (MatchManager.getInstance().isMatchFinished()) {
            APIMediator.showInterstitialAd('match:finished').then(() => {
                UIController.getInstance().showPopup(Constants.Screens.MATCH_RESULTS);
            })
        } else {
            const lastRoundResult = RoundManager.getInstance().getLastRoundResult();
            const lastRoundMoney = lastRoundResult.playerScore * lastRoundResult.multiplier;
            if (lastRoundMoney > 0) {
                UIController.getInstance().showWindow(Constants.Screens.CLAIM_REWARD);
            } else {
                RoundManager.getInstance().getActiveRound().setState(Constants.RoundState.CLOSED);
            }
        }
    }
}

pc.registerScript(PopupScoreRecap, 'popupScoreRecap');

// answerRecap.js
var AnswerRecap = pc.createScript('answerRecap');

AnswerRecap.prototype.initialize = function() {
    this.outline = this.entity.findByName('RectangleOutline');
    this.panel = this.entity.findByName('Panel');
    this.answerText = this.entity.findByName('AnswerText');
    this.iconKey = this.entity.findByName('IconKey');
    this.scoreText = this.entity.findByName('ScoreText');

    this.entity.fillData = this._fillData.bind(this);
};

AnswerRecap.prototype._fillData = function(answerText, hasKey, points, contestantData) {
    this.answerText.element.width = hasKey ? 240 : 300;
    this.answerText.element.text = `${answerText}`;
    this.iconKey.enabled = hasKey;
    this.scoreText.element.text = `${points}`;
    if(contestantData) {
        this.panel.element.color = new pc.Color().copy(contestantData.color.UI);
        this.answerText.element.color = new pc.Color().copy(contestantData.color.name);
        this.scoreText.element.color = new pc.Color().copy(contestantData.color.name);
    } else {
        this.panel.element.color = pc.Color.WHITE;
        this.answerText.element.color = pc.Color.BLACK;
        this.scoreText.element.color = pc.Color.BLACK;
    }
};


AnswerRecap.prototype.update = function(dt) {

};



// Popup_MatchResults.js
class PopupMatchResults extends BaseWindow {

    initialize() {
        super.initialize();

        this.firstLine = this.entity.findByName('FirstLine');
        this.secondLine = this.entity.findByName('SecondLine');
        this.nameText = this.entity.findByName('NameText');
        this.winnerText = this.entity.findByName('WinnerText');
        this.starsExplosion = this.entity.findByName('StarsExplosion');
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        const matchWinner = MatchManager.getInstance().getMatchWinner();
        if (matchWinner === Constants.Contestants.PLAYER) {
            const winnerContestantData = MatchManager.getInstance().getPlayerContestantData();
            this.nameText.element.text = winnerContestantData.name;
            this.nameText.element.color = new pc.Color().copy(winnerContestantData.color.UI);

            Utils.wait(700).then(() => {
                this.starsExplosion.particlesystem.reset();
                this.starsExplosion.particlesystem.play();
            });
        } else if (matchWinner === Constants.Contestants.OPPONENT) {
            const winnerContestantData = MatchManager.getInstance().getOpponentContestantData();
            this.nameText.element.text = winnerContestantData.name;
            this.nameText.element.color = new pc.Color().copy(winnerContestantData.color.UI);
        }

        Utils.wait(GameConfig.getAttribute('UI', 'roundResultsVisibilityDuration') * 1000).then(() => {
            this.proceedToNextScreen();
        });
    }

    _onHide() {
        super._onHide();
    }

    update(dt) {

    }

    proceedToNextScreen() {
        const lastRoundResult = RoundManager.getInstance().getLastRoundResult();
        const lastRoundMoney = lastRoundResult.playerScore * lastRoundResult.multiplier;
        if(lastRoundMoney > 0) {
            UIController.getInstance().showWindow(Constants.Screens.CLAIM_REWARD);
        } else {
            UIController.getInstance().hide(Constants.Screens.MATCH_RESULTS);
            RoundManager.getInstance().getActiveRound().setState(Constants.RoundState.CLOSED);
        }
    }
}

pc.registerScript(PopupMatchResults, 'popupMatchResults');

// Screen_RoundPresenter.js
class ScreenRoundPresenter extends BaseWindow {

    initialize() {
        super.initialize();

        this.overlay = this.entity.findByName('Overlay');
        this.roundTitle = this.entity.findByName('RoundTitle');
        this.textScoreMultiplier = this.entity.findByName('ScoreMultiplierText');
        this.textCountdown = this.entity.findByName('TextCountdown');
        this.textGo = this.entity.findByName('TextGo');
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        /* hide texts */
        this.textCountdown.element.opacity = 0;
        this.textGo.element.opacity = 0;
        this.roundTitle.enabled = false;
        this.textScoreMultiplier.enabled = false;

        Utils.wait(150).then(() => this.startCountdown());
    }

    _onHide() {
        /* show buzzers */
        this.app.fire(EventTypes.SHOW_BUZZER_LIGHTS);
        this.app.fire(EventTypes.SHOW_BUZZERS);
        this.app.fire(EventTypes.SHOW_AUDIENCE_AREAS);

        super._onHide();
    }

    startCountdown() {

        const baseDelay = 500;
        const tickDelay = 850;
        const roundIndex = RoundManager.getInstance().getRoundIndex();

        this.roundTitle.enabled = true;
        this.roundTitle.element.text = LocalizationManager.getInstance().getLocalizedText(`ROUND ${roundIndex}`);
        this.roundTitle.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        if (roundIndex >= 1) {
            this.textScoreMultiplier.enabled = true;
            const textValues = ['', '', 'DOUBLE POINTS', 'TRIPLE POINTS']
            this.textScoreMultiplier.element.text = LocalizationManager.getInstance().getLocalizedText(textValues[roundIndex] || "");
            this.textScoreMultiplier.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        }

        Utils.wait(baseDelay).then(() => this._tweenCountdownText(3));
        Utils.wait(baseDelay + tickDelay).then(() => this._tweenCountdownText(2));
        Utils.wait(baseDelay + tickDelay * 2).then(() => this._tweenCountdownText(1));
        Utils.wait(baseDelay + tickDelay * 3).then(() => this._tweenGoText());
        Utils.wait(baseDelay + tickDelay * 4.25).then(() => this.proceedToNextScreen())
    }

    _tweenCountdownText(value) {
        this.textCountdown.element.text = `${value}`;
        this.textCountdown.setLocalScale(0, 0, 0);
        this.textCountdown.tween(this.textCountdown.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, 0.425, pc.SineInOut)
            .repeat(2)
            .yoyo(true)
            .start();

        this.textCountdown.element.opacity = 0;
        this.textCountdown.tween(this.textCountdown.element)
            .to({ opacity: 1 }, 0.25, pc.SineInOut)
            .repeat(2, 0.35)
            .yoyo(true)
            .start();
    }

    _tweenGoText() {
        this.textGo.setLocalScale(0, 0, 0);
        this.textGo.tween(this.textGo.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, 0.5, pc.BackOut)
            .repeat(2, 0.75)
            .yoyo(true)
            .start();

        this.textGo.element.opacity = 0;
        this.textGo.tween(this.textGo.element)
            .to({ opacity: 1 }, 0.25, pc.SineInOut)
            .repeat(2, 0.5)
            .yoyo(true)
            .start();

    }

    _tweenContestantsToRoundPositions() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        const playerB = ContestantsManager.getInstance().getOpponentContestant();
        const contestantPositionA = HierarchyManager.getInstance().getByPath('Stage/StageContent/ContestantPositions/ContenstantPositionA');
        const contestantPositionB = HierarchyManager.getInstance().getByPath('Stage/StageContent/ContestantPositions/ContenstantPositionB');

        playerA.setAboveUI(false);
        playerB.setAboveUI(false);

        ContestantsManager.getInstance().tweenContestantTo(playerA, contestantPositionA, 0.5, pc.SineOut);
        ContestantsManager.getInstance().tweenContestantTo(playerB, contestantPositionB, 0.5, pc.SineOut);
    }

    update(dt) {

    }

    proceedToNextScreen() {
        this._tweenContestantsToRoundPositions();

        UIController.getInstance().hide(Constants.Screens.ROUND_PRESENTER);

        MatchManager.getInstance().showHintAndProceedToRound();
    }

}

pc.registerScript(ScreenRoundPresenter, 'screenRoundPresenter');

// MatchManager.js
var MatchManager = pc.createScript('matchManager');


MatchManager.getInstance = function () {
    if (!MatchManager._instance) console.error('MatchManager is not initialized yet');
    return MatchManager._instance;
};


MatchManager.prototype.initialize = function () {
    MatchManager._app = this.app;
    if (!MatchManager._instance) {
        MatchManager._instance = this;
    }

    this.matchIndex = 0;
    this.matchFinished = false;
    this.matchWinner = null;
    this.winnerScore = 0;
    this.loserScore = 0;

    this.playerContestantData = null;
    this.opponentContestantData = null;

    this.app.on(EventTypes.EQUIP_PLAYER_SKIN, this._equipPlayerSkin, this);
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

MatchManager.prototype.postInitialize = function () {

}


MatchManager.prototype.initializeMatch = async function (_opponentCotestantData = null) {
    this.matchIndex++;

    this._spawnPlayer();
    this._spawnOpponent(_opponentCotestantData);
};



MatchManager.prototype.startMatch = async function () {
    if (!this._activeMatch) {
        /* new match from scratch */
        this.reset();
    }

    this._activeMatch = true;
    await APIMediator.gameStart();
    await this.startNextRound();
};

MatchManager.prototype.restartMatch = async function () {
    if (!RoundManager.getInstance().isRoundBeingPlayed()) {
        console.log('[Gameplay] no level is being played');
        return false;
    }

    RoundManager.getInstance().roundIndex = 0;
    this._activeMatch = true;
    await APIMediator.gameStart();
    await this.startNextRound(true);
};


MatchManager.prototype.startNextRound = async function (fromRestart = false) {
    if (!this._activeMatch) {
        console.warn('startNextRound: no active match!');
        return false;
    }

    if (!this.matchFinished) {
        await RoundManager.getInstance().startNextRound();
        if (RoundManager.getInstance().getRoundIndex() === 1 && !fromRestart) {
            if (TournamentManager.getInstance().tournamentActive) {
                UIController.getInstance().showWindow(Constants.Screens.TOURNAMENT_START);
            } else {
                UIController.getInstance().showWindow(Constants.Screens.ROUND_SEARCH);
            }
        } else {
            UIController.getInstance().showWindow(Constants.Screens.ROUND_PRESENTER);
        }
    } else {
        console.log('Match already finished, can not start next round');
        return this.exitMatch();
    }
};



MatchManager.prototype.exitMatch = async function () {
    await APIMediator.gameQuit();

    /* hide scene elements */
    this.app.fire(EventTypes.RESET_AUDIENCE);
    this.app.fire(EventTypes.HIDE_BUZZER_LIGHTS);
    this.app.fire(EventTypes.HIDE_BUZZERS);
    this.app.fire(EventTypes.HIDE_AUDIENCE_AREAS);

    this._hideOpponent();

    this._activeMatch = false;

    UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
        fadeInDuration: 0.15,
        fadeOutDuration: 0.85,
        callback: () => {
            if (PunishmentManager.getInstance().punishmentWasActivated) {
                PunishmentManager.getInstance().exit();
            } else {
                PunishmentManager.getInstance().hidePunishmentButton();
            }

            if (TournamentManager.getInstance().tournamentActive) {
                TournamentManager.getInstance().dispatchMatchFinished(this.matchWinner === Constants.Contestants.PLAYER);
            } else {
                if (this.getMatchWinner() === Constants.Contestants.PLAYER && TournamentManager.getInstance().isNextTournamentReady()) {
                    TournamentManager.getInstance().playTournament(true);
                }
            }
        }
    });
};

MatchManager.prototype.quitGame = function () {
    if (!RoundManager.getInstance().isRoundBeingPlayed()) {
        console.log('[Gameplay] no level is being played');
        return false;
    }

    this.app.fire(EventTypes.LEVEL_RESET);

    if (TournamentManager.getInstance().tournamentActive) {
        TournamentManager.getInstance().exitTournament(false);
    }

    this._hideOpponent();

    this._activeMatch = false;

    UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
        fadeInDuration: 0.15,
        fadeOutDuration: 0.85,
        callback: () => {
            /* hide scene elements */
            this.app.fire(EventTypes.RESET_AUDIENCE);
            this.app.fire(EventTypes.HIDE_BUZZER_LIGHTS);
            this.app.fire(EventTypes.HIDE_BUZZERS);
            this.app.fire(EventTypes.HIDE_AUDIENCE_AREAS);

            PunishmentManager.getInstance().exit();
            PunishmentManager.getInstance().hidePunishmentButton();
        }
    });

    return true;
};


MatchManager.prototype.reset = function () {
    RoundManager.getInstance().reset();

    this.matchFinished = false;
    this.matchWinner = null;
    this.winnerScore = 0;
    this.loserScore = 0;
};

MatchManager.prototype.dispatchRoundStarted = function () {
    this.app.fire(EventTypes.ROUND_STARTED);
};

MatchManager.prototype.showHintAndProceedToRound = async function () {
    if (RoundManager.getInstance().getRoundIndex() !== 1) {
        UIController.getInstance().showPopup(Constants.Screens.ROUND);
    } else {
        const rewardedAvailable = await APIMediator.checkRewardedVideoAvailability('button:freehint:get');
        if (rewardedAvailable) {
            UIController.getInstance().showPopup(Constants.Screens.HINT);
        } else {
            UIController.getInstance().showPopup(Constants.Screens.ROUND);
        }
    }
};

MatchManager.prototype.dispatchRoundFinished = function (roundResult) {
    this.app.fire(EventTypes.ROUND_FINISHED);

    this.app.fire(EventTypes.AUDIENCE_CELEBRATE_VICTORY, roundResult.winner);

    const winnerContestant = ContestantsManager.getInstance().getContestant(roundResult.winner);
    winnerContestant.setTrigger('roundVictory');

    const loserContestant = ContestantsManager.getInstance().getContestant(roundResult.loser);
    loserContestant.setTrigger('defeat');

    this.app.fire(EventTypes.FIRE_BUZZER_PARTICLES, roundResult.winner);
}

MatchManager.prototype.dispatchRoundClosed = async function () {
    if (this.matchFinished) {
        const enoughKeysForChest = DataManager.getInstance().keys >= DataManager.getInstance().requiredKeys;
        if (enoughKeysForChest) {
            /* show chest menu */
            UIController.getInstance().showPopup(Constants.Screens.CHESTROOM);
            await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.CHESTROOM);
        }

        if (this.getMatchWinner() === Constants.Contestants.PLAYER) {
            /* show punishments */
            UIController.getInstance().showWindow(Constants.Screens.PUNISHMENT);
            await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.PUNISHMENT);

            if (TournamentManager.getInstance().tournamentActive) {
                //do nothing, we'll show the ticket screen after rewarding player
            } else {
                if (TournamentManager.getInstance().isNextTournamentReady()) {
                    TournamentManager.getInstance().prepareNextTournament();
                    UIController.getInstance().showWindow(Constants.Screens.TOURNAMENT_TICKET);
                    await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.TOURNAMENT_TICKET);
                }
            }
        } else {
            /* lost :( */
            if (TournamentManager.getInstance().tournamentActive) {
                UIController.getInstance().showWindow(Constants.Screens.TOURNAMENT_DEFEAT);
                await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.TOURNAMENT_DEFEAT);
            }
        }

        MatchManager.getInstance().exitMatch();
    } else {
        this.startNextRound();
    }
}


MatchManager.prototype.dispatchMatchFinished = function (matchResultData) {
    this.matchFinished = true;
    this.matchWinner = matchResultData.winner;
    this.winnerScore = matchResultData.winnerScore;
    this.loserScore = matchResultData.loserScore;
    DataManager.getInstance().saveMatchResult(matchResultData.winner === Constants.Contestants.PLAYER ? 1 : 0);
}

MatchManager.prototype.isMatchFinished = function () {
    return this.matchFinished;
};

MatchManager.prototype.getMatchWinner = function () {
    return this.matchWinner;
};

MatchManager.prototype.getWinnerScore = function () {
    return this.winnerScore;
};

MatchManager.prototype.getLoserScore = function () {
    return this.loserScore;
};

MatchManager.prototype.getContestantData = function (contestantType) {
    if (contestantType === Constants.Contestants.PLAYER) {
        return this.playerContestantData;
    } else {
        return this.opponentContestantData;
    }
};

MatchManager.prototype.getPlayerContestantData = function () {
    return this.playerContestantData;
}

MatchManager.prototype.getOpponentContestantData = function () {
    return this.opponentContestantData;
}

MatchManager.prototype._equipPlayerSkin = function (skinName, skinData) {
    this._spawnPlayer();
};


MatchManager.prototype.update = function (dt) {

};


/** internal */

MatchManager.prototype._spawnPlayer = function () {
    const playerColors = DataManager.getInstance().playerColor;
    this.playerContestantData = new ContestantData(
        Constants.Contestants.PLAYER,
        DataManager.getInstance().username || "You",
        playerColors,
        SkinManager.getInstance().getActivePlayerSkin() //SkinManager.getInstance().getSkinByName('Default')  //TODO load saved skin 
    );
    ContestantsManager.getInstance().getPlayerContestant().setFromContestantData(this.playerContestantData);
    this.app.fire(EventTypes.SET_CONTESTANT_COLORS, Constants.Contestants.PLAYER, playerColors);
}

MatchManager.prototype._spawnOpponent = function (_opponentPresetData) {
    if (_opponentPresetData) {
        this.opponentContestantData = _opponentPresetData;
        ContestantsManager.getInstance().getOpponentContestant().setFromContestantData(this.opponentContestantData);
        this.app.fire(EventTypes.SET_CONTESTANT_COLORS, Constants.Contestants.OPPONENT, this.opponentContestantData.color);
    } else {
        const opponentColors = Utils.getRandomItem(GameConfig.getAttribute('opponentColors'));
        const opponentName = Utils.getRandomItem(LocalizationManager.getInstance().getPlayerNames());
        DataManager.getInstance().opponentName = opponentName;
        this.opponentContestantData = new ContestantData(
            Constants.Contestants.OPPONENT,
            DataManager.getInstance().opponentName,
            opponentColors,
            SkinManager.getInstance().getRandomDefaultSkin() //SkinManager.getInstance().getSkinByName('Default')
        );
        ContestantsManager.getInstance().getOpponentContestant().setFromContestantData(this.opponentContestantData);
        this.app.fire(EventTypes.SET_CONTESTANT_COLORS, Constants.Contestants.OPPONENT, opponentColors);
    }
}

MatchManager.prototype._hideOpponent = function () {
    ContestantsManager.getInstance().getOpponentContestant().setLocalScale(0, 0, 0);
}


// currencyCounter.js
var CurrencyCounter = pc.createScript('currencyCounter');

CurrencyCounter.attributes.add('hasKeysCounter', {
    type: 'boolean',
    default: true
});

CurrencyCounter.attributes.add('tweenValues', {
    type: 'boolean',
    default: true
});

CurrencyCounter.attributes.add('tweenDuration', {
    type: 'number',
    default: 0.5
});


CurrencyCounter.prototype.initialize = function () {
    this.counterBody = this.entity.findByName('CurrencyCounterBody');
    this.iconMoney = this.entity.findByName('IconMoney');
    this.textMoney = this.entity.findByName('TextMoney');
    this.iconKeys = this.entity.findByName('IconKeys');
    this.collectablesSpawnerMoney = this.entity.findByName('CollectablesSpawner_Money');
    if (this.hasKeysCounter) {
        this.textKeys = this.entity.findByName('TextKeys');
        this.collectablesSpawnerKeys = this.entity.findByName('CollectablesSpawner_Keys');
    }

    this.app.on(EventTypes.MONEY_AMOUNT_CHANGED, this._updateMoney, this);
    this._moneyValue = 0;

    this.entity.show = this._show.bind(this);
    this.entity.spawnAndPickupMoney = this._spawnAndPickupMoney.bind(this);

    if (this.hasKeysCounter) {
        this.entity.spawnAndPickupKeys = this._spawnAndPickupKeys.bind(this);

        this.app.on(EventTypes.KEYS_AMOUNT_CHANGED, this._updateKeys, this);
        this._keysValue = DataManager.getInstance().keys;
    }
};

CurrencyCounter.prototype.postInitialize = function() {
    this._updateMoney(DataManager.getInstance().money);
    if (this.hasKeysCounter) {
        this._updateKeys(DataManager.getInstance().keys);
    }
};

CurrencyCounter.prototype._show = function () {
    return new Promise((resolve, reject) => {
        this.entity.enabled = true;
        this.collectablesSpawnerMoney.clear();
        if (this.hasKeysCounter) this.collectablesSpawnerKeys.clear();
        this.counterBody.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        this.counterBody.once(EventTypes.UI_ELEMENT.APPEARED, () => resolve())
    });
};

CurrencyCounter.prototype._spawnAndPickupMoney = function (_fromWorldPosition, amount, duration) {
    if (!amount) return Promise.resolve();
    if (this.tweenValues) {
        const delay = Math.max(duration - this.tweenDuration / 2);
        Utils.wait(delay * 1000).then(() => {
            DataManager.getInstance().money += amount;
        });
    } else {
        DataManager.getInstance().money += amount;
    }
    return this.collectablesSpawnerMoney.collect(_fromWorldPosition, this.iconMoney.getPosition(), amount / 5, duration);
};

CurrencyCounter.prototype._spawnAndPickupKeys = function (_fromWorldPosition, amount, duration) {
    Utils.wait(duration * 1000).then(() => {
        DataManager.getInstance().keys += amount;
    });
    return this.collectablesSpawnerKeys.collect(_fromWorldPosition, this.iconKeys.getPosition(), amount, duration);
};


CurrencyCounter.prototype._updateMoney = function (value) {
    if (value !== this._moneyValue || !this._moneyValue) {
        const prevValue = this._moneyValue;
        this._moneyValue = value;
        if (this.tweenValues) {
            Utils.tweenText(this.textMoney, prevValue, this._moneyValue, this.tweenDuration, 0, pc.Linear, true);
        } else {
            this.textMoney.element.text = `${Utils.formanMoney(value)}`;
        }
    }
};

CurrencyCounter.prototype._updateKeys = function (value) {
    this.textKeys.element.text = `${value}/${DataManager.getInstance().requiredKeys}`;
};


CurrencyCounter.prototype.update = function (dt) {

};



// AIManager.js
var AIManager = pc.createScript('aimanager');

AIManager.attributes.add('contestantAISettings', {
    type: 'json',
    schema: [{
        name: 'index',
        type: 'number',
        default: 0
    },{
        name: 'numAnswers',
        type: 'vec2',
        default: [5, 7]
    }, {
        name: 'goodAnswers',
        type: 'vec2',
        array: true
    }],
    array: true
});


AIManager.getInstance = function () {
    if (!AIManager._instance) console.error('RoundManager is not initialized yet');
    return AIManager._instance;
};


AIManager.prototype.initialize = function () {
    AIManager._app = this.app;
    if (!AIManager._instance) {
        AIManager._instance = this;
    }
};

AIManager.prototype._getAISettings = function(difficulty) {
    return this.contestantAISettings[difficulty];
}

AIManager.prototype.getContestantAIInstance = function(difficulty) {
    difficulty = pc.math.clamp(difficulty, 0, this.contestantAISettings.length - 1);
    const settings = this._getAISettings(difficulty);

    return new ContestantAI(difficulty, settings);
}






AIManager.prototype.update = function(dt) {

};

// Screen_ClaimReward.js
class ScreenClaimReward extends BaseWindow {

    initialize() {
        super.initialize();

        this._rawMoneyAmount = 0;

        this.rewardedMultiplierGauge = this.entity.findByName('RewardedMultiplierGauge');
        this.currencyCounter = this.entity.findByName('CurrencyCounterLarge');

        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this._buttonsContainerOriginalPosition = this.buttonsContainer.getLocalPosition().clone();
        this.textClaimYourReward = this.entity.findByName('TextClaimYourReward');

        this.rewardedButtonContainer = this.buttonsContainer.findByName('RewardedClaimButtonContainer');
        this.rewardedButton = this.rewardedButtonContainer.findByName('RewardedClaimButton');
        this.rewardedButton.iconKey = this.rewardedButton.findByName('IconKey');
        this.rewardedButton.multiplierText = this.rewardedButton.findByName('MultiplierText');
        this.rewardedButton.moneyValueText = this.rewardedButton.findByName('MoneyValueText');

        this.claimButtonContainer = this.buttonsContainer.findByName('ClaimButtonContainer');
        this.claimButton = this.claimButtonContainer.findByName('ClaimButton');
        this.claimButton.moneyValueText = this.claimButton.findByName('MoneyValueText');

        this.rewardedButton.on(EventTypes.BUTTON_PRESSED, this.onRewardedClaimPressed, this);
        this.claimButton.on(EventTypes.BUTTON_PRESSED, this.onClaimPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();
        this.rewardedMultiplierGauge.enabled = false;

        this.textClaimYourReward.enabled = false;
        this.rewardedButtonContainer.enabled = false;
        this.claimButtonContainer.enabled = false;
        this.currencyCounter.enabled = false;


        const lastRoundResult = RoundManager.getInstance().getLastRoundResult();
        const lastRoundMoney = lastRoundResult.playerScore * lastRoundResult.multiplier;

        this._rawMoneyAmount = lastRoundMoney;
        this.claimButton.moneyValueText.element.text = `${this._rawMoneyAmount}`;
        this.rewardedButton.moneyValueText.element.text = `${this._rawMoneyAmount}`;

    }

    _onAppeared() {
        APIMediator.checkRewardedVideoAvailability('button:victory:multiplyreward').then(result => {
            if (result) {
                this.rewardedMultiplierGauge.enabled = true;
                this.rewardedMultiplierGauge.reset();
                this.rewardedMultiplierGauge.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
                this.rewardedMultiplierGauge.startArrowSwinging();
            }

            Utils.wait(200).then(() => this.showButtons());

        });
    }


    showButtons() {
        this.buttonsContainer.setLocalPosition(this._buttonsContainerOriginalPosition);

        this.textClaimYourReward.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        APIMediator.checkRewardedVideoAvailability('button:victory:multiplyreward').then(result => {

            if (result) {
                this.rewardedButtonContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
                this.rewardedButton.setAvailable(true);
                this.claimButton.setLocalPosition(pc.Vec3.ZERO);
            } else {
                this.claimButton.setPosition(this.rewardedButton.getPosition());
                this.buttonsContainer.translateLocal(0, -125, 0);
            }

            this.claimButtonContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            this.claimButton.setAvailable(true);
        });
    }


    _onHide() {
        super._onHide();
    }


    _hideRewardMultiplierGauge(delay) {
        this.rewardedMultiplierGauge.stopArrowMovement();
        Utils.wait(delay).then(() => this.rewardedMultiplierGauge.fire(EventTypes.UI_ELEMENT.DISAPPEAR));
    }



    /** buttons */
    onClaimPressed() {

        this.rewardedButton.setAvailable(false);
        this.claimButton.setAvailable(false);

        this.rewardedButtonContainer.enabled = false;
        this.textClaimYourReward.enabled = false;

        this._hideRewardMultiplierGauge(0);
        this.acquireReward(this.claimButton.getPosition(), this._rawMoneyAmount, 0);

        Utils.wait(2500).then(() => this.claimButtonContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR));
    }


    async onRewardedClaimPressed() {
        this.rewardedButton.setAvailable(false);
        this.claimButton.setAvailable(false);

        const result = await APIMediator.watchRewardedVideo('button:victory:multiplyreward');
        if (result) {
            const rewardType = this.rewardedMultiplierGauge.stopAndClaimReward();
            let moneyMultiplier = 1;
            let totalKeys = 0;

            switch (rewardType) {
                case Constants.RewardMultiplier.KEYS:
                    totalKeys = 1;
                    break;
                case Constants.RewardMultiplier.X2:
                    moneyMultiplier = 2;
                    break;
                case Constants.RewardMultiplier.X3:
                    moneyMultiplier = 3;
                    break;
            }


            this.claimButtonContainer.enabled = false;
            this.textClaimYourReward.enabled = false;

            this._hideRewardMultiplierGauge(1000);
            this.acquireReward(this.rewardedButton.getPosition(), this._rawMoneyAmount * moneyMultiplier, totalKeys);

            Utils.wait(2500).then(() => this.rewardedButtonContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR));

        } else {
            this.rewardedButton.setAvailable(true);
            this.claimButton.setAvailable(true);
        }
    }

    acquireReward(_fromPosition, totalMoney, totalKeys) {
        this.currencyCounter.show().then(() => {
            const promises = [];

            promises.push(this.currencyCounter.spawnAndPickupMoney(_fromPosition, totalMoney, 1.25));

            if (totalKeys > 0) {
                promises.push(Utils.wait(500).then(() => this.currencyCounter.spawnAndPickupKeys(_fromPosition, totalKeys, 1.25)));
            }

            Promise.all(promises).then(() => this.proceedToNextScreen());
        });
    }



    update(dt) {
        if (this.sampleIcon) {
            this.sampleIcon.setPosition(this.rewardedButtonContainer.getPosition())
        }

        if (this.rewardedMultiplierGauge.enabled) {
            const rewardType = this.rewardedMultiplierGauge.getCurrentValue();
            let moneyMultiplier = 1;
            switch (rewardType) {
                case Constants.RewardMultiplier.KEYS:
                    this.rewardedButton.iconKey.enabled = true;
                    this.rewardedButton.multiplierText.enabled = false;
                    moneyMultiplier = 1;
                    break;
                case Constants.RewardMultiplier.X2:
                    moneyMultiplier = 2;
                    this.rewardedButton.iconKey.enabled = false;
                    this.rewardedButton.multiplierText.enabled = true;
                    this.rewardedButton.multiplierText.element.text = 'X2';
                    break;
                case Constants.RewardMultiplier.X3:
                    moneyMultiplier = 3;
                    this.rewardedButton.iconKey.enabled = false;
                    this.rewardedButton.multiplierText.enabled = true;
                    this.rewardedButton.multiplierText.element.text = 'X3';
                    break;
            }

            this.rewardedButton.moneyValueText.element.text = `${this._rawMoneyAmount * moneyMultiplier}`;
        }
    }

    proceedToNextScreen() {
        Utils.wait(1000).then(() => {
            RoundManager.getInstance().getActiveRound().setState(Constants.RoundState.CLOSED);
        });
    }

}

pc.registerScript(ScreenClaimReward, 'screenClaimReward');

// rewardMultiplierGauge.js
var RewardMultiplierGauge = pc.createScript('rewardMultiplierGauge');

RewardMultiplierGauge.attributes.add('arrowPeriod', {
    type: 'number',
    default: 0.75
});

RewardMultiplierGauge.prototype.initialize = function () {
    this.arrow = this.entity.findByName('GaugeArrow');
    this.starsExplosionPurple = this.entity.findByName('StarsExplosionPurple');
    this.starsExplosionGreen = this.entity.findByName('StarsExplosionGreen');
    this.starsExplosionBlue = this.entity.findByName('StarsExplosionBlue');

    this._arrowPhase = 0;
    this._swinging = false;

    this.entity.startArrowSwinging = this._startArrowSwinging.bind(this);
    this.entity.reset = this._reset.bind(this);
    this.entity.stopArrowMovement = this._stopArrowMovement.bind(this);
    this.entity.stopAndClaimReward = this._stopAndClaimReward.bind(this);
    this.entity.getCurrentValue = this._getCurrentValue.bind(this);
};

RewardMultiplierGauge.prototype._reset = function () {
    this._rawArrowPhase = 0;
    this._arrowPhase = 0;
    this._setArrowPosition();
};

RewardMultiplierGauge.prototype._startArrowSwinging = function () {
    this._swinging = true;
};

RewardMultiplierGauge.prototype._stopArrowMovement = function () {
    this._swinging = false;
};

RewardMultiplierGauge.prototype._stopAndClaimReward = function () {
    this._stopArrowMovement();
    const value = this._getCurrentValue();
    this._burstParticles(value);
    return value;
};

RewardMultiplierGauge.prototype._burstParticles = function (value) {
    let particles = null;
    let xPositionSign = -Math.sign(this._arrowPhase);
    switch (value) {
        case Constants.RewardMultiplier.KEYS:
            particles = this.starsExplosionPurple;
            xPositionSign = 0;
            break;
        case Constants.RewardMultiplier.X2:
            particles = this.starsExplosionBlue;
            break;
        case Constants.RewardMultiplier.X3:
            particles = this.starsExplosionGreen;
            break;
    }

    const particlesPosition = particles.getLocalPosition();
    particlesPosition.x = xPositionSign * Math.abs(particlesPosition.x);
    particles.setLocalPosition(particlesPosition);

    particles.particlesystem.reset();
    particles.particlesystem.play();
}


RewardMultiplierGauge.prototype._getCurrentValue = function () {
    if (Math.abs(this._arrowPhase) <= 17 / 90) {
        return Constants.RewardMultiplier.KEYS;
    } else if (Math.abs(this._arrowPhase) <= 60 / 90) {
        return Constants.RewardMultiplier.X2;
    } else {
        return Constants.RewardMultiplier.X3;
    }
};

RewardMultiplierGauge.prototype._setArrowPosition = function () {
    this.arrow.setLocalEulerAngles(0, 0, this._arrowPhase * 90);
}


RewardMultiplierGauge.prototype.update = function (dt) {
    if (this._swinging) {
        this._rawArrowPhase += 1 / this.arrowPeriod * dt;
        const normalizedPhase = this._rawArrowPhase % 4;

        if (normalizedPhase <= 1) this._arrowPhase = normalizedPhase;
        else if (normalizedPhase <= 2) this._arrowPhase = 2 - normalizedPhase;
        else if (normalizedPhase <= 3) this._arrowPhase = 2 - normalizedPhase;
        else this._arrowPhase = normalizedPhase - 4;

        this._setArrowPosition();
    }
};


// CollectablesSpawner.js
var CollectablesSpawner = pc.createScript('collectablesSpawner');

CollectablesSpawner.attributes.add('limitAmount', {
    type: 'vec2',
    default: [0, 25]
});

CollectablesSpawner.attributes.add('spawnRadius', {
    type: 'number',
    default: 100
});

CollectablesSpawner.attributes.add('startAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('randomizeStartAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('endAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('randomizeEndAngle', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('startScale', {
    type: 'number',
    default: 1.5
});

CollectablesSpawner.attributes.add('randomizeStartScale', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('endScale', {
    type: 'number',
    default: 0.5
});

CollectablesSpawner.attributes.add('randomizeEndScale', {
    type: 'number',
    default: 0
});

CollectablesSpawner.attributes.add('durationAppearDelayWeight', {
    type: 'number',
    default: 0.1
});

CollectablesSpawner.attributes.add('durationSpawnWeight', {
    type: 'number',
    default: 0.5
});

CollectablesSpawner.attributes.add('durationDelayWeight', {
    type: 'number',
    default: 0.1
});

CollectablesSpawner.attributes.add('durationMovementWeight', {
    type: 'number',
    default: 0.75
});

CollectablesSpawner.attributes.add('durationRandomWeight', {
    type: 'number',
    default: 0.1
});

CollectablesSpawner.prototype.initialize = function () {
    this.sampleIcon = this.entity.findByName('SampleIcon');
    this._iconInitialScale = this.sampleIcon.getLocalScale().clone();
    this._iconInitialAngles = this.sampleIcon.getLocalEulerAngles().clone();
    this._iconInitialPosition = this.sampleIcon.getLocalPosition().clone();
    this.sampleIcon.enabled = false;

    this.iconsCache = [this.sampleIcon];

    this.entity.collect = this._collect.bind(this);
    this.entity.clear = this._clear.bind(this);
};

CollectablesSpawner.prototype._clear = function() {
    this.entity.children.forEach(child => {
        if(child !== this.sampleIcon) this._disposeIcon(child);
    });
};

CollectablesSpawner.prototype._collect = function (_fromPosition, _toPosition, _amount, _duration) {
    return new Promise((resolve, reject) => {
        const amount = pc.math.clamp(_amount, this.limitAmount.x, this.limitAmount.y);
        if (amount === 0) {
            resolve();
            return;
        }

        const durationWeigthSum = this.durationAppearDelayWeight + this.durationSpawnWeight + this.durationDelayWeight + this.durationMovementWeight + this.durationRandomWeight;

        let durationStart = _duration * this.durationAppearDelayWeight / durationWeigthSum;
        let durationSpawn = _duration * this.durationSpawnWeight / durationWeigthSum;
        let durationDelay = _duration * this.durationDelayWeight / durationWeigthSum;
        let durationMovement = _duration * this.durationMovementWeight / durationWeigthSum;
        let durationRandom = _duration * this.durationRandomWeight / durationWeigthSum;
        durationRandom *= 0.5;

        const promises = [];

        for (let i = 0; i < amount; i++) {
            const icon = this._instantiateIcon();
            icon.element.opacity = 0;
            icon.enabled = true;

            icon.setPosition(_fromPosition);
            const _spawnLocalPosition = icon.getLocalPosition();

            const _initialAngle = this.startAngle + pc.math.random(-this.randomizeStartAngle * 0.5, this.randomizeStartAngle * 0.5);
            icon.rotateLocal(0, 0, _initialAngle);

            const _initialScaleValue = this.startScale + pc.math.random(-this.randomizeStartScale * 0.5, this.randomizeStartScale * 0.5);
            icon.setLocalScale(_initialScaleValue * 0.5, _initialScaleValue * 0.5, _initialScaleValue * 0.5);

            /* calculate spawn position */
            const _randomAngle = pc.math.random(-Math.PI, Math.PI);
            const _randomRadius = pc.math.random(0, this.spawnRadius);
            const _randomSpawnPosition = new pc.Vec3(_spawnLocalPosition.x + Math.sin(_randomAngle) * _randomRadius, _spawnLocalPosition.y + Math.cos(_randomAngle) * _randomRadius, _spawnLocalPosition.z);

            /* calculate durations */
            const _spawnDelay = Math.max(0, durationStart + pc.math.random(0, 2 * durationRandom));
            const _durationSpawn = Math.max(0.001, durationSpawn + pc.math.random(-durationRandom, durationRandom));
            const _durationMovement = Math.max(0.001, durationMovement + pc.math.random(-durationRandom, durationRandom));
            const _flyingDelay = Math.max(0, durationDelay + pc.math.random(-durationRandom, durationRandom));
            const _flyingEndScale = this.endScale + pc.math.random(-this.randomizeEndScale * 0.5, this.randomizeEndScale * 0.5);
            const _flyingEndAngle = this.endAngle + pc.math.random(-this.randomizeEndAngle * 0.5, this.randomizeEndAngle * 0.5);

            /* calculate final position */
            const _targetLocalPosition = Utils.worldToLocalPosition(icon, _toPosition);

            /* opacity with initial delay */
            const promise = this._animateIconSpawning(icon, _spawnDelay, _durationSpawn, _initialScaleValue, _randomSpawnPosition)
                .then(async () => {
                    /* fly to final position */
                    await this._animateIconFlying(icon, _flyingDelay, _durationMovement, _flyingEndScale, _targetLocalPosition, _flyingEndAngle);

                    this._disposeIcon(icon);
                });
            promises.push(promise);
        }

        Promise.all(promises).then(() => resolve());
    });
};


CollectablesSpawner.prototype._instantiateIcon = function() {
    if(this.iconsCache.length > 0) {
        return this.iconsCache.pop();
    } else {
        const clonedIcon = this.sampleIcon.clone();
        clonedIcon.reparent(this.sampleIcon.parent);
        clonedIcon.setLocalScale(this._iconInitialScale);
        clonedIcon.setLocalPosition(this._iconInitialPosition);
        clonedIcon.setLocalEulerAngles(this._iconInitialAngles);
        return clonedIcon;
    }
};


CollectablesSpawner.prototype._disposeIcon = function(icon) {
    if(this.iconsCache.indexOf(icon) === -1) {
        this.iconsCache.push(icon);
        icon.element.opacity = 0;
        this.app.stopAllTweens(icon);
        icon.enabled = false;
        icon.setLocalScale(this._iconInitialScale);
        icon.setLocalPosition(this._iconInitialPosition);
        icon.setLocalEulerAngles(this._iconInitialAngles);
    }
};

CollectablesSpawner.prototype._animateIconSpawning = function (icon, _spawnDelay, duration, _scale, _position) {
    return new Promise((resolve, reject) => {
        /* opacity */
        icon.tween(icon.element)
            .to({ opacity: 1 }, duration * 0.5, pc.Linear)
            .delay(_spawnDelay)
            .start();

        icon.tween(icon.getLocalScale())
            .to({ x: _scale, y: _scale, z: _scale }, duration, pc.BackOut)
            .delay(_spawnDelay)
            .start();

        icon.tween(icon.getLocalPosition())
            .to(_position, duration, pc.QuarticOut)
            .delay(_spawnDelay)
            .onComplete(() => resolve())
            .start();
    })
};


CollectablesSpawner.prototype._animateIconFlying = function (icon, _flyingDelay, duration, _scale, _position, _angle) {
    return new Promise((resolve, reject) => {
        /* opacity */
        icon.tween(icon.element)
            .to({ opacity: 1 }, duration * 0.5, pc.Linear)
            .delay(_flyingDelay)
            .start();

        icon.tween(icon.getLocalScale())
            .to({ x: _scale, y: _scale, z: _scale }, duration, pc.CubicIn)
            .delay(_flyingDelay)
            .start();

        icon.tween(icon.getLocalEulerAngles())
            .to({ x: 0, y: 0, z: _angle }, duration, pc.CubicIn)
            .delay(_flyingDelay)
            .start();

        icon.tween(icon.getLocalPosition())
            .to(_position, duration, pc.SineIn)
            .delay(_flyingDelay)
            .onComplete(() => resolve())
            .start();
    })
};


CollectablesSpawner.prototype.update = function (dt) {

};


// Popup_Settings.js
class PopupSettings extends BaseWindow {

    initialize() {
        super.initialize();

        this.popupContainer = this.entity.findByName('PopupContainer');
        this.buttonClose = this.popupContainer.findByName('CloseButton');
        this.languagePopup = this.entity.findByName('LanguageDropdownMenu');

        this.buttonsContainer = this.entity.findByName('ButtonsGroup');

        this.soundContainer = this.entity.findByName('SoundButtonContainer');
        this.vibrationContainer = this.entity.findByName('VibrationButtonContainer');
        this.privacyPolicyContainer = this.entity.findByName('PrivacyPolicyButtonContainer');

        this.buttonChangeLanguage = this.popupContainer.findByName('LanguageButton');
        this.buttonChangeLanguageText = this.buttonChangeLanguage.findByName('DisplayedLanguageNameText');
        this.buttonSound = this.soundContainer.findByName('SoundButton');
        this.buttonVibration = this.vibrationContainer.findByName('VibrationButton');
        this.buttonPrivacyPolicy = this.privacyPolicyContainer.findByName('PrivacyPolicyButton');

        this.buttonChangeLanguage.on(EventTypes.BUTTON_PRESSED, this.showLanguagePopup, this);
        this.buttonSound.on(EventTypes.BUTTON_PRESSED, this.onSoundPressed, this);
        this.buttonVibration.on(EventTypes.BUTTON_PRESSED, this.onVibrationPressed, this);
        this.buttonPrivacyPolicy.on(EventTypes.BUTTON_PRESSED, this.onPrivacyPolicyPressed, this);

        BasicButton.assignAction(this.buttonClose, this.onClosePressed, this);

        this.app.on(EventTypes.LANGUAGE_SELECTED, this.onLanguageSelected, this);
        this.app.on(EventTypes.SOUND_STATE_CHANGED, this.updateSoundButton, this);
        this.app.on(EventTypes.MUSIC_STATE_CHANGED, this.updateSoundButton, this);

        this._buttonStartX = -190;
        this._buttonStartY = 125;
        this._buttonGapX = 380;
        this._buttonGapY = -225;
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        this.languagePopup.enabled = false;

        super._onShow();

        this.updateButtonsVisibility();
        this.updateSoundButton();
        this.updateVibrationButton();
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    showLanguagePopup() {
        this.languagePopup.enabled = true;
        this.languagePopup.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }

    onLanguageSelected(langCode, langDisplayName) {
        this.buttonChangeLanguageText.element.text = langDisplayName;
    }

    onSoundPressed() {
        if (SoundController.sfxEnabled) {
            this.app.fire(EventTypes.DISABLE_SFX);
        } else {
            this.app.fire(EventTypes.ENABLE_SFX);
        }
        this.updateSoundButton();
        this.reportVolumeChangedToAPI();
    }

    onVibrationPressed() {
        const currentState = VibrationManager.getInstance().isVibrationEnabled();
        VibrationManager.getInstance().setVibrationEnabled(!currentState);
        this.updateVibrationButton();
    }

    onPrivacyPolicyPressed() {
        window.open('https://famobi.com/privacy');
    }

    onClosePressed() {
        this.entity.hide();
    }


    /* private */
    updateButtonsVisibility() {
        this.vibrationContainer.enabled = VibrationManager.getInstance().isVibrationSupported() && GameConfig.getAttribute('UI', 'enableVibration');
        this.privacyPolicyContainer.enabled = GameConfig.getAttribute('UI', 'enablePrivacyPolicy');
        this.soundContainer.enabled = APIMediator.areAudioControlsAllowed();

        const columns = 2;
        this.buttonsContainer.children.filter(x => x.enabled).forEach((child, index) => {
            let childX = this._buttonStartX + (index % columns) * this._buttonGapX;
            let childY = this._buttonStartY + Math.floor(index / columns) * this._buttonGapY;
            child.setLocalPosition(childX, childY, 0);
        });
    }

    updateSoundButton() {
        this.buttonSound.setFace(SoundController.sfxEnabled);
    }

    updateVibrationButton() {
        this.buttonVibration.setFace(VibrationManager.getInstance().isVibrationEnabled());
    }

    update(dt) {

    }


    reportVolumeChangedToAPI() {
        if (window.famobi_analytics) {
            famobi_analytics.trackEvent(window.famobi_analytics.EVENT_VOLUMECHANGE, {
                bgmVolume: +SoundController.musicVolume.toFixed(2),
                sfxVolume: +SoundController.sfxVolume.toFixed(2)
            });
        }
    }

}

pc.registerScript(PopupSettings, 'popupSettings');

// toggleButton.js
var ToggleButton = pc.createScript('toggleButton');

ToggleButton.attributes.add('iconElement', {
    type: 'entity'
});

ToggleButton.attributes.add('iconElementAlternate', {
    type: 'entity'
});


ToggleButton.prototype.initialize = function() {
    if(!this.iconElement || !this.iconElementAlternate) return console.error('Set both faces on toggle button ' + this.entity.path);

    this.entity.setFace = this._setFace.bind(this);
    this.entity.getToggleState = this._getToggleState.bind(this);
    this._setFace(true);
};

ToggleButton.prototype._setFace = function(toggle) {
    this._toggleState = toggle;
    if(toggle) {
        this.iconElement.enabled = true;
        this.iconElementAlternate.enabled = false;
    } else {
        this.iconElement.enabled = false;
        this.iconElementAlternate.enabled = true;
    }
};

ToggleButton.prototype._getToggleState = function() {
    return this._toggleState = toggle;
};

ToggleButton.prototype.update = function(dt) {

};



// languageDropdownMenu.js
var LanguageDropdownMenu = pc.createScript('languageDropdownMenu');

LanguageDropdownMenu.prototype.initialize = function () {
    this.overlay = this.entity.findByName('ClickableOverlay');
    this.languagesGroup = this.entity.findByName('LanguagesGroup');
    this.languageButtons = this.languagesGroup.children;

    this.languageButtons.forEach(button => {
        BasicButton.assignAction(button, () => this.onLanguageButtonClicked(button));
    });

    BasicButton.assignAction(this.overlay, this.close, this);

    this.app.on('app:changeLocale', this._onAppLocaleChanged, this)
};

LanguageDropdownMenu.prototype.postInitialize = function () {
    let scrollAreaHeight = 0;
    this.languageButtons.forEach(button => {
        button.enabled = this.app.i18n._translations.hasOwnProperty(button.getLanguageCode());
        scrollAreaHeight += button.enabled ? 72 : 0;
    });

    this.languagesGroup.element.height = scrollAreaHeight;
};

LanguageDropdownMenu.prototype.onLanguageButtonClicked = async function (button) {
    this.onLanguageSelected(button);
    this.close();

    const languageCode = button.getLanguageCode();
    LocalizationManager.getInstance().changeLocale(languageCode);
};

LanguageDropdownMenu.prototype.onLanguageSelected = function (button) {
    this.languageButtons.forEach(_btn => {
        _btn.setSelected(_btn === button);
    });
    this.app.fire(EventTypes.LANGUAGE_SELECTED, button.getLanguageCode(), button.getDisplayName());
};


LanguageDropdownMenu.prototype._onAppLocaleChanged = function (localeCode) {
    const closestLocale = this.app.i18n.findAvailableLocale(localeCode);
    const languageButton = this.languageButtons.find(button => button.getLanguageCode() === closestLocale);
    if (languageButton) {
        this.onLanguageSelected(languageButton);
    }
};


LanguageDropdownMenu.prototype.close = function () {
    this.entity.enabled = false;
};

LanguageDropdownMenu.prototype.update = function (dt) {

};

// languageSelectorItem.js
var LanguageSelectorItem = pc.createScript('languageSelectorItem');

LanguageSelectorItem.attributes.add('languageCode', {
    type: 'string',
    default: ""
});

LanguageSelectorItem.attributes.add('displayName', {
    type: 'string',
    default: ""
});


LanguageSelectorItem.prototype.initialize = function() {
    if(!this.languageCode) return console.error('Language code is not set for item ' + this.entity.path);
    this.checkbox = this.entity.findByName('Selected');

    this.entity.element.text = this.displayName;

    this.entity.getLanguageCode = () => this.languageCode;
    this.entity.getDisplayName = () => this.displayName;
    this.entity.isSelected = () => this.checkbox.enabled;
    this.entity.setSelected = (value) => this.checkbox.enabled = value;
};


LanguageSelectorItem.prototype.update = function(dt) {

};

// localStorageController.js
/* jshint esversion: 6 */
var LocalStorageController = pc.createScript('localStorageController');

LocalStorageController.prototype.initialize = function () {
    LocalStorageController.app = this.app;
    LocalStorageController.currentLocalStorage = APIMediator.getStorageObject();

    this.app.on(EventTypes.SAVE_APP, () => LocalStorageController.saveData(), this);
    this.app.on(EventTypes.POSTINITIALIZE, this.unlockLocalStorageForWriting, this);
};


LocalStorageController.prototype.postInitialize = function () {
    LocalStorageController.loadData();
    this.app.fire(EventTypes.SAVEDATA_LOADED);
};

LocalStorageController.prototype.unlockLocalStorageForWriting = function (dt) {
    LocalStorageController._writingAllowed = true;
    if (LocalStorageController._hasPendingWriteRequests) {
        LocalStorageController.saveData();
    }
};

LocalStorageController.getLocalStorage = function () {
    return LocalStorageController.currentLocalStorage;
};

LocalStorageController.prepareDefaultSaveData = function () {
    const defaultSaveData = {};
    defaultSaveData[Constants.Storage.CURRENT_LEVEL] = 1; //+
    defaultSaveData[Constants.Storage.USERNAME] = ""; //+
    defaultSaveData[Constants.Storage.MONEY] = 0; //+
    defaultSaveData[Constants.Storage.KEYS] = 0; //+
    defaultSaveData[Constants.Storage.VIBRATION] = true; //+
    defaultSaveData[Constants.Storage.MUSIC_VOLUME] = 0.5; //+
    defaultSaveData[Constants.Storage.SFX_VOLUME] = 0.5; //+
    defaultSaveData[Constants.Storage.SKIN_STATUSES] = {}; //+ 
    defaultSaveData[Constants.Storage.PLAYER_SKIN] = undefined; //+
    defaultSaveData[Constants.Storage.SCENE_STATUSES] = {}; //+
    defaultSaveData[Constants.Storage.ACTIVE_SCENE] = undefined; //+
    defaultSaveData[Constants.Storage.NEXT_RANDOM_SKIN_PRICE] = 0; //+
    defaultSaveData[Constants.Storage.FREE_HINT_CLAIMED] = false; //+
    defaultSaveData[Constants.Storage.LAST_DAILY_CHALLENGE_TIMESTAMP] = 0; //+
    defaultSaveData[Constants.Storage.USED_QUESTIONS_IDS] = {}; //+
    defaultSaveData[Constants.Storage.LAST_10_ROUNDS_RESULTS] = []; //+
    defaultSaveData[Constants.Storage.RECENT_MATCH_RESULTS] = []; //+
    defaultSaveData[Constants.Storage.TOTAL_MATCHES] = 0; //+
    defaultSaveData[Constants.Storage.COMPLETED_TOURNAMENTS] = 0; //+
    defaultSaveData[Constants.Storage.TOURNAMENT_DATA] = undefined; //+
    


    return defaultSaveData;
};


LocalStorageController.getActualSaveData = function () {
    const currentSaveData = {};
    currentSaveData[Constants.Storage.CURRENT_LEVEL] = DataManager.getInstance().level;
    currentSaveData[Constants.Storage.USERNAME] = DataManager.getInstance().username;
    currentSaveData[Constants.Storage.MONEY] = DataManager.getInstance().money;
    currentSaveData[Constants.Storage.KEYS] = DataManager.getInstance().keys;
    currentSaveData[Constants.Storage.VIBRATION] = VibrationManager.getInstance().isVibrationEnabled();
    currentSaveData[Constants.Storage.MUSIC_VOLUME] = SoundController.musicStateLoaded ? SoundController.musicVolume : 1;
    currentSaveData[Constants.Storage.SFX_VOLUME] = SoundController.sfxStateLoaded ? SoundController.sfxVolume : 1;
    currentSaveData[Constants.Storage.SKIN_STATUSES] = SkinManager.getInstance().getSkinsSaveData();
    currentSaveData[Constants.Storage.PLAYER_SKIN] = SkinManager.getInstance().getActivePlayerSkinName();
    currentSaveData[Constants.Storage.SCENE_STATUSES] = SceneManager.getInstance().getScenesSaveData();
    currentSaveData[Constants.Storage.ACTIVE_SCENE] = SceneManager.getInstance().getActiveSceneName();
    currentSaveData[Constants.Storage.NEXT_RANDOM_SKIN_PRICE] = DataManager.getInstance().nextRandomSkinPrice;
    currentSaveData[Constants.Storage.FREE_HINT_CLAIMED] = DataManager.getInstance().freeHintClaimed;
    currentSaveData[Constants.Storage.LAST_DAILY_CHALLENGE_TIMESTAMP] = DataManager.getInstance().lastDailyChallengeTimestamp;
    currentSaveData[Constants.Storage.USED_QUESTIONS_IDS] = QuestionsManager.getInstance().getUsedQuestionIDs();
    currentSaveData[Constants.Storage.LAST_10_ROUNDS_RESULTS] = DataManager.getInstance().last10RoundsResults;
    currentSaveData[Constants.Storage.RECENT_MATCH_RESULTS] = DataManager.getInstance().recentMatchResults;
    currentSaveData[Constants.Storage.TOTAL_MATCHES] = DataManager.getInstance().totalMatches;
    currentSaveData[Constants.Storage.COMPLETED_TOURNAMENTS] = TournamentManager.getInstance().completedTournaments;
    currentSaveData[Constants.Storage.TOURNAMENT_DATA] = TournamentManager.getInstance().getTournamentSaveData();


    return currentSaveData;
};

LocalStorageController.getSlotKey = function () {
    return Constants.GAME_NAME + '_' + Constants.GAME_VERSION;
};

LocalStorageController.save = function(immediately = true) {
    LocalStorageController.saveData(null, immediately);
}

LocalStorageController.saveData = function (saveDataObject = null, immediately = true) {
    if (!LocalStorageController._writingAllowed) {
        console.warn("[localStorage] saving is not allowed until the app has fully initialized");
        return;
    }
    if (immediately) {
        LocalStorageController.lastSaveData = saveDataObject || LocalStorageController.getActualSaveData();
        LocalStorageController.currentLocalStorage.setItem(LocalStorageController.getSlotKey(), JSON.stringify(LocalStorageController.lastSaveData));
    } else {
        setTimeout(() => {
            LocalStorageController.lastSaveData = saveDataObject || LocalStorageController.getActualSaveData();
            LocalStorageController.currentLocalStorage.setItem(LocalStorageController.getSlotKey(), JSON.stringify(LocalStorageController.lastSaveData));
        }, 50);
    }

    // console.warn('Saving data to localstorage...', LocalStorageController.lastSaveData);
};

LocalStorageController.loadData = function () {
    var data = LocalStorageController.currentLocalStorage.getItem(LocalStorageController.getSlotKey());
    var dataLoaded = false;

    if (data) {
        try {
            data = JSON.parse(data);
            dataLoaded = true;
        } catch (e) {
            data = LocalStorageController.prepareDefaultSaveData();
            LocalStorageController.saveData(data);
        }
    } else {
        data = LocalStorageController.prepareDefaultSaveData();
        LocalStorageController.saveData(data);
    }

    LocalStorageController.lastSaveData = data;
    // console.info('Saved data loaded: ', LocalStorageController.lastSaveData);

    VibrationManager.getInstance().setVibrationEnabled(LocalStorageController.getSavedValue(Constants.Storage.VIBRATION));
};

LocalStorageController.getSavedValue = function (key) {
    if (LocalStorageController.lastSaveData) {
        return LocalStorageController.lastSaveData[key];
    } else {
        console.warn(`getSavedValue: No saved value with key '${key}' was loaded`);
    }
};



// Screen_Shop.js
class ScreenShop extends BaseWindow {

    initialize() {
        super.initialize();

        this.buttonBack = this.entity.findByName('BackButton');

        this.tabButtonSkins = this.entity.findByName('TabButtonSkins');
        this.tabButtonScenes = this.entity.findByName('TabButtonScenes');

        this.skinsNotification = this.entity.findByName('SkinsNotificationCircle');
        this.scenesNotification = this.entity.findByName('ScenesNotificationCircle');

        this.currencyCounter = this.entity.findByName('CurrencyCounterSmall');

        this.skinsTab = this.entity.findByName('SkinsTab');
        this.scenesTab = this.entity.findByName('ScenesTab');


        this._lastTab = this.skinsTab;

        this.tabButtonSkins.on(EventTypes.BUTTON_PRESSED, this._switchToSkinsTab, this);
        this.tabButtonScenes.on(EventTypes.BUTTON_PRESSED, this._switchToScenesTab, this);
        this.buttonBack.on(EventTypes.BUTTON_PRESSED, this.onBackPressed, this);

        this.app.on(EventTypes.ShopTab.UPDATE_SCENES, this._updateNotifications, this);
        this.app.on(EventTypes.ShopTab.UPDATE_SKINS, this._updateNotifications, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {

        this.currencyCounter.show();

        CameraController.getInstance().changeCamera(Constants.Cameras.SHOP);

        this.app.fire(EventTypes.CHANGE_LOCATION, Constants.Locations.SHOP);
        // ShopLocation.getInstance().show();

        this.skinsTab.show();
        this.scenesTab.show();

        if (this._lastTab === this.skinsTab) {
            this._switchToSkinsTab();
        } else {
            this._switchToScenesTab();
        }

        /* update notifications */
        this._updateNotifications();

        super._onShow();
    }


    _onHide() {
        super._onHide();
    }

    _switchToSkinsTab() {
        this._lastTab = this.skinsTab;
        this.skinsTab.enabled = true;
        this.scenesTab.enabled = false;
        this.tabButtonSkins.element.opacity = 1;
        this.tabButtonScenes.element.opacity = 0.5;
    }

    _switchToScenesTab() {
        this._lastTab = this.scenesTab;
        this.skinsTab.enabled = false;
        this.scenesTab.enabled = true;
        this.tabButtonSkins.element.opacity = 0.5;
        this.tabButtonScenes.element.opacity = 1;
    }

    _updateNotifications() {
        this.skinsNotification.enabled = SkinManager.getInstance().hasAvailableForPurchaseSkins();
        this.scenesNotification.enabled = SceneManager.getInstance().hasCompletedButNotUnlockedScenes();
    }

    onBackPressed() {
        UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
            inDuration: 0.075,
            outDuration: 0.25
        });
    }

    update(dt) {

    }

}

pc.registerScript(ScreenShop, 'screenShop');

// ShopTabInput.js
var ShopTabInput = pc.createScript('shopTabInput');

ShopTabInput.prototype.initialize = function () {
    this.inputPanel = this.entity.findByName('InputPanel');

    this.inputX = this.inputY = 0;
    this.inputActive = false;

    if (this.app.touch) {
        this.inputPanel.element.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.inputPanel.element.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.inputPanel.element.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.inputPanel.element.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    }

    if (this.app.mouse) {
        this.inputPanel.element.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        document.addEventListener('mouseleave', () => this.onMouseOut());
    }

    this.app.on(EventTypes.ShopTab.SKIN_BUTTON_DRAG, this._simulateDrag, this);
    this.app.on(EventTypes.ShopTab.SKIN_BUTTON_INPUT_DOWN, this.onMouseDown, this);
    this.app.on(EventTypes.ShopTab.SKIN_BUTTON_INPUT_UP, this.onMouseUp, this);
};

ShopTabInput.prototype._simulateDrag = function (relativeDx) {
    this.entity.fire(EventTypes.SHOP_PAGINATION_DRAG, relativeDx);
};

ShopTabInput.prototype.onTouchStart = function (event) {
    this.inputActive = true;
    this.inputX = event.x;
    this.inputY = event.y;
};

ShopTabInput.prototype.onTouchMove = function (event) {
    if (this.inputActive) {
        const dx = event.x - this.inputX;
        this.inputX = event.x;
        this.inputY = event.y;
        this.entity.fire(EventTypes.SHOP_PAGINATION_DRAG, dx / window.innerWidth);
    }
};

ShopTabInput.prototype.onTouchEnd = function (event) {
    if (this.inputActive) {
        this.inputActive = false;
        this.entity.fire(EventTypes.SHOP_PAGINATION_RELEASE);
    }
};

ShopTabInput.prototype.onTouchCancel = function (event) {
    this.onTouchEnd(event);
};

ShopTabInput.prototype.onMouseDown = function (event) {
    this.inputActive = true;
    this.inputX = event.x;
    this.inputY = event.y;
};

ShopTabInput.prototype.onMouseMove = function (event) {
    if (this.inputActive) {
        const dx = event.x - this.inputX;
        this.inputX = event.x;
        this.inputY = event.y;
        this.entity.fire(EventTypes.SHOP_PAGINATION_DRAG, dx / window.innerWidth);
    }
};

ShopTabInput.prototype.onMouseUp = function (event) {
    if (this.inputActive) {
        this.inputActive = false;
        this.entity.fire(EventTypes.SHOP_PAGINATION_RELEASE);
    }
};

ShopTabInput.prototype.onMouseOut = function (event) {
    if (this.inputActive) {
        this.inputActive = false;
        this.entity.fire(EventTypes.SHOP_PAGINATION_RELEASE);
    }
};


ShopTabInput.prototype.update = function (dt) {

};


// SkinIcon.js
var SkinIcon = pc.createScript('skinIcon');


SkinIcon.prototype.initialize = function () {
    this.inputX = this.inputY = 0;
    this.touchClientX = this.touchClientY = 0;
    this.inputActive = false;
    this._selected = false;

    this.name = "";
    this.selectedOutline = this.entity.findByName('SelectedOutline');
    this.skinPad = this.entity.findByName('SkinPad');
    this.questionMark = this.entity.findByName('QuestionMark');
    this.characterIcon = this.entity.findByName('CharacterIcon');
    this.loadingIcon = this.entity.findByName('LoadingIcon');
    this.selectedCheckmark = this.entity.findByName('SelectedCheckmark');
    this.rewardedIcon = this.entity.findByName('RewardedIcon');
    this.vipIcon = this.entity.findByName('VipIcon');

    this.entity.initSkinIcon = this._initSkinIcon.bind(this);
    this.entity.getSkinName = () => this.name;
    this.entity.isSelected = () => this._selected;
    this.entity.setSelected = this._setSelected.bind(this);
    this.entity.updateView = this._updateView.bind(this);

    this.addEventListeners();
};

SkinIcon.prototype._initSkinIcon = function (skinData) {
    const { name, defaultState, colord, skinType, defaultSubtype, defaultPriority, icon, template, shopCharacter } = skinData;
    this.name = name;
    this._cachedSkinData = skinData;
    this.characterIcon.element.spriteAsset = icon.id;
    this._iconAsset = icon;
    this._iconTextureAsset = this.app.assets.get(icon.data.textureAtlasAsset);
    this.characterIcon.element.enabled = this._iconTextureAsset.loaded;
};

SkinIcon.prototype._updateView = function (_hasRewardedVideo) {
    const activeSkinName = SkinManager.getInstance().getActivePlayerSkinName();
    const skinStatus = SkinManager.getInstance().getSkinStatus(this.name);
    this._setSelected(this.name === activeSkinName);

    if (this.name === activeSkinName) {
        this.questionMark.enabled = false;
        this.characterIcon.enabled = true;
        this.rewardedIcon.enabled = false;
        this.vipIcon.enabled = false;
        this.skinPad.element.color = GameConfig.getAttribute('shop', 'skinColorDefault');
    } else if (skinStatus === Constants.SkinStatus.OWNED || skinStatus === Constants.SkinStatus.ACTIVE) {
        this.questionMark.enabled = false;
        this.characterIcon.enabled = true;
        this.rewardedIcon.enabled = false;
        this.vipIcon.enabled = false;
        this.skinPad.element.color = GameConfig.getAttribute('shop', 'skinColorDefault');
    } else if (skinStatus === Constants.SkinStatus.LOCKED) {
        this.questionMark.enabled = true;
        this.characterIcon.enabled = false;
        this.loadingIcon.enabled = false;
        this.rewardedIcon.enabled = false;
        this.vipIcon.enabled = this._cachedSkinData.skinType === Constants.SkinType.VIP;
        if (this._cachedSkinData.skinType === Constants.SkinType.REWARDED_SHOP) {
            this.skinPad.element.color = GameConfig.getAttribute('shop', 'skinColorRewarded');
            if (_hasRewardedVideo) {
                this.rewardedIcon.enabled = true;
                this.questionMark.enabled = false;
                this.characterIcon.enabled = true;
            }
        } else if (this._cachedSkinData.skinType === Constants.SkinType.VIP) {
            this.questionMark.enabled = false;
            this.characterIcon.enabled = true;
            this.skinPad.element.color = GameConfig.getAttribute('shop', 'skinColorVip');
        }
    }
};

SkinIcon.prototype.update = function (dt) {
    if (this._iconTextureAsset && this.characterIcon.enabled) {
        this.characterIcon.element.enabled = this._iconTextureAsset.loaded;
        this.loadingIcon.enabled = this._iconTextureAsset.loading;
    } else {
        this.characterIcon.element.enabled = true;
        this.loadingIcon.enabled = false;
    }
};

SkinIcon.prototype.onClicked = function () {
    this.app.fire(EventTypes.SHOP_SELECT_SKIN, this.name);
};

SkinIcon.prototype._setSelected = function (value) {
    this._selected = value;
    this.selectedOutline.enabled = this._selected;
    this.selectedCheckmark.enabled = this._selected;
};

SkinIcon.prototype.addEventListeners = function () {
    if (this.app.touch) {
        this.entity.element.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.entity.element.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.entity.element.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.entity.element.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    }

    if (this.app.mouse) {
        this.entity.element.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.entity.element.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    }
};



/* input handling */

SkinIcon.prototype.onTouchStart = function (event) {
    this.touchClientX = event.changedTouches[0].clientX;
    this.touchClientY = event.changedTouches[0].clientY;
    this.onMouseDown({ x: this.touchClientX, y: this.touchClientY, ...event });
};

SkinIcon.prototype.onTouchMove = function (event) {
    if (this.inputActive) {
        const dx = event.x - this.inputX;
        this.inputX = event.x;
        this.inputY = event.y;
        this.app.fire(EventTypes.ShopTab.SKIN_BUTTON_DRAG, dx / window.innerWidth);
    }
};

SkinIcon.prototype.onTouchEnd = function (event) {
    this.app.fire(EventTypes.ShopTab.SKIN_BUTTON_INPUT_UP, event);
    this.inputActive = false;
    if (Utils.distanceBetween(this.touchClientX, this.touchClientY, event.changedTouches[0].clientX, event.changedTouches[0].clientY) < 1) {
        this.onClicked();
    }
};

SkinIcon.prototype.onTouchCancel = function (event) {
    this.onTouchEnd(event);
};



SkinIcon.prototype.onMouseDown = function (event) {
    this.inputActive = true;
    this.inputX = event.x;
    this.inputY = event.y;
    this.app.fire(EventTypes.ShopTab.SKIN_BUTTON_INPUT_DOWN, { x: event.x, y: event.y });
};


SkinIcon.prototype.onMouseUp = function (event) {
    if (this.inputActive) {
        this.app.fire(EventTypes.ShopTab.SKIN_BUTTON_INPUT_UP, event);
        this.inputActive = false;
        if (Utils.distanceBetween(event.x, event.y, this.inputX, this.inputY) <= 1) {
            this.onClicked();
        }
    }
};


// ShopTab.js
var ShopTab = pc.createScript('shopTab');

ShopTab.attributes.add('minScrollDistance', {
    type: 'number',
    default: 100
});

ShopTab.attributes.add('scrollTweenDuration', {
    type: 'number',
    default: 0.25
});

ShopTab.attributes.add('paginationColorDefault', {
    type: 'rgb',
    default: [0.368, 0.357, 0.431]
});

ShopTab.attributes.add('paginationColorActive', {
    type: 'rgb',
    default: [0.898, 0.239, 0.070]
});

ShopTab.prototype.initialize = function () {
    this.lastFrameDt = 0;
    this.inputActive = false;
    this.screenWidth = 900;
    this.pageGapX = 900;
    this.pageWidth = 700;
    this.currentPageIndex = 0;

    this.positionHelper = this.entity.findByName('PaginationPositionHelper');
    this.pagesContainer = this.entity.findByName('PagesContainer');
    this._pagesContainerLocalPosition = this.pagesContainer.getLocalPosition();
    this.pages = this.pagesContainer.children;

    this.paginationDotsContainer = this.entity.findByName('PaginationDots');
    this.paginationDotsContainer.children.forEach(child => child.enabled = false);

    this.inputPanel = this.entity.findByName('InputPanel');
    this.entity.on(EventTypes.SHOP_PAGINATION_DRAG, this._onPaginationDragged, this);
    this.entity.on(EventTypes.SHOP_PAGINATION_RELEASE, this._onPaginationRelease, this);
    this.app.on(EventTypes.Screen.RESIZED, this._onScreenResized, this);

    this.entity.getCurrentPage = this._getCurrentPage.bind(this);
    this.entity.scrollToPage = this._scrollToPage.bind(this);

    this.entity.on(EventTypes.ShopTab.CONTENT_BUILT, this._onContentReady, this);

};

ShopTab.prototype._onContentReady = function () {
    this._realignPages();
    this._createPagination();
    this._onScreenResized();
    this._scrollToPage(0, true);
}

ShopTab.prototype._getCurrentPage = function () {
    return this.pages[this.currentPageIndex];
};

ShopTab.prototype._createPagination = function () {
    while (this.paginationDotsContainer.children.length > 1) this.paginationDotsContainer.children[this.paginationDotsContainer.children.length - 1].destroy();
    const originalDot = this.paginationDotsContainer.children[0];
    originalDot.enabled = true;
    for (let i = 1; i < this.pages.length; i++) {
        const dot = originalDot.clone();
        dot.reparent(originalDot.parent);
    };
    this.paginationDotsContainer.children.forEach((dot, index) => {
        dot.element.useInput = true;
        BasicButton.assignAction(dot, () => {
            this.entity.scrollToPage(index);
        });
    })

};

ShopTab.prototype._onPaginationDragged = function (dx) {
    if (this._reboundTween && this._reboundTween.playing) this._reboundTween.stop();
    this.inputActive = true;
    const delta = dx * this.screenWidth;
    this._pagesContainerLocalPosition.x = pc.math.clamp(this._pagesContainerLocalPosition.x + delta, -(this.pages.length - 1) * this.pageGapX - this.pageWidth, this.pageWidth);
    this.pagesContainer.setLocalPosition(this._pagesContainerLocalPosition);
};

ShopTab.prototype._onPaginationRelease = function () {
    this.inputActive = false;
    /* rebound */
    this._reboundToClosestPage();
};

ShopTab.prototype._reboundToClosestPage = function () {
    const closestPageIndex = -this._pagesContainerLocalPosition.x / this.pageGapX;

    let delta = closestPageIndex - this.currentPageIndex;
    if (Math.abs(delta) > this.minScrollDistance / this.pageGapX) {
        delta = Math.ceil(Math.abs(delta)) * Math.sign(delta);
    } else {
        delta = 0;
    }

    this._scrollToPage(this.currentPageIndex + Math.round(delta), false);
};

ShopTab.prototype._scrollToPage = function (pageIndex, instantly = false) {
    return new Promise((resolve, reject) => {
        this.currentPageIndex = pc.math.clamp(pageIndex, 0, Math.max(this.pages.length - 1, 0));
        const targetPos = { x: -this.currentPageIndex * this.pageGapX, y: this._pagesContainerLocalPosition.y, z: this._pagesContainerLocalPosition.z };
        if (this._reboundTween && this._reboundTween.playing) this._reboundTween.stop();
        if (instantly) {
            this._pagesContainerLocalPosition.copy(targetPos);
            resolve();
        } else {
            this._reboundTween = this.pagesContainer.tween(this._pagesContainerLocalPosition)
                .to(targetPos, this.scrollTweenDuration, pc.SineOut)
                .onComplete(() => resolve())
                .start();
        }
    });
}


ShopTab.prototype._onScreenResized = function (width, height) {
    this.positionHelper.setPosition(1, 0, 0);
    this.pageGapX = this.positionHelper.getLocalPosition().x + this.pageWidth;
    this.screenWidth = 2 * this.positionHelper.getLocalPosition().x;
    this._realignPages();
    this._scrollToPage(this.currentPageIndex, !this.entity.enabled);
};

ShopTab.prototype._realignPages = function () {
    this.pages.forEach((page, index) => {
        const position = page.getLocalPosition();
        position.x = index * this.pageGapX;
        page.setLocalPosition(position);
    });
}

ShopTab.prototype.update = function (dt) {
    /* pages visibility */
    this.pages.forEach(page => {
        const pageWorldPosition = page.getPosition();
        page.enabled = Math.abs(pageWorldPosition.x) < 1 + this.pageWidth / 2 / (this.pageGapX - this.pageWidth);
    });

    /* pagination */
    this.paginationDotsContainer.children.forEach((dot, index) => {
        dot.element.color = index === this.currentPageIndex ? this.paginationColorActive : this.paginationColorDefault;
    });
};


// SkinManager.js
var SkinManager = pc.createScript('skinManager');

SkinManager.attributes.add('skinsLibrary', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'defaultState',
        type: 'number',
        enum: [
            { 'None': 0 }, //Constants.SkinState.NONE 
            { 'Owned': 1 }, //Constants.SkinState.OWNED
            { 'Equipped': 2 } // Constants.SkinState.EQUIPPED
        ],
        default: 0
    }, {
        name: 'colored',
        type: 'boolean',
        default: false
    }, {
        name: 'skinType',
        type: 'number',
        enum: [
            { 'Default': 0 },  //Constants.SkinType.DEFAULT
            { 'Rewarded Shop': 1 }, //Constants.SkinType.REWARDED_SHOP
            { 'VIP': 2 } //  Constants.SkinType.VIP
        ],
        default: 0
    }, {
        name: 'defaultSubtype',
        type: 'number',
        enum: [
            { 'Currency': 0 }, // Constants.SkinDefaultSubtype.CURRENCY
            { 'Rewarded': 1 }, //Constants.SkinDefaultSubtype.REWARDED
            { 'Rewarded Premium': 2 }//Constants.SkinDefaultSubtype.REWARDED_PREMIUM 
        ],
        default: 0
    }, {
        name: 'defaultPriority',
        type: 'number',
        default: 0
    }, {
        name: 'icon',
        type: 'asset',
        assetType: 'sprite'
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }, {
        name: 'shopCharacter',
        type: 'asset',
        assetType: 'template'
    }],

    array: true
});


SkinManager.getInstance = function () {
    if (!SkinManager._instance) console.error('SkinManager is not initialized yet');
    return SkinManager._instance;
};


SkinManager.prototype.initialize = function () {
    SkinManager._app = this.app;
    if (!SkinManager._instance) {
        SkinManager._instance = this;
    }

    this._initializationCompleted = false;

    this._activePlayerSkinName = "";
    this._activePlayerSkin = null;

    this.skinStates = new Map();
    this._prepareDefaultSkinStatesMap();

    this.on('attr:skinsLibrary', this._rebuildLibrary, this);
    this._rebuildLibrary();

    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSkinStates, this);
};

SkinManager.prototype.postInitialize = function () {
    this._initializationCompleted = true;
    if (this._pendingPlayerSkinName) {
        this.setPlayerSkin(this._pendingPlayerSkinName);
        this._pendingPlayerSkinName = null;
    }
}


SkinManager.prototype._rebuildLibrary = function () {
    this.defaultSkin = this.skinsLibrary[0];
    this.specialSkins = this.skinsLibrary.slice(1).filter(record => !!record.name && record.template);
    this.skinsWithTypeDefault = this.getAllSkins().filter(skin => skin.skinType === Constants.SkinType.DEFAULT);
    this.skinsWithTypeRewarded = this.getAllSkins().filter(skin => skin.skinType === Constants.SkinType.REWARDED_SHOP);
    this.skinsWithTypeVip = this.getAllSkins().filter(skin => skin.skinType === Constants.SkinType.VIP);
    this._updateSkinsRegistry();
};

SkinManager.prototype._prepareDefaultSkinStatesMap = function () {
    this.skinStates.clear();
    this.skinsLibrary.forEach(record => {
        const defaultState = record.defaultState;
        switch (defaultState) {
            case Constants.SkinState.NONE:
                this.skinStates.set(record.name, Constants.SkinStatus.LOCKED);
                break;
            case Constants.SkinState.OWNED:
                this.skinStates.set(record.name, Constants.SkinStatus.OWNED);
                break;
            case Constants.SkinState.EQUIPPED:
                this.skinStates.set(record.name, Constants.SkinStatus.ACTIVE);
                this.setPlayerSkin(record.name);
                break;
        }
    });
};



SkinManager.prototype._loadSkinStates = function () {
    const dataObject = LocalStorageController.getSavedValue(Constants.Storage.SKIN_STATUSES);
    if (dataObject) {
        for (let key in dataObject) {
            const state = dataObject[key];
            this.skinStates.set(key, state);
        }
    }

    /* update registry */
    this._updateSkinsRegistry();

    /* load player skin */
    const savedPlayerSkin = LocalStorageController.getSavedValue(Constants.Storage.PLAYER_SKIN);
    if (savedPlayerSkin) {
        this.setPlayerSkin(savedPlayerSkin);
    }
};

SkinManager.prototype.getSkinsSaveData = function () {
    const saveData = {};
    this.skinStates.forEach((value, key) => {
        saveData[key] = value;
    })
    return saveData;
};


SkinManager.prototype.getSkinStatus = function (name) {
    return this.skinStates.get(name);
};

SkinManager.prototype.setPlayerSkin = function (name) {
    if (!this._initializationCompleted) {
        this._pendingPlayerSkinName = name;
        return;
    }
    this._activePlayerSkinName = name;
    this._activePlayerSkin = this.getSkinByName(name);
    this.app.fire(EventTypes.EQUIP_PLAYER_SKIN, name, this._activePlayerSkin);
}

SkinManager.prototype.getActivePlayerSkin = function () {
    return this._activePlayerSkin || this.getDefaultSkin();
};

SkinManager.prototype.getActivePlayerSkinName = function () {
    return this.getActivePlayerSkin().name;
};


SkinManager.prototype.getDefaultSkin = function () {
    return this.defaultSkin;
};

SkinManager.prototype.getSpecialSkins = function () {
    return this.specialSkins;
};

SkinManager.prototype.getAllSkins = function () {
    return [this.defaultSkin, ...this.specialSkins];
};

SkinManager.prototype.getRandomSkin = function (includeDefault = true) {
    if (includeDefault) {
        return Utils.getRandomItem(this.getAllSkins());
    } else {
        return Utils.getRandomItem(this.specialSkins);
    }
}

SkinManager.prototype.getRandomDefaultSkin = function () {
    return Utils.getRandomItem(this.skinsWithTypeDefault);
}

SkinManager.prototype.getRandomDailyChallengeOpponentSkin = function () {
    if(Math.random() < 0.35) {
        return Utils.getRandomItem(this.skinsWithTypeDefault);
    } else {
        return this.getDefaultSkin();
    }
}

SkinManager.prototype.getRandomTournamentSkin = function () {
    if(Math.random() < 0.6) {
        return Utils.getRandomItem(this.skinsWithTypeDefault);
    } else {
        return this.getDefaultSkin();
    }
}


SkinManager.prototype.getSkinByName = function (name) {
    const found = this.skinsLibrary.find(record => record.name === name);
    if (!found) {
        console.warn('No skin with name ' + name);
        return this.defaultSkin;
    }
    return found;
};

SkinManager.prototype.areAllDefaultSkinsUnlocked = function () {
    return this.lockedSkinsWithTypeDefault.length === 0;
};

SkinManager.prototype.getRandomLockedDefaultSkin = function () {
    const randomLockedDefaultSkin = Utils.getRandomItem(this.lockedSkinsWithTypeDefault);
    if (randomLockedDefaultSkin) return randomLockedDefaultSkin.name;
    return null;
}

SkinManager.prototype.unlockSkin = function (name) {
    if (this.skinStates.get(name) === Constants.SkinStatus.LOCKED) {
        this.skinStates.set(name, Constants.SkinStatus.OWNED);
        this._updateSkinsRegistry();
        this.app.fire(EventTypes.ShopTab.UPDATE_SKINS);
        return true;
    }
    return false;
};

SkinManager.prototype.isRewarded = function (name) {
    const skinData = this.getSkinByName(name);
    return skinData && skinData.skinType === Constants.SkinType.REWARDED_SHOP;
};

SkinManager.prototype.isUnlocked = function (name) {
    if (GameConfig.getAttribute('debug', 'unlockAllSkins')) return true;
    const status = this.skinStates.get(name);
    return status !== Constants.SkinStatus.LOCKED;
};

SkinManager.prototype.hasAvailableForPurchaseSkins = function () {
    return DataManager.getInstance().money >= DataManager.getInstance().nextRandomSkinPrice && !this.areAllDefaultSkinsUnlocked();
}

SkinManager.prototype.update = function (dt) {

};

SkinManager.prototype._updateSkinsRegistry = function () {
    this.lockedSkinsWithTypeDefault = this.skinsWithTypeDefault.filter(skin => this.getSkinStatus(skin.name) === Constants.SkinStatus.LOCKED);
    this.lockedSkinsWithTypeRewarded = this.skinsWithTypeDefault.filter(skin => this.getSkinStatus(skin.name) === Constants.SkinStatus.LOCKED);
    this.lockedSkinsWithTypeVip = this.skinsWithTypeDefault.filter(skin => this.getSkinStatus(skin.name) === Constants.SkinStatus.LOCKED);
};



// SkinsPage.js
var SkinsPage = pc.createScript('skinsPage');

SkinsPage.attributes.add('maxSkinsPerPage', {
    type: 'number',
    default: 12
})

SkinsPage.prototype.initialize = function() {
    this._pageNumber = 0;
    this.icons = [];

    this.entity.isFull = () => this.icons.length >= this.maxSkinsPerPage;
    this.entity.getSkinsAmount = () => this.icons.length;
    this.entity.getIcons = () => this.icons;
    this.entity.containsIcon = this._containsIcon.bind(this);
    this.entity.addIcon = this._addIcon.bind(this);
    this.entity.setPageNumber = (value) => this._pageNumber = value;
    this.entity.getPageNumber = () => this._pageNumber;
};


SkinsPage.prototype._addIcon = function(icon) {
    this.entity.addChild(icon);
    this.icons.push(icon);
};

SkinsPage.prototype._containsIcon = function(icon) {
    return this.icons.indexOf(icon) !== -1;
};


SkinsPage.prototype.update = function(dt) {

};


// ShopSkinsTab.js
var ShopSkinsTab = pc.createScript('shopSkinsTab');

ShopSkinsTab.attributes.add('skinsPageTemplate', {
    type: 'asset',
    assetType: 'template'
});

ShopSkinsTab.attributes.add('skinTemplate', {
    type: 'asset',
    assetType: 'template'
});


ShopSkinsTab.attributes.add('shuffleSkins', {
    type: 'boolean',
    default: false
});

ShopSkinsTab.prototype.initialize = function () {
    this.currencyCounter = this.entity.parent.findByName('CurrencyCounterSmall');
    this.nextRandomSkinPriceText = this.entity.findByName('NextRandomSkinPriceText');

    this.bottomButtons = this.entity.findByName('BottomButtonsContainer').children;
    this.rewardedFreeMoneyButton = this.entity.findByName('RewardedFreeMoneyButton');
    this.unlockRandomSkinButton = this.entity.findByName('UnlockRandomSkinButton');
    this.unlockRandomSkinButtonPriceText = this.unlockRandomSkinButton.findByName('PriceText');

    this.rewardedFreeMoneyRewardAmountText = this.rewardedFreeMoneyButton.findByName('PriceText');
    this.rewardedFreeMoneyRewardAmountText.element.text = `+${GameConfig.getAttribute('shop', 'rewardedButtonReward')}`;

    this.starsExplosion = this.entity.findByName('StarsExplosion');

    this.pagesContainer = this.entity.findByName('PagesContainer');
    this.pages = this.entity.pages = [];
    this.skinIcons = this.entity.skinIcons = [];
    this.skinIconPagesMap = new Map();
    this.skinIconsMap = new Map();
    this._contentBuilt = false;

    this.entity.show = this._show.bind(this);

    this.app.on(EventTypes.SHOP_SELECT_SKIN, this.onSkinClicked, this);
    this.app.on(EventTypes.EQUIP_PLAYER_SKIN, this.equipSkin, this);
    this.app.on(EventTypes.NEXT_RANDOM_SKIN_PRICE_CHANGED, this._updateNextSkinPriceText, this);
    this.rewardedFreeMoneyButton.on(EventTypes.BUTTON_PRESSED, this.onClaimFreeMoneyPressed, this);
    this.unlockRandomSkinButton.on(EventTypes.BUTTON_PRESSED, this.onUnlockRandomSkinPressed, this);
};


ShopSkinsTab.prototype._buildContent = function () {
    const skinsList = SkinManager.getInstance().getAllSkins();
    const remainingSkins = skinsList.slice();
    const remainingRewardedSkins = skinsList.filter(s => s.skinType === Constants.SkinType.REWARDED_SHOP);
    const remainingDefaultSkins = skinsList.filter(s => s.skinType === Constants.SkinType.DEFAULT);

    let page;
    while (remainingRewardedSkins.length > 0 || remainingDefaultSkins.length > 0) {
        if (!page || page.isFull()) page = this._instantiatePage();
        const pageSkinIndex = page.getSkinsAmount();
        let skinData = null;
        if ((pageSkinIndex === 0 || pageSkinIndex == 3) && remainingRewardedSkins.length > 0) {
            skinData = this.shuffleSkins ? Utils.removeRandomItem(remainingRewardedSkins) : remainingRewardedSkins.shift();
        } else {
            skinData = this.shuffleSkins ? Utils.removeRandomItem(remainingDefaultSkins) : remainingDefaultSkins.shift();
        }

        if (skinData) {
            const icon = this._instantiateIcon(skinData);
            page.addIcon(icon);
            icon.initSkinIcon(skinData);
            this.skinIconPagesMap.set(skinData.name, page);
            this.skinIconsMap.set(skinData.name, icon);
        }
    }

    this.entity.fire(EventTypes.ShopTab.CONTENT_BUILT);
    this._contentBuilt = true;
};

ShopSkinsTab.prototype._show = function () {
    if (!this._contentBuilt) this._buildContent();
    this._hasRewardedVideo = false;
    this._updateSkins();
    const activeSkinName = SkinManager.getInstance().getActivePlayerSkinName();
    this._scrollToSkinPage(activeSkinName, true);
    this._updateNextSkinPriceText(DataManager.getInstance().nextRandomSkinPrice);

    APIMediator.checkRewardedVideoAvailability('button:shop:premiumskin').then(result => {
        this._hasRewardedVideo = result;
        this._updateSkins();
    })
};


ShopSkinsTab.prototype.onSkinClicked = function (skinName) {
    const skinUnlocked = SkinManager.getInstance().isUnlocked(skinName);
    if (skinUnlocked) {
        SkinManager.getInstance().setPlayerSkin(skinName);
        LocalStorageController.save();
    } else {
        const skinRewarded = SkinManager.getInstance().isRewarded(skinName);
        if (skinRewarded && APIMediator.areRewardedAdsSupported()) {
            if (APIMediator.areRewardedAdsSupported()) {
                APIMediator.watchRewardedVideo('button:shop:premiumskin').then(async (result) => {
                    if (result) {
                        const unlockStatus = SkinManager.getInstance().unlockSkin(skinName);
                        if (unlockStatus) {
                            this._emitStars(this.skinIconsMap.get(skinName).getPosition());
                            SkinManager.getInstance().setPlayerSkin(skinName);
                            this.app.fire(EventTypes.PLAY_SKIN_UNLOCK_EFFECT);
                            LocalStorageController.save();
                        }
                    }
                });
            } else {
                SkinManager.getInstance().setPlayerSkin(skinName);
                LocalStorageController.save();
            }
        } else {
            // console.log('Can not equip skin as it is locked');
        }
    }
};

ShopSkinsTab.prototype.equipSkin = function (skinName) {
    this._updateSkins();
    return this._scrollToSkinPage(skinName);
}

ShopSkinsTab.prototype._updateSkins = function () {
    this.skinIcons.forEach(_icon => {
        _icon.updateView(this._hasRewardedVideo);
    });
};

ShopSkinsTab.prototype._scrollToSkinPage = function (skinName, instantly = false) {
    const pageIndex = this.pages.indexOf(this.skinIconPagesMap.get(skinName));
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
        return this.entity.scrollToPage(pageIndex, instantly);
    }
}

ShopSkinsTab.prototype._instantiatePage = function () {
    const page = this.skinsPageTemplate.resource.instantiate();
    this.pages.push(page);
    this.pagesContainer.addChild(page);
    page.setPageNumber(this.pages.length - 1);
    return page;
};

ShopSkinsTab.prototype._instantiateIcon = function (skinData) {
    const icon = this.skinTemplate.resource.instantiate();
    this.skinIcons.push(icon);
    return icon;
};

ShopSkinsTab.prototype._changeActiveButton = function (button) {
    this.bottomButtons.forEach(_button => _button.enabled = _button === button);
};

ShopSkinsTab.prototype._updateNextSkinPriceText = function (value) {
    this.nextRandomSkinPriceText.element.text = LocalizationManager.getInstance().getLocalizedText(`NEXT_SKIN_PRICE`).replace('#value#', `${Utils.formatMoney(value)}`);;
    this.unlockRandomSkinButtonPriceText.element.text = Utils.formatMoney(value);
};

ShopSkinsTab.prototype._emitStars = function (worldPosition) {
    this.starsExplosion.setPosition(worldPosition.x, worldPosition.y, 0);
    this.starsExplosion.particlesystem.reset();
    this.starsExplosion.particlesystem.play();
}


/** button handlers */
ShopSkinsTab.prototype.onUnlockRandomSkinPressed = function () {
    if (DataManager.getInstance().money >= DataManager.getInstance().nextRandomSkinPrice && !SkinManager.getInstance().areAllDefaultSkinsUnlocked()) {
        const randomSkinName = SkinManager.getInstance().getRandomLockedDefaultSkin();
        if (randomSkinName) {
            const unlockStatus = SkinManager.getInstance().unlockSkin(randomSkinName);
            if (unlockStatus) {
                this.unlockRandomSkinButton.setAvailable(false);
                this._scrollToSkinPage(randomSkinName, false).then(() => {
                    this._emitStars(this.skinIconsMap.get(randomSkinName).getPosition());
                    SkinManager.getInstance().setPlayerSkin(randomSkinName);
                    this.app.fire(EventTypes.PLAY_SKIN_UNLOCK_EFFECT);

                    DataManager.getInstance().money -= DataManager.getInstance().nextRandomSkinPrice;
                    DataManager.getInstance().nextRandomSkinPrice += GameConfig.getAttribute('shop', 'nextRandomSkinPriceIncrement');
                    LocalStorageController.save();
                    Utils.wait(500).then(() => {
                        this.unlockRandomSkinButton.setAvailable(true)
                    });
                });
            }
        }
    }
};

ShopSkinsTab.prototype.onClaimFreeMoneyPressed = function () {
    this.rewardedFreeMoneyButton.setAvailable(false);
    APIMediator.watchRewardedVideo('button:shop:freemoney').then(async (result) => {
        if (result) {
            await this.acquireReward(this.rewardedFreeMoneyButton.getPosition(), GameConfig.getAttribute('shop', 'rewardedButtonReward'));
        }
        this.rewardedFreeMoneyButton.setAvailable(true);
    });
};

ShopSkinsTab.prototype.acquireReward = function (_fromPosition, totalMoney) {
    return this.currencyCounter.spawnAndPickupMoney(_fromPosition, totalMoney, 1.25);
};


/** update loop */
ShopSkinsTab.prototype._updateButtonsVisibility = function () {
    if (DataManager.getInstance().money >= DataManager.getInstance().nextRandomSkinPrice && !SkinManager.getInstance().areAllDefaultSkinsUnlocked()) {
        this.nextRandomSkinPriceText.enabled = false;
        this._changeActiveButton(this.unlockRandomSkinButton);
    } else {
        this.nextRandomSkinPriceText.enabled = true;
        if (this._hasRewardedVideo) {
            this._changeActiveButton(this.rewardedFreeMoneyButton);
        } else {
            this._changeActiveButton(null);
        }

        if (this.app.frame % 30 === 0) {
            APIMediator.checkRewardedVideoAvailability('button:shop:freemoney').then(result => {
                this._hasRewardedVideo = result;
            });
        }
    }
};


ShopSkinsTab.prototype.update = function (dt) {
    this._updateButtonsVisibility();
};



// ShopLocation.js
var ShopLocation = pc.createScript('shopLocation');

ShopLocation.attributes.add('ringDelay', {
    type: 'number',
    default: 50
})

ShopLocation.getInstance = function () {
    if (!ShopLocation._instance) console.error('ShopLocation is not initialized yet');
    return ShopLocation._instance;
};


ShopLocation.prototype.initialize = function () {
    ShopLocation._app = this.app;
    if (!ShopLocation._instance) {
        ShopLocation._instance = this;
    }

    this.shopContent = this.entity.findByName('ShopContent');
    this.characterContainer = this.entity.findByName('ShopCharacterContainer');
    this._activeSkinName = undefined;

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);

    this.unlockParticlesContainer = this.entity.findByName('UnlockSkinEffects');
    this.rings = this.unlockParticlesContainer.children.filter(c => c.name.startsWith('Ring'));
    this.others = this.unlockParticlesContainer.children.filter(c => !c.name.startsWith('Ring'));

    this.app.on(EventTypes.PLAY_SKIN_UNLOCK_EFFECT, this._playUnlockEffect, this);
    this.app.on(EventTypes.EQUIP_PLAYER_SKIN, this._equipPlayerSkin, this);
};

ShopLocation.prototype.postInitialize = function () {
    this.hide();
}

ShopLocation.prototype.show = function () {
    this.shopContent.enabled = true;

    const activePlayerSkin = SkinManager.getInstance().getActivePlayerSkin();
    const activePlayerSkinName = SkinManager.getInstance().getActivePlayerSkinName();
    this._equipPlayerSkin(activePlayerSkinName, activePlayerSkin);
};

ShopLocation.prototype.hide = function () {
    this.shopContent.enabled = false;
};


ShopLocation.prototype._playUnlockEffect = function () {
    this.rings.forEach((ring, index) => {
        Utils.wait(index * this.ringDelay).then(() => {
            ring.particlesystem.reset();
            ring.particlesystem.play();
        })
    });
    this.others.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.play();
    });
};


ShopLocation.prototype._equipPlayerSkin = function (name, skinData) {
    if (!this.entity.enabled) return;
    if (this._activeSkinName === name) return;

    this._activeSkinName = name;

    for (let i = this.characterContainer.children.length - 1; i > -1; i--) this.characterContainer.children[i].destroy();

    AssetsLoader.getInstance().loadByTag('skin_' + name).then(() => {
        const character = skinData.shopCharacter.resource.instantiate();
        this.characterContainer.addChild(character);
        character.setLocalPosition(0, 0, 0);
        character.setLocalEulerAngles(0, 0, 0);
        character.setLocalScale(0.018, 0.018, 0.018);

        character.children.forEach(child => {
            if (child.render) {
                child.render.castShadows = false;
                child.render.castShadowsLightmap = false;
                child.render.receiveShadows = false;
            }
        });

        this.shopCharacter = character;
    });
};


ShopLocation.prototype.update = function (dt) {

};



// ShopScenesTab.js
var ShopScenesTab = pc.createScript('shopScenesTab');

ShopScenesTab.attributes.add('pageTemplates', {
    type: 'asset',
    assetType: 'template',
    array: true
});

ShopScenesTab.prototype.initialize = function () {
    this.bottomButtonsContainer = this.entity.findByName('BottomButtonsContainer');
    this.buttonSelectScene = this.entity.findByName('SelectSceneButton');
    this.buttonSelected = this.entity.findByName('SelectedInactiveButton');
    this.buttonFreePiece = this.entity.findByName('FreePieceButton');
    this.buttonRewardedUnlock = this.entity.findByName('RewardedUnlockButton');
    this.buttonFreeUnlock = this.entity.findByName('FreeUnlockButton');

    this.bottomButtons = this.bottomButtonsContainer.children;

    this.progressionContainer = this.entity.findByName('ProgressionContainer');
    this.progressionIcon = this.entity.findByName('PuzzleProgressionIcon');
    this.progressionText = this.entity.findByName('PuzzleProgressionText');

    this.pagesContainer = this.entity.findByName('PagesContainer');
    this.pages = this.entity.pages = this.pagesContainer.children.slice();
    this._contentBuilt = false;

    this.buttonSelectScene.on(EventTypes.BUTTON_PRESSED, this.onSelectScenePressed, this);
    this.buttonFreePiece.on(EventTypes.BUTTON_PRESSED, this.onGetFreePiecePressed, this);
    this.buttonRewardedUnlock.on(EventTypes.BUTTON_PRESSED, this.onRewardedUnlockPressed, this);
    this.buttonFreeUnlock.on(EventTypes.BUTTON_PRESSED, this.onFreeUnlockPressed, this);

    this.app.on(EventTypes.ShopTab.UPDATE_SCENES, this._updatePages, this);

    this.entity.show = this._show.bind(this);
};

ShopScenesTab.prototype._buildContent = function () {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < this.pageTemplates.length; i++) {
            const page = this.pageTemplates[i].resource.instantiate();
            this.pagesContainer.addChild(page);
            this.pages.push(page);
            page.init();
        }

        this.entity.fire(EventTypes.ShopTab.CONTENT_BUILT);
        this._contentBuilt = true;
        resolve();
    });
};

ShopScenesTab.prototype._show = async function () {
    if (!this._contentBuilt) await this._buildContent();
    this.buttonSelected.setAvailable(false);

    this._hasRewardedVideo = false;

    // this._scrollToActiveScenePage(false);
    this._scrollToFirstLockedPage(false);
};

ShopScenesTab.prototype._changeActiveButton = function (button) {
    this.bottomButtons.forEach(_button => _button.enabled = _button === button);
};

ShopScenesTab.prototype._scrollToScenePage = function (sceneName, instantly = false) {
    const pageIndex = this.pages.findIndex(_page => _page.getSceneName() === sceneName);
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
        this.entity.scrollToPage(pageIndex, instantly);
    }
}

ShopScenesTab.prototype._scrollToActiveScenePage = function (instantly = false) {
    const activeSceneName = SceneManager.getInstance().getActiveSceneName();
    this._scrollToScenePage(activeSceneName, instantly);
}

ShopScenesTab.prototype._scrollToFirstLockedPage = function (sceneName, instantly = false) {
    const firstLockedPageIndex = this.pages.findIndex(_page => SceneManager.getInstance().getSceneState(_page.getSceneName()).unlocked == false);
    if (firstLockedPageIndex >= 0 && firstLockedPageIndex < this.pages.length) {
        this.entity.scrollToPage(firstLockedPageIndex, instantly);
    } else {
        this._scrollToActiveScenePage(instantly);
    }
}



/** button handlers */

ShopScenesTab.prototype.onSelectScenePressed = function () {
    const sceneName = this.entity.getCurrentPage().getSceneName();
    const sceneUnlocked = SceneManager.getInstance().isUnlocked(sceneName);
    if (sceneUnlocked) {
        SceneManager.getInstance().setScene(sceneName);
        LocalStorageController.save();
    } else {
        console.log('Can not equip scene ' + sceneName + ' as it is locked');
    }
};

ShopScenesTab.prototype.onGetFreePiecePressed = function () {
    this.buttonFreePiece.setAvailable(false);
    APIMediator.watchRewardedVideo('button:shop:getpuzzlepiece').then((result) => {
        this.buttonFreePiece.setAvailable(true);
        if (result) {
            const activeSceneName = this.entity.getCurrentPage().getSceneName();
            const acquireResult = SceneManager.getInstance().acquirePiece(activeSceneName, 1);
            if (acquireResult) {
                this._updatePages();
                const lastUnlockedPiece = this.entity.getCurrentPage().getLastUnlockedPiece();
                this.entity.getCurrentPage().emitStars(lastUnlockedPiece.getPosition());
            }
        }
    })
};

ShopScenesTab.prototype.onRewardedUnlockPressed = function () {
    const sceneName = this.entity.getCurrentPage().getSceneName();
    const sceneState = SceneManager.getInstance().getSceneState(sceneName);
    if (!sceneState.unlocked && sceneState.pieces >= sceneState.totalPieces) {
        this.buttonRewardedUnlock.setAvailable(false);
        APIMediator.watchRewardedVideo('button:shop:unlockscene').then((result) => {
            this.buttonRewardedUnlock.setAvailable(true);
            if (result) {
                SceneManager.getInstance().unlockScene(sceneName);
                this.entity.getCurrentPage().emitStars(this.entity.getCurrentPage().getPosition());
            }
        })
    }
};

ShopScenesTab.prototype.onFreeUnlockPressed = function () {
    const sceneName = this.entity.getCurrentPage().getSceneName();
    const sceneState = SceneManager.getInstance().getSceneState(sceneName);
    if (!sceneState.unlocked && sceneState.pieces >= sceneState.totalPieces) {
        SceneManager.getInstance().unlockScene(sceneName);
        this.entity.getCurrentPage().emitStars(this.entity.getCurrentPage().getPosition());
    }
};


ShopScenesTab.prototype._updatePages = function () {
    this.pages.forEach(page => page.updatePuzzle());
};

ShopScenesTab.prototype._updateButtonsVisibility = function () {
    /* update buttons */
    const activeSceneName = SceneManager.getInstance().getActiveSceneName();
    const currentPage = this.entity.getCurrentPage();
    const currentPageSceneName = currentPage.getSceneName();
    const currentPageSceneState = SceneManager.getInstance().getSceneState(currentPageSceneName);
    const sceneUnlocked = SceneManager.getInstance().isUnlocked(currentPageSceneName);
    const { unlocked, pieces, totalPieces } = currentPageSceneState;

    if (sceneUnlocked) {
        if (currentPageSceneName === activeSceneName) {
            this._changeActiveButton(this.buttonSelected);
        } else {
            this._changeActiveButton(this.buttonSelectScene);
        }
    } else {
        if (pieces >= totalPieces && !unlocked) {
            if (this._hasRewardedVideo) {
                this._changeActiveButton(this.buttonRewardedUnlock);
            } else {
                this._changeActiveButton(this.buttonFreeUnlock);
            }
        } else {
            if (SceneManager.getInstance().getFirstNotCompletedScene() && this._hasRewardedVideo) {
                this._changeActiveButton(this.buttonFreePiece);
            } else {
                this._changeActiveButton(null);
            }
        }
    }

    /* progression */
    if (currentPageSceneName === Constants.Scenes.DEFAULT) {
        this.progressionContainer.enabled = false;
    } else {
        this.progressionContainer.enabled = true;
        const progressionTextValue = `${pieces}/${totalPieces}`;
        if (this.progressionText.element.text !== progressionTextValue) this.progressionText.element.text = progressionTextValue;
        this.progressionIcon.element.color = currentPage.getThemeColor();
    }
}


ShopScenesTab.prototype.update = function (dt) {
    if (!this._contentBuilt) {
        return;
    };

    if (this.app.frame % 30 === 0) {
        APIMediator.checkRewardedVideoAvailability('button:shop:unlockscene').then(async (result) => {
            this._hasRewardedVideo = result;
        });
    }

    this._updateButtonsVisibility();
};


// ScenePage.js
var ScenePage = pc.createScript('scenePage');

ScenePage.attributes.add('sceneName', {
    type: 'string'
});

ScenePage.attributes.add('themeColor', {
    type: 'rgb',
    default: [1, 1, 1]
});

ScenePage.prototype.initialize = function () {
    this.grayscale = this.entity.findByName('GrayScale');
    this.puzzlePiecesContainer = this.entity.findByName('PuzzlesGroup');
    this.colored = this.entity.findByName('Color');
    this.starsExplosion = this.entity.findByName('StarsExplosion');

    this.pieces = this.puzzlePiecesContainer.children;
    this._visiblePieces = 0;
    this._totalPieces = this.pieces.length;

    this.entity.init = this._init.bind(this);
    this.entity.getSceneName = () => this.sceneName;
    this.entity.getThemeColor = () => this.themeColor;
    this.entity.updatePuzzle = this._updatePuzzle.bind(this);
    this.entity.emitStars = this._emitStars.bind(this);
    this.entity.getLastUnlockedPiece = this._getLastUnlockedPiece.bind(this);
    this.entity.playPieceUnlockAnimation = this._playPieceUnlockAnimation.bind(this);
}

ScenePage.prototype._init = function () {
    this._updatePuzzle(true);
};

ScenePage.prototype._updatePuzzle = function (instantly = false) {
    const sceneState = SceneManager.getInstance().getSceneState(this.sceneName);
    this.pieces.forEach((piece, index) => {
        piece.enabled = index <= sceneState.pieces - 1;
        if (index >= this._visiblePieces && index <= sceneState.pieces - 1) {
            if (instantly) {
                piece.setLocalScale(1, 1, 1);
            } else {
                piece.setLocalScale(0, 0, 0);
                piece.tween(piece.getLocalScale())
                    .to(pc.Vec3.ONE, 0.25, pc.CubicOut)
                    .start();
            }
        }
    });
    this._visiblePieces = sceneState.pieces;

    if (sceneState.unlocked && sceneState.pieces === sceneState.totalPieces) {
        this.colored.enabled = true;
        if (instantly) {
            this.colored.element.opacity = 1;
        } else {
            this.colored.element.opacity = 0;
            this.colored.tween(this.colored.element)
                .to({ opacity: 1 }, 0.25, pc.Linear)
                .start();
        }
    }
};

ScenePage.prototype._emitStars = function (worldPosition) {
    this.starsExplosion.setPosition(worldPosition.x, worldPosition.y, 0);
    this.starsExplosion.particlesystem.reset();
    this.starsExplosion.particlesystem.play();
};

ScenePage.prototype._getLastUnlockedPiece = function () {
    return this.pieces[pc.math.clamp(this._visiblePieces - 1, 0, this.pieces.length - 1)];
};

ScenePage.prototype._playPieceUnlockAnimation = function (delay = 0) {
    this._updatePuzzle(false);
    if (this._visiblePieces > 0) {
        const lastPiece = this._getLastUnlockedPiece();
        if (lastPiece) {
            this.app.stopAllTweens(lastPiece);
            lastPiece.setLocalScale(pc.Vec3.ZERO);

            Utils.wait(delay).then(() => {
                lastPiece.tween(lastPiece.getLocalScale())
                    .to(pc.Vec3.ONE, 0.325, pc.CubicOut)
                    .start();

                this._emitStars(lastPiece.getPosition());
            });
        }
    }

    const sceneState = SceneManager.getInstance().getSceneState(this.sceneName);
    if (!sceneState.unlocked && sceneState.pieces === sceneState.totalPieces) {
        return true;
    } else {
        return false
    }
};

ScenePage.prototype.update = function (dt) {

};

// SceneManager.js
var SceneManager = pc.createScript('sceneManager');

SceneManager.attributes.add('scenesLibrary', {
    type: 'json',
    schema: [{
        name: 'name',
        type: 'string',
        default: ''
    }, {
        name: 'totalPieces',
        type: 'number',
        default: 1
    }, {
        name: 'template',
        type: 'asset',
        assetType: 'template'
    }],
    array: true
});



SceneManager.getInstance = function () {
    if (!SceneManager._instance) console.error('SceneManager is not initialized yet');
    return SceneManager._instance;
};


SceneManager.prototype.initialize = function () {
    SceneManager._app = this.app;
    if (!SceneManager._instance) {
        SceneManager._instance = this;
    }

    this._initializationCompleted = false;
    this._activeSceneName = undefined;
    this._activeScene = undefined;

    this._lastUnlockedPuzzleSceneName = undefined;

    this.defaultScene = this.scenesLibrary[0];
    this.specialScenes = this.scenesLibrary.slice(1).filter(record => !!record.name && record.template);

    this.sceneData = new Map();
    this._prepareDefaultSceneData();

    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSceneStatuses, this);
};

SceneManager.prototype.postInitialize = function () {
    this._initializationCompleted = true;
    if (this._pendingSceneName) {
        this.setScene(this._pendingSceneName);
        this._pendingSceneName = null;
    }
}


SceneManager.prototype.setScene = function (name) {
    if (!this._initializationCompleted) {
        this._pendingSceneName = name;
        return;
    }
    this._activeSceneName = name;
    this._activeScene = this.getSceneByName(name);
    this.app.fire(EventTypes.SET_SCENE, this._activeSceneName, this._activeScene);
}

SceneManager.prototype.getSceneByName = function (name) {
    const found = this.scenesLibrary.find(record => record.name === name);
    if (!found) {
        console.warn('No scene with name ' + name);
        return this.defaultScene;
    }
    return found;
};


SceneManager.prototype.getSceneState = function(name) {
    return this.sceneData.get(name);
}

SceneManager.prototype.isUnlocked = function(name) {
    return this.getSceneState(name).unlocked || GameConfig.getAttribute('debug', 'unlockAllScenes');
}

SceneManager.prototype.unlockScene = function(name) {
    this.getSceneState(name).unlocked = true;
    this.app.fire(EventTypes.ShopTab.UPDATE_SCENES);
    LocalStorageController.save();
}

SceneManager.prototype.getActiveScene = function () {
    return this._activeScene || this.getDefaultScene();
};

SceneManager.prototype.getActiveSceneName = function () {
    return this.getActiveScene().name;
};

SceneManager.prototype.getDefaultScene = function () {
    return this.defaultScene;
};

SceneManager.prototype.getSpecialScenes = function () {
    return this.specialScenes;
};

SceneManager.prototype.getNotCompletedScenes = function () {
    return this.specialScenes.filter(sceneData => {
        const sceneState = this.getSceneState(sceneData.name);
        return !sceneState.unlocked && sceneState.pieces < sceneState.totalPieces
    });
};

SceneManager.prototype.getFirstNotCompletedScene = function () {
    return this.getNotCompletedScenes()[0];
};

SceneManager.prototype.getRandomNotCompletedScene = function () {
    return Utils.getRandomItem(this.getNotCompletedScenes());
};



SceneManager.prototype.getLastUnlockedPuzzlePieceSceneName = function() {
    return this._lastUnlockedPuzzleSceneName;
}

SceneManager.prototype.acquirePiece = function(sceneName, amount = 1) {
    const sceneState = this.getSceneState(sceneName);
    if(sceneState.unlocked) return false;
    if(sceneState.pieces >= sceneState.totalPieces) return false;
    this._lastUnlockedPuzzleSceneName = sceneName;
    sceneState.pieces = pc.math.clamp(sceneState.pieces + amount, 0, sceneState.totalPieces);
    this.app.fire(EventTypes.ShopTab.UPDATE_SCENES);
    LocalStorageController.save();
    return true;
}


SceneManager.prototype.hasCompletedButNotUnlockedScenes = function() {
    let hasDesiredItems = false; 
    this.sceneData.forEach((item, key) => {
        if(item.pieces >= item.totalPieces && !item.unlocked) hasDesiredItems = true;
    });
    return hasDesiredItems;
}


SceneManager.prototype.update = function (dt) {

};



/** state & savedata */

SceneManager.prototype._prepareDefaultSceneData = function () {
    this.sceneData.clear();
    this.scenesLibrary.forEach(record => {
        if (record.name === Constants.Scenes.DEFAULT) {
            this.sceneData.set(record.name, {
                unlocked: true,
                pieces: record.totalPieces,
                totalPieces: record.totalPieces
            });
        } else {
            this.sceneData.set(record.name, {
                unlocked: false,
                pieces: 0,
                totalPieces: record.totalPieces
            });
        }
    });
    this.setScene(Constants.Scenes.DEFAULT);
};


SceneManager.prototype._loadSceneStatuses = function () {
    const dataObject = LocalStorageController.getSavedValue(Constants.Storage.SCENE_STATUSES);
    if (dataObject) {
        for (let key in dataObject) {
            const state = dataObject[key];
            this.sceneData.set(key, state);
        }
    }

    /* load last scene */
    const activeSceneName = LocalStorageController.getSavedValue(Constants.Storage.ACTIVE_SCENE);
    if (activeSceneName) {
        this.setScene(activeSceneName);
    }
};

SceneManager.prototype.getScenesSaveData = function () {
    const saveData = {};
    this.sceneData.forEach((value, key) => {
        saveData[key] = value;
    })
    return saveData;
};


// Screen_Chestroom.js
class ScreenChestroom extends BaseWindow {

    initialize() {
        super.initialize();

        this.currencyCounter = this.entity.findByName('CurrencyCounterSmall');

        this.buttonClose = this.entity.findByName('CloseButton');
        this.chestsContainer = this.entity.findByName('ChestsContainer');
        this.chests = [];//this.chestsContainer.children.slice();

        this.keysCounter = this.entity.findByName('KeysCounter');
        this.keysAmountText = this.keysCounter.findByName('KeysAmountText');

        this.moreKeysGroup = this.entity.findByName('MoreKeysGroup');
        this.buttonMoreKeys = this.moreKeysGroup.findByName('ButtonGetMoreKeysRewarded');
        this.buttonMoreKeysText = this.buttonMoreKeys.findByName('MoreKeysText');
        this.buttonSkipMoreKeys = this.moreKeysGroup.findByName('ButtonSkip');

        this.tapToContinueContainer = this.entity.findByName('TapToContinueContainer');
        this.tapToContinueInputZone = this.tapToContinueContainer.findByName('InputArea');

        this._activeFooterContainer = null;

        this.bestRewardMoney = this.entity.findByName('BestRewardMoney');
        this.bestRewardMoneyText = this.bestRewardMoney.findByName('MoneyAmount');
        this.bestRewardPuzzle = this.entity.findByName('BestRewardPuzzle');
        this.bestRewardSkin = this.entity.findByName('BestRewardSkin');
        this.bestRewardSkinIcon = this.bestRewardSkin.findByName('SkinImage');

        this._openedChests = 0;

        this.buttonClose.on(EventTypes.BUTTON_PRESSED, this.onContinuePressed, this);
        this.buttonMoreKeys.on(EventTypes.BUTTON_PRESSED, this.onMoreKeysPressed, this);
        this.tapToContinueInputZone.on(EventTypes.BUTTON_PRESSED, this.onContinuePressed, this);
        this.buttonSkipMoreKeys.on(EventTypes.BUTTON_PRESSED, this.onContinuePressed, this);

        this.app.on(EventTypes.KEYS_AMOUNT_CHANGED, this._onKeysAmountChanged, this);
        this.app.on(EventTypes.CHEST_OPENED, this._onChestOpened, this);
        this.app.on(EventTypes.CLAIM_CHESTROOM_PRIZE, this._claimPrize, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        this._openedChests = 0;

        this._buildChests();

        this._generatePrizes();

        /* show chests */
        const randomIndices = Utils.shuffle(this.chests.map((chest, index) => index * 0.0275))
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[i].show(0.125 + randomIndices[i]);
        }

        this._activeFooterContainer = null;
        this._onKeysAmountChanged();

        /* footer group */
        this._showFooterKeysGroup();

        super._onShow();
    }


    _onHide() {
        super._onHide();
    }

    _buildChests() {
        if(this.chests.length > 0) return;
        
        this.chests = [];
        for(let i = 0; i < 9; i++) {
            const chest = TemplateManager.getInstance().instantiate('Chest');
            this.chestsContainer.addChild(chest);
            chest.setLocalPosition(
                (Math.floor(i / 3) - 1) * 220,
                ((i % 3) - 1) * 220,
                0
            );
            this.chests.push(chest);
        }
    }

    _claimPrize(prizeData, chest) {
        switch (prizeData.type) {
            case Constants.ChestPrizeType.MONEY:
                this.currencyCounter.spawnAndPickupMoney(chest.getPosition(), prizeData.amount, 1.25);
                break;
            case Constants.ChestPrizeType.SKIN:
                const randomSkinName = prizeData.skin.name;
                const unlockStatus = SkinManager.getInstance().unlockSkin(randomSkinName);
                if (unlockStatus) {
                    SkinManager.getInstance().setPlayerSkin(randomSkinName);
                    LocalStorageController.save();
                }
                break;
            case Constants.ChestPrizeType.PUZZLE:
                const sceneName = prizeData.scene.name;
                const acquireResult = SceneManager.getInstance().acquirePiece(sceneName, 1);
                if (acquireResult) {
                    UIController.getInstance().showPopup(Constants.Screens.PUZZLE);
                }
                break;
        }
    }


    _generatePrizes() {
        const prizeDatas = [];

        /* regular money prizes */
        for (let i = 0; i < GameConfig.getAttribute('chestroom', 'moneyPrizes').length; i++) {
            prizeDatas.push({
                type: Constants.ChestPrizeType.MONEY,
                amount: GameConfig.getAttribute('chestroom', 'moneyPrizes')[i]
            });
        }


        const bestPrizes = [];

        /* random skins */
        if (!SkinManager.getInstance().areAllDefaultSkinsUnlocked()) {
            const randomSkinName = SkinManager.getInstance().getRandomLockedDefaultSkin();
            if (randomSkinName) {
                bestPrizes.push({
                    type: Constants.ChestPrizeType.SKIN,
                    skin: SkinManager.getInstance().getSkinByName(randomSkinName)
                });
            }
        }
        /* random scene piece */
        const randomNotCompletedScene = SceneManager.getInstance().getFirstNotCompletedScene();
        if (randomNotCompletedScene) {
            bestPrizes.push({
                type: Constants.ChestPrizeType.PUZZLE,
                scene: randomNotCompletedScene
            });
        }

        /* best prize money */
        for (let i = 0; i < 1; i++) {
            bestPrizes.push({
                type: Constants.ChestPrizeType.MONEY,
                amount: GameConfig.getAttribute('chestroom', 'bestMoneyPrize')
            });
        }

        const bestPrize = Utils.getRandomItem(bestPrizes);

        prizeDatas.push(bestPrize);
        Utils.shuffle(prizeDatas);

        /* set bestprize */
        switch (bestPrize.type) {
            case Constants.ChestPrizeType.MONEY:
                this.bestRewardMoney.enabled = true;
                this.bestRewardSkin.enabled = false;
                this.bestRewardPuzzle.enabled = false;
                this.bestRewardMoneyText.element.text = `${bestPrize.amount}`;
                break;
            case Constants.ChestPrizeType.SKIN:
                this.bestRewardMoney.enabled = false;
                this.bestRewardSkin.enabled = true;
                this.bestRewardPuzzle.enabled = false;
                this.bestRewardSkinIcon.element.spriteAsset = bestPrize.skin.icon.id;
                break;
            case Constants.ChestPrizeType.PUZZLE:
                this.bestRewardMoney.enabled = false;
                this.bestRewardSkin.enabled = false;
                this.bestRewardPuzzle.enabled = true;
                break;
        }

        /* fill chests */
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[i].setPrize(prizeDatas[i] || Utils.getRandomItem(GameConfig.getAttribute('chestroom', 'moneyPrizes')));
        }
    }

    _showFooterKeysGroup() {
        this._showBottomContainer(this.keysCounter);
    }


    _showFooterRewardedGroup() {
        this._showBottomContainer(this.moreKeysGroup);

        this.buttonMoreKeys.setAvailable(true);
        this.buttonMoreKeysText.element.text = LocalizationManager.getInstance().getLocalizedText(`X KEYS MORE`).replace('#value#', `${DataManager.getInstance().requiredKeys}`);
    }

    _showFooterContinueGroup() {
        this._showBottomContainer(this.tapToContinueContainer);

    }

    _showBottomContainer(container) {
        if (this._activeFooterContainer === container) return;
        this._activeFooterContainer = container;
        [this.keysCounter, this.moreKeysGroup, this.tapToContinueContainer].forEach(c => {
            if (c === container) {
                c.enabled = true;
                c.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            } else {
                c.enabled = false;
            }
        });
    }

    async _onChestOpened() {
        DataManager.getInstance().keys -= 1;
        this._openedChests += 1;

        if(this._openedChests >= this.chests.length) {
            /* all chests opened */
            this._showFooterContinueGroup();
            return;
        }

        const hasRewardedAd = await APIMediator.checkRewardedVideoAvailability('button:chestroom:getfreekeys');

        if (DataManager.getInstance().keys > 0) {
            this._showFooterKeysGroup();
        } else if (DataManager.getInstance().keys === 0 && this._openedChests < this.chests.length && hasRewardedAd) {
            this._showFooterRewardedGroup();
        } else {
            this._showFooterContinueGroup();
        }
    }

    _onKeysAmountChanged() {
        this.keysAmountText.element.text = `${DataManager.getInstance().keys}/${DataManager.getInstance().requiredKeys}`;
        this.chests.forEach(chest => {
            chest.setFade(DataManager.getInstance().keys > 0);
        });
    }

    update(dt) {

    }

    /* button handlers */
    async onMoreKeysPressed() {
        this.buttonMoreKeys.setAvailable(false);
        const result = await APIMediator.watchRewardedVideo('button:chestroom:getfreekeys');
        if (result) {
            DataManager.getInstance().keys = DataManager.getInstance().requiredKeys;
            this._showFooterKeysGroup();
        } else {
            this.buttonMoreKeys.setAvailable(true);
        }
    }

    onContinuePressed() {
        UIController.getInstance().hide(Constants.Screens.CHESTROOM);
    }

}

pc.registerScript(ScreenChestroom, 'screenChestroom');

// Popup_Hint.js
class PopupHint extends BaseWindow {

    initialize() {
        super.initialize();

        this.claimContainer = this.entity.findByName('ClaimButtonContainer');
        this.yesContainer = this.entity.findByName('YesButtonContainer');
        this.noContainer = this.entity.findByName('NoButtonContainer');

        this.buttonClaim = this.claimContainer.findByName('ClaimButton');
        this.buttonYes = this.yesContainer.findByName('YesButton');
        this.buttonNo = this.noContainer.findByName('NoButton');


        this.buttonClaim.on(EventTypes.BUTTON_PRESSED, this._onClaimPressed, this);
        this.buttonYes.on(EventTypes.BUTTON_PRESSED, this._onYesPressed, this);
        this.buttonNo.on(EventTypes.BUTTON_PRESSED, this._onNoPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {

        this.app.fire(EventTypes.CHANGE_LOCATION, Constants.Locations.HINT, false);

        if (!DataManager.getInstance().freeHintClaimed) {
            DataManager.getInstance().freeHintClaimed = true;
            this.claimContainer.enabled = true;
            this.yesContainer.enabled = false;
            this.noContainer.enabled = false;
        } else {
            this.claimContainer.enabled = false;
            this.yesContainer.enabled = true;
            this.noContainer.enabled = true;
        }

        this._activateButtons();

        CameraController.getInstance().changeCamera(Constants.Cameras.HINT);

        super._onShow();
    }


    _onHide() {
        this.app.fire(EventTypes.HIDE_LOCATION, Constants.Locations.HINT);

        super._onHide();
    }

    _activateButtons() {
        [this.buttonClaim, this.buttonYes, this.buttonNo].forEach(button => button.setAvailable(true));
    }

    _deactivateButtons() {
        [this.buttonClaim, this.buttonYes, this.buttonNo].forEach(button => button.setAvailable(false));
    }



    _onClaimPressed() {
        this._deactivateButtons();
        RoundManager.getInstance().getActiveRound().enableHint();

        this.app.fire(EventTypes.HIDE_LOCATION, Constants.Locations.HINT);
        UIController.getInstance().showWindow(Constants.Screens.ROUND);

    }


    async _onYesPressed() {
        this._deactivateButtons();

        const result = await APIMediator.watchRewardedVideo('button:freehint:get');
        if (result) {
            RoundManager.getInstance().getActiveRound().enableHint();
            this.app.fire(EventTypes.HIDE_LOCATION, Constants.Locations.HINT);
            UIController.getInstance().showWindow(Constants.Screens.ROUND);
        } else {
            this._activateButtons();
        }
    }


    _onNoPressed() {
        this._deactivateButtons();

        this.app.fire(EventTypes.HIDE_LOCATION, Constants.Locations.HINT);
        UIController.getInstance().showWindow(Constants.Screens.ROUND);
    }


    update(dt) {

    }

}

pc.registerScript(PopupHint, 'popupHint');

// HintLocation.js
var HintLocation = pc.createScript('hintLocation');

HintLocation.attributes.add('ringDelay', {
    type: 'number',
    default: 50
})

HintLocation.getInstance = function () {
    if (!HintLocation._instance) console.error('HintLocation is not initialized yet');
    return HintLocation._instance;
};


HintLocation.prototype.initialize = function () {
    HintLocation._app = this.app;
    if (!HintLocation._instance) {
        HintLocation._instance = this;
    }


    this.hintContent = this.entity.findByName('HintContent');
    this.characterContainer = this.entity.findByName('HintCharacterContainer');
    this.hintCharacter = this.characterContainer.children[0];
    this._activeSkinName = undefined;

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);

    this.app.on(EventTypes.EQUIP_PLAYER_SKIN, this._equipPlayerSkin, this);
};

HintLocation.prototype.postInitialize = function () {
    this.hide();
}

HintLocation.prototype.show = function () {
    this.hintContent.enabled = true;

    this.characterContainer.setLocalScale(0.5, 0.5, 0.5);
    this.characterContainer.tween(this.characterContainer.getLocalScale())
        .to(pc.Vec3.ONE, 0.55, pc.SineOut)
        .start();

    Utils.wait(150).then(() => this.hintCharacter.anim.setTrigger('hint', true));

    const activePlayerSkin = SkinManager.getInstance().getActivePlayerSkin();
    const activePlayerSkinName = SkinManager.getInstance().getActivePlayerSkinName();
    this._equipPlayerSkin(activePlayerSkinName, activePlayerSkin);
};

HintLocation.prototype.hide = function () {
    this.hintContent.enabled = false;
};


HintLocation.prototype._equipPlayerSkin = function (name, skinData) {
    if (!this.entity.enabled) return;
    if (this._activeSkinName === name) return;
    return;
};


HintLocation.prototype.update = function (dt) {

};



// chest.js
var Chest = pc.createScript('chest');

Chest.prototype.initialize = function () {
    this.chestAminaton = this.entity.findByName('ChestAnimation');
    this.prizeContainer = this.entity.findByName('Prizes');
    this.prizeMoney = this.entity.findByName('PrizeMoney');
    this.prizeSkin = this.entity.findByName('PrizeSkin');
    this.prizePuzzle = this.entity.findByName('PrizePuzzle');
    this.skinImage = this.entity.findByName('SkinImage');
    this.moneyAmountText = this.entity.findByName('MoneyAmount');
    this.explosionBlue = this.entity.findByName('StarsExplosionBlue');
    this.explosionGreen = this.entity.findByName('StarsExplosionGreen');
    this.loadingIcon = this.entity.findByName('LoadingIcon');
    this._iconTextureAsset = this.app.assets.get(this.app.assets.get(this.chestAminaton.element.spriteAsset).data.textureAtlasAsset);

    this._animFrame = 0;
    this._totalFrames = 15;
    this._animFPS = 30;
    this._beingOpened = false;
    this._opened = false;
    this._prizeType = undefined;
    this._prizeData = undefined;

    this.entity.show = this._show.bind(this);
    this.entity.setPrize = this._setPrize.bind(this);
    this.entity.isOpened = () => this._opened;
    this.entity.setFade = (value) => this.chestAminaton.element.color = (this._opened || value) ? pc.Color.WHITE : pc.Color.GRAY;

    BasicButton.assignAction(this.chestAminaton, this.onChestOpenPressed, this);

    this.reset();
};


Chest.prototype._show = function (delay = 0) {
    this.reset();
    this.entity.setLocalScale(pc.Vec3.ZERO);
    this.entity.tween(this.entity.getLocalScale())
        .to(pc.Vec3.ONE, 0.325, pc.BackOut)
        .delay(delay)
        .start();
}

Chest.prototype.reset = function () {
    this._opened = false;
    this._beingOpened = false;
    this._animFrame = 0;
    this.chestAminaton.element.spriteFrame = 0;
    this.prizeContainer.children.forEach(child => child.enabled = false);
};

Chest.prototype._setPrize = function (prizeData) {
    this._prizeType = prizeData.type;
    this._prizeData = prizeData;
};

Chest.prototype.open = function () {
    if (this._opened) return;
    this._opened = true;
    this._beingOpened = true;
    this._animFrame = 0;

    let explosion = null;
    let prizeEntity = null;

    this.app.fire(EventTypes.CHEST_OPENED, this.entity);

    switch (this._prizeType) {
        case Constants.ChestPrizeType.MONEY:
            explosion = this.explosionGreen;
            prizeEntity = this.prizeMoney;
            this.moneyAmountText.element.text = `${this._prizeData.amount}`;
            break;
        case Constants.ChestPrizeType.SKIN:
            explosion = this.explosionBlue;
            prizeEntity = this.prizeSkin;
            this.skinImage.element.spriteAsset = this._prizeData.skin.icon.id;
            break;
        case Constants.ChestPrizeType.PUZZLE:
            explosion = this.explosionBlue;
            prizeEntity = this.prizePuzzle;
            break;
    }

    this._playExplosionAnim(explosion);

    prizeEntity.enabled = true;
    prizeEntity.setLocalScale(pc.Vec3.ZERO);
    prizeEntity.tween(prizeEntity.getLocalScale())
        .to(pc.Vec3.ONE, 0.85, pc.BackOut)
        .delay(0.15)
        .start();

    Utils.wait(1400).then(() => {
    this.app.fire(EventTypes.CLAIM_CHESTROOM_PRIZE, this._prizeData, this.entity);
    });

    Utils.wait(2000).then(() => {
        prizeEntity.tween(prizeEntity.getLocalScale())
            .to(pc.Vec3.ZERO, 0.075, pc.SineOut)
            .start();
    });
}

Chest.prototype._playExplosionAnim = function (explosion) {
    explosion.particlesystem.reset();
    explosion.particlesystem.play();
};


Chest.prototype.onChestOpenPressed = function () {
    if(DataManager.getInstance().keys > 0) {
        this.open();
    }
};

Chest.prototype.update = function (dt) {
    this.chestAminaton.element.enabled = this._iconTextureAsset.loaded;
    this.loadingIcon.enabled = this._iconTextureAsset.loading;

    if (this._beingOpened) {
        this._animFrame = pc.math.clamp(this._animFrame + dt * this._animFPS, 0, this._totalFrames);
        this.chestAminaton.element.spriteFrame = Math.floor(this._animFrame);
        if (this._animFrame >= this._totalFrames) {
            this._beingOpened = false;
        }
    }
};



// Popup_Puzzle.js
class PopupPuzzle extends BaseWindow {

    initialize() {
        super.initialize();

        this.contentContainer = this.entity.findByName('ContentContainer');

        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this.rewardedUnlockButton = this.buttonsContainer.findByName('RewardedUnlockButton');
        this.freeUnlockButton = this.buttonsContainer.findByName('FreeUnlockButton');
        this.noThanksButton = this.buttonsContainer.findByName('ButtonNoThanks');

        this.puzzleContainer = this.entity.findByName('PuzzleContainer');

        this._activeSceneName = undefined;
        this._puzzleGap = 15;
        this._baseHeight = 512 + 2 * this._puzzleGap;
        this._expandedHeight = 800;

        this.rewardedUnlockButton.on(EventTypes.BUTTON_PRESSED, this._onRewardedUnlockPressed, this);
        this.freeUnlockButton.on(EventTypes.BUTTON_PRESSED, this._onFreeUnlockPressed, this);
        this.noThanksButton.on(EventTypes.BUTTON_PRESSED, this._onNoPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        this.contentContainer.element.height = this._baseHeight;
        this.buttonsContainer.enabled = false;

        while (this.puzzleContainer.children.length > 0) this.puzzleContainer.children[this.puzzleContainer.children.length - 1].destroy();

        this._activeSceneName = SceneManager.getInstance().getLastUnlockedPuzzlePieceSceneName();
        if (this._activeSceneName) {
            AssetsLoader.getInstance().loadByTag('scenery_preview').then(() => {
                const sceneName = this._activeSceneName;
                const puzzleTemplate = TemplateManager.getInstance().instantiate('PageScene' + sceneName);
                this._activePuzzlePage = puzzleTemplate;
                this.puzzleContainer.addChild(puzzleTemplate);
                puzzleTemplate.init();
                const unlockingAvailable = puzzleTemplate.playPieceUnlockAnimation(500);
                if (unlockingAvailable) {
                    Utils.wait(1750).then(() => this._showButtons());
                } else {
                    Utils.wait(2000).then(() => this._exit());
                }
            });
        } else {
            Utils.wait(100).then(() => this._exit());
        }
    }


    _onHide() {
        super._onHide();
    }


    _showButtons() {
        this.contentContainer.tween(this.contentContainer.element)
            .to({ height: this._expandedHeight }, 0.5, pc.SineOut)
            .start();

        Utils.wait(350).then(async () => {
            const hasRewardedAd = await APIMediator.checkRewardedVideoAvailability('button:puzzles:unlock');
            if (hasRewardedAd) {
                this.rewardedUnlockButton.enabled = true;
                this.freeUnlockButton.enabled = false;
            } else {
                this.rewardedUnlockButton.enabled = false;
                this.freeUnlockButton.enabled = true;
            }
            this.noThanksButton.enabled = false;
            Utils.wait(1750).then(() => {
                this.noThanksButton.enabled = true;
            });

            this.buttonsContainer.enabled = true;
            this.buttonsContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        });
    }


    async _onRewardedUnlockPressed() {
        this.rewardedUnlockButton.setAvailable(false);

        const result = await APIMediator.watchRewardedVideo('button:puzzles:unlock');
        if (result) {
            if (this._activeSceneName) {
                SceneManager.getInstance().unlockScene(this._activeSceneName);
                SceneManager.getInstance().setScene(this._activeSceneName);
                LocalStorageController.save();
                if (this._activePuzzlePage) {
                    this._activePuzzlePage.emitStars(this._activePuzzlePage.getPosition());
                }
                Utils.wait(600).then(() => this._exit());
            }
        }
        this.rewardedUnlockButton.setAvailable(true);
    }

    _onFreeUnlockPressed() {
        if (this._activeSceneName) {
            SceneManager.getInstance().unlockScene(this._activeSceneName);
            SceneManager.getInstance().setScene(this._activeSceneName);
            LocalStorageController.save();
            if (this._activePuzzlePage) {
                this._activePuzzlePage.emitStars(this._activePuzzlePage.getPosition());
            }
            Utils.wait(600).then(() => this._exit());
        }
    }

    _onNoPressed() {
        this._exit();
    }


    _exit() {
        UIController.getInstance().hide(Constants.Screens.PUZZLE);
        this.app.fire(EventTypes.PUZZLE_UNLOCK_POPUP_CLOSED);
    }

    update(dt) {

    }

}

pc.registerScript(PopupPuzzle, 'popupPuzzle');

// Popup_DailyChallengePresenter.js
class PopupDailyChallengePresenter extends BaseWindow {

    initialize() {
        super.initialize();

        this.overlay = this.entity.findByName('Overlay');

        this.buttonClose = this.entity.findByName('CloseButton');
        this.headingStripe = this.entity.findByName('HeadingStripe');
        this.headingText = this.entity.findByName('HeadingText');
        this._headingTextColor = this.headingText.element.color.clone();

        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this.rewardedPlayButton = this.buttonsContainer.findByName('RewardedPlayButton');
        this.freePlayButton = this.buttonsContainer.findByName('FreePlayButton');

        this.buttonClose.on(EventTypes.BUTTON_PRESSED, this.onClosePressed, this);
        this.rewardedPlayButton.on(EventTypes.BUTTON_PRESSED, this._onRewardedPlayPressed, this);
        this.freePlayButton.on(EventTypes.BUTTON_PRESSED, this._onFreePlayPressed, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        /* re-enabled overlay in case it's disabled since previous visit */
        this.overlay.enabled = true;

        /* heading text color */
        this.headingText.element.color = pc.Color.WHITE;
        const colorA = new pc.Color().copy(pc.Color.WHITE);
        const colorB = new pc.Color().copy(pc.Color.WHITE);
        let color = colorA;
        let currentColor = color;
        Utils.tweenColor(color, this._headingTextColor, 0.25, () => {
            currentColor = this.headingText.element.color === colorA ? colorB : colorA;
            currentColor.copy(color);
            this.headingText.element.color = currentColor;
        }, 0.9);


        this.buttonsContainer.enabled = false;
        this._showButtons(2000);

        this._showCharacter(1500);
    }

    _onAppeared() {

    }

    _showCharacter(delay) {
        Utils.wait(delay).then(() => {
            if (!this.entity.enabled) return; //this screen is already closed
            this.overlay.enabled = false;
            SkyboxManager.getInstance().removeSkybox();
            CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_PRESENTER);
            this.app.fire(EventTypes.CHANGE_LOCATION, Constants.Locations.DAILY_CHALLENGE_PRESENTER);
        });
    }


    _showButtons(delay) {
        Utils.wait(delay).then(() => {
            this._unlockButtons();
            APIMediator.checkRewardedVideoAvailability('button:dailychallenge:start').then(result => {
                this.rewardedPlayButton.enabled = result;
                this.freePlayButton.enabled = !result;

                this.buttonsContainer.enabled = true;
                this.buttonsContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            })
        });
    }

    async _onRewardedPlayPressed() {
        this._lockButtons();

        const result = await APIMediator.watchRewardedVideo('button:dailychallenge:start');
        if (result) {
            this.proceedToNextScreen();
        } else {
            this._unlockButtons();
        }
    }

    _onFreePlayPressed() {
        this._lockButtons();
        this.proceedToNextScreen();
    }

    _lockButtons() {
        this.rewardedPlayButton.setAvailable(false);
        this.freePlayButton.setAvailable(false);
    }

    _unlockButtons() {
        this.rewardedPlayButton.setAvailable(true);
        this.freePlayButton.setAvailable(true);
    }



    _onHide() {
        super._onHide();
    }

    update(dt) {
        if (this._justShown || this.app.frame % 30 === 0) {
            if (this.buttonsContainer.enabled) {
                APIMediator.checkRewardedVideoAvailability('button:dailychallenge:start').then(result => {
                    this.rewardedPlayButton.enabled = result;
                    this.freePlayButton.enabled = !result;
                });
            }
        }
    }


    onClosePressed() {
        UIController.getInstance().showWindowImmediately(Constants.Screens.MAIN_MENU);
    }

    async proceedToNextScreen() {
        DailyChallengeLocation.getInstance().loadAndShow();
    }
}

pc.registerScript(PopupDailyChallengePresenter, 'popupDailyChallengePresenter');

// DailyChallengePresenterLocation.js
var DailyChallengePresenterLocation = pc.createScript('dailyChallengePresenterLocation');


DailyChallengePresenterLocation.getInstance = function () {
    if (!DailyChallengePresenterLocation._instance) console.error('DailyChallengePresenterLocation is not initialized yet');
    return DailyChallengePresenterLocation._instance;
};


DailyChallengePresenterLocation.prototype.initialize = function () {
    DailyChallengePresenterLocation._app = this.app;
    if (!DailyChallengePresenterLocation._instance) {
        DailyChallengePresenterLocation._instance = this;
    }

    this.content = this.entity.findByName('Content');
    this.characterContainer = this.entity.findByName('CharacterContainer');
    this._activeSkinName = undefined;

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);

};

DailyChallengePresenterLocation.prototype.postInitialize = function () {
    this.hide();
}

DailyChallengePresenterLocation.prototype.show = function (delay = 0) {
    this.content.enabled = false;
    this.content.setLocalScale(0, 0, 0);

    const activePlayerSkin = SkinManager.getInstance().getActivePlayerSkin();
    const activePlayerSkinName = SkinManager.getInstance().getActivePlayerSkinName();
    this._equipPlayerSkin(activePlayerSkinName, activePlayerSkin);

    Utils.wait(delay).then(() => {
        this.content.enabled = true;
        this.content.tween(this.content.getLocalScale())
            .to(pc.Vec3.ONE, 0.35, pc.SineOut)
            .start();
    })
};

DailyChallengePresenterLocation.prototype.hide = function () {
    this.content.enabled = false;
};


DailyChallengePresenterLocation.prototype._equipPlayerSkin = function (name, skinData) {
    if (!this.entity.enabled) return;
    if (this._activeSkinName === name) return;

    this._activeSkinName = name;

    for (let i = this.characterContainer.children.length - 1; i > -1; i--) this.characterContainer.children[i].destroy();

    AssetsLoader.getInstance().loadByTag('skin_' + name).then(() => {
        const character = skinData.template.resource.instantiate();
        this.characterContainer.addChild(character);
        character.setLocalPosition(0, 0, 0);
        character.setLocalEulerAngles(0, 0, 0);
        character.setLocalScale(0.018, 0.018, 0.018);

        character.children.forEach(child => {
            if (child.render) {
                child.render.castShadows = false;
                child.render.castShadowsLightmap = false;
                child.render.receiveShadows = false;
            }
        });

        this.character = character;
    });
};



DailyChallengePresenterLocation.prototype.update = function (dt) {

};


// LayersHelper.js
class LayersHelper {

    static getInstance() {
        if (!LayersHelper._instance) LayersHelper._instance = new LayersHelper();
        return LayersHelper._instance;
    }

    constructor() {
        this.app = pc.AppBase.getApplication();
    }


    addLayer(layerName, entity, recursively = true) {
        if (entity.render) {
            const layers = entity.render.layers;
            const targetLayer = this.app.scene.layers.getLayerByName(layerName);
            if(!targetLayer) return;
            if (layers.indexOf(targetLayer.id) === -1) {
                layers.push(targetLayer.id);
                entity.render.layers = [...layers];
            }
        }
        if (recursively && entity.name !== 'metarig') entity.children.forEach(child => this.addLayer(layerName, child, recursively));

    }

    removeLayer(layerName, entity, recursively = true) {
        if (entity.render) {
            const layers = entity.render.layers;
            const targetLayer = this.app.scene.layers.getLayerByName(layerName);
            if(!targetLayer) return;
            const layerIndex = layers.indexOf(targetLayer.id);
            if (layerIndex !== -1) {
                // entity.render.layers = [targetLayer.id]; // hack?
                entity.render.layers = layers.filter(id => id !== targetLayer.id);
            }
        }
        if (recursively && entity.name !== 'metarig') entity.children.forEach(child => this.removeLayer(layerName, child, recursively));
    }
   
}

// SkyboxManager.js
var SkyboxManager = pc.createScript('skyboxManager');

SkyboxManager.getInstance = function () {
    if (!SkyboxManager._instance) console.error('DailyChallengePresenterLocation is not initialized yet');
    return SkyboxManager._instance;
};


SkyboxManager.prototype.initialize = function () {
    SkyboxManager._app = this.app;
    if (!SkyboxManager._instance) {
        SkyboxManager._instance = this;
    }

    this._originalSkybox = this.app.scene.skybox;

};

SkyboxManager.prototype.removeSkybox = function () {
    this.app.scene.skybox = undefined;
};


SkyboxManager.prototype.restoreOriginalSkybox = function () {
    this.app.scene.skybox = this._originalSkybox;
};




SkyboxManager.prototype.update = function (dt) {
    
}



// locationChanger.js
var LocationChanger = pc.createScript('locationChanger');

LocationChanger.attributes.add('hideOnStart', {
    title: 'Hidden on App Start',
    type: 'boolean',
    default: false
});

LocationChanger.prototype.initialize = function () {
    this.app.on(EventTypes.CHANGE_LOCATION, this._changeLocation, this);
    this.app.on(EventTypes.HIDE_LOCATION, this._onLocationHideRequested, this);
};

LocationChanger.prototype.postInitialize = function () {
    if (this.hideOnStart) {
        this._hideThisLocation();
    }
};

LocationChanger.prototype._changeLocation = function (code, hideOthers = true, ...args) {
    if (this.entity.name === code) {
        this._showThisLocation(...args);
    } else {
        if(hideOthers) {
            this._hideThisLocation(...args);
        }
    }
};

LocationChanger.prototype._onLocationHideRequested = function (code, ...args) {
    if (this.entity.name === code) {
        this._hideThisLocation(...args);
    }
};


LocationChanger.prototype._showThisLocation = function (...args) {
    if (!this.entity.show) {
        console.error('Location ' + this.entity.path + ' doesnt have show() method!');
        return;
    }
    this.entity.show(...args);
};

LocationChanger.prototype._hideThisLocation = function (...args) {
    if (!this.entity.hide) {
        console.error('Location ' + this.entity.path + ' doesnt have hide() method!');
        return;
    }
    this.entity.hide(...args);
};

LocationChanger.prototype.update = function (dt) {

};

// StageLocation.js
var StageLocation = pc.createScript('stageLocation');

StageLocation.prototype.initialize = function () {
    this.stageContent = this.entity.findByName('StageContent');

    this.scenesContainer = this.entity.findByName('Scenes');
    this._initialSceneLoaded = false;

    this.areasContainer = this.entity.findByName('Areas');
    this._areasContainerLocalScale = this.areasContainer.getLocalScale().clone();

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);

    this.app.on(EventTypes.SHOW_AUDIENCE_AREAS, this.showAreas, this);
    this.app.on(EventTypes.HIDE_AUDIENCE_AREAS, this.hideAreas, this);
    this.app.on(EventTypes.SET_SCENE, this.changeScene, this);
};

StageLocation.prototype.postInitialize = function () {
    this.hideAreas();
}

StageLocation.prototype.show = function () {
    this.stageContent.enabled = true;
};

StageLocation.prototype.hide = function () {
    this.stageContent.enabled = false;
};

StageLocation.prototype.showAreas = function () {
    this.areasContainer.enabled = true;
};

StageLocation.prototype.hideAreas = function () {
    this.areasContainer.enabled = false;
};

StageLocation.prototype.changeScene = function (sceneName) {
    if (this._currentScenename === sceneName) {
        console.warn('Scene ' + sceneName + ' already active');
        return;
    }

    this._currentScenename = sceneName;
    const sceneTemplate = SceneManager.getInstance().getSceneByName(sceneName);
    if (!sceneTemplate) return console.error('No scene template: ' + sceneName);

    AssetsLoader.getInstance().loadByTag('scene_' + this._currentScenename).then(() => {
        while (this.scenesContainer.children.length > 0) this.scenesContainer.children[this.scenesContainer.children.length - 1].destroy();

        try {
            const sceneInstance = sceneTemplate.template.resource.instantiate();
            this.scenesContainer.addChild(sceneInstance);
            sceneInstance.setLocalEulerAngles(pc.Vec3.ZERO);
            sceneInstance.setLocalPosition(pc.Vec3.ZERO);
            sceneInstance.setLocalScale(pc.Vec3.ONE);
            this._activeScene = sceneInstance;
        } catch (e) {
            console.warn('Can not instantiate scene template: ' + sceneTemplate.name, e);
        }

        this.app.fire(EventTypes.SCENE_CHANGED, sceneName);
    });
};

StageLocation.prototype.update = function (dt) {

};


// DailyChallengeLocation.js
var DailyChallengeLocation = pc.createScript('dailyChallengeLocation');

DailyChallengeLocation.attributes.add('numConetstants', {
    type: 'number',
    default: 24
});


DailyChallengeLocation.getInstance = function () {
    if (!DailyChallengeLocation._instance) console.error('DailyChallengeLocation is not initialized yet');
    return DailyChallengeLocation._instance;
};


DailyChallengeLocation.prototype.initialize = function () {
    DailyChallengeLocation._app = this.app;
    if (!DailyChallengeLocation._instance) {
        DailyChallengeLocation._instance = this;
    }

    this._roundCamera = CameraController.getInstance().getCameraByName(Constants.Cameras.DAILY_CHALLENGE);
    this._roundCameraOriginalPosition = this._roundCamera.getPosition().clone();
    this._roundCameraOriginalRotation = this._roundCamera.getRotation().clone();

    this._dailyChallengeID = 0;

    this.content = this.entity.findByName('Content');
    this.contestantsContainer = this.entity.findByName('Contestants');
    this.roomsContainer = this.entity.findByName('Rooms');
    this.rooms = [];
    this.finalRoom = null;
    this.roomsCreated = false;
    this.contestants = [];
    this.aliveContestants = [];
    this.playerContestant = null;
    this.playerAlive = true;
    this.opponentsContestants = [];

    this.question = null;
    this.answers = [];
    this.playerAnswer = null;
    this.correctAnswerIndex = -1;

    this.roundActive = false;
    this.roundCompleted = false;
    this.roundIndex = 0;
    this.roundTimeLeft = GameConfig.getAttribute('dailyChallenge', 'answerTimeFirstRound');
    this.roundDuration = GameConfig.getAttribute('dailyChallenge', 'answerTimeFirstRound');

    this.entity.show = this.show.bind(this);
    this.entity.hide = this.hide.bind(this);
};


DailyChallengeLocation.prototype.show = async function () {
    this._locationActive = true;
    this.content.enabled = true;
    this.content.setLocalPosition(pc.Vec3.ZERO);

    this._roundCamera.setPosition(this._roundCameraOriginalPosition);
    this._roundCamera.setRotation(this._roundCameraOriginalRotation);

    this._clearContestants();
    this.playerAnswer = null;
    this.playerAlive = true;
    this.roundIndex = 0;

    await Promise.all([
        this._createRooms(),
        this._createContestants()
    ]);

    this.rooms.forEach(room => room.reset());
    this._tweenSafeLockerAppearing();

    this.app.fire(EventTypes.DAILY_CHALLENGE_LOCATION_READY);
};

DailyChallengeLocation.prototype.loadAndShow = async function () {
    await LoadingOverlay.show({ color: '#FAC200' });

    UIController.getInstance().hideAllImmediately();

    if (this._locationActive) {
        this.exit();
    }

    await Promise.all([
        Utils.wait(500),
        AssetsLoader.getInstance().loadByTag('daily_challenge')
    ]);

    SkyboxManager.getInstance().removeSkybox();
    this.app.fire(EventTypes.CHANGE_LOCATION, Constants.Locations.DAILY_CHALLENGE);

    this.app.once(EventTypes.DAILY_CHALLENGE_LOCATION_READY, () => {
        UIController.getInstance().showWindow(Constants.Screens.DAILY_CHALLENGE_INTRO);
        CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_INTRO);
        LoadingOverlay.hide({ color: '#FAC200' });
    });
};


DailyChallengeLocation.prototype.isDailyChallengeBeingPlayed = function () {
    return this.roundActive;
};

DailyChallengeLocation.prototype.getActiveRoom = function () {
    return this.rooms[this.roundIndex];
};

DailyChallengeLocation.prototype.hide = function () {
    if (this._locationActive) {
        this.exit();
    }

    this.content.enabled = false;
    this.roundActive = false;
    this.roundCompleted = true;
    this._locationActive = false;
};

DailyChallengeLocation.prototype.exit = function () {
    this._clearContestants();
    this._clearRooms();

    this.playerAnswer = null;
    this.playerAlive = true;
    this.roundIndex = 0;
    this.answers = [];
};


DailyChallengeLocation.prototype.startChallenge = async function () {
    await APIMediator.gameStart();

    this._dailyChallengeID += 1;
    this.rooms.forEach(room => {
        if (room !== this.getActiveRoom()) room.fadeOut();
    });
    this.startRound();
    this.getActiveRoom().enter();
};

DailyChallengeLocation.prototype.loadNextRound = function () {
    if (this.roundIndex < GameConfig.getAttribute('dailyChallenge', 'rounds') - 1) {
        this.roundIndex = this.roundIndex + 1;
        return true;
    } else {
        return false;
    }
};

DailyChallengeLocation.prototype.startRound = function () {
    this.playerAnswer = null;
    this.roundCompleted = false;
    this.roundDuration = GameConfig.getAttribute('dailyChallenge', (this._dailyChallengeID < 2) ? 'answerTimeFirstRound' : 'answerTime');
    this.roundTimeLeft = this.roundDuration;
    this.correctAnswerIndex = -1;

    /* prepare question */
    this._prepareQuestion();

    /* show round UI */
    UIController.getInstance().showWindow(Constants.Screens.DAILY_CHALLENGE_ROUND);

    /* when all buttons appeared, start the timer */
    Utils.wait(2000).then(() => {
        this.roundActive = true;
    });
};

DailyChallengeLocation.prototype.quitDailyChallenge = function () {
    if (this.isDailyChallengeBeingPlayed()) {
        UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
            fadeInDuration: 0.15,
            fadeOutDuration: 0.85,
            callback: () => {
                this.hide();
            }
        });
        return true;
    } else {
        return false;
    }
};

DailyChallengeLocation.prototype.getQuestionText = function () {
    return this.question.questionText;
};

DailyChallengeLocation.prototype.getAnswerByID = function (buttonID) {
    return this.answers[buttonID];
};

DailyChallengeLocation.prototype.getDoorByID = function (doorID) {
    return this.getActiveRoom().getDoorByID(doorID);
};

DailyChallengeLocation.prototype.showAnswerContent = function (index) {
    if (!this.roomsCreated) return;
    this.getActiveRoom().showArea(index);
};

DailyChallengeLocation.prototype.selectAnswer = function (buttonIndex) {
    this.playerAnswer = this.answers.find(a => a.buttonIndex === buttonIndex);
    if (this.playerAnswer) {
        this.app.fire(EventTypes.DAILY_CHALLENGE_ON_ANSWER_SELECTED, buttonIndex);
    } else {
        console.log('[Daily Challenge] no answer with button index ' + buttonIndex);
    }
};


DailyChallengeLocation.prototype.update = function (dt) {
    if (this.roundActive) {
        this.roundTimeLeft = Math.max(this.roundTimeLeft - dt, 0);
        this.app.fire(EventTypes.DAILY_CHALLENGE_ROUND_TIMER_UPDATED, this.roundTimeLeft, 1 - this.roundTimeLeft / this.roundDuration);
        if (this.roundTimeLeft === 0 && !this.roundCompleted) {
            this.app.fire(EventTypes.DAILY_CHALLENGE_ROUND_TIMER_FINISHED);
            this._finishRound();
        }
    }
};


/** private **/
DailyChallengeLocation.prototype._finishRound = async function () {
    this.roundCompleted = true;
    this.roundActive = false;

    await this._moveContestantsToTheirDoors();

    await Utils.wait(1000);

    this.app.fire(EventTypes.DAILY_CHALLENGE_REVEAL_CORRECT_ANSWER, this.answers.find(a => a.isCorrect).buttonIndex);

    this.getActiveRoom().focusLightsAtCorrectDoors();
    this.getActiveRoom().openDoors();
    this.getActiveRoom().removeBackWall();

    this._applyContestantPunishmentsAndRewards();

    await Utils.wait(GameConfig.getAttribute('dailyChallenge', 'firethrowersDuration') * 1000);

    await UIController.getInstance().hide(Constants.Screens.DAILY_CHALLENGE_ROUND);

    if (!this.playerAlive) {
        this._onPlayerDied();
        return;
    }

    if (!this.playerAnswer) {
        this._onTimeOut();
        return;
    }

    const nextRoom = this._unlockNextRoom();
    const prevRoom = this.getActiveRoom();

    if (nextRoom) {
        prevRoom.fadeLights();
        nextRoom.enter();
        prevRoom.exit(2000);

        this._moveCameraToNextRoom(nextRoom, 2000);
        await this._moveContestantsToNextRoom(nextRoom);
    }

    const nextRoundReady = this.loadNextRound();
    if (nextRoundReady) {
        this.startRound();
    } else {
        this._launchEndRoom();
    }
};


DailyChallengeLocation.prototype._prepareQuestion = function () {
    const questionDifficulty = GameConfig.getAttribute('dailyChallenge', 'questionDifficulties')[this.roundIndex];
    const questionDifficultyValues = [questionDifficulty.x, questionDifficulty.y, questionDifficulty.z];

    this.question = QuestionsManager.getInstance().getNextQuestion();
    this.question.initialize();

    const answersList = this.question.answers.slice();
    let _totalPercent = 0;

    this.answers = [];
    for (let i = 0; i < 3; i++) {
        const _answerIndex = Math.min(answersList.length - 1, Math.floor(answersList.length * questionDifficultyValues[i]));
        let _answer = answersList.splice(_answerIndex, 1)[0];
        const dcAnswer = new DailyChallengeAnswer(i, _answer);
        _totalPercent += dcAnswer.percent;
        this.answers.push(dcAnswer);
    }

    /* shuffle answers */
    Utils.shuffle(this.answers);

    /* normalize percent */
    let factor = 100 / _totalPercent;
    _totalPercent = 0;
    let _maxPoints = 0;
    let _correctAnswer = null;
    let _aiAnswerSum = 0;
    for (let dcAnswer of this.answers) {
        dcAnswer.percent = Math.floor(dcAnswer.percent * factor);
        _totalPercent += dcAnswer.percent;
        if (dcAnswer.percent >= _maxPoints) {
            _maxPoints = dcAnswer.percent;
            _correctAnswer = dcAnswer;
        }
        dcAnswer.aiAnswerPercent = Math.round(GameConfig.getAttribute('dailyChallenge', 'aiAnswerCurve').value(dcAnswer.percent / 100));
        _aiAnswerSum += dcAnswer.aiAnswerPercent;
    }

    let missingPercent = 100 - _totalPercent;
    _correctAnswer.setCorrect(true);
    _correctAnswer.percent += missingPercent;
    this.correctAnswerIndex = this.answers.indexOf(_correctAnswer);

    /* ai percentage */
    _totalPercent = 0;
    let _prevTotalPercent = 0;
    factor = 100 / _aiAnswerSum;
    for (let dcAnswer of this.answers) {
        dcAnswer.aiAnswerPercent = dcAnswer.aiAnswerPercent * factor;
        _totalPercent += dcAnswer.aiAnswerPercent;
        dcAnswer.setAnswerPercentRange(_prevTotalPercent, _totalPercent);
        _prevTotalPercent = _totalPercent;
    }


    this.answers.forEach((answer, index) => {
        answer.linkButton(index);
        answer.linkDoor(this.getDoorByID(index));
    });

    /* prepare doors */
    this.getActiveRoom().setCorrectDoorIndex(this.correctAnswerIndex);
};


DailyChallengeLocation.prototype._createRooms = function () {
    return new Promise((resolve, reject) => {
        if (this.roomsCreated) {
            resolve();
            return;
        }

        const loadingPromises = [];

        for (let i = 0; i < GameConfig.getAttribute('dailyChallenge', 'rounds'); i++) {
            const room = TemplateManager.getInstance().instantiate('Room');
            this.roomsContainer.addChild(room);
            room.init(this.rooms.length);
            this.rooms.push(room);
            room.setLocalPosition(0, -0.005 * i, 20 * i);
        }

        const finalRoom = TemplateManager.getInstance().instantiate('FinalRoom');
        this.roomsContainer.addChild(finalRoom);
        finalRoom.init(this.rooms.length);
        finalRoom.setLocalPosition(0, 0, 20 * this.rooms.length);
        this.rooms.push(finalRoom);
        this.finalRoom = finalRoom;


        /* load everything */
        Promise.all(loadingPromises).then(() => {
            this.roomsCreated = true;
            resolve();
        });
    });
};



DailyChallengeLocation.prototype._clearRooms = function () {
    while (this.rooms.length > 0) {
        const room = this.rooms.pop();
        room.destroy();
    }

    this.rooms = [];
    this.roomsCreated = false;
};


DailyChallengeLocation.prototype._createContestants = function () {
    return new Promise((resolve, reject) => {

        const loadingPromises = [];

        const positions = this.getActiveRoom().getContestantPositions();

        /* spawn player */
        const playerContestantData = new ContestantData(
            Constants.Contestants.PLAYER,
            DataManager.getInstance().username || "You",
            DataManager.getInstance().playerColor,
            SkinManager.getInstance().getActivePlayerSkin()
        );
        this.playerContestant = this._spawnDefaultContestant();
        this.playerContestant.setPosition(Utils.removeRandomItem(positions));
        this.playerContestant.showDailyChallengeName();
        loadingPromises.push(this.playerContestant.setFromContestantData(playerContestantData));


        /* spawn opponents */
        const numOpponents = this.numConetstants - 1;
        const opponentColorsList = Utils.shuffle(GameConfig.getAttribute('opponentColors').slice());
        const opponentNames = Utils.shuffle(LocalizationManager.getInstance().getPlayerNames());
        for (let i = 0; i < numOpponents; i++) {

            const opponentContestantData = new ContestantData(
                Constants.Contestants.OPPONENT,
                opponentNames[i % opponentNames.length],
                opponentColorsList[i % opponentColorsList.length],
                SkinManager.getInstance().getRandomDailyChallengeOpponentSkin() //SkinManager.getInstance().getSkinByName('Default') //TODO use random skin: SkinManager.getInstance().getRandomSkin()
            );
            const opponentContestant = this._spawnDefaultContestant();
            this.opponentsContestants.push(opponentContestant);
            opponentContestant.setPosition(Utils.removeRandomItem(positions));
            loadingPromises.push(opponentContestant.setFromContestantData(opponentContestantData));
        }

        /* load everything */
        Promise.all(loadingPromises).then(() => {
            resolve();
        });
    });
};


DailyChallengeLocation.prototype._clearContestants = function () {
    while (this.contestants.length > 0) {
        const contestant = this.contestants.pop();
        contestant.destroy();
    }
    this.playerContestant = null;
    this.opponentsContestants = [];
    this.aliveContestants = [];
};


DailyChallengeLocation.prototype._spawnDefaultContestant = function () {
    const contestant = TemplateManager.getInstance().instantiate('ContestantPlayer');
    this.contestantsContainer.addChild(contestant);
    contestant.setDefaultSkinScale(0.01);
    contestant.setYaw(0, true);
    contestant.setGravityEnabled(false);
    this.contestants.push(contestant);
    this.aliveContestants.push(contestant);
    return contestant;
};



DailyChallengeLocation.prototype._moveContestantsToTheirDoors = function () {
    return new Promise((resolve, reject) => {
        const promises = [];

        const sortedAliveContestants = Utils.shuffle(this.aliveContestants.filter(contestant => contestant !== this.playerContestant));
        sortedAliveContestants.forEach((contestant, index) => {
            const weightValue = index / (sortedAliveContestants.length - 1) * 100;
            const selectedDoor = this._pickOpponentDoors(weightValue)
            promises.push(this._moveContestantToDoorArea(contestant, selectedDoor, pc.math.random(0, 0.5)))
        });

        if (this.aliveContestants.indexOf(this.playerContestant) !== -1) {
            if (this.playerAnswer) {
                promises.push(this._moveContestantToDoorArea(this.playerContestant, this.playerAnswer.door, pc.math.random(0, 0.5)))
            } else {
                // console.log('player didnt select an answer!');
            }
        } else {
            // console.log('player is already dead');
        }

        Promise.all(promises).then(() => resolve());
    })
};

DailyChallengeLocation.prototype._moveContestantsToNextRoom = function (room) {
    return new Promise((resolve, reject) => {
        const promises = [];

        const correctDoor = this.getActiveRoom().getCorrectDoor();
        const correctDoorPosition = correctDoor.getPosition();
        const sortedAliveContestants = Utils.shuffle(this.aliveContestants.slice());
        sortedAliveContestants.forEach((contestant, index) => {

            const afterDoorPosition = correctDoorPosition.clone();
            afterDoorPosition.x += pc.math.random(-1.5, 1.5);
            afterDoorPosition.z += pc.math.random(1.5, 3);

            const landingPoint = room.getRandomLandingPoint();
            const landingPosition = landingPoint.getPosition();

            promises.push(new Promise(async (_resolve, _reject) => {
                // contestant.setYaw(0);
                await contestant.moveToPosition(afterDoorPosition)
                await contestant.moveToPosition(landingPosition);
                contestant.setTrigger('idle');
                _resolve();

            }));
        });

        Promise.all(promises).then(() => resolve());
    })
};

DailyChallengeLocation.prototype._applyContestantPunishmentsAndRewards = function () {
    this.getActiveRoom().getAllDoors().forEach(door => {
        const contestants = door.getContestants();
        if (door.isCorrectDoor()) {
            for (let contestant of contestants) {
                Utils.wait(pc.math.random(0, 1000)).then(() => {
                    contestant.setTrigger('dcRoundVictory');
                });
            }
        } else {
            for (let contestant of contestants) {
                if (this.aliveContestants.indexOf(contestant) !== -1) this.aliveContestants.splice(this.aliveContestants.indexOf(contestant), 1);
                if (contestant === this.playerContestant) this.playerAlive = false;
                this.getActiveRoom().deadContestants.push(contestant);
                Utils.wait(pc.math.random(0, 250)).then(() => {
                    contestant.setTrigger('dieFire');
                    Utils.wait(pc.math.random(500, 1000)).then(() => {
                        contestant.setTrigger('dieDefault');
                        /* lift the body a bit */
                        const localPosition = contestant.getLocalPosition();
                        contestant.tween(localPosition)
                            .to({ y: localPosition.y + 0.25 }, 0.5, pc.SineOut)
                            .start();
                    });
                });
            }
        }
    })
};

DailyChallengeLocation.prototype._unlockNextRoom = function () {
    if (this.roundIndex < GameConfig.getAttribute('dailyChallenge', 'rounds')) {
        const nextRoomIndex = this.roundIndex + 1;
        this.rooms[nextRoomIndex].fadeIn();
        return this.rooms[nextRoomIndex];
    }
    return null;
};

DailyChallengeLocation.prototype._moveCameraToNextRoom = function (nextRoom, duration) {
    if (nextRoom.isFinalRoom()) {
        CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_TRANSITION_VICTORY).then(() => {
            CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_VICTORY);
        });

    } else {
        const initialLocalPosition = Utils.worldToLocalPosition(this._roundCamera, this._roundCameraOriginalPosition);
        this._roundCamera.tween(this._roundCamera.getLocalPosition())
            .to({ z: initialLocalPosition.z + nextRoom.getLocalPosition().z }, duration / 1000, pc.SineInOut)
            .start();
    }
};

DailyChallengeLocation.prototype._pickOpponentDoors = function (answerWeightValue) {
    for (let iAnswer of this.answers) {
        if (iAnswer.checkAnswerPercentRangeContains(answerWeightValue)) {
            return iAnswer.door;
        }
    }
    return this.answers[0].door;
};

DailyChallengeLocation.prototype._moveContestantToDoorArea = async function (contestant, selectedDoor, delay) {
    await Utils.wait(delay * 1000)
    const targetAreaPoint = selectedDoor.getFirstEmptyAreaPoint();
    selectedDoor.addContestantToAreaPoint(contestant, targetAreaPoint);

    await contestant.moveToPosition(targetAreaPoint.getPosition());
    contestant.setTrigger('idle');
    contestant.setYaw(180);

    return true;
};


DailyChallengeLocation.prototype._tweenSafeLockerAppearing = function () {
    const safeLockerContainer = this.finalRoom.findByName('SafeLockerContainer');
    safeLockerContainer.setLocalScale(pc.Vec3.ZERO);
    safeLockerContainer.tween(safeLockerContainer.getLocalScale())
        .to(pc.Vec3.ONE, 0.55, pc.BackOut)
        .delay(0.25)
        .start();
};


DailyChallengeLocation.prototype._tweenSafeLockerOpening = function () {
    const safeLockerContainer = this.finalRoom.findByName('SafeLockerContainer');
    const safeLockerDoor = safeLockerContainer.findByName('SafeLockerDoor');
    safeLockerDoor.tween(safeLockerDoor.getLocalEulerAngles())
        .rotate({ x: 0, y: 135, z: 0 }, 0.35, pc.BackOut)
        .start();

    Utils.wait(100).then(() => {
        const safeLockerParticles = safeLockerContainer.findByName('SafeLockerParticles');
        safeLockerParticles.children.forEach(child => {
            child.particlesystem.reset();
            child.particlesystem.play();
        })
    });
};


DailyChallengeLocation.prototype._onPlayerDied = function () {
    this.app.fire(EventTypes.DAILY_CHALLENGE_SET_DEFEAT_REASON, 'eliminated');
    UIController.getInstance().showWindow(Constants.Screens.DAILY_CHALLENGE_DEFEAT);
}


DailyChallengeLocation.prototype._onTimeOut = function () {
    this.app.fire(EventTypes.DAILY_CHALLENGE_SET_DEFEAT_REASON, 'timeout');
    UIController.getInstance().showWindow(Constants.Screens.DAILY_CHALLENGE_DEFEAT);
}


DailyChallengeLocation.prototype._launchEndRoom = function () {
    /* set round index */
    this.roundIndex = GameConfig.getAttribute('dailyChallenge', 'rounds') - 1;

    const safeLocker = this.finalRoom.findByName('SafeLocker');
    const safeLockerPosition = safeLocker.getPosition();

    this._tweenSafeLockerOpening();

    /* contestants applauses */
    this.aliveContestants.forEach((contestant, index) => {
        contestant.setYaw(Utils.getYawBetweenVectors(contestant.getPosition(), safeLockerPosition))
        Utils.wait(pc.math.random(75, 200)).then(() => contestant.setTrigger('dcFinalVictory'));
    });

    Utils.wait(1500).then(async () => {
        await APIMediator.gameComplete();
        UIController.getInstance().showWindow(Constants.Screens.DAILY_CHALLENGE_VICTORY);
    });
}






// Screen_DailyChallengeRound.js
class ScreenDailyChallengeRound extends BaseWindow {

    initialize() {
        super.initialize();

        this.questionContainer = this.entity.findByName('QuestionContainer');
        this.questionText = this.questionContainer.findByName('QuestionText');
        this.roundTimerMask = this.entity.findByName('RoundTimerMask');
        this.progressionCircle = this.entity.findByName('ProgressionCircle');
        this.iconTimerBackground = this.entity.findByName('IconTimerBackground');
        this.roundEndExplosion = this.entity.findByName('RoundEndExplosion');

        this.answersContainer = this.entity.findByName('AnswersContainer');
        this.answers = this.answersContainer.children;

        this.answerButtons = this.answers.map(a => a.findByName('AnswerButton'));
        this.answerButtonsOutlines = this.answerButtons.map(btn => btn.findByName('FaceOutline'));
        this.answerButtonsTexts = this.answerButtons.map(btn => btn.findByName('AnswerText'));
        this.answerButtonsCodes = this.answerButtons.map(btn => btn.findByName('AnswerCodeText'));
        this.answerButtonsCheckmarks = this.answerButtons.map(btn => btn.findByName('Checkmark'));

        this.answerPanels = this.answers.map(a => a.findByName('AnswerPanel'));
        this.answerFacesTexts = this.answerPanels.map(a => a.findByName('AnswerText'));
        this.answerFacesColored = this.answerPanels.map(a => a.findByName('FaceColored'));
        this.answerPercentageTextsColored = this.answerFacesColored.map(a => a.findByName('PercentageText'));
        this.answerFacesGray = this.answerPanels.map(a => a.findByName('FaceGray'));
        this.answerPercentageTextsGray = this.answerFacesGray.map(a => a.findByName('PercentageText'));

        this.app.on(EventTypes.DAILY_CHALLENGE_ROUND_TIMER_UPDATED, this.onRoundTimeUpdated, this);
        this.app.on(EventTypes.DAILY_CHALLENGE_ROUND_TIMER_FINISHED, this.onRoundTimerFinished, this);
        this.app.on(EventTypes.DAILY_CHALLENGE_ON_ANSWER_SELECTED, this.highlighAnswerGroup, this);
        this.app.on(EventTypes.DAILY_CHALLENGE_REVEAL_CORRECT_ANSWER, this.revealCorrectAnswer, this);

        this.answerButtons.forEach((answerButton, index) => {
            answerButton.on(EventTypes.BUTTON_PRESSED, () => this.onAnswerSelected(index), this);
        });

    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        this._lockButtons();

        this.questionText.element.text = DailyChallengeLocation.getInstance().getQuestionText();

        this.answers.forEach((answer, index) => {
            const dcAnswer = DailyChallengeLocation.getInstance().getAnswerByID(index);

            this.answerButtonsCheckmarks[index].enabled = false;
            this.answerButtonsCodes[index].enabled = true;
            this.answerButtonsOutlines[index].enabled = false;
            this.answerPercentageTextsColored[index].element.text = `${dcAnswer.percent}%`;
            this.answerPercentageTextsGray[index].element.text = `${dcAnswer.percent}%`;

            this.answerFacesTexts[index].element.text = dcAnswer.getAnswerText();
            this.answerButtonsTexts[index].element.text = dcAnswer.getAnswerText();

            answer.enabled = false;
        });

        this._particlesExploded = false;
        this.onRoundTimeUpdated(-1, 0);

        this.answers.forEach((answer, index) => {
            Utils.wait(500 + index * 750).then(() => {
                answer.enabled = true;
                answer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

                this.answerButtons.forEach(button => button.enabled = true);
                this.answerPanels.forEach(panel => panel.enabled = false);

                DailyChallengeLocation.getInstance().showAnswerContent(index);
            });
        })
    }

    _onAppeared() {
        this._unlockButtons();
    }

    _onHide() {
        super._onHide();
    }

    _lockButtons() {
        this.answerButtons.forEach(btn => btn.setAvailable(false));
    }

    _unlockButtons() {
        this.answerButtons.forEach(btn => btn.setAvailable(true));
    }

    onRoundTimeUpdated(time, progress) {
        this.roundTimerMask.setProgress(progress);
        if (progress > 0.75) {
            this.iconTimerBackground.element.color = pc.Color.RED;
            this.progressionCircle.element.color = pc.Color.RED;
        } else {
            this.iconTimerBackground.element.color = pc.Color.BLACK;
            this.progressionCircle.element.color = pc.Color.BLACK;
        }

        if(progress >= 1 && !this._particlesExploded) {
            this._particlesExploded = true;
            this.roundEndExplosion.particlesystem.reset();
            this.roundEndExplosion.particlesystem.play();
        }
    }

    onRoundTimerFinished() {
        this._lockButtons();
    }

    onAnswerSelected(buttonIndex) {
        DailyChallengeLocation.getInstance().selectAnswer(buttonIndex);
    }

    highlighAnswerGroup(buttonIndex) {
        this.answers.forEach((answer, i) => {
            if (i === buttonIndex) {
                this.answerButtonsOutlines[i].enabled = true;
                this.answerButtonsCodes[i].enabled = false;
                this.answerButtonsCheckmarks[i].enabled = true;
                this.answerButtonsCheckmarks[i].setLocalScale(1.6, 1.6, 1.6);
                this.answerButtonsCheckmarks[i].tween(this.answerButtonsCheckmarks[i].getLocalScale())
                    .to(pc.Vec3.ONE, 0.45, pc.BackOut)
                    .start();
            } else {
                this.answerButtonsOutlines[i].enabled = false;
                this.answerButtonsCodes[i].enabled = true;
                this.answerButtonsCheckmarks[i].enabled = false;
            }
        })
    }

    revealCorrectAnswer(buttonIndex) {
        this.answers.forEach((answer, i) => {
            this.answerButtons[i].enabled = false;
            this.answerPanels[i].enabled = true;
            let percentageText = null;
            if (i === buttonIndex) {
                this.answerFacesColored[i].enabled = true;
                this.answerFacesGray[i].enabled = false;
                this.answerPercentageTextsColored[i].enabled = true;
                this.answerPercentageTextsGray[i].enabled = false;
                percentageText = this.answerPercentageTextsColored[i];
            } else {
                this.answerFacesColored[i].enabled = false;
                this.answerFacesGray[i].enabled = true;
                this.answerPercentageTextsColored[i].enabled = false;
                this.answerPercentageTextsGray[i].enabled = true;
                percentageText = this.answerPercentageTextsGray[i];
            }

            percentageText.setLocalScale(1.75, 1.75, 1.75);
            percentageText.tween(percentageText.getLocalScale())
                .to(pc.Vec3.ONE, 0.45, pc.BackOut)
                .start();
        })
    }

    update(dt) {

    }

    proceedToNextScreen() {

    }

}

pc.registerScript(ScreenDailyChallengeRound, 'screenDailyChallengeRound');

// Screen_DailyChallengeIntro.js
class ScreenDailyChallengeIntro extends BaseWindow {

    initialize() {
        super.initialize();
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        SkyboxManager.getInstance().removeSkybox();

        this._tweenCameras().then(() => {

        })
    }

    async _tweenCameras() {
        await CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_INTRO);
        await CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_TRANSITION_A);
        await CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_TRANSITION_B);
        await CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE_TRANSITION_C);
        await CameraController.getInstance().changeCamera(Constants.Cameras.DAILY_CHALLENGE);

        this.proceedToNextScreen();
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
    }

    update(dt) {

    }

    proceedToNextScreen() {
        DailyChallengeLocation.getInstance().startChallenge();
    }

}

pc.registerScript(ScreenDailyChallengeIntro, 'screenDailyChallengeIntro');

// landscapeFov.js
var LandscapeFov = pc.createScript('landscapeFov');

LandscapeFov.attributes.add('minAspectRatio', {
    type: 'number',
    default: 0.5625
});

LandscapeFov.attributes.add('maxAspectRatio', {
    type: 'number',
    default: 1.5
});

LandscapeFov.attributes.add('startFov', {
    type: 'number',
    default: 30
});


LandscapeFov.attributes.add('endFov', {
    type: 'number',
    default: 30
});




LandscapeFov.prototype.initialize = function() {
    this.on('attr', this.onResizeCanvas, this);
    this.app.graphicsDevice.on('resizecanvas', this.onResizeCanvas, this);
    this.onResizeCanvas();
};

LandscapeFov.prototype.update = function(dt) {

};


LandscapeFov.prototype.onResizeCanvas = function () {
    this.entity.camera.horizontalFov = true;

    const height = this.app.graphicsDevice.height;
    const width = this.app.graphicsDevice.width;
    const aspectRatio = width / height;
    
    const clampedApectRatio = pc.math.clamp(aspectRatio, this.minAspectRatio, this.maxAspectRatio);
    const aspectRatioFactor = (clampedApectRatio - this.minAspectRatio) / (this.maxAspectRatio - this.minAspectRatio);

    if(aspectRatio >= this.maxAspectRatio) {
        this.entity.camera.fov = this.endFov * aspectRatio / this.maxAspectRatio;
    } else {
        this.entity.camera.fov = pc.math.lerp(this.startFov, this.endFov, aspectRatioFactor);
    }
};

// Popup_Username.js
class PopupUsername extends BaseWindow {

    initialize() {
        super.initialize();
        this._maxTextLength = 16;
        this._usernameText = "";
        this._cursorSymbol = '|';
        this._cursorVisible = false;

        this.overlay = this.entity.findByName('Overlay');

        this.usernamePlaceholder = this.entity.findByName('UsernamePlaceholder');
        this.usernameField = this.entity.findByName('UsernameField');

        this.app.on(EventTypes.TYPED_TEXT_CHANGED, this.onTypedTextChanged, this);
        this.app.on(EventTypes.KEYBOARD_SYMBOL_TYPED, this.onSymbolTyped, this);
        this.app.on(EventTypes.KEYBOARD_SPECIAL_KEY_PRESSED, this.onSpecialKeyPressed, this);

        BasicButton.assignAction(this.overlay, this.onClosePressed, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        this._cursorBlinkingInterval = setInterval(this._switchCursorVisibility.bind(this), 150);
        DataManager.getInstance().typedText = DataManager.getInstance().username || "";
    }

    _onAppeared() {

    }

    _onHide() {
        super._onHide();
        clearInterval(this._cursorBlinkingInterval);
        this._cursorBlinkingInterval = undefined;
    }


    onTypedTextChanged(textValue) {
        if (!this.entity.enabled) return;
        if (textValue && textValue.length > 0) {
            this.usernamePlaceholder.enabled = false;
            this.usernameField.enabled = true;
            this._setTextValue(textValue);
        } else {
            this.usernamePlaceholder.enabled = true;
            this.usernameField.enabled = true;
            this._setTextValue('');
        }
    }

    onSymbolTyped(typedSymbol) {
        if (!this.entity.enabled) return;
        DataManager.getInstance().typedText = "".concat(DataManager.getInstance().typedText, typedSymbol).replace(/[^\p{Letter}\p{Mark}\s-]+/gu, '').slice(0, this._maxTextLength);
    }


    onSpecialKeyPressed(specialKeyCode) {
        if (!this.entity.enabled) return;
        switch (specialKeyCode) {
            case "space":
                this.onSymbolTyped(" ");
                break;
            case "backspace":
                this.removeLastSymbol();
                break;
            case "enter":
                this.onEnterPressed();
                break;
            case "shift":
                this.onShiftToggled();
                break;
            case "digits_mode":
                this.app.fire(EventTypes.SWITCH_TO_SECONDARY_KEYBOARD);
                break;
            case "letters_mode":
                this.app.fire(EventTypes.SWITCH_TO_PRIMARY_KEYBOARD);
                break;
        }
    }



    _setTextValue(textValue) {
        this._usernameText = `${textValue}`;
        this.usernameField.element.text = `${this._usernameText.slice(0, this._maxTextLength)}${this._cursorVisible ? this._cursorSymbol : ' '}`;
    }

    _switchCursorVisibility() {
        this._cursorVisible = !this._cursorVisible;
        this._setTextValue(this._usernameText);
    }


    removeLastSymbol() {
        if (DataManager.getInstance().typedText.length > 0) {
            DataManager.getInstance().typedText = DataManager.getInstance().typedText.slice(0, -1);
        }
    }

    onShiftToggled() {
        DataManager.getInstance().uppercaseMode = !DataManager.getInstance().uppercaseMode;
    }

    onEnterPressed() {
        this.onClosePressed();
    }


    submitUsername() {
        if (DataManager.getInstance().typedText.length > 0) {
            DataManager.getInstance().username = DataManager.getInstance().typedText;
            LocalStorageController.save();
        }
    }


    update(dt) {

    }




    /* private */
    onClosePressed() {
        this.submitUsername();

        UIController.getInstance().hide(Constants.Screens.KEYBOARD);
        UIController.getInstance().hide(Constants.Screens.USERNAME);
    }
}

pc.registerScript(PopupUsername, 'popupUsername');

// Room.js
var Room = pc.createScript('room');

Room.attributes.add('isFinalRoom', {
    type: 'boolean',
    default: false
})


Room.prototype.initialize = function () {
    this.contenstantPositionsContainer = this.entity.findByName('ContestantsPositions');
    this.doorsContainer = this.entity.findByName('DoorsContainer');
    this.doorsGroups = this.doorsContainer.children.filter(door => !!door);
    this.targetLightsContainer = this.entity.findByName('TargetLightsContainer');
    this.targetLights = this.targetLightsContainer.children;
    this.tvShowLights = this.entity.findByName('TvShowLights');
    this.emptyLandingPoints = this.entity.findByName('ContestantsPositions').children.slice();
    this.treasureLights = this.isFinalRoom ? [...this.entity.findByName('LightFloorBottom').children.map(c => c.findByName('Light')), ...this.entity.findByName('LightFloorFront').children.map(c => c.findByName('Light'))] : [];
    this.entity.deadContestants = [];

    this.roomIndex = 0;
    this._targetLightAngularVelocity = 0;
    this._targetLightsSpinning = false;
    this._targetLightPhase = 0;


    this.entity.init = this._init.bind(this);
    this.entity.reset = this._reset.bind(this);
    this.entity.isFinalRoom = () => this.isFinalRoom;
    this.entity.getAllDoors = this._getAllDoors.bind(this);
    this.entity.getDoorByID = this._getDoorByID.bind(this);
    this.entity.getRandomLandingPoint = this._getRandomLandingPoint.bind(this);
    this.entity.fadeOut = this._fadeOut.bind(this);
    this.entity.fadeIn = this._fadeIn.bind(this);
    this.entity.showArea = this._showArea.bind(this);
    this.entity.getContestantPositions = this._getContestantPositions.bind(this);
    this.entity.openDoors = this._openDoors.bind(this);
    this.entity.setCorrectDoorIndex = this._setCorrectDoorIndex.bind(this);
    this.entity.getCorrectDoor = this._getCorrectDoor.bind(this);
    this.entity.removeBackWall = this._removeBackWall.bind(this);
    this.entity.fadeLights = this._fadeLights.bind(this);
    this.entity.focusLightsAtCorrectDoors = this._focusLightsAtCorrectDoors.bind(this);

    this.entity.enter = this._enter.bind(this);
    this.entity.exit = this._exit.bind(this);

};


Room.prototype._init = function (roomIndex) {
    this.roomIndex = roomIndex;
    this.targetLights.forEach(light => light.setLocalScale(pc.Vec3.ZERO));

    Utils.wait(pc.math.random(0, 2000)).then(() => {

        this._targetLightsSpinning = true;
        const initialDirection = Math.random() > 0.5 ? 1 : -1;
        this._targetLightAngularVelocity = 180 * initialDirection;
        this.entity.tween(this)
            .to({ _targetLightAngularVelocity: -180 * initialDirection }, 1.5, pc.SineInOut)
            .repeat(400, 2)
            .yoyo(true)
            .start();

        this.targetLights.forEach((light, index) => {
            light.tween(light.getLocalScale())
                .to({ x: 8, y: 1, z: 8 }, 0.25, pc.Linear)
                .start();

            const targetLocalPosition = light.getLocalPosition().clone();
            targetLocalPosition.x -= (index - 0.5) * 1.25;
            light.tween(light.getLocalPosition())
                .to(targetLocalPosition, 0.75, pc.SineInOut)
                .repeat(1000)
                .yoyo(true)
                .start();
        });
    });

    if (this.isFinalRoom) {
        this._initFinalRoomLights();
    }
};

Room.prototype._removeBackWall = function () {
    this.doorsGroups.forEach(door => door.removeBackWall());
};

Room.prototype._fadeLights = function () {
    this.doorsGroups.forEach(door => door.fadeLights());
};

Room.prototype._exit = function (delay = 0) {
    this.doorsGroups.forEach(door => door.hide());

    this.entity.fadeOut(1.0);

    while (this.entity.deadContestants.length > 0) {
        const contestant = this.entity.deadContestants.pop();
        const localPosition = contestant.getLocalPosition();
        contestant.tween(localPosition)
            .to({ y: localPosition.y - 1 }, delay / 4 / 1000, pc.Linear)
            .delay(delay / 4 / 1000)
            .start();
        contestant.tween(contestant.getLocalScale())
            .to(pc.Vec3.ZERO, delay / 4 / 1000, pc.Linear)
            .delay(delay / 4 / 1000)
            .onComplete(() => contestant.enabled = false)
            .start();
    };


    Utils.wait(delay).then(() => {
        this.app.stopAllTweens(this.entity);

        this.tvShowLights.tween(this.tvShowLights.getLocalPosition())
            .to({ y: 30 }, 0.35, pc.SineIn)
            .onComplete(() => this.tvShowLights.enabled = false)
            .start();

        Utils._tweenOpacityRecursive(this.entity, 0, 0.25);
        this.entity.tween(this.entity.getLocalPosition())
            .to({ y: -3 }, 0.25, pc.SineIn)
            .onComplete(() => this.entity.enabled = false)
            .start();
    });
};

Room.prototype._enter = function () {
    this.entity.fadeIn();

    if (this.isFinalRoom) {
        this._startFinalRoomLights();
    }
};


Room.prototype._reset = function () {
    this.doorsGroups.forEach(door => door.reset());
};

Room.prototype._getContestantPositions = function () {
    return this.contenstantPositionsContainer.children.map(c => c.getPosition());
};

Room.prototype._fadeOut = function (duration = 0.5) {
    Utils._fadeDiffuseRecursive(this.entity, 0.15, duration);
    if (this.isFinalRoom) this._disableFinalRoomLights();
};

Room.prototype._fadeIn = function (duration = 0.5) {
    Utils._fadeDiffuseRecursive(this.entity, 1, duration);
};

Room.prototype._setCorrectDoorIndex = function (doorIndex) {
    this.correctDoorIndex = doorIndex;
    this.doorsGroups.forEach((group, index) => group.setCorrectDoor(doorIndex === index));
};

Room.prototype._getCorrectDoor = function () {
    return this.doorsGroups[this.correctDoorIndex];
};

Room.prototype._showArea = function (areaIndex) {
    this.doorsGroups[areaIndex].appear();
};

Room.prototype._getDoorByID = function (id) {
    return this.doorsGroups[id];
};

Room.prototype._getAllDoors = function () {
    return this.doorsGroups;
};

Room.prototype._openDoors = function (delay = 0) {
    if (this.isFinalRoom) return;
    this.doorsGroups.forEach(group => group.openDoor(delay));
};

Room.prototype._focusLightsAtCorrectDoors = function () {
    if (this.isFinalRoom) return;
    const door = this.doorsGroups[this.correctDoorIndex];
    this.targetLights.forEach((light, index) => {
        const targetLocalPosition = light.getLocalPosition().clone();
        targetLocalPosition.x = (index - 0.5) * 1.8;
        this.app.stopAllTweens(light);
        light.tween(light.getLocalPosition())
            .to(targetLocalPosition, 0.5, pc.SineOut)
            .start();
    });

    const zonePosition = door.findByName('Area').getPosition();
    const targetLocalPosition = Utils.worldToLocalPosition(this.targetLightsContainer, zonePosition);
    this.app.stopAllTweens(this.targetLightsContainer);
    this.targetLightsContainer.tween(this.targetLightsContainer.getLocalPosition())
        .to(targetLocalPosition, 0.5, pc.CubicOut)
        .start();

    this.entity.tween(this)
        .to({ _targetLightAngularVelocity: 0 }, 0.5, pc.Linear)
        .onComplete(() => this._targetLightsSpinning = false)
        .start();
};

Room.prototype._getRandomLandingPoint = function () {
    return Utils.removeRandomItem(this.emptyLandingPoints);
};

Room.prototype._initFinalRoomLights = function () {
    this.treasureLights.forEach((light, index) => {
        light.render.meshInstances.forEach(mi => {
            if (mi.material.emissive.equals(pc.Color.WHITE)) {
                mi.material = mi.material.clone();
                mi.material.emissive = new pc.Color().fromString("#FEFEFE");
                mi.material.update();
            }
            mi.setParameter('material_emissive', [1, 1, 1]);
            mi.setParameter('material_emissiveIntensity', 1.0);
        });
    });
};

Room.prototype._disableFinalRoomLights = function () {
    this.treasureLights.forEach((light, index) => {
        light.render.meshInstances.forEach(mi => {
            mi.__emissiveIntensity = mi.__emissiveIntensity || mi.__originalEmissiveIntensity;
            light.tween(mi)
                .to({ __emissiveIntensity: 0 }, 0.15, pc.Linear)
                .onUpdate(() => {
                    mi.setParameter('material_emissiveIntensity', mi.__emissiveIntensity);
                })
                .start();
        });
    });
};

Room.prototype._startFinalRoomLights = function () {
    const duration = 0.5;
    const itemDelay = 0.125;
    this.treasureLights.forEach((light, index) => {
        light.render.meshInstances.forEach(mi => {

            mi.setParameter('material_emissive', [1, 1, 1]);
            mi.setParameter('material_emissiveIntensity', 0);

            mi.__emissiveValues = new pc.Color().fromString('#FFDE00');
            const targetColor = { r: 1, g: 1, b: 1 }
            light.tween(mi.__emissiveValues)
                .to(targetColor, duration, pc.Linear)
                .delay(itemDelay * index)
                .repeat(200)
                .yoyo(true)
                .onUpdate(() => {
                    mi.setParameter('material_emissive', [mi.__emissiveValues.r, mi.__emissiveValues.g, mi.__emissiveValues.b]);
                })
                .start();


            if (!mi.__originalEmissiveIntensity) mi.__originalEmissiveIntensity = 0;
            mi.__emissiveIntensity = mi.__emissiveIntensity || mi.__originalEmissiveIntensity;
            light.tween(mi)
                .to({ __emissiveIntensity: 1 }, duration, pc.SineIn)
                .delay(itemDelay * (index % 4))
                .repeat(200)
                .yoyo(true)
                .onUpdate(() => {
                    mi.setParameter('material_emissiveIntensity', mi.__emissiveIntensity);
                })
                .start();
        })
    });
};

Room.prototype.update = function (dt) {
    if (this._targetLightsSpinning) {
        this.targetLightsContainer.rotateLocal(0, this._targetLightAngularVelocity * dt, 0);
        this._targetLightPhase += dt * 1.5;
        this.targetLightsContainer.setLocalPosition(3.75 * Math.sin(this._targetLightPhase), 0, -0.75 + 2.5 * Math.cos(this._targetLightPhase));
    }
};

// doorGroup.js
var DoorGroup = pc.createScript('doorGroup');

DoorGroup.prototype.initialize = function () {
    this.letterInnerGroup = this.entity.findByName('LetterInnerGroup')
    this.area = this.entity.findByName('Area');
    this.areaPointsContainer = this.entity.findByName('DailyChallengeAreaPoints');
    this.doorBackWall = this.entity.findByName('DoorBack');
    this.doorHingeLeft = this.entity.findByName('HingeA');
    this.doorHingeRight = this.entity.findByName('HingeB');
    this.stopSign = this.entity.findByName('StopSign');

    this.flameThrowersContainer = this.entity.findByName('FlameThrowersContainer');
    this.floorFiresContainer = this.entity.findByName('FloorFiresContainer');
    this.winnerParticlesContainer = this.entity.findByName('WinnerParticlesContainer');

    this.areaPoints = this.areaPointsContainer.children;
    this.emptyAreaPoints = this.areaPoints.slice();

    this.contestants = [];

    /* data */
    this.isCorrectDoor = false;

    this.entity.reset = this._reset.bind(this);
    this.entity.appear = this._appear.bind(this);
    this.entity.getContestants = this._getContestants.bind(this);
    this.entity.openDoor = this._openDoor.bind(this);
    this.entity.setCorrectDoor = this._setCorrectDoor.bind(this);
    this.entity.isCorrectDoor = this._isCorrecDoor.bind(this);
    this.entity.removeBackWall = this._removeBackWall.bind(this);
    this.entity.getFirstEmptyAreaPoint = this._getFirstEmptyAreaPoint.bind(this);
    this.entity.addContestantToAreaPoint = this._addContestantToAreaPoint.bind(this);
    this.entity.fadeLights = this._fadeLights.bind(this);
    this.entity.hide = this._hide.bind(this);

    this._sortAreaPoints();
};

DoorGroup.prototype._reset = function () {
    this.letterInnerGroup.setLocalScale(pc.Vec3.ZERO);
    this.area.setLocalScale(pc.Vec3.ZERO);
    this.doorHingeLeft.setLocalEulerAngles(0, 0, 0);
    this.doorHingeRight.setLocalEulerAngles(0, 0, 0);
    this.stopSign.enabled = false;
};

DoorGroup.prototype._setCorrectDoor = function (isCorrectDoor) {
    this.isCorrectDoor = isCorrectDoor;
};

DoorGroup.prototype._isCorrecDoor = function () {
    return this.isCorrectDoor;
};

DoorGroup.prototype._getContestants = function () {
    return this.contestants;
}

DoorGroup.prototype._appear = function (duration = 1.0) {
    this.letterInnerGroup.setLocalScale(2, 2, 2);
    this.letterInnerGroup.children.forEach(child => {
        child.element.opacity = 0;
        child.tween(child.element)
            .to({ opacity: 1 }, duration * 0.4, pc.Linear)
            .start();
    });

    this.letterInnerGroup.tween(this.letterInnerGroup.getLocalScale())
        .to(pc.Vec3.ONE, duration, pc.BackOut)
        .start();


    this.area.setLocalScale(pc.Vec3.ZERO);
    this.area.tween(this.area.getLocalScale())
        .to(pc.Vec3.ONE, duration * 0.5, pc.BackOut)
        .delay(duration * 0.15)
        .start();

};


DoorGroup.prototype._openDoor = function (delay = 0) {
    this.doorHingeLeft.tween(this.doorHingeLeft.getLocalEulerAngles())
        .rotate({ x: 0, y: -120, z: 0 }, 0.5, pc.BackOut)
        .delay(delay)
        .start();

    this.doorHingeRight.tween(this.doorHingeRight.getLocalEulerAngles())
        .rotate({ x: 0, y: 120, z: 0 }, 0.5, pc.BackOut)
        .delay(delay)
        .start();

    if (this.isCorrectDoor) {
        this._emitParticles();
        this.stopSign.enabled = false;
    } else {
        this._startFirethrowers();
        this.stopSign.enabled = true;
    }
};


DoorGroup.prototype._emitParticles = function () {
    this.winnerParticlesContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.play();
    });
}

DoorGroup.prototype._startFirethrowers = function () {
    const firethrowersDuration = GameConfig.getAttribute('dailyChallenge', 'firethrowersDuration') * 1000;

    const firethrowers = this.flameThrowersContainer.children;
    firethrowers.forEach((firethrower, index) => {
        firethrower.children.forEach(child => {
            child.particlesystem.reset();
            child.particlesystem.play();

            Utils.wait(firethrowersDuration).then(() => {
                child.particlesystem.stop();
            });
        });
    });


    const groundFires = Utils.shuffle(this.floorFiresContainer.children.slice());
    groundFires.forEach((fireGroup, index) => {
        fireGroup.setLocalPosition(pc.math.random(-2, 2), 0, pc.math.random(-1.5, 1.5));
        Utils.wait(firethrowersDuration * (0.75 + pc.math.random(0, 0.25))).then(() => {
            fireGroup.children.forEach(child => {
                child.particlesystem.reset();
                child.particlesystem.play();
            })
        })
    });
}

DoorGroup.prototype._hide = function () {
    /* components */
    this.letterInnerGroup.children.forEach(child => {
        child.tween(child.element)
            .to({ opacity: 0 }, 0.3, pc.Linear)
            .start();
    });

    this.letterInnerGroup.tween(this.letterInnerGroup.getLocalScale())
        .to(pc.Vec3.ZERO, 0.5, pc.BackIn)
        .start();


    this.area.tween(this.area.getLocalScale())
        .to(pc.Vec3.ZERO, 0.35, pc.BackIn)
        .start();
}

DoorGroup.prototype._fadeLights = function () {
    /* particles */
    this.flameThrowersContainer.children.forEach((fire, index) => {
        fire.children.forEach(child => {
            child.particlesystem.stop();
        });
    });

    this.floorFiresContainer.children.forEach((fireGroup, index) => {
        fireGroup.children.forEach(child => {
            child.particlesystem.stop();
        });
    });
};


DoorGroup.prototype._removeBackWall = function () {
    if (this.isCorrectDoor) {
        Utils._tweenOpacityRecursive(this.doorBackWall, 0, 0.25);
    }
}

DoorGroup.prototype._getFirstEmptyAreaPoint = function () {
    const index = pc.math.clamp(Math.floor(this.emptyAreaPoints.length * Math.pow(Math.random(), GameConfig.getAttribute('dailyChallenge', 'areaPointSelectionPower'))), 0, this.emptyAreaPoints.length - 1);
    return this.emptyAreaPoints.splice(index, 1)[0];
}

DoorGroup.prototype._addContestantToAreaPoint = function (contestant, areaPoint) {
    areaPoint.occupantContestant = contestant;
    this.contestants.push(contestant);
};

DoorGroup.prototype._sortAreaPoints = function () {
    this.areaPoints.forEach(point => {
        point.translateLocal(pc.math.random(-0.15, 0.15), 0, pc.math.random(-0.15, 0.15));
        point._distanceToCenter = point.getLocalPosition().length()
    });
    this.areaPoints = this.areaPoints.sort((a, b) => a._distanceToCenter - b._distanceToCenter);
    this.emptyAreaPoints = this.areaPoints.slice();
};

DoorGroup.prototype.update = function (dt) {

};


// Popup_DailyChallengeDefeat.js
class PopupDailyChallengeDefeat extends BaseWindow {

    initialize() {
        super.initialize();

        this.overlay = this.entity.findByName('Overlay');

        this.textEliminated = this.entity.findByName('EliminatedText');
        this.textAnswerFaster = this.entity.findByName('AnswerFasterText');

        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this.noButton = this.buttonsContainer.findByName('NoButton');
        this.yesButtonRewarded = this.buttonsContainer.findByName('YesButtonRewarded');
        this.yesButtonFree = this.buttonsContainer.findByName('YesButton');

        this.noButton.on(EventTypes.BUTTON_PRESSED, this._onNoPressed, this);
        this.yesButtonRewarded.on(EventTypes.BUTTON_PRESSED, this._onYesRewardedPressed, this);
        this.yesButtonFree.on(EventTypes.BUTTON_PRESSED, this._onYesFreePressed, this);

        this.app.on(EventTypes.DAILY_CHALLENGE_SET_DEFEAT_REASON, this._setDefeatReason, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();
    }

    _onAppeared() {
        this._unlockButtons();
    }

    _setDefeatReason(reason) {
        if (reason === 'eliminated') {
            this.textEliminated.enabled = true;
            this.textAnswerFaster.enabled = false;
        } else {
            this.textEliminated.enabled = false;
            this.textAnswerFaster.enabled = true;
        }
    }

    async _onYesRewardedPressed() {
        this._lockButtons();

        const result = await APIMediator.watchRewardedVideo('button:dailychallenge:restart');
        if (result) {
            this.proceedToNextScreen();
        }
        this._unlockButtons();
    }

    _onYesFreePressed() {
        this._lockButtons();
        this.proceedToNextScreen();
    }

    async _onNoPressed() {
        await APIMediator.gameOver();

        this._lockButtons();
        UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
            inDuration: 0.075,
            outDuration: 0.25,
            callback: () => {
            }
        });
    };

    _lockButtons() {
        this.yesButtonRewarded.setAvailable(false);
        this.yesButtonFree.setAvailable(false);
        this.noButton.setAvailable(false);
    }

    _unlockButtons() {
        this.yesButtonRewarded.setAvailable(true);
        this.yesButtonFree.setAvailable(true);
        this.noButton.setAvailable(true);
    }


    proceedToNextScreen() {
        DailyChallengeLocation.getInstance().loadAndShow();
    }


    _onHide() {
        super._onHide();
    }


    update(dt) {
        if (this._justShown || this.app.frame % 30 === 0) {
            if (this.buttonsContainer.enabled) {
                APIMediator.checkRewardedVideoAvailability('button:dailychallenge:restart').then(result => {
                    if (result) {
                        this.yesButtonRewarded.enabled = true;
                        this.yesButtonFree.enabled = false;
                    } else {
                        this.yesButtonRewarded.enabled = false;
                        this.yesButtonFree.enabled = true;
                    }
                });
            }
        }
    }



}

pc.registerScript(PopupDailyChallengeDefeat, 'popupDailyChallengeDefeat');

// Popup_DailyChallengeVictory.js
class PopupDailyChallengeVictory extends BaseWindow {

    initialize() {
        super.initialize();

        this.rewardMoney = GameConfig.getAttribute('dailyChallenge', 'victoryReward');
        this.rewardMultiplier = 1;

        this.currencyCounter = this.entity.findByName('CurrencyCounterSmall');

        this.competeAgainContainer = this.entity.findByName('CompeteAgainContainer');
        this.competeAgainButtonsContainer = this.competeAgainContainer.findByName('ButtonsContainer');
        this.noButton = this.competeAgainButtonsContainer.findByName('NoButton');
        this.yesButtonRewarded = this.competeAgainButtonsContainer.findByName('YesButtonRewarded');
        this.yesButtonFree = this.competeAgainButtonsContainer.findByName('YesButton');

        this.prizeContainer = this.entity.findByName('PrizeContainer');
        this.prizeMoneyIcon = this.prizeContainer.findByName('IconMoney');
        this.prizeMoneyText = this.prizeContainer.findByName('MoneyText');

        this.doubleOfferContainer = this.entity.findByName('DoubleOfferContainer');
        this.buttonX2Rewarded = this.doubleOfferContainer.findByName('DoubleRewardButton');
        this.buttonNoThanks = this.doubleOfferContainer.findByName('ButtonNoThanks');

        this.buttonX2Rewarded.on(EventTypes.BUTTON_PRESSED, this._acceptDoubleReward, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this._declineDoubleReward, this);

        this.noButton.on(EventTypes.BUTTON_PRESSED, this._onNoPressed, this);
        this.yesButtonRewarded.on(EventTypes.BUTTON_PRESSED, this._onYesRewardedPressed, this);
        this.yesButtonFree.on(EventTypes.BUTTON_PRESSED, this._onYesFreePressed, this);
    }


    _initComponents() {
        super._initComponents();
    }

    _onShow() {
        super._onShow();

        this.currencyCounter.enabled = false;
        this.competeAgainContainer.enabled = false;
        this.doubleOfferContainer.enabled = false;

        this.rewardMoney = GameConfig.getAttribute('dailyChallenge', 'victoryReward');
        this.rewardMultiplier = 1;
        this.prizeMoneyText.element.text = `${this.rewardMoney * this.rewardMultiplier}`;
    }

    _onAppeared() {
        this._unlockButtons();

        APIMediator.checkRewardedVideoAvailability('button:dailychallenge:doublereward').then(result => {
            if (result) {
                this.doubleOfferContainer.enabled = true;
                this.doubleOfferContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            } else {
                this.claimReward().then(() => {
                    this._showCompeteAgainPopup();
                });
            }
        });
    }

    async _acceptDoubleReward() {
        this._lockButtons();
        const result = await APIMediator.watchRewardedVideo('button:dailychallenge:doublereward');
        if (result) {
            this.rewardMultiplier = 2;
            this.prizeMoneyText.element.text = `${this.rewardMoney * this.rewardMultiplier}`;
            this.claimReward().then(() => {
                this._showCompeteAgainPopup();
            });
        } else {
            this._unlockButtons();
        }

    }

    _declineDoubleReward() {
        this.rewardMultiplier = 1;

        this.claimReward().then(() => {
            this._showCompeteAgainPopup();
        });
    }

    claimReward() {
        return new Promise((resolve, reject) => {
            this._lockButtons();

            this.doubleOfferContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);

            Utils.wait(1000).then(() => {
                this.prizeContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
            });

            this.acquireReward(this.prizeMoneyIcon.getPosition(), this.rewardMoney * this.rewardMultiplier).then(() => {
                
                DataManager.getInstance().lastDailyChallengeTimestamp = new Date().getTime();
                LocalStorageController.save();

                Utils.wait(350).then(() => resolve());
            });
        })
    }


    acquireReward(_fromPosition, totalMoney) {
        return new Promise((resolve, reject) => {

            this.currencyCounter.show().then(() => {
                this.currencyCounter.spawnAndPickupMoney(_fromPosition, totalMoney, 1.25).then(() => resolve());
            });
        })
    }


    _showCompeteAgainPopup() {
        APIMediator.checkRewardedVideoAvailability('button:dailychallenge:doublereward').then(result => {
            if (result) {
                this.competeAgainContainer.enabled = true;
                this.competeAgainContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
                this._unlockButtons();
            } else {
                this.exitToMenu();
            }
        });
    }

    async _onYesRewardedPressed() {
        this._lockButtons();

        const result = await APIMediator.watchRewardedVideo();
        if (result) {
            this.reloadDailyChallenge();
        }
        this._unlockButtons();
    }

    _onYesFreePressed() {
        this._lockButtons();
        this.reloadDailyChallenge();
    }

    _onNoPressed() {
        this._lockButtons();
        UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
            inDuration: 0.075,
            outDuration: 0.25,
            callback: () => {
            }
        });
    };

    _lockButtons() {
        this.yesButtonRewarded.setAvailable(false);
        this.yesButtonFree.setAvailable(false);
        this.noButton.setAvailable(false);
        this.buttonX2Rewarded.setAvailable(false);
        this.buttonNoThanks.setAvailable(false);
    }

    _unlockButtons() {
        this.yesButtonRewarded.setAvailable(true);
        this.yesButtonFree.setAvailable(true);
        this.noButton.setAvailable(true);
        this.buttonX2Rewarded.setAvailable(true);
        this.buttonNoThanks.setAvailable(true);
    }


    reloadDailyChallenge() {
        DailyChallengeLocation.getInstance().loadAndShow();
    }

    exitToMenu() {
        UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
            inDuration: 0.075,
            outDuration: 0.25,
            callback: () => {
            }
        });
    }


    _onHide() {
        super._onHide();
    }

    update(dt) {
        if (this.competeAgainContainer.enabled && this.competeAgainButtonsContainer.enabled) {
            if (this._justShown || this.app.frame % 30 === 0) {
                APIMediator.checkRewardedVideoAvailability('button:dailychallenge:doublereward').then(result => {
                    if (result) {
                        this.yesButtonRewarded.enabled = true;
                        this.yesButtonFree.enabled = false;
                    } else {
                        this.yesButtonRewarded.enabled = false;
                        this.yesButtonFree.enabled = true;
                    }
                })
            }
        }
    }
}

pc.registerScript(PopupDailyChallengeVictory, 'popupDailyChallengeVictory');

// PunishmentManager.js
var PunishmentManager = pc.createScript('punishmentManager');

PunishmentManager.getInstance = function () {
    if (!PunishmentManager._instance) console.error('PunishmentManager is not initialized yet');
    return PunishmentManager._instance;
};


PunishmentManager.prototype.initialize = function () {
    PunishmentManager._app = this.app;
    if (!PunishmentManager._instance) {
        PunishmentManager._instance = this;
    }

    this.punishmentWasActivated = false;
    

    this.punishmentButtonContainer = this.entity.findByName('PunishmentButtonContainer');
    this._punishmentContainerTargetPosition = this.punishmentButtonContainer.getLocalPosition().clone();
    this._punishmentContainerStartingPosition = this._punishmentContainerTargetPosition.clone().add(new pc.Vec3(20, 0, 0));
    this.punishmentButtonContainer.enabled = false;
    this.punishmentButton = this.punishmentButtonContainer.findByName('ButtonPunishment');
    this.punishmentButtonContestantPosition = this.punishmentButtonContainer.findByName('ContestantTargetPosition');
    this.punishmentButtonContestantAtButtonPosition = this.punishmentButtonContainer.findByName('ContestantAtButtonPosition');


    /* puishments */
    this.punishmentsContainer = this.entity.findByName('Punishments');
    this.punishmentsList = this.punishmentsContainer.children;
    this.punishmentsMap = new Map();
    for (let punishment of this.punishmentsList) {
        this.punishmentsMap.set(punishment.name, punishment);
    }

    /* lava */
    this.lavaParticlesContainer = this.punishmentsMap.get('Lava').findByName('BubblesLavaParticles');
    this.lavaFallingEffectsContainer = this.punishmentsMap.get('Lava').findByName('ExplosionParticles');

    /* ice */
    this.iceInnerContainer = this.punishmentsMap.get('Ice').findByName('InnerContainer');
    this.iceParticlesContainer = this.punishmentsMap.get('Ice').findByName('IceParticles');
    this.iceRock = this.punishmentsMap.get('Ice').findByName('PolyRoundRock01');

    /* waterfall */
    this.waterfallContainer = this.punishmentsMap.get('Waterfall').findByName('InnerContainer');

    /* tornado */
    this.tornadoContainer = this.punishmentsMap.get('Tornado').findByName('InnerContainer');
    this.tornadoMovableContainer = this.punishmentsMap.get('Tornado').findByName('MovableContainer');
    this.tornadoParticlesContainer = this.punishmentsMap.get('Tornado').findByName('ParticlesContainer');
    this.tornadoCharacterPosition = this.punishmentsMap.get('Tornado').findByName('CharacterPosition');
    this._tornadoActive = false;

    /* wrecking ball */
    this.wreckingBallContainer = this.punishmentsMap.get('WreckingBall').findByName('InnerContainer');
    this.wreckingBall = this.wreckingBallContainer.findByName('WreckingBall');
    this._wreckingBallHitActive = false;
    this._wreckingBallSpeedX = 0;
    this._wreckingBallSpeedY = 0;
    this._wreckingBallGravity = -10;
    this._wreckingBallDecayX = 0.99;


    this.punishmentType = null;
    this.contestantType = Constants.Contestants.OPPONENT;
};

PunishmentManager.prototype.exit = function () {
    this.punishmentWasActivated = false;

    if(!this.punishmentButton.release) return;

    this.punishmentButton.release(0);
    this.punishmentButtonContainer.enabled = false;

    /* lava */
    this.app.fire(EventTypes.CLOSE_HATCHES);
    this.lavaParticlesContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.stop();
    });

    this.lavaFallingEffectsContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.stop();
    });

    /* ice */
    this.iceParticlesContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.stop();
    });

    /* waterfall */
    this.waterfallContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.stop();
    });

    /* tornado */
    this.tornadoParticlesContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.stop();
    });

    /* wrecking ball */
    this.wreckingBall.anim.setTrigger('reset', true);

    /* params */
    this._tornadoActive = false;
    this._wreckingBallHitActive = false;

    /* disable punishments */
    this.punishmentsList.forEach(p => p.enabled = false);
};


PunishmentManager.prototype.showPunishmentButton = function () {
    this.punishmentButtonContainer.setLocalPosition(this._punishmentContainerStartingPosition);
    this.punishmentButtonContainer.enabled = true;
    this.punishmentButtonContainer.setLocalScale(pc.Vec3.ZERO);
    this.punishmentButtonContainer.tween(this.punishmentButtonContainer.getLocalScale())
        .to(pc.Vec3.ONE, 0.175, pc.SineOut)
        .start();
    this.punishmentButtonContainer.tween(this.punishmentButtonContainer.getLocalPosition())
        .to(this._punishmentContainerTargetPosition, 0.95, pc.SineOut)
        .start();

    this.punishmentButton.start();
}

PunishmentManager.prototype.hidePunishmentButton = function () {
    this.punishmentButtonContainer.enabled = false;
}

PunishmentManager.prototype.activateRandomPunishment = async function (winnerContestantType) {
    this.punishmentWasActivated = true;

    this.winnerContestantType = winnerContestantType;
    this.contestantType =  (this.winnerContestantType === Constants.Contestants.PLAYER) ? Constants.Contestants.OPPONENT : Constants.Contestants.PLAYER;

    this.targetContestant = ContestantsManager.getInstance().getContestant(this.contestantType);
    this.winnerContestant = ContestantsManager.getInstance().getContestant(this.winnerContestantType);

    this.punishmentType = await this._jumpAtPunishmentButton();

    this.punishmentsList.forEach(p => p.enabled = p.name === this.punishmentType);

    switch (this.punishmentType) {
        case Constants.Punishments.LAVA:
            this._activateLava();
            break;
        case Constants.Punishments.WRECKING_BALL:
            this._activateWreckingBall();
            break;
        case Constants.Punishments.WATERFALL:
            this._activateWaterfall();
            break;
        case Constants.Punishments.TORNADO:
            this._activateTornado();
            break;
        case Constants.Punishments.ICE:
            this._activateIce();
            break;
    }
};


PunishmentManager.prototype.update = function (dt) {
    if (this._tornadoActive && this.targetContestant) {
        this.targetContestant.setPosition(this.tornadoCharacterPosition.getPosition());
        this.targetContestant.setYaw(this.targetContestant.getYaw() - 120 * dt);
    }

    if (this._wreckingBallHitActive && this.targetContestant) {
        const localPosition = this.targetContestant.getLocalPosition();
        localPosition.x += this._wreckingBallSpeedX * dt;
        localPosition.y = Math.max(0, localPosition.y + this._wreckingBallSpeedY * dt);
        this._wreckingBallSpeedX *= (1 - (1 - this._wreckingBallDecayX) * dt / 60);
        this._wreckingBallSpeedY += this._wreckingBallGravity * dt;
        this.targetContestant.setLocalPosition(localPosition);
    }
};

PunishmentManager.prototype._jumpAtPunishmentButton = async function () {

    await this.winnerContestant.moveToPosition(this.punishmentButtonContestantPosition.getPosition())
    this.winnerContestant.setYaw(180);
    this.winnerContestant.setTrigger('jump');
    this.winnerContestant.setGravityEnabled(false);

    const targetPosition = Utils.worldToLocalPosition(this.winnerContestant, this.punishmentButtonContestantAtButtonPosition.getPosition());
    this.winnerContestant.tween(this.winnerContestant.getLocalPosition())
        .delay(1.675)
        .to(targetPosition, 0.35, pc.Linear)
        .start();

    const punishmentType = await this.punishmentButton.press(950)

    await Utils.wait(400);

    return punishmentType;
}

/* Punishments */

PunishmentManager.prototype._activateLava = function () {
    const lavaContainer = this.punishmentsMap.get(Constants.Punishments.LAVA);
    const lavaPosition = lavaContainer.getLocalPosition();
    lavaPosition.x = this.contestantType === Constants.Contestants.PLAYER ? 4.2 : -4.25;
    lavaContainer.setLocalPosition(lavaPosition);

    this.app.fire(EventTypes.HIDE_SINGLE_BUZZER_LIGHT, this.contestantType);

    this.app.fire(EventTypes.OPEN_HATCHES, this.contestantType);

    this.targetContestant.setTrigger('lava');
    this.targetContestant.setGravityEnabled(false);

    const localPosition = this.targetContestant.getLocalPosition();
    this.targetContestant.tween(localPosition)
        .to({ y: localPosition.y - 5.5 }, 0.75, pc.SineIn)
        .delay(0.25)
        .onStart(() => {
            this.targetContestant.setYaw(-135);
        })
        .start();


    this.lavaParticlesContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.play();
    });

    this.lavaFallingEffectsContainer.children.forEach(child => {
        child.particlesystem.reset();
        Utils.wait(700).then(() => child.particlesystem.play());
    });

};


PunishmentManager.prototype._activateWreckingBall = function () {

    this.wreckingBall.anim.setTrigger('reset', true);

    this.wreckingBallContainer.setPosition(this.targetContestant.getPosition());
    Utils.wait(100).then(() => this.wreckingBall.anim.setTrigger('wreckingBall', true));

    Utils.wait(1050).then(() => {
        this.targetContestant.setTrigger('wreckingBallHit');
        this._wreckingBallHitActive = true;
        this._wreckingBallSpeedX = -30;
        this._wreckingBallSpeedY = 35;
    });

    Utils.wait(3500).then(() => {
        this._wreckingBallHitActive = false;
    })
};


PunishmentManager.prototype._activateWaterfall = function () {
    this.targetContestant.setTrigger('waterfall');

    this.waterfallContainer.setPosition(this.targetContestant.getPosition());

    this.waterfallContainer.children.forEach((child, index) => {
        child.particlesystem.reset();
        child.particlesystem.stop();
        Utils.wait((index >= 2) ? 1775 : 0).then(() => {
            child.particlesystem.reset();
            child.particlesystem.play();
        });
    });
};

PunishmentManager.prototype._activateTornado = function () {
    this.tornadoContainer.setPosition(this.targetContestant.getPosition());

    const starttingPosition = new pc.Vec3(this.contestantType === Constants.Contestants.PLAYER ? 30 : -30, 0, 0);
    this.tornadoMovableContainer.setLocalPosition(starttingPosition);
    this.tornadoMovableContainer.tween(this.tornadoMovableContainer.getLocalPosition())
        .to(pc.Vec3.ZERO, 2, pc.SineOut)
        .onComplete(async () => {

            this._tornadoActive = true;
            this.targetContestant.setTrigger('tornado');

            this.app.stopAllTweens(this.tornadoCharacterPosition);
            this.tornadoCharacterPosition.setLocalPosition(pc.Vec3.ZERO);
            this.tornadoCharacterPosition.tween(this.tornadoCharacterPosition.getLocalPosition())
                .to({ x: 0, y: 4, z: 0 }, 0.75, pc.SineInOut)
                .onComplete(() => {
                    this.tornadoCharacterPosition.tween(this.tornadoCharacterPosition.getLocalPosition())
                        .to({ x: 0, y: 2.5, z: 0 }, 0.5, pc.SineInOut)
                        .repeat(10)
                        .yoyo(true)
                        .start();
                })
                .start();

            await Utils.wait(2500);


            this.tornadoMovableContainer.tween(this.tornadoMovableContainer.getLocalPosition())
                .to(starttingPosition, 2, pc.SineIn)
                .onComplete(() => {
                    this._tornadoActive = false;
                    this.tornadoParticlesContainer.children.forEach((child, index) => {
                        child.particlesystem.stop();
                    });
                    this.targetContestant.tween(this.targetContestant.getLocalScale())
                        .to(pc.Vec3.ZERO, 0.4, pc.Linear)
                        .start();
                })
                .start();


        })
        .start();

    this.tornadoParticlesContainer.children.forEach((child, index) => {
        child.particlesystem.reset();
        child.particlesystem.stop();
        child.particlesystem.play();
    });
};


PunishmentManager.prototype._activateIce = function () {
    this.iceParticlesContainer.children.forEach(child => {
        child.particlesystem.reset();
        child.particlesystem.play();
    });

    this.iceInnerContainer.setPosition(this.targetContestant.getPosition());

    this.targetContestant.setTrigger('frozen');

    this.iceRock.setLocalScale(pc.Vec3.ZERO);
    this.iceRock.tween(this.iceRock.getLocalScale())
        .to({ x: 0.4, y: 0.4, z: 0.4 }, 1.0, pc.Linear)
        .start();

};

// Screen_Punishments.js
class ScreenPunishments extends BaseWindow {

    initialize() {
        super.initialize();

        this.buttonsContainer = this.entity.findByName('ButtonsContainer');
        this.buttonPushRewarded = this.entity.findByName('ButtonPushTheBuzzerRewarded');
        this.buttonPushFree = this.entity.findByName('ButtonPushTheBuzzerFree');
        this.buttonNoThanks = this.entity.findByName('ButtonNoThanks');

        this.tapToContinueContainer = this.entity.findByName('TapToContinueContainer');
        this.tapToContinueButton = this.tapToContinueContainer.findByName('TapToContinueButton');


        this.buttonPushRewarded.on(EventTypes.BUTTON_PRESSED, this._onRewardedPushPressed, this);
        this.buttonPushFree.on(EventTypes.BUTTON_PRESSED, this._onFreePushPressed, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this._onNoThanksPressed, this);
        this.tapToContinueButton.on(EventTypes.BUTTON_PRESSED, this._onTapToContinuePressed, this);


    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        this._lockButtons();
        this.buttonsContainer.enabled = true;
        this.tapToContinueContainer.enabled = false;

        /* show buttons */
        this.buttonPushRewarded.enabled = false;
        this.buttonPushFree.enabled = true;
        APIMediator.checkRewardedVideoAvailability('button:punishments:punish').then(result => {
            this.buttonPushRewarded.enabled = result;
            this.buttonPushFree.enabled = !result;
        });


        CameraController.getInstance().changeCamera(Constants.Cameras.TRANSITION_ROUND_TO_PUNISHMENTS).then(() => {
            CameraController.getInstance().changeCamera(Constants.Cameras.PUNISHMENTS);
        });

        this._showPunishmentsButton();
    }

    _onAppeared() {
        this._unlockButtons();
    }

    _onHide() {
        this.app.off(EventTypes.PUNISHMENT_COMPLETED, this.onPunishmentCompleted, this);
        super._onHide();
    }

    _showPunishmentsButton() {
        PunishmentManager.getInstance().showPunishmentButton();
    }

    async _onRewardedPushPressed() {
        this._lockButtons();

        const result = await APIMediator.watchRewardedVideo('button:punishments:punish');
        if (result) {
            this.applyPunishment();
        }
        this._unlockButtons();
    }

    _onFreePushPressed() {
        this._lockButtons();
        this.applyPunishment();
    }

    _onNoThanksPressed() {
        this._lockButtons();
        this.proceedToNextScreen();
    }

    _lockButtons() {
        this.buttonPushRewarded.setAvailable(false);
        this.buttonPushFree.setAvailable(false);
        this.buttonNoThanks.setAvailable(false);
    }

    _unlockButtons() {
        this.buttonPushRewarded.setAvailable(true);
        this.buttonPushFree.setAvailable(true);
        this.buttonNoThanks.setAvailable(true);
    }

    applyPunishment() {
        this._lockButtons();
        this.buttonsContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
        this.buttonsContainer.once(EventTypes.UI_ELEMENT.DISAPPEARED, () => this.buttonsContainer.enabled = false);

        const contenstantType = MatchManager.getInstance().getMatchWinner();
        PunishmentManager.getInstance().activateRandomPunishment(contenstantType);

        this.app.once(EventTypes.PUNISHMENT_COMPLETED, this.onPunishmentCompleted, this);
        Utils.wait(3500).then(() => {
            this.app.fire(EventTypes.PUNISHMENT_COMPLETED);
        });
    }

    onPunishmentCompleted() {
        this.tapToContinueContainer.enabled = true;
        this.tapToContinueContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
    }


    _onTapToContinuePressed() {
        this.tapToContinueContainer.enabled = false;
        this.proceedToNextScreen();
    }


    update(dt) {
        if (this.buttonsContainer.enabled) {
            if (this._justShown || this.app.frame % 30 === 0) {
                APIMediator.checkRewardedVideoAvailability('button:punishments:punish').then(result => {
                    this.buttonPushRewarded.enabled = result;
                    this.buttonPushFree.enabled = !result;
                });
            }
        }
    }

    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.PUNISHMENT);
    }

}

pc.registerScript(ScreenPunishments, 'screenPunishments');

// AIAnswer.js
class AIAnswer {
    constructor(time) {
        this.time = time;
        this.correct = false;
        this.index = 0;
    }

    setCorrect(index) {
        this.correct = true;
        this.index = index;
    }
}

// ExtraSymbolsPanel.js
var ExtraSymbolsPanel = pc.createScript('extraSymbolsPanel');

ExtraSymbolsPanel.attributes.add('symbolWidth', {
    type: 'number',
    default: 75
});

ExtraSymbolsPanel.attributes.add('symbolHeight', {
    type: 'number',
    default: 112.5
});


ExtraSymbolsPanel.prototype.initialize = function () {
    this.pad = this.entity.findByName('GlyphsPad');
    this.glyphsContainer = this.entity.findByName('GlyphsContainer');

    this.entity.showSymbols = this._showSymbols.bind(this);
    this.entity.hide = this._hide.bind(this);

    this.app.on(EventTypes.SHOW_EXTRA_SYMBOLS_PANEL, this._showSymbols, this);
    this.app.on(EventTypes.HIDE_EXTRA_SYMBOLS_PANEL, this._hide, this);
    this.app.on(EventTypes.EXTRA_SYMBOLS_PANEL_DISPATCH_DRAG, this._dispatchDrag, this);
    this.app.on(EventTypes.EXTRA_SYMBOLS_PANEL_DISPATCH_RELEASE, this._dispatchRelease, this);
    this.app.on(EventTypes.EXTRA_SYMBOLS_PANEL_SYMBOL_ENTERED, this._dispatchSymbolEntered, this);
};

ExtraSymbolsPanel.prototype.postInitialize = function () {
    this.entity.enabled = false;
};

ExtraSymbolsPanel.prototype.update = function (dt) {

};

ExtraSymbolsPanel.prototype._showSymbols = function (symbols, worldPosition) {
    this.entity.setPosition(worldPosition);
    this.entity.translateLocal(0, 42, 0);
    this.entity.enabled = true;

    const glyphs = this.glyphsContainer.children;
    for (let i = 0; i < Math.max(glyphs.length, symbols.length); i++) {
        let glyph = glyphs[i];
        let symbolKey = symbols[i];
        if (!symbolKey) {
            if (glyph) glyph.enabled = false;
        } else {
            if (!glyph) {
                glyph = TemplateManager.getInstance().instantiate('ExtraGlyph');
                this.glyphsContainer.addChild(glyph);
            }
            glyph.enabled = true;
            glyph.setVisibleSymbol(symbolKey);
        }
    }

    const panelSize = this._calculatePanelSize(symbols.length);
    this.entity.element.width = panelSize.width;
    this.entity.element.height = panelSize.height;
};

ExtraSymbolsPanel.prototype._hide = function () {
    this.entity.enabled = false;
};

ExtraSymbolsPanel.prototype._getWorldPositionFromTouchEvent = function (event) {
    if (!event.touch) return undefined;
    const device = this.app.graphicsDevice;
    const x = event.touch.clientX * device.maxPixelRatio;
    const y = event.touch.clientY * device.maxPixelRatio;
    const worldPosition = new pc.Vec3(x / device.width * 2 - 1, (1 - y / device.height) * 2 - 1, 0);
    return worldPosition;
}

ExtraSymbolsPanel.prototype._dispatchDrag = function (event) {
    const worldPosition = this._getWorldPositionFromTouchEvent(event);
    if (worldPosition) {
        this.glyphsContainer.children.forEach(c => c.dispatchDragOver(worldPosition));
    }
}

ExtraSymbolsPanel.prototype._dispatchRelease = function (event) {
    const worldPosition = this._getWorldPositionFromTouchEvent(event);
    if (worldPosition) {
        this.glyphsContainer.children.forEach(c => c.dispatchRelease(worldPosition));
    }
};


ExtraSymbolsPanel.prototype._dispatchSymbolEntered = function (symbolKey) {
    if (symbolKey) {
        this.app.fire(EventTypes.KEYBOARD_SYMBOL_TYPED, DataManager.getInstance().uppercaseMode ? `${symbolKey}`.toUpperCase() : symbolKey);
    }
};


ExtraSymbolsPanel.prototype._calculatePanelSize = function (symbolsAmount) {
    let rows = 1;
    let cols = 1;
    const spacing = this.glyphsContainer.layoutgroup.spacing;
    const padding = this.glyphsContainer.layoutgroup.padding;

    if (symbolsAmount <= 9) {
        cols = 3;
    } else {
        cols = 4;
    }

    cols = Math.min(symbolsAmount, cols);
    rows = Math.ceil(symbolsAmount / cols);


    return {
        width: cols * this.symbolWidth + spacing.x * (cols - 1) + padding.x + padding.z,
        height: rows * this.symbolHeight + spacing.y * (rows - 1) + padding.y + padding.w
    }
};



// ExtraGlyph.js
var ExtraGlyph = pc.createScript('extraGlyph');

ExtraGlyph.prototype.initialize = function () {
    this.symbolElement = this.entity.findByName('Symbol');

    this.glyph = '';
    this.hovered = false;
    this.entity.element.opacity = 0;

    this.entity.setVisibleSymbol = this._setVisibleSymbol.bind(this);
    this.entity.checkWorldPositionOverlaps = this._checkWorldPositionOverlaps.bind(this);
    this.entity.dispatchDragOver = this._dispatchDragOver.bind(this);
    this.entity.dispatchRelease = this._dispatchRelease.bind(this);

    if (this.app.touch) {
        this.entity.element.on('touchstart', this.onPress, this);
        this.entity.element.on('touchend', this.onRelease, this);
        this.entity.element.on('touchmove', this.onDrag, this);
        this.entity.element.on('touchleave', this.onLeave, this);
    }

    if (this.app.mouse) {
        this.entity.element.on('mouseenter', this.onEnter, this);
        this.entity.element.on('mousedown', this.onPress, this);
        this.entity.element.on('mouseup', this.onRelease, this);
        this.entity.element.on('mousemove', this.onDrag, this);
        this.entity.element.on('mouseleave', this.onLeave, this);
    }
};

ExtraGlyph.prototype.update = function (dt) {
    this.entity.element.opacity = this.hovered ? 0.5 : 0;
};

ExtraGlyph.prototype.onEnter = function (event) {
    this.hovered = true;
};

// When we press the element assign the active texture
ExtraGlyph.prototype.onPress = function (event) {

};

ExtraGlyph.prototype.onRelease = function (event) {
    this.entity.element.opacity = 0.0;
    if (this.hovered) {
        this.app.fire(EventTypes.EXTRA_SYMBOLS_PANEL_SYMBOL_ENTERED, this.glyph);
    }
};

ExtraGlyph.prototype.onLeave = function (event) {
    this.hovered = false;
};

ExtraGlyph.prototype.onDrag = function (event) {

};

ExtraGlyph.prototype._setVisibleSymbol = function (symbolKey) {
    this.glyph = symbolKey;
    this.symbolElement.element.text = `${symbolKey}`;
};


ExtraGlyph.prototype._dispatchDragOver = function (worldPosition) {
    if (this._checkWorldPositionOverlaps(worldPosition)) {
        this.hovered = true;
    } else {
        this.hovered = false;
    }
};

ExtraGlyph.prototype._dispatchRelease = function (worldPosition) {
    if (this._checkWorldPositionOverlaps(worldPosition)) {
        this.onRelease();
    }
};

ExtraGlyph.prototype._checkWorldPositionOverlaps = function (worldPosition) {
    if (!this.entity.enabled) return false;
    this._boundsVector = this._boundsVector || new pc.Vec3(this.entity.element.width / 2, this.entity.element.height / 2, 0);
    const position = this.entity.getPosition();
    const worldBounds = Utils.localToWorldPosition(this.entity, this._boundsVector);
    worldBounds.x -= position.x;
    worldBounds.y -= position.y;

    return Math.abs(worldPosition.x - position.x) <= worldBounds.x && Math.abs(worldPosition.y - position.y) <= worldBounds.y;
};


// PauseOverlay.js
var PauseOverlay = pc.createScript('pauseOverlay');

PauseOverlay.prototype.initialize = function () {

};

PauseOverlay.prototype.postInitialize = function () {
    this.setPaused(APIMediator.isPaused());
    APIMediator.onPauseStateChange(isPaused => {
        this.setPaused(isPaused);
    });
};

PauseOverlay.prototype.setPaused = function (isPaused) {
    this.entity.element.enabled = isPaused;
    this.app.timeScale = isPaused ? 0 : 1;
};


PauseOverlay.prototype.update = function (dt) {

};



// lobbyCamera.js
var LobbyCamera = pc.createScript('lobbyCamera');


LobbyCamera.attributes.add('minLandscapeAspectRatio', {
    type: 'number',
    default: 0.8
});

LobbyCamera.attributes.add('customLandscapeFov', {
    type: 'boolean',
    default: false
});

LobbyCamera.attributes.add('landscapeFov', {
    type: 'vec2',
    default: [24, 20]
});

LobbyCamera.attributes.add('extraAngleFactor', {
    type: 'number',
    default: 0.5
});

LobbyCamera.attributes.add('extraLandscapeAngle', {
    type: 'vec3',
    default: [0, 0, 0]
});


LobbyCamera.prototype.initialize = function () {
    this._originalFov = this.entity.camera.fov;
    this._originalAngles = this.entity.getLocalEulerAngles().clone();

    this.app.graphicsDevice.on('resizecanvas', this.onResizeCanvas, this);
    this.onResizeCanvas();
};

LobbyCamera.prototype.update = function (dt) {

};

LobbyCamera.prototype.onResizeCanvas = function () {
    // if (this.enabled) {
        const height = this.app.graphicsDevice.height;
        const width = this.app.graphicsDevice.width;
        const aspectRatio = width / height;
        
        this.entity.camera.horizontalFov = aspectRatio <= this.minLandscapeAspectRatio;

        if(aspectRatio > this.minLandscapeAspectRatio && this.customLandscapeFov) {
            const angleLerpFactor = pc.math.clamp((aspectRatio / this.minLandscapeAspectRatio - 1) * this.extraAngleFactor, 0, 1);
            this.entity.camera.fov = pc.math.lerp(this.landscapeFov.x, this.landscapeFov.y, angleLerpFactor);
            this.entity.setLocalEulerAngles(
                this._originalAngles.x + pc.math.lerp(0, this.extraLandscapeAngle.x, angleLerpFactor),
                this._originalAngles.y + pc.math.lerp(0, this.extraLandscapeAngle.y, angleLerpFactor),
                this._originalAngles.z + pc.math.lerp(0, this.extraLandscapeAngle.z, angleLerpFactor)
            );
        } else {
            this.entity.camera.fov = this._originalFov;
            this.entity.setLocalEulerAngles(this._originalAngles);
        }
    // }
};



// TournamentManager.js
var TournamentManager = pc.createScript('tournamentManager');

TournamentManager.getInstance = function () {
    if (!TournamentManager._instance) console.error('TournamentManager is not initialized yet');
    return TournamentManager._instance;
};


TournamentManager.prototype.initialize = function () {
    TournamentManager._app = this.app;
    if (!TournamentManager._instance) {
        TournamentManager._instance = this;
    }

    this.playerContestant = null;
    this._opponentsCreated = false;
    this.allOpponents = [];
    this.opponentContestants = [];
    this.opponentContestantsEliminated = [];

    /* tournament data */
    this._tournamentDataLoaded = false;
    this._nextTournamentDataReady = false;
    this.completedTournaments = 0;
    this.nextTournamentOnLevel = 0;
    this.tournamentType = Constants.TOURNAMENT_TYPE.QUALIFIER;
    this.cityIndex = 0;
    this.cityName = this._getCityNameByIndex();

    /* progress data */
    this.totalMatches = 4;
    this.currentMatchIndex = -1;
    this.tournamentID = 0;
    this.tournamentActive = false;
    this.tournamentCompleted = false;
    this.tournamentRewardClaimed = false;
    this.tournamentReward = {
        puzzles: 1,
        money: 500
    };

    this.playerMainMenuPoint = null;
    this.contestantsContainer = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentContestants');
    this.tournamentPositionsContainer = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentPositions');
    this.contestantPoints = this.tournamentPositionsContainer.children;
    this.tournamentVictoryPositionsContainer = HierarchyManager.getInstance().getByPath('Stage/StageContent/TournamentVictoryPositions');
    this.victoryPointsList = this.tournamentVictoryPositionsContainer.children;
    this.qualifiedPoints = new Map();
    this.eliminatedPoints = new Map();
    this.contestantPositionsMap = new Map();

    this.numberOfContestants = 16;
    this.numberOfAliveContestants = 16;
    this.currentOpponent = null;
    this.currentOpponentContestantData = null;

    this._preparePointsByCount();

    this.app.on('app:changeLocale', this.onLanguageChanged, this);
    this.app.on(EventTypes.SAVEDATA_LOADED, this._loadSavedData, this);
};

TournamentManager.prototype.postInitialize = function () {
    this.playerContestant = ContestantsManager.getInstance().getPlayerContestant();
};

TournamentManager.prototype.prepareNextTournament = function (newCity = true) {
    this.tournamentID += 1;
    this.currentMatchIndex = -1;
    this.numberOfAliveContestants = this.numberOfContestants;
    this.tournamentActive = false;
    this.tournamentCompleted = false;
    this.tournamentRewardClaimed = false;
    if (newCity) {
        this.tournamentReward = this._generateRandomReward();
        const currentTypeIndex = [Constants.TOURNAMENT_TYPE.QUALIFIER, Constants.TOURNAMENT_TYPE.SEMI_FINAL, Constants.TOURNAMENT_TYPE.FINAL].indexOf(this.tournamentType);
        this.tournamentType = [Constants.TOURNAMENT_TYPE.QUALIFIER, Constants.TOURNAMENT_TYPE.SEMI_FINAL, Constants.TOURNAMENT_TYPE.FINAL][(currentTypeIndex + 1) % 3];
        const cityNames = LocalizationManager.getInstance().getCityNames();
        this.cityIndex = pc.math.clamp(Math.floor(Math.random() * cityNames.length), 0, cityNames.length - 1);
        this.cityName = this._getCityNameByIndex();
    }
    this._tournamentDataLoaded = true;

    this.app.fire(EventTypes.UPDATE_CURRENT_TOURNAMENT_INFO, this.getCurrentTournamentInfo());
    // console.warn('prepared tournament ' + this._getCityNameByIndex() + ' ' + this.tournamentType);
};

TournamentManager.prototype.isNextTournamentReady = function () {
    return !this.tournamentActive && this.nextTournamentOnLevel <= DataManager.getInstance().totalMatches;
};

TournamentManager.prototype.playTournament = async function (fromMainMenu = true) {
    this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.SEARCHING_OPPONENTS);
    this.app.fire(EventTypes.SET_TOURNAMENT_SEARCH_PROGRESS, 1, 16);

    if (!this._tournamentDataLoaded) {
        this.prepareNextTournament(false);
    } else {
        // console.log('reusing current tournament data', this.getTournamentSaveData())
    }
    this.tournamentActive = true;
    this.tournamentCompleted = false;
    this.tournamentRewardClaimed = false;

    CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY);
    CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT_SEARCH_TRANSITION).then(() => {
        CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);
    });

    const numberOfSurvivors = Math.pow(2, (this.totalMatches - this.currentMatchIndex - 1));
    this.roundContestantPositions = [...this.qualifiedPoints.get(numberOfSurvivors)];

    if (fromMainMenu) {
        this._animatePlayerAppearing(0);
    } else {
        this._spawnPlayerInPosition();
    }

    this._hideInactiveContenstans();

    await this._createDummyOpponents();
    await this._generateRandomOpponents();

    this.fillOpponentsArray(numberOfSurvivors - 1);

    if (fromMainMenu) {
        await this._animateOpponentsAppearing(0.25, 0.5);
    } else {
        await this._spawnOpponentsInPosition();
    }

    this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.NEXT_MATCH_READY);
};

TournamentManager.prototype.fillOpponentsArray = function (amount) {
    if (this.opponentContestants.length !== amount) {
        console.log('refilling opponents: ' + this.opponentContestants.length + ' of ' + amount);
        this.opponentContestants = [];
        this.opponentContestantsEliminated = [];
        const opponentsStack = this.allOpponents.slice();
        for (let i = 0; i < amount; i++) {
            const opponent = Utils.removeRandomItem(opponentsStack);
            if (opponent) {
                this.opponentContestants.push(opponent);
            }
        }
    }
};

TournamentManager.prototype.continueTournament = async function () {
    if (!this.tournamentActive) {
        if (this.tournamentCompleted) {
            UIController.getInstance().showWindow(Constants.Screens.TOURNAMENT_CLAIM_PRIZE);
            await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.TOURNAMENT_CLAIM_PRIZE);

            TournamentManager.getInstance().planNextTournament(0);

            if (TournamentManager.getInstance().isNextTournamentReady()) {
                TournamentManager.getInstance().prepareNextTournament(true);
                UIController.getInstance().showWindow(Constants.Screens.TOURNAMENT_TICKET);
                await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.TOURNAMENT_TICKET);
                TournamentManager.getInstance().exitTournament(true, () => {
                    TournamentManager.getInstance().playTournament(true);
                });
            } else {
                TournamentManager.getInstance().exitTournament();
            }
        } else {
            console.error('can not proceed: tournament is neither active nor completed');
        }
        return;
    }

    if (this.tournamentActive) {
        this.currentMatchIndex = Math.min(this.currentMatchIndex, this.totalMatches - 2);
        this.playNextMatch();
    }
};

TournamentManager.prototype.playNextMatch = async function () {
    this.currentMatchIndex += 1;

    this.currentOpponent = this.opponentContestants[0];
    this.currentOpponentContestantData = this.currentOpponent.getContestantData();

    this._hideInactiveContenstans();

    /* hide player name */
    ContestantsManager.getInstance().getPlayerContestant().hideTournamentName();

    /* set current opponent & start the match */
    await ContestantsManager.getInstance().getOpponentContestant().setFromContestantData(this.currentOpponentContestantData);
    ContestantsManager.getInstance().getOpponentContestant().setPosition(this.currentOpponent.getPosition());
    ContestantsManager.getInstance().getOpponentContestant().setYaw(this.currentOpponent.getYaw(), true);
    ContestantsManager.getInstance().getOpponentContestant().hideTournamentName();
    ContestantsManager.getInstance().appearOpponentContestant(true);

    MatchManager.getInstance().initializeMatch(this.currentOpponentContestantData);
    MatchManager.getInstance().startMatch();
}

TournamentManager.prototype.reset = function () {
    /* clear contenstants */
    this._clearOpponents();
    this.opponentContestantsEliminated = [];
    this.contestantPositionsMap.clear();
    this.currentOpponent = null;
    this.currentOpponentContestantData = null;
    this.currentMatchIndex = -1;
    this.numberOfAliveContestants = this.numberOfContestants;
    this.roundContestantPositions = [...this.qualifiedPoints.get(this.numberOfContestants)];
};

TournamentManager.prototype.exitTournament = function (navigateToMenu = true, exitCallback = undefined) {
    this.reset();
    this.tournamentActive = false;
    this.tournamentCompleted = false;
    this.tournamentRewardClaimed = false;
    this._tournamentDataLoaded = false;
    this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.DEFAULT);

    if (navigateToMenu) {
        UIController.getInstance().showWindowOverTransition(Constants.Screens.MAIN_MENU, {
            fadeInDuration: 0.15,
            fadeOutDuration: 0.85,
            callback: () => {
                if (exitCallback) exitCallback();
            }
        });
    }
};

TournamentManager.prototype.getTournamentSaveData = function () {
    return {
        active: this.tournamentActive,
        completed: this.tournamentCompleted,
        rewardClaimed: this.tournamentRewardClaimed,
        reward: this.tournamentReward,
        cityIndex: this.cityIndex,
        tournamentType: this.tournamentType,
        currentMatchIndex: -1,// this.currentMatchIndex,
        opponentsData: this.allOpponents.map(x => x.getContestantData().getSaveObject()),//this.opponentContestants.map(x => x.getContestantData().getSaveObject()),
        opponentsEliminatedData: [] //this.opponentContestantsEliminated.map(x => x.getContestantData().getSaveObject())
    }
};

TournamentManager.prototype.getCurrentTournamentInfo = function () {
    return {
        location: this.cityName,
        type: this.tournamentType,
        reward: this.tournamentReward
    }
};


TournamentManager.prototype.declineRevive = function () {
    TournamentManager.getInstance().planNextTournament(1);
    TournamentManager.getInstance().exitTournament(false);
}

TournamentManager.prototype.update = function (dt) {

};


/** helpers */
TournamentManager.prototype.onLanguageChanged = function () {
    this.cityName = this._getCityNameByIndex();
    this.app.fire(EventTypes.UPDATE_CURRENT_TOURNAMENT_INFO, this.getCurrentTournamentInfo());
};

TournamentManager.prototype._getCityNameByIndex = function () {
    const namesList = LocalizationManager.getInstance().getCityNames();
    return namesList[this.cityIndex] || "New York";
};

TournamentManager.prototype._loadSavedData = async function () {
    this.completedTournaments = LocalStorageController.getSavedValue(Constants.Storage.COMPLETED_TOURNAMENTS) || 0;
    this.tournamentID = this.completedTournaments + 1;

    const saveData = LocalStorageController.getSavedValue(Constants.Storage.TOURNAMENT_DATA);
    if (saveData) {
        this.tournamentActive = saveData.active;
        this.tournamentCompleted = saveData.completed;
        this.tournamentRewardClaimed = saveData.rewardClaimed;
        this.tournamentReward = saveData.reward;
        this.cityIndex = saveData.cityIndex;
        this.cityName = this._getCityNameByIndex();
        this.tournamentType = saveData.tournamentType;
        this.currentMatchIndex = saveData.currentMatchIndex;

        this._tournamentDataLoaded = true;

        // console.warn('Loading tournament savedata...', saveData);

        await this._createDummyOpponents();
        await this._loadOpponentsFromSaveData(saveData.opponentsData, saveData.opponentsEliminatedData);

        if (this.tournamentActive) {
            this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.JOIN_CHAMPIONSHIP);
        }
    }
}

TournamentManager.prototype._generateRandomReward = function () {
    const moneyPrizes = [400, 500, 750, 500, 600, 1000];
    const puzzlePrizes = [1, 1, 0, 1, 0, 1];
    const index = this.completedTournaments % moneyPrizes.length;
    return {
        puzzles: puzzlePrizes[index],
        money: moneyPrizes[index]
    }
}

TournamentManager.prototype._preparePointsByCount = function () {
    this.qualifiedPoints.set(16, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map(x => this.tournamentPositionsContainer.findByName(x)));
    this.qualifiedPoints.set(8, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(x => this.tournamentPositionsContainer.findByName(x)));
    this.qualifiedPoints.set(4, ['D', 'E', 'C', 'F'].map(x => this.tournamentPositionsContainer.findByName(x)));
    this.qualifiedPoints.set(2, ['D', 'E'].map(x => this.tournamentPositionsContainer.findByName(x)));

    this.eliminatedPoints.set(16, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map(x => this.tournamentPositionsContainer.findByName(x)));
    this.eliminatedPoints.set(8, ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map(x => this.tournamentPositionsContainer.findByName(x)));
    this.eliminatedPoints.set(4, ['A', 'B', 'G', 'H'].map(x => this.tournamentPositionsContainer.findByName(x)));
    this.eliminatedPoints.set(2, ['C', 'F'].map(x => this.tournamentPositionsContainer.findByName(x)));
};

TournamentManager.prototype.planNextTournament = function (afterMinLevels = 0, forceStartNext = false) {
    if (forceStartNext) {
        this.nextTournamentOnLevel = DataManager.getInstance().totalMatches;
    } else {
        this.nextTournamentOnLevel = DataManager.getInstance().totalMatches + afterMinLevels + Math.floor(pc.math.random(0, 2.25));
    }
    // console.log('next tournament planned on level ' + this.nextTournamentOnLevel + ` current ${DataManager.getInstance().totalMatches}`);
};

TournamentManager.prototype.dispatchMatchFinished = async function () {

    if (this.currentMatchIndex === this.totalMatches - 1) {
        this.showTournamentVictory();
        return;
    };

    /* view mode & camera transition */
    this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.REMAINING);
    CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);

    /* update number of contestants */
    const numberOfSurvivorsInPrevRound = Math.pow(2, (this.totalMatches - this.currentMatchIndex));
    const numberOfSurvivors = Math.pow(2, (this.totalMatches - this.currentMatchIndex - 1));
    this.numberOfAliveContestants = numberOfSurvivors - 1; //minus player
    const numberOfContestantsToRemove = this.opponentContestants.length - this.numberOfAliveContestants; //make sure we dont remove player

    this.app.fire(EventTypes.SET_TOURNAMENT_REMAINING_AMOUNT, numberOfSurvivorsInPrevRound);

    /* detect losers */
    this.currentOpponent = this.opponentContestants[0];
    const aliveContestantsButLoser = this.opponentContestants.filter(x => x !== this.currentOpponent).slice();
    Utils.shuffle(aliveContestantsButLoser);

    const contestantsToRemove = [this.currentOpponent];
    for (let i = 1; i < numberOfContestantsToRemove; i++) {
        const randomLoser = Utils.removeRandomItem(aliveContestantsButLoser);
        contestantsToRemove.push(randomLoser);
    }

    /* make sure eliminated opponents are in the end of the list */
    const survivorsList = this.opponentContestants.filter(x => contestantsToRemove.indexOf(x) === -1);
    this.opponentContestants = [...survivorsList, ...contestantsToRemove];
    this.roundContestantPositions = [...this.qualifiedPoints.get(numberOfSurvivors), ...this.eliminatedPoints.get(numberOfSurvivors)];

    this._spawnPlayerInPosition();
    await this._spawnOpponentsInPosition();

    /* losers go away */
    const walkAwayPromises = [];
    for (let i = contestantsToRemove.length - 1; i > -1; i--) {
        const loserContestant = contestantsToRemove[i];
        walkAwayPromises.push(this._walkEliminatedOpponentAway(loserContestant, (contestantsToRemove.length - i) * pc.math.random(75, 225)));

        const opponentIndex = this.opponentContestants.indexOf(loserContestant);
        this.opponentContestants.splice(opponentIndex, 1);
        this.opponentContestantsEliminated.push(loserContestant);
    }

    const waitingDuration = 3.25;

    this._tweenRemainingText(numberOfSurvivorsInPrevRound, numberOfSurvivors, waitingDuration);
    await Utils.wait(waitingDuration * 1000);

    this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.NEXT_MATCH_READY);
};

TournamentManager.prototype.isLastMatch = function () {
    return this.tournamentActive && this.currentMatchIndex === this.totalMatches - 1;
};

TournamentManager.prototype.showTournamentVictory = async function () {
    this.tournamentCompleted = true;
    this.tournamentActive = false;
    this.app.fire(EventTypes.SET_MAIN_MENU_VIEW_MODE, Constants.MAIN_MENU_VIEW_MODE.VICTORY);
    CameraController.getInstance().changeCamera(Constants.Cameras.LOBBY_TOURNAMENT);

    this.opponentContestants = [...this.opponentContestants, ...this.opponentContestantsEliminated];
    this.opponentContestantsEliminated = [];
    this.roundContestantPositions = [...this.victoryPointsList];

    this._spawnPlayerInPosition();
    this.playerContestant.setLocalScale(1.75, 1.75, 1.75);
    this.playerContestant.setTrigger('dance');
    this.playerContestant.hideTournamentName();

    this.opponentContestants.forEach(x => x.setLocalScale(pc.Vec3.ZERO));
    await this._animateOpponentsAppearing(0.25, 0.25, contestant => {
        contestant.hideTournamentName();
        contestant.setTrigger('dcFinalVictory')
    });
};

TournamentManager.prototype._walkEliminatedOpponentAway = async function (eliminatedOpponent, delay = 0) {
    const position = eliminatedOpponent.getPosition();
    const direction = Math.sign(position.x);
    const targetPosition = position.clone();
    targetPosition.x += 25 * direction;
    await Utils.wait(delay);
    Utils.wait(3500).then(() => {
        Utils._tweenOpacityRecursive(eliminatedOpponent, 0, 0.5);
        Utils.wait(500).then(() => {
            eliminatedOpponent.setLocalScale(pc.Vec3.ZERO);
            eliminatedOpponent.enabled = false;
        });
        eliminatedOpponent.tween(eliminatedOpponent.getLocalScale())
            .to(pc.Vec3.ZERO, 0.5, pc.SineOut)
            .start();
    })
    await eliminatedOpponent.moveToPosition(targetPosition, true);
};

TournamentManager.prototype._tweenRemainingText = function (before, after, duration) {
    const dataHolder = { value: before };
    this.entity.tween(dataHolder)
        .to({ value: after }, duration, pc.Linear)
        .onUpdate(() => {
            const value = Math.round(dataHolder.value);
            this.app.fire(EventTypes.SET_TOURNAMENT_REMAINING_AMOUNT, value);
        })
        .start();
};



/** spawn opponents */
TournamentManager.prototype._animatePlayerAppearing = async function (delay = 0) {
    await Utils.wait(delay * 1000);

    /* prepare player */
    const duration = 0.9;
    this.playerContestant.reset();
    this.playerContestant.tween(this.playerContestant.getLocalScale())
        .to(pc.Vec3.ONE, duration, pc.SineOut)
        .start();
    const targetPoint = this.roundContestantPositions[0];
    const targetPlayerPosition = Utils.worldToLocalPosition(this.playerContestant, targetPoint.getPosition());
    this.playerContestant.tween(this.playerContestant.getLocalPosition())
        .to(targetPlayerPosition, duration, pc.SineOut)
        .start();
    this.contestantPositionsMap.set(targetPoint, this.playerContestant);
    this.playerContestant.showTournamentName();
};


TournamentManager.prototype._spawnPlayerInPosition = function () {
    this.playerContestant.reset();
    this.playerContestant.setLocalScale(pc.Vec3.ONE);
    const targetPoint = this.roundContestantPositions[0];
    this.playerContestant.setPosition(targetPoint.getPosition());
    this.contestantPositionsMap.set(targetPoint, this.playerContestant);
    this.playerContestant.showTournamentName();
};


TournamentManager.prototype._animateOpponentsAppearing = async function (delay = 0.5, betweenOpponentsDelay = 0.3, callback = undefined) {
    await Utils.wait(delay * 1000);
    const promises = [];

    let currentDelay = 0;
    for (let i = 0; i < this.opponentContestants.length; i++) {
        const contestant = this.opponentContestants[i];
        contestant.enabled = true;
        contestant.reset();
        Utils._tweenOpacityRecursive(contestant, 1, 0);

        const targetPoint = this.roundContestantPositions[i + 1];
        contestant.setPosition(targetPoint.getPosition());

        const deviation = pc.math.random(-betweenOpponentsDelay * 0.8, betweenOpponentsDelay * 0.8);
        currentDelay += pc.math.clamp(betweenOpponentsDelay + deviation, 0, 2 * betweenOpponentsDelay);
        contestant.setLocalScale(pc.Vec3.ZERO);
        contestant.tween(contestant.getLocalScale())
            .to(pc.Vec3.ONE, 0.6, pc.BackOut)
            .delay(currentDelay)
            .start();

        Utils.wait(currentDelay * 1000).then(() => {
            if (callback) callback(contestant);
            this.app.fire(EventTypes.SET_TOURNAMENT_SEARCH_PROGRESS, 2 + i, 16);
        });

        this.contestantPositionsMap.set(targetPoint, contestant);
        contestant.showTournamentName();

        promises.push(Utils.wait(currentDelay * 1000));
    }
    for (let i = 0; i < this.opponentContestantsEliminated.length; i++) {
        const contestantEliminated = this.opponentContestantsEliminated[i];
        contestantEliminated.enabled = false;
    }

    return Promise.all(promises);
};


TournamentManager.prototype._spawnOpponentsInPosition = function () {
    for (let i = 0; i < this.opponentContestants.length; i++) {
        const contestant = this.opponentContestants[i];
        contestant.enabled = true;
        Utils._tweenOpacityRecursive(contestant, 1, 0);
        contestant.reset();
        contestant.setLocalScale(pc.Vec3.ONE);
        this.roundContestantPositions = this.roundContestantPositions || [];
        let targetPoint = this.roundContestantPositions[i + 1];
        if(!targetPoint) {
            console.warn(`[Tournament] can not find spawn position ${i + 1}/${this.roundContestantPositions.length}`);
            targetPoint = Utils.getRandomItem(this.qualifiedPoints.get(this.numberOfContestants).filter(x => this.roundContestantPositions.indexOf(x) === -1));
            targetPoint = targetPoint || Utils.getRandomItem(this.qualifiedPoints.get(this.numberOfContestants));
        }
        contestant.setPosition(targetPoint.getPosition());
        this.contestantPositionsMap.set(targetPoint, contestant);
        contestant.showTournamentName();
    }
    for (let i = 0; i < this.opponentContestantsEliminated.length; i++) {
        const contestantEliminated = this.opponentContestantsEliminated[i];
        contestantEliminated.enabled = false;
    }

    this.app.fire(EventTypes.SET_TOURNAMENT_SEARCH_PROGRESS, 16, 16);
};

TournamentManager.prototype._hideInactiveContenstans = function (immediately = false) {
    /* hide contestants */
    for (let contestant of this.opponentContestants) {
        contestant.hideTournamentName();

        if (contestant === this.currentOpponent || immediately) {
            contestant.setLocalScale(pc.Vec3.ZERO);
            contestant.enabled = false;
        } else {
            Utils.wait(pc.math.random(0, 250)).then(() => {
                Utils._tweenOpacityRecursive(contestant, 0, 0.15);
                contestant.tween(contestant.getLocalScale())
                    .to(pc.Vec3.ZERO, 0.15, pc.SineIn)
                    .onComplete(() => contestant.enabled = false)
                    .start();
            });
        }
    };
}


/** opponents management */
TournamentManager.prototype._clearOpponents = async function () {
    while (this.opponentContestants.length > 0) {
        const contestant = this.opponentContestants.pop();
        if (contestant) contestant.destroy();
    }
    while (this.opponentContestantsEliminated.length > 0) {
        const contestant = this.opponentContestantsEliminated.pop();
        if (contestant) contestant.destroy();
    }
    this._opponentsCreated = false;
    this.allOpponents = [];
};

TournamentManager.prototype._createDummyOpponents = async function () {
    if (this._opponentsCreated) return;

    const initialPositions = this.qualifiedPoints.get(this.numberOfContestants);

    return new Promise((resolve, reject) => {

        const loadingPromises = [];

        /* instantiate opponents */
        const numOpponents = this.numberOfContestants - 1;
        const opponentColorsList = Utils.shuffle(GameConfig.getAttribute('opponentColors').slice());
        for (let i = 0; i < numOpponents; i++) {
            const opponentContestantData = new ContestantData(
                Constants.Contestants.OPPONENT,
                "Dummy",
                opponentColorsList[i % opponentColorsList.length],
                SkinManager.getInstance().getDefaultSkin()
            );
            const opponentContestant = this._spawnDefaultContestant();
            opponentContestant.setPosition(initialPositions[i + 1].getPosition());
            this.allOpponents.push(opponentContestant);
            loadingPromises.push(opponentContestant.setFromContestantData(opponentContestantData));
            opponentContestant.setLocalScale(pc.Vec3.ZERO);
            opponentContestant.enabled = false;
        }

        /* load everything */
        Promise.all([...loadingPromises]).then(() => {
            this._opponentsCreated = true;
            resolve();
        });
    });
};

TournamentManager.prototype._spawnDefaultContestant = function () {
    const contestant = TemplateManager.getInstance().instantiate('ContestantPlayer');
    this.contestantsContainer.addChild(contestant);
    contestant.setYaw(180, true);
    contestant.setGravityEnabled(false);
    this.opponentContestants.push(contestant);
    return contestant;
};


TournamentManager.prototype._generateRandomOpponents = async function (delay = 0.25) {
    return new Promise((resolve, reject) => {
        const loadingPromises = [];

        const opponentColorsList = Utils.shuffle(GameConfig.getAttribute('opponentColors').slice());
        const opponentNames = Utils.shuffle(LocalizationManager.getInstance().getPlayerNames());
        this.allOpponents.forEach((opponentContestant, index) => {
            const opponentContestantData = new ContestantData(
                Constants.Contestants.OPPONENT,
                opponentNames[index % opponentNames.length],
                opponentColorsList[index % opponentColorsList.length],
                SkinManager.getInstance().getRandomTournamentSkin()
            );
            loadingPromises.push(opponentContestant.setFromContestantData(opponentContestantData));
            opponentContestant.showTournamentName();
        });

        /* load everything */
        Promise.all([...loadingPromises, Utils.wait(delay * 1000)]).then(() => {
            resolve();
        });
    });
};


TournamentManager.prototype._loadOpponentsFromSaveData = async function (saveDataAlive, saveDataEliminated) {
    return new Promise((resolve, reject) => {
        const loadingPromises = [];
        const saveDatas = [...saveDataAlive, ...saveDataEliminated];
        this.opponentContestants = [];
        this.opponentContestantsEliminated = [];

        saveDatas.forEach((record, index) => {
            const contestant = this.allOpponents[index];
            if (contestant) {
                const contestantData = new ContestantData().parseFromSaveObject(record);
                loadingPromises.push(contestant.setFromContestantData(contestantData));

                if (saveDataEliminated.indexOf(record) !== -1) {
                    this.opponentContestantsEliminated.push(contestant);
                } else {
                    this.opponentContestants.push(contestant);
                }
            } else {
                console.warn('can not load savedata #' + index + ': no contestant in position');
            }
        });

        Promise.all([...loadingPromises]).then(() => {
            resolve();
        });
    });
};




// TournamentBanner.js
var TournamentBanner = pc.createScript('tournamentBanner');


TournamentBanner.prototype.initialize = function() {
    this.billboard = this.entity.findByName('BillBoard');
    this.planeBlue = this.billboard.findByName('PlaneBlue');
    this.planePink = this.billboard.findByName('PlanePink');
    this.tournamentScreen = this.billboard.findByName('TournamentScreen');
    this.cupIcon = this.billboard.findByName('CupIcon');
    this.boardText = this.billboard.findByName('BoardText');


    this.app.on(EventTypes.SET_TOURNAMENT_BANNER_VISIBLE, this.setBannerVisible, this);
    this.app.on(EventTypes.SET_TOURNAMENT_BANNER_INFO, this.setBannerInfo, this);
};

TournamentBanner.prototype.setBannerVisible = function(value) {
    this.billboard.enabled = value;
};

TournamentBanner.prototype.setBannerInfo = function(data) {
    if(data) {
        this.planeBlue.enabled = false;
        this.planePink.enabled = true;
        this.tournamentScreen.enabled = true;
        //TODO add tournament info
    } else {
        this.planeBlue.enabled = true;
        this.planePink.enabled = false;
        this.tournamentScreen.enabled = false;
    }
};



TournamentBanner.prototype.update = function(dt) {

};



// Screen_TournamentTicket.js
class ScreenTournamentTicket extends BaseWindow {

    initialize() {
        super.initialize();

        this.confettiContainer = this.entity.findByName('ConfettiParticleSystem');
        this.puzzleReward = this.entity.findByName('PuzzleReward');
        this.puzzleRewardText = this.puzzleReward.findByName('RewardText');
        this.moneyReward = this.entity.findByName('MoneyReward');
        this.moneyRewardText = this.moneyReward.findByName('RewardText');

        this.tournamentInfo = this.moneyReward.findByName('TournamentInfo');

        this.locationText = this.moneyReward.findByName('LocationText');
        this.typeText = this.moneyReward.findByName('TypeText');

        this.buttonJoin = this.entity.findByName('JoinButton');

        this.buttonJoin.on(EventTypes.BUTTON_PRESSED, this.onJoinPressed, this);
        this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        this.buttonJoin.setAvailable(true);

        const tournamentInfo = TournamentManager.getInstance().getCurrentTournamentInfo();
        if (tournamentInfo) {
            if (tournamentInfo.reward.puzzles) {
                this.puzzleReward.enabled = true;
                this.puzzleRewardText.element.text = `${tournamentInfo.reward.puzzles}`;
            } else {
                this.puzzleReward.enabled = false;
            }

            if (tournamentInfo.reward.money) {
                this.moneyReward.enabled = true;
                this.moneyRewardText.element.text = `${tournamentInfo.reward.money}`;
            } else {
                this.moneyReward.enabled = false;
            }
        }

        super._onShow();
    }


    _onHide() {
        super._onHide();
    }

    onResize(width, height) {
        this._updateConfettiScale();
        Utils.wait(500).then(() => {
            this._updateConfettiScale();
        });
    };

    _updateConfettiScale() {
        this.confettiContainer.children.forEach(child => {
            const extents = child.particlesystem.emitterExtents;
            extents.x = pc.math.lerp(window.innerWidth / pc.app.graphicsDevice.maxPixelRatio * 1.25, window.innerWidth * pc.app.graphicsDevice.maxPixelRatio / UIController.getInstance().getScreenScale(), UIController.getInstance().getScaleBlend())
            child.particlesystem.emitterExtents = new pc.Vec3().copy(extents);
        })
    }

    update(dt) {

    }

    /* button handlers */
    onJoinPressed() {
        this.buttonJoin.setAvailable(false);
        this.proceedToNextScreen();
    }

    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.TOURNAMENT_TICKET);
    }
}

pc.registerScript(ScreenTournamentTicket, 'screenTournamentTicket');


// TournamentInfo.js
var TournamentInfo = pc.createScript('tournamentInfo');

TournamentInfo.prototype.initialize = function() {
    this.cupIcon = this.entity.findByName('CupIcon');
    this.locationText = this.entity.findByName('Location');
    this.typeText = this.entity.findByName('Type');

    this.app.on(EventTypes.UPDATE_CURRENT_TOURNAMENT_INFO, this._updateInfo, this);
};

TournamentInfo.prototype._updateInfo = function(data) {
    this.locationText.element.text = `${data.location}`;

    switch(data.type) {
        case Constants.TOURNAMENT_TYPE.QUALIFIER:
            this.typeText.element.key = 'QUALIFIER';
            this.cupIcon.element.spriteAsset = this.app.assets.find('cup-bronze', 'sprite');
            break;
        case Constants.TOURNAMENT_TYPE.SEMI_FINAL:
            this.typeText.element.key = 'SEMI FINAL';
            this.cupIcon.element.spriteAsset = this.app.assets.find('cup-silver', 'sprite');
            break;
        case Constants.TOURNAMENT_TYPE.FINAL:
            this.typeText.element.key = 'FINAL';
            this.cupIcon.element.spriteAsset = this.app.assets.find('cup-gold', 'sprite');
            break;
    }
};


TournamentInfo.prototype.update = function(dt) {
    if(!this._infoInitialized) {
        this._infoInitialized = true;
        this._updateInfo(TournamentManager.getInstance().getCurrentTournamentInfo());
    }
};


// Screen_TournamentDefeat.js
class ScreenTournamentDefeat extends BaseWindow {

    initialize() {
        super.initialize();

        this.tournamentInfo = this.entity.findByName('TournamentInfo');
        this.positionText = this.entity.findByName('TextPosition');

        this.buttonRevive = this.entity.findByName('ReviveButton');
        this.buttonNoThanks = this.entity.findByName('ButtonNoThanks');
        this.buttonTapToContinue = this.entity.findByName('TapToContinueButton');

        this.buttonRevive.on(EventTypes.BUTTON_PRESSED, this._acceptRevive, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this._declineRevive, this);
        this.buttonTapToContinue.on(EventTypes.BUTTON_PRESSED, this._declineRevive, this);

        this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        this._unlockButtons();

        const positionValue = Math.pow(2, (TournamentManager.getInstance().totalMatches - Math.max(TournamentManager.getInstance().currentMatchIndex, 0)));
        this.positionText.element.text = `${positionValue}`;

        super._onShow();

        this._showButtons();
    }


    _onHide() {
        super._onHide();
    }

    onResize(width, height) {

    };


    update(dt) {

    }


    async _showButtons() {
        this.buttonRevive.enabled = false;
        this.buttonNoThanks.enabled = false;
        this.buttonTapToContinue.enabled = false;

        const hasRewardedVideo = await APIMediator.checkRewardedVideoAvailability('button:tournament:revive');
        const reviveAvailable = hasRewardedVideo && !TournamentManager.getInstance().isLastMatch();

        this.buttonRevive.enabled = reviveAvailable;
        this.buttonNoThanks.enabled = reviveAvailable;
        this.buttonTapToContinue.enabled = !reviveAvailable;
    }

    _lockButtons() {
        this.buttonRevive.setAvailable(false);
        this.buttonNoThanks.setAvailable(false);
        this.buttonTapToContinue.setAvailable(false);
    }

    _unlockButtons() {
        this.buttonRevive.setAvailable(true);
        this.buttonNoThanks.setAvailable(true);
        this.buttonTapToContinue.setAvailable(true);
    }


    /* button handlers */
    async _acceptRevive() {
        this._lockButtons();
        const result = await APIMediator.watchRewardedVideo('button:tournament:revive');
        if (result) {
            this.proceedToNextScreen();
        } else {
            this._unlockButtons();
        }
    }

    _declineRevive() {
        this._lockButtons();
        TournamentManager.getInstance().declineRevive();
        this.proceedToNextScreen();        
    }


    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.TOURNAMENT_DEFEAT);
    }
}

pc.registerScript(ScreenTournamentDefeat, 'screenTournamentDefeat');


// Screen_TournamentClaimPrize.js
class ScreenTournamentClaimPrize extends BaseWindow {

    initialize() {
        super.initialize();

        this.rewardMoney = GameConfig.getAttribute('tournament', 'victoryMoneyReward');
        this.rewardPieces = GameConfig.getAttribute('tournament', 'victoryPuzzleReward');
        this.rewardMultiplier = 1;

        this.randomNotCompletedScene = null;

        this.prizeContainer = this.entity.findByName('PrizeContainer');
        this.prizePuzzleContainer = this.prizeContainer.findByName('PuzzleReward');
        this.prizeMoneyContainer = this.prizeContainer.findByName('MoneyReward');

        this.prizeMoneyIcon = this.prizeContainer.findByName('IconMoney');
        this.prizeMoneyText = this.prizeContainer.findByName('MoneyText');
        this.prizePuzzleIcon = this.prizeContainer.findByName('IconPuzzle');
        this.prizePuzzleText = this.prizeContainer.findByName('PuzzleText');

        this.currencyCounter = this.entity.findByName('CurrencyCounterSmall');

        this.doubleOfferContainer = this.entity.findByName('DoubleOfferContainer');
        this.buttonX2Rewarded = this.doubleOfferContainer.findByName('DoubleRewardButton');
        this.buttonNoThanks = this.doubleOfferContainer.findByName('ButtonNoThanks');

        this.buttonX2Rewarded.on(EventTypes.BUTTON_PRESSED, this._acceptDoubleReward, this);
        this.buttonNoThanks.on(EventTypes.BUTTON_PRESSED, this._declineDoubleReward, this);


        this.app.on(EventTypes.Screen.RESIZED, this.onResize, this);
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        this.currencyCounter.enabled = false;
        this.doubleOfferContainer.enabled = false;

        const tournamentInfo = TournamentManager.getInstance().getCurrentTournamentInfo();
        if (tournamentInfo) {
            this.rewardMoney = tournamentInfo.reward.money;
            this.rewardPieces = tournamentInfo.reward.puzzles;
        } else {
            this.rewardMoney = GameConfig.getAttribute('tournament', 'victoryMoneyReward');
            this.rewardPieces = GameConfig.getAttribute('tournament', 'victoryPuzzleReward');
        }
        this.rewardMultiplier = 1;

        this.randomNotCompletedScene = SceneManager.getInstance().getRandomNotCompletedScene();
        if (this.randomNotCompletedScene && this.rewardPieces > 0) {
            this.prizePuzzleContainer.enabled = true;
        } else {
            this.randomNotCompletedScene = null;
            this.rewardPieces = 0;
            this.prizePuzzleContainer.enabled = false;
        }

        this.prizeMoneyText.element.text = `${this.rewardMoney * this.rewardMultiplier}`;
        this.prizePuzzleText.element.text = `${this.rewardPieces * this.rewardMultiplier}`;
    }


    _onHide() {
        super._onHide();
    }


    _onAppeared() {
        this._unlockButtons();

        APIMediator.checkRewardedVideoAvailability('button:tournament:doublereward').then(result => {
            if (result) {
                this.doubleOfferContainer.enabled = true;
                this.doubleOfferContainer.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
            } else {
                this.claimReward().then(() => {
                    this.proceedToNextScreen();
                });
            }
        });
    }

    async _acceptDoubleReward() {
        this._lockButtons();
        const result = await APIMediator.watchRewardedVideo('button:tournament:doublereward');
        if (result) {
            this.rewardMultiplier = 2;
            this.prizeMoneyText.element.text = `${this.rewardMoney * this.rewardMultiplier}`;
            this.prizePuzzleText.element.text = `${this.rewardPieces * this.rewardMultiplier}`;
            this.claimReward().then(() => {
                this.proceedToNextScreen();
            });
        } else {
            this._unlockButtons();
        }

    }

    _declineDoubleReward() {
        this.rewardMultiplier = 1;

        this.claimReward().then(() => {
            this.proceedToNextScreen();
        });
    }

    claimReward() {
        return new Promise((resolve, reject) => {
            this._lockButtons();

            this.doubleOfferContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);

            Utils.wait(1000).then(() => {
                this.prizeContainer.fire(EventTypes.UI_ELEMENT.DISAPPEAR);
            });

            this.acquireReward(this.prizeMoneyIcon.getPosition(), this.rewardMoney * this.rewardMultiplier).then(() => {
                LocalStorageController.save();
                Utils.wait(350).then(() => resolve());
            });
        })
    }

    acquireReward(_fromPosition, totalMoney) {
        return new Promise((resolve, reject) => {

            this.currencyCounter.show().then(async () => {
                await this.currencyCounter.spawnAndPickupMoney(_fromPosition, totalMoney, 1.25);
                await this.unlockPuzzleIfHasOne();
                resolve();
            });
        })
    }

    async unlockPuzzleIfHasOne() {
        if (!this.randomNotCompletedScene || this.rewardPieces <= 0) return;

        const acquireResult = SceneManager.getInstance().acquirePiece(this.randomNotCompletedScene.name, this.rewardPieces);
        if (acquireResult) {
            UIController.getInstance().showPopup(Constants.Screens.PUZZLE);
            await UIController.getInstance().waitWhenScreenHidden(Constants.Screens.PUZZLE);
        } else {
            return;
        }
    }


    onResize(width, height) {

    };


    update(dt) {

    }

    _lockButtons() {
        this.buttonX2Rewarded.setAvailable(false);
        this.buttonNoThanks.setAvailable(false);
    }

    _unlockButtons() {
        this.buttonX2Rewarded.setAvailable(true);
        this.buttonNoThanks.setAvailable(true);
    }

    proceedToNextScreen() {
        UIController.getInstance().hide(Constants.Screens.TOURNAMENT_CLAIM_PRIZE);
    }
}

pc.registerScript(ScreenTournamentClaimPrize, 'screenTournamentClaimPrize');


// Screen_TournamentStart.js
class ScreenTournamentStart extends BaseWindow {

    initialize() {
        super.initialize();

        this.overlay = this.entity.findByName('Overlay');
        this.roundTitle = this.entity.findByName('RoundTitle');
        this.textScoreMultiplier = this.entity.findByName('ScoreMultiplierText');
        this.textCountdown = this.entity.findByName('TextCountdown');
        this.textGo = this.entity.findByName('TextGo');
        this.playerName = this.entity.findByName('PlayerName');
        this.opponentName = this.entity.findByName('OpponentName');
    }


    _initComponents() {
        super._initComponents();
    }


    _onShow() {
        super._onShow();

        /* hide texts */
        this.textCountdown.element.opacity = 0;
        this.textGo.element.opacity = 0;
        this.roundTitle.enabled = false;
        this.textScoreMultiplier.enabled = false;

        /* contestants */
        this._showPlayerContenstant();
        this._showOpponentContestant();
        
        /* set their data & colors */
        this.playerName.element.text = DataManager.getInstance().username || "You";
        this.playerName.element.color = new pc.Color().copy(MatchManager.getInstance().getPlayerContestantData().color.UI);

        const opponentData = MatchManager.getInstance().getOpponentContestantData();
        DataManager.getInstance().opponentName = opponentData.name;
        this.opponentName.element.text =  DataManager.getInstance().opponentName || "You";
        this.opponentName.element.color = new pc.Color().copy(opponentData.color.UI);
        this.app.fire(EventTypes.SET_CONTESTANT_COLORS, Constants.Contestants.OPPONENT, opponentData.color);

        /* camera transition */
        CameraController.getInstance().changeCamera(Constants.Cameras.TRANSITION_LOBBY_TOURNAMENT_TO_TOURNAMENT_START).then(() => {
            CameraController.getInstance().changeCamera(Constants.Cameras.ROUND_SEARCH).then(() => {
                this.startCountdown();
            });
        });
    }

    _onHide() {
        /* show buzzers */
        this.app.fire(EventTypes.SHOW_BUZZER_LIGHTS);
        this.app.fire(EventTypes.SHOW_BUZZERS);
        this.app.fire(EventTypes.SHOW_AUDIENCE_AREAS);

        super._onHide();
    }


    _showPlayerContenstant() {
        const duration = 0.75;

        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        const playerPositionA = HierarchyManager.getInstance().getByPath('Stage/StageContent/RoundSearchPositions').children[0];
        playerA.setAboveUI(true);
        playerA.setYaw(180);
        playerA.setTrigger('idle');
        ContestantsManager.getInstance().tweenContestantTo(playerA, playerPositionA, duration, pc.Linear);
        playerA.tween(playerA.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, duration, pc.SineOut)
            .start();
    }

    async _showOpponentContestant() {
        const duration = 0.75;

        const playerB = ContestantsManager.getInstance().getOpponentContestant();
        const playerPositionB = HierarchyManager.getInstance().getByPath('Stage/StageContent/RoundSearchPositions').children[1];
        playerB.setAboveUI(true);
        playerB.setYaw(180, true);
        playerB.setTrigger('idle');
        ContestantsManager.getInstance().tweenContestantTo(playerB, playerPositionB, duration, pc.Linear);
        await ContestantsManager.getInstance().appearOpponentContestant();
    }

    startCountdown() {
        const baseDelay = 500;
        const tickDelay = 850;
        const roundIndex = RoundManager.getInstance().getRoundIndex();

        this.roundTitle.enabled = true;
        this.roundTitle.element.text = LocalizationManager.getInstance().getLocalizedText(`ROUND ${roundIndex}`);
        this.roundTitle.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);

        if (roundIndex >= 1) {
            this.textScoreMultiplier.enabled = true;
            const textValues = ['', '', 'DOUBLE POINTS', 'TRIPLE POINTS']
            this.textScoreMultiplier.element.text = LocalizationManager.getInstance().getLocalizedText(textValues[roundIndex] || "");
            this.textScoreMultiplier.fire(EventTypes.UI_ELEMENT.APPEAR_MANUALLY);
        }

        Utils.wait(baseDelay).then(() => this._tweenCountdownText(3));
        Utils.wait(baseDelay + tickDelay).then(() => this._tweenCountdownText(2));
        Utils.wait(baseDelay + tickDelay * 2).then(() => this._tweenCountdownText(1));
        Utils.wait(baseDelay + tickDelay * 3).then(() => this._tweenGoText());
        Utils.wait(baseDelay + tickDelay * 4.25).then(() => this.proceedToNextScreen())
    }

    _tweenCountdownText(value) {
        this.textCountdown.element.text = `${value}`;
        this.textCountdown.setLocalScale(0, 0, 0);
        this.textCountdown.tween(this.textCountdown.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, 0.425, pc.SineInOut)
            .repeat(2)
            .yoyo(true)
            .start();

        this.textCountdown.element.opacity = 0;
        this.textCountdown.tween(this.textCountdown.element)
            .to({ opacity: 1 }, 0.25, pc.SineInOut)
            .repeat(2, 0.35)
            .yoyo(true)
            .start();
    }

    _tweenGoText() {
        this.textGo.setLocalScale(0, 0, 0);
        this.textGo.tween(this.textGo.getLocalScale())
            .to({ x: 1, y: 1, z: 1 }, 0.5, pc.BackOut)
            .repeat(2, 0.75)
            .yoyo(true)
            .start();

        this.textGo.element.opacity = 0;
        this.textGo.tween(this.textGo.element)
            .to({ opacity: 1 }, 0.25, pc.SineInOut)
            .repeat(2, 0.5)
            .yoyo(true)
            .start();

    }

    _tweenContestantsToRoundPositions() {
        const playerA = ContestantsManager.getInstance().getPlayerContestant();
        const playerB = ContestantsManager.getInstance().getOpponentContestant();
        const contestantPositionA = HierarchyManager.getInstance().getByPath('Stage/StageContent/ContestantPositions/ContenstantPositionA');
        const contestantPositionB = HierarchyManager.getInstance().getByPath('Stage/StageContent/ContestantPositions/ContenstantPositionB');

        playerA.setAboveUI(false);
        playerB.setAboveUI(false);

        ContestantsManager.getInstance().tweenContestantTo(playerA, contestantPositionA, 0.5, pc.SineOut);//.then(() => playerA.setAboveUI(false));
        ContestantsManager.getInstance().tweenContestantTo(playerB, contestantPositionB, 0.5, pc.SineOut);//.then(() => playerB.setAboveUI(false));
    }

    update(dt) {

    }

    proceedToNextScreen() {
        this._tweenContestantsToRoundPositions();

        CameraController.getInstance().changeCamera(Constants.Cameras.TRANSITION_ROUND_SEARCH_TO_ROUND).then(() => {
            CameraController.getInstance().changeCamera(Constants.Cameras.ROUND);
        });

        UIController.getInstance().hide(Constants.Screens.TOURNAMENT_START);

        MatchManager.getInstance().showHintAndProceedToRound();
    }

}

pc.registerScript(ScreenTournamentStart, 'screenTournamentStart');

