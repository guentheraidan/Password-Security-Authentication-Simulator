/**
 * Attack presets (guesses per second).
 * Sources: Hashcat benchmarks on consumer / cloud hardware.
 */
export const ATTACK_PRESETS = [
  { id: 'online_throttled', label: 'Online (throttled)',   gps: 100,           description: '100 attempts/sec — rate-limited login form' },
  { id: 'online_fast',      label: 'Online (fast)',        gps: 10_000,        description: '10K attempts/sec — unthrottled web login' },
  { id: 'offline_slow',     label: 'Offline (slow hash)',  gps: 10_000_000,    description: '10M/sec — bcrypt on a GPU' },
  { id: 'offline_fast',     label: 'Offline (fast hash)',  gps: 100_000_000_000, description: '100B/sec — MD5/SHA-1 on a GPU cluster' },
];

const SECOND  = 1;
const MINUTE  = 60;
const HOUR    = 3_600;
const DAY     = 86_400;
const YEAR    = 31_536_000;

/**
 * Format a number of seconds into a human-readable string.
 * @param {number} seconds
 * @returns {string}
 */
function formatSeconds(seconds) {
  if (seconds < 1)                     return 'less than a second';
  if (seconds < MINUTE)                return `${Math.round(seconds)} second${Math.round(seconds) !== 1 ? 's' : ''}`;
  if (seconds < HOUR)                  return `${Math.round(seconds / MINUTE)} minute${Math.round(seconds / MINUTE) !== 1 ? 's' : ''}`;
  if (seconds < DAY)                   return `${Math.round(seconds / HOUR)} hour${Math.round(seconds / HOUR) !== 1 ? 's' : ''}`;
  if (seconds < YEAR)                  return `${Math.round(seconds / DAY)} day${Math.round(seconds / DAY) !== 1 ? 's' : ''}`;
  if (seconds < YEAR * 1_000)          return `${Math.round(seconds / YEAR).toLocaleString()} year${Math.round(seconds / YEAR) !== 1 ? 's' : ''}`;
  if (seconds < YEAR * 1_000_000)      return `${(seconds / YEAR / 1000).toFixed(1)} thousand years`;
  if (seconds < YEAR * 1_000_000_000)  return `${(seconds / YEAR / 1e6).toFixed(1)} million years`;
  return 'centuries';
}

/**
 * Estimate the worst-case brute-force crack time for a given password.
 *
 * Strategy: compute the keyspace based on character-set composition and
 * length, then divide by guesses-per-second.
 *
 * @param {string} password
 * @returns {{ presets: Array<{id, label, gps, description, seconds, display}>, keyspace: BigInt }}
 */
export function computeCrackTime(password) {
  if (!password) return null;

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password))    charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;
  if (charsetSize === 0) charsetSize = 26;

  // keyspace = charset_size ^ length  (worst-case)
  const keyspaceBig = BigInt(charsetSize) ** BigInt(password.length);

  // Cap to Number for display purposes (Infinity for very large values)
  const keyspaceNum = keyspaceBig > BigInt(Number.MAX_SAFE_INTEGER)
    ? Infinity
    : Number(keyspaceBig);

  const presets = ATTACK_PRESETS.map((preset) => {
    let seconds;
    if (keyspaceNum === Infinity) {
      seconds = Infinity;
    } else {
      seconds = keyspaceNum / preset.gps;
    }
    return {
      ...preset,
      seconds,
      display: seconds === Infinity ? 'centuries' : formatSeconds(seconds),
    };
  });

  return { presets, keyspace: keyspaceBig };
}
