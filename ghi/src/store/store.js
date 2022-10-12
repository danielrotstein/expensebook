import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { budgetsApi } from './budgetsApi';
import { accountsApi } from './accountsApi';

export const store = configureStore({
  reducer: {
    [budgetsApi.reducerPath]: budgetsApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(budgetsApi.middleware)
      .concat(accountsApi.middleware)
});

setupListeners(store.dispatch);
