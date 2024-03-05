class AppConfig {
    public readonly productsUrl = "http://localhost:3030/api/products/";
    public readonly employeesUrl = "http://localhost:3030/api/employees/";
    public readonly suppliersUrl = "http://localhost:3030/api/suppliers/";
    public readonly categoriesUrl = "http://localhost:3030/api/categories/";
    public readonly registerUrl = "http://localhost:3030/api/register/";
    public readonly loginUrl = "http://localhost:3030/api/login/";

    public readonly axiosOptions = {
        //Include files in the request
        headers: { "Content-Type": "multipart/form-data" }

    }
}

const appConfig = new AppConfig();

export default appConfig;