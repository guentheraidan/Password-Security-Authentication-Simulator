import { R as C } from "./vendor-react-DXNINo3y.js";
//! otpauth 9.5.0 | (c) Héctor Molinero Fernández | MIT | https://github.com/hectorm/otpauth
//! noble-hashes 2.0.1 | (c) Paul Miller | MIT | https://github.com/paulmillr/noble-hashes
const he = (s) => {
  const t = new ArrayBuffer(8), e = new Uint8Array(t);
  let i = s;
  for (let a = 7; a >= 0 && i !== 0; a--) e[a] = i & 255, i -= e[a], i /= 256;
  return e;
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function fe(s) {
  return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
}
function ht(s, t = "") {
  if (!Number.isSafeInteger(s) || s < 0) {
    const e = t && `"${t}" `;
    throw new Error(`${e}expected integer >= 0, got ${s}`);
  }
}
function tt(s, t, e = "") {
  const i = fe(s), a = s?.length, c = t !== void 0;
  if (!i || c && a !== t) {
    const h = e && `"${e}" `, f = c ? ` of length ${t}` : "", n = i ? `length=${a}` : `type=${typeof s}`;
    throw new Error(h + "expected Uint8Array" + f + ", got " + n);
  }
  return s;
}
function ue(s) {
  if (typeof s != "function" || typeof s.create != "function") throw new Error("Hash must wrapped by utils.createHasher");
  ht(s.outputLen), ht(s.blockLen);
}
function et(s, t = true) {
  if (s.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && s.finished) throw new Error("Hash#digest() has already been called");
}
function Pt(s, t) {
  tt(s, void 0, "digestInto() output");
  const e = t.outputLen;
  if (s.length < e) throw new Error('"digestInto() output" expected to be of length >=' + e);
}
function de(s) {
  return new Uint32Array(s.buffer, s.byteOffset, Math.floor(s.byteLength / 4));
}
function U(...s) {
  for (let t = 0; t < s.length; t++) s[t].fill(0);
}
function dt(s) {
  return new DataView(s.buffer, s.byteOffset, s.byteLength);
}
function N(s, t) {
  return s << 32 - t | s >>> t;
}
function bt(s, t) {
  return s << t | s >>> 32 - t >>> 0;
}
const be = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function ge(s) {
  return s << 24 & 4278190080 | s << 8 & 16711680 | s >>> 8 & 65280 | s >>> 24 & 255;
}
function xe(s) {
  for (let t = 0; t < s.length; t++) s[t] = ge(s[t]);
  return s;
}
const Lt = be ? (s) => s : xe;
function nt(s, t = {}) {
  const e = (a, c) => s(c).update(a).digest(), i = s(void 0);
  return e.outputLen = i.outputLen, e.blockLen = i.blockLen, e.create = (a) => s(a), Object.assign(e, t), Object.freeze(e);
}
const j = (s) => ({ oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, s]) });
class _t {
  update(t) {
    return et(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    et(this), tt(t, this.outputLen, "output"), this.finished = true, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: i, finished: a, destroyed: c, blockLen: h, outputLen: f } = this;
    return t = t, t.finished = a, t.destroyed = c, t.blockLen = h, t.outputLen = f, t.oHash = e._cloneInto(t.oHash), t.iHash = i._cloneInto(t.iHash), t;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
  constructor(t, e) {
    if (this.finished = false, this.destroyed = false, ue(t), tt(e, void 0, "key"), this.iHash = t.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const i = this.blockLen, a = new Uint8Array(i);
    a.set(e.length > i ? t.create().update(e).digest() : e);
    for (let c = 0; c < a.length; c++) a[c] ^= 54;
    this.iHash.update(a), this.oHash = t.create();
    for (let c = 0; c < a.length; c++) a[c] ^= 106;
    this.oHash.update(a), U(a);
  }
}
const gt = (s, t, e) => new _t(s, t).update(e).digest();
gt.create = (s, t) => new _t(s, t);
function kt(s, t, e) {
  return s & t ^ ~s & e;
}
function $t(s, t, e) {
  return s & t ^ s & e ^ t & e;
}
class At {
  update(t) {
    et(this), tt(t);
    const { view: e, buffer: i, blockLen: a } = this, c = t.length;
    for (let h = 0; h < c; ) {
      const f = Math.min(a - this.pos, c - h);
      if (f === a) {
        const n = dt(t);
        for (; a <= c - h; h += a) this.process(n, h);
        continue;
      }
      i.set(t.subarray(h, h + f), this.pos), this.pos += f, h += f, this.pos === a && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    et(this), Pt(t, this), this.finished = true;
    const { buffer: e, view: i, blockLen: a, isLE: c } = this;
    let { pos: h } = this;
    e[h++] = 128, U(this.buffer.subarray(h)), this.padOffset > a - h && (this.process(i, 0), h = 0);
    for (let l = h; l < a; l++) e[l] = 0;
    i.setBigUint64(a - 8, BigInt(this.length * 8), c), this.process(i, 0);
    const f = dt(t), n = this.outputLen;
    if (n % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
    const o = n / 4, r = this.get();
    if (o > r.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l = 0; l < o; l++) f.setUint32(4 * l, r[l], c);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const i = t.slice(0, e);
    return this.destroy(), i;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: i, length: a, finished: c, destroyed: h, pos: f } = this;
    return t.destroyed = h, t.finished = c, t.length = a, t.pos = f, a % e && t.buffer.set(i), t;
  }
  clone() {
    return this._cloneInto();
  }
  constructor(t, e, i, a) {
    this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.blockLen = t, this.outputLen = e, this.padOffset = i, this.isLE = a, this.buffer = new Uint8Array(t), this.view = dt(this.buffer);
  }
}
const $ = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), z = Uint32Array.from([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]), H = Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]), M = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]), rt = Uint32Array.from([1732584193, 4023233417, 2562383102, 271733878, 3285377520]), G = new Uint32Array(80);
class pe extends At {
  get() {
    const { A: t, B: e, C: i, D: a, E: c } = this;
    return [t, e, i, a, c];
  }
  set(t, e, i, a, c) {
    this.A = t | 0, this.B = e | 0, this.C = i | 0, this.D = a | 0, this.E = c | 0;
  }
  process(t, e) {
    for (let n = 0; n < 16; n++, e += 4) G[n] = t.getUint32(e, false);
    for (let n = 16; n < 80; n++) G[n] = bt(G[n - 3] ^ G[n - 8] ^ G[n - 14] ^ G[n - 16], 1);
    let { A: i, B: a, C: c, D: h, E: f } = this;
    for (let n = 0; n < 80; n++) {
      let o, r;
      n < 20 ? (o = kt(a, c, h), r = 1518500249) : n < 40 ? (o = a ^ c ^ h, r = 1859775393) : n < 60 ? (o = $t(a, c, h), r = 2400959708) : (o = a ^ c ^ h, r = 3395469782);
      const l = bt(i, 5) + o + f + r + G[n] | 0;
      f = h, h = c, c = bt(a, 30), a = i, i = l;
    }
    i = i + this.A | 0, a = a + this.B | 0, c = c + this.C | 0, h = h + this.D | 0, f = f + this.E | 0, this.set(i, a, c, h, f);
  }
  roundClean() {
    U(G);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0), U(this.buffer);
  }
  constructor() {
    super(64, 20, 8, false), this.A = rt[0] | 0, this.B = rt[1] | 0, this.C = rt[2] | 0, this.D = rt[3] | 0, this.E = rt[4] | 0;
  }
}
const we = nt(() => new pe()), at = BigInt(2 ** 32 - 1), Ht = BigInt(32);
function Ae(s, t = false) {
  return t ? { h: Number(s & at), l: Number(s >> Ht & at) } : { h: Number(s >> Ht & at) | 0, l: Number(s & at) | 0 };
}
function zt(s, t = false) {
  const e = s.length;
  let i = new Uint32Array(e), a = new Uint32Array(e);
  for (let c = 0; c < e; c++) {
    const { h, l: f } = Ae(s[c], t);
    [i[c], a[c]] = [h, f];
  }
  return [i, a];
}
const Mt = (s, t, e) => s >>> e, Rt = (s, t, e) => s << 32 - e | t >>> e, Z = (s, t, e) => s >>> e | t << 32 - e, J = (s, t, e) => s << 32 - e | t >>> e, ct = (s, t, e) => s << 64 - e | t >>> e - 32, lt = (s, t, e) => s >>> e - 32 | t << 64 - e, me = (s, t, e) => s << e | t >>> 32 - e, Ee = (s, t, e) => t << e | s >>> 32 - e, ye = (s, t, e) => t << e - 32 | s >>> 64 - e, Ce = (s, t, e) => s << e - 32 | t >>> 64 - e;
function F(s, t, e, i) {
  const a = (t >>> 0) + (i >>> 0);
  return { h: s + e + (a / 2 ** 32 | 0) | 0, l: a | 0 };
}
const Se = (s, t, e) => (s >>> 0) + (t >>> 0) + (e >>> 0), Ie = (s, t, e, i) => t + e + i + (s / 2 ** 32 | 0) | 0, Le = (s, t, e, i) => (s >>> 0) + (t >>> 0) + (e >>> 0) + (i >>> 0), He = (s, t, e, i, a) => t + e + i + a + (s / 2 ** 32 | 0) | 0, Me = (s, t, e, i, a) => (s >>> 0) + (t >>> 0) + (e >>> 0) + (i >>> 0) + (a >>> 0), Re = (s, t, e, i, a, c) => t + e + i + a + c + (s / 2 ** 32 | 0) | 0, Be = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), T = new Uint32Array(64);
class Gt extends At {
  get() {
    const { A: t, B: e, C: i, D: a, E: c, F: h, G: f, H: n } = this;
    return [t, e, i, a, c, h, f, n];
  }
  set(t, e, i, a, c, h, f, n) {
    this.A = t | 0, this.B = e | 0, this.C = i | 0, this.D = a | 0, this.E = c | 0, this.F = h | 0, this.G = f | 0, this.H = n | 0;
  }
  process(t, e) {
    for (let l = 0; l < 16; l++, e += 4) T[l] = t.getUint32(e, false);
    for (let l = 16; l < 64; l++) {
      const u = T[l - 15], b = T[l - 2], d = N(u, 7) ^ N(u, 18) ^ u >>> 3, p = N(b, 17) ^ N(b, 19) ^ b >>> 10;
      T[l] = p + T[l - 7] + d + T[l - 16] | 0;
    }
    let { A: i, B: a, C: c, D: h, E: f, F: n, G: o, H: r } = this;
    for (let l = 0; l < 64; l++) {
      const u = N(f, 6) ^ N(f, 11) ^ N(f, 25), b = r + u + kt(f, n, o) + Be[l] + T[l] | 0, p = (N(i, 2) ^ N(i, 13) ^ N(i, 22)) + $t(i, a, c) | 0;
      r = o, o = n, n = f, f = h + b | 0, h = c, c = a, a = i, i = b + p | 0;
    }
    i = i + this.A | 0, a = a + this.B | 0, c = c + this.C | 0, h = h + this.D | 0, f = f + this.E | 0, n = n + this.F | 0, o = o + this.G | 0, r = r + this.H | 0, this.set(i, a, c, h, f, n, o, r);
  }
  roundClean() {
    U(T);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), U(this.buffer);
  }
  constructor(t) {
    super(64, t, 8, false);
  }
}
class ve extends Gt {
  constructor() {
    super(32), this.A = $[0] | 0, this.B = $[1] | 0, this.C = $[2] | 0, this.D = $[3] | 0, this.E = $[4] | 0, this.F = $[5] | 0, this.G = $[6] | 0, this.H = $[7] | 0;
  }
}
class De extends Gt {
  constructor() {
    super(28), this.A = z[0] | 0, this.B = z[1] | 0, this.C = z[2] | 0, this.D = z[3] | 0, this.E = z[4] | 0, this.F = z[5] | 0, this.G = z[6] | 0, this.H = z[7] | 0;
  }
}
const Tt = zt(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((s) => BigInt(s))), Ne = Tt[0], Ue = Tt[1], Q = new Uint32Array(80), V = new Uint32Array(80);
class Qt extends At {
  get() {
    const { Ah: t, Al: e, Bh: i, Bl: a, Ch: c, Cl: h, Dh: f, Dl: n, Eh: o, El: r, Fh: l, Fl: u, Gh: b, Gl: d, Hh: p, Hl: x } = this;
    return [t, e, i, a, c, h, f, n, o, r, l, u, b, d, p, x];
  }
  set(t, e, i, a, c, h, f, n, o, r, l, u, b, d, p, x) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = i | 0, this.Bl = a | 0, this.Ch = c | 0, this.Cl = h | 0, this.Dh = f | 0, this.Dl = n | 0, this.Eh = o | 0, this.El = r | 0, this.Fh = l | 0, this.Fl = u | 0, this.Gh = b | 0, this.Gl = d | 0, this.Hh = p | 0, this.Hl = x | 0;
  }
  process(t, e) {
    for (let g = 0; g < 16; g++, e += 4) Q[g] = t.getUint32(e), V[g] = t.getUint32(e += 4);
    for (let g = 16; g < 80; g++) {
      const A = Q[g - 15] | 0, y = V[g - 15] | 0, _ = Z(A, y, 1) ^ Z(A, y, 8) ^ Mt(A, y, 7), X = J(A, y, 1) ^ J(A, y, 8) ^ Rt(A, y, 7), R = Q[g - 2] | 0, v = V[g - 2] | 0, k = Z(R, v, 19) ^ ct(R, v, 61) ^ Mt(R, v, 6), B = J(R, v, 19) ^ lt(R, v, 61) ^ Rt(R, v, 6), Y = Le(X, B, V[g - 7], V[g - 16]), K = He(Y, _, k, Q[g - 7], Q[g - 16]);
      Q[g] = K | 0, V[g] = Y | 0;
    }
    let { Ah: i, Al: a, Bh: c, Bl: h, Ch: f, Cl: n, Dh: o, Dl: r, Eh: l, El: u, Fh: b, Fl: d, Gh: p, Gl: x, Hh: S, Hl: m } = this;
    for (let g = 0; g < 80; g++) {
      const A = Z(l, u, 14) ^ Z(l, u, 18) ^ ct(l, u, 41), y = J(l, u, 14) ^ J(l, u, 18) ^ lt(l, u, 41), _ = l & b ^ ~l & p, X = u & d ^ ~u & x, R = Me(m, y, X, Ue[g], V[g]), v = Re(R, S, A, _, Ne[g], Q[g]), k = R | 0, B = Z(i, a, 28) ^ ct(i, a, 34) ^ ct(i, a, 39), Y = J(i, a, 28) ^ lt(i, a, 34) ^ lt(i, a, 39), K = i & c ^ i & f ^ c & f, O = a & h ^ a & n ^ h & n;
      S = p | 0, m = x | 0, p = b | 0, x = d | 0, b = l | 0, d = u | 0, { h: l, l: u } = F(o | 0, r | 0, v | 0, k | 0), o = f | 0, r = n | 0, f = c | 0, n = h | 0, c = i | 0, h = a | 0;
      const D = Se(k, Y, O);
      i = Ie(D, v, B, K), a = D | 0;
    }
    ({ h: i, l: a } = F(this.Ah | 0, this.Al | 0, i | 0, a | 0)), { h: c, l: h } = F(this.Bh | 0, this.Bl | 0, c | 0, h | 0), { h: f, l: n } = F(this.Ch | 0, this.Cl | 0, f | 0, n | 0), { h: o, l: r } = F(this.Dh | 0, this.Dl | 0, o | 0, r | 0), { h: l, l: u } = F(this.Eh | 0, this.El | 0, l | 0, u | 0), { h: b, l: d } = F(this.Fh | 0, this.Fl | 0, b | 0, d | 0), { h: p, l: x } = F(this.Gh | 0, this.Gl | 0, p | 0, x | 0), { h: S, l: m } = F(this.Hh | 0, this.Hl | 0, S | 0, m | 0), this.set(i, a, c, h, f, n, o, r, l, u, b, d, p, x, S, m);
  }
  roundClean() {
    U(Q, V);
  }
  destroy() {
    U(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  constructor(t) {
    super(128, t, 16, false);
  }
}
class Oe extends Qt {
  constructor() {
    super(64), this.Ah = M[0] | 0, this.Al = M[1] | 0, this.Bh = M[2] | 0, this.Bl = M[3] | 0, this.Ch = M[4] | 0, this.Cl = M[5] | 0, this.Dh = M[6] | 0, this.Dl = M[7] | 0, this.Eh = M[8] | 0, this.El = M[9] | 0, this.Fh = M[10] | 0, this.Fl = M[11] | 0, this.Gh = M[12] | 0, this.Gl = M[13] | 0, this.Hh = M[14] | 0, this.Hl = M[15] | 0;
  }
}
class Fe extends Qt {
  constructor() {
    super(48), this.Ah = H[0] | 0, this.Al = H[1] | 0, this.Bh = H[2] | 0, this.Bl = H[3] | 0, this.Ch = H[4] | 0, this.Cl = H[5] | 0, this.Dh = H[6] | 0, this.Dl = H[7] | 0, this.Eh = H[8] | 0, this.El = H[9] | 0, this.Fh = H[10] | 0, this.Fl = H[11] | 0, this.Gh = H[12] | 0, this.Gl = H[13] | 0, this.Hh = H[14] | 0, this.Hl = H[15] | 0;
  }
}
const Pe = nt(() => new ve(), j(1)), _e = nt(() => new De(), j(4)), ke = nt(() => new Oe(), j(3)), $e = nt(() => new Fe(), j(2)), ze = BigInt(0), ot = BigInt(1), Ge = BigInt(2), Te = BigInt(7), Qe = BigInt(256), Ve = BigInt(113), Vt = [], jt = [], Wt = [];
for (let s = 0, t = ot, e = 1, i = 0; s < 24; s++) {
  [e, i] = [i, (2 * e + 3 * i) % 5], Vt.push(2 * (5 * i + e)), jt.push((s + 1) * (s + 2) / 2 % 64);
  let a = ze;
  for (let c = 0; c < 7; c++) t = (t << ot ^ (t >> Te) * Ve) % Qe, t & Ge && (a ^= ot << (ot << BigInt(c)) - ot);
  Wt.push(a);
}
const Xt = zt(Wt, true), je = Xt[0], We = Xt[1], Bt = (s, t, e) => e > 32 ? ye(s, t, e) : me(s, t, e), vt = (s, t, e) => e > 32 ? Ce(s, t, e) : Ee(s, t, e);
function Xe(s, t = 24) {
  const e = new Uint32Array(10);
  for (let i = 24 - t; i < 24; i++) {
    for (let h = 0; h < 10; h++) e[h] = s[h] ^ s[h + 10] ^ s[h + 20] ^ s[h + 30] ^ s[h + 40];
    for (let h = 0; h < 10; h += 2) {
      const f = (h + 8) % 10, n = (h + 2) % 10, o = e[n], r = e[n + 1], l = Bt(o, r, 1) ^ e[f], u = vt(o, r, 1) ^ e[f + 1];
      for (let b = 0; b < 50; b += 10) s[h + b] ^= l, s[h + b + 1] ^= u;
    }
    let a = s[2], c = s[3];
    for (let h = 0; h < 24; h++) {
      const f = jt[h], n = Bt(a, c, f), o = vt(a, c, f), r = Vt[h];
      a = s[r], c = s[r + 1], s[r] = n, s[r + 1] = o;
    }
    for (let h = 0; h < 50; h += 10) {
      for (let f = 0; f < 10; f++) e[f] = s[h + f];
      for (let f = 0; f < 10; f++) s[h + f] ^= ~e[(f + 2) % 10] & e[(f + 4) % 10];
    }
    s[0] ^= je[i], s[1] ^= We[i];
  }
  U(e);
}
class mt {
  clone() {
    return this._cloneInto();
  }
  keccak() {
    Lt(this.state32), Xe(this.state32, this.rounds), Lt(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    et(this), tt(t);
    const { blockLen: e, state: i } = this, a = t.length;
    for (let c = 0; c < a; ) {
      const h = Math.min(e - this.pos, a - c);
      for (let f = 0; f < h; f++) i[this.pos++] ^= t[c++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: t, suffix: e, pos: i, blockLen: a } = this;
    t[i] ^= e, e & 128 && i === a - 1 && this.keccak(), t[a - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    et(this, false), tt(t), this.finish();
    const e = this.state, { blockLen: i } = this;
    for (let a = 0, c = t.length; a < c; ) {
      this.posOut >= i && this.keccak();
      const h = Math.min(i - this.posOut, c - a);
      t.set(e.subarray(this.posOut, this.posOut + h), a), this.posOut += h, a += h;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return ht(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Pt(t, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, U(this.state);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: i, outputLen: a, rounds: c, enableXOF: h } = this;
    return t || (t = new mt(e, i, a, h, c)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = c, t.suffix = i, t.outputLen = a, t.enableXOF = h, t.destroyed = this.destroyed, t;
  }
  constructor(t, e, i, a = false, c = 24) {
    if (this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, this.enableXOF = false, this.blockLen = t, this.suffix = e, this.outputLen = i, this.enableXOF = a, this.rounds = c, ht(i, "outputLen"), !(0 < t && t < 200)) throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200), this.state32 = de(this.state);
  }
}
const ut = (s, t, e, i = {}) => nt(() => new mt(t, s, e), i), Ye = ut(6, 144, 28, j(7)), Ke = ut(6, 136, 32, j(8)), Ze = ut(6, 104, 48, j(9)), Je = ut(6, 72, 64, j(10)), st = (() => {
  if (typeof globalThis == "object") return globalThis;
  Object.defineProperty(Object.prototype, "__GLOBALTHIS__", { get() {
    return this;
  }, configurable: true });
  try {
    if (typeof __GLOBALTHIS__ < "u") return __GLOBALTHIS__;
  } finally {
    delete Object.prototype.__GLOBALTHIS__;
  }
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
})(), Dt = { SHA1: we, SHA224: _e, SHA256: Pe, SHA384: $e, SHA512: ke, "SHA3-224": Ye, "SHA3-256": Ke, "SHA3-384": Ze, "SHA3-512": Je }, Et = (s) => {
  switch (true) {
    case /^(?:SHA-?1|SSL3-SHA1)$/i.test(s):
      return "SHA1";
    case /^SHA(?:2?-)?224$/i.test(s):
      return "SHA224";
    case /^SHA(?:2?-)?256$/i.test(s):
      return "SHA256";
    case /^SHA(?:2?-)?384$/i.test(s):
      return "SHA384";
    case /^SHA(?:2?-)?512$/i.test(s):
      return "SHA512";
    case /^SHA3-224$/i.test(s):
      return "SHA3-224";
    case /^SHA3-256$/i.test(s):
      return "SHA3-256";
    case /^SHA3-384$/i.test(s):
      return "SHA3-384";
    case /^SHA3-512$/i.test(s):
      return "SHA3-512";
    default:
      throw new TypeError(`Unknown hash algorithm: ${s}`);
  }
}, Nt = (s, t, e) => {
  if (gt) {
    const i = Dt[s] ?? Dt[Et(s)];
    return gt(i, t, e);
  } else throw new Error("Missing HMAC function");
}, xt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", qe = (s) => {
  s = s.replace(/ /g, "");
  let t = s.length;
  for (; s[t - 1] === "="; ) --t;
  s = (t < s.length ? s.substring(0, t) : s).toUpperCase();
  const e = new ArrayBuffer(s.length * 5 / 8 | 0), i = new Uint8Array(e);
  let a = 0, c = 0, h = 0;
  for (let f = 0; f < s.length; f++) {
    const n = xt.indexOf(s[f]);
    if (n === -1) throw new TypeError(`Invalid character found: ${s[f]}`);
    c = c << 5 | n, a += 5, a >= 8 && (a -= 8, i[h++] = c >>> a);
  }
  return i;
}, ts = (s) => {
  let t = 0, e = 0, i = "";
  for (let a = 0; a < s.length; a++) for (e = e << 8 | s[a], t += 8; t >= 5; ) i += xt[e >>> t - 5 & 31], t -= 5;
  return t > 0 && (i += xt[e << 5 - t & 31]), i;
}, es = (s) => {
  s = s.replace(/ /g, "");
  const t = new ArrayBuffer(s.length / 2), e = new Uint8Array(t);
  for (let i = 0; i < s.length; i += 2) e[i / 2] = parseInt(s.substring(i, i + 2), 16);
  return e;
}, ss = (s) => {
  let t = "";
  for (let e = 0; e < s.length; e++) {
    const i = s[e].toString(16);
    i.length === 1 && (t += "0"), t += i;
  }
  return t.toUpperCase();
}, ns = (s) => {
  const t = new ArrayBuffer(s.length), e = new Uint8Array(t);
  for (let i = 0; i < s.length; i++) e[i] = s.charCodeAt(i) & 255;
  return e;
}, is = (s) => {
  let t = "";
  for (let e = 0; e < s.length; e++) t += String.fromCharCode(s[e]);
  return t;
}, Ut = st.TextEncoder ? new st.TextEncoder() : null, Ot = st.TextDecoder ? new st.TextDecoder() : null, rs = (s) => {
  if (!Ut) throw new Error("Encoding API not available");
  return Ut.encode(s);
}, os = (s) => {
  if (!Ot) throw new Error("Encoding API not available");
  return Ot.decode(s);
}, as = (s) => {
  if (st.crypto?.getRandomValues) return st.crypto.getRandomValues(new Uint8Array(s));
  throw new Error("Cryptography API not available");
};
class P {
  static fromLatin1(t) {
    return new P({ buffer: ns(t).buffer });
  }
  static fromUTF8(t) {
    return new P({ buffer: rs(t).buffer });
  }
  static fromBase32(t) {
    return new P({ buffer: qe(t).buffer });
  }
  static fromHex(t) {
    return new P({ buffer: es(t).buffer });
  }
  get buffer() {
    return this.bytes.buffer;
  }
  get latin1() {
    return Object.defineProperty(this, "latin1", { enumerable: true, writable: false, configurable: false, value: is(this.bytes) }), this.latin1;
  }
  get utf8() {
    return Object.defineProperty(this, "utf8", { enumerable: true, writable: false, configurable: false, value: os(this.bytes) }), this.utf8;
  }
  get base32() {
    return Object.defineProperty(this, "base32", { enumerable: true, writable: false, configurable: false, value: ts(this.bytes) }), this.base32;
  }
  get hex() {
    return Object.defineProperty(this, "hex", { enumerable: true, writable: false, configurable: false, value: ss(this.bytes) }), this.hex;
  }
  constructor({ buffer: t, size: e = 20 } = {}) {
    this.bytes = typeof t > "u" ? as(e) : new Uint8Array(t), Object.defineProperty(this, "bytes", { enumerable: true, writable: false, configurable: false, value: this.bytes });
  }
}
const cs = (s, t) => {
  {
    if (s.length !== t.length) throw new TypeError("Input strings must have the same length");
    let e = -1, i = 0;
    for (; ++e < s.length; ) i |= s.charCodeAt(e) ^ t.charCodeAt(e);
    return i === 0;
  }
};
class I {
  static get defaults() {
    return { issuer: "", label: "OTPAuth", issuerInLabel: true, algorithm: "SHA1", digits: 6, counter: 0, window: 1 };
  }
  static generate({ secret: t, algorithm: e = I.defaults.algorithm, digits: i = I.defaults.digits, counter: a = I.defaults.counter, hmac: c = Nt }) {
    const h = he(a), f = c(e, t.bytes, h);
    if (!f?.byteLength || f.byteLength < 19) throw new TypeError("Return value must be at least 19 bytes");
    const n = f[f.byteLength - 1] & 15;
    return (((f[n] & 127) << 24 | (f[n + 1] & 255) << 16 | (f[n + 2] & 255) << 8 | f[n + 3] & 255) % 10 ** i).toString().padStart(i, "0");
  }
  generate({ counter: t = this.counter++ } = {}) {
    return I.generate({ secret: this.secret, algorithm: this.algorithm, digits: this.digits, counter: t, hmac: this.hmac });
  }
  static validate({ token: t, secret: e, algorithm: i, digits: a = I.defaults.digits, counter: c = I.defaults.counter, window: h = I.defaults.window, hmac: f = Nt }) {
    if (t.length !== a) return null;
    let n = null;
    const o = (r) => {
      const l = I.generate({ secret: e, algorithm: i, digits: a, counter: r, hmac: f });
      cs(t, l) && (n = r - c);
    };
    o(c);
    for (let r = 1; r <= h && n === null && (o(c - r), !(n !== null || (o(c + r), n !== null))); ++r) ;
    return n;
  }
  validate({ token: t, counter: e = this.counter, window: i }) {
    return I.validate({ token: t, secret: this.secret, algorithm: this.algorithm, digits: this.digits, counter: e, window: i, hmac: this.hmac });
  }
  toString() {
    const t = encodeURIComponent;
    return `otpauth://hotp/${this.issuer.length > 0 ? this.issuerInLabel ? `${t(this.issuer)}:${t(this.label)}?issuer=${t(this.issuer)}&` : `${t(this.label)}?issuer=${t(this.issuer)}&` : `${t(this.label)}?`}secret=${t(this.secret.base32)}&algorithm=${t(this.algorithm)}&digits=${t(this.digits)}&counter=${t(this.counter)}`;
  }
  constructor({ issuer: t = I.defaults.issuer, label: e = I.defaults.label, issuerInLabel: i = I.defaults.issuerInLabel, secret: a = new P(), algorithm: c = I.defaults.algorithm, digits: h = I.defaults.digits, counter: f = I.defaults.counter, hmac: n } = {}) {
    this.issuer = t, this.label = e, this.issuerInLabel = i, this.secret = typeof a == "string" ? P.fromBase32(a) : a, this.algorithm = n ? c : Et(c), this.digits = h, this.counter = f, this.hmac = n;
  }
}
class L {
  static get defaults() {
    return { issuer: "", label: "OTPAuth", issuerInLabel: true, algorithm: "SHA1", digits: 6, period: 30, window: 1 };
  }
  static counter({ period: t = L.defaults.period, timestamp: e = Date.now() } = {}) {
    return Math.floor(e / 1e3 / t);
  }
  counter({ timestamp: t = Date.now() } = {}) {
    return L.counter({ period: this.period, timestamp: t });
  }
  static remaining({ period: t = L.defaults.period, timestamp: e = Date.now() } = {}) {
    return t * 1e3 - e % (t * 1e3);
  }
  remaining({ timestamp: t = Date.now() } = {}) {
    return L.remaining({ period: this.period, timestamp: t });
  }
  static generate({ secret: t, algorithm: e, digits: i, period: a = L.defaults.period, timestamp: c = Date.now(), hmac: h }) {
    return I.generate({ secret: t, algorithm: e, digits: i, counter: L.counter({ period: a, timestamp: c }), hmac: h });
  }
  generate({ timestamp: t = Date.now() } = {}) {
    return L.generate({ secret: this.secret, algorithm: this.algorithm, digits: this.digits, period: this.period, timestamp: t, hmac: this.hmac });
  }
  static validate({ token: t, secret: e, algorithm: i, digits: a, period: c = L.defaults.period, timestamp: h = Date.now(), window: f, hmac: n }) {
    return I.validate({ token: t, secret: e, algorithm: i, digits: a, counter: L.counter({ period: c, timestamp: h }), window: f, hmac: n });
  }
  validate({ token: t, timestamp: e, window: i }) {
    return L.validate({ token: t, secret: this.secret, algorithm: this.algorithm, digits: this.digits, period: this.period, timestamp: e, window: i, hmac: this.hmac });
  }
  toString() {
    const t = encodeURIComponent;
    return `otpauth://totp/${this.issuer.length > 0 ? this.issuerInLabel ? `${t(this.issuer)}:${t(this.label)}?issuer=${t(this.issuer)}&` : `${t(this.label)}?issuer=${t(this.issuer)}&` : `${t(this.label)}?`}secret=${t(this.secret.base32)}&algorithm=${t(this.algorithm)}&digits=${t(this.digits)}&period=${t(this.period)}`;
  }
  constructor({ issuer: t = L.defaults.issuer, label: e = L.defaults.label, issuerInLabel: i = L.defaults.issuerInLabel, secret: a = new P(), algorithm: c = L.defaults.algorithm, digits: h = L.defaults.digits, period: f = L.defaults.period, hmac: n } = {}) {
    this.issuer = t, this.label = e, this.issuerInLabel = i, this.secret = typeof a == "string" ? P.fromBase32(a) : a, this.algorithm = n ? c : Et(c), this.digits = h, this.period = f, this.hmac = n;
  }
}
var ls = Object.defineProperty, ft = Object.getOwnPropertySymbols, Yt = Object.prototype.hasOwnProperty, Kt = Object.prototype.propertyIsEnumerable, Ft = (s, t, e) => t in s ? ls(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, pt = (s, t) => {
  for (var e in t || (t = {})) Yt.call(t, e) && Ft(s, e, t[e]);
  if (ft) for (var e of ft(t)) Kt.call(t, e) && Ft(s, e, t[e]);
  return s;
}, wt = (s, t) => {
  var e = {};
  for (var i in s) Yt.call(s, i) && t.indexOf(i) < 0 && (e[i] = s[i]);
  if (s != null && ft) for (var i of ft(s)) t.indexOf(i) < 0 && Kt.call(s, i) && (e[i] = s[i]);
  return e;
};
/**
* @license QR Code generator library (TypeScript)
* Copyright (c) Project Nayuki.
* SPDX-License-Identifier: MIT
*/
var W;
((s) => {
  const t = class w {
    constructor(n, o, r, l) {
      if (this.version = n, this.errorCorrectionLevel = o, this.modules = [], this.isFunction = [], n < w.MIN_VERSION || n > w.MAX_VERSION) throw new RangeError("Version value out of range");
      if (l < -1 || l > 7) throw new RangeError("Mask value out of range");
      this.size = n * 4 + 17;
      let u = [];
      for (let d = 0; d < this.size; d++) u.push(false);
      for (let d = 0; d < this.size; d++) this.modules.push(u.slice()), this.isFunction.push(u.slice());
      this.drawFunctionPatterns();
      const b = this.addEccAndInterleave(r);
      if (this.drawCodewords(b), l == -1) {
        let d = 1e9;
        for (let p = 0; p < 8; p++) {
          this.applyMask(p), this.drawFormatBits(p);
          const x = this.getPenaltyScore();
          x < d && (l = p, d = x), this.applyMask(p);
        }
      }
      a(0 <= l && l <= 7), this.mask = l, this.applyMask(l), this.drawFormatBits(l), this.isFunction = [];
    }
    static encodeText(n, o) {
      const r = s.QrSegment.makeSegments(n);
      return w.encodeSegments(r, o);
    }
    static encodeBinary(n, o) {
      const r = s.QrSegment.makeBytes(n);
      return w.encodeSegments([r], o);
    }
    static encodeSegments(n, o, r = 1, l = 40, u = -1, b = true) {
      if (!(w.MIN_VERSION <= r && r <= l && l <= w.MAX_VERSION) || u < -1 || u > 7) throw new RangeError("Invalid value");
      let d, p;
      for (d = r; ; d++) {
        const g = w.getNumDataCodewords(d, o) * 8, A = h.getTotalBits(n, d);
        if (A <= g) {
          p = A;
          break;
        }
        if (d >= l) throw new RangeError("Data too long");
      }
      for (const g of [w.Ecc.MEDIUM, w.Ecc.QUARTILE, w.Ecc.HIGH]) b && p <= w.getNumDataCodewords(d, g) * 8 && (o = g);
      let x = [];
      for (const g of n) {
        e(g.mode.modeBits, 4, x), e(g.numChars, g.mode.numCharCountBits(d), x);
        for (const A of g.getData()) x.push(A);
      }
      a(x.length == p);
      const S = w.getNumDataCodewords(d, o) * 8;
      a(x.length <= S), e(0, Math.min(4, S - x.length), x), e(0, (8 - x.length % 8) % 8, x), a(x.length % 8 == 0);
      for (let g = 236; x.length < S; g ^= 253) e(g, 8, x);
      let m = [];
      for (; m.length * 8 < x.length; ) m.push(0);
      return x.forEach((g, A) => m[A >>> 3] |= g << 7 - (A & 7)), new w(d, o, m, u);
    }
    getModule(n, o) {
      return 0 <= n && n < this.size && 0 <= o && o < this.size && this.modules[o][n];
    }
    getModules() {
      return this.modules;
    }
    drawFunctionPatterns() {
      for (let r = 0; r < this.size; r++) this.setFunctionModule(6, r, r % 2 == 0), this.setFunctionModule(r, 6, r % 2 == 0);
      this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
      const n = this.getAlignmentPatternPositions(), o = n.length;
      for (let r = 0; r < o; r++) for (let l = 0; l < o; l++) r == 0 && l == 0 || r == 0 && l == o - 1 || r == o - 1 && l == 0 || this.drawAlignmentPattern(n[r], n[l]);
      this.drawFormatBits(0), this.drawVersion();
    }
    drawFormatBits(n) {
      const o = this.errorCorrectionLevel.formatBits << 3 | n;
      let r = o;
      for (let u = 0; u < 10; u++) r = r << 1 ^ (r >>> 9) * 1335;
      const l = (o << 10 | r) ^ 21522;
      a(l >>> 15 == 0);
      for (let u = 0; u <= 5; u++) this.setFunctionModule(8, u, i(l, u));
      this.setFunctionModule(8, 7, i(l, 6)), this.setFunctionModule(8, 8, i(l, 7)), this.setFunctionModule(7, 8, i(l, 8));
      for (let u = 9; u < 15; u++) this.setFunctionModule(14 - u, 8, i(l, u));
      for (let u = 0; u < 8; u++) this.setFunctionModule(this.size - 1 - u, 8, i(l, u));
      for (let u = 8; u < 15; u++) this.setFunctionModule(8, this.size - 15 + u, i(l, u));
      this.setFunctionModule(8, this.size - 8, true);
    }
    drawVersion() {
      if (this.version < 7) return;
      let n = this.version;
      for (let r = 0; r < 12; r++) n = n << 1 ^ (n >>> 11) * 7973;
      const o = this.version << 12 | n;
      a(o >>> 18 == 0);
      for (let r = 0; r < 18; r++) {
        const l = i(o, r), u = this.size - 11 + r % 3, b = Math.floor(r / 3);
        this.setFunctionModule(u, b, l), this.setFunctionModule(b, u, l);
      }
    }
    drawFinderPattern(n, o) {
      for (let r = -4; r <= 4; r++) for (let l = -4; l <= 4; l++) {
        const u = Math.max(Math.abs(l), Math.abs(r)), b = n + l, d = o + r;
        0 <= b && b < this.size && 0 <= d && d < this.size && this.setFunctionModule(b, d, u != 2 && u != 4);
      }
    }
    drawAlignmentPattern(n, o) {
      for (let r = -2; r <= 2; r++) for (let l = -2; l <= 2; l++) this.setFunctionModule(n + l, o + r, Math.max(Math.abs(l), Math.abs(r)) != 1);
    }
    setFunctionModule(n, o, r) {
      this.modules[o][n] = r, this.isFunction[o][n] = true;
    }
    addEccAndInterleave(n) {
      const o = this.version, r = this.errorCorrectionLevel;
      if (n.length != w.getNumDataCodewords(o, r)) throw new RangeError("Invalid argument");
      const l = w.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][o], u = w.ECC_CODEWORDS_PER_BLOCK[r.ordinal][o], b = Math.floor(w.getNumRawDataModules(o) / 8), d = l - b % l, p = Math.floor(b / l);
      let x = [];
      const S = w.reedSolomonComputeDivisor(u);
      for (let g = 0, A = 0; g < l; g++) {
        let y = n.slice(A, A + p - u + (g < d ? 0 : 1));
        A += y.length;
        const _ = w.reedSolomonComputeRemainder(y, S);
        g < d && y.push(0), x.push(y.concat(_));
      }
      let m = [];
      for (let g = 0; g < x[0].length; g++) x.forEach((A, y) => {
        (g != p - u || y >= d) && m.push(A[g]);
      });
      return a(m.length == b), m;
    }
    drawCodewords(n) {
      if (n.length != Math.floor(w.getNumRawDataModules(this.version) / 8)) throw new RangeError("Invalid argument");
      let o = 0;
      for (let r = this.size - 1; r >= 1; r -= 2) {
        r == 6 && (r = 5);
        for (let l = 0; l < this.size; l++) for (let u = 0; u < 2; u++) {
          const b = r - u, p = (r + 1 & 2) == 0 ? this.size - 1 - l : l;
          !this.isFunction[p][b] && o < n.length * 8 && (this.modules[p][b] = i(n[o >>> 3], 7 - (o & 7)), o++);
        }
      }
      a(o == n.length * 8);
    }
    applyMask(n) {
      if (n < 0 || n > 7) throw new RangeError("Mask value out of range");
      for (let o = 0; o < this.size; o++) for (let r = 0; r < this.size; r++) {
        let l;
        switch (n) {
          case 0:
            l = (r + o) % 2 == 0;
            break;
          case 1:
            l = o % 2 == 0;
            break;
          case 2:
            l = r % 3 == 0;
            break;
          case 3:
            l = (r + o) % 3 == 0;
            break;
          case 4:
            l = (Math.floor(r / 3) + Math.floor(o / 2)) % 2 == 0;
            break;
          case 5:
            l = r * o % 2 + r * o % 3 == 0;
            break;
          case 6:
            l = (r * o % 2 + r * o % 3) % 2 == 0;
            break;
          case 7:
            l = ((r + o) % 2 + r * o % 3) % 2 == 0;
            break;
          default:
            throw new Error("Unreachable");
        }
        !this.isFunction[o][r] && l && (this.modules[o][r] = !this.modules[o][r]);
      }
    }
    getPenaltyScore() {
      let n = 0;
      for (let u = 0; u < this.size; u++) {
        let b = false, d = 0, p = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0; x < this.size; x++) this.modules[u][x] == b ? (d++, d == 5 ? n += w.PENALTY_N1 : d > 5 && n++) : (this.finderPenaltyAddHistory(d, p), b || (n += this.finderPenaltyCountPatterns(p) * w.PENALTY_N3), b = this.modules[u][x], d = 1);
        n += this.finderPenaltyTerminateAndCount(b, d, p) * w.PENALTY_N3;
      }
      for (let u = 0; u < this.size; u++) {
        let b = false, d = 0, p = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0; x < this.size; x++) this.modules[x][u] == b ? (d++, d == 5 ? n += w.PENALTY_N1 : d > 5 && n++) : (this.finderPenaltyAddHistory(d, p), b || (n += this.finderPenaltyCountPatterns(p) * w.PENALTY_N3), b = this.modules[x][u], d = 1);
        n += this.finderPenaltyTerminateAndCount(b, d, p) * w.PENALTY_N3;
      }
      for (let u = 0; u < this.size - 1; u++) for (let b = 0; b < this.size - 1; b++) {
        const d = this.modules[u][b];
        d == this.modules[u][b + 1] && d == this.modules[u + 1][b] && d == this.modules[u + 1][b + 1] && (n += w.PENALTY_N2);
      }
      let o = 0;
      for (const u of this.modules) o = u.reduce((b, d) => b + (d ? 1 : 0), o);
      const r = this.size * this.size, l = Math.ceil(Math.abs(o * 20 - r * 10) / r) - 1;
      return a(0 <= l && l <= 9), n += l * w.PENALTY_N4, a(0 <= n && n <= 2568888), n;
    }
    getAlignmentPatternPositions() {
      if (this.version == 1) return [];
      {
        const n = Math.floor(this.version / 7) + 2, o = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (n * 2 - 2)) * 2;
        let r = [6];
        for (let l = this.size - 7; r.length < n; l -= o) r.splice(1, 0, l);
        return r;
      }
    }
    static getNumRawDataModules(n) {
      if (n < w.MIN_VERSION || n > w.MAX_VERSION) throw new RangeError("Version number out of range");
      let o = (16 * n + 128) * n + 64;
      if (n >= 2) {
        const r = Math.floor(n / 7) + 2;
        o -= (25 * r - 10) * r - 55, n >= 7 && (o -= 36);
      }
      return a(208 <= o && o <= 29648), o;
    }
    static getNumDataCodewords(n, o) {
      return Math.floor(w.getNumRawDataModules(n) / 8) - w.ECC_CODEWORDS_PER_BLOCK[o.ordinal][n] * w.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][n];
    }
    static reedSolomonComputeDivisor(n) {
      if (n < 1 || n > 255) throw new RangeError("Degree out of range");
      let o = [];
      for (let l = 0; l < n - 1; l++) o.push(0);
      o.push(1);
      let r = 1;
      for (let l = 0; l < n; l++) {
        for (let u = 0; u < o.length; u++) o[u] = w.reedSolomonMultiply(o[u], r), u + 1 < o.length && (o[u] ^= o[u + 1]);
        r = w.reedSolomonMultiply(r, 2);
      }
      return o;
    }
    static reedSolomonComputeRemainder(n, o) {
      let r = o.map((l) => 0);
      for (const l of n) {
        const u = l ^ r.shift();
        r.push(0), o.forEach((b, d) => r[d] ^= w.reedSolomonMultiply(b, u));
      }
      return r;
    }
    static reedSolomonMultiply(n, o) {
      if (n >>> 8 || o >>> 8) throw new RangeError("Byte out of range");
      let r = 0;
      for (let l = 7; l >= 0; l--) r = r << 1 ^ (r >>> 7) * 285, r ^= (o >>> l & 1) * n;
      return a(r >>> 8 == 0), r;
    }
    finderPenaltyCountPatterns(n) {
      const o = n[1];
      a(o <= this.size * 3);
      const r = o > 0 && n[2] == o && n[3] == o * 3 && n[4] == o && n[5] == o;
      return (r && n[0] >= o * 4 && n[6] >= o ? 1 : 0) + (r && n[6] >= o * 4 && n[0] >= o ? 1 : 0);
    }
    finderPenaltyTerminateAndCount(n, o, r) {
      return n && (this.finderPenaltyAddHistory(o, r), o = 0), o += this.size, this.finderPenaltyAddHistory(o, r), this.finderPenaltyCountPatterns(r);
    }
    finderPenaltyAddHistory(n, o) {
      o[0] == 0 && (n += this.size), o.pop(), o.unshift(n);
    }
  };
  t.MIN_VERSION = 1, t.MAX_VERSION = 40, t.PENALTY_N1 = 3, t.PENALTY_N2 = 3, t.PENALTY_N3 = 40, t.PENALTY_N4 = 10, t.ECC_CODEWORDS_PER_BLOCK = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]], t.NUM_ERROR_CORRECTION_BLOCKS = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]], s.QrCode = t;
  function e(f, n, o) {
    if (n < 0 || n > 31 || f >>> n) throw new RangeError("Value out of range");
    for (let r = n - 1; r >= 0; r--) o.push(f >>> r & 1);
  }
  function i(f, n) {
    return (f >>> n & 1) != 0;
  }
  function a(f) {
    if (!f) throw new Error("Assertion error");
  }
  const c = class E {
    constructor(n, o, r) {
      if (this.mode = n, this.numChars = o, this.bitData = r, o < 0) throw new RangeError("Invalid argument");
      this.bitData = r.slice();
    }
    static makeBytes(n) {
      let o = [];
      for (const r of n) e(r, 8, o);
      return new E(E.Mode.BYTE, n.length, o);
    }
    static makeNumeric(n) {
      if (!E.isNumeric(n)) throw new RangeError("String contains non-numeric characters");
      let o = [];
      for (let r = 0; r < n.length; ) {
        const l = Math.min(n.length - r, 3);
        e(parseInt(n.substring(r, r + l), 10), l * 3 + 1, o), r += l;
      }
      return new E(E.Mode.NUMERIC, n.length, o);
    }
    static makeAlphanumeric(n) {
      if (!E.isAlphanumeric(n)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
      let o = [], r;
      for (r = 0; r + 2 <= n.length; r += 2) {
        let l = E.ALPHANUMERIC_CHARSET.indexOf(n.charAt(r)) * 45;
        l += E.ALPHANUMERIC_CHARSET.indexOf(n.charAt(r + 1)), e(l, 11, o);
      }
      return r < n.length && e(E.ALPHANUMERIC_CHARSET.indexOf(n.charAt(r)), 6, o), new E(E.Mode.ALPHANUMERIC, n.length, o);
    }
    static makeSegments(n) {
      return n == "" ? [] : E.isNumeric(n) ? [E.makeNumeric(n)] : E.isAlphanumeric(n) ? [E.makeAlphanumeric(n)] : [E.makeBytes(E.toUtf8ByteArray(n))];
    }
    static makeEci(n) {
      let o = [];
      if (n < 0) throw new RangeError("ECI assignment value out of range");
      if (n < 128) e(n, 8, o);
      else if (n < 16384) e(2, 2, o), e(n, 14, o);
      else if (n < 1e6) e(6, 3, o), e(n, 21, o);
      else throw new RangeError("ECI assignment value out of range");
      return new E(E.Mode.ECI, 0, o);
    }
    static isNumeric(n) {
      return E.NUMERIC_REGEX.test(n);
    }
    static isAlphanumeric(n) {
      return E.ALPHANUMERIC_REGEX.test(n);
    }
    getData() {
      return this.bitData.slice();
    }
    static getTotalBits(n, o) {
      let r = 0;
      for (const l of n) {
        const u = l.mode.numCharCountBits(o);
        if (l.numChars >= 1 << u) return 1 / 0;
        r += 4 + u + l.bitData.length;
      }
      return r;
    }
    static toUtf8ByteArray(n) {
      n = encodeURI(n);
      let o = [];
      for (let r = 0; r < n.length; r++) n.charAt(r) != "%" ? o.push(n.charCodeAt(r)) : (o.push(parseInt(n.substring(r + 1, r + 3), 16)), r += 2);
      return o;
    }
  };
  c.NUMERIC_REGEX = /^[0-9]*$/, c.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/, c.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
  let h = c;
  s.QrSegment = c;
})(W || (W = {}));
((s) => {
  ((t) => {
    const e = class {
      constructor(a, c) {
        this.ordinal = a, this.formatBits = c;
      }
    };
    e.LOW = new e(0, 1), e.MEDIUM = new e(1, 0), e.QUARTILE = new e(2, 3), e.HIGH = new e(3, 2), t.Ecc = e;
  })(s.QrCode || (s.QrCode = {}));
})(W || (W = {}));
((s) => {
  ((t) => {
    const e = class {
      constructor(a, c) {
        this.modeBits = a, this.numBitsCharCount = c;
      }
      numCharCountBits(a) {
        return this.numBitsCharCount[Math.floor((a + 7) / 17)];
      }
    };
    e.NUMERIC = new e(1, [10, 12, 14]), e.ALPHANUMERIC = new e(2, [9, 11, 13]), e.BYTE = new e(4, [8, 16, 16]), e.KANJI = new e(8, [8, 10, 12]), e.ECI = new e(7, [0, 0, 0]), t.Mode = e;
  })(s.QrSegment || (s.QrSegment = {}));
})(W || (W = {}));
var q = W;
/**
* @license qrcode.react
* Copyright (c) Paul O'Shannessy
* SPDX-License-Identifier: ISC
*/
var hs = { L: q.QrCode.Ecc.LOW, M: q.QrCode.Ecc.MEDIUM, Q: q.QrCode.Ecc.QUARTILE, H: q.QrCode.Ecc.HIGH }, Zt = 128, Jt = "L", qt = "#FFFFFF", te = "#000000", ee = false, se = 1, fs = 4, us = 0, ds = 0.1;
function ne(s, t = 0) {
  const e = [];
  return s.forEach(function(i, a) {
    let c = null;
    i.forEach(function(h, f) {
      if (!h && c !== null) {
        e.push(`M${c + t} ${a + t}h${f - c}v1H${c + t}z`), c = null;
        return;
      }
      if (f === i.length - 1) {
        if (!h) return;
        c === null ? e.push(`M${f + t},${a + t} h1v1H${f + t}z`) : e.push(`M${c + t},${a + t} h${f + 1 - c}v1H${c + t}z`);
        return;
      }
      h && c === null && (c = f);
    });
  }), e.join("");
}
function ie(s, t) {
  return s.slice().map((e, i) => i < t.y || i >= t.y + t.h ? e : e.map((a, c) => c < t.x || c >= t.x + t.w ? a : false));
}
function bs(s, t, e, i) {
  if (i == null) return null;
  const a = s.length + e * 2, c = Math.floor(t * ds), h = a / t, f = (i.width || c) * h, n = (i.height || c) * h, o = i.x == null ? s.length / 2 - f / 2 : i.x * h, r = i.y == null ? s.length / 2 - n / 2 : i.y * h, l = i.opacity == null ? 1 : i.opacity;
  let u = null;
  if (i.excavate) {
    let d = Math.floor(o), p = Math.floor(r), x = Math.ceil(f + o - d), S = Math.ceil(n + r - p);
    u = { x: d, y: p, w: x, h: S };
  }
  const b = i.crossOrigin;
  return { x: o, y: r, h: n, w: f, excavation: u, opacity: l, crossOrigin: b };
}
function gs(s, t) {
  return t != null ? Math.max(Math.floor(t), 0) : s ? fs : us;
}
function re({ value: s, level: t, minVersion: e, includeMargin: i, marginSize: a, imageSettings: c, size: h, boostLevel: f }) {
  let n = C.useMemo(() => {
    const d = (Array.isArray(s) ? s : [s]).reduce((p, x) => (p.push(...q.QrSegment.makeSegments(x)), p), []);
    return q.QrCode.encodeSegments(d, hs[t], e, void 0, void 0, f);
  }, [s, t, e, f]);
  const { cells: o, margin: r, numCells: l, calculatedImageSettings: u } = C.useMemo(() => {
    let b = n.getModules();
    const d = gs(i, a), p = b.length + d * 2, x = bs(b, h, d, c);
    return { cells: b, margin: d, numCells: p, calculatedImageSettings: x };
  }, [n, h, c, i, a]);
  return { qrcode: n, margin: r, cells: o, numCells: l, calculatedImageSettings: u };
}
var xs = function() {
  try {
    new Path2D().addPath(new Path2D());
  } catch {
    return false;
  }
  return true;
}(), ps = C.forwardRef(function(t, e) {
  const i = t, { value: a, size: c = Zt, level: h = Jt, bgColor: f = qt, fgColor: n = te, includeMargin: o = ee, minVersion: r = se, boostLevel: l, marginSize: u, imageSettings: b } = i, p = wt(i, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "boostLevel", "marginSize", "imageSettings"]), { style: x } = p, S = wt(p, ["style"]), m = b?.src, g = C.useRef(null), A = C.useRef(null), y = C.useCallback((O) => {
    g.current = O, typeof e == "function" ? e(O) : e && (e.current = O);
  }, [e]), [_, X] = C.useState(false), { margin: R, cells: v, numCells: k, calculatedImageSettings: B } = re({ value: a, level: h, minVersion: r, boostLevel: l, includeMargin: o, marginSize: u, imageSettings: b, size: c });
  C.useEffect(() => {
    if (g.current != null) {
      const O = g.current, D = O.getContext("2d");
      if (!D) return;
      let yt = v;
      const it = A.current, Ct = B != null && it !== null && it.complete && it.naturalHeight !== 0 && it.naturalWidth !== 0;
      Ct && B.excavation != null && (yt = ie(v, B.excavation));
      const St = window.devicePixelRatio || 1;
      O.height = O.width = c * St;
      const It = c / k * St;
      D.scale(It, It), D.fillStyle = f, D.fillRect(0, 0, k, k), D.fillStyle = n, xs ? D.fill(new Path2D(ne(yt, R))) : v.forEach(function(oe, ae) {
        oe.forEach(function(ce, le) {
          ce && D.fillRect(le + R, ae + R, 1, 1);
        });
      }), B && (D.globalAlpha = B.opacity), Ct && D.drawImage(it, B.x + R, B.y + R, B.w, B.h);
    }
  }), C.useEffect(() => {
    X(false);
  }, [m]);
  const Y = pt({ height: c, width: c }, x);
  let K = null;
  return m != null && (K = C.createElement("img", { src: m, key: m, style: { display: "none" }, onLoad: () => {
    X(true);
  }, ref: A, crossOrigin: B?.crossOrigin })), C.createElement(C.Fragment, null, C.createElement("canvas", pt({ style: Y, height: c, width: c, ref: y, role: "img" }, S)), K);
});
ps.displayName = "QRCodeCanvas";
var ws = C.forwardRef(function(t, e) {
  const i = t, { value: a, size: c = Zt, level: h = Jt, bgColor: f = qt, fgColor: n = te, includeMargin: o = ee, minVersion: r = se, boostLevel: l, title: u, marginSize: b, imageSettings: d } = i, p = wt(i, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "boostLevel", "title", "marginSize", "imageSettings"]), { margin: x, cells: S, numCells: m, calculatedImageSettings: g } = re({ value: a, level: h, minVersion: r, boostLevel: l, includeMargin: o, marginSize: b, imageSettings: d, size: c });
  let A = S, y = null;
  d != null && g != null && (g.excavation != null && (A = ie(S, g.excavation)), y = C.createElement("image", { href: d.src, height: g.h, width: g.w, x: g.x + x, y: g.y + x, preserveAspectRatio: "none", opacity: g.opacity, crossOrigin: g.crossOrigin }));
  const _ = ne(A, x);
  return C.createElement("svg", pt({ height: c, width: c, viewBox: `0 0 ${m} ${m}`, ref: e, role: "img" }, p), !!u && C.createElement("title", null, u), C.createElement("path", { fill: f, d: `M0,0 h${m}v${m}H0z`, shapeRendering: "crispEdges" }), C.createElement("path", { fill: n, d: _, shapeRendering: "crispEdges" }), y);
});
ws.displayName = "QRCodeSVG";
export {
  ws as Q,
  P as S,
  L as T
};
