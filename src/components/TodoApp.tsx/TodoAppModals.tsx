

import { useDispatch} from "react-redux";
import { deleteTodo, putTodo, toggleTodo, type TPriority } from "../../store/todoSlice";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import CloseBtn from "../Widgets/CloseBtn";
import { getTodoById } from "../../service/todoService";
import { Checkbox } from "../Widgets/Form/Checkbox";
import DeleteModal from "../Widgets/Modal/DeleteModal";
import { useTodoContext } from "../../context/todoAppContext";
import FormFieldset from "../Widgets/Form/FormFieldset";
import CustomSelect from "../Widgets/Form/CustomSelect";
import { priorityOptions, type TTodo } from "../../service/todoData";

export default function TodoAppModals () {
    
    return (
        <>
            <TodoEditorModal></TodoEditorModal>
            <TodoDeleteModal></TodoDeleteModal>
        </>
        
    )
}
export function TodoEditorModal () {

    const { editModalShow, setEditModalShow, targetId } = useTodoContext() ;
    const dispatch = useDispatch();
    const [form, setForm  ] = useState<Omit<TTodo, 'id'>>({title:  '', priority: 'low', completed: false,});
    
    const { title, priority, completed } = form;

    useEffect(() => {
        if (!targetId) return;
        const targetTodo = getTodoById(targetId);
        if (!targetTodo) return;
        setForm({...targetTodo});
    }, [targetId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setForm((prev) => ({...prev, [name]:value }));
        if (!targetId) return;
        toggleTodo({id: targetId});
    }
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!targetId) return;
        dispatch(putTodo({ id: targetId, form: { title, priority, completed } }));
    }

    const handleToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!targetId) return;
        toggleTodo({id: targetId});
    }
    const handleCustomSelect = (value: TPriority | null) =>  {
            if (!targetId) return;
            if (!value) return;
            dispatch(putTodo({id: targetId, form: { ...form, priority: value }}));
    }

    const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEditModalShow(!editModalShow);
    }


    return (
        <div className={`modal modal-flex ${editModalShow ? 'show': 'hide'}`} id="editor-modal">
            <div className="modal-inner box container p-3 pt-2 pb-4" id="editor">
                {targetId ? 
                    <form action="">
                        <h3>Todo #{targetId}</h3>
                        <div className="d-flex justify-content-center align-items-center">
                            <Checkbox value={completed} name={`completed-${targetId}`} id={`completed-${targetId}`} handleChange={handleToggleCheckbox}></Checkbox>
                            <FormFieldset
                            name="title"
                            id="title"
                            value={title}
                            handleChange={handleChange}
                            type="text"
                            label="Title"
                            expanded
                            ></FormFieldset>
                            <CustomSelect
                            options={priorityOptions}
                            value={priority}
                            onChange={handleCustomSelect}
                            ></CustomSelect>
                        </div>
                        
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-primary" onClick={handleSubmit}>confirm</button>
                            <button className="btn btn-danger" onClick={() => setEditModalShow(!editModalShow)}>cancel</button>
                        </div>
                        <CloseBtn handleClick={handleCloseModal}/> 
                    </form>
                        :
                    <div>No todo targeted</div>
                }
            </div>
        </div>    
  );
}


export function TodoDeleteModal() {
    const { deleteModalShow, setDeleteModalShow, targetId } = useTodoContext();


    //targeted todo greifen
    const [{ title, priority, completed }, setTargetedTodo  ] = useState<Omit<TTodo, 'id'>>({title:  '', priority: 'low', completed: false,});


    useEffect(() => {
        if (!targetId) return;
        const targetTodo = getTodoById(targetId);
        if (!targetTodo) return;
        setTargetedTodo({...targetTodo});
    }, [targetId]);

    //handlers
    const dispatch = useDispatch();

    const handleDeleteConfirm = () => {
        if (!targetId) return;
        dispatch(deleteTodo({ id: targetId }));
        setDeleteModalShow(false);
    }

    return <DeleteModal
    targetId={targetId}
    entityName="todo"
    title={`Are you sure to remove this todo with id: ${targetId}?\ntitle:${title}, priority:${priority}, completed:${completed}`}
    subtitle='this action can not be undone.'
    show={deleteModalShow} setter={setDeleteModalShow}
    onConfirm={handleDeleteConfirm}>
    </DeleteModal>
}