import { useSelector } from "react-redux";
import { AppState } from "../../../Redux2/AppState";

function TotalSuppliers(): JSX.Element {
    // ________________________________________
    // REDUX - using new version - 
    // 1. npm i @reduxjs/toolkit
    // 2. npm i react-redux @types/react-redux
    // ________________________________________

    //useSelector: 
    // 1. set local state
    // 2. use useEffect and subscribe for changes in the global state 
    const count = useSelector((appState: AppState) => appState.suppliers.length);

    return (
        <div className="TotalSuppliers">
            {count > 0 &&
                <span>total suppliers: {count} </span>
            }
        </div>
    );
}

export default TotalSuppliers;
