import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { AppLSOptions, type IAsyncSlice } from '../types';
import { getLS } from '../../helpers';

export type TTodoPriority = 'high'  | 'medium' | 'low';
export type TTodo = {
    id: string,
    text: string,
    completed: boolean,
    priority: TTodoPriority; 
};
export interface ITodoState extends IAsyncSlice {
    array: TTodo[];
};
const initialState: ITodoState = {
    array: [],
    status: 'idle',
    error: undefined,
    ...(getLS('todos', AppLSOptions))
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        todoAdded: {
            reducer: (state, action: PayloadAction<TTodo>) => {
                state.array.push(action.payload);
            },
            prepare: (text: string, priority: TTodoPriority) => {
                return {
                    payload: {
                        text,
                        priority,
                        id: nanoid(),
                        completed: false
                    }
                }
            }
           },
        todoRemoved: (state, action: PayloadAction<{ id: string }>) => {
            state.array = state.array.filter(( todo ) => todo.id != action.payload.id);
        }
    },
});


export const { todoAdded, todoRemoved } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos;
export const selectTodosArray = (state: RootState) => state.todos.array;

export default todoSlice;

//service kummerte sich nicht an ids
//aber dieses Slice kann mich ein todo bei Id geben
//mit ein gegebenes Id, es werde der Map greifen und todos geben