import React, { useState } from 'react';
import { LogIn, Github, Mail, ShieldCheck, Zap, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';

export const LoginPage = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-graphite-dark flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-green/10 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-neon-green rounded-2xl flex items-center justify-center rotate-12 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              <Zap className="w-8 h-8 text-graphite-dark -rotate-12" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-white">GESTÃO EMPRESARIAL</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Bem-vindo ao Cloud ERP</h1>
          <p className="text-soft-white/60 text-sm">Acesse sua loja de qualquer lugar, em tempo real.</p>
        </div>

        <div className="bg-graphite p-8 rounded-3xl border border-white/5 shadow-2xl space-y-4">
          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 bg-white text-graphite-dark font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" referrerPolicy="no-referrer" />
            Entrar com Google
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-graphite px-4 text-soft-white/30 font-bold tracking-widest">ou</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="space-y-2">
              <label className="text-xs font-bold text-soft-white/40 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/20" />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-neon-green outline-none" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-soft-white/40 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/20" />
                <input 
                  type="password" 
                  placeholder="********" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-neon-green outline-none" 
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 hover:bg-neon-green/90"
            >
              <LogIn className="w-4 h-4" /> {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
            <p className="text-center text-xs text-soft-white/60">
              {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-neon-green ml-1 font-bold"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </form>
        </div>

        <div className="text-center space-y-4">
          <p className="text-[10px] text-soft-white/30 uppercase tracking-[0.2em] font-bold">Segurança de dados Enterprise</p>
          <div className="flex justify-center gap-6 opacity-40 grayscale contrast-125">
             <ShieldCheck className="w-5 h-5 text-neon-green" />
             <div className="text-[10px] items-center flex gap-1 font-bold text-white"><Github className="w-4 h-4" /> Open Source Core</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
