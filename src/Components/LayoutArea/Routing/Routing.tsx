import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import CategoriesList from "../../CategoriesArea/CategoriesList/CategoriesList";
import EmployeesList from "../../EmployeesArea/EmployeesList/EmployeesList";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductList from "../../ProductsArea/ProductList/ProductList";
import UpdateProduct from "../../ProductsArea/UpdateProduct/UpdateProduct";
import AddSupplier from "../../SuppliersArea/AddSupplier/AddSupplier";
import SuppliersList from "../../SuppliersArea/SuppliersList/SuppliersList";
import Page404 from "../Page404/Page404";
import CategoryDetails from "../../CategoriesArea/CategoryDetails/CategoryDetails";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/details/:id" element={<ProductDetails />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />
            <Route path="/suppliers" element={<SuppliersList />} />
            <Route path="/suppliers/new" element={<AddSupplier />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/details/:id" element={<CategoryDetails />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default Routing;
