/** Ambient drone synthesized with the Web Audio API: no audio file, starts only on user action. */
export interface Ambience {
  toggle(): boolean;
  readonly playing: boolean;
}

function impulse(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

export function createAmbience(): Ambience {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let playing = false;
  let suspendTimer: number | undefined;

  const build = () => {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 720;
    filter.Q.value = 0.6;

    // the filter slowly breathes open and closed
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 380;
    lfo.connect(lfoDepth).connect(filter.frequency);
    lfo.start();

    // A1, E2, A2, E3, B3: open fifths, warm and unresolved
    const voices: [number, OscillatorType, number][] = [
      [55, 'sine', 0.22],
      [82.41, 'sine', 0.16],
      [110, 'triangle', 0.08],
      [164.81, 'triangle', 0.05],
      [246.94, 'sine', 0.025],
    ];
    for (const [freq, type, level] of voices) {
      for (const detune of [-7, 7]) {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = detune;
        const gain = ctx.createGain();
        gain.gain.value = level;
        osc.connect(gain).connect(filter);
        osc.start();
      }
    }

    const reverb = ctx.createConvolver();
    reverb.buffer = impulse(ctx, 4.5, 2.6);
    const wet = ctx.createGain();
    wet.gain.value = 0.65;
    const dry = ctx.createGain();
    dry.gain.value = 0.5;

    filter.connect(dry).connect(master);
    filter.connect(reverb).connect(wet).connect(master);
    master.connect(ctx.destination);
  };

  return {
    get playing() {
      return playing;
    },
    toggle() {
      if (!ctx) build();
      const c = ctx!;
      const gain = master!.gain;
      window.clearTimeout(suspendTimer);
      playing = !playing;
      gain.cancelScheduledValues(c.currentTime);
      gain.setValueAtTime(gain.value, c.currentTime);
      if (playing) {
        void c.resume();
        gain.setTargetAtTime(0.32, c.currentTime, 1.4);
      } else {
        gain.setTargetAtTime(0, c.currentTime, 0.4);
        suspendTimer = window.setTimeout(() => void c.suspend(), 2500);
      }
      return playing;
    },
  };
}
