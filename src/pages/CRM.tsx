import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  Star,
  History,
  TrendingUp,
  Award,
  Users,
  X,
  Edit2,
  Trash2,
  Calendar,
  CreditCard,
  MessageSquare,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';

export const CRMPage = () => {
  const { businessId } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    totalSpends: '',
    phone: '',
    document: '',
    vip: false
  });
  const [customerSuccess, setCustomerSuccess] = useState<any | null>(null);

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeCustomers(businessId, setCustomers);
  }, [businessId]);

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setNewCustomer({ name: '', totalSpends: '', phone: '', document: '', vip: false });
    setShowAddModal(true);
  };

  const handleOpenEdit = (customer: any) => {
    setEditingCustomer(customer);
    setNewCustomer({
      name: customer.name,
      totalSpends: (customer.totalSpends || 0).toString(),
      phone: customer.phone || '',
      document: customer.document || '',
      vip: !!customer.vip
    });
    setShowAddModal(true);
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    try {
      const customerData = {
        ...newCustomer,
        totalSpends: Number(newCustomer.totalSpends) || 0
      };

      if (editingCustomer) {
        await dataService.updateCustomer(businessId, editingCustomer.id, customerData);
      } else {
        const docRef = await dataService.addCustomer(businessId, {
          ...customerData,
          cashback: 0,
          lastPurchase: 'Novo Cliente'
        });

        if (docRef) {
          setCustomerSuccess({ id: docRef.id, ...customerData });
        }
      }

      setNewCustomer({ name: '', totalSpends: '', phone: '', document: '', vip: false });
      setShowAddModal(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (!businessId) return;
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      await dataService.deleteCustomer(businessId, customerId);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    (c.document && c.document.includes(searchTerm))
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">CRM & Fidelidade</h1>
          <p className="text-soft-white/60">Gerencie o relacionamento com seus clientes e programas de cashback.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Novo Cliente
        </button>
      </header>

      {/* Modal Novo Cliente */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 shadow-2xl">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-graphite rounded-3xl border border-white/10 overflow-hidden"
            >
              <form onSubmit={handleAddCustomer} className="p-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}</h3>
                  <button type="button" onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                    <X className="w-6 h-6 text-soft-white/40" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome Completo</label>
                    <input 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.name} 
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Valor da Compra (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.totalSpends} 
                      onChange={(e) => setNewCustomer({...newCustomer, totalSpends: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Telefone</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.phone} 
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} 
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">CPF / CNPJ</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.document} 
                      onChange={(e) => setNewCustomer({...newCustomer, document: e.target.value})} 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Cliente VIP?</label>
                    <button 
                      type="button" 
                      onClick={() => setNewCustomer({...newCustomer, vip: !newCustomer.vip})}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                        newCustomer.vip ? "bg-neon-green" : "bg-white/10"
                      )}
                    >
                      <motion.div 
                        animate={{ x: newCustomer.vip ? 24 : 0 }}
                        className={cn("w-4 h-4 rounded-full", newCustomer.vip ? "bg-graphite-dark" : "bg-soft-white/40")} 
                      />
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  {editingCustomer ? 'ATUALIZAR CLIENTE' : 'CADASTRAR CLIENTE'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Sucesso Cadastro */}
      <AnimatePresence>
        {customerSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setCustomerSuccess(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-neon-green/20">
                <UserPlus className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cliente Cadastrado!</h3>
              <p className="text-soft-white/60 mb-8 text-sm">O cliente <strong>{customerSuccess.name}</strong> foi adicionado com sucesso. Deseja enviar uma mensagem de boas-vindas?</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    window.open(`https://wa.me/${customerSuccess.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${customerSuccess.name}, AGRADECEMOS A PREFERENCIA, VOLTE SEMPRE!`)}`, '_blank');
                    setCustomerSuccess(null);
                  }}
                  className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                   <MessageSquare className="w-5 h-5" /> ENVIAR MENSAGEM
                </button>
                <button 
                  onClick={() => setCustomerSuccess(null)}
                  className="w-full py-3 text-soft-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  FECHAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-graphite p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="p-3 bg-neon-green/10 rounded-xl">
              <Users className="w-6 h-6 text-neon-green" />
           </div>
           <div>
              <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Total Clientes</div>
              <div className="text-2xl font-black">{customers.length}</div>
           </div>
        </div>
        <div className="bg-graphite p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="p-3 bg-gold/10 rounded-xl">
              <Award className="w-6 h-6 text-gold" />
           </div>
           <div>
              <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Clientes VIP</div>
              <div className="text-2xl font-black">{customers.filter(c => c.vip).length}</div>
           </div>
        </div>
        <div className="bg-graphite p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="p-3 bg-blue-500/10 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-500" />
           </div>
           <div>
              <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Ativos (Novo)</div>
              <div className="text-2xl font-black">{customers.filter(c => c.totalSpends > 0).length}</div>
           </div>
        </div>
      </div>

      <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Buscar cliente por nome, CPF ou telefone..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-neon-green outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Contato</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Total Compras</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Mensagem</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Última Visita</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                            {customer.name.split(' ').map((n: string) => n[0]).join('')}
                         </div>
                         <div>
                            <div className="font-semibold flex items-center gap-2">
                                {customer.name}
                                {customer.vip && <Star className="w-3 h-3 fill-gold text-gold" />}
                            </div>
                            <div className="text-[10px] text-soft-white/30 uppercase font-bold tracking-tighter">ID: #{customer.id.slice(-6).toUpperCase()}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs flex items-center gap-1.5 text-soft-white/60">
                           <Phone className="w-3 h-3" /> {customer.phone}
                        </div>
                        <div className="text-xs flex items-center gap-1.5 text-soft-white/60">
                           <Mail className="w-3 h-3" /> {customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-sm text-soft-white">R$ {(customer.totalSpends || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
                        onClick={() => window.open(`https://wa.me/${customer.phone?.replace(/\D/g, '')}?text=${encodeURIComponent('AGRADECEMOS A PREFERENCIA, VOLTE SEMPRE!')}`, '_blank')}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Enviar</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-xs text-soft-white/60">{customer.lastPurchase}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button 
                            onClick={() => handleOpenEdit(customer)}
                            className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-neon-green hover:text-graphite-dark rounded-lg transition-all" title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => window.open(`https://wa.me/${customer.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${customer.name}, AGRADECEMOS A PREFERENCIA, VOLTE SEMPRE!`)}`, '_blank')}
                            className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-neon-green hover:text-graphite-dark rounded-lg transition-all" title="Enviar WhatsApp"
                          >
                            <Send className="w-4 h-4" />
                         </button>
                         <button className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-white/10 rounded-lg transition-all" title="Histórico">
                            <History className="w-4 h-4" />
                         </button>
                         <button 
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-red-500 rounded-lg transition-all" title="Excluir">
                            <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="p-20 text-center text-soft-white/20">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p>Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
