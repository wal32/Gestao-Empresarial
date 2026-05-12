import React from 'react';
import { 
  BadgeDollarSign, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { useState, useEffect } from 'react';

const data = [
  { name: 'Seg', sales: 4000 },
  { name: 'Ter', sales: 3000 },
  { name: 'Qua', sales: 2000 },
  { name: 'Qui', sales: 2780 },
  { name: 'Sex', sales: 1890 },
  { name: 'Sab', sales: 4390 },
  { name: 'Dom', sales: 3490 },
];

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <div className="bg-graphite p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
    <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10", color)}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-white/5 rounded-lg">
        <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
      </div>
      {trend != null && (
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", trend > 0 ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500")}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="text-soft-white/60 text-xs font-medium uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export const DashboardPage = () => {
  const { businessId } = useAuth();
  const [salesData, setSalesData] = useState<any[]>([]);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) return;
    
    const unsubs = [
      dataService.subscribeSales(businessId, (data) => {
        setSalesData(data);
        setLoading(false);
      }),
      dataService.subscribeProducts(businessId, setInventoryData)
    ];

    return () => unsubs.forEach(u => u());
  }, [businessId]);

  const todaySales = salesData
    .filter(s => {
      const date = s.timestamp?.toDate ? s.timestamp.toDate() : new Date();
      return date.toDateString() === new Date().toDateString();
    })
    .reduce((acc, curr) => acc + curr.total, 0);

  const lowStockCount = inventoryData.filter(p => p.stock <= (p.minStock || 5)).length;
  const avgTicket = salesData.length > 0 ? (salesData.reduce((acc, curr) => acc + curr.total, 0) / salesData.length) : 0;

  // Chart aggregation
  const chartPoints = Object.values(salesData.reduce((acc: any, sale) => {
    const d = sale.timestamp?.toDate ? sale.timestamp.toDate() : new Date();
    const key = d.toLocaleDateString('pt-BR', { weekday: 'short' });
    if (!acc[key]) acc[key] = { name: key, sales: 0 };
    acc[key].sales += sale.total;
    return acc;
  }, {})).slice(-7);

  const handleRefresh = () => {
    setLoading(true);
    // Real-time listeners are already active, so we just provide visual feedback
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Painel Administrativo 👋</h1>
          <p className="text-soft-white/60">Monitore o desempenho do Gestão Empresarial em tempo real.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={handleRefresh}
            className="flex-1 sm:flex-none px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Atualizar
          </button>
          <Link to="/pdv" className="flex-1 sm:flex-none px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            Frente de Caixa
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Vendas Hoje" value={`R$ ${todaySales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={BadgeDollarSign} color="bg-neon-green" trend={todaySales > 0 ? 100 : 0} />
        <StatCard label="Ticket Médio" value={`R$ ${avgTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={TrendingUp} color="bg-gold" trend={5} />
        <StatCard label="Vendas Totais" value={salesData.length} icon={Users} color="bg-blue-500" />
        <StatCard label="Estoque Baixo" value={`${lowStockCount} Itens`} icon={AlertCircle} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-graphite p-6 rounded-3xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Fluxo de Caixa Recente</h2>
            <Link to="/financeiro" className="text-xs text-neon-green hover:underline font-bold uppercase tracking-widest flex items-center gap-2">
              Ver Detalhes <TrendingUp className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartPoints.length > 0 ? chartPoints : [ {name: 'Seg', sales: 0}, {name: 'Dom', sales: 0} ]}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#CCFF00' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#CCFF00" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-graphite p-6 rounded-3xl border border-white/5 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-neon-green/20 rounded-lg">
                <Sparkles className="w-4 h-4 text-neon-green" />
            </div>
            <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-sm">Flow Intelligence</h2>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm space-y-2 border-l-2 border-l-neon-green">
              <p className="text-soft-white/80 leading-relaxed font-semibold">Análise de Comportamento</p>
              <p className="text-soft-white/50 text-xs">O setor de Padaria teve pico de vendas às 07:30. Sugerimos dobrar a produção de Pão Francês nas quartas.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm space-y-2">
              <p className="text-soft-white/80 leading-relaxed font-semibold">Risco de Ruptura</p>
              <p className="text-soft-white/50 text-xs">"Café Especial 500g" acabará em 2 dias se o ritmo de venda continuar. Pedido de reposição sugerido.</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between p-4 bg-neon-green/5 rounded-2xl border border-neon-green/10">
            <div className="text-xs text-soft-white/70">Score Operacional</div>
            <div className="text-neon-green font-bold text-lg">9.4</div>
          </div>
        </div>
      </div>
    </div>
  )
};
