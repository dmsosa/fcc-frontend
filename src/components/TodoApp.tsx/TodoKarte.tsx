

import { useDispatch } from "react-redux";
import { setTargetId, toggleDeleteMode, toggleEditorMode, toggleTodo, type TTodo } from "../../store/todoSlice";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Checkbox } from "../Widgets/Form/Checkbox";
import type { ChangeEventHandler, MouseEvent } from "react";
import type { AppDispatch } from "../../store";



export default function TodoKarte ({ todo }: { todo: TTodo } ) {
    const { id, title, completed, priority } = todo;
    const dispatch: AppDispatch = useDispatch();

    const handleCheckbox: ChangeEventHandler<HTMLInputElement> = (e) =>  {
        console.log(e);
        dispatch(toggleTodo({id}));

    }
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        console.log('e'); 
        dispatch(toggleEditorMode()); 
        dispatch(setTargetId({id: todo.id })); 

    }
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('e'); 
        dispatch(toggleDeleteMode()); 
        dispatch(setTargetId({id: todo.id })); 
    }
    return (
        <div className="d-flex justify-content-center align-items-center p-2 gap-2">
            <Checkbox value={completed} name={`${completed}-${id}`} id={`${completed}-${id}`} handleChange={handleCheckbox}></Checkbox>
            <div>
                <p>{title}</p>
                <span>priority: {` ${priority}`}</span>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 ms-auto">
                <button className="btn btn-primary" onClick={() => { toggleEditorMode()}}><FaPencil></FaPencil></button>
                <button className="btn btn-danger" onClick={() => { toggleDeleteMode()}}><FaTrash></FaTrash></button>
            </div>
        </div>
    
  );
}
