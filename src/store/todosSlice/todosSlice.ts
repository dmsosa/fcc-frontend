import { createEntityAdapter, createSlice, nanoid, type EntityState, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { type IAsyncSlice } from '../types';
import { fetchTodos } from './thunks';

export type TTodoPriority = 'high'  | 'medium' | 'low';
export type TTodo = {
    id: string,
    text: string,
    completed: boolean,
    priority: TTodoPriority; 
};
export interface ITodoState extends IAsyncSlice, EntityState<TTodo, string> {
};

const todosAdapter = createEntityAdapter<TTodo>();

const initialState: ITodoState = todosAdapter.getInitialState({
    status: 'idle',
    error: undefined,
    // ...(getLS('quotes', AppLSOptions))
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        todoAdded: {
            reducer: (state, action: PayloadAction<TTodo>) => {
                todosAdapter.addOne(state, action.payload);
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
            todosAdapter.removeOne(state, action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = "loading";
            state.error = undefined;
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "completed";
            state.error = undefined;
            todosAdapter.setAll(state, action.payload);
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = "failed";
            if (action.payload) {
                state.error = action.payload.errorCustom;
            } else {
                state.error = action.error.message;
            }
        })
    }
});


export const { todoAdded, todoRemoved } = todoSlice.actions;
//Selectors
export const {
  selectAll: selectAllTodos,
  selectById: selectTodosById,
  selectIds: selectTodosIds
  // Pass in a selector that returns the posts slice of state
} = todosAdapter.getSelectors((state: RootState) => state.todos);

export default todoSlice;

//service kummerte sich nicht an ids
//aber dieses Slice kann mich ein todo bei Id geben
//mit ein gegebenes Id, es werde der Map greifen und todos geben