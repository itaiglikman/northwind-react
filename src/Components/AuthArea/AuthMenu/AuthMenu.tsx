import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import useUserAndSubscribe from "../../../Utils/UseUser";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    //custom hook for setting local state and subscribe for changes:
    const user = useUserAndSubscribe();

    // Logout user:
    function logoutUser() {
        authService.logout();
        notifyService.success("See you later...");
    }

    // display if user is logged-in:
    if (user) return (
        <div className="AuthMenu">
            <span>hello {user.firstName} | </span>
            <button onClick={logoutUser}>Logout</button>
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
