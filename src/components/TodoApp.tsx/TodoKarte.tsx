

import { connect, type ConnectedProps } from "react-redux";
import { setTargetId, toggleEditorMode, toggleTodo, type TTodo } from "../../store/todoSlice";

interface ITodoKarteProps {
    todo: TTodo;
}
const mapDispatchToProps = { toggleTodo, toggleEditorMode, setTargetId }

const connector = connect(null, mapDispatchToProps);
type TPropsFromRedux = ConnectedProps<typeof connector>;

export function TodoKarte ({ todo, toggleTodo, toggleEditorMode, setTargetId }: TPropsFromRedux & ITodoKarteProps ) {
    const { id, title, completed, priority } = todo;
    return (
        <div className="d-flex justify-content-center align-items-center">
            <p>{title}</p>
            <span>priority: {` ${priority}`}</span>
            <input type="checkbox" name="completed" checked={completed} onClick={() => { toggleTodo({id}) }} />
            <div className="d-flex justify-content-center align-items-center gap-2">
                <button className="btn btn-primary" onClick={() => toggleEditorMode}>edit</button>
                <button className="btn btn-danger" onClick={() => setTargetId({id})}>delete</button>
            </div>
        </div>
    
  );
}

const ConnectedTodoKarte = connector(TodoKarte);

export default ConnectedTodoKarte; 