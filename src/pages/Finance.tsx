import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Wallet,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { exportToCSV } from '../lib/exportUtils';

export const FinancePage = () => {
  const { businessId } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [newTx, setNewTx] = useState({
    description: '',
    amount: '',
    category: 'Fixa',
    type: 'expense'
  });

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeTransactions(businessId, setTransactions);
  }, [businessId]);

  const handleExportCSV = () => {
    const dataToExport = transactions.map(t => ({
      Descrição: t.description,
      Valor: t.amount,
      Tipo: t.type === 'income' ? 'Entrada' : 'Saída',
      Categoria: t.category,
      Data: t.timestamp?.toDate ? t.timestamp.toDate().toLocaleString('pt-BR') : 'N/A'
    }));
    exportToCSV(dataToExport, `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const totalIn = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIn - totalOut;

  const chartData = [
    { name: 'Entradas', amount: totalIn, color: '#CCFF00' },
    { name: 'Saídas', amount: totalOut, color: '#FF4444' },
  ];

  const handleAddTx = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    await dataService.addTransaction(businessId, {
      ...newTx,
      amount: Number(newTx.amount)
    });

    setNewTx({ description: '', amount: '', category: 'Fixa', type: 'expense' });
    setShowAddModal(false);
  };
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Módulo Financeiro</h1>
          <p className="text-soft-white/60">Controle total sobre seu fluxo de caixa e rentabilidade.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Relatório CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Lançar Despesa
          </button>
        </div>
      </header>

      {/* Modal Lançamento */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-xl">
                    <ArrowDownLeft className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold">Lançar Saída / Despesa</h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-soft-white/40" />
                </button>
              </div>

              <form onSubmit={handleAddTx} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Descrição</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-red-500" placeholder="Ex: Pagamento Internet" value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Valor</label>
                      <input type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-red-500" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Categoria</label>
                      <select required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-red-500 appearance-none" value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})}>
                        <option value="Fixa">Fixa</option>
                        <option value="Estoque">Estoque</option>
                        <option value="Operacional">Operacional</option>
                        <option value="Pessoal">Pessoal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  CONFIRMAR LANÇAMENTO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-graphite p-6 rounded-2xl border border-white/5 border-l-4 border-l-neon-green">
                <div className="text-soft-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Saldo Atual</div>
                <div className="text-2xl font-black">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
             </div>
             <div className="bg-graphite p-6 rounded-2xl border border-white/5 border-l-4 border-l-blue-500">
                <div className="text-soft-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Total Entradas</div>
                <div className="text-2xl font-black">R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
             </div>
             <div className="bg-graphite p-6 rounded-2xl border border-white/5 border-l-4 border-l-orange-500">
                <div className="text-soft-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Total Saídas</div>
                <div className="text-2xl font-black text-orange-500">R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
             </div>
          </div>

          <div className="bg-graphite p-6 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Resumo Mensal</h2>
              <div className="flex items-center gap-2 text-xs text-soft-white/40">
                <Calendar className="w-4 h-4" />
                Maio 2026
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={12} width={70} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-graphite rounded-3xl border border-white/5 flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-bold">Fluxo Recente</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {transactions.slice(0, 10).map(tx => {
              const txDate = tx.timestamp?.toDate ? tx.timestamp.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Acabou de lançar';
              return (
                <div key={tx.id} className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                    <div className={cn(
                      "p-2 rounded-xl transition-transform group-hover:scale-110",
                      tx.type === 'income' ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
                    )}>
                      {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{tx.description}</div>
                      <div className="text-[10px] text-soft-white/40 flex items-center gap-1 uppercase tracking-wider font-bold">
                          {tx.category} • {txDate}
                      </div>
                    </div>
                    <div className={cn(
                      "text-sm font-black",
                      tx.type === 'income' ? "text-neon-green" : "text-red-500"
                    )}>
                      {tx.type === 'expense' ? '-' : ''} R$ {tx.amount.toFixed(2)}
                    </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setShowFullHistory(true)}
            className="m-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
          >
            Ver Todos Lançamentos
          </button>
        </div>
      </div>

      {/* Modal Histórico Completo */}
      <AnimatePresence>
        {showFullHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowFullHistory(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Histórico Completo</h3>
                  <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Todos os lançamentos do período</p>
                </div>
                <button onClick={() => setShowFullHistory(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-soft-white/40" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-graphite z-10">
                    <tr>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5">Data</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5">Descrição</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5">Categoria</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-4 py-4 text-sm text-soft-white/60">
                          {tx.timestamp?.toDate ? tx.timestamp.toDate().toLocaleString('pt-BR') : 'Recent'}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-1.5 rounded-lg",
                              tx.type === 'income' ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
                            )}>
                              {tx.type === 'income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                            </div>
                            <span className="text-sm font-bold">{tx.description}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-soft-white/40">
                            {tx.category}
                          </span>
                        </td>
                        <td className={cn(
                          "px-4 py-4 text-right font-black",
                          tx.type === 'income' ? "text-neon-green" : "text-red-500"
                        )}>
                          {tx.type === 'expense' ? '-' : ''} R$ {tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
};
