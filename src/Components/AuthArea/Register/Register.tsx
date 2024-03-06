import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>()
    const navigate = useNavigate();

    async function send(user: UserModel): Promise<void> {
        try {
            await authService.register(user);
            notifyService.success("just registered!");
            navigate("/home");
        } catch (err) { notifyService.error(err) }
    }

    return (
        <div className="Register">
            <h3>register</h3>

            <form onSubmit={handleSubmit(send)}>

                <label>First Name:</label>
                <input type="string" {...register("firstName")} />

                <label>Last Name:</label>
                <input type="string" {...register("lastName")} />

                <label>email:</label>
                <input type="string" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>
        </div>
    );
}

export default Register;
