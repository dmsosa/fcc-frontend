import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAsyncSlice } from '../types';
import { v4 } from 'uuid';
import { fetchQuotes } from './thunks';
import type { RootState } from '../store';

export type TQuote = {
    index: number | undefined,
    id: string,
    text: string,
    author: string,
};
export interface IQuoteState extends IAsyncSlice {
    array: TQuote[];
};
const initialState: IQuoteState = {
    array: [],
    status: 'idle',
    error: undefined,
}


const quotesSlice = createSlice({
    name: 'quotes',
    initialState: initialState,
    reducers: {
        quoteUpdated: (state, action: PayloadAction<TQuote>) => {
            const { id, text, author } = action.payload
            const existingQuote = state.array.find(quote => quote.id === id)
            if (existingQuote) {
                existingQuote.text = text;
                existingQuote.author = author;
            }
        },
        quoteAdded: {
            reducer: (state, action: PayloadAction<TQuote>) => {
                state.array.push({...action.payload, index: state.array.length + 1});
            },
            prepare: (text: string , author: string ) => {
                return { 
                    payload: {
                        index: undefined,
                        text,
                        author,
                        id: v4(),
                    }
                }
            }
        },
        quoteFavorited: (state, action: PayloadAction<number>) => {
            const index = action.payload
            const existingQuote = state.array.find(quote => quote.index === index)
            if (existingQuote) {
                existingQuote.text = 'text';
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchQuotes.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchQuotes.fulfilled, (state, action) => {
            state.status = "completed";
            state.array = action.payload;
        })
        .addCase(fetchQuotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export const { quoteAdded, quoteUpdated, quoteFavorited } = quotesSlice.actions;

//async attions
// const getQuotes = createAsyncThunk('quotes/getQuotesStatus', );
export const selectQuotes = (state: RootState) => state.quotes;
export const selectQuotesArray = (state: RootState) => state.quotes.array;

export default quotesSlice;