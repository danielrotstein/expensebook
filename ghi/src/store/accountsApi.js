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
      providesTags: ['BudgetDashboard'],
    }),
    createAccounts: builder.mutation({
      query: data => ({
        url: '/accounts',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['BudgetDashboard'],
    }),
    createToken: builder.mutation({
      query: data => ({
        url: '/token',
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['BudgetDashboard'],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/token',
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ['Token'],
    })
  }),
});


export const { useGetAccountsQuery, useCreateAccountsMutation, useCreateTokenMutation, useLogOutMutation } = accountsApi;

