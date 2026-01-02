import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../store';


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

export interface IAsyncSlice {
    status: 'idle' | 'loading' | 'completed' | 'failed';
    error: string | null;
}