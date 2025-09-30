import { useState } from 'react';
import AddTodo from '../components/TodoApp.tsx/AddTodo';
import { createStrictContext } from '../context/createStrictContext';
import TodoAppModals from '../components/TodoApp.tsx/TodoAppModals';
import TodoArray from '../components/TodoApp.tsx/TodoArray';
import TodoFilterForm from '../components/TodoApp.tsx/TodoFilterForm';

export type TTodoAppContext = {
    editModalShow: boolean;
    setEditModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModalShow: boolean;
    setDeleteModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    targetId: number | undefined;
    setTargetId: React.Dispatch<React.SetStateAction<number | undefined>>;
}
export const  [ useTodoModalContext, ModalContextProvider ] = createStrictContext<TTodoAppContext>()

export default function TodoApp () {




        // Init ModalContext
        const [ editModalShow, setEditModalShow ] = useState<boolean>(false);
        const [ deleteModalShow, setDeleteModalShow ] = useState<boolean>(false);
        const [ targetId, setTargetId ] = useState<number | undefined>(undefined);


    return (
        <ModalContextProvider value={{ editModalShow, setEditModalShow, deleteModalShow, setDeleteModalShow, targetId, setTargetId }}>
        <section >
            <div className='container'>
                <div className="row">
                    <h2>Free Code Camp: Todo App</h2>
                    <em className='text-center'>Happy coding!</em>
                    <br></br>
                </div>
                <div className="row bg-2">
                    <div>
                        <AddTodo/>
                        <TodoFilterForm></TodoFilterForm>
                    </div>
                    
                    <hr />
                    <TodoArray/>
                </div>
                <div className="row">
                    <p className='text-center'>Lass mich wissen, ob es cool war!</p>
                </div>
            </div>
            <TodoAppModals></TodoAppModals>

        </section>
        </ModalContextProvider>
  );
}

