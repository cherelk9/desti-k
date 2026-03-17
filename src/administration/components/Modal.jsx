import {createPortal} from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return createPortal(
         <div style={styles.overlay}>
             <div style={styles.modal}>
                 <button onClick={onClose} style={styles.closeBtn}><FontAwesomeIcon icon={faClose}/></button>
                 {children}
             </div>
         </div> ,
        document.body
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000 },
    modal: {
        background: 'white',
        padding: '30px',
        margin: 'auto',
        borderRadius: '8px',
        minWidth: '400px',
        position: 'relative'
    },
    closeBtn: {
        border: 'none',
        background: 'transparent',
        color: 'red',
        position: 'absolute',
        top: '10x',
        right: '10px',
        cursor: 'pointer',
    },
}

export default Modal;