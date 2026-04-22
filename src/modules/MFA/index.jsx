import { useState, useEffect, useRef, useCallback } from 'react';
import * as OTPAuth from 'otpauth';
import { QRCodeSVG } from 'qrcode.react';

const PERIOD = 30; // seconds per TOTP window

function TOTPProgress({ secondsLeft }) {
  const pct = (secondsLeft / PERIOD) * 100;
  const color = secondsLeft <= 5 ? '#ff3a3a' : secondsLeft <= 10 ? '#e8c500' : '#00d06f';
  return (
    <div className="space-y-1">
      <div className="h-1.5 bg-dim rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="flex justify-between font-mono text-xs text-muted">
        <span>Token expires in</span>
        <span style={{ color }}>{secondsLeft}s</span>
      </div>
    </div>
  );
}

export default function MFA() {
  const [totp,       setTotp]       = useState(null);
  const [token,      setToken]       = useState('');
  const [secondsLeft, setSecondsLeft] = useState(PERIOD);
  const [userInput,  setUserInput]   = useState('');
  const [verifyState, setVerifyState] = useState(null); // null | 'success' | 'fail'
  const timerRef = useRef(null);

  // Initialise TOTP engine
  const initTOTP = useCallback(() => {
    const secret = new OTPAuth.Secret({ size: 20 });
    const instance = new OTPAuth.TOTP({
      issuer:    'PSAS Demo',
      label:     'psas@simulator',
      algorithm: 'SHA1',
      digits:    6,
      period:    PERIOD,
      secret,
    });
    setTotp(instance);
    setVerifyState(null);
    setUserInput('');
  }, []);

  useEffect(() => { initTOTP(); }, [initTOTP]);

  // Tick every second
  useEffect(() => {
    if (!totp) return;

    function tick() {
      const now        = Math.floor(Date.now() / 1000);
      const remaining  = PERIOD - (now % PERIOD);
      const currentTok = totp.generate();
      setToken(currentTok);
      setSecondsLeft(remaining);
    }

    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [totp]);

  function handleVerify() {
    if (!totp || userInput.length !== 6) return;
    const delta = totp.validate({ token: userInput, window: 1 });
    setVerifyState(delta !== null ? 'success' : 'fail');
  }

  function handleInputChange(e) {
    const v = e.target.value.replace(/\D/g, '').slice(0, 6);
    setUserInput(v);
    setVerifyState(null);
  }

  const uri     = totp?.toString() ?? '';
  const b32     = totp?.secret?.base32 ?? '';

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h1 className="font-ui font-bold text-2xl text-[var(--text)] mb-1">
          MFA / TOTP Simulator
        </h1>
        <p className="font-mono text-sm text-muted">
          Simulated Time-Based One-Time Password (TOTP) flow; test token generation, QR enrollment, and verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* QR + Secret */}
        <div className="panel space-y-4">
          <h2 className="section-title">Step 1 — Scan QR Code</h2>
          <p className="font-mono text-xs text-muted">
            Scan with an authenticator app such as Google Authenticator to sync token.
          </p>

          {uri && (
            <div className="flex justify-center p-4 bg-white rounded-xl">
              <QRCodeSVG value={uri} size={160} />
            </div>
          )}

          <div>
            <div className="field-label">Manual entry secret (Base32)</div>
            <div className="font-mono text-xs break-all bg-bg border border-border rounded p-3 select-all">
              {b32}
            </div>
          </div>

          <button className="btn-ghost w-full text-sm" onClick={initTOTP}>
            ↺ Generate new secret
          </button>
        </div>

        {/* Live token + verify */}
        <div className="panel space-y-5">
          <h2 className="section-title">Step 2 — Current Token</h2>
          <p className="font-mono text-xs text-muted">
            This is the 6-digit code the authenticator app should display right now.
          </p>

          {/* Token display */}
          <div className="text-center py-4">
            <div
              className="font-mono font-bold text-5xl tracking-[0.25em]"
              style={{ color: secondsLeft <= 5 ? '#ff3a3a' : secondsLeft <= 10 ? '#e8c500' : 'var(--accent)' }}
            >
              {/* const color = secondsLeft <= 5 ? '#ff3a3a' : secondsLeft <= 10 ? '#ffd900' : '#00d06f'; */}
              {token}
            </div>
          </div>

          <TOTPProgress secondsLeft={secondsLeft} />

          <div className="divider" />

          <h2 className="section-title">Step 3 — Verify Token</h2>
          <p className="font-mono text-xs text-muted">
            Enter the 6-digit code from the authenticator app.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              className="psas-input text-center font-mono text-xl tracking-[0.3em]"
              placeholder="000000"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              maxLength={6}
            />
            <button
              className="btn-primary shrink-0"
              onClick={handleVerify}
              disabled={userInput.length !== 6}
            >
              Verify
            </button>
          </div>

          {verifyState && (
            <div
              className="font-mono text-sm text-center py-3 rounded-lg border"
              style={
                verifyState === 'success'
                  ? { color: '#00b862', borderColor: 'rgba(0, 191, 102, 0.44)', background: 'rgba(0, 255, 136, 0.14)' }
                  : { color: '#ff3a3a', borderColor: 'rgba(255,58,58,0.3)', background: 'rgba(255,58,58,0.07)' }
              }
            >
              {verifyState === 'success' ? '✓ Token verified — authentication successful' : '✗ Invalid token — access denied'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
