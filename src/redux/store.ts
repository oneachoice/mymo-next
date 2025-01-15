import { configureStore } from "@reduxjs/toolkit";

import signReducer from "@/redux/signSlice";

/** 리덕스 store입니다. */
export const store = configureStore({
    reducer: {
        sign: signReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch