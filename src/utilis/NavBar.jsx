import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage,  faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const NavBar = (props)=>{
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand black" to="#">{props.name}</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link black" to="#">{props.children}</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" container mx-5">

                <div className="row ">

                    <div className="col-5">
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <div className="col-5">
                        <FontAwesomeIcon icon={faMessage}/>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default NavBar;