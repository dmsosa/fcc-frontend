


export default function TodoEditorConfirmDelete ({ targetId, confirmDelete, handleDelete, setConfirmDelete }: { targetId: number, confirmDelete: boolean, handleDelete: (id: number) => void, setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>> } ) {
    const visibilityClass = confirmDelete ? 'show': 'hide';

    return (
        <div className={`box submodal p-3 ${visibilityClass}`} id="confirm-delete">
            <h1>Are you sure to delete?</h1>
            <p>todo id: {targetId}</p>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-danger" onClick={() => handleDelete(targetId)}>
                    yes
                </button>
                <button className="btn btn-primary" onClick={() => setConfirmDelete(false)}>
                    no
                </button>
            </div>
        </div>    
  );
}


