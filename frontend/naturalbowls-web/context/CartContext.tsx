'use client';

import { createContext, useContext, useReducer, useEffect, useState, useCallback, ReactNode } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product, CartItem } from '@/lib/schemas';
import { formatPrice } from '@/lib/utils/utils';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.productId === action.product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.product.id
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: `cart-${action.product.id}-${Date.now()}`,
            productId: action.product.id,
            name: action.product.name,
            description: action.product.description,
            ingredients: action.product.ingredients,
            customizations: (action.product as any).customizations,
            price: action.product.price,
            quantity: action.quantity || 1,
            image: action.product.image,
          },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.productId),
      };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.productId !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicializar estado desde localStorage
  const initialState = typeof window !== 'undefined'
    ? (() => {
        try {
          const saved = localStorage.getItem('cart');
          return saved ? JSON.parse(saved) : { items: [] };
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          return { items: [] };
        }
      })()
    : { items: [] };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [toast, setToast] = useState<{ name: string; price: number; quantity: number } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    setToastVisible(true);
    const timer = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToast(null), 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const addItem = useCallback((product: Product, quantity?: number) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
    setToast({ name: product.name, price: product.price, quantity: quantity || 1 });
  }, []);

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}

      {/* Toast de producto agregado */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
            toastVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 bg-[#5D4E37] text-white pl-3 pr-4 py-3 rounded-2xl shadow-2xl border border-[#6B8E4E]/30 max-w-sm">
            <div className="bg-[#6B8E4E] rounded-full p-1.5 shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{toast.name}</p>
              <p className="text-xs text-white/70">
                {toast.quantity > 1 ? `x${toast.quantity} · ` : ''}{formatPrice(toast.price * toast.quantity)} agregado
              </p>
            </div>
            <ShoppingBag className="w-5 h-5 text-[#9CB973] shrink-0" />
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
