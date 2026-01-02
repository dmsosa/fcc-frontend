import { getQuotes } from "../../service/quotesService";
import type { AppDispatch } from "../store"
import { quotesLoaded, quotesLoading } from "./quotesSlice"

export const getQuotesThunk = () => {
    return async function (dispatch: AppDispatch) {
        dispatch(quotesLoading());
        getQuotes().then((data) => {
            dispatch(quotesLoaded({ quotes: data}));
        }).catch((err) => {
            console.group();
            console.error('error');
            console.error(err);
            console.groupEnd();
        });
    }
}
