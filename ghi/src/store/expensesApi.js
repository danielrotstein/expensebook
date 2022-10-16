import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const expensesApi = createApi({
  reducerPath: 'expenses',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
  tagTypes: ['BudgetDetails'],
  endpoints: builder => ({
    getBudgets: builder.query({
      query: () => '/budgets',
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    getExpenses: builder.query({
      query: () => '/expenses',
      // providesTags: ['BudgetDetails'],
    }),
    createExpense: builder.mutation({
      query: data => {
        return {
          url: '/expenses',
          body: data,
          method: 'POST',
          credentials: 'include',
        }
      },
      invalidatesTags: ['BudgetDetails'],
    }),
    getExpense: builder.query({
      query: (expense_id) => `/expenses/${expense_id}`,
    })
  }),
});


export const { 
    useGetBudgetsQuery,
    useGetCategoriesQuery,
    useGetExpensesQuery,
    useCreateExpenseMutation,
    useGetExpenseQuery, 
} = expensesApi;
