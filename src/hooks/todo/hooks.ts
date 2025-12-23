import { useEffect, useState } from "react";
import {  type TTodoState } from "../../store/todoSlice";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { type LSOptions } from "../../helpers/localStorageHelpers";
import {  getTodosWithFilter } from "../../service/todoService";
import { useLocalStorage } from "../useLocalStorage";
import { sliceArray } from "../../helpers";
import type { TTodo } from "../../service/todoData";

export type TUseTodoArrayProps = {
    options?: TUseArrayOptions;
    localStorageOptions?: LSOptions<Partial<TTodo>>;
}
type TUseArrayOptions = {
    offset?: number;
    limit?: number;
}

export function useTodoArrayWithFilter({ options, localStorageOptions }: TUseTodoArrayProps) {
   
// if not options, use defaultoptions 
// if options, merge it with defualt op
    const defaultLocalStorageOptions: LSOptions<Partial<TTodo>> = { ns: undefined, ttl: 86400, serializer: undefined };
    
    const [ filter, setFilter ] = useLocalStorage<Partial<TTodo>>('filter', {}, localStorageOptions ?? defaultLocalStorageOptions);
    const { todoMap } = useSelector((state: RootState) => state.todo);
    const [ array, setArray ] = useState<TTodo[]>([]);
    const [ offset, setOffset ] = useState<number | undefined>(options?.offset);
    const [ limit, setLimit ] = useState<number | undefined>(options?.limit);

    // zu anderungen auf Filter reagieren
    useEffect(() => {
        setArray(getTodosWithFilter());
    }, [filter, todoMap]);

    return ({ array: sliceArray(array, offset, limit), count: array.length, setOffset, setLimit, filter, setFilter });

}

export function useTodosState(): TTodoState { return useSelector((state: RootState) => state.todo ) };
