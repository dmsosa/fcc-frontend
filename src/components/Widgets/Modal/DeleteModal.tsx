import type { MouseEvent } from "react";
import ModalContainer from "./ModalContainer";



export default function DeleteModal ({ targetId,  entityName, show, setter, title, subtitle, onConfirm }: { targetId?: number, entityName: string, show: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, title: string, subtitle?: string, onConfirm: (e: MouseEvent<HTMLButtonElement> ) => void}) {
    const containerId = `delete-${entityName}-modal`;
    return (
        <ModalContainer show={show} setter={setter} id={containerId} >
            { 
                targetId ? 
                <form>
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
                </form>
                :
                <div>No todo targeted</div>
            }
        </ModalContainer>
  );
}



