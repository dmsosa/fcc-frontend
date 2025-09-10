
import { connect, type ConnectedProps } from "react-redux";
import { getTodos } from "../../store/todoSlice";
import type { RootState } from "../../store";
import ConnectedTodoKarte from "./TodoKarte";


const mapStateToProps = (state: RootState) => {
    const todos = getTodos(state);
  return { todos };
}

function TodoList ({ todos }: PropsFromRedux  ) {
    return todos ? 
    todos.map((t) => 
    <ConnectedTodoKarte 
        key={t.id}
        todo={t}
        />
    ) :
    <div><p>no todos</p></div>
}

const connector = connect(mapStateToProps, null);

type PropsFromRedux = ConnectedProps<typeof connector>;
export const ConnectedTodoList = connector(TodoList);

