import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";
import productImage1 from "../../../assets/images/product1.jpg";
import productImage2 from "../../../assets/images/product2.jpg";
import "./Home.css";

function Home(): JSX.Element {

    const [sale2info, setSale2info] = useState<string>("sale2");
    const [sale3info, setSale3info] = useState<string>("sale3");
    const [currentTime, setCurrentTime] = useState<string>();
    const [toggleSale2, setToggleSale2] = useState<number>(0);

    function displayCurrentTime(): void {
        let now = new Date();
        setCurrentTime(now.toLocaleTimeString());
    }


    useEffect(() => {
        setInterval(() => {
            displayCurrentTime();
        }, 1000);
    }, [toggleSale2]);

    function displaySale1(): void {
        notifyService.success("sale 1");
    }

    function displaySale2(): void {
        if (toggleSale2 === 0) {
            setSale2info("new sale 2");
            setToggleSale2(1);
        }
        else {
            setSale2info("old sale 2");
            setToggleSale2(0);

        }
    }


    let randImage = 1;
    // let randImage = Math.floor(Math.random() * 2) + 1;

    let desserts = [
        { id: 1, name: "cheese cake", price: 10 },
        { id: 2, name: "chocolate cake", price: 10 },
        { id: 3, name: "pancake", price: 10 },
        { id: 4, name: "tiramisu", price: 10 }
    ];

    return (
        <div className="Home">
            <h2>Welcome To Northwind Traders</h2>
            {/* conditional rendering: */}
            {/* first way */}
            {/* {randImage === 1 ?
                    < img src={productImage1} /> :
                    <img src={productImage2} />
                } */}

            {/* second way */}
            {/* <img src={randImage === 1 ? productImage1 : productImage2} /> */}

            {/* third way: */}
            {randImage === 1 && <img src={productImage1} />}
            {randImage === 2 && <img src={productImage2} />}

            <h3>desserts</h3>
            {desserts.map(d => <span key={d.id}>{d.name} ${d.price} * </span>)}

            <br />

            <button onClick={displaySale1}>first sale</button>
            <button onClick={displaySale2}>second sale</button>
            <span>{sale2info}</span>
            <span>{sale3info}</span>
            <hr />

            <button onClick={displayCurrentTime}>show time</button>
            <span>{currentTime}</span>

        </div>
    );
}

export default Home;
