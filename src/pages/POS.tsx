import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Minus, 
  Plus, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Receipt,
  ScanLine,
  X,
  Printer,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Product, SaleItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { useEffect } from 'react';

export const POSPage = () => {
  const navigate = useNavigate();
  const { businessId, isPro, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [cashReceived, setCashReceived] = useState<number | string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<{ name: string, id: string } | null>(null);
  const [products, setProducts] = useState<SaleItem[]>([]);
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);

  useEffect(() => {
    if (!loading && !isPro) {
      navigate('/upgrade');
    }
  }, [isPro, loading, navigate]);


  useEffect(() => {
    if (!businessId) return;
    const unsubProducts = dataService.subscribeProducts(businessId, (data) => {
      setProducts(data as SaleItem[]);
    });
    const unsubInterface = dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
    
    return () => {
      unsubProducts();
      unsubInterface();
    };
  }, [businessId]);

  // Handle barcode scanning automatically
  useEffect(() => {
    if (!searchTerm) return;
    
    // Check if searchTerm matches an exact SKU/barcode
    const matchedProduct = products.find(p => p.sku === searchTerm);
    if (matchedProduct) {
      addToCart(matchedProduct as unknown as Product);
      setSearchTerm(''); // Clear search after adding
    }
  }, [searchTerm, products]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.includes(searchTerm)
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const change = paymentMethod === 'cash' && Number(cashReceived) >= total 
    ? Number(cashReceived) - total 
    : 0;

  const [isFinishing, setIsFinishing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isAskingPrint, setIsAskingPrint] = useState(false);
  const [completedSale, setCompletedSale] = useState<{ 
    id: string, 
    total: number, 
    items: SaleItem[], 
    method: string,
    cashReceived?: number | null,
    change?: number | null,
    customer?: { name: string, id: string } | null
  } | null>(null);

  const handleFinishSale = async () => {
    if (!businessId) return;
    setIsFinishing(true);
    
    const saleData = {
      total,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: paymentMethod || '',
      cashReceived: paymentMethod === 'cash' ? Number(cashReceived) : null,
      change: paymentMethod === 'cash' ? change : null,
      customer: selectedCustomer
    };

    try {
      const saleRef = await dataService.addSale(businessId, saleData);
      
      setCompletedSale({
        ...saleData,
        id: saleRef?.id.slice(-6).toUpperCase() || Math.floor(Math.random() * 999999).toString().padStart(6, '0'),
        method: paymentMethod || ''
      });
      
      // Add balance to finance
      await dataService.addTransaction(businessId, {
        amount: total,
        type: 'income',
        category: 'Venda PDV',
        description: `Venda #${saleRef?.id.slice(-6).toUpperCase()}`,
        saleId: saleRef?.id
      });

      setIsFinishing(false);
      setShowReceipt(true);
      setIsAskingPrint(true);
      setCart([]);
      setPaymentMethod(null);
      setCashReceived('');
    } catch (error) {
      setIsFinishing(false);
      alert('Erro ao salvar venda. Verifique sua conexão.');
    }
  };

  const handlePrint = () => {
    if (!completedSale) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const receiptContent = `
      <html>
        <head>
          <title>Cupom Fiscal - Gestão Empresarial</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 0; padding: 2mm; }
            }
            body { 
              font-family: 'Courier New', Courier, monospace; 
              width: 80mm; 
              margin: 0 auto;
              font-size: 13px;
              line-height: 1.5;
              color: #000;
              background: #fff;
              padding: 4mm;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .header { margin-bottom: 5mm; border-bottom: 1px dashed #000; padding-bottom: 3mm; }
            .store-name { font-size: 18px; margin: 0; letter-spacing: 1px; }
            .line { display: flex; justify-content: space-between; gap: 2mm; width: 100%; }
            .items { margin: 3mm 0; }
            .item-row { margin-bottom: 2mm; border-bottom: 0.5px solid #eee; padding-bottom: 1mm; }
            .total-section { margin-top: 3mm; border-top: 2px double #000; padding-top: 3mm; font-size: 15px; }
            .footer { margin-top: 6mm; border-top: 1px dashed #000; padding-top: 3mm; text-align: center; font-size: 11px; }
            .customer-info { margin: 3mm 0; padding: 3mm; border: 1px solid #000; font-size: 12px; background: #f9f9f9; }
            .divider { border-top: 1px dashed #000; margin: 3mm 0; }
            .price-calc { font-size: 11px; color: #333; margin-top: 0.5mm; }
          </style>
        </head>
        <body>
          <div class="header center">
            <p class="store-name bold uppercase">MERCADOFLOW ERP</p>
            <p class="bold leading-tight">Supermercado Silva</p>
            <p>CNPJ: 12.345.678/0001-90</p>
            <p>Rua das Flores, 123 - São Paulo/SP</p>
            <p class="divider"></p>
            <p class="bold">CUPOM DE VENDA (NÃO FISCAL)</p>
            <p>Data: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}</p>
            <p>Venda: #${completedSale.id}</p>
          </div>
          
          ${completedSale.customer ? `
          <div class="customer-info">
            <p class="bold uppercase">Cliente:</p>
            <p>${completedSale.customer.name}</p>
            <p>Doc: ${completedSale.customer.id}</p>
          </div>
          ` : ''}

          <div class="items">
            <div class="line bold">
              <span>DESCRIÇÃO</span>
              <span>TOTAL</span>
            </div>
            ${completedSale.items.map(item => `
              <div class="item-row">
                <div class="line">
                  <span class="bold">${item.name.toUpperCase()}</span>
                  <span class="bold">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="price-calc">
                  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2)}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="total-section">
            <div class="line bold">
              <span>VALOR BRUTO</span>
              <span>R$ ${completedSale.total.toFixed(2)}</span>
            </div>
            <div class="line">
                <span>PAGAMENTO (${completedSale.method.toUpperCase()})</span>
            </div>
            
            ${completedSale.method === 'cash' ? `
              <div class="line">
                <span>RECEBIDO:</span>
                <span>R$ ${completedSale.cashReceived?.toFixed(2)}</span>
              </div>
              <div class="line bold">
                <span>TROCO:</span>
                <span>R$ ${completedSale.change?.toFixed(2)}</span>
              </div>
            ` : ''}

            <div class="line bold" style="font-size: 15px; margin-top: 2mm;">
              <span>TOTAL PAGO</span>
              <span>R$ ${completedSale.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Volte Sempre!</p>
            <p>Desenvolvido por Gestão Empresarial v1.0</p>
            <p>www.mercadoflowerp.com.br</p>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };

  const handlePrintOrder = () => {
    if (cart.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const receiptContent = `
      <html>
        <head>
          <title>Conferência de Pedido - Gestão Empresarial</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 0; padding: 2mm; }
            }
            body { 
              font-family: 'Courier New', Courier, monospace; 
              width: 80mm; 
              margin: 0 auto;
              font-size: 13px;
              line-height: 1.5;
              color: #000;
              background: #fff;
              padding: 4mm;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .header { margin-bottom: 5mm; border-bottom: 1px dashed #000; padding-bottom: 3mm; }
            .store-name { font-size: 18px; margin: 0; letter-spacing: 1px; }
            .line { display: flex; justify-content: space-between; gap: 2mm; width: 100%; }
            .items { margin: 3mm 0; }
            .item-row { margin-bottom: 2mm; border-bottom: 0.5px solid #eee; padding-bottom: 1mm; }
            .total-section { margin-top: 3mm; border-top: 2px double #000; padding-top: 3mm; font-size: 15px; }
            .footer { margin-top: 6mm; border-top: 1px dashed #000; padding-top: 3mm; text-align: center; font-size: 11px; }
            .customer-info { margin: 3mm 0; padding: 3mm; border: 1px solid #000; font-size: 12px; background: #f9f9f9; }
            .divider { border-top: 1px dashed #000; margin: 3mm 0; }
            .price-calc { font-size: 11px; color: #333; margin-top: 0.5mm; }
          </style>
        </head>
        <body>
          <div class="header center">
            <p class="store-name bold uppercase">MERCADOFLOW ERP</p>
            <p class="bold">PREVIA DE PEDIDO</p>
            <p>Data: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}</p>
          </div>
          
          ${selectedCustomer ? `
          <div class="customer-info">
            <p class="bold uppercase">Cliente:</p>
            <p>${selectedCustomer.name}</p>
          </div>
          ` : ''}

          <div class="items">
            ${cart.map(item => `
              <div class="item-row">
                <div class="line">
                  <span class="bold">${item.name.toUpperCase()}</span>
                  <span class="bold">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="price-calc">
                  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2)}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="total-section">
            <div class="line bold">
              <span>TOTAL DO PEDIDO</span>
              <span>R$ ${total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Este documento não é cupom fiscal</p>
            <p>Apenas para conferência</p>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };

  return (
    <div className="h-screen flex bg-graphite-dark">
      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceipt && completedSale && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-sm"
              onClick={() => setShowReceipt(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md max-h-[90vh] bg-white text-graphite-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <AnimatePresence>
                {isAskingPrint && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-graphite-dark/95 backdrop-blur-sm flex items-center justify-center p-8 text-center"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto">
                        <Printer className="w-8 h-8 text-neon-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Imprimir Comprovante?</h3>
                        <p className="text-soft-white/60 text-sm mt-2">Deseja enviar para a impressora agora?</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => {
                            handlePrint();
                            setIsAskingPrint(false);
                          }}
                          className="py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                          SIM
                        </button>
                        <button 
                          onClick={() => setIsAskingPrint(false)}
                          className="py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 active:scale-95 transition-all border border-white/10"
                        >
                          NÃO
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-6 text-center shrink-0 border-b border-gray-100">
                <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-3">
                   <Receipt className="w-6 h-6 text-graphite-dark" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Venda Finalizada</h3>
                <p className="text-xs text-gray-500">Comprovante #{completedSale.id}</p>
                {completedSale.customer && (
                  <div className="mt-2 text-[10px] font-bold text-neon-green uppercase bg-neon-green/5 px-2 py-1 rounded-full border border-neon-green/20 w-fit mx-auto">
                    Cliente: {completedSale.customer.name}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2 border-b border-dashed border-gray-200">
                {completedSale.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs font-medium">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 space-y-3 shrink-0">
                 <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-400">
                        <span>Método</span>
                        <span>{completedSale.method}</span>
                    </div>
                    {completedSale.method === 'cash' && (
                      <>
                        <div className="flex justify-between items-center text-xs font-medium text-gray-600">
                            <span>Recebido</span>
                            <span>R$ {completedSale.cashReceived?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-neon-green bg-neon-green/5 p-1 rounded">
                            <span>TROCO</span>
                            <span>R$ {completedSale.change?.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                 </div>
                 
                 <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-sm font-black italic text-gray-400">VALOR TOTAL</span>
                    <span className="text-2xl font-black">R$ {completedSale.total.toFixed(2)}</span>
                 </div>

                 <button 
                  onClick={() => setShowReceipt(false)}
                  className="w-full py-3 bg-graphite-dark text-white font-bold rounded-xl hover:bg-black transition-colors text-sm"
                 >
                   FECHAR COMPROVANTE
                 </button>

                 <div className="flex justify-center gap-6 pt-1">
                    <button 
                      onClick={handlePrint}
                      className="text-[10px] font-bold text-gray-400 hover:text-graphite-dark flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> IMPRIMIR
                    </button>
                    <button className="text-[10px] font-bold text-gray-400 hover:text-graphite-dark flex items-center gap-1.5 transition-colors">
                      <Smartphone className="w-3.5 h-3.5" /> WHATSAPP
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Side: Product Selection */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Pesquisar produto pelo nome ou código de barras..." 
              className="w-full bg-graphite border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-soft-white placeholder:text-soft-white/20 focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-neon-green/10 rounded-lg">
                <ScanLine className="w-5 h-5 text-neon-green" />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedCustomer(selectedCustomer ? null : { name: 'João Silva', id: '123.456.789-00' })}
              className={cn(
                "p-4 border rounded-2xl transition-all flex items-center gap-2",
                selectedCustomer ? "bg-neon-green border-neon-green text-graphite-dark" : "bg-graphite border-white/10 text-soft-white hover:bg-white/5"
              )}
              title={selectedCustomer ? "Remover Cliente" : "Identificar Cliente"}
            >
              <Users className="w-6 h-6" />
              {selectedCustomer && <span className="text-xs font-bold truncate max-w-[100px]">{selectedCustomer.name.split(' ')[0]}</span>}
            </button>
            <button 
              onClick={() => navigate('/')}
              className="p-4 bg-graphite border border-white/10 rounded-2xl hover:bg-white/5 transition-colors"
            >
                <X className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </header>

        
      </div>

      {/* Right Side: Cart and Payment */}
      <div className="w-[420px] bg-graphite border-l border-white/10 flex flex-col shadow-2xl">
        <div className="p-6 border-bottom border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-green/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-neon-green" />
            </div>
            <h2 className="font-bold text-lg">Carrinho</h2>
          </div>
          <div className="text-xs text-soft-white/40 font-mono">#{Math.floor(Math.random() * 99999)}</div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-4 py-4">
          <AnimatePresence mode="popLayout">
            {cart.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key={item.productId}
                className="flex gap-4 items-center group"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1 line-clamp-1">{item.name}</div>
                  <div className="text-xs text-soft-white/40">R$ {item.price.toFixed(2)} / un</div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.productId, -1)} className="p-1 hover:text-neon-green"><Minus className="w-3 h-3" /></button>
                  <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, 1)} className="p-1 hover:text-neon-green"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="text-right w-20">
                  <div className="text-sm font-bold">R$ {(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="opacity-0 group-hover:opacity-100 p-2 text-soft-white/20 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <p>Carrinho vazio</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center px-6 py-3 border-t border-white/5">
          <button 
            onClick={handlePrintOrder}
            disabled={cart.length === 0}
            className="text-[10px] font-bold text-soft-white/40 hover:text-neon-green flex items-center gap-2 transition-colors disabled:opacity-30"
          >
            <Printer className="w-4 h-4" /> IMPRIMIR CONFERÊNCIA
          </button>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-soft-white/60 text-sm">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-soft-white/60 text-sm">
                <span>Desconto</span>
                <span className="text-neon-green">- R$ 0,00</span>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">TOTAL</span>
                <span className="text-3xl font-black text-neon-green">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'pix', icon: Smartphone, label: 'PIX' },
              { id: 'card', icon: CreditCard, label: 'Cartão' },
              { id: 'cash', icon: Banknote, label: 'Dinheiro' },
            ].map(method => (
              <button
                key={method.id}
                onClick={() => {
                  setPaymentMethod(method.id);
                  if (method.id !== 'cash') setCashReceived('');
                }}
                className={cn(
                  "flex flex-col items-center py-3 border rounded-xl transition-all",
                  paymentMethod === method.id 
                    ? "bg-neon-green/20 border-neon-green text-neon-green" 
                    : "bg-white/5 border-white/5 text-soft-white/40 hover:bg-white/10"
                )}
              >
                <method.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold">{method.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {paymentMethod === 'cash' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-soft-white/60 font-bold uppercase tracking-wider">Valor Recebido</span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-soft-white/40">R$</span>
                      <input 
                        type="number"
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-right font-bold w-32 focus:border-neon-green outline-none"
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                        placeholder="0,00"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/5 text-neon-green">
                    <span className="text-xs font-bold uppercase tracking-wider">Troco</span>
                    <span className="text-xl font-black">R$ {change.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleFinishSale}
            className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:grayscale disabled:scale-100" 
            disabled={cart.length === 0 || !paymentMethod || (paymentMethod === 'cash' && (!cashReceived || Number(cashReceived) < total)) || isFinishing}
          >
            {isFinishing ? (
              <div className="w-6 h-6 border-4 border-graphite-dark/30 border-t-graphite-dark rounded-full animate-spin"></div>
            ) : (
              <>
                <Receipt className="w-5 h-5" />
                FINALIZAR VENDA
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
