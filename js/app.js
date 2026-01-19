// SMOOTH SCROLL

    document.addEventListener("DOMContentLoaded", function () {
      const e =
        "scrollingElement" in document
          ? document.scrollingElement
          : ((n = document.documentElement),
            (t = n.scrollTop),
            (n.scrollTop = t + 1),
            (t2 = n.scrollTop),
            (n.scrollTop = t),
            t2 > t ? n : document.body);
      const s = (n, d = 800) => {
        const t = document.querySelector(n);
        if (!t) return;
        const r = e.scrollTop,
          a =
            Math.min(
              r + t.getBoundingClientRect().top,
              e.scrollHeight - window.innerHeight
            ) - r,
          i = performance.now();
        const f = (o) => {
          let u = Math.min((o - i) / d, 1),
            c = u === 1 ? 1 : 1 - Math.pow(2, -10 * u);
          (e.scrollTop = Math.round(r + a * c)),
            u < 1
              ? requestAnimationFrame(f)
              : (history.pushState(null, null, n), (e.scrollTop = r + a));
        };
        requestAnimationFrame(f);
      };
      document.querySelectorAll("a.scroll").forEach((n) => {
        n.addEventListener("click", (o) => {
          o.preventDefault(), s(n.getAttribute("href"));
        });
      });
    });


//  VANILLA RADIO PLAYER

    (() => {
      const audio = document.getElementById("audio");
      const playBtn = document.getElementById("playToggle");
      const stopBtn = document.getElementById("stopIcon");
      const waveAnim = document.getElementById("waveIcon").querySelectorAll("animate");

      if (!audio || !playBtn || !stopBtn || !waveAnim.length) return;

      let isPlaying = false;          // is it playing now
      let reconnectTimer;
      const reconnectDelay = 4000;    // 4s – without aggressive server spam

      // start the stream once in the background (muted)
      let streamInitialized = false;
      let streamInitInProgress = false;

      // We prepare the radio stream in advance
      audio.preload = "auto";
      audio.crossOrigin = "anonymous";

      const startWave = () => waveAnim.forEach(a => a.beginElement());
      const stopWave = () => waveAnim.forEach(a => a.endElement());

      const showPlayUI = () => {
        playBtn.style.display = "block";
        stopBtn.style.display = "none";
        stopWave();
      };

      const showStopUI = () => {
        playBtn.style.display = "none";
        stopBtn.style.display = "block";
        startWave();
      };

      const reconnect = () => {
        // if the stream has not yet been initialized, do not interrupt the network
        if (!streamInitialized) return;
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(() => {
          audio.load();
          audio.play().catch(() => {
            // if it doesn’t work, try again at the same interval
            reconnect();
          });
        }, reconnectDelay);
      };

      const initStream = () => {
        if (streamInitialized || streamInitInProgress) return;
        streamInitInProgress = true;

        // quietly start the stream in the background so that the buffer is filled in advance
        audio.muted = true;
        audio.play().then(() => {
          streamInitialized = true;
          streamInitInProgress = false;
        }).catch(() => {
          streamInitInProgress = false;
        });
      };

      // Initialize the stream the first time the user interacts with the page
      window.addEventListener("pointerdown", initStream, { once: true });

      const playAudio = () => {
        // guarantee that the stream is running (muted) and simply turn on the sound
        initStream();
        audio.muted = false;
        audio.play().then(() => {
          isPlaying = true;
          showStopUI();
        }).catch(() => {
          isPlaying = false;
          reconnect();
        });
      };

      const stopAudio = () => {
        isPlaying = false;
        // We don't stop the flow, we just instantly turn off the sound,
        // so that the next Play the sound starts almost immediately
        audio.muted = true;
        showPlayUI();
      };

      const toggleAudio = () => {
        if (isPlaying) stopAudio();
        else playAudio();
      };

      playBtn.addEventListener("click", toggleAudio);
      stopBtn.addEventListener("click", toggleAudio);

      audio.addEventListener("stalled", reconnect);
      audio.addEventListener("waiting", stopWave);
      audio.addEventListener("error", reconnect);
    })();

