import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

type TQuote = {
    q: string,
    a: string
};
export type TQuoteState = {
    quotes: TQuote[];
    quoteIndex: number;
    isLoading: boolean;
    error: string | null;
};
const initialState: TQuoteState = {
    quotes: [],
    quoteIndex: 0,
    isLoading: false,
    error: null,
}
const quotesSlice = createSlice({
    name: 'quote',
    initialState: initialState,
    reducers: {
        quotesLoading: (state) => {
            state.isLoading = true;
            state.quotes = [];
            state.error = null;
        },
        quotesLoaded: (state, action: PayloadAction<{ quotes: TQuote[]}>) => {
            state.quotes = action.payload.quotes;
            state.isLoading = false;
            state.error = null;
        },
        quotesFailed: (state, action: PayloadAction<{ errorMessage: string}>) => {
            state.quotes = [];
            state.isLoading = false;
            state.error = action.payload.errorMessage;
        },
        indexIncreased: (state) => {
            if (state.quoteIndex === state.quotes.length - 1) return;
            state.quoteIndex++;
        },
        indexDecreased: (state) => {
            if (state.quoteIndex === 0) return;
            state.quoteIndex--;
        },
        indexChanged: (state, action: PayloadAction<{ selected: number }>) => {
            state.quoteIndex = action.payload.selected;
        },
    }
});

export const { quotesLoading, quotesLoaded, quotesFailed, indexIncreased, indexDecreased, indexChanged } = quotesSlice.actions;

//async attions
// const getQuotes = createAsyncThunk('quotes/getQuotesStatus', )
export const useQuoteState = () => useSelector((state: { quotes: TQuoteState }) => state.quotes);

export default quotesSlice;