

import { useDispatch } from "react-redux";
import { putTodo, toggleTodo, type TTodo } from "../../store/todoSlice";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Checkbox } from "../Widgets/Form/Checkbox";
import { useState, type ChangeEventHandler, type MouseEvent } from "react";
import type { AppDispatch } from "../../store";
import InputWithButtons from "../Widgets/Form/InputWithButtons";
import CustomSelect from "../Widgets/CustomSelect";



export default function TodoKarte ({ todo }: { todo: TTodo } ) {
    const { id, title, completed, priority } = todo;
    const [ editMode, setEditMode ] = useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch();

    const handleCheckbox: ChangeEventHandler<HTMLInputElement> = (e) =>  {
        console.log(e);
        dispatch(toggleTodo({id}));

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
        <div className="d-flex justify-content-center align-items-center p-2 gap-2">
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
            
            <CustomSelect currentOption={priority} options={['low', 'mid', 'high']}></CustomSelect>
        </div>
    
  );
}
