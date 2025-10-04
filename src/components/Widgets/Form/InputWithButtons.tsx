import { useState, type ChangeEvent, type MouseEvent } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";



export default function InputWithButtons ({ initVal, handleConfirm, handleCancel }: { initVal: string,  handleConfirm: (e: MouseEvent<HTMLButtonElement>, inputValue: string ) => void, handleCancel: (e: MouseEvent<HTMLButtonElement>) => void } ) {
    const [ input, setInput ] = useState<string>(initVal);
    
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setInput(value);
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        handleConfirm(e, value);
    }
    return (
        <div className="d-flex justify-content-center align-items-center p-2 gap-2">
            <input type="text" name="title" id="todo-title" value={input} onChange={handleChange}/>
            <div className="d-flex justify-content-center align-items-center gap-2 ms-auto">
                <button className="btn btn-primary" onClick={handleClick}><FaCheck></FaCheck></button>
                <button className="btn btn-danger" onClick={handleCancel}><FaX></FaX></button>
            </div>
        </div>
    
  );
}
