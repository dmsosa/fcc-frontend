import AddTodo from '../components/TodoApp.tsx/AddTodo';
import TodoDeleteModal from '../components/TodoApp.tsx/TodoDeleteModal';
import TodoEditorModal from '../components/TodoApp.tsx/TodoEditorModal';
import TodoFilterForm from '../components/TodoApp.tsx/TodoFilterForm';
import  TodoList  from '../components/TodoApp.tsx/TodoList';
import ArrayPagination from '../components/Widgets/ArrayPagination';
import { useArray, useTodosState } from '../hooks/todo';
export default function TodoApp () {
        const { filterObject } = useTodosState();
        const { array, count, setOptions } = useArray({ filterObject });
        const handlePageChange = (selectedItem: { selected: number; }) => {
            setOptions((prev) => ({...prev, offset: selectedItem.selected}))
        }
    return (
        <section id='projekt'>
            <div className='container'>
                <div className="row">
                    <h2>Free Code Camp: Todo App</h2>
                    <em className='text-center'>Happy coding!</em>
                    <br></br>
                </div>
                <div className="row bg-2">
                    <AddTodo/>
                    <hr />
                    <TodoFilterForm/>
                    <TodoList array={array} />
                    <ArrayPagination count={count} handlePageChange={handlePageChange}/>
                </div>
                <div className="row">
                    <p className='text-center'>Lass mich wissen, ob es cool war!</p>
                </div>
            </div>
            <TodoEditorModal/>
            <TodoDeleteModal/>
        </section>
    
  );
}

