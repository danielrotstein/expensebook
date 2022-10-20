import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const currencyApi = createApi({
    reducerPath: 'currency',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.exchangerate.host/latest' }),
        endpoints: builder => ({
            getCurrencyRates: builder.query({
                query: (home_country) => `?base=${home_country}`,
            }),
        }),
});

export const { useGetCurrencyRatesQuery } = currencyApi;
