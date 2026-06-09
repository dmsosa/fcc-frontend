import { createAsyncThunk } from "@reduxjs/toolkit";
import todosService from "../../service/todosService";
import type { AppDispatch, RootState } from "../store";
import type { TTodo } from ".";
//Typed createAsyncThunk
export const createTypedAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>();

export type ApiError = {
    errorCustom:string
}
export const fetchTodos = createTypedAsyncThunk<TTodo[], void, { rejectValue: ApiError }>(
  "quotes/fetchTodos",
  (_, thunkAPI) => {
    return todosService.getAll()
    .then(data => { 
        return thunkAPI.fulfillWithValue(data); 
    })
    .catch((error) => { 
      console.log(error)
      return thunkAPI.rejectWithValue({ errorCustom: 'myKnown '});
    });
  }
);