
      const CHANGE_ASPECT_RATIO = true;

      var bodyElement = document.getElementsByTagName("body")[0];
      var statusElement = document.getElementById("status");
      var progressElement = document.getElementById("progress");
      var spinnerElement = document.getElementById("spinner");
      var canvasElement = document.getElementById("canvas");
      var outputElement = document.getElementById("output");
      var outputContainerElement = document.getElementById("output-container");
      var qrElement = document.getElementById("QRCode");
      var qr2Element = document.getElementById("QR2Code");
      var qrButton = document.getElementById("QRButton");
      var qr2Button = document.getElementById("QR2Button");
      var pauseMenu = document.getElementById("pauseMenuContainer");
      var resumeButton = document.getElementById("resumeButton");
      var quitButton = document.getElementById("quitButton");

      const messageContainerElement = document.getElementById("message-container");
      const messagesElement = document.getElementById("messages");
      let rollbackMessages = [];

      let clearRollbackMessagesTimeoutId = -1;
      const showRollbackMessage = function (message) {
        let messages = "";
        rollbackMessages.push(message);
        rollbackMessages.forEach(m => messages += "<p>" + m + "</p>");

        messagesElement.innerHTML = messages;
        messageContainerElement.style.display = 'block';

        if (clearRollbackMessagesTimeoutId === -1) {
          clearTimeout(clearRollbackMessagesTimeoutId);
        }
        clearRollbackMessagesTimeoutId = setTimeout(clearRollbackMessages, 5000);
      };

      const clearRollbackMessages = function () {
        clearRollbackMessagesTimeoutId = -1;
        rollbackMessages = [];
        messageContainerElement.style.display = 'none';
      };

      var startingHeight, startingWidth;
      var startingAspect;
      var Module = {
        preRun: [],
        postRun: [],
        print: (function () {
          var element = document.getElementById("output");
          if (element) element.value = ""; // clear browser cache
          return function (text) {
            if (arguments.length > 1)
              text = Array.prototype.slice.call(arguments).join(" ");
            // These replacements are necessary if you render to raw HTML
            //text = text.replace(/&/g, "&amp;");
            //text = text.replace(/</g, "&lt;");
            //text = text.replace(/>/g, "&gt;");
            //text = text.replace('\n', '<br>', 'g');
            console.log(text);
            if (text === "Entering main loop.") {
              // It seems that this text ensures game is loaded.
              ensureAspectRatio();
            }
            if (element) {
              element.value += text + "\n";
              element.scrollTop = element.scrollHeight; // focus on bottom
            }
          };
        })(),
        printErr: function (text) {
          if (arguments.length > 1)
            text = Array.prototype.slice.call(arguments).join(" ");
          console.error(text);
        },
        canvas: (function () {
          var canvas = document.getElementById("canvas");

          return canvas;
        })(),
        setStatus: function (text) {
          if (!Module.setStatus.last)
            Module.setStatus.last = { time: Date.now(), text: "" };
          if (text === Module.setStatus.last.text) return;
          var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
          var now = Date.now();
          if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
          Module.setStatus.last.time = now;
          Module.setStatus.last.text = text;
          if (m) {
            text = m[1];
            progressElement.value = parseInt(m[2]) * 100;
            progressElement.max = parseInt(m[4]) * 100;
            progressElement.hidden = false;
            spinnerElement.hidden = false;
          } else {
            progressElement.value = null;
            progressElement.max = null;
            progressElement.hidden = true;

            // If there are no status text, we are finished and can display
            // the canvas and hide the spinner
            if (!text) {
              spinnerElement.style.display = "none";
              canvasElement.style.display = "block";
            }
          }
          statusElement.innerHTML = text;
        },
        totalDependencies: 0,
        monitorRunDependencies: function (left) {
          this.totalDependencies = Math.max(this.totalDependencies, left);
          Module.setStatus(
            left
              ? "Preparing... (" +
                  (this.totalDependencies - left) +
                  "/" +
                  this.totalDependencies +
                  ")"
              : "All downloads complete."
          );
        },
      };
      Module.setStatus("Downloading...");
      window.onerror = function (event) {
        // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
        Module.setStatus("Exception thrown, see JavaScript console");
        spinnerElement.style.display = "none";
        Module.setStatus = function (text) {
          if (text) Module.printErr("[post-exception status] " + text);
        };
      };

      // Route URL GET parameters to argc+argv
      if (typeof window === "object") {
        Module['arguments'] = window.location.search.substr(1).trim().split('&');
        // If no args were passed arguments = [''], in which case kill the single empty string.
        if (!Module['arguments'][0]) {
          Module['arguments'] = [];
        }
      }

      function toggleConsole() {
        var isShown = outputElement.style.display === "flex";
        if (isShown) {
          outputElement.style.display = "none";
          outputElement.scrollIntoView(false);
        } else {
          outputElement.style.display = "flex";
          outputElement.scrollIntoView(true);
        }
      }

      function toggleQRCode() {
        var isShown = !qrElement.hidden;
        if (isShown) {
          qrElement.hidden = true;
          qrButton.innerHTML = "Show QRCode";
        } else {
          qrElement.hidden = false;
          qrButton.innerHTML = "Hide QRCode";
        }
      }

      function toggleQRCode2() {
        var isShown = !qr2Element.hidden;
        if (isShown) {
          qr2Element.hidden = true;
          qr2Button.innerHTML = "Show Opera GX QRCode";
        } else {
          qr2Element.hidden = false;
          qr2Button.innerHTML = "Hide Opera GX QRCode";
        }
      }

      /*
      var g_extLostContext = null;

      function toggleWebGLContext() {
        if (g_extLostContext == null) {
          var canvas = document.getElementById('canvas');
          var gl = canvas.getContext('webgl2');
          g_extLostContext = gl.getExtension('WEBGL_lose_context');
        } // end if
        var button = document.getElementById("webglbutton");
        var text = button.textContent || button.innerText;
        if (text.trim() == "Lose WebGL Context") {
          g_extLostContext.loseContext();
          button.textContent = "Restore WebGL Context";
        } // end if
        else {
          g_extLostContext.restoreContext();
          button.textContent = "Lose WebGL Context";
          g_extLostContext = null;
        } // end else
      }
      */
      function toggleElement(id) {
        var elem = document.getElementById(id);
        if (elem) {
          elem.style.display = elem.style.display == 'block' ? 'none' : 'block';
        }
      }

      var g_pWadLoadCallback = undefined;
      function setWadLoadCallback( _wadLoadCallback ) 
      {
        g_pWadLoadCallback = _wadLoadCallback;
      }

      var g_pAddAsyncMethod = -1;

      function setAddAsyncMethod( asyncMethod )
      {
        g_pAddAsyncMethod = asyncMethod;
      }

      var g_pJSExceptionHandler = undefined;

      function setJSExceptionHandler( exceptionHandler )
      {
        if (typeof exceptionHandler == "function") {
            g_pJSExceptionHandler = exceptionHandler;
        } // end if
      } // end setJSExceptionHandler

      function hasJSExceptionHandler()
      {
        return (g_pJSExceptionHandler != undefined) && (typeof g_pJSExceptionHandler == "function");
      } // end hasJSExceptionHandler

      function doJSExceptionHandler( exceptionJSON )
      {
        if (typeof g_pJSExceptionHandler == "function") {
          var exception = JSON.parse( exceptionJSON );
          g_pJSExceptionHandler( exception );
        } // end if
      } // end doJSExceptionHandler

      function manifestFiles()
      {
        return [ "runner.data",
"runner.js",
"runner.wasm",
"audio-worklet.js",
"audiogroup1.dat",
"audiogroup2.dat",
"audiogroup3.dat",
"audiogroup4.dat",
"audiogroup5.dat",
"game.unx",
"micro_apedino_0.yytex",
"micro_ape_0.yytex",
"micro_ape_1.yytex",
"micro_ape_2.yytex",
"micro_ape_3.yytex",
"micro_avoid_0.yytex",
"micro_avoid_1.yytex",
"micro_baby_0.yytex",
"micro_baby_1.yytex",
"micro_ballbattle_0.yytex",
"micro_ballbattle_1.yytex",
"micro_bec_0.yytex",
"micro_bunnyfollow_0.yytex",
"micro_button_0.yytex",
"micro_coin_0.yytex",
"micro_cratememory_0.yytex",
"micro_cratememory_1.yytex",
"micro_defuse_0.yytex",
"micro_defuse_1.yytex",
"micro_defuse_2.yytex",
"micro_defuse_3.yytex",
"micro_defuse_4.yytex",
"micro_demoswing_0.yytex",
"micro_demoswing_1.yytex",
"micro_demoswing_2.yytex",
"micro_dinorun_0.yytex",
"micro_dodge_0.yytex",
"micro_firework_0.yytex",
"micro_foodcatch_0.yytex",
"micro_gartjump_0.yytex",
"micro_hammer_0.yytex",
"micro_hammer_1.yytex",
"micro_jetpack_0.yytex",
"micro_jetpack_1.yytex",
"micro_jetpack_2.yytex",
"micro_jetpack_3.yytex",
"micro_karatedodge_0.yytex",
"micro_karatedodge_1.yytex",
"micro_kiss_0.yytex",
"micro_kiss_1.yytex",
"micro_kittymeow_0.yytex",
"micro_kittymeow_1.yytex",
"micro_monstertruck_0.yytex",
"micro_mugshot_0.yytex",
"micro_mugshot_1.yytex",
"micro_mugshot_2.yytex",
"micro_mugshot_3.yytex",
"micro_nudematch_0.yytex",
"micro_nudematch_1.yytex",
"micro_nudematch_2.yytex",
"micro_onionring_0.yytex",
"micro_onionring_1.yytex",
"micro_onionring_2.yytex",
"micro_onionring_3.yytex",
"micro_pistol_0.yytex",
"micro_pistol_1.yytex",
"micro_pistol_2.yytex",
"micro_pistol_3.yytex",
"micro_pistol_4.yytex",
"micro_skate_0.yytex",
"micro_skate_1.yytex",
"micro_skate_2.yytex",
"micro_sketch_collect_0.yytex",
"micro_smash_0.yytex",
"micro_smash_1.yytex",
"micro_smash_2.yytex",
"micro_superhero_0.yytex",
"micro_washdog_0.yytex",
"micro_wizardstab_0.yytex",
"micro_wizardstab_1.yytex",
"micro_wizardstab_2.yytex",
"micro_wizardstab_3.yytex",
"micro_wizardstab_4.yytex",
"micro_wizardstab_5.yytex",
"micro_wizardstab_6.yytex",
"micro_wizardstab_7.yytex",
"micro_wizardstab_8.yytex",
"micro_wizardstab_9.yytex",
"tg_macro_knives_0.yytex",
"tg_macro_knives_1.yytex",
"tg_macro_knives_10.yytex",
"tg_macro_knives_11.yytex",
"tg_macro_knives_12.yytex",
"tg_macro_knives_13.yytex",
"tg_macro_knives_14.yytex",
"tg_macro_knives_15.yytex",
"tg_macro_knives_2.yytex",
"tg_macro_knives_3.yytex",
"tg_macro_knives_4.yytex",
"tg_macro_knives_5.yytex",
"tg_macro_knives_6.yytex",
"tg_macro_knives_7.yytex",
"tg_macro_knives_8.yytex",
"tg_macro_knives_9.yytex",
"videos/explosion.mp4" ].join( ";");
      }

      function manifestFilesMD5()
      {
        return [ "01982bf5763c164808e4b0b970c1b996",
"6fa6eb9e89ec21c79efd314b0247309d",
"bab3ba79820646b8429d00606d9c1db2",
"e8f1e8db8cf996f8715a6f2164c2e44e",
"d3d8ef0a54533b3fbee505528e01f52d",
"fad70d35e394c9e162ead52fb18fa4f6",
"c3e58567debd235f272c2bcc3ead688d",
"d047feef9d7d7dd06fcf0ba6a40b3cdc",
"8d48aa85bf933d5a25e4a3fa81452b26",
"45484c556a74ed2fa14777b2b6a2dea1",
"f84d3f931b332cb0ab17ee0f2a3e543b",
"51f7ef074b5c3f688cd3e01b86f43f0b",
"a5f064952b01fc357127d952db4a44e3",
"ad1f28620555bdbae50689acbb463890",
"6de6eccf0c053f14690b43c3182b9f7d",
"31cc825b6dc50712167a865d7bed2872",
"ef62075ea3c6f8eb1625e4f44d53b31c",
"9ce6095e50b5cc8cda717069f079142a",
"079ac781147a879630bfdf4426acd8b3",
"5aecc12090b830d42290c0a71f8a4461",
"de151e31cc9bf09c968df1310579dd78",
"5b81dcbe07e68709574e8b221df5dcc0",
"083a30fc579cc627eac79c3c52863833",
"ee78c9577eb5cdb103f79a548e50b3df",
"ca6da5d5d44ab7a087bda37b373c2f52",
"69bcaef6008a76dc69ab2b543d753107",
"e285ed369d3d179f38c16f0279850cce",
"b6dbe3947beca8247ff872b27713740c",
"72cbde2a28e3537be6c4bd881975289c",
"be2922a551bc817ab1c226950f319557",
"6d481e8260b806462212a843e7fbc8ef",
"4f36c4a50ed6b6735fbebd6b2b720712",
"0ef7633f26ac76d69ecf88f7901ebc50",
"e3acf9b3328d6eefcdf6ad441fe10193",
"7dc249f92014e638c236861e0cdfda96",
"d803448db7837bf27d7583d037ac2fdb",
"1f5e884f1855a736b6f41dd0a9f27d0c",
"d21067a4d54cc418a4351e48c175993a",
"acf161a6d58a1f2e3f7f9a24fdfee055",
"93bcbaccf9ff892a1bf3f6cfbad5a2d4",
"8ee6de277a689b6b09e8fd201abc9631",
"3c7783b45b1f1c55be040ceca50838e0",
"7f87852cd9451fd5641309c3cc91dd9c",
"2a0399447c134f06ef8e063ecb62a5f0",
"04a62cfb3000f3ca113660184b2f7554",
"d82fee809a87f775fb2d1e86d6fd1062",
"8f3e18b22494f8567d40098a7db64dd0",
"55a98f392d1884e8499731da988f18c6",
"29e37ce533ffc902d1eaa3ae3a5f7d67",
"251658515c59938126f3de1b1e058b3a",
"0c29a0668b605c231b7d95378456a5d3",
"4b3e6de3d829baf5bb90b7cf632dc0db",
"564fb3e754b72bc39ec7432007c5839e",
"e84853f1d6b87c592c6d6ce8544cd21e",
"a398dbbb42e6837cb6882810048dffa3",
"90e0b160eed0bf43c353c28ad9a58c56",
"00cdb1e53c8f125b5c944e790375806e",
"33d4309a578300eb2232c949e126a4cc",
"347deca80c54b470038ece28b5dd6787",
"303fbd123abf7fbd54a528eb446549bc",
"8488e2fb9548637c855e34ecff20ec57",
"51c3f1bc1edd30a456cc39d3837c1126",
"18d50769d2781bfd3cd96d48da081db5",
"b4261a458ff8be84798955879372bf75",
"7f4ef07623b1f5cdcfb9372b342fd7d4",
"86721fef73c5b72fd0ac26b557cb49d6",
"0a8131f7545dd050c9829cbb4723b32b",
"a5583ee81e410ec01b53cd09607b8547",
"6f1fa32c74597788ff3efb9bc015ff71",
"d61deb97a8959be57fb6662327a30397",
"d29982b48954b01f077053154350dd97",
"a7e753de50b78789a1d1bc3d8a673234",
"a98a86715b8583612e7d172d96f99958",
"d007b098d9caf589991774241faf62df",
"d597842403c84c95862dd0ee7b480ff9",
"1a098b5ce6124e37a6ba1ec9212b5cc8",
"ee755e75ce196a33e233591a44743e0f",
"d706f252d32b8d636ce87f25271d2c4e",
"cece74d4a84556d0950b40f92b4630d2",
"e838e22b462bd3fdb48d3cc583e0daf8",
"d1d4d87f2ba8fd9f6a3fd42d91f19cd4",
"c93d531ef5841d943b205d4de3802f2b",
"3f404f63b75a23ff3088015e7542b040",
"c58c1e99326543a4e2c4ce2bc5d38583",
"95f4c5708ad2b40f6a4a32832ae5f69f",
"03dc7b65744ae61a8c2b0020f468bb57",
"112353991936cb05f62c8e9f766076ac",
"a9489b24d16f0b0973e97617810e1ee8",
"efb618526a954aac33a2a72025296bbc",
"e36e43f94f754298bf74634d8add213b",
"c6bd18f1c7e184219630dc41104a5465",
"212c5e3d902d78c9b7b21c2c4df7a464",
"8ac882f6f73c97e43fc5e369624cc7c6",
"a3f4eefcf870dac10ed31926e25e9f99",
"d99c1e4be9899af4e5c47a5aee892f13",
"25e2b496c2a4f15c920add372baed566",
"51577099a4209f8818a90b135b957e70",
"8626a925f5104c3df27dfff42a3ee22e",
"f627f3f02e1f49f86d7bbd6dd68de638",
"c3ee4b88105273ffa6e4cfdde1bb7ff7",
"f5c37809e60743f76ba16538322db786",
"6ccb7c3ac2bb5683f57b48857b7ff4c0",
"e86932817217aed4ac6fc5a02ccd3c42",
"cdf801cdd25133a5a1aac9e6ac1357d5",
"62257d50ce039fb782aebeddeaab330c" ];
      }

      function onFirstFrameRendered()
      {
          //console.log("First frame rendered!");
      }

      function onGameSetWindowSize(width,height)
      {
          console.log("Window size set to width: " + width + ", height: " + height);

          startingHeight = height;
          startingWidth = width;
          startingAspect = startingWidth / startingHeight;
      }

    function triggerAd(adId, _callback_beforeAd, _callback_afterAd, _callback_adDismissed, _callback_adViewed, _callback_adbreakDone) {
       // need to take a copy of the RValues represented
       var pRValueCopy = triggerAdPrefix( _callback_beforeAd, _callback_afterAd, _callback_adDismissed, _callback_adViewed, _callback_adbreakDone );
       var pCallbackBeforeAd = pRValueCopy + (0*16);
       var pCallbackAfterAd = pRValueCopy + (1*16);
       var pCallbackAdDismissed = pRValueCopy + (2*16);
       var pCallbackAdViewed = pRValueCopy + (3*16);
       var pCallbackAdBreakDone = pRValueCopy + (4*16);

       adBreak({
         "type": "reward",                    // The type of this placement
         "name": adId,                        // A descriptive name for this placement

         "beforeAd": () => {                  // Prepare for the ad. Mute and pause the game flow
           console.log("beforeAd");
           // trigger _callback_beforeAd to game
           doGMLCallback( pCallbackBeforeAd, { id:adId } );
         },
         "afterAd" : () => {                   // Resume the game and re-enable sound
           console.log("afterAd");
           // trigger _callback_afterAd to game
           doGMLCallback( pCallbackAfterAd, { id:adId } );
         },
         "beforeReward": (showAdFn) => {      // Show reward prompt (call showAdFn() if clicked)
           console.log("beforeReward");
           showAdFn();
           // Setup native prompt to indicate ad will load
           // Will not be setup by dev so this UX controlled by GXC
         },
         "adDismissed": () => {               // Player dismissed the ad before it finished
           console.log("adDismissed");
           // trigger _callback_adDismissed to game
           doGMLCallback( pCallbackAdDismissed, { id:adId } );
         },
         "adViewed": () => {                  // Player watched the ad–give them the reward.
           console.log("adViewed");
           // trigger _callback_adViewed to game
           doGMLCallback( pCallbackAdViewed, { id:adId } );
         },
         "adBreakDone": (placementInfo) => {  // Always called (if provided) even if an ad didn't show
           console.log("adBreakDone");
           // trigger _callback_adBreakDone to game
           doGMLCallback( pCallbackAdBreakDone, { id:adId } );
           triggerAdPostfix( pRValueCopy );
         }, 
       });
      }

      function triggerPayment(itemId, _callback_PaymentComplete) {
        var pRValueCopy = triggerPaymentPrefix(_callback_PaymentComplete);
        setTimeout(() => {
          console.log("triggerPayment");
          doGMLCallback(pRValueCopy, { id:itemId });        
        }, 1000);
        triggerPaymentPostfix();
      }

      function ensureAspectRatio() {
        if (canvasElement === undefined) {
          return;
        }

        if (!CHANGE_ASPECT_RATIO) {
          return;
        }
        
        if (startingHeight === undefined && startingWidth === undefined) {
          return;
        }

        canvasElement.classList.add("active");

        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        var newHeight, newWidth;

        // Find the limiting dimension.
        var heightQuotient = startingHeight / maxHeight;
        var widthQuotient = startingWidth / maxWidth;

        if (heightQuotient > widthQuotient) {
          // Max out on height.
          newHeight = maxHeight;
          newWidth = newHeight * startingAspect;
        } else {
          // Max out on width.
          newWidth = maxWidth;
          newHeight = newWidth / startingAspect;
        }

        canvasElement.style.height = newHeight + "px";
        canvasElement.style.width = newWidth + "px";
      }

      function pause() { // Don't change the name - GX Mobile calls it when the app becomes inactive.
        if (!canvasElement.classList.contains("active")) { // Wait for the canvas to load.
          return
        }
        
        GM_pause();
        pauseMenu.hidden = false;
        canvasElement.classList.add("paused");
      }

      function resume() {
        GM_unpause();
        pauseMenu.hidden = true;
        canvasElement.classList.remove("paused");
        canvasElement.classList.add("unpaused");
        enterFullscreenIfSupported();
        lockOrientationIfSupported();
      }

      function quitIfSupported() {
        if (window.oprt && window.oprt.closeTab) { /* GX Mobile API */
          window.oprt.closeTab();
        } else if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
          window.chrome.runtime.sendMessage('mpojjmidmnpcpopbebmecmjdkdbgdeke', { command: 'closeTab' })
        }
      }

      function enterFullscreenIfSupported() {
        if (!window.oprt || !window.oprt.enterFullscreen) { /* GX Mobile API */
          return;
        }

        window.oprt.enterFullscreen();
        let viewStatus = GM_get_view_status();
        viewStatus.fullscreen = true;
        GM_set_view_status(viewStatus);
      }

      function lockOrientationIfSupported() {
        if (!window.oprt || !window.oprt.lockPortraitOrientation || !window.oprt.lockLandscapeOrientation) { /* GX Mobile API */
          return;
        }

        let viewStatus = GM_get_view_status();
        if (viewStatus.landscape === true && viewStatus.portrait === false) {
          window.oprt.lockPortraitOrientation();
        } else if (viewStatus.landscape === false && viewStatus.portrait === true) {
          window.oprt.lockPortraitOrientation();
        }
      }

      /* Observe the dimensions of body and ensureAspectRatio of the canvas (whilst taking up maximum space)
       *
       * NOTE(robertz):
       *  We also need to request an Animation Frame to do this, if we do not, resizeObserver might throw error
       *  "ResizeObserver loop limit exceeded", which means that
       *  "[...] ResizeObserver was not able to deliver all observations within a single animation frame"
       *  https://stackoverflow.com/a/50387233 (source).
       *
       *  There are different ways to solve the issue, since the error is benign (meaning it wont crash anything)
       *  we could choose to ignore it via changing the window.onerror method, i.e
       *  ```
       *  window.onerror((event)=> {
       *    if(event==="ResizeObserver loop limit exceeded") {
       *       return
       *    }
       *     ///...rest
       *  }
       *  ```
       *  But for now we request an animationFrame which seems to be the recommended way to go about it.
       *
       * NOTE(ddrechny):
       *  window.innerWidth/Height value updates are sometimes delayed in WebKit on iOS after an orientation
       *  change. Hence we're calling ensureAspectRatio one more time after a delay to minimize the risk of
       *  sizing the canvas with outdated values.
       */
      const resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(ensureAspectRatio);
        setTimeout(() => window.requestAnimationFrame(ensureAspectRatio), 100);
      });
      resizeObserver.observe(document.body);

      /* NOTE(ddrechny):
       *  Body needs to be scrollable on desktop browsers for debug buttons to be accessible.
       *  On mobile browsers scrolling can be activated accidentally and debug buttons aren't useful,
       *  so it's better to disable it.
       */
      if (/Android|iPhone|iPod/i.test(navigator.userAgent)) {
        bodyElement.className = "scrollingDisabled";
        canvasElement.classList.add("animatedSizeTransitions");
        outputContainerElement.hidden = true;
      }

      document.addEventListener("visibilitychange", (event) => {
        if (document.visibilityState != "visible") {
          pause();
        } else if (isMultiplayer()) {
          resume();
        }
      });

      window.addEventListener("load", (event) => {
        if ((!window.oprt || !window.oprt.enterFullscreen) && (!window.chrome || !window.chrome.runtime || !window.chrome.runtime.sendMessage)) {
          quitButton.hidden = true;
        }
      });

      setWadLoadCallback(() => {
        enterFullscreenIfSupported();
        lockOrientationIfSupported();
      });

      var read_ptr = 0;
      read_int = () => {
        var heap_slice = Module["HEAPU8"].subarray(read_ptr, read_ptr + 4);
        var buffer = new ArrayBuffer(4);
        var barray = new Uint8Array(buffer);
        for (var i = 0; i < 4; i++) barray[i] = heap_slice[i];
        var int_array = new Int32Array(buffer);
        var int = int_array[0];
        read_ptr += 4;
        return int;
      };

      read_pointer = () => {
        var ptr = Module.getValue(read_ptr, "*");
        read_ptr += 8;
        return ptr;
      };

      readPeer = () => {
        var peer = {
          peer: read_int(),
          local_frames_ahead: read_int(),
          rtt: read_int(),
          remote_frame_rate: read_int(),
          remote_frame_delay: read_int(),
        }

        return peer;
      }

      readStats = (s) => {
        read_ptr = s;

        var stats = {
          kbps_sent: read_int(),
          kbps_received: read_int(),
          pps_sent: read_int(),
          pps_received: read_int(),
          frame_rate: read_int(),
          rollbacks: read_int(),
          frame_delay: read_int(),
          skipped_frames: read_int(),
          rejected_inputs: read_int(),
          relay_rtt: read_int(),
          peer: read_int(),
          num_peers: read_int(),

          serialization_stats: {
            state_size: read_int(),
            managed_instances_num: read_int()
          },
          peers: []
        }

        read_ptr = read_pointer();
        for (var j = 0; j < stats.num_peers; ++j) {
          stats.peers.push(readPeer());
        }

        return stats;

      }

      var acceptable_rollback_frames = 0;
      var set_acceptable_rollback = (frames) => {
        acceptable_rollback_frames = frames;
      }

      drawLocal = (peers_elem, frame_delay_elem, relay_rtt_elem, peer_name, relay_rtt, frame_delay) => {
          drawPeer(peers_elem, frame_delay_elem, peer_name, 0, frame_delay, 0);

          const per_pixel = 100/16;
          const frames_rtt = relay_rtt/16; // To ceil, or not to ceil - that's the question.

          const y = 100 - frames_rtt * per_pixel;

          const relay_rtt_marker = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          relay_rtt_marker.setAttribute('x1', -2);
          relay_rtt_marker.setAttribute('y1', y);
          relay_rtt_marker.setAttribute('x2', 2);
          relay_rtt_marker.setAttribute('y2', y);

          relay_rtt_marker.setAttribute('data-relay-rtt', relay_rtt);

          relay_rtt_marker.classList.add(peer_name);
          relay_rtt_marker.classList.add('relay-rtt');

          relay_rtt_elem.appendChild(relay_rtt_marker);
      }

      drawPeer = (peers_elem, frame_delay_elem, peer_name, rtt, frame_delay, frames_ahead) => {
        const per_pixel = 100/16;
        const frames_rtt = rtt/16; // To ceil, or not to ceil - that's the question.
        const x = 50 + frames_ahead * per_pixel;
        const y = 100 - frames_rtt * per_pixel;

        const peer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        peer.setAttribute('cx', x);
        peer.setAttribute('cy', y);
        peer.setAttribute('r', 1);

        peer.setAttribute('data-rtt', rtt);
        peer.setAttribute('data-frame-delay', frame_delay);
        peer.setAttribute('data-frames-ahead', frames_ahead);

        peer.classList.add(peer_name);
        peer.classList.add('peer');

        peers_elem.appendChild(peer);

        const peer_frame_delay = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        peer_frame_delay.setAttribute('cx', x);
        peer_frame_delay.setAttribute('cy', y);
        peer_frame_delay.setAttribute('r', frame_delay * per_pixel);

        peer_frame_delay.classList.add(peer_name);
        peer_frame_delay.classList.add('peer-frame-delay');

        frame_delay_elem.appendChild(peer_frame_delay);

        if (acceptable_rollback_frames > 0) {
          const peer_acceptable_rollback = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          peer_acceptable_rollback.setAttribute('cx', x);
          peer_acceptable_rollback.setAttribute('cy', y);
          peer_acceptable_rollback.setAttribute('r', (frame_delay + acceptable_rollback_frames) * per_pixel);

          peer_acceptable_rollback.classList.add(peer_name);
          peer_acceptable_rollback.classList.add('peer-acceptable-rollback');
          frame_delay_elem.appendChild(peer_acceptable_rollback);
        }
      }

      report_stats = (stats_data) => {

        var stats = readStats(stats_data);

        var peers_elem = document.getElementById("stats-network-peers");
        var frame_delay_elem = document.getElementById("stats-network-peer-frame-delays");
        var relay_rtt_elem = document.getElementById("stats-network-relay-rtt");

        peers_elem.innerHTML = '';
        frame_delay_elem.innerHTML = '';
        relay_rtt_elem.innerHTML = '';

        stats.peers.forEach(p => {
          drawPeer(peers_elem, frame_delay_elem, 'peer' + p.peer, p.rtt, p.remote_frame_delay, p.local_frames_ahead);
        });

        drawLocal(peers_elem, frame_delay_elem, relay_rtt_elem, 'peer' + stats.peer, stats.relay_rtt, stats.frame_delay);
      }

      let wallpaperConfig = {};
      const wallpaperConfigKey = 'wallpaper-config';

      function wallpaper_init_config_controls(definitions) {
        const wallpaperContainer = document.getElementById("wallpaper-container");
        wallpaperContainer.style.display = "block";

        let configStyle = '<style type="text/css">' +
          'body { color: white; font-family: Averta, -apple-system, "Segoe UI", system-ui, sans-serif; font-style: normal; font-size: 10px; }' +
          '.config-row { display: flex; justify-content: flex-start; align-items: center; padding: .5em; }' +
          '.config-row > label { flex: 1 }' +
          '.config-row > input { flex: initial; }' +
          '.config-row > textarea { flex: 1; }' +
          '.config-row-label { font-size: 12px; font-weight: 600; }' +
          'button { padding: 8px 16px; border-radius: 4px; background-color: unset; border-color: rgb(199, 159, 234); color: rgb(199, 159, 234); }' +
          '</style>';
        let configHTML = '<html><head><title></title>' + configStyle + '</head><body>' +
          '<div class="wallpaper-header"><h1>Live Wallpaper Configurator</h1><button id="wallpaper-reset-parameters">Reset parameters</button></div>' +
          '<div class="wallpaper-config" id="wallpaper-config"></div>' +
          '</body></html>'

        const wallpaperConfigDocument = document.getElementById("wallpaper-config-iframe").contentDocument;
        wallpaperConfigDocument.open();
        wallpaperConfigDocument.write(configHTML);
        wallpaperConfigDocument.close();

        const storedConfig = JSON.parse(localStorage.getItem(wallpaperConfigKey));
        if (storedConfig) {
          wallpaperConfig = storedConfig;
        }

        const configElement = wallpaperConfigDocument.getElementById("wallpaper-config");
        const resetButton = wallpaperConfigDocument.getElementById("wallpaper-reset-parameters");
        resetButton.addEventListener("click", (e) => {
          wallpaper_reset_config();
          wallpaperConfig = {};
          add_config_elems(configElement, definitions);
          notify_config_change();
        }, false);

        add_config_elems(configElement, definitions);
        notify_config_change();
      }

      function add_config_elems(configElement, definitions) {
        while (configElement.hasChildNodes()) {
          configElement.removeChild(configElement.lastChild);
        }

        definitions.value
          .map(d => create_elems(d, wallpaperConfig, ""))
          .filter(e => e !== null && e !== undefined)
          .map(e => configElement.appendChild(e));
      }

      function create_elems(definition, config, prefixId) {
          if (definition.type === undefined || definition.name === undefined) {
            console.log("missing definition name or type for: ", definition);
            return null;
          }

          if  (definition.type === "section") {
            return create_section_elem(definition, config, prefixId);
          }


          if (definition.value === undefined ) {
            console.log("missing definition value for: ", definition);
            return null;
          }

          if (definition.type === "range") {
            return create_range_elem(definition, config, prefixId);
          }

          if (definition.type === "boolean") {
            return create_checkbox_elem(definition, config, prefixId);
          }

          if (definition.type === "color" || definition.type === "colour") {
            return create_color_elem(definition, config, prefixId);
          }

          if (definition.type === "string") {
            return create_text_elem(definition, config, prefixId);
          }

          if (definition.type === "string_multiline") {
            return create_multiline_text_elem(definition, config, prefixId);
          }

          if (definition.type === "select") {
            return create_select_elem(definition, config, prefixId);
          }

          if (definition.type === "file" || definition.type === "folder") {
            return create_not_supported_elem(definition, config);
          }
          
          console.log("missing config value for: ", definition);
          return null;
      }

      function create_section_elem(definition, config, prefixId) {
        const divElem = document.createElement("div");

        const headerElem = document.createElement("h2");
        headerElem.innerHTML = definition.label;

        divElem.appendChild(headerElem);

        const sectionId = prefixId + definition.name + "-"
        if (!config[definition.name]) {
          config[definition.name] = {};
        }

        definition.children
          .map(c => create_elems(c, config[definition.name], sectionId))
          .filter(e => e !== null && e !== undefined)
          .map(e => divElem.appendChild(e));

        return divElem;
      }

      function get_initial_value(definition, config) {
        let value =  definition.value;
        const configValue = config[definition.name];
        if (configValue && (typeof(configValue) === typeof(value))) {
          value = configValue;
        }

        return value;
      }

      function wrap_with_label(inputElem, definition, prefixId) {
        const controlElem = document.createElement("div");
        controlElem.classList.add(definition.name + "-control");
        controlElem.classList.add("config-row");

        const labelElem = document.createElement("label");
        labelElem.htmlFor = prefixId + definition.name;
        labelElem.innerHTML = "<span class='config-row-label'>" + (definition.label || definition.name) + "</span>";
        if (definition.description) {
          labelElem.innerHTML += "<p>" + definition.description + "</p>";
        }
        controlElem.appendChild(labelElem);

        inputElem.id = prefixId + definition.name;
        controlElem.appendChild(inputElem);

        return controlElem;
      }

      function create_range_elem(definition, config, prefixId) {
        const value = get_initial_value(definition, config);

        const valueElem = document.createElement("span");
        valueElem.style = "margin: 0.5em";
        valueElem.innerHTML = "(" + value + ")";

        const stepElem = document.createElement("input");
        stepElem.id = prefixId + definition.name;
        stepElem.type = "range";
        stepElem.min = definition.min || 0;
        stepElem.max = definition.max || 100;
        stepElem.step = definition.step || 1;
        stepElem.value = value;

        config[definition.name] = value;
        function range_value_updated(e) {
          const valueUpdate = Number(e.target.value);
          config[definition.name] = valueUpdate;
          valueElem.innerHTML = "(" + valueUpdate + ")";

          notify_config_change();
        }

        stepElem.addEventListener("change", range_value_updated, false);
        stepElem.addEventListener("input", range_value_updated, false);

        const valueWrapper = document.createElement("span");
        valueWrapper.appendChild(valueElem);
        valueWrapper.appendChild(stepElem);

        return wrap_with_label(valueWrapper, definition, prefixId);
      }

      function create_checkbox_elem(definition, config, prefixId) {
        const value = get_initial_value(definition, config);

        const checkboxElem = document.createElement("input");
        checkboxElem.type = "checkbox";
        checkboxElem.checked = value;
        
        config[definition.name] = value;
        checkboxElem.addEventListener("change", (e) => {
          const valueUpdate = Boolean(e.target.checked);
          config[definition.name] = valueUpdate;
          notify_config_change();
        });

        return wrap_with_label(checkboxElem, definition, prefixId);
      }

      function create_color_elem(definition, config, prefixId) {
        const value = get_initial_value(definition, config);

        const bgrColor = value;
        const r = (bgrColor & 0x0000ff);
        const g = (bgrColor & 0x00ff00) >> 8;
        const b = (bgrColor & 0xff0000) >> 16;
        const rgbColor = (r << 16) + (g << 8) + b;
        const color = "#" + rgbColor.toString(16).padStart(6, '0');

        const colorElem = document.createElement("input");
        colorElem.type = "color";
        colorElem.value = color;

        config[definition.name] = value;
        function color_value_updated(e) {
          const color = e.target.value;
          const rgbColor = parseInt(color.slice(1), 16);
          const r = (rgbColor & 0xff0000) >> 16;
          const g = (rgbColor & 0x00ff00) >> 8;
          const b = (rgbColor & 0x0000ff);
          const bgrColor = (b << 16) + (g << 8) + r;

          config[definition.name] = bgrColor;
          notify_config_change();
        }

        colorElem.addEventListener("change", color_value_updated, false);
        colorElem.addEventListener("input", color_value_updated, false);
        
        return wrap_with_label(colorElem, definition, prefixId);
      }

      function create_text_elem(definition, config, prefixId) {
        const value = get_initial_value(definition, config);

        const textElem = document.createElement("input");
        textElem.type = "text";
        textElem.value = value;
        console.log("text", value)
        if (definition.max_length && definition.max_length > 0) {
          textElem.maxLength = definition.max_length;
        }

        config[definition.name] = value;
        textElem.addEventListener("input", (e) => {
          config[definition.name] = e.target.value;
          notify_config_change();
        });
        
        return wrap_with_label(textElem, definition, prefixId);
      }

      function create_multiline_text_elem(definition, config, prefixId) {
        const value = get_initial_value(definition, config);

        const textareaElem = document.createElement("textarea");
        textareaElem.rows = 5;
        textareaElem.cols = 50;
        textareaElem.value = value;
        if (definition.max_length && definition.max_length > 0) {
          textareaElem.maxLength = definition.max_length;
        }

        config[definition.name] = value;
        textareaElem.addEventListener("input", (e) => {
          config[definition.name] = e.target.value;
          notify_config_change();
        });
        
        return wrap_with_label(textareaElem, definition, prefixId);
      }

      function create_select_elem(definition, config, prefixId) {
        const value = get_initial_value(definition, config);

        const selectElem = document.createElement("select");
        selectElem.value = value;
        
        const options = definition.options || [];
        options.forEach(o => {
          const option = document.createElement("option");
          option.value = o;
          option.text = o;
          option.selected = o == value ? "selected" : "";
          selectElem.appendChild(option);
        })

        config[definition.name] = value;
        selectElem.addEventListener("change", (e) => {
          e.selected = "selected";
          config[definition.name] = e.target.value;
          notify_config_change();
        });
        
        return wrap_with_label(selectElem, definition, prefixId);
      }

      function create_not_supported_elem(definition, config, prefixId) {
        const labelElem = document.createElement("label");
        labelElem.innerHTML = "Not supported in browser";

        config[definition.name] = definition.value;
        return wrap_with_label(labelElem, definition, prefixId);
      }

      function notify_config_change() {
        console.log(wallpaperConfig)
        localStorage.setItem(wallpaperConfigKey, JSON.stringify(wallpaperConfig));

        wallpaper_update_config(JSON.stringify(wallpaperConfig));
      }
    