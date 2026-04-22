import { useState, useRef, useEffect } from 'react';
import { computeCrackTime, ATTACK_PRESETS } from '../../utils/bruteForceUtils.js';

function PresetCard({ preset, result, active, onClick }) {
  const isInstant = result?.seconds < 1;
  const isForever = result?.seconds === Infinity;

  return (
    <button
      onClick={onClick}
      className={[
        'panel text-left transition-all duration-200 cursor-pointer w-full',
        active ? 'border-accent' : 'hover:border-cyan',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-ui font-semibold text-sm text-[var(--text)]">{preset.label}</span>
        {active && (
          <span className="badge" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            selected
          </span>
        )}
      </div>
      <div className="font-mono text-xs text-muted mb-3">{preset.description}</div>
      {result && (
        <div
          className="font-mono font-semibold text-base"
          style={{ color: isInstant ? '#ff3a3a' : isForever ? '#00d06f' : 'var(--cyan)' }}
        >
          {result.display}
        </div>
      )}
    </button>
  );
}

export default function BruteForce() {
  const [password,      setPassword]      = useState('');
  const [activePreset,  setActivePreset]  = useState('offline_fast');
  const [simRunning,    setSimRunning]    = useState(false);
  const [guessDisplay,  setGuessDisplay]  = useState('0');
  const [elapsed,       setElapsed]       = useState(0);
  const [done,          setDone]          = useState(false);
  const [showPass,      setShowPass]      = useState(false);
  const workerRef                         = useRef(null);

  const crackResult = password ? computeCrackTime(password) : null;
  const activePresetData = ATTACK_PRESETS.find((p) => p.id === activePreset);

  // Initialise web worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../workers/bruteForce.worker.js', import.meta.url),
      { type: 'module' }
    );
    workerRef.current.onmessage = ({ data }) => {
      setGuessDisplay(data.guesses);
      setElapsed(data.elapsed);
      if (data.type === 'DONE') setSimRunning(false), setDone(true);
    };
    return () => workerRef.current?.terminate();
  }, []);

  function startSim() {
    if (!crackResult) return;
    const preset  = crackResult.presets.find((p) => p.id === activePreset);
    const keyspace = crackResult.keyspace;

    // Cap simulation keyspace so it finishes within ~30s at animation speed
    const simKeyspace = preset.seconds > 30
      ? BigInt(Math.floor(30 * activePresetData.gps))
      : keyspace;

    setDone(false);
    setGuessDisplay('0');
    setElapsed(0);
    setSimRunning(true);
    workerRef.current.postMessage({
      type:     'START',
      keyspace: simKeyspace.toString(),
      gps:      activePresetData.gps,
    });
  }

  function stopSim() {
    setSimRunning(false);
    workerRef.current.postMessage({ type: 'STOP' });
  }

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h1 className="font-ui font-bold text-2xl text-[var(--text)] mb-1">
          Brute-Force Attack Simulator
        </h1>
        <p className="font-mono text-sm text-muted">
          Mathematical crack-time estimation across real-world attack speeds, with an animated guess counter.
        </p>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type={showPass ? 'text' : 'password'}
          className="psas-input pr-12"
          placeholder="Enter a password…"
          value={password}
          onChange={(e) => { setPassword(e.target.value); stopSim(); setDone(false); }}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => setShowPass((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors text-xs font-mono"
          aria-label={showPass ? 'Hide password' : 'Show password'}
        >
          {showPass ? 'HIDE' : 'SHOW'}
        </button>
      </div>

      {crackResult && (
        <>
          {/* Preset grid */}
          <div>
            <div className="field-label mb-3">Select attack scenario</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crackResult.presets.map((r) => (
                <PresetCard
                  key={r.id}
                  preset={r}
                  result={r}
                  active={activePreset === r.id}
                  onClick={() => { setActivePreset(r.id); stopSim(); setDone(false); }}
                />
              ))}
            </div>
          </div>

          {/* Animated counter */}
          <div className="panel text-center space-y-4">
            <div className="field-label">Animated Guess Counter</div>
            <div
              className="font-mono font-bold text-4xl tracking-tight transition-all duration-100"
              style={{ color: done ? 'var(--accent)' : 'var(--cyan)' }}
            >
              {guessDisplay}
            </div>
            <div className="font-mono text-sm text-muted">
              guesses in {elapsed}s
              {done && <span style={{ color: 'var(--accent)' }}> — cracked!</span>}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              {!simRunning ? (
                <button className="btn-primary" onClick={startSim}>
                  ▶ Run Simulation
                </button>
              ) : (
                <button className="btn-ghost" onClick={stopSim}>
                  ■ Stop
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {!password && (
        <div className="text-center py-12 font-mono text-sm text-muted">
          Enter a password to compute crack times…
        </div>
      )}
    </div>
  );
}
