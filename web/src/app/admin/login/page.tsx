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
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] rounded-[18px] border border-edge bg-white p-8 shadow-[0_12px_40px_rgba(26,58,92,0.08)]"
      >
        <div className="mb-1 text-[22px] font-bold text-navy">
          Hayasa <span className="text-teal">Admin</span>
        </div>
        <p className="mb-6 text-sm text-muted">Панель управления сайтом</p>

        <label className="mb-1.5 block text-[13px] font-semibold text-navy">Email</label>
        <input
          type="email"
          className="hb-in mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <label className="mb-1.5 block text-[13px] font-semibold text-navy">Пароль</label>
        <input
          type="password"
          className="hb-in mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <div className="mb-4 rounded-[10px] bg-[#FCEDEB] px-3 py-2.5 text-[13px] text-[#C0564B]">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal px-3.5 py-3 text-[15px] font-semibold text-white transition-opacity disabled:opacity-70"
        >
          {loading ? 'Вход…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
