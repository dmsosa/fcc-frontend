import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./quotesSlice/quotesSlice";
import todoSlice from "./todoSlice/todoSlice";

export interface IAsyncSlice {
    isLoading: boolean;
    error: string | null;
};

const store = configureStore({
    reducer: {
        quotes: quotesSlice.reducer,
        todo: todoSlice.reducer,
    },
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store;