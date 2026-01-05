//We specifically recommend creating the middleware instance in a 
// separate file from the actual configureStore() call:

// listenerMiddleware.ts
import { addListener, createListenerMiddleware, isAnyOf, type PayloadAction, type TypedAddListener, type TypedStartListening } from '@reduxjs/toolkit'
import { getLS, setLS } from '../helpers';
import { AppLSOptions, type AppDispatch, type RootState } from './store';
import { fetchQuotes } from './quotesSlice/thunks';
import type { TQuote } from './quotesSlice/quotesSlice';
import type { TTodo } from '../service/todoData';


export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>

startAppListening({
    matcher: isAnyOf(fetchQuotes.fulfilled),
    effect: (action: PayloadAction<TQuote[] | TTodo[]>, listenerApi) => {
    // Cancel any in-progress instances of this listener
      listenerApi.cancelActiveListeners()

      // Delay before starting actual work
      listenerApi.delay(500)

      // do work here
      const target = action.type.split('/')[0];
        //If not saved to LS yet, save it
        if (!getLS(target, AppLSOptions)) {
            setLS(target, action.payload, AppLSOptions);
        } else {
            console.log('exist')
            return;
        }
    }
});
