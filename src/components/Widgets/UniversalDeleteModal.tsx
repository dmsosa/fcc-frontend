import CloseBtn from "./CloseBtn";
import type { MouseEvent, MouseEventHandler } from "react";



export default function UniversalDeleteModal ({ show, title, subtitle, onConfirm, handleCloseModal }: { show: boolean, title: string, subtitle?: string, onConfirm: (e: MouseEvent<HTMLButtonElement> ) => void, handleCloseModal: MouseEventHandler }) {

    return (
        <div className={`modal modal-flex p-3 ${show ? 'show': 'hide'}`} id="delete-modal">
            <div className="modal-inner box container p-3">
                <p className="mb-0 fw-bold">{title}</p>
                {subtitle && <span>{subtitle}</span>}
                <hr />
                <div className="d-flex justify-content-end align-items-center gap-2">
                    <button className="btn btn-danger" onClick={onConfirm}>
                        <span>Yes</span>
                    </button>
                    <button className="btn btn-primary" onClick={handleCloseModal}>
                        <span>No</span>
                    </button>
                </div>
                <CloseBtn handleClick={handleCloseModal}/> 
            </div>
        </div>    
  );
}


