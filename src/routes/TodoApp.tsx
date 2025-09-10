import { ConnectedAddTodo } from '../components/TodoApp.tsx/AddTodo';
import ConnectedTodoEditor from '../components/TodoApp.tsx/TodoEditor';
import { ConnectedTodoList } from '../components/TodoApp.tsx/TodoList';
export default function TodoApp () {
    
    return (
        <section >
            <div className='container'>
                <div className="row">
                    <h1>Free Code Camp: Todo App</h1>
                    <p>React redux.</p>
                    <p>Legacy way vs Now.</p>
                    <em>Happy coding!</em>
                </div>
                <div className="row">
                    <ConnectedAddTodo/>
                    <ConnectedTodoList/>
                </div>
                <div className="row">
                    <p>Lass mich wissen, ob es cool war!</p>
                </div>
                    
            </div>
            <ConnectedTodoEditor/>       
        </section>
    
  );
}

