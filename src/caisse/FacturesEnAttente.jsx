import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faCoins,
    faEye,
    faFileInvoiceDollar,
    faMobileAlt,
    faMoneyBill1Wave,

    faUserInjured
} from "@fortawesome/free-solid-svg-icons";
import Button from "../administration/components/Button";


const abregerExamen = (nameExam) => {
    if(!nameExam) return '_';
    if (nameExam.length <= 30) return nameExam;
    const examens = nameExam.split(",");
    if (examens.length === 1) return nameExam.slice(0, 28)+ '....';
    return examens.slice(0, 2).map(e=>e.trim()).join(', ') + (examens.length > 2 ? `+${examens.length - 2}` : '');
}

const FactureEnAttente = ({list, onRegler}) => {

    const totalAttente = list ? list.reduce((sum, item)=> sum + (Number(item.montant)  || 0), 0) : 0;

    return (
        <div className="container-fluid bd-light min-vh-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold text-dark">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2 text-primary" />
                        Facture En Attente
                    </h4>
                    <p className="text-muted small">
                        liste des dossiers dont le paiement est incomplet ou a valider
                    </p>
                </div>
            </div>

            <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light text-uppercase small fw-bold text-muted">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="py-3">Patient</th>
                                <th className="py-3">Examen / Analyse</th>
                                <th className="py-3">Montant</th>
                                <th className="py-3">Mode</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ?
                                list.map((item)=>(
                                    <tr key={item.id}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <td className="px-4 text-primary fw-bold">#{(item.id).slice(-4)}</td>
                                        <td>
                                            <div className="d-flex align-item-center">
                                                <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                                                        style={{width:'35px',height:'35px'}}
                                                >
                                                    <FontAwesomeIcon icon={faUserInjured} className="small"/>
                                                </div>
                                                <span className="fw-semibold">{item.name || '_'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info-subtle text-info border border-info-subtle pc-3">{abregerExamen(item.nameExam)}</span>
                                        </td>
                                        <td className="fw-bold text-dark">{item.total.toLocaleString()} Fcfa</td>
                                        <td>
                                            <span className={`badge ${item.mode === 'Espece' ? 'bg-success' : 'bg-warning'} px-2`}>
                                                <FontAwesomeIcon  icon={item.mode === 'Espece'? faMoneyBill1Wave : faMobileAlt} className="me-1"/>
                                                {item.mode}
                                            </span>
                                        </td>
                                        <td className="text-muted small"> {item.date}</td>
                                        <td className="btn-group">
                                            <Button className="btn btn-sm btn-outline-primary rounded-pill me-2">
                                                <FontAwesomeIcon icon={faEye} className='me-1' /> voir
                                            </Button>
                                            <Button className="btn btn-sm btn-success rounded-pill me-2"
                                                    onClick={()=>onRegler(item.id, 'Espece')}
                                            >
                                                <FontAwesomeIcon icon={faEye} className='me-1' /> Regler
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">

                                            <FontAwesomeIcon icon={faCheckCircle} className="fs-3 text-light mb-2 d-block"/>
                                            aucune facture en attente
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
               <div className="col-md-4">
                   <div className="card border-0 shadow-sm bg-primary text-white p-3"
                        style={{borderRadius: '12px'}}>
                       <div className="d-flex justify-content-between align-items-center">
                           <div>
                               <p className="mb-o small opacity-75">Total en Attente</p>
                               <h3 className="fw-bold mb-0">{totalAttente.toLocaleString()}  fcfa</h3>
                           </div>
                           <FontAwesomeIcon icon={faCoins} size="2px" className="opacity-95"/>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    )
}

export default FactureEnAttente;