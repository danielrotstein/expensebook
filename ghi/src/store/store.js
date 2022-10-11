import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountsApi } from './accountsApi';

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(accountsApi.middleware)
});

setupListeners(store.dispatch);
