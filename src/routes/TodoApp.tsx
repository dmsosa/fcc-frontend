import {  useSelector } from 'react-redux';
import AddTodo from '../components/TodoApp.tsx/AddTodo';
import ConnectedTodoEditor from '../components/TodoApp.tsx/TodoEditor';
import  TodoList  from '../components/TodoApp.tsx/TodoList';
export default function TodoApp () {
    // const { filter } = useSelector((state: RootState) => state.todo );
    // const { todoArray, todoCount } useArrayWithFilter({filter})

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
                    <TodoList/>
                </div>
                <div className="row">
                    <p className='text-center'>Lass mich wissen, ob es cool war!</p>
                </div>
                    
            </div>
            <ConnectedTodoEditor/>       
        </section>
    
  );
}

