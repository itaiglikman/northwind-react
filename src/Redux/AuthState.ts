import { jwtDecode } from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

export class AuthState {
    public token: string = null; //JWT
    public user: UserModel = null; //initiate as null
    public constructor() { //set items to save in local storage:
        this.token = localStorage.getItem("token");
        if (this.token)
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType,
    payload?: string
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    let newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Login: //payload is JWT Token (string) containing the user
        case AuthActionType.Register://payload is JWT Token (string) containing the user
            newState.token = action.payload;//save token

            // decode the token  and get the user object
            // generic function that returns user object
            // get the token, decode it and return the user object in it
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
            // save in local storage to avoid losing data on refresh:
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            // clear global state:
            newState.token = null;
            newState.user = null;
            // clear local storage:
            localStorage.removeItem("token");
            break;

        default:
            break;
    }

    return newState;
}

export const authStore = createStore(authReducer);

