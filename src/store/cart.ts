import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CartItem = Product | Service;

const initialCartState = {
  items: [] as CartItem[],
  totalPrice: 0,
  discount: null as CouponCode | null,
  worker: null as string | null,
  date: null as string | null,
  user: null as User | null,
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
      action: PayloadAction<{businessID: string; item: CartItem}>,
    ) => {
      const {businessID, item} = action.payload;
      if (!state.carts[businessID]) {
        state.carts[businessID] = {...initialCartState};
      }
      state.carts[businessID] = {
        ...state.carts[businessID],
        items: [...state.carts[businessID].items, item],
        totalPrice: state.carts[businessID].totalPrice + Number(item.price),
      };
    },
    removeFromCart: (
      state,
      action: PayloadAction<{businessID: string; itemId: string}>,
    ) => {
      const {businessID, itemId} = action.payload;
      if (state.carts[businessID]) {
        const itemIndex = state.carts[businessID].items.findIndex(
          item => item._id === itemId,
        );
        if (itemIndex !== -1) {
          state.carts[businessID].totalPrice -= Number(
            state.carts[businessID].items[itemIndex].price,
          );
          state.carts[businessID].items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state, action: PayloadAction<{businessID: string}>) => {
      const {businessID} = action.payload;
      delete state.carts[businessID];
    },
    applyDiscount: (
      state,
      action: PayloadAction<{businessID: string; discount: CouponCode}>,
    ) => {
      const {businessID, discount} = action.payload;
      state.carts[businessID].discount = discount;
    },
    clearDiscount: (state, action: PayloadAction<{businessID: string}>) => {
      const {businessID} = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].discount = null;
      }
    },
    clearAllCarts: state => {
      state.carts = {};
    },
    setCartDate: (
      state,
      action: PayloadAction<{
        businessID: string;
        date: string | null;
        workerID: string | null;
      }>,
    ) => {
      const {businessID, date, workerID} = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].date = date;
        state.carts[businessID].worker = workerID;
      }
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
  setCartDate,
} = cartSlice.actions;

export default cartSlice.reducer;
