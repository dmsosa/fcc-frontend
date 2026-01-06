import { createAsyncThunk } from "@reduxjs/toolkit";
import quotesService from "../../service/quotesService";
import type { AppDispatch, RootState } from "../store";
//Typed createAsyncThunk
export const createTypedAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>();

export const fetchQuotes = createTypedAsyncThunk(
  "quotes/fetchQuotes",
  (_, thunkAPI) => {
    return quotesService.getAll()
    .then(data => { 
        console.log('fulfilled quotesArray request')
        return thunkAPI.fulfillWithValue(data); 
    })
    .catch((error) => { 
      console.log(error)
      return thunkAPI.rejectWithValue({});
    });
  }
);