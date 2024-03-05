import { useForm } from "react-hook-form";
import "./AddSupplier.css";
import SupplierModel from "../../../Models/SupplierModel";
import { useState } from "react";
import suppliersService from "../../../Services/SuppliersService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";

function AddSupplier(): JSX.Element {

    const { register, handleSubmit } = useForm<SupplierModel>();
    const navigate = useNavigate();

    async function send(supplier: SupplierModel) {
        try {
            supplier.image = (supplier.image as unknown as FileList)[0];
            await suppliersService.addSupplier(supplier);
            notifyService.success("new supplier");
            navigate("/suppliers");
        } catch (error) { notifyService.error(error) }

    }

    return (
        <div className="AddSupplier">
            <h3>add</h3>

            <form onSubmit={handleSubmit(send)}>
                <label>company: </label>
                <input type="text" {...register("company")} required />
                <br />

                <label>country: </label>
                <input type="text" {...register("country")} required />
                <br />

                <label>city: </label>
                <input type="text" {...register("city")} required />
                <br />

                <label>address: </label>
                <input type="text" {...register("address")} required />
                <br />

                <label>phone: </label>
                <input type="text" {...register("phone")} required />
                <br />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} required />
                <br />

                <button>Update</button>
            </form>
        </div>
    );
}

export default AddSupplier;
