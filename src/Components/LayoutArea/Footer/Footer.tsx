import "./Footer.css";

function Footer(): JSX.Element {

    function getYear(): number {
        return new Date().getFullYear();
    }

    return (
        <div className="Footer">
            <h5>
                ©️ Itai Glikman {getYear()}
            </h5>
        </div>
    );
}

export default Footer;
