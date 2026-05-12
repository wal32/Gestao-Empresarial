import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  BadgeDollarSign, 
  Users, 
  FileText, 
  Settings, 
  Bell,
  Search,
  Store,
  TrendingUp,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Page Imports
import { DashboardPage } from './pages/Dashboard';
import { POSPage } from './pages/POS';
import { InventoryPage } from './pages/Inventory';
import { FinancePage } from './pages/Finance';
import { CRMPage } from './pages/CRM';
import { InvoicesPage } from './pages/Invoices';
import { SettingsPage } from './pages/Settings';
import { UpgradePage } from './pages/Upgrade';
import { LoginPage } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { dataService } from './services/dataService';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-graphite-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <LoginPage />;
  }
  
  return <>{children}</>;
};

const SidebarItem = ({ icon: Icon, label, path, active, locked }: any) => (
  <Link 
    to={locked ? '#' : path}
    onClick={(e) => locked && e.preventDefault()}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-neon-green text-graphite-dark font-semibold shadow-[0_0_15px_rgba(204,255,0,0.3)]" 
        : "text-soft-white/60 hover:text-neon-green hover:bg-white/5",
      locked && "opacity-50 cursor-not-allowed hover:!bg-transparent hover:!text-soft-white/60"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-graphite-dark" : "group-hover:scale-110 transition-transform")} />
    <span>{label}</span>
    {locked && <span className="ml-auto text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded-full">PRO</span>}
  </Link>
);

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isPro } = useAuth();
  const isPDV = pathname === '/pdv';

  if (isPDV) return null;
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShoppingCart, label: 'PDV', path: '/pdv', locked: !isPro },
    { icon: Package, label: 'Estoque', path: '/estoque' },
    { icon: BadgeDollarSign, label: 'Financeiro', path: '/financeiro' },
    { icon: Users, label: 'Clientes', path: '/clientes' },
    { icon: FileText, label: 'Notas Fiscais', path: '/notas' },
    { icon: Settings, label: 'Ajustes', path: '/ajustes' },
  ];

  return (
    <aside className="w-64 h-screen bg-graphite border-r border-white/5 flex flex-col p-4 sticky top-0 hidden lg:flex">
      <div className="flex items-center gap-2 px-4 mb-10">
        <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center">
            <Store className="text-graphite-dark w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none tracking-tight">Gestão Empresarial</h1>
          <span className="text-[10px] text-neon-green font-mono uppercase tracking-widest">ERP PREMIUM</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.path} 
            {...item} 
            active={pathname === item.path} 
          />
        ))}
      </nav>

      <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5 overflow-hidden relative text-center">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-neon-green/10 blur-2xl rounded-full"></div>
        <div className="flex items-center justify-center gap-2 text-gold mb-2 relative z-10">
          <TrendingUp className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Acesso Pro</span>
        </div>
        <button 
          onClick={() => navigate('/upgrade')}
          className="w-full py-2 bg-white/10 hover:bg-neon-green hover:text-graphite-dark text-[10px] rounded-lg transition-all font-bold relative z-10 uppercase tracking-widest flex items-center justify-center">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

const Topbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isPDV = location.pathname === '/pdv';

  if (isPDV) return null;

  return (
    <header className="h-16 border-b border-white/5 bg-graphite-dark/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
           <input 
            type="text" 
            placeholder="Pesquisa rápida..." 
            className="w-full bg-white/5 border border-white/5 rounded-xl py-1.5 pl-10 pr-4 text-xs outline-none focus:border-neon-green/50 transition-all"
           />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-soft-white/60 hover:text-soft-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-green rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <div className="relative group">
          <button className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-bold leading-none">{user?.displayName || 'Usuário'}</div>
              <div className="text-[10px] text-neon-green font-mono uppercase">Loja Principal</div>
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 overflow-hidden group-hover:border-neon-green transition-all">
               <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=CCFF00&color=1C1C1C`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown className="w-4 h-4 text-soft-white/30 group-hover:text-neon-green transition-all" />
          </button>
          
          <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="bg-graphite border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[160px]">
              <button 
                onClick={() => logout()}
                className="w-full px-4 py-3 text-left text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
              >
                Encerrar Sessão
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const { businessId } = useAuth();
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
  }, [businessId]);

  const isDark = interfaceConfig?.darkMode !== false; // Default to dark if not set or set to true

  useEffect(() => {
    if (!isDark) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isDark]);

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeManager>
          <ProtectedRoute>
            <div className="flex min-h-screen bg-graphite-dark text-soft-white">
              <Sidebar />
              <div className="flex-1 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/pdv" element={<POSPage />} />
                    <Route path="/estoque" element={<InventoryPage />} />
                    <Route path="/financeiro" element={<FinancePage />} />
                    <Route path="/clientes" element={<CRMPage />} />
                    <Route path="/notas" element={<InvoicesPage />} />
                    <Route path="/ajustes" element={<SettingsPage />} />
                    <Route path="/upgrade" element={<UpgradePage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        </ThemeManager>
      </AuthProvider>
    </BrowserRouter>
  );
}

