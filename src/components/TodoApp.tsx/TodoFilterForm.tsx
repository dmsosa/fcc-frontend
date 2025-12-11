

import {  useState, type ChangeEvent } from "react";
import FormFieldset from "../Widgets/Form/FormFieldset";
import { useTodoArrayWithFilter } from "../../hooks/todo";
import { Checkbox } from "../Widgets/Form/Checkbox";
import type { TTodo } from "../../service/todoData";

// return form with fields for title, priority and completed

// setForm -> getTodos({filterObject})
//array in state?
// array erhalten mit methoden: rufen sie diese PaymentMethodChangeEvent, jedermals filters sich verandert.
// todoListe brauch todoArray
// app -> todos(todoArray) -> if todos sich andert, liste automatisch render wurde? wenn nichts, wir sollen es als props von App passen
//update filterdata, updateTodo, bei updateTodo sollte sich array re render


export default function TodoFilterForm() {
    // Wenn mein filterObjekt ist in meine LocalStorage, dann greife es. Aber wie kann es prufen? Vielleikt custom selector useFilterObjekt, der filterObjekt von localStorage oder store greifst (nur am anfangs,) und es kann auch ein funktion geben, der filterObjekt aktualisierst und auch mein LocalStorage speicherst fur nachste (firstRender)
    // ns fur localstorage werde "r89-ls:filter"
    const { filter, setFilter } = useTodoArrayWithFilter({});
    const [{ title, completed, priority }, setForm ] = useState<Partial<TTodo>>(filter);
    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForm((prev) => ({...prev, completed:!completed }));
        setFilter((prev) => ({...prev, completed:!completed }));
    }

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (value === 'all') {
            setFilter((prev) => ({...prev, priority: undefined }));
            setForm((prev) => ({...prev, priority: undefined  }));
        } else {
            setFilter((prev) => ({...prev, [name]:value }));
            setForm((prev) => ({...prev, [name]:value }));
        } 
    }

// setTitle setBoolean, setEnum, 
    return (
        <form action="">
            <div className="d-flex justify-content-center align-items-center">
                <FormFieldset 
                id="todo-filter-title"
                name="title"
                label="title"
                type="text"
                value={title ? title : ''}
                handleChange={handleChangeForm}
                />
                <Checkbox
                value={completed as boolean}
                name="completed"
                id="todo-filter-completed"
                handleChange={handleChangeCheckbox}
                ></Checkbox>
                <select name="priority" id="completed-filter" onChange={handleChangeForm} value={priority}>
                    <option value={'all'}></option>
                    <option value={'high'}></option>
                    <option value={'mid'}></option>
                    <option value={'low'}></option>
                </select>
            </div>  
        </form>
    
  );
}

// Wird hatten von connect zu hooks angepasst, warum


