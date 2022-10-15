import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const budgetsApi = createApi({
  reducerPath: 'budgets',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
  tagTypes: ['BudgetDashboard'],
  endpoints: builder => ({
    getBudgets: builder.query({
      query: () => '/budgets',
      providesTags: ['BudgetDashboard'],
    }),
    createBudget: builder.mutation({
      query: data => ({
        url: '/budgets',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['BudgetDashboard'],
    }),
    getBudget: builder.query({
      query: (budgetId) => `/budgets/${budgetId}`,
    })
  }),
});

export const { 
    useGetBudgetsQuery,
    useCreateBudgetMutation,
    useGetBudgetQuery, 
} = budgetsApi;
