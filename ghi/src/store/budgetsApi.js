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
        url: '/budgets/',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['BudgetDashboard'],
    }),
    getBudget: builder.query({
      query: (budget_id) => `/budgets/${budget_id}`,
    }),
    getBudgetsByOneUser: builder.query({
      query: (email) => `/budgets/${email}`,
      providesTags: ['BudgetDashboard'],
    }),
    deleteBudget: builder.mutation({
      query: (budget_id) => ({
        url: `/budgets/id=${budget_id}`,
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ['BudgetDashboard'],
    }),
    updateBudget: builder.mutation({
      query(data) {
        const { budget_id, ...body } = data
        return {
          url: `/budgets/id=${budget_id}`,
          body,
          method: 'PUT',
        }
      },
      invalidatesTags: ['BudgetDashboard'],
    }),
  }),
});


export const { 
    useGetBudgetsQuery,
    useCreateBudgetMutation,
    useGetBudgetQuery, 
    useGetBudgetsByOneUserQuery,
    useDeleteBudgetMutation,
    useUpdateBudgetMutation,
} = budgetsApi;