import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const updateCart = (state, businessID, updateFn) => {
  if (!state.carts[businessID]) {
    state.carts[businessID] = {...initialCartState};
  }
  updateFn(state.carts[businessID]);
};

type CartItem = Product | Service;
type CartUser = {
  name: string;
  surname: string;
  email: string;
  gsm: string;
  street: string;
  no: string;
  postcode: string;
  ort: string;
  note: string;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
  coupon: {code: string; discount: Discount} | null;
  worker: string | null;
  date: {start: string; end: string} | null;
  user: CartUser | null;
};

export const initialCartState: CartState = {
  items: [],
  totalPrice: 0,
  coupon: null,
  worker: null,
  date: null,
  user: null,
};

export const initialState = {
  carts: {} as Record<string, CartState>,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      {
        payload: {businessID, item},
      }: PayloadAction<{businessID: string; item: CartItem}>,
    ) => {
      updateCart(state, businessID, cart => {
        cart.items.push(item);
        cart.totalPrice += Number(item.price);
      });
    },
    removeFromCart: (
      state,
      {
        payload: {businessID, itemId},
      }: PayloadAction<{businessID: string; itemId: string}>,
    ) => {
      updateCart(state, businessID, cart => {
        const index = cart.items.findIndex(item => item._id === itemId);
        if (index !== -1) {
          cart.totalPrice -= Number(cart.items[index].price);
          cart.items.splice(index, 1);
        }
      });
    },
    clearCart: (
      state,
      {payload: {businessID}}: PayloadAction<{businessID: string}>,
    ) => {
      delete state.carts[businessID];
    },
    applyDiscount: (
      state,
      {
        payload: {businessID, code, discount},
      }: PayloadAction<{businessID: string; code: string; discount: Discount}>,
    ) => {
      updateCart(state, businessID, cart => {
        cart.coupon = {code, discount};
      });
    },
    clearDiscount: (
      state,
      {payload: {businessID}}: PayloadAction<{businessID: string}>,
    ) => {
      updateCart(state, businessID, cart => {
        cart.coupon = null;
      });
    },
    setCartDate: (
      state,
      {
        payload: {businessID, date, workerID},
      }: PayloadAction<{
        businessID: string;
        date: {start: string; end: string} | null;
        workerID: string | null;
      }>,
    ) => {
      updateCart(state, businessID, cart => {
        cart.date = date;
        cart.worker = workerID;
      });
    },
    setCartUserInfo: (
      state,
      {
        payload: {businessID, ...userInfo},
      }: PayloadAction<{
        businessID: string;
        name: string;
        surname: string;
        email: string;
        gsm: string;
        street: string;
        no: string;
        postcode: string;
        ort: string;
        note: string;
      }>,
    ) => {
      console.log(userInfo);
      updateCart(state, businessID, cart => {
        cart.user = userInfo as CartUser;
      });
    },
    resetCartDate: (
      state,
      {payload: {businessID}}: PayloadAction<{businessID: string}>,
    ) => {
      updateCart(state, businessID, cart => {
        cart.date = null;
        cart.worker = null;
      });
    },
    resetCartUserInfo: (
      state,
      {payload: {businessID}}: PayloadAction<{businessID: string}>,
    ) => {
      updateCart(state, businessID, cart => {
        cart.user = null;
      });
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
  setCartDate,
  resetCartDate,
  setCartUserInfo,
  resetCartUserInfo,
  clearAllCarts,
} = cartSlice.actions;

export default cartSlice.reducer;
