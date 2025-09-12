

import { connect, type ConnectedProps } from "react-redux";
import { deleteTodo, getTodoById, putTodo, toggleEditorMode, toggleTodo, type TTodo } from "../../store/todoSlice";
import type { RootState } from "../../store";
import { useEffect, useState, type MouseEvent } from "react";
import TodoEditorConfirmDelete from "./TodoEditorConfirmDelete";
import useToggler from "../../hooks/useToggler";
import CloseBtn from "../Widgets/CloseBtn";

type TTodoEditorProps = {
    targetTodo: TTodo | null,
    editorMode: boolean;
}


const mapStateToProps = (state: RootState) => {
    const { targetId, editorMode } = state.todo;
    let targetTodo = null;
    if (targetId) {
        targetTodo = getTodoById(state, targetId);
    };
    return { targetTodo, editorMode}
}
const mapDispatchToProps = { putTodo, toggleTodo, deleteTodo, toggleEditorMode };
const connector = connect(mapStateToProps, mapDispatchToProps);
type IPropsFromRedux = ConnectedProps<typeof connector>;


export function TodoEditor ({ editorMode, targetTodo, putTodo, toggleTodo, deleteTodo, toggleEditorMode }: IPropsFromRedux & TTodoEditorProps ) {
    const [showModal, setShowModal ] = useState<boolean>(editorMode);
    const [confirmDelete, setConfirmDelete ] = useState<boolean>(true);

    // useEffect(() => {
    //     if (!showModal) return;
    //     const modal = document.getElementById('editor-modal');
    //     if (!modal) return;
    //     const closeClickOutside = (e: MouseEvent) => {
    //         console.log(e.currentTarget.getBoundingClientRect());
    //     }
    //     window.addEventListener('click', (e: MouseEvent) => {

    //     })

    //     return 
    // }, [showModal])
    const toggler = useToggler(confirmDelete, setConfirmDelete);

    const handlePut = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetTodo) return;
        putTodo({ id: targetTodo.id, todo: targetTodo })
    }
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetTodo) return;
        deleteTodo({ id: targetTodo.id})
    }

    return (
        <div className={`modal modal-flex ${showModal ? 'show': 'hide'}`} id="editor-modal">
            <div className="modal-inner box container p-3 pt-2 pb-4" id="editor">
                {targetTodo ? 
                    <form action="">
                        <h3>Todo #{targetTodo.id}</h3>
                        <p>{targetTodo.title}</p>
                        <input type="checkbox" name="completed" checked={targetTodo.completed} onClick={() => { toggleTodo({id: targetTodo.id}) }} />
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-primary" onClick={handlePut}>edit</button>
                            <button className="btn btn-danger" onClick={toggler}>delete</button>
                        </div>
                        <CloseBtn value={showModal} setter={setShowModal} cb={toggleEditorMode}/> 
                        <TodoEditorConfirmDelete 
                        targetId={targetTodo.id} handleDelete={handleDelete}
                        confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}/>
                    </form>
                        
                        :
                    <div>No todo targeted</div>
                }
            </div>
            
        </div>    
  );
}

const ConnectedTodoEditor = connector(TodoEditor);
export default ConnectedTodoEditor;


