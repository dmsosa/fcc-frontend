import { useEffect, useState } from "react";
import type { TTodo } from "../store/todoSlice";
import { getTodosWithFilter } from "../service/todoService";

export type TUseArrayOptions = {
    offset: number;
    limit: number;
    length: number;
}

const defaultArrayOptions = {
    offset: 0, limit: 3, length: 3
}
export default function useArray ({ filterObject, options }: {
    filterObject: Partial<TTodo>,
    options?: TUseArrayOptions
} ) {
    const [ array, setArray ] = useState<TTodo[]>(getTodosWithFilter(filterObject));
    const [ { offset, limit, length }, setOptions ] = useState<TUseArrayOptions>(options ? options : defaultArrayOptions);
    
    
    useEffect(() => {
        const todos = getTodosWithFilter(filterObject);
        const from = offset * length;
        const to = from + limit;
        setArray(todos.slice(from, to));
    }, [offset, limit, length ])

    return {array, count: array.length, setArray, setOptions };

}
