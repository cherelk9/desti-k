import Button from "../../administration/components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faMoneyBill, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons";

import '../components/style/ModalReglement.css'

const ModalReglement = ({show, onClose, onConfirm, montant})=>{
    if (!show) return null;

    const montantSafe= Number(montant) || 0;

    const modes = [
        {id: 'Espece', name: 'Espece', class: 'btn-outline-success', icon: faMoneyBill},
        {id: 'OM', name: 'OM', class: 'btn-outline-orange', icon: faMoneyBillTransfer},
        {id: 'MOMO', name: 'MOMO', class: 'btn-outline-yellow', icon: faMoneyBillTransfer},
    ]

    return (
        <div className="modal-overlay"
             style={styles.overlay}>
            <div className="modal-content shadow-lg p-4"
                 style={styles.modal}
            >
                <h4 className='text-center mb-3'>Reglement de la facture</h4>
                <p className="text-center fw-bold fs-5 text-primary"> {montantSafe.toLocaleString()} FCFA</p>
                <hr/>
                <p className="text-muted small text-center">Slectionner le mode de paiement : </p>
                <div className="d-grid gap-2 mt-3">
                    {modes.map((mode)=>(
                        <Button
                            key={mode.id}
                            className={`btn ${mode.class} btn-lg d-flex justify-content-between align-items-center`}
                            onClick={()=>onConfirm(mode.id)}>
                            <span>{mode.name}</span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Button>
                    ))}
                </div>

                <Button className="btn  btn-light w-100 mt-4"
                        onClick={onClose}>
                    Annuler
                </Button>
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1050,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '400px',
        margin: 'auto',
    }
}

export default ModalReglement;