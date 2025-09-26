import { useState } from 'react';
import AddTodo from '../components/TodoApp.tsx/AddTodo';
import TodoDeleteModal from '../components/TodoApp.tsx/UniversalDeleteModal';
import TodoEditorModal from '../components/TodoApp.tsx/TodoEditorModal';
import  TodoList  from '../components/TodoApp.tsx/TodoList';
import ArrayPagination from '../components/Widgets/ArrayPagination';
import { createStrictContext } from '../context/createStrictContext';
import { useTodoArrayWithFilter } from '../hooks/todo';

type TModalContext = {
    editModalShow: boolean;
    setEditModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModalShow: boolean;
    setDeleteModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export const  [ useModalContext, ModalContextProvider ] = createStrictContext<TModalContext>()

export default function TodoApp () {

        const { array, count, setOffset } = useTodoArrayWithFilter({ options: { offset: 0, limit: 3}});
        const handlePageChange = (selectedItem: { selected: number; }) => {
            setOffset(selectedItem.selected);
        }
        const [ editModalShow, setEditModalShow ] = useState<boolean>(false);
        const [ deleteModalShow, setDeleteModalShow ] = useState<boolean>(false);

    return (
        <section >
            <div className='container'>
                <div className="row">
                    <h2>Free Code Camp: Todo App</h2>
                    <em className='text-center'>Happy coding!</em>
                    <br></br>
                </div>
                <div className="row bg-2">
                    <AddTodo/>
                    <hr />
                    <TodoList array={array} />
                    <ArrayPagination count={Math.ceil(count / 3)} handlePageChange={handlePageChange}/>
                </div>
                <div className="row">
                    <p className='text-center'>Lass mich wissen, ob es cool war!</p>
                </div>
            </div>
            <ModalContextProvider value={{ editModalShow, setEditModalShow, deleteModalShow, setDeleteModalShow }}>
                <TodoEditorModal/>
                <TodoDeleteModal/>
            </ModalContextProvider>

        </section>
    
  );
}

