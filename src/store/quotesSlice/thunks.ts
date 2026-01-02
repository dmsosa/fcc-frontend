import { getQuotes } from "../../service/quotesService";
import type { AppDispatch } from "../store"
import { quotesLoaded, quotesLoading } from "./quotesSlice"

export const getQuotesThunk = () => {
    return async function (dispatch: AppDispatch) {
        dispatch(quotesLoading());
        getQuotes().then((data) => {
            dispatch(quotesLoaded({ quotes: data}))
            console.log(data);
        }).catch((err) => {
            console.group();
            console.log('error');
            console.log(err);
            console.groupEnd();
        });
    }
}
