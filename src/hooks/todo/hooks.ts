import { useEffect, useState } from "react";
import { type TTodo, type TTodoState } from "../../store/todoSlice";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useLS } from "../hooks";
import { sliceArray, type LSOptions } from "../../helpers/helpers";
import { applyFilterToTodoMap } from "../../service/todoService";

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
    
    const [ filter, setFilter ] = useLS<Partial<TTodo>>('filter', {}, localStorageOptions ?? defaultLocalStorageOptions);
    const { todoMap } = useSelector((state: RootState) => state.todo);
    const [ array, setArray ] = useState<TTodo[]>([]);
    const [ offset, setOffset ] = useState<number | undefined>(options?.offset);
    const [ limit, setLimit ] = useState<number | undefined>(options?.limit);

    // zu anderungen auf Filter reagieren
    useEffect(() => {
        setArray(applyFilterToTodoMap(filter, todoMap));
    }, [filter, todoMap]);

    return ({ array: sliceArray(array, offset, limit), count: array.length, setOffset, setLimit, filter, setFilter });

}

export function useTodosState(): TTodoState { return useSelector((state: RootState) => state.todo ) };
