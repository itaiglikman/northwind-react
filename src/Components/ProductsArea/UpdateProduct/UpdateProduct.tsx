import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productService from "../../../Services/ProductService";
import "./UpdateProduct.css";

function UpdateProduct(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const params = useParams();
    let id = +params.id;

    useEffect(() => {
        productService.getOneProduct(id)
            .then(p => {
                setValue("name", p.name);
                setValue("price", p.price);
                setValue("stock", p.stock);
                // setValue("",p.);
            })
            .catch(err => (err.message));
    }, [])

    async function update(product: ProductModel) {
        try {
            product.id = id;
            product.image = (product.image as unknown as FileList)[0];
            await productService.updateProduct(product);
            navigate("/products");
            notifyService.success("your product has been updated!");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="UpdateProduct">

            <h2>Update Product</h2>

            <form onSubmit={handleSubmit(update)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required maxLength={100} minLength={2} />
                <br />

                <label>Price: </label>
                <input type="number" step={0.01} {...register("price")} required min="0" max="10000" />
                <br />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min="0" max="10000" />
                <br />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} required />
                <br />

                <button>Update</button>

            </form>

        </div>
    );
}

export default UpdateProduct;
