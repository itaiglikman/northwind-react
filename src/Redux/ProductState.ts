import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// ________________________________________
// redux library: npm i redux
// ________________________________________

// 1. Global State
export class ProductsState {
    public products: ProductModel[] = []; // Init with empty array.
}

// 2. Action Type:
export enum ProductsActionType {
    SetProducts = "SetProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct", 
    DeleteProduct = "DeleteProduct",
    ClearAll = "ClearAll",
}

// 3. Action Object:
export interface ProductAction {
    type: ProductsActionType; // Wanted action type from the given options.
    payload?: any; // The data related to that action.
}

// 4. Reducer (invoked by redux library):
// Function will get the given item (Global State) and the given action (Action Object).
// Function will do the wanted action on the wanted state and return the updated state:
export function productsReducer(
    currentState = new ProductsState(),
    action: ProductAction
): ProductsState {

    const newState = { ...currentState }; //Duplicate the global state.
    // Change the duplicated global state according to the action:
    switch (action.type) {

        // Set Products:
        case ProductsActionType.SetProducts: //Here the payload is products array.
            newState.products = action.payload; //Save all products into global state.
            break;

        // Add A product:
        case ProductsActionType.AddProduct: //Here the payload is a single product to add.
            newState.products.push(action.payload); //Add the wanted product to the products array in the global state.
            break;

        // Delete A Product:
        case ProductsActionType.DeleteProduct: //Here the payload is a single product to delete.
            // get the id of the wanted item:
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.products.splice(indexToDelete, 1);
            break;

        // Update A Product:
        case ProductsActionType.UpdateProduct: //Here the payload is a single product to update.
            // get the id of the wanted item:
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);

            // as long as the index was found update the date (not -1):
            if (indexToUpdate >= 0) newState.products[indexToUpdate] = action.payload;
            break;

        // clear all products from global state:
        case ProductsActionType.ClearAll: // Here no payload.
            newState.products = [];
            break;

    }

    return newState; //Return the changed duplicated global state.
}

// 5. Store:
export const productsStore = createStore(productsReducer); //initiating redux library.