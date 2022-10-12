import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const tokensApi = createApi({
    reducerPath: 'token',
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_FAST_API,
    }),
    tagTypes: ['BudgetDashboard'],
    endpoints: builder => ({
      getTokens: builder.query({
        query: () => '/token',
        providesTags: ['BudgetDashboard'],
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
    }),
  });
    

export const { useGetTokensQuery, useCreateTokenMutation } = tokensApi;  