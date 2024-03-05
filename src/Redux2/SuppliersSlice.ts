import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SupplierModel from "../Models/SupplierModel";
// ________________________________________
// REDUX - using new version - 
// 1. npm i @reduxjs/toolkit
// 2. npm i react-redux @types/react-redux
// ________________________________________


// Managing a piece/slice of the data in the app:

// reducer for adding all suppliers into the global state:

// payload: suppliers array to add to the global state:
function initAll(currentState: SupplierModel[], action: PayloadAction<SupplierModel[]>): SupplierModel[] {
    return action.payload;
}

// payload: supplier object to add to the slice:
function addOne(currentState: SupplierModel[], action: PayloadAction<SupplierModel>): SupplierModel[] {
    let newState = [...currentState, action.payload];
    return newState;
}

// payload: supplier to delete by id:
function deleteOne(currentState: SupplierModel[], action: PayloadAction<number>): SupplierModel[] {
    let newState = [...currentState];
    let indexToDelete = newState.findIndex(s => s.id === action.payload);
    newState.splice(indexToDelete, 1);
    return newState;
}

// create suppliers slice:
const suppliersSlice = createSlice({
    name: "suppliers",
    initialState: [],
    reducers: { initAll, addOne, deleteOne }
});

// expose a single object containing functions for creating action objects:
export const suppliersActionsCreator = suppliersSlice.actions;

// expose a single object containing all reducers:
export const suppliersReducersContainer = suppliersSlice.reducer;

