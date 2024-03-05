import { useEffect, useState } from "react";
import { productsStore } from "../../../Redux/ProductState";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        let unsubscribe = productsStore.subscribe(() => {
            setCount(productsStore.getState().products.length);
        });

        return unsubscribe;
    }, [])

    return (
        <div className="TotalProducts">
            {count > 0 &&
                <span>total products: {count} </span>
            }
        </div>
    );
}

export default TotalProducts;
