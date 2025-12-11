
import { useTodoArrayWithFilter } from "../../hooks/todo";
import ArrayPagination from "../Widgets/ArrayPagination";
import TodoKarte from "./TodoKarte";




export default function TodoArray () {
    const { array, count, setOffset } = useTodoArrayWithFilter({ options: { offset: 0, limit: 3}});
    const handlePageChange = (selectedItem: { selected: number; }) => {
        setOffset(selectedItem.selected);
    }
    return array.length > 0 ? 
    <>
    {array.map((t) => 
    <TodoKarte 
        key={t.id}
        todo={t}
        />)}
    <ArrayPagination count={Math.ceil(count / 3)} handlePageChange={handlePageChange}/>
    </>
     :
    <div><p>no results!</p></div>
}

//IST OFFSET LOKAL ODER IMMER MIT HOOK GESETZT?