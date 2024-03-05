
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productService from "../../../Services/ProductService";
import "./ProductDetails.css";

function ProductDetails(): JSX.Element {

    let params = useParams();
    let id = +params.id;
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductModel>();

    useEffect(() => {
        productService.getOneProduct(id)
            .then(p => setProduct(p))
            .catch(err => notifyService.error(err));
    }, []);

    async function deleteProduct(): Promise<void> {
        try {
            await productService.deleteProduct(id);
            notifyService.success("product has been deleted");
            navigate("/products")
        } catch (err: any) { notifyService.error(err) }
    }

    return (
        <div className="ProductDetails">
            <span>Name: {product?.name}</span>
            <span>Price: {product?.price}</span>
            <span>Stock: {product?.stock}</span>
            <span><img src={product?.imageUrl} /></span>
            <NavLink to={"/products"}>Back</NavLink>
            <span> | </span>
            <NavLink to={"/products/update/" + id}>Update</NavLink>
            <span> | </span>
            <button onClick={deleteProduct} >Delete</button>
        </div>
    );
}

export default ProductDetails;
