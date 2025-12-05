import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {  getTodosWithFilter } from "../service/todoService";
import type { TTodo } from "../service/todoData";

export default function useArray() {
    const [ filter, setFilter ] = useState<string | null>(null);
    const { todoMap } = useSelector((rootState: RootState ) => rootState.todo );
    const [ array, setArray ] = useState<TTodo[]>([]);
    const [ offset, setOffset ] = useState<number>(0);
    const [ limit, setLimit ] = useState<number>(3);

    useEffect(() => {
        const todos = getTodosWithFilter();
        setArray(todos);
    }, [ todoMap, filter ])
    return { filter, setFilter, array, arrayCount: array.length, offset, limit, setOffset, setLimit };

} 
