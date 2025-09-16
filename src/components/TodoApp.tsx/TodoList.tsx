
import type { TTodo } from "../../store/todoSlice";
import TodoKarte from "./TodoKarte";




export default function TodoList ({ array, setArray }: { array:TTodo[], setArray: React.Dispatch<React.SetStateAction<TTodo[]>>}) {

    return array.length > 0 ? 
    array.map((t) => 
    <TodoKarte 
        key={t.id}
        todo={t}
        setArray={setArray}
        />
    ) :
    <div><p>no results!</p></div>
}