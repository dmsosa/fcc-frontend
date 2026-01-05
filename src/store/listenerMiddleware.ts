//We specifically recommend creating the middleware instance in a 
// separate file from the actual configureStore() call:

// listenerMiddleware.ts
import { createListenerMiddleware } from '@reduxjs/toolkit'


export const listenerMiddleware = createListenerMiddleware()
