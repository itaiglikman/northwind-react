import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Services/CategoriesService";
import notifyService from "../../../Services/NotifyService";
import useUserAndSubscribe from "../../../Utils/UseUser";
import "./CategoryDetails.css";

function CategoryDetails(): JSX.Element {

    //custom hook for setting local state and subscribe for changes:
    const user = useUserAndSubscribe();
    const navigate = useNavigate();
    let params = useParams();
    let id = +params.id;

    const [category, setCategory] = useState<CategoryModel>();

    useEffect(() => {
        categoriesService.getOneCategory(id)
            .then(c => setCategory(c))
            .catch(err => {
                // unauthorized request --> send to login:
                if (err.response.status === 401) navigate("/auth/login");
                notifyService.error(err)
            })
    }, []);

    return (
        <div className="CategoryDetails">
            <span>Name: {category?.name}</span>
            <span>Description: {category?.description}</span>
            <span>
                <img src={"http://localhost:3030/api/categories/images/" + category?.imageName} />
            </span>
            <NavLink to={"/categories"}>Back</NavLink>
        </div>
    );
}

export default CategoryDetails;
