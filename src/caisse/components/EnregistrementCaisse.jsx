import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowsLeftRight,
    faCheckCircle,
    faShoppingCart,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {ExamenDisponibles} from "./ExamenDisponibles";



  const Enregistrement =({ onPasserAuReglement })=>{
    const [patientName, setPatientName] = useState("");
    const [panier, setPanier] = useState([]);
    const [voirResumer, setVoirResumer] = useState(false);

    const ajouterExamen = (examen)=>{
        const uniqueId = `${examen.id}-${Date.now()}`;
        setPanier([...panier, {...examen, uniqueId}]);
    };

    const retirerExamen = (uniqueId)=>{
        setPanier(panier.filter((p) => p.uniqueId !== uniqueId));
    }

    const totalGeneral = panier.reduce((sum, item)=> sum + item.montant, 0)

    const validerEnregistrement= () =>{
        if (!patientName.trim() || panier.length === 0){
            alert("veuillez entre le nom du patient et choisir au moins un examen")
            return;
        }
        const dossierPourReglement = {
            id: Date.now(),
            patientName: patientName,
            examen: panier.map(ex=> ex.name).join(','),
            total: totalGeneral,
            detailsPanier: panier,
            dateEnregistrement: new Date().toISOString(),
            mode: null
        };

        if (typeof onPasserAuReglement ==='function'){
            onPasserAuReglement(dossierPourReglement);
            setPatientName("")
            setPanier([]);
            setVoirResumer(false);
        }

    };

    if (voirResumer){
        return (
            <div className="container mt-5 animate_animated animate_fadeIn">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button className="btn btn-outline-secondary"
                            onClick={() => setVoirResumer(false)}
                            >
                        <FontAwesomeIcon icon={faArrowsLeftRight} className="fas me-2"/>
                        Retour aux examens
                    </button>
                    <h2 className="text-primary m-0">
                        Resume de la facture
                    </h2>
                </div>
                <div className="p-3 bg-light rounded mb-4">
                    <h5 > <span className="text-white bg-danger rounded p-3 fw-bold fs-6"> Patient :</span>   <span className="text-dark fw-bold fs-6 bg-primary rounded p-3"> {  patientName || "non defini"}</span> </h5>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Examen</th>
                        <th className="text-end">Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        panier.map((item)=>(
                            <tr key={item.uniqueId}>
                                <td>{item.name}</td>
                                <td className="fw-bold text-end"><span>{item.montant} Fcfa</span>
                                    <FontAwesomeIcon icon={faTimes} className="text-danger cursor-pointer"
                                        onClick={()=>retirerExamen(item.uniqueId)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>
                        <tr className="table-active fs-4">
                            <td>TOTAL</td>
                            <td className="text-end text-success">{totalGeneral} FCFA</td>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-primary btn-lg w-100 mt-4"
                        onClick={validerEnregistrement}>
                    confirmer et passer au regelement <FontAwesomeIcon icon={faCheckCircle} className="fas me-2"/>
                </button>
            </div>
        )
    }


    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 shadow-sm rounded">
                <h2 className="m-0 text-primary"> Enregistrement </h2>
                <button className="btn btn-primary position-relative -3 rounded-circle"
                        onClick={()=>setVoirResumer(true)}>
                    <FontAwesomeIcon icon={faShoppingCart} className="fas fa-lg"/>
                    {
                        panier.length > 0 &&
                        (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                           {panier.length}
                       </span>)
                    }
                </button>
            </div>

            <div className="row">
                <div className="col-md-7">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5> 1. Information Patient </h5>
                        <input
                            type="text"
                            placeholder="Patient Name ..."
                            className="form-control form-control-lg"
                            value={patientName}
                            onChange={e => setPatientName(e.target.value)}
                        />
                    </div>
                    <div className="card shadow-sm p-3">
                        <h5>2. Selection des Examens</h5>
                        <div className="list-group">
                            {ExamenDisponibles.map(item=>(
                                <button
                                    key={item.id}
                                    className="list-group-item d-flex list-group-items-action justify-content-between align-items-center"
                                    onClick={()=>ajouterExamen(item)}>
                                    {item.name}
                                    <span className="badge bg-primary rounded-pill">{item.montant}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Enregistrement;