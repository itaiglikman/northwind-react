import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>()
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel): Promise<void> {
        try {
            await authService.login(credentials);
            notifyService.success("just logged-in!");
            navigate("/home");
        } catch (err) { notifyService.error(err) }
    }

    return (
        <div className="Login">

            <h3>Login</h3>

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="string" {...register("email")} />

                <label>password:</label>
                <input type="password" {...register("password")} />

                <button>Login</button>

            </form>
        </div>
    );
}

export default Login;
