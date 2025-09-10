import type { MouseEvent } from "react";
import CloseBtn from "../Widgets/CloseBtn";
import useToggler from "../../hooks/useToggler";



export default function TodoEditorConfirmDelete ({ targetId, confirmDelete, handleDelete, setConfirmDelete }: { targetId: number, confirmDelete: boolean,  handleDelete: (e: MouseEvent<HTMLButtonElement>) => void, setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>> } ) {
    const visibilityClass = confirmDelete ? 'show': 'hide';
    const toggler = useToggler(confirmDelete, setConfirmDelete);
 
    return (
        <div className={`box submodal p-3 ${visibilityClass}`} id="confirm-delete">
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
            <CloseBtn value={confirmDelete} setter={setConfirmDelete} />
        </div>    
  );
}


