

import { useDispatch} from "react-redux";
import { putTodo, selectTodoById, selectTodoModals, toggleDeleteMode, toggleEditorMode, toggleTodo, type TTodo } from "../../store/todoSlice";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import CloseBtn from "../Widgets/CloseBtn";
import store from "../../store/store";

export default function TodoEditorModal () {

    const { editorMode, targetId } = selectTodoModals(store.getState());
    const dispatch = useDispatch();

    const [show, setShow ] = useState<boolean>(editorMode);
    const [{ title, priority, completed }, setForm  ] = useState<Omit<TTodo, 'id'>>({title:  '', priority: 'low', completed: false,});

    useEffect(() => {
        if (!targetId) return;
        const targetTodo = selectTodoById(store.getState(), targetId);
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
    }
    
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleDeleteMode();
    }

    return (
        <div className={`modal modal-flex ${show ? 'show': 'hide'}`} id="editor-modal">
            <div className="modal-inner box container p-3 pt-2 pb-4" id="editor">
                {targetId ? 
                    <form action="">
                        <h3>Todo #{targetId}</h3>
                        <p>{title}</p>
                        <input type="checkbox" name="completed" checked={completed} onChange={handleEdit} />
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-primary" onClick={handleSubmit}>confirm</button>
                            <button className="btn btn-danger" onClick={handleDelete}>delete</button>
                        </div>
                        <CloseBtn value={show} setter={setShow} cb={() => dispatch(toggleEditorMode())}/> 
                    </form>
                        :
                    <div>No todo targeted</div>
                }
            </div>
        </div>    
  );
}


