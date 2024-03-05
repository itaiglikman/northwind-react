import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productService from "../../../Services/ProductService";
import "./AddProduct.css";
import notifyService from "../../../Services/NotifyService";

function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<ProductModel>();
    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {
            console.log(product.image);
            product.image = (product.image as unknown as FileList)[0];
            console.log(product.image);
            await productService.addProduct(product);
            navigate("/products");
            notifyService.success("your product has been added!");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddProduct">
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required maxLength={100} minLength={2}/>
                <br />

                <label>Price: </label>
                <input type="number" step={0.01} {...register("price")} required min="0" max="10000"/>
                <br />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min="0" max="10000"/>
                <br />

                <label>Image: </label>
                <input type="file" multiple accept="image/*" {...register("image")} required/>
                <br />

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddProduct;
