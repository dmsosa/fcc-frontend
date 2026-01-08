import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "../store";
import {  selectQuotesIds } from "../store/quotesSlice/quotesSlice";
import { fetchQuotes } from "../store/quotesSlice/thunks";
import { getLS } from "../helpers";
import { AppLSOptions } from "../store/types";

export type TServiceName = 'quotes' | 'todos';

const THUNKS = {
    'quotes': fetchQuotes,
    'todos': fetchQuotes,
};
const SELECTORS = {
    quotes: selectQuotesIds,
    todos: selectQuotesIds,
};

    /**
     * I repeated the same process for quotes, todos and other entities, I wanted to abstract it into a single hook
     * the role of this hook is:
     * 1. Keep track of currentSlice state and notify the component that uses it
     * 2. Run pagination logic
     * 3. Return paginated data based on current pageNumber
     * 3. Don't run thunk more times than needed
     * 
     * @param typePrefix
     * @param payloadCreator
     * @param options
     *
     * @public
     */
export default function useArrayIds({serviceName, limitAmount} : {serviceName: TServiceName, limitAmount?: number }) {
    const [ offset, setOffset ] = useState<number>( 0);
    const [ limit, setLimit ] = useState<number>(limitAmount?? 3);
    const { status, error } = useAppSelector((state: RootState) => state[serviceName]);
    const selectIds = SELECTORS[serviceName];
    const array  = useAppSelector(selectIds);
    const [ paginatedArray, setPaginatedArray ] = useState<string[]>(array.slice(offset * limit, offset * limit + limit));
    const dispatch = useAppDispatch();

    //Dispatch first thunk
    useEffect(() => {
        if (!getLS('quotes', AppLSOptions)) {
            console.log('Quotes Array already exists in Local Storage, skipping fetching');
            dispatch(THUNKS[serviceName]());
        }
    }, [])

    //Pagination Logic
    useEffect(() => {
        const from = offset * limit;
        const to = from + limit;
        setPaginatedArray(array.slice(from, to))
    }, [offset, limit, array])

    return { array: paginatedArray, arrayCount: array.length, status, error, offset, setOffset, setLimit };

} 

//If dispatch (FavQuote(id)), wurde es automatisch aktualisiert?
//