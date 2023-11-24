import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CartItem = Product | Service;

const initialCartState = {
  items: [] as CartItem[],
  totalPrice: 0,
  discount: null as CouponCode | null,
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
      state.carts[businessId] = {
        ...state.carts[businessId],
        items: [...state.carts[businessId].items, item],
        totalPrice: state.carts[businessId].totalPrice + Number(item.price),
      };
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
      delete state.carts[businessId];
    },
    applyDiscount: (
      state,
      action: PayloadAction<{businessId: string; discount: CouponCode}>,
    ) => {
      const {businessId, discount} = action.payload;
      state.carts[businessId].discount = discount;
    },
    clearDiscount: (state, action: PayloadAction<{businessId: string}>) => {
      const {businessId} = action.payload;
      if (state.carts[businessId]) {
        state.carts[businessId].discount = null;
      }
    },
    clearAllCarts: state => {
      state.carts = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  applyDiscount,
  clearDiscount,
  clearAllCarts,
} = cartSlice.actions;

export default cartSlice.reducer;
