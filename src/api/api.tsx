import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AlbumType, PhotoType} from "api/types";

const baseURL = 'https://jsonplaceholder.typicode.com'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    endpoints: builder => {
        return {
            getPhotos: builder.query<AlbumType, number | undefined>({
                query: (page) => {
                    return {
                        url: '/albums/1/photos',
                        params: {
                            _page: page,
                            _limit: 10
                        }
                    }
                },
                transformResponse: (response: PhotoType[],_,arg) => {
                    const photosWithSubscription = response.map((photo) => ({
                        ...photo,
                        subscription: false,

                    }));
                    return {album:photosWithSubscription, page: arg ?? 1};
                },
                serializeQueryArgs: ({endpointName}) => {
                    return endpointName;
                },
                merge: (currentCacheData, newItems) => {
                    if (newItems.page === 1) {
                        currentCacheData.page = newItems.page;
                        currentCacheData.album = newItems.album;
                    }
                    if (currentCacheData.page !== newItems.page) {
                        currentCacheData.page = newItems.page;
                        currentCacheData.album.push(...newItems.album);
                    }
                },
            }),
        }
    }
})

export const {
    useGetPhotosQuery
} = api;