import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
  X,
  Package,
  Edit2,
  Trash2,
  Save,
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { exportToCSV } from '../lib/exportUtils';

export const InventoryPage = () => {
  const { businessId } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    barcode: '',
    costPrice: '',
    price: '',
    stock: '',
    minStock: '',
    category: ''
  });

  useEffect(() => {
    if (!businessId) return;
    const unsubProducts = dataService.subscribeProducts(businessId, setProducts);
    const unsubCategories = dataService.subscribeCategories(businessId, setCategories);
    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, [businessId]);

  const handleAddCategory = async () => {
    if (!businessId || !newCategoryName.trim()) return;
    await dataService.addCategory(businessId, newCategoryName.trim());
    setNewCategoryName('');
    setShowNewCategoryInput(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    await dataService.addProduct(businessId, {
      ...newProduct,
      costPrice: Number(newProduct.costPrice) || 0,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      minStock: Number(newProduct.minStock)
    });

    setNewProduct({ name: '', sku: '', barcode: '', costPrice: '', price: '', stock: '', minStock: '', category: '' });
    setShowAddModal(false);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      sku: product.sku || '',
      barcode: product.barcode || '',
      costPrice: (product.costPrice || '').toString(),
      price: product.price.toString(),
      stock: product.stock.toString(),
      minStock: (product.minStock || '').toString(),
      category: product.category || ''
    });
    setShowEditModal(true);
    setActiveMenuId(null);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId || !editingProduct) return;

    await dataService.updateProduct(businessId, editingProduct.id, {
      ...newProduct,
      costPrice: Number(newProduct.costPrice) || 0,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      minStock: Number(newProduct.minStock)
    });

    setNewProduct({ name: '', sku: '', barcode: '', costPrice: '', price: '', stock: '', minStock: '', category: '' });
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!businessId) return;
    await dataService.deleteProduct(businessId, productId);
    setProductToDelete(null);
    setActiveMenuId(null);
  };

  const handleExportCSV = () => {
    const dataToExport = products.map(p => ({
      Nome: p.name,
      SKU: p.sku || '',
      'Código de Barras': p.barcode || '',
      Categoria: p.category || 'Geral',
      'Preço de Custo': p.costPrice || 0,
      'Preço de Venda': p.price,
      Estoque: p.stock,
      'Estoque Mínimo': p.minStock || 5
    }));
    exportToCSV(dataToExport, `inventario-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.includes(searchTerm);
    if (!matchesSearch) return false;

    if (activeTab === 'low') return p.stock <= (p.minStock || 5);
    if (activeTab === 'out') return p.stock === 0;
    return true;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Controle de Estoque</h1>
          <p className="text-soft-white/60">Gerencie seus produtos, fornecedores e níveis de estoque.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </header>

      {/* Modal Adição/Edição */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setEditingProduct(null);
              }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/10 rounded-xl">
                    <Package className="w-5 h-5 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold">{showEditModal ? 'Editar Produto' : 'Novo Produto'}</h3>
                </div>
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }} 
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-soft-white/40" />
                </button>
              </div>

              <form onSubmit={showEditModal ? handleUpdateProduct : handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome do Produto</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">SKU / Código</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.sku} onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Código de Barras</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.barcode} onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Preço de Custo</label>
                    <input type="number" step="0.01" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.costPrice} onChange={(e) => setNewProduct({...newProduct, costPrice: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Preço de Venda</label>
                    <input type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Estoque Atual</label>
                    <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Esq. Mínimo</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.minStock} onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Categoria</label>
                    <div className="flex gap-2">
                      <select 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        <option value="" className="bg-graphite">Selecione uma categoria</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name} className="bg-graphite">{cat.name}</option>
                        ))}
                      </select>
                      <button 
                        type="button"
                        onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                        className="px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-neon-green"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    {showNewCategoryInput && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-4 bg-white/5 rounded-xl border border-white/10 space-y-3"
                      >
                        <p className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nova Categoria</p>
                        <div className="flex gap-2">
                          <input 
                            className="flex-1 bg-white/5 border border-neon-green/30 rounded-lg py-2 px-3 text-sm outline-none focus:border-neon-green" 
                            placeholder="Nome da categoria"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                          />
                          <button 
                            type="button"
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-neon-green text-graphite-dark font-bold rounded-lg text-xs"
                          >
                            GERAR
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2">
                  {showEditModal ? <><Save className="w-5 h-5"/> SALVAR ALTERAÇÕES</> : 'ADICIONAR AO INVENTÁRIO'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Deletar */}
      <AnimatePresence>
        {productToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setProductToDelete(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excluir Produto?</h3>
              <p className="text-soft-white/60 mb-8 text-sm">Esta ação não pode ser desfeita. O produto será removido permanentemente do estoque.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setProductToDelete(null)}
                  className="py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  CANCELAR
                </button>
                <button 
                  onClick={() => handleDeleteProduct(productToDelete)}
                  className="py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                >
                  EXCLUIR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit">
        {['all', 'low', 'out'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider",
              activeTab === tab ? "bg-white/10 text-neon-green" : "text-soft-white/40 hover:text-soft-white"
            )}
          >
            {tab === 'all' ? 'Todos' : tab === 'low' ? 'Estoque Baixo' : 'Esgotados'}
          </button>
        ))}
      </div>

      <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Buscar por nome, SKU ou categoria..." 
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
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Produto</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Categoria</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Preço</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Qty</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map(product => {
                const isLow = product.stock <= (product.minStock || 5);
                const isOut = product.stock === 0;

                return (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-[10px] font-mono text-soft-white/30">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-white/5 border border-white/5 rounded-lg text-soft-white/60">
                        {product.category || 'Geral'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-sm">R$ {product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={cn("font-bold text-sm", isLow ? "text-orange-500" : "")}>{product.stock} un</span>
                        <span className="text-[10px] text-soft-white/30">Min: {product.minStock || 5}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isOut ? (
                        <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3" /> Esgotado
                        </div>
                      ) : isLow ? (
                        <div className="flex items-center gap-1.5 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3" /> Reposição
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-neon-green text-[10px] font-bold uppercase tracking-wider">
                          Saudável
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === product.id ? null : product.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all"
                        >
                          <MoreVertical className="w-4 h-4 text-soft-white/60" />
                        </button>
                        
                        <AnimatePresence>
                          {activeMenuId === product.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                                className="absolute right-full top-0 mr-2 w-48 bg-graphite border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                              >
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold flex items-center gap-3 hover:bg-white/5 transition-colors"
                                >
                                  <Edit2 className="w-4 h-4 text-neon-green" /> Alterar
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setProductToDelete(product.id); }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold flex items-center gap-3 hover:bg-red-500/10 text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" /> Excluir
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold flex items-center gap-3 hover:bg-white/5 transition-colors border-t border-white/5"
                                >
                                  <Save className="w-4 h-4 text-blue-400" /> Salvar
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};
