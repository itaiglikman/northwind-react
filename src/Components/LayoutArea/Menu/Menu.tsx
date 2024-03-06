import { NavLink } from "react-router-dom";
import useUserAndSubscribe from "../../../Utils/UseUser";
import TotalProducts from "../TotalProducts/TotalProducts";
import TotalSuppliers from "../TotalSuppliers/TotalSuppliers";
import "./Menu.css";
import UserModel from "../../../Models/UserModel";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux2/AppState";

function Menu(): JSX.Element {
    // __________
    // REDUX:
    //custom hook for setting local state and subscribe for changes:
    // const user = useUserAndSubscribe();
    // __________


    // __________
    // REDUX TOOLKIT:
    const user: UserModel = useSelector<AppState, UserModel>(appState => appState.user);
    // __________

    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/suppliers">Suppliers</NavLink>
            <NavLink to="/employees">Employees</NavLink>
            {/* show only if user is logged in: */}
            {user &&
                <NavLink to="/categories">Categories</NavLink>
            }
            <NavLink to="/about">About</NavLink>
            <TotalProducts />
            <TotalSuppliers />
        </div>
    );
}

export default Menu;
