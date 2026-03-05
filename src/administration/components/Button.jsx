import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrows} from "@fortawesome/free-solid-svg-icons";

function Button({className, children, onClick}) {
    return (
        <button type="submit" className={className}
            onClick={onClick}
        >
            {children}
            <FontAwesomeIcon icon={faArrows}/>
        </button>
    )
}

export default Button;