import { useState, type ChangeEvent } from "react";
import { connect, type ConnectedProps } from "react-redux";
import { postTodo } from "../../store/todoSlice";


const mapDispatchToProps = { postTodo };
function AddTodo ({ postTodo }: PropsFromRedux) {

    const [ input, setInput ] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleClick = () => {
        postTodo({ title: input });
        setInput('');
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <input type="text" name="todo-title" id="todo-title" value={input} onChange={handleChange}/>
            <button className="btn btn-primary" onClick={handleClick}></button>
        </div>
    
  );
}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
export const ConnectedAddTodo = connector(AddTodo);

