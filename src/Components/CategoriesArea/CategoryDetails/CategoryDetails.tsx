import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Services/CategoriesService";
import notifyService from "../../../Services/NotifyService";
import "./CategoryDetails.css";
import appConfig from "../../../Utils/AppConfig";

function CategoryDetails(): JSX.Element {

    const [category, setCategory] = useState<CategoryModel>();
    const navigate = useNavigate();
    let params = useParams();
    let id = +params.id;

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
                <img src={appConfig.categoriesUrl + "images/" + category?.imageName} />
            </span>
            <NavLink to={"/categories"}>Back</NavLink>
        </div>
    );
}

export default CategoryDetails;
