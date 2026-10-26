// Sacred Temple Ambience Audio Engine (Web Audio API)
// Provides a tranquil, meditative background resonance with gentle temple bells

let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let bellInterval = null;
let droneOscs = [];

export function toggleSacredAmbience(onStateChange) {
  if (isPlaying) {
    stopSacredAmbience();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startSacredAmbience();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function isAmbiencePlaying() {
  return isPlaying;
}

function startSacredAmbience() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 3);
    masterGain.connect(audioCtx.destination);

    // Warm Tanpura Sacred Drone Frequencies (Root: C# / 138.59 Hz, Fifth: G# / 207.65 Hz)
    const baseFreqs = [138.59, 207.65, 277.18];
    droneOscs = baseFreqs.map((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06 / (idx + 1), audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      return { osc, gain };
    });

    // Play periodic soft sacred temple bell
    playTempleBell();
    bellInterval = setInterval(() => {
      if (isPlaying) playTempleBell();
    }, 9000);

    isPlaying = true;
  } catch (err) {
    console.warn('Audio ambience could not initialize:', err);
  }
}

function playTempleBell() {
  if (!audioCtx || audioCtx.state !== 'running') return;
  try {
    const now = audioCtx.currentTime;
    const bellOsc = audioCtx.createOscillator();
    const bellGain = audioCtx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1046.5, now); // High C bell chime
    bellOsc.frequency.exponentialRampToValueAtTime(523.25, now + 3);

    bellGain.gain.setValueAtTime(0.12, now);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4);

    bellOsc.connect(bellGain);
    bellGain.connect(masterGain);

    bellOsc.start(now);
    bellOsc.stop(now + 4.2);
  } catch (e) {
    // Ignore audio glitches
  }
}

function stopSacredAmbience() {
  if (bellInterval) clearInterval(bellInterval);
  if (masterGain && audioCtx) {
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
    setTimeout(() => {
      droneOscs.forEach(({ osc }) => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      droneOscs = [];
    }, 1200);
  }
  isPlaying = false;
}
