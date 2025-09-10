

import { connect, type ConnectedProps } from "react-redux";
import { setTargetId, toggleEditorMode, toggleTodo, type TTodo } from "../../store/todoSlice";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Checkbox } from "../Widgets/Checkbox";

interface ITodoKarteProps {
    todo: TTodo;
}
const mapDispatchToProps = { toggleTodo, toggleEditorMode, setTargetId }

const connector = connect(null, mapDispatchToProps);
type TPropsFromRedux = ConnectedProps<typeof connector>;

export function TodoKarte ({ todo, toggleTodo, toggleEditorMode, setTargetId }: TPropsFromRedux & ITodoKarteProps ) {
    const { id, title, completed, priority } = todo;
    return (
        <div className="d-flex justify-content-center align-items-center p-2 gap-2">
            <Checkbox checked={completed} name="toggled2" id="toggled2" onClick={() => toggleTodo}></Checkbox>
            <Checkbox checked={true} name="toggled" id="toggled"></Checkbox>
            <div>
                <p>{title}</p>
                <span>priority: {` ${priority}`}</span>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 ms-auto">
                <button className="btn btn-primary" onClick={() => toggleEditorMode}><FaPencil></FaPencil></button>
                <button className="btn btn-danger" onClick={() => setTargetId({id})}><FaTrash></FaTrash></button>
            </div>
        </div>
    
  );
}

const ConnectedTodoKarte = connector(TodoKarte);

export default ConnectedTodoKarte; 