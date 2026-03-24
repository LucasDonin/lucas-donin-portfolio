import { useState } from 'react';

const ADMIN_PASSWORD = 'donindesign2024';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#242424' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="mb-10 text-center">
          <img src="/logo-donin.svg" alt="Donindesign" className="h-8 mx-auto mb-6" style={{ filter: 'brightness(10)' }} />
          <p className="text-sm tracking-[0.3em] uppercase" style={{ color: 'oklch(0.78 0.14 88)' }}>Admin</p>
        </div>

        <form onSubmit={handleSubmit}
          className="p-8 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <label className="block text-xs tracking-[0.2em] uppercase mb-3" style={{ color: '#777' }}>
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 mb-6"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: error ? '1px solid #e24b4a' : '1px solid rgba(255,255,255,0.12)',
              color: '#D2D2D2',
            }}
            placeholder="••••••••"
          />
          {error && (
            <p className="text-xs mb-4 text-center" style={{ color: '#e24b4a' }}>Senha incorreta</p>
          )}
          <button type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'oklch(0.78 0.14 88)',
              color: '#242424',
            }}>
            Entrar
          </button>
        </form>

        <p className="text-center mt-6 text-xs" style={{ color: '#555' }}>
          <a href="/" style={{ color: '#777' }}>{'\u2190'} Voltar ao site</a>
        </p>
      </div>
    </div>
  );
}
