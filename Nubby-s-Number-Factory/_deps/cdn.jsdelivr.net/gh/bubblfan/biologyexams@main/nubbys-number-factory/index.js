
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
"game.unx" ].join( ";");
      }

      function manifestFilesMD5()
      {
        return [ "682bdf573712923cb3ab721a82b8e3f6",
"83d00638e3d30d2715db87723045d9c4",
"26f14bad6e6a4395d75bd3cb20fbb7c3",
"e8f1e8db8cf996f8715a6f2164c2e44e",
"f370463096bdb8a75985603a34b94ce9",
"35c458563820badad6b949d588392d74",
"d7ff7af6b58ba9ecef1764accb47dd53" ];
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