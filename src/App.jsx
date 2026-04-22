import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import PasswordStrength from './modules/PasswordStrength/index.jsx';
import BruteForce      from './modules/BruteForce/index.jsx';
import Hashing         from './modules/Hashing/index.jsx';
import MFA             from './modules/MFA/index.jsx';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/"           element={<Navigate to="/password-strength" replace />} />
          <Route path="/password-strength" element={<PasswordStrength />} />
          <Route path="/brute-force"       element={<BruteForce />} />
          <Route path="/hashing"           element={<Hashing />} />
          <Route path="/mfa"               element={<MFA />} />
          <Route path="*"                  element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
