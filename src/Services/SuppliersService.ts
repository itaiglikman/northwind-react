import axios from "axios";
import SupplierModel from "../Models/SupplierModel";
import appConfig from "../Utils/AppConfig";
import { appStore } from "../Redux2/Store";
import { suppliersActionsCreator } from "../Redux2/SuppliersSlice";

class SuppliersService {
    // ________________________________________
    // REDUX - using new version - 
    // 1. npm i @reduxjs/toolkit
    // 2. npm i react-redux @types/react-redux
    // ________________________________________

    public async getAllSuppliers(): Promise<SupplierModel[]> {

        // get data from global state if already agists:
        let suppliers = appStore.getState().suppliers;

        if (suppliers.length > 0) return suppliers;

        // if global state don't have data:
        let response = await axios.get<SupplierModel[]>(appConfig.suppliersUrl);
        suppliers = response.data;

        // create action for init all products:
        let action = suppliersActionsCreator.initAll(suppliers);

        // send action to global state:
        appStore.dispatch(action);

        return suppliers;
    }

    // get a single object:
    public async getOneSupplier(id: number): Promise<SupplierModel> {
        // get data from global state:
        let suppliers = appStore.getState().suppliers;
        let supplier = suppliers.find(s => s.id === id);
        // if doesn't exists in global state
        if (!supplier) {
            // get data from server:
            let response = await axios.get<SupplierModel>(appConfig.suppliersUrl + id);
            supplier = response.data;
        }

        return supplier;
    }

    // add suppliers, update server and global state:
    public async addSupplier(supplier: SupplierModel): Promise<void> {
        let response = await axios.post<SupplierModel>(appConfig.suppliersUrl, supplier, appConfig.axiosOptions);
        let addedSupplier = response.data;

        // set accurate action with the wanted payload:
        let action = suppliersActionsCreator.addOne(addedSupplier);
        // send action to global state:
        appStore.dispatch(action);
    }

    // delete a supplier object from server and update global state:
    public async deleteSupplier(id: number): Promise<void> {
        // delete from server:
        await axios.delete<SupplierModel>(appConfig.suppliersUrl + id);
        // set action and payload:
        let action = suppliersActionsCreator.deleteOne(id);
        // update global state:
        appStore.dispatch(action);
    }

}


const suppliersService = new SuppliersService();

export default suppliersService;