import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productsStore } from "../../../Redux/ProductState";
import notifyService from "../../../Services/NotifyService";
import productService from "../../../Services/ProductService";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList(): JSX.Element {

    // ________________________________________
    // REDUX - using old version - npm i redux
    // ________________________________________

    // menage frontend products state:
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {

        // get Backend Products by async Service Function:
        productService.getAllProducts()
            .then(p => setProducts(p))
            .catch(err => notifyService.error(err));

        const unsubscribe = productsStore.subscribe(() =>
            setProducts(productsStore.getState().products));

        return unsubscribe;
    }, [])

    async function clearProducts() {
        await productService.clearAll();
        notifyService.success("cleared");
    }

    return (
        <div className="ProductList">
            
            <button onClick={clearProducts}>clear</button>
            <br />
            <span className="newBtn">
                <NavLink to={"/products/new"}>Add</NavLink>
            </span>
            {products.map(p => <ProductCard key={p.id} product={p} />)}

        </div >
    );
}

export default ProductList;
