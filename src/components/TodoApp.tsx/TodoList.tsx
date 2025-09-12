
import ConnectedTodoKarte from "./TodoKarte";
import { getTodosState, type TTodo } from "../../store/todoSlice";


export default function TodoList ({ todos } : { todos: TTodo[]}) {
    const { filteredArray } = getTodosState()
    return filteredArray.length > 0 ? 
    filteredArray.map((t) => 
    <ConnectedTodoKarte 
        key={t.id}
        todo={t}
        />
    ) :
    <div><p>no todos</p></div>
}


parent holds filter
todolist filteredarray
filtereditor filter in local 
updattefilter in local, submit triggers updatestore

vorteile: useArray geben uns: array und setInterval, um mit  dem array zu operieren. 
dispatch nur fur entfernund, hinzufugun von neuen todos 
filtering logik von der store getreent, handelt bei todoService 

todolist re renders mit neues array automatisch. 



// weg 2 
// store hold mein filteredobjekt
// store hold map und ids 
// update filteredobjekt
// update filter = updatearray
// andert sich alles in derselber PiFirstAidKitDuotone
// mein filter ist nicht mit mein Zustand verbindet, also es kann nur lokale setInterval. mein Store sollte sich nur um mein busnesi logik handeln SlEnvolopeLetter.
