import CloseBtn from "../Widgets/CloseBtn";
import { useTodoModalContext } from "../../routes/TodoApp";



export default function UniversalDeleteModal ({ title, subtitle, onConfirm, onCancel }: { show: boolean, title: string, subtitle?: string, onConfirm?: () => void, onCancel?: () => void  }) {
    
    const { deleteModalShow, setDeleteModalShow  } = useTodoModalContext()

    const handleConfirm = () => {
        if (onCancel) onCancel();
        console.log('Delete confirmed');
        setDeleteModalShow(false);
    }
    const handleCancel = () => {
        if (onCancel) onCancel();
        console.log('Delete cancelled');
        setDeleteModalShow(false);
    }
    return (
        <div className={`modal modal-flex p-3 ${deleteModalShow ? 'show': 'hide'}`} id="delete-modal">
            <div className="modal-inner box container p-3">
                <p className="mb-0 fw-bold">{title}</p>
                {subtitle && <span>{subtitle}</span>}
                <hr />
                <div className="d-flex justify-content-end align-items-center gap-2">
                    <button className="btn btn-danger" onClick={handleConfirm}>
                        <span>Yes</span>
                    </button>
                    <button className="btn btn-primary" onClick={handleCancel}>
                        <span>No</span>
                    </button>
                </div>
                <CloseBtn value={deleteModalShow} setter={setDeleteModalShow}/> 
            </div>
        </div>    
  );
}


