import { useEffect, useState } from "react";
import "./EmployeesList.css";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeeService from "../../../Services/EmployeeService";
import appConfig from "../../../Utils/AppConfig";

function EmployeesList(): JSX.Element {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        employeeService.getAllEmployees()
            .then(e => setEmployees(e))
            .catch(err => err.message);
    }, []);

    function setImageUrl(imageName: string): string {
        let url = appConfig.employeesUrl + "/images/" + imageName;
        return url;

    }

    return (
        <div className="EmployeesList">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>title</th>
                        <th>address</th>
                        <th>birth date</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(e =>
                        <tr key={e.id}>
                            <td>{e.firstName} {e.lastName}</td>
                            <td>{e.title}</td>
                            <td>{e.country}, {e.city}</td>
                            <td>{e.birthDate}</td>
                            <td><img src={setImageUrl(e.imageName)} /></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeesList;
