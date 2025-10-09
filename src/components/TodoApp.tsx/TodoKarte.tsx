

import { useDispatch } from "react-redux";
import { putTodo, toggleTodo, type TPriority, type TTodo } from "../../store/todoSlice";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Checkbox } from "../Widgets/Form/Checkbox";
import { useState, type ChangeEventHandler, type MouseEvent } from "react";
import type { AppDispatch } from "../../store";
import InputWithButtons from "../Widgets/Form/InputWithButtons";
import CustomSelect, { type Option } from "../Widgets/Form/CustomSelect";

//Weg 1: jeder Knopf kann ein neues Event dispatchen
//Weg 2: Wir haben EditorKomponent, dass wie ein Form funktionierst

const priorityOptions: Option<TPriority>[] =[{value: 'high', label: 'High'}, {value: 'mid', label: 'Mid'}, {value: 'low', label: 'Low'}];

export default function TodoKarte ({ todo }: { todo: TTodo } ) {
    const { id, title, completed, priority } = todo;
    const [ editMode, setEditMode ] = useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch();

    const handleCheckbox: ChangeEventHandler<HTMLInputElement> = (e) =>  {
        e.preventDefault();
        dispatch(toggleTodo({id}));
    }
    const handleCustomSelect = (value: TPriority | null) =>  {
        if (!value) return;
        dispatch(putTodo({id, form: {...todo, priority: value }}));
    }
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>, value: string) => {
        e.preventDefault();
        dispatch(putTodo( { id, form: {...todo, title: value}}));
        setEditMode(!editMode);
    }
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        console.log('e'); 
    }
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('e'); 
    }
    return (
        <div className="box li-margin-vertical d-flex justify-content-center align-items-center p-2 gap-2">
            <Checkbox value={completed} name={`${completed}-${id}`} id={`${completed}-${id}`} handleChange={handleCheckbox}></Checkbox>
            { editMode ? 
                <InputWithButtons initVal={title} handleConfirm={handleSubmit} handleCancel={() => setEditMode(!editMode)}></InputWithButtons>
            :
                <p onClick={() => setEditMode(!editMode)}>{title + priority}</p>
            }
            <div className="d-flex justify-content-center align-items-center gap-2 ms-auto">
                <button className="btn btn-primary" ><FaPencil></FaPencil></button>
                <button className="btn btn-danger"><FaTrash></FaTrash></button>
            </div>
            <CustomSelect 
            value={priority}
            options={priorityOptions}
            onChange={handleCustomSelect}
            placeholder="select..."
            searchable
            >
            </CustomSelect>
        </div>
    
  );
}
// Default export: a single-file React + TypeScript component using TailwindCSS for styling.
// Usage example (in a parent file):
// <CustomSelect
//    options={[{value: 'en', label: 'English'}, {value: 'de', label: 'Deutsch'}]}
//    value={selected}
//    onChange={setSelected}
//    placeholder="Select language"
//    searchable
//    clearable
// />