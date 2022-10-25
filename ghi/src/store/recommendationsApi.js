import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const recommendationsApi = createApi({
  reducerPath: 'recommendations',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
  endpoints: builder => ({
    getRecommendations: builder.query({
      query: () => '/recommendations',
    }),
  }),
});


export const { 
  useGetRecommendationsQuery,
} = recommendationsApi;