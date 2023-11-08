import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Songs {

}

const createRequest = (url: string) => ({ url });

console.log(import.meta.env.ITUNES_API_URL);

export const SongsApi = createApi({
    reducerPath: "itunes",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://itunes.apple.com",
    }),
    endpoints: (builder) => ({
        getSongs: builder.query({
            query: (term: string) => createRequest(`/search?term=${term}`)
        }),
    })
})

export const {
    useGetSongsQuery
} = SongsApi;

const store = configureStore({
    reducer: {
        [SongsApi.reducerPath]: SongsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SongsApi.middleware)
})

export default store;