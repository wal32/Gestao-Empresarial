import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export enum OperationType {
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
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dataService = {
  // Products
  subscribeProducts: (businessId: string, callback: (products: any[]) => void) => {
    const path = `businesses/${businessId}/products`;
    const q = query(collection(db, path), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addProduct: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/products`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  updateProduct: async (businessId: string, productId: string, data: any) => {
    const path = `businesses/${businessId}/products/${productId}`;
    try {
      const docRef = doc(db, path);
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteProduct: async (businessId: string, productId: string) => {
    const path = `businesses/${businessId}/products/${productId}`;
    try {
      const docRef = doc(db, path);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Sales
  addSale: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/sales`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  subscribeSales: (businessId: string, callback: (sales: any[]) => void) => {
    const path = `businesses/${businessId}/sales`;
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  // Customers
  subscribeCustomers: (businessId: string, callback: (customers: any[]) => void) => {
    const path = `businesses/${businessId}/customers`;
    const q = query(collection(db, path), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addCustomer: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/customers`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  deleteCustomer: async (businessId: string, customerId: string) => {
    const path = `businesses/${businessId}/customers/${customerId}`;
    try {
      const docRef = doc(db, path);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  updateCustomer: async (businessId: string, customerId: string, data: any) => {
    const path = `businesses/${businessId}/customers/${customerId}`;
    try {
      const docRef = doc(db, path);
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Financial transactions
  addTransaction: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/finance`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  subscribeTransactions: (businessId: string, callback: (transactions: any[]) => void) => {
    const path = `businesses/${businessId}/finance`;
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  // Categories
  subscribeCategories: (businessId: string, callback: (categories: any[]) => void) => {
    const path = `businesses/${businessId}/categories`;
    const q = query(collection(db, path), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addCategory: async (businessId: string, name: string) => {
    const path = `businesses/${businessId}/categories`;
    try {
      return await addDoc(collection(db, path), {
        name,
        businessId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  updateCategory: async (businessId: string, categoryId: string, name: string) => {
    const path = `businesses/${businessId}/categories/${categoryId}`;
    try {
      const docRef = doc(db, path);
      return await updateDoc(docRef, { name });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteCategory: async (businessId: string, categoryId: string) => {
    const path = `businesses/${businessId}/categories/${categoryId}`;
    try {
      const docRef = doc(db, path);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Invoices (NF-e / NFC-e)
  subscribeInvoices: (businessId: string, callback: (data: any[]) => void) => {
    const path = `businesses/${businessId}/invoices`;
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(docs);
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addInvoice: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/invoices`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  // Business Profile
  subscribeBusiness: (businessId: string, callback: (data: any) => void) => {
    const path = `businesses/${businessId}`;
    const docRef = doc(db, path);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  updateBusiness: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}`;
    const docRef = doc(db, path);
    try {
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      const { setDoc } = await import('firebase/firestore');
      return await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    }
  },

  // Generic Config
  subscribeConfig: (businessId: string, configId: string, callback: (data: any) => void) => {
    const path = `businesses/${businessId}/config/${configId}`;
    const docRef = doc(db, path);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  updateConfig: async (businessId: string, configId: string, data: any) => {
    const path = `businesses/${businessId}/config/${configId}`;
    const docRef = doc(db, path);
    try {
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      const { setDoc } = await import('firebase/firestore');
      return await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    }
  },

  // Fiscal Config (includes Digital Certificate)
  subscribeFiscalConfig: (businessId: string, callback: (data: any) => void) => {
    const path = `businesses/${businessId}/config/fiscal`;
    const docRef = doc(db, path);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  updateFiscalConfig: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/config/fiscal`;
    const docRef = doc(db, path);
    try {
      // We use setDoc indirectly or update with merge
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      // If doc doesn't exist, updateDoc fails.
      // Actually, let's use a pattern that works even if it doesn't exist.
      const { setDoc } = await import('firebase/firestore');
      return await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    }
  }
};
