

import { useDispatch} from "react-redux";
import { putTodo, toggleTodo  } from "../../store/todoSlice";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import { useTodoContext } from "../../context/todoAppContext";
import { getTodoById } from "../../service/todoService";
import ModalContainer from "../Widgets/Modal/ModalContainer";
import type { TTodo } from "../../service/todoData";

export default function TodoEditorModal () {

    const { editModalShow, setEditModalShow, setDeleteModalShow, targetId } = useTodoContext();
    const dispatch = useDispatch();
    const [{ title, priority, completed }, setForm  ] = useState<Omit<TTodo, 'id'>>({title:  '', priority: 'low', completed: false,});

    const containerId = "edit-todo-modal";

    useEffect(() => {
        if (!targetId) return;
        const targetTodo = getTodoById(targetId);
        if (!targetTodo) return;
        setForm({...targetTodo});
    }, [targetId]);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetId) return;
        putTodo({ id: targetId, form: { title, priority, completed } })
    }

    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!targetId) return;
        toggleTodo({id: targetId});
        dispatch(toggleTodo({ id: targetId }));
    }
    
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDeleteModalShow(true);
    }

    return (
        <ModalContainer show={editModalShow} setter={setEditModalShow} id={containerId}>
            { targetId ? 
                    <form action="">
                        <h3>Todo #{targetId}</h3>
                        <p>{title}</p>
                        <input type="checkbox" name="completed" checked={completed} onChange={handleEdit} />
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-primary" onClick={handleSubmit}>confirm</button>
                            <button className="btn btn-danger" onClick={handleDelete}>delete</button>
                        </div>
                    </form>
                        :
                    <div>No todo targeted</div>
                }
        </ModalContainer>
  );
}


