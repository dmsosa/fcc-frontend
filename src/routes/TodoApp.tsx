import { useState } from 'react';
import AddTodo from '../components/TodoApp.tsx/AddTodo';
import TodoAppModals from '../components/TodoApp.tsx/TodoAppModals';
import TodoArray from '../components/TodoApp.tsx/TodoArray';
import TodoFilterForm from '../components/TodoApp.tsx/TodoFilterForm';
import { TodoContextProvider } from '../context/todoAppContext';


export default function TodoApp () {

    // Init ModalContext
    const [ editModalShow, setEditModalShow ] = useState<boolean>(false);
    const [ deleteModalShow, setDeleteModalShow ] = useState<boolean>(false);
    const [ targetId, setTargetId ] = useState<number | undefined>(undefined);


    return (
        <TodoContextProvider value={{editModalShow, deleteModalShow, targetId, setEditModalShow, setDeleteModalShow, setTargetId}}>
        <TodoAppModals></TodoAppModals>
        <section className='section' id='todoapp'>
            <div className='container'>
                <div className="row">
                    <h2>Free Code Camp: Todo App</h2>
                    <em className='text-center'>Happy coding!</em>
                    <br></br>
                </div>
                <div className="row">
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
        </section>
        </TodoContextProvider>

  );
}

