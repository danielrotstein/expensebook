import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountsApi } from './accountsApi';
import { budgetsApi } from './budgetsApi';
import { currencyApi } from './exchangeRatesApi';
import { expensesApi } from './expensesApi';
import { recommendationsApi } from './recommendationsApi';


export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [budgetsApi.reducerPath]: budgetsApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [recommendationsApi.reducerPath]: recommendationsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(accountsApi.middleware)
      .concat(budgetsApi.middleware)
      .concat(currencyApi.middleware)
      .concat(expensesApi.middleware)
      .concat(recommendationsApi.middleware)
});


setupListeners(store.dispatch);