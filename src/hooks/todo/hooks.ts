import { useState } from "react";
import { updateArray, type TTodo, type TTodoState } from "../../store/todoSlice";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

export type TUseArrayOptions = {
    offset: number;
    limit: number;
}

const defaultArrayOptions = {
    offset: 0, limit: 3
}
export function useArray ({ filterObject, options }: {
    filterObject: Partial<TTodo>,
    options?: TUseArrayOptions
} ) {
    const { todoArray } = useTodosState();
    updateArray(filterObject);
    const [ { offset, limit }, setOptions ] = useState<TUseArrayOptions>(options ? options : defaultArrayOptions);
    
    const from = offset * limit;
    const to = from + limit;

    return ({ array: todoArray.slice(from, to), count: todoArray.length, setOptions });

}

export function useTodosState(): TTodoState { return useSelector((state: RootState) => state.todo ) };
