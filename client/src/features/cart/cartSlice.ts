import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ index: number }>) => {
      state.items = state.items.filter((_, index) => index !== action.payload.index);
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ index: number; quantity: number }>) => {
      const { index, quantity } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity = quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
