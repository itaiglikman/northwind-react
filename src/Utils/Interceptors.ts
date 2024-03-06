import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {
    // create app interceptors:
    public create(): void {
        // registering to request interceptors:
        axios.interceptors.request.use(requestObject => {
            // request object containing data sent with any request.
            // _____________
            // REDUX:
            // let token = authStore.getState().token;
            // _____________
            
            // _____________
            // REDUX TOOLKIT:
            let token = localStorage.getItem("token");
            // _____________
            
            // if token exist & request demands auth header - add headers:
            if (token) 
                requestObject.headers.Authorization = "Bearer " + token;

            return requestObject;
        })
    }
}
const interceptors = new Interceptors();
export default interceptors;