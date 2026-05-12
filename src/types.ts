export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'pix' | 'cash' | 'credit' | 'debit';
  timestamp: Date;
}
