      let running = false;
      let stop_called = false;

      let intervalMs = 16;

      onmessage = (e) => {
        if (e.data.run) {
          intervalMs = Math.floor(1000 / e.data.fps);

          if (!running) {
            running = true;
            setTimeout(tick, intervalMs);
          }
        } else {
          stop_called = true;
        }
      }

      const tick = () => {
        if (stop_called) {
          stop_called = false;
          running = false;

          return;
        }

        const start = new Date().getTime();
        postMessage('');
        const end = new Date().getTime();

        let next_update = start + intervalMs - end;
        next_update = Math.max(next_update, 0);
        setTimeout(tick, next_update);
      }