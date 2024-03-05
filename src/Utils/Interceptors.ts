import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {
    // create app interceptors:
    public create(): void {
        // registering to request interceptors:
        axios.interceptors.request.use(requestObject => {
            // request object containing data sent with any request.
            // if token exist & request demands auth header - add headers:
            let token = authStore.getState().token;
            if (token) 
                requestObject.headers.Authorization = "Bearer " + token;

            return requestObject;
        })
    }
}
const interceptors = new Interceptors();
export default interceptors;