

import { useDispatch} from "react-redux";
import { deleteTodo, putTodo, toggleTodo, type TTodo } from "../../store/todoSlice";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import CloseBtn from "../Widgets/CloseBtn";
import { getTodoById } from "../../service/todoService";
import { useTodoModalContext } from "../../routes/TodoApp";
import { Checkbox } from "../Widgets/Form/Checkbox";
import UniversalDeleteModal from "../Widgets/UniversalDeleteModal";

export default function TodoAppModals () {
    
    return (
        <>
        <TodoEditorModal></TodoEditorModal>
        <TodoDeleteModal></TodoDeleteModal>
        </>
        
    )
}
export function TodoEditorModal () {

    const { editModalShow, setEditModalShow, targetId } = useTodoModalContext() ;
    const dispatch = useDispatch();
    const [{ title, priority, completed }, setForm  ] = useState<Omit<TTodo, 'id'>>({title:  '', priority: 'low', completed: false,});

    useEffect(() => {
        if (!targetId) return;
        const targetTodo = getTodoById(targetId);
        if (!targetTodo) return;
        setForm({...targetTodo});
    }, [targetId]);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetId) return;
        dispatch(putTodo({ id: targetId, form: { title, priority, completed } }));
    }

    const handleToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!targetId) return;
        toggleTodo({id: targetId});
    }

    return (
        <div className={`modal modal-flex ${editModalShow ? 'show': 'hide'}`} id="editor-modal">
            <div className="modal-inner box container p-3 pt-2 pb-4" id="editor">
                {targetId ? 
                    <form action="">
                        <h3>Todo #{targetId}</h3>
                        <p>{title}</p>
                        <Checkbox value={completed} name={`completed-${targetId}`} id={`completed-${targetId}`} handleChange={handleToggleCheckbox}></Checkbox>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-primary" onClick={handleSubmit}>confirm</button>
                            <button className="btn btn-danger" onClick={() => setEditModalShow(!editModalShow)}>cancel</button>
                        </div>
                        <CloseBtn value={editModalShow} setter={setEditModalShow}/> 
                    </form>
                        :
                    <div>No todo targeted</div>
                }
            </div>
        </div>    
  );
}


export function TodoDeleteModal() {
    const { deleteModalShow, setDeleteModalShow, targetId } = useTodoModalContext();


    //targeted todo greifen
    const [{ title, priority, completed }, setTargetedTodo  ] = useState<Omit<TTodo, 'id'>>({title:  '', priority: 'low', completed: false,});


    useEffect(() => {
        if (!targetId) return;
        const targetTodo = getTodoById(targetId);
        if (!targetTodo) return;
        setTargetedTodo({...targetTodo});
    }, [targetId]);

    //handlers
    const dispatch = useDispatch();

    const handleDeleteConfirm = () => {
        if (!targetId) return;
        dispatch(deleteTodo({ id: targetId }));
        setDeleteModalShow(false);
    }

    return targetId ? 
    <UniversalDeleteModal 
    title={`Are you sure to remove this todo with id: ${targetId}?\ntitle:${title}, priority:${priority}, completed:${completed}`}
    subtitle='this action can not be undone.'
    show={deleteModalShow} setter={setDeleteModalShow}
    onConfirm={handleDeleteConfirm}>
    </UniversalDeleteModal>
                        :
    <div className={`modal modal-flex ${deleteModalShow ? 'show': 'hide'}`} id="editor-modal">
        <div className="modal-inner box container p-3 pt-2 pb-4" id="editor">
            <div>No todo targeted</div>
        </div>
    </div>
}