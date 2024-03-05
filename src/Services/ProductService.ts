import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { ProductAction, ProductsActionType, productsStore } from "../Redux/ProductState";
import appConfig from "../Utils/AppConfig";

class ProductService {
    // ________________________________________
    // REDUX - using old version - npm i redux
    // ________________________________________

    // get all products from backend:
    public async getAllProducts(): Promise<ProductModel[]> {

        // Get products from global state:
        let products = productsStore.getState().products;

        if (products.length === 0) {
            // get all products into response object:
            let response = await axios.get<ProductModel[]>(appConfig.productsUrl);

            // extract the products from the response:
            products = response.data;

            // Save products in global state:
            let action: ProductAction = { type: ProductsActionType.SetProducts, payload: products }
            productsStore.dispatch(action);
        }

        // return products:
        return products;
    };

    // get single product by id:
    public async getOneProduct(id: number): Promise<ProductModel> {

        let products = productsStore.getState().products;
        let product = products.find(p => p.id === id);

        if (!product) {
            let response = await axios.get<ProductModel>(appConfig.productsUrl + id);
            product = response.data;

        }
        return product;
    }

    // add new product:
    public async addProduct(product: ProductModel): Promise<void> {

        // additional data sent in the request for configuration:
        let options = {
            headers: { "Content-Type": "multipart/form-data" } //Include files in the request
        };

        let response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);

        let newProduct = response.data;

        // update global state:
        let action: ProductAction = { type: ProductsActionType.AddProduct, payload: newProduct };
        productsStore.dispatch(action);
    }

    // update product:
    public async updateProduct(product: ProductModel): Promise<void> {

        // additional data sent in the request for configuration:
        let options = {
            headers: { "Content-Type": "multipart/form-data" } //Include files in the request
        };

        let response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, options);

        let updatedProduct = response.data;

        let action: ProductAction = { type: ProductsActionType.UpdateProduct, payload: updatedProduct };
        productsStore.dispatch(action);
    }

    // delete product from back
    public async deleteProduct(id: number): Promise<void> {
        await axios.delete<ProductModel>(appConfig.productsUrl + id);
        let action: ProductAction = { type: ProductsActionType.DeleteProduct, payload: id };
        productsStore.dispatch(action);
    }

    public async clearAll():Promise<void>{
        let action:ProductAction={type:ProductsActionType.ClearAll};
        productsStore.dispatch(action);
    }
}



const productService = new ProductService();

export default productService;