import { r as i, b as L, N as G, d as U, e as y, f as P, R as W, B as V } from "./vendor-react-DXNINo3y.js";
import { z as Z } from "./vendor-zxcvbn-BrASd5Wg.js";
import { C as M, b as E, a as K } from "./vendor-crypto-zdsjgJ5a.js";
import { S as Q, T as Y, Q as q } from "./vendor-otp-u6Hc7MJ2.js";
(function() {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) l(s);
  new MutationObserver((s) => {
    for (const n of s) if (n.type === "childList") for (const o of n.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && l(o);
  }).observe(document, { childList: true, subtree: true });
  function r(s) {
    const n = {};
    return s.integrity && (n.integrity = s.integrity), s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? n.credentials = "include" : s.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
  }
  function l(s) {
    if (s.ep) return;
    s.ep = true;
    const n = r(s);
    fetch(s.href, n);
  }
})();
var D = { exports: {} }, k = {};
/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var J = i, X = Symbol.for("react.element"), ee = Symbol.for("react.fragment"), te = Object.prototype.hasOwnProperty, se = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ae = { key: true, ref: true, __self: true, __source: true };
function H(t, a, r) {
  var l, s = {}, n = null, o = null;
  r !== void 0 && (n = "" + r), a.key !== void 0 && (n = "" + a.key), a.ref !== void 0 && (o = a.ref);
  for (l in a) te.call(a, l) && !ae.hasOwnProperty(l) && (s[l] = a[l]);
  if (t && t.defaultProps) for (l in a = t.defaultProps, a) s[l] === void 0 && (s[l] = a[l]);
  return { $$typeof: X, type: t, key: n, ref: o, props: s, _owner: se.current };
}
k.Fragment = ee;
k.jsx = H;
k.jsxs = H;
D.exports = k;
var e = D.exports, T = {}, O = L;
T.createRoot = O.createRoot, T.hydrateRoot = O.hydrateRoot;
const ne = [{ to: "/password-strength", label: "Password Strength", icon: "O" }, { to: "/brute-force", label: "Brute-Force", icon: "O" }, { to: "/hashing", label: "Hashing", icon: "O" }, { to: "/mfa", label: "MFA / TOTP", icon: "O" }];
function re() {
  return e.jsx("header", { className: "sticky top-0 z-50 bg-surface border-b border-border backdrop-blur-sm bg-opacity-90", children: e.jsxs("div", { className: "max-w-5xl mx-auto px-4 h-16 flex items-center gap-8", children: [e.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [e.jsx("span", { className: "font-mono text-xs text-muted select-none", children: ">_" }), e.jsxs("div", { className: "flex flex-col", children: [e.jsx("span", { className: "font-ui font-bold text-base text-accent tracking-tight leading-none", children: "PSAS" }), e.jsx("span", { className: "font-mono text-xs text-muted leading-none mt-0.5", children: "Password Security & Authentication Simulator" })] })] }), e.jsx("div", { className: "hidden sm:block h-5 w-px bg-border" }), e.jsx("nav", { className: "flex items-center gap-1 overflow-x-auto scrollbar-hide", children: ne.map(({ to: t, label: a, icon: r }) => e.jsxs(G, { to: t, className: ({ isActive: l }) => ["flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-ui whitespace-nowrap transition-all duration-150", l ? "bg-accent text-bg font-semibold" : "text-muted hover:text-[var(--text)] hover:bg-dim"].join(" "), children: [e.jsx("span", { className: "text-base leading-none", children: r }), e.jsx("span", { className: "hidden sm:inline", children: a })] }, t)) })] }) });
}
function le() {
  return e.jsx("footer", { className: "border-t border-border bg-surface bg-opacity-60", children: e.jsxs("div", { className: "max-w-5xl mx-auto px-4 h-10 flex items-center justify-between", children: [e.jsx("span", { className: "font-mono text-xs text-muted", children: "version 1.0 - Group 7" }), e.jsx("span", { className: "font-mono text-xs text-muted", children: "Client-side simulations - For educational purposes only" })] }) });
}
const oe = [{ id: "length", label: "At least 12 characters", test: (t) => t.length >= 12 }, { id: "uppercase", label: "Uppercase letter (A\u2013Z)", test: (t) => /[A-Z]/.test(t) }, { id: "lowercase", label: "Lowercase letter (a\u2013z)", test: (t) => /[a-z]/.test(t) }, { id: "digit", label: "Number (0\u20139)", test: (t) => /\d/.test(t) }, { id: "special", label: "Special character (!@#$\u2026)", test: (t) => /[^A-Za-z0-9]/.test(t) }], ie = [{ label: "Very Weak", color: "#ff3a3a", barWidth: "8%" }, { label: "Weak", color: "#ff8c00", barWidth: "28%" }, { label: "Fair", color: "#ffd700", barWidth: "52%" }, { label: "Strong", color: "#4caf50", barWidth: "76%" }, { label: "Very Strong", color: "#00e67b", barWidth: "100%" }];
function ce(t) {
  if (!t) return null;
  const a = Z(t), r = oe.map((u) => ({ ...u, passed: u.test(t) })), l = r.filter((u) => u.passed).length, s = a.score, n = l < 3 ? Math.min(s, 1) : s, o = ie[n];
  let m = 0;
  /[a-z]/.test(t) && (m += 26), /[A-Z]/.test(t) && (m += 26), /\d/.test(t) && (m += 10), /[^A-Za-z0-9]/.test(t) && (m += 32);
  const h = m > 0 ? Math.round(t.length * Math.log2(m)) : 0;
  return { score: n, tier: o, criteria: r, entropy: h, crackTimes: a.crack_times_display, suggestions: [...a.feedback.warning ? [a.feedback.warning] : [], ...a.feedback.suggestions ?? []] };
}
function de({ passed: t, label: a }) {
  return e.jsxs("li", { className: "flex items-center gap-2 text-sm font-mono", children: [e.jsx("span", { className: "w-4 h-4 rounded-full flex items-center justify-center text-xs shrink-0", style: { background: t ? "#00e67b" : "#d6d6d6", color: t ? "#07090f" : "#4a6080" }, children: t ? "\u2713" : "\u25CB" }), e.jsx("span", { style: { color: t ? "var(--text)" : "var(--text-dim)" }, children: a })] });
}
function me() {
  const [t, a] = i.useState(""), [r, l] = i.useState(false), s = i.useMemo(() => ce(t), [t]);
  return e.jsxs("div", { className: "animate-fade-up space-y-6", children: [e.jsxs("div", { children: [e.jsx("h1", { className: "font-ui font-bold text-2xl text-[var(--text)] mb-1", children: "Password Strength Analyzer" }), e.jsx("p", { className: "font-mono text-sm text-muted", children: "Evaluates entropy, character diversity, and common-pattern weaknesses via zxcvbn." })] }), e.jsxs("div", { className: "panel", children: [e.jsx("label", { className: "field-label", children: "Enter a password to analyze" }), e.jsxs("div", { className: "relative", children: [e.jsx("input", { type: r ? "text" : "password", className: "psas-input pr-12", placeholder: "Enter a password\u2026", value: t, onChange: (n) => a(n.target.value), autoComplete: "off", spellCheck: false }), e.jsx("button", { onClick: () => l((n) => !n), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors text-xs font-mono", "aria-label": r ? "Hide password" : "Show password", children: r ? "HIDE" : "SHOW" })] }), e.jsxs("div", { className: "mt-5", children: [e.jsxs("div", { className: "flex items-center justify-between mb-2", children: [e.jsx("span", { className: "field-label mb-0", children: "Strength" }), s && e.jsx("span", { className: "font-ui font-semibold text-sm transition-all duration-300", style: { color: s.tier.color }, children: s.tier.label })] }), e.jsx("div", { className: "h-2 bg-dim rounded-full overflow-hidden", children: e.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: { width: s ? s.tier.barWidth : "0%", background: s ? s.tier.color : "transparent" } }) })] })] }), s && e.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [e.jsxs("div", { className: "panel space-y-3", children: [e.jsx("h2", { className: "section-title", children: "Criteria" }), e.jsx("ul", { className: "space-y-2", children: s.criteria.map((n) => e.jsx(de, { passed: n.passed, label: n.label }, n.id)) })] }), e.jsxs("div", { className: "panel space-y-4", children: [e.jsx("h2", { className: "section-title", children: "Analysis" }), e.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [e.jsxs("div", { className: "bg-dim rounded-lg p-3", children: [e.jsx("div", { className: "field-label mb-1", children: "Entropy" }), e.jsxs("div", { className: "font-mono font-semibold text-lg", style: { color: "var(--accent)" }, children: [s.entropy, " ", e.jsx("span", { className: "text-xs font-normal text-muted", children: "bits" })] })] }), e.jsxs("div", { className: "bg-dim rounded-lg p-3", children: [e.jsx("div", { className: "field-label mb-1", children: "Length" }), e.jsxs("div", { className: "font-mono font-semibold text-lg", style: { color: "var(--cyan)" }, children: [t.length, " ", e.jsx("span", { className: "text-xs font-normal text-muted", children: "chars" })] })] })] }), e.jsxs("div", { children: [e.jsx("div", { className: "field-label", children: "Time to crack (offline, fast hash)" }), e.jsx("div", { className: "font-mono text-sm text-[var(--text)]", children: s.crackTimes?.offline_fast_hashing_1e10_per_second ?? "\u2014" })] }), e.jsxs("div", { children: [e.jsx("div", { className: "field-label", children: "Time to crack (online, throttled)" }), e.jsx("div", { className: "font-mono text-sm text-[var(--text)]", children: s.crackTimes?.online_throttling_100_per_hour ?? "\u2014" })] })] }), s.suggestions.length > 0 && e.jsxs("div", { className: "panel md:col-span-2", children: [e.jsx("h2", { className: "section-title mb-3", children: "Suggestions" }), e.jsx("ul", { className: "space-y-1.5", children: s.suggestions.map((n, o) => e.jsxs("li", { className: "font-mono text-sm text-muted flex gap-2", children: [e.jsx("span", { style: { color: "var(--cyan)" }, children: "\u203A" }), " ", n] }, o)) })] })] }), !t && e.jsx("div", { className: "text-center py-12 font-mono text-sm text-muted", children: "Start typing to see your analysis\u2026" })] });
}
const F = [{ id: "online_throttled", label: "Online (throttled)", gps: 100, description: "100 attempts/sec \u2014 rate-limited login form" }, { id: "online_fast", label: "Online (fast)", gps: 1e4, description: "10K attempts/sec \u2014 unthrottled web login" }, { id: "offline_slow", label: "Offline (slow hash)", gps: 1e7, description: "10M/sec \u2014 bcrypt on a GPU" }, { id: "offline_fast", label: "Offline (fast hash)", gps: 1e11, description: "100B/sec \u2014 MD5/SHA-1 on a GPU cluster" }], C = 60, A = 3600, R = 86400, g = 31536e3;
function ue(t) {
  return t < 1 ? "less than a second" : t < C ? `${Math.round(t)} second${Math.round(t) !== 1 ? "s" : ""}` : t < A ? `${Math.round(t / C)} minute${Math.round(t / C) !== 1 ? "s" : ""}` : t < R ? `${Math.round(t / A)} hour${Math.round(t / A) !== 1 ? "s" : ""}` : t < g ? `${Math.round(t / R)} day${Math.round(t / R) !== 1 ? "s" : ""}` : t < g * 1e3 ? `${Math.round(t / g).toLocaleString()} year${Math.round(t / g) !== 1 ? "s" : ""}` : t < g * 1e6 ? `${(t / g / 1e3).toFixed(1)} thousand years` : t < g * 1e9 ? `${(t / g / 1e6).toFixed(1)} million years` : "centuries";
}
function xe(t) {
  if (!t) return null;
  let a = 0;
  /[a-z]/.test(t) && (a += 26), /[A-Z]/.test(t) && (a += 26), /\d/.test(t) && (a += 10), /[^A-Za-z0-9]/.test(t) && (a += 32), a === 0 && (a = 26);
  const r = BigInt(a) ** BigInt(t.length), l = r > BigInt(Number.MAX_SAFE_INTEGER) ? 1 / 0 : Number(r);
  return { presets: F.map((n) => {
    let o;
    return l === 1 / 0 ? o = 1 / 0 : o = l / n.gps, { ...n, seconds: o, display: o === 1 / 0 ? "centuries" : ue(o) };
  }), keyspace: r };
}
function he({ preset: t, result: a, active: r, onClick: l }) {
  const s = a?.seconds < 1, n = a?.seconds === 1 / 0;
  return e.jsxs("button", { onClick: l, className: ["panel text-left transition-all duration-200 cursor-pointer w-full", r ? "border-accent" : "hover:border-cyan"].join(" "), children: [e.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [e.jsx("span", { className: "font-ui font-semibold text-sm text-[var(--text)]", children: t.label }), r && e.jsx("span", { className: "badge", style: { borderColor: "var(--accent)", color: "var(--accent)" }, children: "selected" })] }), e.jsx("div", { className: "font-mono text-xs text-muted mb-3", children: t.description }), a && e.jsx("div", { className: "font-mono font-semibold text-base", style: { color: s ? "#ff3a3a" : n ? "#00d06f" : "var(--cyan)" }, children: a.display })] });
}
function fe() {
  const [t, a] = i.useState(""), [r, l] = i.useState("offline_fast"), [s, n] = i.useState(false), [o, m] = i.useState("0"), [h, u] = i.useState(0), [f, c] = i.useState(false), [v, _] = i.useState(false), p = i.useRef(null), b = t ? xe(t) : null, x = F.find((d) => d.id === r);
  i.useEffect(() => (p.current = new Worker(new URL("/assets/bruteForce.worker-CvvmEkUr.js", import.meta.url), { type: "module" }), p.current.onmessage = ({ data: d }) => {
    m(d.guesses), u(d.elapsed), d.type === "DONE" && (n(false), c(true));
  }, () => p.current?.terminate()), []);
  function j() {
    if (!b) return;
    const d = b.presets.find((B) => B.id === r), $ = b.keyspace, z = d.seconds > 30 ? BigInt(Math.floor(30 * x.gps)) : $;
    c(false), m("0"), u(0), n(true), p.current.postMessage({ type: "START", keyspace: z.toString(), gps: x.gps });
  }
  function w() {
    n(false), p.current.postMessage({ type: "STOP" });
  }
  return e.jsxs("div", { className: "animate-fade-up space-y-6", children: [e.jsxs("div", { children: [e.jsx("h1", { className: "font-ui font-bold text-2xl text-[var(--text)] mb-1", children: "Brute-Force Attack Simulator" }), e.jsx("p", { className: "font-mono text-sm text-muted", children: "Mathematical crack-time estimation across real-world attack speeds, with an animated guess counter." })] }), e.jsxs("div", { className: "relative", children: [e.jsx("input", { type: v ? "text" : "password", className: "psas-input pr-12", placeholder: "Enter a password\u2026", value: t, onChange: (d) => {
    a(d.target.value), w(), c(false);
  }, autoComplete: "off", spellCheck: false }), e.jsx("button", { onClick: () => _((d) => !d), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors text-xs font-mono", "aria-label": v ? "Hide password" : "Show password", children: v ? "HIDE" : "SHOW" })] }), b && e.jsxs(e.Fragment, { children: [e.jsxs("div", { children: [e.jsx("div", { className: "field-label mb-3", children: "Select attack scenario" }), e.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: b.presets.map((d) => e.jsx(he, { preset: d, result: d, active: r === d.id, onClick: () => {
    l(d.id), w(), c(false);
  } }, d.id)) })] }), e.jsxs("div", { className: "panel text-center space-y-4", children: [e.jsx("div", { className: "field-label", children: "Animated Guess Counter" }), e.jsx("div", { className: "font-mono font-bold text-4xl tracking-tight transition-all duration-100", style: { color: f ? "var(--accent)" : "var(--cyan)" }, children: o }), e.jsxs("div", { className: "font-mono text-sm text-muted", children: ["guesses in ", h, "s", f && e.jsx("span", { style: { color: "var(--accent)" }, children: " \u2014 cracked!" })] }), e.jsx("div", { className: "flex items-center justify-center gap-3 pt-2", children: s ? e.jsx("button", { className: "btn-ghost", onClick: w, children: "\u25A0 Stop" }) : e.jsx("button", { className: "btn-primary", onClick: j, children: "\u25B6 Run Simulation" }) })] })] }), !t && e.jsx("div", { className: "text-center py-12 font-mono text-sm text-muted", children: "Enter a password to compute crack times\u2026" })] });
}
const N = [{ id: "md5", label: "MD5", strength: "weak", rating: 1, notes: "Cryptographically broken. Collisions are trivial to generate. Never use for passwords." }, { id: "sha1", label: "SHA-1", strength: "weak", rating: 2, notes: "Deprecated. Collision attacks demonstrated (SHAttered, 2017). Not suitable for passwords." }, { id: "bcrypt", label: "bcrypt", strength: "strong", rating: 4, notes: "Adaptive cost factor slows GPU attacks. Industry standard for password storage." }, { id: "argon2", label: "Argon2id", strength: "strong", rating: 5, notes: "Winner of the Password Hashing Competition (2015). Memory-hard \u2014 resists GPU and ASIC attacks." }];
async function pe(t) {
  const a = [];
  {
    const r = performance.now(), l = M.MD5(t).toString(), s = performance.now();
    a.push({ ...N[0], hash: l, saltDisplay: "none (unsalted)", durationMs: +(s - r).toFixed(3) });
  }
  {
    const r = performance.now(), l = M.SHA1(t).toString(), s = performance.now();
    a.push({ ...N[1], hash: l, saltDisplay: "none (unsalted)", durationMs: +(s - r).toFixed(3) });
  }
  {
    const l = performance.now(), s = await E.genSalt(10), n = await E.hash(t, s), o = performance.now();
    a.push({ ...N[2], hash: n, saltDisplay: s, durationMs: +(o - l).toFixed(0) });
  }
  try {
    const r = crypto.getRandomValues(new Uint8Array(16)), l = performance.now(), s = await K({ password: t, salt: r, parallelism: 1, iterations: 3, memorySize: 65536, hashLength: 32, outputType: "encoded" }), n = performance.now(), o = Array.from(r).map((m) => m.toString(16).padStart(2, "0")).join("");
    a.push({ ...N[3], hash: s, saltDisplay: o, durationMs: +(n - l).toFixed(0) });
  } catch (r) {
    a.push({ ...N[3], hash: `Argon2 error: ${r.message}`, saltDisplay: "n/a", durationMs: 0 });
  }
  return a;
}
const ge = { weak: "#ff8c00", strong: "#00ff88" }, be = (t) => "\u2605".repeat(t) + "\u2606".repeat(5 - t);
function I({ result: t, loading: a }) {
  if (a) return e.jsxs("div", { className: "panel space-y-3 animate-pulse-slow", children: [e.jsx("div", { className: "h-4 bg-dim rounded w-1/3" }), e.jsx("div", { className: "h-3 bg-dim rounded w-full" }), e.jsx("div", { className: "h-3 bg-dim rounded w-3/4" })] });
  if (!t) return null;
  const r = ge[t.strength] ?? "#4a6080";
  return e.jsxs("div", { className: "panel space-y-3 transition-all duration-300", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "font-ui font-bold text-base text-[var(--text)]", children: t.label }), e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx("span", { className: "badge font-semibold text-xs", style: { borderColor: r, color: r }, children: t.strength }), e.jsx("span", { className: "font-mono text-xs", style: { color: r }, children: be(t.rating) })] })] }), e.jsxs("div", { children: [e.jsx("div", { className: "field-label", children: "Hash output" }), e.jsx("div", { className: "font-mono text-xs break-all bg-bg border border-border rounded p-3 text-[var(--text-dim)] select-all", style: { wordBreak: "break-all" }, children: t.hash })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [e.jsxs("div", { children: [e.jsx("div", { className: "field-label", children: "Salt" }), e.jsx("div", { className: "font-mono text-xs text-muted truncate", children: t.saltDisplay })] }), e.jsxs("div", { children: [e.jsx("div", { className: "field-label", children: "Compute time" }), e.jsx("div", { className: "font-mono text-sm font-semibold", style: { color: t.durationMs > 100 ? "var(--accent)" : "var(--cyan)" }, children: t.durationMs < 1 ? "<1 ms" : `${t.durationMs} ms` })] })] }), e.jsx("p", { className: "font-mono text-xs text-muted border-t border-border pt-3", children: t.notes })] });
}
function je() {
  const [t, a] = i.useState(""), [r, l] = i.useState([]), [s, n] = i.useState(false), [o, m] = i.useState(false), [h, u] = i.useState(false);
  async function f() {
    if (t) {
      n(true), m(false);
      try {
        const c = await pe(t);
        l(c), m(true);
      } finally {
        n(false);
      }
    }
  }
  return e.jsxs("div", { className: "animate-fade-up space-y-6", children: [e.jsxs("div", { children: [e.jsx("h1", { className: "font-ui font-bold text-2xl text-[var(--text)] mb-1", children: "Hashing Algorithm Comparison" }), e.jsx("p", { className: "font-mono text-sm text-muted", children: "Side-by-side comparison of MD5, SHA-1, bcrypt, and Argon2id; compute times, salting, and security ratings." })] }), e.jsxs("div", { className: "panel flex flex-col sm:flex-row gap-3", children: [e.jsxs("div", { className: "flex-1", children: [e.jsx("label", { className: "field-label", children: "Password to hash" }), e.jsxs("div", { className: "relative", children: [e.jsx("input", { type: h ? "text" : "password", className: "psas-input pr-12", placeholder: "Enter a password\u2026", value: t, onChange: (c) => a(c.target.value), onKeyDown: (c) => c.key === "Enter" && f(), autoComplete: "off", spellCheck: false }), e.jsx("button", { onClick: () => u((c) => !c), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors text-xs font-mono", "aria-label": h ? "Hide password" : "Show password", children: h ? "HIDE" : "SHOW" })] })] }), e.jsx("div", { className: "flex items-end", children: e.jsx("button", { className: "btn-primary w-full sm:w-auto", onClick: f, disabled: !t || s, children: s ? "Hashing\u2026" : "Generate Hashes" }) })] }), !o && e.jsx("div", { className: "panel border-cyan", style: { borderColor: "rgba(0,212,255,0.3)" }, children: e.jsxs("p", { className: "font-mono text-xs text-muted", children: [e.jsx("span", { style: { color: "var(--cyan)" }, children: "\u2139" }), "  ", "bcrypt (cost 10) and Argon2id may take 0.5\u20132 s on your hardware \u2014 this intentional slowness is what makes them secure."] }) }), e.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: s ? N.map((c) => e.jsx(I, { loading: true }, c.id)) : o ? r.map((c) => e.jsx(I, { result: c }, c.id)) : null })] });
}
const S = 30;
function ve({ secondsLeft: t }) {
  const a = t / S * 100, r = t <= 5 ? "#ff3a3a" : t <= 10 ? "#e8c500" : "#00d06f";
  return e.jsxs("div", { className: "space-y-1", children: [e.jsx("div", { className: "h-1.5 bg-dim rounded-full overflow-hidden", children: e.jsx("div", { className: "h-full rounded-full transition-all duration-1000 ease-linear", style: { width: `${a}%`, background: r } }) }), e.jsxs("div", { className: "flex justify-between font-mono text-xs text-muted", children: [e.jsx("span", { children: "Token expires in" }), e.jsxs("span", { style: { color: r }, children: [t, "s"] })] })] });
}
function ye() {
  const [t, a] = i.useState(null), [r, l] = i.useState(""), [s, n] = i.useState(S), [o, m] = i.useState(""), [h, u] = i.useState(null), f = i.useRef(null), c = i.useCallback(() => {
    const x = new Q({ size: 20 }), j = new Y({ issuer: "PSAS Demo", label: "psas@simulator", algorithm: "SHA1", digits: 6, period: S, secret: x });
    a(j), u(null), m("");
  }, []);
  i.useEffect(() => {
    c();
  }, [c]), i.useEffect(() => {
    if (!t) return;
    function x() {
      const j = Math.floor(Date.now() / 1e3), w = S - j % S, d = t.generate();
      l(d), n(w);
    }
    return x(), f.current = setInterval(x, 1e3), () => clearInterval(f.current);
  }, [t]);
  function v() {
    if (!t || o.length !== 6) return;
    const x = t.validate({ token: o, window: 1 });
    u(x !== null ? "success" : "fail");
  }
  function _(x) {
    const j = x.target.value.replace(/\D/g, "").slice(0, 6);
    m(j), u(null);
  }
  const p = t?.toString() ?? "", b = t?.secret?.base32 ?? "";
  return e.jsxs("div", { className: "animate-fade-up space-y-6", children: [e.jsxs("div", { children: [e.jsx("h1", { className: "font-ui font-bold text-2xl text-[var(--text)] mb-1", children: "MFA / TOTP Simulator" }), e.jsx("p", { className: "font-mono text-sm text-muted", children: "Simulated Time-Based One-Time Password (TOTP) flow; test token generation, QR enrollment, and verification." })] }), e.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [e.jsxs("div", { className: "panel space-y-4", children: [e.jsx("h2", { className: "section-title", children: "Step 1 \u2014 Scan QR Code" }), e.jsx("p", { className: "font-mono text-xs text-muted", children: "Scan with an authenticator app such as Google Authenticator to sync token." }), p && e.jsx("div", { className: "flex justify-center p-4 bg-white rounded-xl", children: e.jsx(q, { value: p, size: 160 }) }), e.jsxs("div", { children: [e.jsx("div", { className: "field-label", children: "Manual entry secret (Base32)" }), e.jsx("div", { className: "font-mono text-xs break-all bg-bg border border-border rounded p-3 select-all", children: b })] }), e.jsx("button", { className: "btn-ghost w-full text-sm", onClick: c, children: "\u21BA Generate new secret" })] }), e.jsxs("div", { className: "panel space-y-5", children: [e.jsx("h2", { className: "section-title", children: "Step 2 \u2014 Current Token" }), e.jsx("p", { className: "font-mono text-xs text-muted", children: "This is the 6-digit code the authenticator app should display right now." }), e.jsx("div", { className: "text-center py-4", children: e.jsx("div", { className: "font-mono font-bold text-5xl tracking-[0.25em]", style: { color: s <= 5 ? "#ff3a3a" : s <= 10 ? "#e8c500" : "var(--accent)" }, children: r }) }), e.jsx(ve, { secondsLeft: s }), e.jsx("div", { className: "divider" }), e.jsx("h2", { className: "section-title", children: "Step 3 \u2014 Verify Token" }), e.jsx("p", { className: "font-mono text-xs text-muted", children: "Enter the 6-digit code from the authenticator app." }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx("input", { type: "text", inputMode: "numeric", className: "psas-input text-center font-mono text-xl tracking-[0.3em]", placeholder: "000000", value: o, onChange: _, onKeyDown: (x) => x.key === "Enter" && v(), maxLength: 6 }), e.jsx("button", { className: "btn-primary shrink-0", onClick: v, disabled: o.length !== 6, children: "Verify" })] }), h && e.jsx("div", { className: "font-mono text-sm text-center py-3 rounded-lg border", style: h === "success" ? { color: "#00b862", borderColor: "rgba(0, 191, 102, 0.44)", background: "rgba(0, 255, 136, 0.14)" } : { color: "#ff3a3a", borderColor: "rgba(255,58,58,0.3)", background: "rgba(255,58,58,0.07)" }, children: h === "success" ? "\u2713 Token verified \u2014 authentication successful" : "\u2717 Invalid token \u2014 access denied" })] })] })] });
}
function Ne() {
  return e.jsxs("div", { className: "flex flex-col min-h-screen", children: [e.jsx(re, {}), e.jsx("main", { className: "flex-1 w-full max-w-5xl mx-auto px-4 py-8", children: e.jsxs(U, { children: [e.jsx(y, { path: "/", element: e.jsx(P, { to: "/password-strength", replace: true }) }), e.jsx(y, { path: "/password-strength", element: e.jsx(me, {}) }), e.jsx(y, { path: "/brute-force", element: e.jsx(fe, {}) }), e.jsx(y, { path: "/hashing", element: e.jsx(je, {}) }), e.jsx(y, { path: "/mfa", element: e.jsx(ye, {}) }), e.jsx(y, { path: "*", element: e.jsx(P, { to: "/", replace: true }) })] }) }), e.jsx(le, {})] });
}
T.createRoot(document.getElementById("root")).render(e.jsx(W.StrictMode, { children: e.jsx(V, { children: e.jsx(Ne, {}) }) }));
