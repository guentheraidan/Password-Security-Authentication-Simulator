# PSAS — Password Security & Authentication Simulator

An educational, browser-based web application for exploring modern password security and authentication techniques. All computation runs client-side — no data ever leaves your browser.

## Modules

| Module | Route | Description |
|---|---|---|
| Password Strength Analyzer | `/password-strength` | Evaluates entropy, character diversity, and common-pattern weaknesses via zxcvbn |
| Brute-Force Attack Simulator | `/brute-force` | Mathematical crack-time estimates across real attack speeds with an animated Web Worker counter |
| Hashing Algorithm Comparison | `/hashing` | Side-by-side MD5, SHA-1, bcrypt, and Argon2id outputs with compute times and security ratings |
| MFA / TOTP Simulator | `/mfa` | Full TOTP flow — QR enrollment, live token generation, and token verification via otpauth |

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3
- **Password scoring**: zxcvbn
- **Hashing**: bcryptjs, crypto-js, argon2-browser (WASM)
- **MFA**: otpauth, qrcode.react
- **Threading**: Web Worker (brute-force counter)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                          # Routing
├── main.jsx                         # React entry point
├── index.css                        # Tailwind + global styles
├── components/
│   ├── NavBar.jsx                   # Tab navigation
│   └── Footer.jsx                   # Persistent footer
├── modules/
│   ├── PasswordStrength/index.jsx   # Module 1
│   ├── BruteForce/index.jsx         # Module 2
│   ├── Hashing/index.jsx            # Module 3
│   └── MFA/index.jsx                # Module 4
├── utils/
│   ├── passwordUtils.js             # evaluatePasswordStrength()
│   ├── bruteForceUtils.js           # computeCrackTime()
│   └── hashUtils.js                 # generateHashes()
└── workers/
    └── bruteForce.worker.js         # Web Worker for animated counter
```

## Design Constraints

- Client-side only — no backend, no network calls after page load
- No passwords or tokens are stored or transmitted
- WCAG 2.1 Level AA accessible
- Deployable to GitHub Pages or Netlify as a static site
- All dependencies are MIT or Apache 2.0 licensed

## Deployment (GitHub Pages)

1. In `vite.config.js`, set `base: '/your-repo-name/'`
2. Run `npm run build`
3. Push the `dist/` folder to the `gh-pages` branch, or use the [gh-pages](https://www.npmjs.com/package/gh-pages) package

## Authors

Abel Manoj, Nathan Jones, Daniel Vargas, Aidan Guenther — Group 7
