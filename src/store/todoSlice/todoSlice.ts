import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { staticTodoIds, staticTodoMap } from '../../service/todoService';


export type TTodo = {
    id: number,
    title: string,
    completed: boolean,
    priority: 'high'| 'mid' | 'low',
};
export type TTodoState = {
    todoMap: { [id:number] : TTodo};
    todoIds: number[];
    editorMode: boolean;
    targetId: number | null ;
};
const initialState: TTodoState = {
    todoMap: staticTodoMap,
    todoIds: staticTodoIds,
    editorMode: true,
    targetId: 1,
}
let nextTodoId = 0;

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        postTodo: (state, action: PayloadAction<{ title: string }>) => {
            const newTodo: TTodo = {
                id: nextTodoId++,
                title: action.payload.title,
                completed: false,
                priority: 'mid',
            };
            state.todoMap[newTodo.id] = newTodo;
            state.todoIds.push(newTodo.id);
        },
        toggleTodo: (state, action: PayloadAction<{ id: number }>) => {
            const toggled = state.todoMap[action.payload.id];
            state.todoMap = { ...state.todoMap, [toggled.id]: {...toggled, completed: !toggled.completed } }
        },
        deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
            state.todoMap = Object.fromEntries(Object.entries(state.todoMap).filter(([key]) => Number(key) !== action.payload.id));
            state.todoIds = state.todoIds.filter(id => id !== action.payload.id);
        },
        putTodo: (state, action: PayloadAction<{ id: number, todo: Omit<TTodo, 'id'>}>) => {
            const target = state.todoMap[action.payload.id];
            const { title, priority } = action.payload.todo;
            state.todoMap = {...state.todoMap, [target.id]: {...target, title, priority} };
        },
        toggleEditorMode: (state ) => {
            state.editorMode = !state.editorMode;
        },
        setTargetId: (state, action: PayloadAction<{ id: number }>) => {
            state.targetId = action.payload.id;
        }
    }
});
export const { postTodo, toggleTodo, deleteTodo, putTodo, toggleEditorMode, setTargetId } = todoSlice.actions;


export default todoSlice;