import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

import workerDayOffs from '@/store/admin/dayoffs';
import workersReducer from '@/store/admin/workers';
import authReducer from '@/store/auth';
import cartReducer from '@/store/cart';
import searchReducer from '@/store/search';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  search: searchReducer,
  workers: workersReducer,
  dayOffs: workerDayOffs,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
