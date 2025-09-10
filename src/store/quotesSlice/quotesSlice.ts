import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

type TQuote = {
    q: string,
    a: string
};
export type TQuoteState = {
    quotes: TQuote[];
    quoteIndex: number;
    amount: number;
    isLoading: boolean;
    error: string | null;
};
const initialState: TQuoteState = {
    quotes: [],
    quoteIndex: 0,
    amount: 1,
    isLoading: false,
    error: null,
}
const quotesSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        getQuotesStart: (state) => {
            state.quotes = [];
            state.isLoading = true;
            state.error = null;
        },
        getQuotesStartSuccess: (state, action: PayloadAction<{ quotes: TQuote[]}>) => {
            state.quotes = action.payload.quotes;
            state.isLoading = false;
            state.error = null;
        },
        getQuotesStartError: (state, action: PayloadAction<{ errorMessage: string}>) => {
            state.quotes = [];
            state.isLoading = false;
            state.error = action.payload.errorMessage;
        },
        incrementIndex: (state, action: PayloadAction<{ amount: number }>) => {
            state.quoteIndex += action.payload.amount
        },
        decrementIndex: (state, action: PayloadAction<{ amount: number }>) => {
            state.quoteIndex -= action.payload.amount
        }
    }
});

export const { getQuotesStart, getQuotesStartSuccess, getQuotesStartError, incrementIndex, decrementIndex } = quotesSlice.actions;

export const selectQuoteState = () => useSelector((state: { quotes: TQuoteState }) => state.quotes);

export default quotesSlice;