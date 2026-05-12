import React, { useState } from 'react';
import { ShieldCheck, Phone, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const UpgradePage = () => {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'invalid' | 'success'>('idle');

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const licenseRef = doc(db, 'licenses', key.trim());
      const licenseSnap = await getDoc(licenseRef);

      if (licenseSnap.exists() && licenseSnap.data().active) {
        const licenseData = licenseSnap.data();
        // Mark key as used
        await updateDoc(licenseRef, { active: false, usedBy: auth.currentUser?.uid, usedAt: new Date().toISOString() });
        
        // Mark user with appropriate license
        if (auth.currentUser) {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          let updateData: any = { isPro: true };
          
          if (licenseData.type === 'trial') {
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);
            updateData.proUntil = expiry.toISOString();
            updateData.isPro = false; // We'll use proUntil logic
          } else if (licenseData.type === 'monthly') {
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + 1);
            updateData.proUntil = expiry.toISOString();
            updateData.isPro = false; // We'll use proUntil logic
          } else {
            // Lifetime
            updateData.isPro = true;
            updateData.proUntil = null;
          }
          
          await updateDoc(userRef, updateData);
        }
        setStatus('success');
        alert('Chave validada com sucesso! Conta ativada.');
      } else {
        setStatus('invalid');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'licenses');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-graphite p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-neon-green/10 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Ativação de Conta</h2>
            <p className="text-soft-white/60">Insira sua chave de ativação para liberar os recursos Premium.</p>
          </div>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <input 
            type="text" 
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-neon-green"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          {status === 'invalid' && <p className="text-red-500 text-xs font-bold">Chave inválida. Tente novamente.</p>}
          {status === 'success' && <p className="text-neon-green text-xs font-bold">Chave ativada com sucesso!</p>}
          <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
            <Zap className="w-5 h-5" /> ATIVAR LICENÇA
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-soft-white/40">Precisa de ajuda? Entre em contato</h3>
          <a 
            href="https://wa.me/5541988228676?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20a%20ativa%C3%A7%C3%A3o%20do%20meu%20ERP."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 py-3 px-6 bg-white/5 hover:bg-neon-green hover:text-graphite-dark rounded-xl transition-all font-bold"
          >
            <Phone className="w-5 h-5" /> (41) 98822-8676
          </a>
        </div>
      </motion.div>
    </div>
  );
};
