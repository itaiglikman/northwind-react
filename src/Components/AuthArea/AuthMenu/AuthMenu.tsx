import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import useUserAndSubscribe from "../../../Utils/UseUser";
import "./AuthMenu.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux2/AppState";
import UserModel from "../../../Models/UserModel";

function AuthMenu(): JSX.Element {
// __________
// REDUX:
// __________
//custom hook for setting local state and subscribe for changes:
// const user = useUserAndSubscribe();

// __________
// REDUX TOOLKIT:
// __________
    //react-redux hook for setting local state and subscribe for changes:
    //                                  get     , return
    const user: UserModel = useSelector<AppState, UserModel>(appState => appState.user);

    // Logout user:
    function logoutUser() {
        authService.logout();
        notifyService.success("See you later...");
    }

    // display if user is logged-in:
    if (user) return (
        <div className="AuthMenu">
            <span>hello {user.firstName} | </span>
            <NavLink to="/home" onClick={logoutUser}>Logout</NavLink>
        </div>
    )

    // display if user is not logged-in:
    return (
        <div className="AuthMenu">
            <span>Hello Guest | </span>
            <NavLink to={"/auth/register"}>register</NavLink>
            |
            <NavLink to={"/auth/login"}>login</NavLink>
        </div>
    );
}

export default AuthMenu;
