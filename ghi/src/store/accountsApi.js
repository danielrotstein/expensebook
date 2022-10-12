import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
  tagTypes: ['BudgetDashboard'],
  endpoints: builder => ({
    getAccounts: builder.query({
      query: () => '/accounts',
      providesTags: ['BudgetDashboard'],
    }),
    createAccounts: builder.mutation({
      query: data => ({
        url: '/token',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['BudgetDashboard'],
    }),
  }),
});
  

export const { useGetAccountsQuery, useCreateAccountsMutation } = accountsApi;
