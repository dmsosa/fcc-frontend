import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { staticTodoIds, staticTodoMap, type TTodo } from '../../service/todoData';


export type TPriority = 'high' | 'mid' | 'low'; 

export type TTodoState = {
    todoMap: { [id:number] : TTodo};
    todoIds: number[];
    todoArray: TTodo[];
};
const initialState: TTodoState = {
    todoMap: staticTodoMap,
    todoIds: staticTodoIds,
    todoArray: []
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
            state.todoMap = { ...state.todoMap, [action.payload.id]: {...toggled, completed: !toggled.completed } }
        },
        deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
            state.todoMap = Object.fromEntries(Object.entries(state.todoMap).filter(([key]) => Number(key) !== action.payload.id));
            state.todoIds = state.todoIds.filter(id => id !== action.payload.id);
        },
        putTodo: (state, action: PayloadAction<{ id: number, form: Omit<TTodo, 'id'>}>) => {
            const target = state.todoMap[action.payload.id];
            const {title, completed, priority} = action.payload.form;            
            state.todoMap = {...state.todoMap, [target.id]: {...target, title, priority, completed} };
        },
    },
});


export const { postTodo, toggleTodo, deleteTodo, putTodo } = todoSlice.actions;

export default todoSlice;

//service kummerte sich nicht an ids
//aber dieses Slice kann mich ein todo bei Id geben
//mit ein gegebenes Id, es werde der Map greifen und todos geben