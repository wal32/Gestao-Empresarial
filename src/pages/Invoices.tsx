import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  XCircle,
  FileCheck,
  Zap,
  Info,
  X,
  FilePlus2,
  User,
  Package,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';

export const InvoicesPage = () => {
  const { businessId } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isEmitting, setIsEmitting] = useState(false);
  const [successEmit, setSuccessEmit] = useState(false);
  const [fiscalConfig, setFiscalConfig] = useState<any>(null);
  
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    value: '',
    type: 'NF-e',
    items: '',
    observations: ''
  });

  const [certForm, setCertForm] = useState({
    type: 'A1',
    password: '',
    fileName: '',
    expiryDate: ''
  });

  useEffect(() => {
    if (!businessId) return;
    const unsubInvoices = dataService.subscribeInvoices(businessId, setInvoices);
    const unsubFiscal = dataService.subscribeFiscalConfig(businessId, (config) => {
      setFiscalConfig(config);
      if (config) {
        setCertForm({
          type: config.certType || 'A1',
          password: config.certPassword || '',
          fileName: config.certFileName || '',
          expiryDate: config.certExpiry || ''
        });
      }
    });
    return () => {
      unsubInvoices();
      unsubFiscal();
    };
  }, [businessId]);

  const handleUpdateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    
    await dataService.updateFiscalConfig(businessId, {
      certType: certForm.type,
      certPassword: certForm.password,
      certFileName: certForm.fileName,
      certExpiry: certForm.expiryDate,
      hasCertificate: true
    });
    
    setShowCertModal(false);
  };

  const handleEmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    setIsEmitting(true);
    
    // Simular delay de processamento SEFAZ
    await new Promise(resolve => setTimeout(resolve, 2000));

    const invoiceNumber = `000.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}.${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
    
    await dataService.addInvoice(businessId, {
      number: invoiceNumber,
      type: newInvoice.type,
      customer: newInvoice.customer,
      value: parseFloat(newInvoice.value),
      status: 'authorized',
      date: new Date().toLocaleString('pt-BR'),
      items: newInvoice.items,
      observations: newInvoice.observations
    });

    setIsEmitting(false);
    setSuccessEmit(true);
    
    setTimeout(() => {
      setSuccessEmit(false);
      setShowAddModal(false);
      setNewInvoice({ customer: '', value: '', type: 'NF-e', items: '', observations: '' });
    }, 2000);
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.number.includes(searchTerm) || 
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Notas Fiscais</h1>
          <p className="text-soft-white/60">Gerenciamento fiscal, emissão de NFC-e e NF-e integrada ao SEFAZ.</p>
        </div>
        <div className="flex gap-3">
           <div className="flex flex-col items-end mr-4">
              <div className="text-[10px] text-soft-white/40 font-bold uppercase tracking-widest">Status SEFAZ</div>
              <div className="flex items-center gap-1.5 text-neon-green text-xs font-bold">
                 <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div> Operacional
              </div>
           </div>
           <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
          >
             <Zap className="w-4 h-4" />
             Emitir NF-e
           </button>
        </div>
      </header>

      {/* Modal Emitir NF-e */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-sm"
              onClick={() => !isEmitting && !successEmit && setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {successEmit ? (
                <div className="p-12 text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto border border-neon-green/20"
                  >
                    <CheckCircle2 className="w-10 h-10 text-neon-green" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">NF-e Autorizada!</h3>
                  <p className="text-soft-white/40">Nota enviada com sucesso para o SEFAZ.</p>
                </div>
              ) : (
                <form onSubmit={handleEmit} className="p-8 space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neon-green/10 rounded-lg">
                        <FilePlus2 className="w-5 h-5 text-neon-green" />
                      </div>
                      <h3 className="text-xl font-bold">Emitir Nova NF-e</h3>
                    </div>
                    <button type="button" onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <X className="w-6 h-6 text-soft-white/40" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" /> Destinatário (Nome ou Empresa)
                      </label>
                      <input 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                        value={newInvoice.customer}
                        onChange={(e) => setNewInvoice({...newInvoice, customer: e.target.value})}
                        disabled={isEmitting}
                        placeholder="Ex: Restaurante Sabor & Cia"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Valor Total (R$)</label>
                      <input 
                        required type="number" step="0.01"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                        value={newInvoice.value}
                        onChange={(e) => setNewInvoice({...newInvoice, value: e.target.value})}
                        disabled={isEmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Tipo de Nota</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                        value={newInvoice.type}
                        onChange={(e) => setNewInvoice({...newInvoice, type: e.target.value})}
                        disabled={isEmitting}
                      >
                        <option value="NF-e">NF-e (Venda)</option>
                        <option value="NFC-e">NFC-e (Consumidor)</option>
                        <option value="Devolução">Devolução</option>
                      </select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest flex items-center gap-2">
                        <Package className="w-3 h-3" /> Itens / Descrição
                      </label>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green h-24 resize-none" 
                        value={newInvoice.items}
                        onChange={(e) => setNewInvoice({...newInvoice, items: e.target.value})}
                        disabled={isEmitting}
                        placeholder="Dê uma breve descrição dos produtos..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isEmitting}
                    className={cn(
                      "w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
                      isEmitting && "bg-neon-green/50"
                    )}
                  >
                    {isEmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-graphite-dark border-r-transparent rounded-full animate-spin"></div>
                        TRANSMITINDO SEFAZ...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" /> AUTORIZAR NF-e
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="p-6 bg-graphite rounded-2xl border border-white/5 space-y-2">
            <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest">Emitidas (Mês)</div>
            <div className="text-2xl font-black">{invoices.filter(i => i.status === 'authorized').length + 1450}</div>
         </div>
         <div className="p-6 bg-graphite rounded-2xl border border-white/5 space-y-2">
            <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest">Canceladas</div>
            <div className="text-2xl font-black text-red-500">{invoices.filter(i => i.status === 'cancelled').length + 12}</div>
         </div>
         <div className="p-6 bg-graphite rounded-2xl border border-white/5 space-y-2">
            <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest">Total Impostos</div>
            <div className="text-2xl font-black text-gold">R$ {(2140 + (invoices.reduce((acc, curr) => acc + curr.value, 0) * 0.1)).toFixed(2)}</div>
         </div>
         <button 
          onClick={() => setShowCertModal(true)}
          className="p-6 bg-neon-green/5 rounded-2xl border border-neon-green/20 border-dashed flex flex-col justify-center items-center text-center hover:bg-neon-green/10 transition-all group"
         >
            <div className="flex items-center gap-2 text-neon-green font-bold uppercase tracking-widest mb-1">
              <Info className="w-3 h-3" />
              <span>Certificado Digital</span>
            </div>
            {fiscalConfig?.hasCertificate ? (
              <div className="text-[10px] text-soft-white/40">Vence em {fiscalConfig.certExpiry || '365'} dias</div>
            ) : (
              <div className="text-[10px] text-red-500 font-bold">Não Configurado</div>
            )}
         </button>
      </div>

      {/* Modal Certificado Digital */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowCertModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/10 rounded-lg">
                    <Info className="w-5 h-5 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Configurar Certificado</h3>
                </div>
                <button onClick={() => setShowCertModal(false)}>
                  <X className="w-6 h-6 text-soft-white/20 hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleUpdateCert} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Tipo</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                        value={certForm.type}
                        onChange={(e) => setCertForm({...certForm, type: e.target.value})}
                      >
                        <option value="A1">A1 (Arquivo)</option>
                        <option value="A3">A3 (Token/Cartão)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Expiração (dias)</label>
                       <input 
                         type="number"
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                         value={certForm.expiryDate}
                         onChange={(e) => setCertForm({...certForm, expiryDate: e.target.value})}
                         placeholder="Ex: 365"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome do Arquivo / Alias</label>
                    <input 
                      disabled={certForm.type === 'A3'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green disabled:opacity-30" 
                      value={certForm.fileName}
                      onChange={(e) => setCertForm({...certForm, fileName: e.target.value})}
                      placeholder="Ex: certificado_2024.pfx"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Senha do Certificado</label>
                    <input 
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={certForm.password}
                      onChange={(e) => setCertForm({...certForm, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="p-4 bg-neon-green/5 border border-neon-green/10 rounded-2xl flex items-start gap-3">
                   <Info className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                   <p className="text-[10px] text-soft-white/60 leading-relaxed uppercase font-bold tracking-wider">
                      O certificado A1 é essencial para a automação da emissão em nuvem. Certifique-se de que a senha está correta para evitar erros no SEFAZ.
                   </p>
                </div>

                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  SALVAR CONFIGURAÇÃO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Pesquisar por número, cliente ou chave de acesso..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-neon-green outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-soft-white/60" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Nº Nota / Tipo</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Destinatário</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Emissão</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm">{invoice.number}</div>
                    <div className="text-[10px] font-mono text-soft-white/30 tracking-widest">{invoice.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-soft-white/80">{invoice.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold font-mono">R$ {invoice.value.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    {invoice.status === 'authorized' ? (
                      <div className="flex items-center gap-1.5 text-neon-green text-[10px] font-bold uppercase tracking-wider">
                         <FileCheck className="w-3 h-3" /> Autorizada
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider">
                         <XCircle className="w-3 h-3" /> Cancelada
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-soft-white/40">{invoice.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all">
                       <button title="Imprimir Danfe" className="p-2 hover:bg-white/5 rounded-lg text-soft-white/40 hover:text-neon-green"><Printer className="w-4 h-4" /></button>
                       <button title="Download XML" className="p-2 hover:bg-white/5 rounded-lg text-soft-white/40 hover:text-blue-500"><Download className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-soft-white/20">
                       <FileText className="w-12 h-12 mx-auto mb-4 opacity-5" />
                       <p className="text-sm italic">Nenhuma nota encontrada nesta busca.</p>
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
