

import {  useDispatch } from "react-redux";
import {  updateFilterObject, type TTodo } from "../../store/todoSlice";
import {  useState, type FormEvent, type InputEvent, type MouseEvent } from "react";
import FormFieldset from "../Widgets/Form/FormFieldset";
import { useTodosState } from "../../hooks/todo";

// return form with fields for title, priority and completed

// setForm -> getTodos({filterObject})
//array in state?
// array erhalten mit methoden: rufen sie diese PaymentMethodChangeEvent, jedermals filters sich verandert.
// todoListe brauch todoArray
// app -> todos(todoArray) -> if todos sich andert, liste automatisch render wurde? wenn nichts, wir sollen es als props von App passen
//update filterdata, updateTodo, bei updateTodo sollte sich array re render

export default function TodoFilterForm () {

    const { filterObject } = useTodosState();
    const dispatch = useDispatch();
    const initForm = {
        title: filterObject.title ? filterObject.title : '',
        priority: filterObject.priority ? filterObject.priority : 'low',
        completed: filterObject.completed ? filterObject.completed : false,
    }
    const [{ title, completed, priority }, setForm ] = useState<Omit<TTodo, 'id'>>(initForm);

    const handleChangeForm = (e: InputEvent<HTMLInputElement | HTMLSelectElement > | FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setForm((prev) => ({...prev, [name]:value }));
    }
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(dispatch, 'dispatch')
        dispatch(updateFilterObject({ title, completed, priority }));
    }

// setTitle setBoolean, setEnum, 
    return (
        <form action="">
            <div className="d-flex justify-content-center align-items-center">
                <FormFieldset 
                id="title-input"
                name="title"
                text="title"
                type="text"
                value={title ? title : ''}
                handleChange={handleChangeForm}
                />
                <input type="checkbox" name="priority" id="priority" checked={completed} />
                <select name="completed" id="completed-filter" onChange={handleChangeForm} value={priority}>
                    <option value={'high'}></option>
                    <option value={'mid'}></option>
                    <option value={'low'}></option>
                </select>
            </div>  
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-primary" onClick={handleSubmit}></button>
            </div>
        </form>
    
  );
}

// Wird hatten von connect zu hooks angepasst, warum


