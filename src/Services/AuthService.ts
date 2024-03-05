import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    public async register(user: UserModel): Promise<void> {

        let response = await axios.post<string>(appConfig.registerUrl, user); //get back token from type string
        let token = response.data;

        // set action and send the token as payload:
        let action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        // POST for not exposing the password in the url:
        let response = await axios.post<string>(appConfig.loginUrl, credentials);
        let token = response.data;

        let action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    public logout(): void {
        let action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }

}

const authService = new AuthService();
export default authService;