'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = getBrowserSupabase();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError || !data.user) {
        setError('Неверный email или пароль.');
        setLoading(false);
        return;
      }
      // Confirm admin rights before entering the panel.
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();
      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        setError('У этого аккаунта нет прав администратора.');
        setLoading(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Ошибка входа. Попробуйте ещё раз.');
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 380,
          background: '#fff',
          border: '1px solid #D0E8E4',
          borderRadius: 18,
          padding: 32,
          boxShadow: '0 12px 40px rgba(26,58,92,0.08)',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A3A5C', marginBottom: 4 }}>
          Hayasa <span style={{ color: '#1A7A8A' }}>Admin</span>
        </div>
        <p style={{ fontSize: 14, color: '#6B8585', marginBottom: 24 }}>Панель управления сайтом</p>

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
        <input
          type="email"
          className="hb-in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          style={{ marginBottom: 16 }}
        />

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Пароль</label>
        <input
          type="password"
          className="hb-in"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          style={{ marginBottom: 20 }}
        />

        {error && (
          <div
            style={{
              fontSize: 13,
              color: '#C0564B',
              background: '#FCEDEB',
              borderRadius: 10,
              padding: '10px 12px',
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: '#1A7A8A',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 14px',
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Вход…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
