import { createEntityAdapter, createSlice, nanoid, type EntityState, type PayloadAction } from '@reduxjs/toolkit';
import { type IAsyncSlice } from '../types';
import type { RootState } from '../store';

export type TAuthor = {
    id: string,
    name: string,
    bio: string,
    birth: Date,
    dead?: Date
};
export interface IAuthorState extends IAsyncSlice, EntityState<TAuthor, string> {
};

const AuthorsAdapter = createEntityAdapter<TAuthor>({
    sortComparer: (a, b) => a.name[0].localeCompare(b.name[0])
})
const initialState: IAuthorState = AuthorsAdapter.getInitialState({
    status: 'idle',
    error: undefined,
    // ...(getLS('Authors', AppLSOptions))
});
const authorSlice = createSlice({
    name: 'authors',
    initialState: initialState,
    reducers: {
        authorUpdated: (state, action: PayloadAction<TAuthor>) => {
            const { id, name } = action.payload;
            AuthorsAdapter.updateOne(state, { id, changes: { name } });
        },
        authorAdded: {
            reducer: (state, action: PayloadAction<TAuthor>) => {
                AuthorsAdapter.addOne(state, { ...action.payload });
            },
            prepare: (name: string, bio: string, birth: Date, dead: Date | undefined) => {
                return { 
                    payload: {
                        id: nanoid(),
                        name,
                        bio,
                        birth,
                        dead
                    }
                }
            }
        },
        authorRemoved: (state, action: PayloadAction<{ id: string }>) => {
            AuthorsAdapter.removeOne(state, action.payload.id);
        },
        //Authors does not have API call, sondern von quotes gerstell wird.
        authorsLoaded: (state, action: PayloadAction<string[]>) => {
            const allAuthors = action.payload.map((name) => ({ name, id: nanoid(), bio: 'Sample bio', birth: new Date() }));
            AuthorsAdapter.setAll(state, allAuthors);
        }
    }
});

export const { authorAdded, authorUpdated, authorRemoved, authorsLoaded } = authorSlice.actions;


//Selectors
export const {
  selectAll: selectAllAuthors,
  selectById: selectAuthorsById,
  selectIds: selectAuthorsIds
  // Pass in a selector that returns the posts slice of state
} = AuthorsAdapter.getSelectors((state: RootState) => state.authors);

// export const selectPostsByUser = createSelector(
//   [selectAllAuthors, (state: RootState, userId: string) => userId],
//   (posts, userId) => posts.filter(post => post.user === userId)
// )

export default authorSlice;