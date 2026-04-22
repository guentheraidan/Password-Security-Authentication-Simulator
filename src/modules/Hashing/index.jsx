import { useState } from 'react';
import { generateHashes, ALGORITHMS } from '../../utils/hashUtils.js';

const STRENGTH_COLOR = { worst: '#ff3a3a', weak: '#ff7b00', strong: '#ffd900', best: '#00d06f' };
const RATING_STARS   = (n) => '● '.repeat(n) + ' ' + '○ '.repeat(4 - n);

function HashCard({ result, loading }) {
  if (loading) {
    return (
      <div className="panel space-y-3 animate-pulse-slow">
        <div className="h-4 bg-dim rounded w-1/3" />
        <div className="h-3 bg-dim rounded w-full" />
        <div className="h-3 bg-dim rounded w-3/4" />
      </div>
    );
  }
  if (!result) return null;

  const color = STRENGTH_COLOR[result.strength] ?? '#4a6080';
  return (
    <div className="panel space-y-3 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-ui font-bold text-base text-[var(--text)]">{result.label}</span>
        <div className="flex items-center gap-3">
          <span
            className="badge font-semibold text-xs"
            style={{ borderColor: color, color:'#3e3e3e', backgroundColor: '#ededed' }}
          >
            {result.strength}
          </span>
          <span className="font-mono text-xs" style={{ color }}>
            {RATING_STARS(result.rating)}
          </span>
        </div>
      </div>

      {/* Hash output */}
      <div>
        <div className="field-label">Hash output</div>
        <div
          className="font-mono text-xs break-all bg-bg border border-border rounded p-3 text-[var(--text-dim)] select-all"
          style={{ wordBreak: 'break-all' }}
        >
          {result.hash}
        </div>
      </div>

      {/* Salt + timing */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Salt</div>
          <div className="font-mono text-xs text-muted truncate">{result.saltDisplay}</div>
        </div>
        <div>
          <div className="field-label">Compute time</div>
          <div
            className="font-mono text-sm font-semibold"
            style={{ color: result.durationMs > 100 ? 'var(--accent)' : 'var(--cyan)' }}
          >
            {result.durationMs < 1 ? '<1 ms' : `${result.durationMs} ms`}
          </div>
        </div>
      </div>

      {/* Notes */}
      <p className="font-mono text-xs text-muted border-t border-border pt-3">
        {result.notes}
      </p>
    </div>
  );
}

export default function Hashing() {
  const [password, setPassword] = useState('');
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [ran,      setRan]      = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleHash() {
    if (!password) return;
    setLoading(true);
    setRan(false);
    try {
      const r = await generateHashes(password);
      setResults(r);
      setRan(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h1 className="font-ui font-bold text-2xl text-[var(--text)] mb-1">
          Hashing Algorithm Comparison
        </h1>
        <p className="font-mono text-sm text-muted">
          Side-by-side comparison of MD5, SHA-1, SHA-256, bcrypt, and Argon2id; compute times, salting, and security ratings.
        </p>
      </div>

      <div className="panel flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="field-label">Password to hash</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              className="psas-input pr-12"
              placeholder="Enter a password…"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHash()}
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
        </div>
        <div className="flex items-end">
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={handleHash}
            disabled={!password || loading}
          >
            {loading ? 'Hashing…' : 'Generate Hashes'}
          </button>
        </div>
      </div>

      {/* Note about bcrypt/argon2 */}
      {!ran && (
        <div className="panel border-cyan" style={{ borderColor: 'rgba(0,212,255,0.3)' }}>
          <p className="font-mono text-xs text-muted">
            <span style={{ color: 'var(--cyan)' }}>ℹ</span>
            {'  '}bcrypt (cost 10) and Argon2id may take 0.5–2 s on your hardware — this intentional slowness is what makes them secure.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading
          ? ALGORITHMS.map((a) => <HashCard key={a.id} loading />)
          : ran
            ? results.map((r) => <HashCard key={r.id} result={r} />)
            : null}
      </div>
    </div>
  );
}
