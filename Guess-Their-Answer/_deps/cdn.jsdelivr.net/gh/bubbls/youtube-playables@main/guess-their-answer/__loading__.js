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
            logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAMAAACTGUWNAAAAn1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Kd3m4AAAANHRSTlMAJeIq5fYG1VucCCP6mKbxDx7q29HORKAvX1fnu8pJC8duVDJ2UDmqgXsYhkCQZMJxarNcQ99vygAADsVJREFUeNrsnEFrg0AQRsdtWGiNq1ZcBBuJDSkEctz//9t66KWFNjo7FueDeecc3ovBqLsOrebl4/bmjslY4OjebhdPW+NjOCRjJYcQPW1KWdXJYFBXJW1I7JPBpI+0GVeXDDbuShsR7fvPwkXahNLOP5n0JW2Ar5KRSeVJTrTrn2zqSGJ8SEY2wZOUYUxGNuNAUuZkCJhJip2BRAQS0pyTIeDckIy2S4aAriUZhd0Fi3CFHQAO+g6AnYJkdK39CTNR9idsl6Eygt2IsVF2I2aPIiSMgz2M46LtYZw9jhZQR1uQ4aNtQcaWJLPpS1uUZ6NwUd62pUi3pci521mITX+3rYlc9G5NJPIx2B3ZasYQPW2NH+Zw6g4LvB7TQ46vB9XI/btTmAdP/0PTPi0wjQu/jelJNXL/tqE9KV16iCtJNej+VCwFFKQadH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/+AB0f/gAdH/4AHR/YUDTcrd36/JXQH6Av8zh1H294LB+/r4efyXkBvgpjN9f8Zk8rUKLvxoyA4rnOv2gfl5XqsRfD3kBsc+dv6/DXxFZAe/u14++0zIq/DWRExBd/qv+GvxVkRFQ9oJhFwr8dcEP8JVk3Mv+/srgB0x1+pN6ogX291cGO8AH0civ3f21wQ4YRtHQu939tcEOmGVjH3f31wY7IMgGn+7urw1uQHMWjv61AyALaDvh8Gs7AJ/snYty2jAQRbdx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';
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

        const backgroundImageDataURL = 'url("data:image/png;base64,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WHR4bXA6TWV0YWRhdGFEYXRlADIwMjItMDYtMjlUMTI6NDE6NTIrMDI6MDAgCgTtAAAAKHRFWHR4bXA6TW9kaWZ5RGF0ZQAyMDIyLTA2LTI5VDEyOjQxOjUyKzAyOjAwHK5XUwAAABh0RVh0eG1wOlBpeGVsWERpbWVuc2lvbgAxMDI0YdamzwAAABh0RVh0eG1wOlBpeGVsWURpbWVuc2lvbgAxMDI02C19JwAAAD50RVh0eG1wTU06RGVyaXZlZEZyb20AeG1wLmRpZDplY2U4OWViZi1iNmY0LTRiNzAtOWQwNC0zZjA1YjE1MmNmZjWOiz6XAAAAS3RFWHR4bXBNTTpEb2N1bWVudElEAGFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZDkxZjY5Zi1kMzcwLTM0NGYtYTMxOC04YTcxYjVhMDc5ZGMjfcu9AAAAPXRFWHR4bXBNTTpJbnN0YW5jZUlEAHhtcC5paWQ6OTRjMTI4NWUtMTg4Yy1hMTRlLThiMmMtNzVmZjczYzNmNTVlp/oOmwAAAEV0RVh0eG1wTU06T3JpZ2luYWxEb2N1bWVudElEAHhtcC5kaWQ6ZWNlODllYmYtYjZmNC00YjcwLTlkMDQtM2YwNWIxNTJjZmY1uDastAAAAABJRU5ErkJggg==") no-repeat center'

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
