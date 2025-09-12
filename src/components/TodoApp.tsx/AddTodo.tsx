import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../../store/todoSlice";


export default function AddTodo () {

    const dispatch = useDispatch();

    const [ input, setInput ] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleClick = () => {
        dispatch(postTodo({ title: input }));
        setInput('');
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <input type="text" name="todo-title" id="todo-title" value={input} onChange={handleChange}/>
            <button className="btn btn-primary" onClick={handleClick}></button>
        </div>
    
  );
}
