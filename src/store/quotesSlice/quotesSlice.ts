import { createEntityAdapter, createSlice, nanoid, type EntityState, type PayloadAction } from '@reduxjs/toolkit';
import { type IAsyncSlice } from '../types';
import { fetchQuotes } from './thunks';
import type { RootState } from '../store';

export type TQuote = {
    index: number | undefined,
    id: string,
    text: string,
    author: string,
};
export interface IQuoteState extends IAsyncSlice, EntityState<TQuote, string> {
};

const quotesAdapter = createEntityAdapter<TQuote>({
    sortComparer: (a, b) => a.author[0].localeCompare(b.author[0])
})
const initialState: IQuoteState = quotesAdapter.getInitialState({
    status: 'idle',
    error: undefined,
    // ...(getLS('quotes', AppLSOptions))
});
const quotesSlice = createSlice({
    name: 'quotes',
    initialState: initialState,
    reducers: {
        quoteUpdated: (state, action: PayloadAction<TQuote>) => {
            const { id, text, author } = action.payload
            quotesAdapter.updateOne(state, { id, changes: { text, author } })
        },
        quoteAdded: {
            reducer: (state, action: PayloadAction<TQuote>) => {
                quotesAdapter.addOne(state, action.payload);
            },
            prepare: (text: string, author: string) => {
                return {
                    payload: {
                        index: undefined,
                        text,
                        author,
                        id: nanoid()
                    }
                }
            }
           },
        quoteRemoved: (state, action: PayloadAction<{ id: string }>) => {
            quotesAdapter.removeOne(state, action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchQuotes.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchQuotes.fulfilled, (state, action) => {
            state.status = "completed";
            quotesAdapter.setAll(state, action.payload);
        })
        .addCase(fetchQuotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    },
});

export const { quoteAdded, quoteUpdated, quoteRemoved } = quotesSlice.actions;


//Selectors
export const {
  selectAll: selectAllQuotes,
  selectById: selectQuotesById,
  selectIds: selectQuotesIds
  // Pass in a selector that returns the posts slice of state
} = quotesAdapter.getSelectors((state: RootState) => state.quotes);

// export const selectPostsByUser = createSelector(
//   [selectAllQuotes, (state: RootState, userId: string) => userId],
//   (posts, userId) => posts.filter(post => post.user === userId)
// )

export default quotesSlice;