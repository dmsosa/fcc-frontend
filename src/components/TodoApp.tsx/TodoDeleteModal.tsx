import { useState } from "react";
import CloseBtn from "../Widgets/CloseBtn";
import useToggler from "../../hooks/useToggler";
import { deleteTodo, useTodosState } from "../../store/todoSlice";
import { useDispatch } from "react-redux";



export default function TodoDeleteModal () {
    const { deleteMode, targetId } = useTodosState();
    const dispatch = useDispatch();

    const [show, setShow ] = useState<boolean>(deleteMode);
    const toggler = useToggler(show, setShow);
    const handleDelete = () => {
        if (!targetId) return;
        dispatch(deleteTodo({ id: targetId }))
    }
    return (
        <div className={`modal modal-flex p-3 ${show ? 'show': 'hide'}`} id="delete-modal">
            <div className="modal-inner box container p-3">
                { targetId ? 
                <>
                    <p className="mb-0 fw-bold">Are you sure to delete?</p>
                    <span>todo id: {targetId}</span>
                    <hr />
                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <button className="btn btn-danger" onClick={handleDelete}>
                            <span>Yes</span>
                        </button>
                        <button className="btn btn-primary" onClick={toggler}>
                            <span>No</span>
                        </button>
                    </div>
                    <CloseBtn value={show} setter={setShow} />
                </>

                :
                <div>No todo targeted</div>    
                }
                
            </div>
        </div>    
  );
}


