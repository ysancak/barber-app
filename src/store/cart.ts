import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CartItem = Product | Service;

const initialCartState = {
  items: [] as CartItem[],
  totalPrice: 0,
  coupon: null as {code: string; discount: Discount} | null,
  worker: null as string | null,
  date: null as {start: string; end: string} | null,
  user: null as {
    name: string;
    surname: string;
    email: string;
    gsm: string;
    street: string;
    nr: string;
    postcode: string;
    ort: string;
    note: string;
  } | null,
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
      action: PayloadAction<{
        businessID: string;
        code: string;
        discount: Discount;
      }>,
    ) => {
      const {businessID, code, discount} = action.payload;
      state.carts[businessID].coupon = {code, discount};
    },
    clearDiscount: (state, action: PayloadAction<{businessID: string}>) => {
      const {businessID} = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].coupon = null;
      }
    },
    clearAllCarts: state => {
      state.carts = {};
    },
    setCartDate: (
      state,
      action: PayloadAction<{
        businessID: string;
        date: {start: string; end: string} | null;
        workerID: string | null;
      }>,
    ) => {
      const {businessID, date, workerID} = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].date = date;
        state.carts[businessID].worker = workerID;
      }
    },
    resetCartDate: (
      state,
      action: PayloadAction<{
        businessID: string;
      }>,
    ) => {
      const {businessID} = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].date = null;
        state.carts[businessID].worker = null;
      }
    },
    setCartUserInfo: (
      state,
      action: PayloadAction<{
        businessID: string;
        name: string;
        surname: string;
        email: string;
        gsm: string;
        street: string;
        nr: string;
        postcode: string;
        ort: string;
        note: string;
      }>,
    ) => {
      const {
        businessID,
        name,
        surname,
        email,
        gsm,
        street,
        nr,
        postcode,
        ort,
        note,
      } = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].user = {
          name,
          surname,
          email,
          gsm,
          street,
          nr,
          postcode,
          ort,
          note,
        };
      }
    },
    resetCartUserInfo: (
      state,
      action: PayloadAction<{
        businessID: string;
      }>,
    ) => {
      const {businessID} = action.payload;
      if (state.carts[businessID]) {
        state.carts[businessID].user = null;
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
  resetCartDate,
  setCartUserInfo,
  resetCartUserInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
