import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
  tagTypes: ['BudgetDashboard', 'Account', 'Token'],
  endpoints: builder => ({
    getAccounts: builder.query({
      query: () => '/accounts',
      providesTags: ['Account'],
    }),
    createAccounts: builder.mutation({
      query: data => ({
        url: '/accounts',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Account'],
    }),
    createToken: builder.mutation({
      query: data => ({
        url: '/token',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Token'],
    }),
    getToken: builder.query({
      query: () => ({
        url: '/token',
        credentials: 'include',
      }),
      providesTags: ['Token'],
    }),
  }),
});


export const { 
  useGetAccountsQuery, 
  useCreateAccountsMutation, 
  useCreateTokenMutation,
  usegetTokenQuery,} = accountsApi;
