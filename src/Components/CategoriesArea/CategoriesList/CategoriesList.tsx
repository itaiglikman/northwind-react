import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Services/CategoriesService";
import notifyService from "../../../Services/NotifyService";
import "./CategoriesList.css";
import useUserAndSubscribe from "../../../Utils/UseUser";
import { NavLink } from "react-router-dom";

function CategoriesList(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);

    //custom hook for setting local state and subscribe for changes:
    const user = useUserAndSubscribe();
    const navigate = useNavigate();

    useEffect(() => {
        categoriesService.getAllCategories()
            .then(c => setCategories(c))
            .catch(err => {
                // unauthorized request --> send to login:
                if (err.response.status === 401) navigate("/auth/login");
                notifyService.error(err)
            })
    }, []);


    return (
        <div className="CategoriesList">
            <h2>categories</h2>

            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>description</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c =>
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.description}</td>
                            <td><img src={"http://localhost:3030/api/categories/images/" + c.imageName} /></td>
                            <td><NavLink to={"/categories/details/" + c.id}>ℹ️</NavLink></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesList;
