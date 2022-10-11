import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const budgetsApi = createApi({
  reducerPath: 'budgets',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
  endpoints: builder => ({
    getBudgets: builder.query({
      query: () => '/budgets',
    }),
    createBudget: builder.mutation({
      query: data => ({
        url: '/budgets',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});


export const { 
    useGetBudgetsQuery,
    useCreateBudgetMutation, 
} = budgetsApi;
