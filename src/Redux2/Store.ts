import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { suppliersReducersContainer } from "./SuppliersSlice";
import { authActionsCreator, authReducersContainer } from "./AuthSlice";

// ________________________________________
// REDUX - using new version - 
// 1. npm i @reduxjs/toolkit
// 2. npm i react-redux @types/react-redux
// ________________________________________


// creating the application store - the redux manager object:
export const appStore = configureStore<AppState>({
    reducer: {
        // take the name from AppState.ts
        suppliers: suppliersReducersContainer,
        user: authReducersContainer
        // reducers of other slices...
    }
})