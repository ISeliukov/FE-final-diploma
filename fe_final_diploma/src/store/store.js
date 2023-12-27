import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "../subroutines/getsomequery";
import { aditional } from "../subroutines/aditional";
import formReducer from "../subroutines/ticketform";
import trainsCatalogReducer from "../subroutines/trainscatalog";

const myMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware).concat(aditional.middleware);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [aditional.reducerPath]: aditional.reducer,
    formTickets: formReducer,
    trainsCatalog: trainsCatalogReducer,
  },
  middleware: myMiddleware,
});

export { store };

setupListeners(store.dispatch);
