import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
    prepareHeaders: (headers, { getState }) => {
      const selector = accountsApi.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set('Authorization', 'Bearer ${tokenData.access_token}')
      }
      return headers;
    }
  }),
  tagTypes: ['BudgetDashboard', 'Account', 'Token', 'Account', 'Token'],
  endpoints: builder => ({
    getAccounts: builder.query({
      query: () => '/accounts',
      providesTags: ['Account'],
    }),
    getOneAccount: builder.query({
      query: (email) => `/accounts/${email}`,
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


export const { 
  useGetAccountsQuery, 
  useGetOneAccountQuery, 
  useCreateAccountsMutation, 
  useCreateTokenMutation, useLogOutMutation,
  useGetTokenQuery,} = accountsApi;
