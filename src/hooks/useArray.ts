import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {  selectQuotesArray, type TQuote } from "../store/quotesSlice/quotesSlice";
import { fetchQuotes } from "../store/quotesSlice/thunks";
import {  selectTodosArray } from "../store/todoSlice";
import type { TTodo } from "../service/todoData";

export interface IService {
    getAll: () => Promise<unknown[]>;
    getById: (id: string, delay?: number) => Promise<unknown | undefined>;
}
export type TServiceName = 'quotes' | 'todos';
export type ServiceMap<T> = {
    [P in keyof T]: IService;
};
const THUNKS = {
    'quotes': fetchQuotes,
    'todos': fetchQuotes,
};
const SELECTORS: { [key in TServiceName] : (state: RootState) => TQuote[] | TTodo[] } = {
    quotes: selectQuotesArray,
    todos: selectTodosArray,
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
export default function useArray<T>({serviceName, limitAmount} : {serviceName: TServiceName, limitAmount?: number }) {
    const [ offset, setOffset ] = useState<number>( 0);
    const [ limit, setLimit ] = useState<number>(limitAmount?? 3);
    const { status, error } = useSelector((state: RootState) => state[serviceName]);
    const array  = useSelector<RootState, TQuote[] | TTodo[]>(SELECTORS[serviceName]);
    const [ paginatedArray, setPaginatedArray ] = useState<TQuote[] | TTodo[]>(array.slice(offset * limit, offset * limit + limit));
    const dispatch = useDispatch<AppDispatch>();

    //Dispatch first thunk
    useEffect(() => {
        dispatch(THUNKS[serviceName]());
    }, [])

    //Pagination Logic
    useEffect(() => {
        const from = offset * limit;
        const to = from + limit;
        setPaginatedArray(array.slice(from, to))
    }, [offset, limit, array])

    return { array: paginatedArray as T[], arrayCount: array.length, status, error, offset, setOffset, setLimit };

} 

//If dispatch (FavQuote(id)), wurde es automatisch aktualisiert?
//