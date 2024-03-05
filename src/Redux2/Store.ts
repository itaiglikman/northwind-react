import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { suppliersReducersContainer } from "./SuppliersSlice";

// ________________________________________
// REDUX - using new version - 
// 1. npm i @reduxjs/toolkit
// 2. npm i react-redux @types/react-redux
// ________________________________________


// creating the application store - the redux manager object:
export const appStore = configureStore<AppState>({
    reducer: {
        suppliers: suppliersReducersContainer
        // reducers of other slices...
    }
})