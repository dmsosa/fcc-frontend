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
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;