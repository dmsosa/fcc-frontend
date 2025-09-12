

import { connect, useDispatch, useSelector, type ConnectedProps } from "react-redux";
import { deleteTodo, getTodoById, putTodo, toggleEditorMode, toggleTodo, type TTodo } from "../../store/todoSlice";
import type { RootState } from "../../store";
import { useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from "react";
import TodoEditorConfirmDelete from "./TodoEditorConfirmDelete";
import useToggler from "../../hooks/useToggler";
import CloseBtn from "../Widgets/CloseBtn";
import { Checkbox } from "../Widgets/Checkbox";


// setForm -> getTodos({filterObject})
//array in state?
// array erhalten mit methoden: rufen sie diese PaymentMethodChangeEvent, jedermals filters sich verandert.
// todoListe brauch todoArray
// app -> todos(todoArray) -> if todos sich andert, liste automatisch render wurde? wenn nichts, wir sollen es als props von App passen
//update filterdata, updateTodo, bei updateTodo sollte sich array re render

export type TFilterObject = {
    title: string | null,
    completed: boolean | null,
    priority: 'high'| 'mid' | 'low' | null,
}; 
const initForm: TFilterObject = { title: null, priority: null, completed: null  };

export function TodoEditor () {

    
    const { filter } = useSelector((state: RootState) => state.todo );
    const dispatch = useDispatch();
    const [{ title, completed, priority }, setForm ] = useState<TFilterType>(filter ? filter : initForm);
    const handleChangeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        e.preventDefault();
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setForm((prev) => ({...prev, [name]:value }));
    }
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        submitUpdateFilterObject
    }

// setTitle setBoolean, setEnum, 
    return (
        <form action="">
            <div className="d-flex justify-content-center align-items-center">
                <input type="text" name="title" id="title-filter" value={title ? title : ''} onChange={handleChangeForm}/>
                <Checkbox checked={completed ? completed : false} onClick={}></Checkbox>
                <select name="completed" id="completed-filter" onChange={handleChangeForm}>
                    <option value={'high'}></option>
                    <option value={'mid'}></option>
                    <option value={'low'}></option>
                </select>
            </div>  
            <button className="btn btn-primary" onClick={handleSubmit}></button>
        </form>
    
  );
}

// Wird hatten von connect zu hooks angepasst, warum


