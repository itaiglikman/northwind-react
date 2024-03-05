import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";

class CategoriesService {

    // get all categories:
    // this is an authorized request. to get the info the user must be logged in
    // and the request must have headers option added.
    // by a custom interceptor the headers is automatically added to the request
    // (displayed in the index.tsx) 
    public async getAllCategories(): Promise<CategoryModel[]> {
        // headers containing the logged-in token.
        // this api request won't be authorized without a token.
        // let options = {
        //     headers: { "Authorization": "Bearer " + authStore.getState().token }
        // }


        // adding the token header for the request:
        let response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
        let categories = response.data;
        return categories;
    }

    public async getOneCategory(id: number): Promise<CategoryModel> {
        let response = await axios.get<CategoryModel>(appConfig.categoriesUrl + id);
        let category = response.data;
        return category;
    }

}

let categoriesService = new CategoriesService();

export default categoriesService;