import {CustomerList} from "../../connexion/utils/CustomerList";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackward,
    faClinicMedical,
     faUser
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Button from "./Button";
import {faDochub} from "@fortawesome/free-brands-svg-icons";

//import '../styles/CustomerById.css'

const CustomerById = ({id, onBack}) =>{
    const customer = CustomerList.find((c)=>c.id === id);

    if (!customer){
        return <div className="container text-muted"> client non trouve </div>;
    }
    return (
        <div className="p-4" style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
            <Button
                className="btn btn-outline-secondary mb-4 bg-primary fw-bold rounded-pill"
                onClick={onBack}>
                <FontAwesomeIcon icon={faBackward}/>
                back
            </Button>

            <div className="d-flex align-items-center mb-4 p-3 bg-white shadow-sm rounded-4">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bolder me-3"
                     style={{width:'60px', height:'60px', fontSize: '1.5rem'}}>
                    {customer.civility.name[0].toUpperCase()}
                </div>
                <div>
                    <h2 className="mb-0 fw-bold text-dark">{customer.civility.name}</h2>
                    <span className="badge bg-soft-primary  text-primary"> Patient N {customer.id}</span>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 md-4">
                    <div className="card border-0 shadow-sm h-100 p-3">
                        <h5 className="border-bottom pd-2 mb-2 mb-3 text-primary"> <FontAwesomeIcon icon={faUser}/> ETAT CIVIL</h5>
                        <p>
                            <strong className="me-2">surname :</strong> {customer.civility.surname}
                        </p>
                        <p>
                            <strong className="me-2">Email :</strong> {customer.civility.email}
                        </p>
                        <p>
                            <strong className="me-2">Telephone :</strong> {customer.civility.phoneNumber}
                        </p>
                        <p>
                            <strong className="me-2">Sex :</strong> {customer.civility.sexe}
                        </p>
                        <p>
                            <strong className="me-2">Brith day :</strong> {customer.civility.dateOfBirth}
                        </p>
                    </div>
                </div>

                <div className="col-md-6 md-4">
                    <div className="card border-0 shadow-sm h-100 p-3">
                        <h5 className="border-bottom pd-2 mb-2 mb-3 text-primary"><FontAwesomeIcon icon={faClinicMedical}/>. Medical</h5>
                        <p>
                            <strong className="me-2">Medecin :</strong> {customer.medicalInformation.prescriptMedecin}
                        </p>
                        <p>
                            <strong className="me-2">Antibiotique :</strong> {customer.medicalInformation.currentAntibiotic}
                        </p>
                        <p>
                            <strong className="me-2">Dernier voyage :</strong> {customer.medicalInformation.recentTravel}
                        </p>
                    </div>
                </div>

                <div className="col-md-6 md-4 mt-4">
                    <div className="card border-0 shadow-sm h-100 p-3">
                        <h5 className="border-bottom pd-2 mb-2 mb-3 text-primary"><FontAwesomeIcon icon={faDochub}/>. Documents administratifs</h5>
                        <div className="d-flex justify-content-around flex-wrap">
                            <div className="text-center p-2">
                                <small className="text-muted d-block p-2 fw-bolder bg-primary  rounded">CNI</small> <strong>{customer.adminDoc.identityCard}</strong>
                            </div>
                            <div className="text-center p-2">
                                <small className="text-muted d-block p-2 fw-bolder bg-white border  rounded">Carte Vitale</small> <strong>{customer.adminDoc.vitalCard}</strong>
                            </div>
                            <div className="text-center p-2">
                                <small className="text-muted d-block p-2 fw-bolder bg-danger  rounded">Carte mutuelle</small> <strong>{customer.adminDoc.mutualCard}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerById;