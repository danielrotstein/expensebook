import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { budgetsApi } from './budgetsApi';
import { accountsApi } from './accountsApi';
import { tokensApi } from './tokensApi';

export const store = configureStore({
  reducer: {
    [budgetsApi.reducerPath]: budgetsApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [tokensApi.reducerPath]: tokensApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(budgetsApi.middleware)
      .concat(accountsApi.middleware)
      .concat(tokensApi.middleware)
});

setupListeners(store.dispatch);
