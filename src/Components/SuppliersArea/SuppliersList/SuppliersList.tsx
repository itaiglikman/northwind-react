import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SupplierModel from "../../../Models/SupplierModel";
import { appStore } from "../../../Redux2/Store";
import notifyService from "../../../Services/NotifyService";
import suppliersService from "../../../Services/SuppliersService";
import "./SuppliersList.css";

function SuppliersList(): JSX.Element {

    // ________________________________________
    // REDUX - using new version - 
    // 1. npm i @reduxjs/toolkit
    // 2. npm i react-redux @types/react-redux
    // ________________________________________

    const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);

    useEffect(() => {
        // get data a first from the global state or server:
        suppliersService.getAllSuppliers()
            .then(s => setSuppliers(s))
            .catch(err => notifyService.error(err))

        // subscribe for changes in the global state:
        const unsubscribe = appStore.subscribe(() =>
            setSuppliers(appStore.getState().suppliers));

        // unsubscribe when component is killed:
        return unsubscribe;
    }, []);

    // delete an object by id:
    async function deleteOne(id: number): Promise<void> {
        try {
            await suppliersService.deleteSupplier(id);
            notifyService.success("successfully deleted");
        } catch (err) { notifyService.error(err) }
    }

    return (
        <div className="SuppliersList">
            <span>SuppliersList</span><br />
            <span>
                <NavLink to={"/suppliers/new"}>Add</NavLink>
            </span><br />
            <table>
                <thead>
                    <tr>
                        <th>company</th>
                        <th>country</th>
                        <th>city</th>
                        <th>address</th>
                        <th>phone</th>
                        <th>image</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(s =>
                        <tr key={s.id}>
                            <td>{s.company}</td>
                            <td>{s.country}</td>
                            <td>{s.city}</td>
                            <td>{s.address}</td>
                            <td>{s.phone}</td>
                            <td><img src={s.imageUrl} /></td>
                            <td>
                                <button onClick={() => deleteOne(s.id)}>delete</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>

        </div>
    );
}

export default SuppliersList;
