import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, type RootState } from "../store";
import {  selectAllQuotes, type TQuote } from "../store/quotesSlice/quotesSlice";
import { fetchQuotes } from "../store/quotesSlice/thunks";
import { getLS } from "../helpers";
import { AppLSOptions } from "../store/types";
import { selectAllTodos, type TTodo } from "../store/todosSlice";
import { fetchTodos } from "../store/todosSlice/thunks";
import { useSelector } from "react-redux";
import { useLocalStorage } from "./useLocalStorage";
import { selectAllAuthors, type TAuthor } from "../store/authorSlice/authorSlice";

export type TServiceName =  'quotes' | 'todos' | 'authors' ;
export type TServiceTypes = TQuote | TTodo;


const THUNKS = {
    'quotes': fetchQuotes,
    'todos': fetchTodos,
    'authors': fetchQuotes,
};
const ENTITY_SELECTORS = {
    'todos': selectAllTodos,
    'quotes': selectAllQuotes,
    'authors': selectAllAuthors,
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




export interface UseArrayIdsOptions<T> {
  offset?: number;
  limit?: number;
  filter?: Partial<T>;
  filterKey?: string;
}

export interface UseArrayIdsProps<T> {
  serviceName: TServiceName;
  options?: UseArrayIdsOptions<T>;
}

const DEFAULT_OPTIONS = {
  offset: 0,
  limit: 3,
  filter: {},
  filterKey: undefined,
} as const;

export default function useArrayIds<T = TServiceTypes>({serviceName, options} : UseArrayIdsProps<T> ) {

    const {
        offset: initialOffset = DEFAULT_OPTIONS.offset,
        limit: initialLimit = DEFAULT_OPTIONS.limit,
        filter: initialFilter = DEFAULT_OPTIONS.filter,
        filterKey = DEFAULT_OPTIONS.filterKey,
    } = options ?? {};
    //Entities
    const selectEntities = ENTITY_SELECTORS[serviceName];
    const array  = useSelector<RootState, TQuote[] | TTodo[] | TAuthor[] >(selectEntities);

    //Filtering logic
    //Use custom useLocalStorage Hook to setFilter both in this hook und auch auf Lokale Speicher zu speichern.
    const [filter, setFilter, rmFilter] = useLocalStorage<Partial<T>>(filterKey ?? '', initialFilter, AppLSOptions);

    const matchesFilter = (target: T): boolean => {
        let matches = true;
        for (const key in filter) {
            const filterValue = filter[key];
            const targetValue = target[key];

            // skip undefined filter values
            if (filterValue === undefined) continue;

            if (typeof filterValue === "string") {
                if (
                    typeof targetValue !== "string" ||
                    !targetValue.toLowerCase().startsWith(filterValue.toLowerCase())
                ) {
                    matches = false;
                    break;
                }
            } else if (
            typeof filterValue === "number" ||
            typeof filterValue === "boolean"
            ) {
                if (targetValue !== filterValue) {
                    matches = false;
                    break;
                }
            }
    }
    return matches;
    }
    const applyFilter = (): string[] => {
        const matchedArray = array.filter(q => matchesFilter(q as T));
        const matchedIds = matchedArray.map((q) => q?.id);
        // setPaginatedArray(matchedIds as string[]);
        return matchedIds as string[];
    }

    
    const filteredArray = useMemo(() => {
        return applyFilter();         
    }, [ array, filter ]);


    //Pagination
    const [ offset, setOffset ] = useState<number>(initialOffset);
    const [ limit, setLimit ] = useState<number>(initialLimit);

    const paginatedArray = useMemo(() => {
        const from = offset * limit;
        const to = from + limit;
        return filteredArray.slice(from, to);
    }, [filteredArray, offset, limit]);

    
    const arrayCount = useMemo(() => {
        if (!filter) {
            return array.length;
        } else {
            return filteredArray.length;
        } 
    }, [ filteredArray ]);


    //useEffect for getting the data from API
    //Dispatch for dispatching thunk once
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!getLS(serviceName, AppLSOptions)) {
            console.log(`Array for service: ${serviceName} already exists in Local Storage, skipping fetching`);
            switch (serviceName) {
                case "quotes": {
                    dispatch(THUNKS.quotes());
                    break;
                };
                case "todos": {
                    dispatch(THUNKS.todos());
                    break;
                };
                case "authors": {
                    dispatch(THUNKS.quotes());
                    break;
                };
                default: {
                    console.log(`No thunk found for service: ${serviceName}`);
                };
            }
        }
    }, [])
    return { paginatedArray, arrayCount, offset, setOffset, setLimit, filter, setFilter, rmFilter };

} 

//If dispatch (FavQuote(id)), wurde es automatisch aktualisiert?
//