import { configureStore } from "@reduxjs/toolkit"
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'
import { moviesApi } from './moviesApi'; 

const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
    })

export default store
