import SupplierModel from "../Models/SupplierModel"
import UserModel from "../Models/UserModel";

// ________________________________________
// REDUX - using new version - 
// 1. npm i @reduxjs/toolkit
// 2. npm i react-redux @types/react-redux
// ________________________________________


// Application Global State - all of the data in the app as Global State:
export type AppState = {

    // first slice - array of suppliers:
    suppliers: SupplierModel[];

    // second slice...
    // user: UserModel;
}
