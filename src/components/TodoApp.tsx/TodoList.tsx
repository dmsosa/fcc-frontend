
import type { TTodo } from "../../store/todoSlice";
import TodoKarte from "./TodoKarte";




export default function TodoList ({ array }: { array:TTodo[] }) {

    return array.length > 0 ? 
    array.map((t) => 
    <TodoKarte 
        key={t.id}
        todo={t}
        />
    ) :
    <div><p>no results!</p></div>
}