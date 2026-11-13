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
            logo.src = 'data:image/jpeg;base64,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';
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

            const loaderOverlay = document.createElement('div');
            loaderOverlay.id = 'preloader';
            loaderOverlay.classList.add('preloader-hidden');
            document.body.appendChild(loaderOverlay);

            const loaderAnimationContainer = document.createElement('div');
            loaderAnimationContainer.id = 'preloaderAnimation';
            loaderOverlay.appendChild(loaderAnimationContainer);

            const loadingImage = document.createElement('img');
            loadingImage.id = 'walking-model';
            loaderAnimationContainer.appendChild(loadingImage);

            const loadingTextDiv = document.createElement('div');
            loadingTextDiv.id = 'loading-text';
            loaderAnimationContainer.appendChild(loadingTextDiv);
        };


        /* loading progress */
        let loadingProgress = 0;
        let realProgress = 0;
        let simulatedProgress = 0;
        const realProgressRange = 0.6;
        const simulatedProgressRange = 1 - realProgressRange;
        let simulationStep = 0;
        let simulationTotalSteps = 0;
        let simulationInterval = null;

        const sineOut = (k) => {
            if (k === 0) return 0;
            if (k === 1) return 1;
            return Math.sin(k * Math.PI / 2);
        }

        const updateProgressSimulation = () => {
            simulationStep += 1;
            simulatedProgress = sineOut(pc.math.clamp(simulationStep / simulationTotalSteps, 0, 1));
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
            pc.app.fire(EventTypes.HIDE_TRANSITION_SCREEN, 0.5, () => {
            });

            LoadingOverlay.transition(
                { color: '#fcb6dd', transitionDuration: 0.0, displayLoadingAnimation: false },
                { color: '#fcb6dd', transitionDuration: 0.5 },
                () => {
                    var splash = document.getElementById('application-splash-wrapper');
                    splash.parentElement.removeChild(splash);

                    const inputBlocker = pc.app.root.findByName('InputBlocker');
                    if (inputBlocker) inputBlocker.enabled = false;

                    APIMediator.sendPreloadProgress(100);
                    APIMediator.initCallbacks();
                    APIMediator.reportGameReady();
                }
            );
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
                '    background-color: #ffcedb;',
                '}',
                '',
                '#application-splash-wrapper {',
                '    position: absolute;',
                '    top: 0;',
                '    left: 0;',
                '    height: 100%;',
                '    width: 100%;',
                '    background: radial-gradient(#ffe4f3, #f585c4);',
                '}',
                '',
                '#application-splash {',
                '    position: absolute;',
                '    top: calc(50% - 150px);',
                '    width: 264px;',
                '    left: calc(50% - 132px);',
                '}',
                '',
                '#application-splash img {',
                '    width: 100%;',
                '    border-radius: 24px;',
                '}',
                '',
                '#progress-bar-container {',
                '    margin: 20px auto 0 auto;',
                '    height: 12px;',
                '    width: 100%;',
                '    background: #ffffff;',
                '    border: 1px solid #cc3a8e;',
                '    border-radius: 12px;',
                '}',
                '',
                '#progress-bar {',
                '    width: 0%;',
                '    height: 100%;',
                '    background-color: #ff85cb;',
                '    border-radius: 12px;',
                '}',
                `
            :root {
                --preloader-transition-duration: 0.2s;
            }

            #preloader {
                display: block;
                position: absolute;
                background: #000000;
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
                top: calc(50% - 48px);
                left: 50%;
                z-index: 9999;
            }

            #loading-text {
                font-family: 'system-ui';
                font-size: 28px;
                text-align: center;
                font-weight: lighter;
                color: #ffffff;
                width: 240px;
                margin-left: -120px;
                margin-top: 10px;
            }

            #walking-model {
                background: transparent;
                background-size: cover;
                width: 256px;
                height: 256px;
                margin-left: -128px;
                margin-top: -128px;
            }

            @media (max-width: 480px) or (max-height: 480px) {

                #application-splash {
                    width: 170px;
                    left: calc(50% - 85px);
                    top: calc(50% - 120px);
                }

                #preloaderAnimation {
                    top: calc(50% - 32px);
                }

                #loading-text {
                    font-size: 21px;
                    width: 180px;
                    margin-left: -90px;
                    margin-top: 5px;
                }


                #walking-model {
                    width: 192px;
                    height: 192px;
                    margin-left: -98px;
                    margin-top: -98px;
                }
            }

           `
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

        startProgressSimulation(12);

        app.on('preload:start', function () {

        });
        app.on('preload:end', function () {
            app.off('preload:progress');
        });
        app.on('preload:progress', (progress) => {
            realProgress = progress;
            updateProgress();
        });
        app.on('start', () => {

            /* lock input to prevent clicking through the loading screen */
            const inputBlocker = app.root.findByName('InputBlocker');
            if (inputBlocker) {
                inputBlocker.enabled = true;
                inputBlocker.element.useInput = true;
            }

            /* block screen to prevent acidental clicks */
            pc.app.fire(EventTypes.SHOW_TRANSITION_SCREEN, 0);

            /* wait until all the scene assets loaded, then remove the loading screen */
            EventTypes.afterAll(EventTypes.LOCATION_CHANGED, EventTypes.LEVEL_CLOTHES_READY).then(() => {
                AssetsLoader.getInstance().loadPendingAssets().then(() => {
                    finishProgressSimulation();
                    hideSplash();
                });
            })
        });
    });
};

if (APIMediator.isPlaycanvasEnvironment() && typeof GameInterface !== 'undefined') {
    window.GameInterface.init([], {
        "features": {
            "rewarded": true,
            "audio": true,
            "tutorial": false,
            "copyright": true,
            "credits": true,
            "privacy": true,
            "score": true,
            "progress": true,
            "visibilitychange": true
        }
    }).then(() => {
        window._createLoadingScreen();
    });
} else {
    console.warn('GameInterface is not loaded!');
    window._createLoadingScreen();
}
