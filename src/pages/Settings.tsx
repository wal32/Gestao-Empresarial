import { doc, setDoc, getDoc, getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Bell, 
  CreditCard,
  Cloud,
  Terminal,
  Store,
  ChevronRight,
  Monitor,
  Tags,
  Plus,
  Trash2,
  Edit2,
  X,
  Save
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';

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

export const SettingsPage = () => {
  const { businessId, user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [generatedKey, setGeneratedKey] = useState('');
  const [selectedLicenseType, setSelectedLicenseType] = useState<'trial' | 'monthly' | 'lifetime'>('monthly');
  const [licenseHistory, setLicenseHistory] = useState<any[]>([]);
  const [business, setBusiness] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);
  const [notifConfig, setNotifConfig] = useState<any>(null);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    cnpj: '',
    address: '',
    website: '',
    crt: 'Simples Nacional'
  });

  useEffect(() => {
    if (!businessId) return;
    const unsubBusiness = dataService.subscribeBusiness(businessId, (data) => {
      setBusiness(data);
      if (data) {
        setProfileForm({
          name: data.name || '',
          cnpj: data.cnpj || '',
          address: data.address || '',
          website: data.website || '',
          crt: data.crt || 'Simples Nacional'
        });
      }
    });
    const unsubCats = dataService.subscribeCategories(businessId, setCategories);
    const unsubInterface = dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
    const unsubNotif = dataService.subscribeConfig(businessId, 'notifications', setNotifConfig);

    return () => {
      unsubBusiness();
      unsubCats();
      unsubInterface();
      unsubNotif();
    };
  }, [businessId]);

  useEffect(() => {
    if (activeTab === 'license' && user?.email === 'valdneylima71@gmail.com') {
      const q = query(collection(db, 'licenses'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        setLicenseHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return unsub;
    }
  }, [activeTab, user]);

  const handleActivateAll = async () => {
    if (!businessId) return;
    await handleUpdateInterface({ darkMode: true, compactMode: true });
    await handleUpdateNotif({ lowStock: true, dailyReport: true });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    await dataService.updateBusiness(businessId, profileForm);
    setShowEditProfileModal(false);
  };

  const handleUpdateInterface = async (data: any) => {
    if (!businessId) return;
    await dataService.updateConfig(businessId, 'interface', data);
  };

  const handleUpdateNotif = async (data: any) => {
    if (!businessId) return;
    await dataService.updateConfig(businessId, 'notifications', data);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId || !newCategoryName.trim()) return;

    if (editingCategory) {
      await dataService.updateCategory(businessId, editingCategory.id, newCategoryName.trim());
    } else {
      await dataService.addCategory(businessId, newCategoryName.trim());
    }

    setNewCategoryName('');
    setEditingCategory(null);
    setShowAddCategoryModal(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!businessId) return;
    if (window.confirm('Deseja realmente remover esta categoria? Isto afetará os produtos vinculados.')) {
      await dataService.deleteCategory(businessId, categoryId);
    }
  };

  const tabStyle = (id: string) => cn(
    "w-full text-left px-4 py-4 rounded-2xl flex items-center gap-4 transition-all group border border-transparent",
    activeTab === id 
      ? "bg-neon-green/10 border-neon-green/20 text-neon-green" 
      : "bg-graphite border-white/5 hover:border-white/20 hover:bg-white/5"
  );

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Ajustes</h1>
        <p className="text-soft-white/60">Gerencie sua conta, lojas e preferências do sistema.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-3">
          <button onClick={() => setActiveTab('profile')} className={tabStyle('profile')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'profile' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Perfil da Loja</div>
          </button>
          
          <button onClick={() => setActiveTab('categories')} className={tabStyle('categories')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'categories' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Tags className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Categorias</div>
          </button>

          <button onClick={() => setActiveTab('interface')} className={tabStyle('interface')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'interface' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Monitor className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Interface</div>
          </button>

          <button onClick={() => setActiveTab('notifications')} className={tabStyle('notifications')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'notifications' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Notificações</div>
          </button>
          {user?.email === 'valdneylima71@gmail.com' && (
            <button onClick={() => setActiveTab('license')} className={tabStyle('license')}>
              <div className={cn("p-2 rounded-lg", activeTab === 'license' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 text-sm font-bold">Gerador de Licença</div>
            </button>
          )}
        </aside>

        <main className="md:col-span-3 space-y-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Store Profile */}
              <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neon-green/10 rounded-2xl border border-neon-green/20 flex items-center justify-center">
                      <Store className="w-8 h-8 text-neon-green" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg leading-none mb-1">{business?.name || 'Sua Loja'}</h2>
                      <p className="text-xs text-soft-white/40">ID do Comércio: #{businessId?.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowEditProfileModal(true)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
                  >
                    Editar Perfil
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <Building2 className="w-4 h-4" />
                      <span>CNPJ: {business?.cnpj || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <MapPin className="w-4 h-4" />
                      <span>{business?.address || 'Endereço não informado'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <Globe className="w-4 h-4" />
                      <span>{business?.website || 'Website não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <ShieldCheck className="w-4 h-4" />
                      <span>CRT: {business?.crt || 'Simples Nacional'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-6"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-xl font-bold">Categorias de Produtos</h2>
                  <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Organize seu estoque por grupos</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingCategory(null);
                    setNewCategoryName('');
                    setShowAddCategoryModal(true);
                  }}
                  className="px-4 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-xs hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> NOVA CATEGORIA
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                        <Tags className="w-4 h-4 text-soft-white/40" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{cat.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => {
                          setEditingCategory(cat);
                          setNewCategoryName(cat.name);
                          setShowAddCategoryModal(true);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-soft-white/40 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-soft-white/40 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="col-span-2 py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-sm text-soft-white/20 italic">Ainda não há categorias. Comece criando uma!</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === 'interface' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Interface & Experiência</h2>
                  <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Personalize o visual do seu PDV</p>
                </div>
                <button 
                  onClick={handleActivateAll}
                  className="px-4 py-2 bg-neon-green/10 text-neon-green border border-neon-green/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neon-green hover:text-graphite-dark transition-all"
                >
                  Ativar Tudo
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Modo Dark Automático</h4>
                    <p className="text-xs text-soft-white/40">Alterna cores baseado no horário local.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateInterface({ darkMode: !interfaceConfig?.darkMode })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      interfaceConfig?.darkMode ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      interfaceConfig?.darkMode ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Layout do PDV Compacto</h4>
                    <p className="text-xs text-soft-white/40">Reduz o tamanho dos cards para telas menores.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateInterface({ compactMode: !interfaceConfig?.compactMode })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      interfaceConfig?.compactMode ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      interfaceConfig?.compactMode ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'notifications' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-8"
            >
              <div>
                <h2 className="text-xl font-bold">Alertas & Notificações</h2>
                <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Configure avisos automáticos do sistema</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Aviso de Estoque Baixo</h4>
                    <p className="text-xs text-soft-white/40">Notificar quando um produto atingir o limite mínimo.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateNotif({ lowStock: !notifConfig?.lowStock })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      notifConfig?.lowStock ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      notifConfig?.lowStock ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Resumo de Vendas Diário</h4>
                    <p className="text-xs text-soft-white/40">Enviar relatório por e-mail ao fechar o caixa.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateNotif({ dailyReport: !notifConfig?.dailyReport })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      notifConfig?.dailyReport ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      notifConfig?.dailyReport ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'license' && user?.email === 'valdneylima71@gmail.com' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold">Gerador de Licença</h2>
                <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Crie chaves de ativação premium</p>
              </div>

              {generatedKey && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <code className="text-neon-green font-mono text-sm tracking-widest">{generatedKey}</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey);
                      alert('Chave copiada!');
                    }}
                    className="text-[10px] font-bold text-soft-white/60 hover:text-white transition-colors"
                  >
                    COPIAR
                  </button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setSelectedLicenseType('trial')}
                  className={cn(
                    "p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                    selectedLicenseType === 'trial' ? "bg-neon-green/10 border-neon-green text-neon-green" : "bg-white/5 border-white/5 text-soft-white/40 hover:border-white/20"
                  )}
                >
                  Teste 7 Dias
                </button>
                <button 
                  onClick={() => setSelectedLicenseType('monthly')}
                  className={cn(
                    "p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                    selectedLicenseType === 'monthly' ? "bg-neon-green/10 border-neon-green text-neon-green" : "bg-white/5 border-white/5 text-soft-white/40 hover:border-white/20"
                  )}
                >
                  Mensal
                </button>
                <button 
                  onClick={() => setSelectedLicenseType('lifetime')}
                  className={cn(
                    "p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                    selectedLicenseType === 'lifetime' ? "bg-neon-green/10 border-neon-green text-neon-green" : "bg-white/5 border-white/5 text-soft-white/40 hover:border-white/20"
                  )}
                >
                  Vitalícia
                </button>
              </div>

              <button 
                onClick={async () => {
                  const part = () => Math.random().toString(36).substr(2, 4).toUpperCase();
                  const newKey = `${part()}-${part()}-${part()}-${part()}`;
                  try {
                    await setDoc(doc(db, 'licenses', newKey), {
                      key: newKey,
                      active: true,
                      type: selectedLicenseType,
                      createdAt: new Date().toISOString()
                    });
                    setGeneratedKey(newKey);
                  } catch (e) {
                    handleFirestoreError(e, OperationType.WRITE, 'licenses');
                  }
                }}
                className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                GERAR NOVA CHAVE
              </button>

              <div className="mt-8 space-y-4">
                <h3 className="font-bold">Histórico de Chaves</h3>
                <div className="space-y-2">
                  {licenseHistory.map((lic: any) => (
                    <div key={lic.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <code className="font-mono text-xs">{lic.key}</code>
                        <div className="flex gap-2">
                          <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 text-soft-white/40">
                            {lic.type === 'trial' ? 'Teste 7 Dias' : lic.type === 'monthly' ? 'Mensal' : 'Vitalícia'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-[10px] uppercase font-bold", lic.active ? "text-neon-green" : "text-red-500")}>
                          {lic.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {licenseHistory.length === 0 && <p className="text-xs text-soft-white/40 italic">Nenhuma chave gerada ainda.</p>}
                </div>
              </div>
            </motion.section>
          )}
        </main>
      </div>

      {/* Modal Categoria */}
      <AnimatePresence>
        {showAddCategoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowAddCategoryModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold tracking-tight">{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h3>
                <button onClick={() => setShowAddCategoryModal(false)}>
                  <X className="w-6 h-6 text-soft-white/20 hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleAddCategory} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome da Categoria</label>
                  <input 
                    required autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:border-neon-green" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                  <Save className="w-5 h-5" /> {editingCategory ? 'ATUALIZAR' : 'CADASTRAR'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Editar Perfil */}
      <AnimatePresence>
        {showEditProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowEditProfileModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold tracking-tight">Editar Perfil da Loja</h3>
                <button onClick={() => setShowEditProfileModal(false)}>
                  <X className="w-6 h-6 text-soft-white/20 hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome da Loja</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">CNPJ</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.cnpj}
                      onChange={(e) => setProfileForm({...profileForm, cnpj: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Website</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({...profileForm, website: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Endereço Completo</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Regime Tributário (CRT)</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                      value={profileForm.crt}
                      onChange={(e) => setProfileForm({...profileForm, crt: e.target.value})}
                    >
                      <option value="Simples Nacional">Simples Nacional</option>
                      <option value="Regime Normal">Regime Normal</option>
                      <option value="Microempreendedor Individual (MEI)">MEI</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                  <Save className="w-5 h-5" /> SALVAR ALTERAÇÕES
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
};
