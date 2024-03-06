import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";
import { authActionsCreator } from "../Redux2/AuthSlice";
import { appStore } from "../Redux2/Store";
import { jwtDecode } from "jwt-decode";

class AuthService {

    // __________
    // REDUX:
    // __________
    // public async register(user: UserModel): Promise<void> {

    //     let response = await axios.post<string>(appConfig.registerUrl, user); //get back token from type string
    //     let token = response.data;

    //     // set action and send the token as payload:
    //     let action: AuthAction = { type: AuthActionType.Register, payload: token };
    //     authStore.dispatch(action);
    // }

    // public async login(credentials: CredentialsModel): Promise<void> {
    //     // POST for not exposing the password in the url:
    //     let response = await axios.post<string>(appConfig.loginUrl, credentials);
    //     let token = response.data;

    //     let action: AuthAction = { type: AuthActionType.Login, payload: token };
    //     authStore.dispatch(action);
    // }

    // public logout(): void {
    //     let action: AuthAction = { type: AuthActionType.Logout };
    //     authStore.dispatch(action);
    // }

    // -------------------------------------------------------------------------------------
    // __________
    // REDUX TOOLKIT:
    // __________
    // constructor:
    // on page load/refresh (resolve auto logout on refresh) -->
    // get loggedIn user from storage if exists:
    public constructor() {
        // get token from local storage:
        let token = localStorage.getItem("token");
        if (token) {
            let loggedUser = jwtDecode<{ user: UserModel }>(token).user;
            let action = authActionsCreator.login(loggedUser);
            appStore.dispatch(action);
        }
    }

    public async register(user: UserModel): Promise<void> {

        let response = await axios.post<string>(appConfig.registerUrl, user); //get back token from type string
        let token = response.data;

        let registeredUser = jwtDecode<{ user: UserModel }>(token).user;

        // set action and send the token as payload:
        let action = authActionsCreator.register(registeredUser);
        appStore.dispatch(action);

        // save token in local storage:
        localStorage.setItem("token", token);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        // POST for not exposing the password in the url:
        let response = await axios.post<string>(appConfig.loginUrl, credentials);
        let token = response.data;

        let loggedUser = jwtDecode<{ user: UserModel }>(token).user;

        let action = authActionsCreator.login(loggedUser);
        appStore.dispatch(action);

        // save token in local storage:
        localStorage.setItem("token", token);
    }

    // logout:
    public logout(): void {
        // clear global state:
        appStore.dispatch(authActionsCreator.logout());

        // clear local storage:
        localStorage.removeItem("token");
    }


}

const authService = new AuthService();
export default authService;