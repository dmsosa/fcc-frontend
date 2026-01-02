import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { IAsyncSlice } from '../types';
import { getQuotes } from '../../service/quotesService';

export type TQuote = {
    id: number,
    text: string,
    author: string
};
interface IQuoteState extends IAsyncSlice {
    quotes: TQuote[];
};
const initialState: IQuoteState = {
    quotes: [],
    status: 'idle',
    error: null,
}
export const fetchQuotes = createAsyncThunk(
  "quotes/fetchQuotes",
  async (_, thunkAPI) => {
    return getQuotes().catch((error) => thunkAPI.rejectWithValue(error));
  }
);

const quotesSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        quoteUpdated: (state, action: PayloadAction<TQuote>) => {
            const { id, text, author } = action.payload
            const existingQuote = state.quotes.find(quote => quote.id === id)
            if (existingQuote) {
                existingQuote.text = text;
                existingQuote.author = author;
            }
        },
        quoteAdded: (state, action: PayloadAction<TQuote>) => {
                state.quotes.push({...action.payload, id: state.quotes.length + 1});
            }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchQuotes.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchQuotes.fulfilled, (state, action) => {
            state.status = "completed";
            state.quotes = action.payload;
        })
        .addCase(fetchQuotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.error;
        });
    },
});

export const { quoteAdded, quoteUpdated } = quotesSlice.actions;

//async attions
// const getQuotes = createAsyncThunk('quotes/getQuotesStatus', )
export const useQuoteState = () => useSelector((state: { quotes: TQuoteState }) => state.quotes);

export default quotesSlice;