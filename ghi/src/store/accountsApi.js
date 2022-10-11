import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DJANGO_API,
  }),
  endpoints: builder => ({
    getTrucks: builder.query({
      query: () => '/api/accounts/',
    }),
  }),
});

export const { useGetAccountsQuery } = accountsApi;
