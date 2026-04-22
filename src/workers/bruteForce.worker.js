/**
 * bruteForce.worker.js
 *
 * Runs an animated guess counter on a background thread so the main UI
 * stays responsive during the simulation.
 *
 * Protocol (postMessage JSON payloads):
 *   Main → Worker: { type: 'START', keyspace: string, gps: number }
 *   Main → Worker: { type: 'STOP' }
 *   Worker → Main: { type: 'TICK',  guesses: string, elapsed: number }
 *   Worker → Main: { type: 'DONE',  guesses: string, elapsed: number }
 */

let running  = false;
let startTime = 0;
let guesses  = 0n;
let keyspace = 0n;
let gps      = 0;
let rafId    = null;

const TICK_MS = 50; // update interval

function tick() {
  if (!running) return;

  const elapsed = (Date.now() - startTime) / 1000;
  guesses = BigInt(Math.floor(elapsed * gps));

  const done = guesses >= keyspace;
  if (done) {
    guesses = keyspace;
    running = false;
  }

  self.postMessage({
    type:    done ? 'DONE' : 'TICK',
    guesses: guesses.toLocaleString(),
    elapsed: +elapsed.toFixed(2),
  });

  if (!done) {
    rafId = setTimeout(tick, TICK_MS);
  }
}

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'START':
      running   = true;
      startTime = Date.now();
      guesses   = 0n;
      keyspace  = BigInt(data.keyspace);
      gps       = Number(data.gps);
      clearTimeout(rafId);
      tick();
      break;

    case 'STOP':
      running = false;
      clearTimeout(rafId);
      break;

    default:
      break;
  }
};
