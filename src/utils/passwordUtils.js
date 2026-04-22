import zxcvbn from 'zxcvbn';

/**
 * Criteria checked independently of zxcvbn score.
 */
export const CRITERIA = [
  { id: 'length',    label: 'At least 12 characters',        test: (p) => p.length >= 12 },
  { id: 'uppercase', label: 'Uppercase letter (A–Z)',         test: (p) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'Lowercase letter (a–z)',         test: (p) => /[a-z]/.test(p) },
  { id: 'digit',     label: 'Number (0–9)',                   test: (p) => /\d/.test(p) },
  { id: 'special',   label: 'Special character (!@#$…)',      test: (p) => /[^A-Za-z0-9]/.test(p) },
];

/**
 * Five-tier classification keyed to zxcvbn score (0–4) plus our criteria count.
 */
const TIERS = [
  { label: 'Very Weak', color: '#ff3a3a', barWidth: '8%'  },
  { label: 'Weak',      color: '#ff8c00', barWidth: '28%' },
  { label: 'Fair',      color: '#ffd700', barWidth: '52%' },
  { label: 'Strong',    color: '#4caf50', barWidth: '76%' },
  { label: 'Very Strong', color: '#00e67b', barWidth: '100%' },
];

/**
 * @param {string} password
 * @returns {{ score, tier, criteria, entropy, crackTimes, suggestions }}
 */
export function evaluatePasswordStrength(password) {
  if (!password) return null;

  const result   = zxcvbn(password);
  const criteria = CRITERIA.map((c) => ({ ...c, passed: c.test(password) }));
  const passed   = criteria.filter((c) => c.passed).length;

  // Clamp score: penalise if fewer than 3 criteria pass
  const rawScore = result.score;
  const score    = passed < 3 ? Math.min(rawScore, 1) : rawScore;
  const tier     = TIERS[score];

  // Approximate entropy = log2(charset size ^ length)
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password))    charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;
  const entropy = charsetSize > 0
    ? Math.round(password.length * Math.log2(charsetSize))
    : 0;

  return {
    score,
    tier,
    criteria,
    entropy,
    crackTimes: result.crack_times_display,
    suggestions: [
      ...(result.feedback.warning  ? [result.feedback.warning]  : []),
      ...(result.feedback.suggestions ?? []),
    ],
  };
}
