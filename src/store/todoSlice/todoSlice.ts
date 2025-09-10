import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


export type TTodo = {
    id: number,
    title: string,
    completed: boolean,
    priority: 'high'| 'mid' | 'low',
};
export type TTodoState = {
    todoMap: { [id:number] : TTodo};
    todoIds: number[];
    filter: string;
    editorMode: boolean;
    targetId: number | null ;
};
const initialState: TTodoState = {
    todoMap: { 1: { id: 1, title: 'test', priority: 'mid', completed: false }},
    todoIds: [1],
    filter: '',
    editorMode: true,
    targetId: 1,
}
var nextTodoId = 0;

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
        },
    }
});

export const { postTodo, toggleTodo, deleteTodo, putTodo, toggleEditorMode, setTargetId } = todoSlice.actions;

export const getTodosState = (rootState: RootState) => rootState.todo

export const getTodoIds = (rootState: RootState): number[] =>
  getTodosState(rootState) ? getTodosState(rootState).todoIds : []

export const getTodoById = (rootState: RootState, id: number): TTodo | null  =>
  getTodosState(rootState) ? { ...getTodosState(rootState).todoMap[id], id } : null

export const getTodos = (rootState: RootState): TTodo[] => {
    const todos = [];
    const todoIds = getTodoIds(rootState);
    for (const id of todoIds) {
        const t = getTodoById(rootState, id);
        if (!t) continue;
        todos.push(t)
    }
    return todos;
}

// ich brauche mapState von State , wie kann ich es erhalten?
// mapState zu unsere Komponente passen, 
// auf mapSelectorToProps logik GiMachineGun, damit unsere ConnectedKomponente es schon hat, 
// es kann auch ein customHook sein oder 
// todoTarget auf state?
// useSelectorWithTargetedTodo(
//     uses state
// uses targetId from state
// returns targetedTodo


// ) returns targetedTodo,

// useDispatchWithActions, uses dispatch returns toggleTodo, dleete und put 

// mapStateToProps(state) returns targetedTodo 
// mapDispatchToProps = objekete
export default todoSlice;