import CloseBtn from "./CloseBtn";
import type { MouseEvent } from "react";



export default function UniversalDeleteModal ({ show, setter, title, subtitle, onConfirm }: { show: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, title: string, subtitle?: string, onConfirm: (e: MouseEvent<HTMLButtonElement> ) => void}) {

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
                    <button className="btn btn-primary" onClick={() => setter(false)}>
                        <span>No</span>
                    </button>
                </div>
                <CloseBtn value={show} setter={setter}/> 
            </div>
        </div>    
  );
}


