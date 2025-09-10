

import { connect, type ConnectedProps } from "react-redux";
import { deleteTodo, getTodoById, putTodo, toggleTodo, type TTodo } from "../../store/todoSlice";
import type { RootState } from "../../store";
import { useState } from "react";
import TodoEditorConfirmDelete from "./TodoEditorConfirmDelete";

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
const mapDispatchToProps = { putTodo, toggleTodo, deleteTodo };
const connector = connect(mapStateToProps, mapDispatchToProps);
type IPropsFromRedux = ConnectedProps<typeof connector>;


export function TodoEditor ({ editorMode, targetTodo, putTodo, toggleTodo, deleteTodo }: IPropsFromRedux & TTodoEditorProps ) {
    const visibilityClass = editorMode ? 'show': 'hide';
    const [confirmDelete, setConfirmDelete ] = useState<boolean>(true);
    const handlePut = () => {
        if (!targetTodo) return;
        putTodo({ id: targetTodo.id, todo: targetTodo })
    }
    const handleDelete = () => {
        if (!targetTodo) return;
        deleteTodo({ id: targetTodo.id})
    }
    return (
        <div className={`modal modal-flex ${visibilityClass}`} id="editor-modal">
            <div className="modal-inner box container p-3 py-6" id="editor">
                {targetTodo ? 
                    <>
                        <p>{targetTodo.title}</p>
                        <input type="checkbox" name="completed" checked={targetTodo.completed} onClick={() => { toggleTodo({id: targetTodo.id}) }} />
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-primary" onClick={handlePut}>edit</button>
                            <button className="btn btn-danger" onClick={() => setConfirmDelete(true)}>delete</button>
                        </div>
                        <TodoEditorConfirmDelete 
                        targetId={targetTodo.id} handleDelete={handleDelete}
                        confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}/>
                    </>
                        :
                    <div>No todo targeted</div>
                }
            </div>
            
        </div>    
  );
}

const ConnectedTodoEditor = connector(TodoEditor);
export default ConnectedTodoEditor;


