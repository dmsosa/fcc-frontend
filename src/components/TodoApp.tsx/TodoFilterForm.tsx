

import {  type TTodo } from "../../store/todoSlice";
import {  type ChangeEvent } from "react";
import FormFieldset from "../Widgets/Form/FormFieldset";

// return form with fields for title, priority and completed

// setForm -> getTodos({filterObject})
//array in state?
// array erhalten mit methoden: rufen sie diese PaymentMethodChangeEvent, jedermals filters sich verandert.
// todoListe brauch todoArray
// app -> todos(todoArray) -> if todos sich andert, liste automatisch render wurde? wenn nichts, wir sollen es als props von App passen
//update filterdata, updateTodo, bei updateTodo sollte sich array re render


export default function TodoFilterForm({ filter, setFilter }:{ filter: Partial<TTodo>, setFilter: React.Dispatch<React.SetStateAction<Partial<TTodo>>>}) {
// mein filterObjekt ist in meine Store. Aber wie kann es prufen? Vielleikt custom selector useFilterObjekt, der filterObjekt von localStorage oder store greifst (nur am anfangs,) und es kann auch ein funktion geben, der filterObjekt aktualisierst und auch mein LocalStorage speicherst fur nachste (firstRender)
// ns fur localstorage werde "r89-ls:filter"
    const { title, completed, priority } = filter;

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter((prev) => ({...prev, [name]:value }));
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
        </form>
    
  );
}

// Wird hatten von connect zu hooks angepasst, warum


