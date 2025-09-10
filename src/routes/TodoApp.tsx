import { ConnectedAddTodo } from '../components/TodoApp.tsx/AddTodo';
import ConnectedTodoEditor from '../components/TodoApp.tsx/TodoEditor';
import { ConnectedTodoList } from '../components/TodoApp.tsx/TodoList';
export default function TodoApp () {
    
    return (
        <section >
            <div className='container'>
                <div className="row">
                    <h2>Free Code Camp: Todo App</h2>
                    <em className='text-center'>Happy coding!</em>
                    <br></br>
                </div>
                <div className="row bg-2">
                    <ConnectedAddTodo/>
                    <hr />
                    <ConnectedTodoList/>
                </div>
                <div className="row">
                    <p className='text-center'>Lass mich wissen, ob es cool war!</p>
                </div>
                    
            </div>
            <ConnectedTodoEditor/>       
        </section>
    
  );
}

