//We specifically recommend creating the middleware instance in a 
// separate file from the actual configureStore() call:

// listenerMiddleware.ts
import { addListener, createListenerMiddleware, isAnyOf, type PayloadAction, type TypedAddListener, type TypedStartListening } from '@reduxjs/toolkit'
import { type AppDispatch, type RootState } from './store';
import { quoteAdded, type TQuote } from './quotesSlice/quotesSlice';
import { AppLSOptions } from './types';
import { getLS, setLS } from '../helpers';
import { todoAdded, type TTodo } from './todoSlice';



export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>

startAppListening({
    matcher: isAnyOf(quoteAdded, todoAdded),
    effect: (action: PayloadAction<TQuote | TTodo>, listenerApi) => {
    // Cancel any in-progress instances of this listener
      listenerApi.cancelActiveListeners()

      // Delay before starting actual work
      listenerApi.delay(500)

      const category = action.type.split('/')[0];
      let existingArray = getLS<TQuote[] | TTodo[]>(category, AppLSOptions);
      // do work here
        if (!existingArray) {
            console.log(`Category array for: '${category}' does not exist in Local Storage, skipping persisting in Local Storage for '${action.type}'`);
        } else {
            switch (category) {
                case 'quotes': {
                    existingArray = existingArray as TQuote[];
                    setLS(category, { array: existingArray.push(action.payload as TQuote) }, AppLSOptions);
                    break;
                }
                case 'todos': {
                    existingArray = existingArray as TTodo[];
                    setLS(category, { array: existingArray.push(action.payload as TTodo) }, AppLSOptions);
                    break;
                }
                default: {
                    console.log(`Category array couldn't be found for: '${category}', skipping persisting in Local Storage for '${action.type}'`);
                    break;
                }
            }
        }
    }
});
