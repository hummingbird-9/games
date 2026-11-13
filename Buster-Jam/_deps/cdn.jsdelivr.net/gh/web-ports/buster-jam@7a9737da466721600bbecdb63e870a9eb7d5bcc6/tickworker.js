      const blob = new Blob([document.querySelector('#tick-worker').textContent]);
      const worker = new Worker(window.URL.createObjectURL(blob));

      worker.onmessage = function () {
        GM_tick(performance.now());
      }

      const isMultiplayer = function () {
        if (typeof GM_is_multiplayer !== 'function') {
          return false;
        }

        return GM_is_multiplayer() !== 0;
      }

      document.addEventListener('visibilitychange', function () {
        if (!isMultiplayer()) {
          return;
        }

        if (document.visibilityState === 'hidden') {
          worker.postMessage({run: true, fps: 60});
        } else {
          worker.postMessage({run: false});
        }
      });