import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CartItem = Product | Service;

const initialCartState = {
  items: [] as CartItem[],
  totalPrice: 0,
};

const initialState = {
  carts: {} as Record<string, typeof initialCartState>,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{businessId: string; item: CartItem}>,
    ) => {
      const {businessId, item} = action.payload;
      if (!state.carts[businessId]) {
        state.carts[businessId] = {...initialCartState};
      }
      state.carts[businessId].items.push(item);
      state.carts[businessId].totalPrice += Number(item.price);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{businessId: string; itemId: string}>,
    ) => {
      const {businessId, itemId} = action.payload;
      if (state.carts[businessId]) {
        const itemIndex = state.carts[businessId].items.findIndex(
          item => item._id === itemId,
        );
        if (itemIndex !== -1) {
          state.carts[businessId].totalPrice -= Number(
            state.carts[businessId].items[itemIndex].price,
          );
          state.carts[businessId].items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state, action: PayloadAction<{businessId: string}>) => {
      const {businessId} = action.payload;
      if (state.carts[businessId]) {
        state.carts[businessId] = {...initialCartState};
      }
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
