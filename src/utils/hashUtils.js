import bcrypt      from 'bcryptjs';
import CryptoJS    from 'crypto-js';
import { argon2id } from 'hash-wasm';

/**
 * Algorithm metadata.
 */
export const ALGORITHMS = [
  {
    id:       'md5',
    label:    'MD5',
    strength: 'worst',
    rating:   1,
    notes:    'Cryptographically broken. Collisions are trivial to generate. Never use for passwords.',
  },
  {
    id:       'sha1',
    label:    'SHA-1',
    strength: 'weak',
    rating:   2,
    notes:    'Deprecated. Collision attacks demonstrated (SHAttered, 2017). Not suitable for passwords.',
  },
    {
    id:       'sha256',
    label:    'SHA-256',
    strength: 'weak',
    rating:   2,
    notes:    'Mainly used for data integrity, digital signatures, and checksums. Not raw password storage.',
  },
  {
    id:       'bcrypt',
    label:    'bcrypt',
    strength: 'strong',
    rating:   3,
    notes:    'Adaptive cost factor slows GPU attacks. Industry standard for password storage.',
  },
  {
    id:       'argon2',
    label:    'Argon2id',
    strength: 'best',
    rating:   4,
    notes:    'Winner of the Password Hashing Competition (2015). Memory-hard — resists GPU and ASIC attacks.',
  },
];

/**
 * Run all four hashing algorithms against the given password.
 * Returns an array of result objects, each containing the hash, timing, and metadata.
 *
 * @param {string} password
 * @returns {Promise<Array<{id, label, hash, saltDisplay, durationMs, strength, rating, notes}>>}
 */
export async function generateHashes(password) {
  const results = [];

  // ── MD5 (via CryptoJS) ────────────────────────────────────────────────────
  {
    const t0   = performance.now();
    const hash = CryptoJS.MD5(password).toString();
    const t1   = performance.now();
    results.push({ ...ALGORITHMS[0], hash, saltDisplay: 'none (unsalted)', durationMs: +(t1 - t0).toFixed(3) });
  }

  // ── SHA-1 (via CryptoJS) ──────────────────────────────────────────────────
  {
    const t0   = performance.now();
    const hash = CryptoJS.SHA1(password).toString();
    const t1   = performance.now();
    results.push({ ...ALGORITHMS[1], hash, saltDisplay: 'none (unsalted)', durationMs: +(t1 - t0).toFixed(3) });
  }
    // ── SHA-256 (via CryptoJS) ──────────────────────────────────────────────────
  {
    const t0   = performance.now();
    const hash = CryptoJS.SHA256(password).toString();
    const t1   = performance.now();
    results.push({ ...ALGORITHMS[2], hash, saltDisplay: "salt optional by developer", durationMs: +(t1 - t0).toFixed(0) });
  }

  // ── bcrypt (via bcryptjs) ─────────────────────────────────────────────────
  {
    const ROUNDS = 10;
    const t0     = performance.now();
    const salt   = await bcrypt.genSalt(ROUNDS);
    const hash   = await bcrypt.hash(password, salt);
    const t1     = performance.now();
    // The salt is embedded in the hash (first 29 chars); expose it for education
    results.push({ ...ALGORITHMS[3], hash, saltDisplay: salt, durationMs: +(t1 - t0).toFixed(0) });
  }

  // ── Argon2id (via hash-wasm) ──────────────────────────────────────────────
  {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const t0   = performance.now();
      const hash = await argon2id({
        password,
        salt,
        parallelism: 1,
        iterations:  3,
        memorySize:  65536,   // 64 MB
        hashLength:  32,
        outputType:  'encoded',
      });
      const t1 = performance.now();
      const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
      results.push({
        ...ALGORITHMS[4],
        hash,
        saltDisplay: saltHex,
        durationMs:  +(t1 - t0).toFixed(0),
      });
    } catch (err) {
      results.push({
        ...ALGORITHMS[4],
        hash:        `Argon2 error: ${err.message}`,
        saltDisplay: 'n/a',
        durationMs:  0,
      });
    }
  }

  return results;
}
