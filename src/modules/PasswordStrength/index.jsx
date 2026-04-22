import { useState, useMemo } from 'react';
import { evaluatePasswordStrength } from '../../utils/passwordUtils.js';

function CriteriaRow({ passed, label }) {
  return (
    <li className="flex items-center gap-2 text-sm font-mono">
      <span
        className="w-4 h-4 rounded-full flex items-center justify-center text-xs shrink-0"
        style={{ background: passed ? '#00e67b' : '#d6d6d6', color: passed ? '#07090f' : '#4a6080' }}
      >
        {passed ? '✓' : '○'}
      </span>
      <span style={{ color: passed ? 'var(--text)' : 'var(--text-dim)' }}>{label}</span>
    </li>
  );
}

export default function PasswordStrength() {
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);

  const analysis = useMemo(() => evaluatePasswordStrength(password), [password]);

  return (
    <div className="animate-fade-up space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-ui font-bold text-2xl text-[var(--text)] mb-1">
          Password Strength Analyzer
        </h1>
        <p className="font-mono text-sm text-muted">
          Evaluates entropy, character diversity, and common-pattern weaknesses via zxcvbn.
        </p>
      </div>

      {/* Input */}
      <div className="panel">
        <label className="field-label">Enter a password to analyze</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            className="psas-input pr-12"
            placeholder="Enter a password…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Strength bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="field-label mb-0">Strength</span>
            {analysis && (
              <span
                className="font-ui font-semibold text-sm transition-all duration-300"
                style={{ color: analysis.tier.color }}
              >
                {analysis.tier.label}
              </span>
            )}
          </div>
          <div className="h-2 bg-dim rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width:      analysis ? analysis.tier.barWidth : '0%',
                background: analysis ? analysis.tier.color    : 'transparent',
              }}
            />
          </div>
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Criteria */}
          <div className="panel space-y-3">
            <h2 className="section-title">Criteria</h2>
            <ul className="space-y-2">
              {analysis.criteria.map((c) => (
                <CriteriaRow key={c.id} passed={c.passed} label={c.label} />
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="panel space-y-4">
            <h2 className="section-title">Analysis</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dim rounded-lg p-3">
                <div className="field-label mb-1">Entropy</div>
                <div className="font-mono font-semibold text-lg" style={{ color: 'var(--accent)' }}>
                  {analysis.entropy} <span className="text-xs font-normal text-muted">bits</span>
                </div>
              </div>
              <div className="bg-dim rounded-lg p-3">
                <div className="field-label mb-1">Length</div>
                <div className="font-mono font-semibold text-lg" style={{ color: 'var(--cyan)' }}>
                  {password.length} <span className="text-xs font-normal text-muted">chars</span>
                </div>
              </div>
            </div>

            <div>
              <div className="field-label">Time to crack (offline, fast hash)</div>
              <div className="font-mono text-sm text-[var(--text)]">
                {analysis.crackTimes?.offline_fast_hashing_1e10_per_second ?? '—'}
              </div>
            </div>

            <div>
              <div className="field-label">Time to crack (online, throttled)</div>
              <div className="font-mono text-sm text-[var(--text)]">
                {analysis.crackTimes?.online_throttling_100_per_hour ?? '—'}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="panel md:col-span-2">
              <h2 className="section-title mb-3">Suggestions</h2>
              <ul className="space-y-1.5">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="font-mono text-sm text-muted flex gap-2">
                    <span style={{ color: 'var(--cyan)' }}>›</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!password && (
        <div className="text-center py-12 font-mono text-sm text-muted">
          Start typing to see your analysis…
        </div>
      )}
    </div>
  );
}
