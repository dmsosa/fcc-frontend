import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { staticTodoIds, staticTodoMap } from '../../service/todoService';
import { useSelector } from 'react-redux';


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
    deleteMode: boolean;
    targetId: number | null ;
    filterObject: Partial<TTodo>;
    todoArray: TTodo[];
};
const initialState: TTodoState = {
    todoMap: staticTodoMap,
    todoIds: staticTodoIds,
    editorMode: true,
    deleteMode: true,
    targetId: 1,
    filterObject: {},
    todoArray: [],
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
        putTodo: (state, action: PayloadAction<{ id: number, form: Omit<TTodo, 'id'>}>) => {
            const target = state.todoMap[action.payload.id];
            const {title, completed, priority} = action.payload.form;            
            state.todoMap = {...state.todoMap, [target.id]: {...target, title, priority, completed} };
        },
        toggleEditorMode: (state ) => {
            state.editorMode = !state.editorMode;
        },
        toggleDeleteMode: (state ) => {
            state.deleteMode = !state.deleteMode;
        },
        setTargetId: (state, action: PayloadAction<{ id: number }>) => {
            state.targetId = action.payload.id;
        },
        updateFilterObject: (state, action: PayloadAction<Partial<TTodo>>) => {
            state.filterObject.title = action.payload.title;
            state.filterObject.completed = action.payload.completed;
            state.filterObject.priority = action.payload.priority;
        },
        updateArray: (state, action: PayloadAction<Partial<TTodo>>) => {
            state.filterObject.title = action.payload.title;
            state.filterObject.completed = action.payload.completed;
            state.filterObject.priority = action.payload.priority;
        }
    }
});
export const { postTodo, toggleTodo, deleteTodo, putTodo, toggleEditorMode, toggleDeleteMode, setTargetId, updateFilterObject, updateArray } = todoSlice.actions;

export default todoSlice;