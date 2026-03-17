import {useState} from "react";
import Button from "../../administration/components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";

import '../components/style/Reglement.css'

const ReglementFacture = ({dossier, onSaveTransaction}) =>{
    const [modePaiement, setModePaiement] = useState('Espece')

    const handleValider = ()=>{
        const nouvelleTransaction = {
            id: Date.now(),
            paiement: dossier.name,
            montant: dossier.montant,
            mode: modePaiement,
            date: new Date().toISOString(),
        }

        onSaveTransaction(nouvelleTransaction)
        window.print();
    }

    return (
        <div className="container mt-4">
            <div className="card shadow p-4 no-print">
                <h3 className="text-primary">Finaliser le Reglement</h3>
                <div className="mb-3">
                    <label htmlFor="modePaiement" className="form-label fw-bold">Mode de Paiement</label>
                    <select className="form-select"
                            value={modePaiement}
                            onChange={(e) => setModePaiement(e.target.value)}
                            >
                        <option value="Espece">Espece</option>
                        <option value="OM">Orange monnaie</option>
                        <option value="MOMO">mtn mobile monnaie</option>
                    </select>
                </div>
                <Button className="btn btn-success"
                        onClick={handleValider}>
                    <FontAwesomeIcon icon={faPrint} className="me-2"/>
                    Valider et telecharger le PDF
                </Button>
            </div>

            {/** ce qui va s'afficher sur le pdf *****/}
            <div className="printable-area p-5 mt-5 border bg-white text-dark ">
                <div className="text-center mb-4">
                    <h2>LABORATOIRE DESTI-K</h2>
                    <p>recu de paiement officiel</p>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-6">
                        <p><strong>Patient name :</strong>{dossier.name}</p>
                        <p><strong>Patient surname :</strong>{dossier.surname}</p>
                        <p><strong>Date :</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="col-6 text-end">
                        <p><strong>Mode de paiement: </strong>{modePaiement}</p>
                    </div>
                </div>
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Designation</th>
                            <th scope="col" className="text-end">Totale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Analyse medicale</td>
                            <td className="text-end">{dossier.montant} FCFA</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-end mt-4"><h4>TOTAL PAYE: {dossier.montant} FCFA</h4></div>
            </div>
        </div>
    )
}

export default ReglementFacture;