import {useParams} from "react-router-dom";

import {CustomerList} from "../../connexion/utils/CustomerList";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackward,
    faDeleteLeft,
    faEllipsisV,
    faFlask,
    faGear,
    faSync
} from "@fortawesome/free-solid-svg-icons";

import React, {useEffect, useState} from "react";
import {Container, Nav} from "react-bootstrap";

import '../styles/CustomerById.css'

const CustomerById = () =>{
    const {id} = useParams();

    const customer = CustomerList.find(customer => customer.id === parseInt(id));

    const [searchTerm, setSearchTerm] = useState("");

    const [activeTab, setActiveTab] = useState('overview');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("userConnecte")
        if (data) {
            setUsers(JSON.parse(data))
        }
    },[])

    const renderContent = () => {
        switch(activeTab) {
            case 'back': return <div className="p-3">je rentre </div>;
            case 'delete': return <div className="p-5 text-bg-danger"> je suis le text supprimer</div>;
            case 'update': return <div className="p-5 text-center"> mettre a jour les informations </div>;
            case 'imprimer': return <div className="p-5 text-center"> imprimer l'information</div>;
            default: return <CustomerByIdInformation />;
        }
    };

    if (!customer) {
        return alert("No Customer found.");
    }
    return (

            <div className="d-flex vh-100 overflow-hidden bg-light">
                <aside className="d-flex flex-column text-white shadow-lg bg-primary"
                       style={{ width: '280px', zIndex: 1000 }}>
                    <div className="p-4 border-bottom border-white-10">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <div className="bg-primary rounded p-1" style={{width: 32, height: 32}}><FontAwesomeIcon icon={faFlask}/></div>
                            <h5 className="m-0 fw-bold">Desti-k</h5>
                        </div>
                        <div className="bg-white-10 rounded p-3 d-flex justify-content-between align-items-center">
                            <div><small className="d-block opacity-50">Workspace administration</small><strong>Desti-k</strong></div>
                            <FontAwesomeIcon icon={faEllipsisV} className="opacity-50" />
                        </div>
                    </div>

                    <div className="flex-grow-1 overflow-auto py-3 px-3 custom-scroll">
                        <Nav className="flex-column gap-1">
                            {[
                                { id: 'back', icon: faBackward , className: 'styleHover',label: 'back' },
                                { id: 'delete', icon: faDeleteLeft ,className: 'styleHover', label: 'delete' },
                                { id: 'update', icon: faSync ,className: 'styleHover', label: 'update' },
                                { id: 'imprimer', icon: faGear ,className: 'styleHover', label: 'imprimer' },
                            ].map(item => (
                                <Nav.Link
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`text-white d-flex align-items-center gap-3 p-2 rounded transition-all ${activeTab === item.id ? 'bg-white-10 text-primary-light' : 'opacity-75 hover-bg-white-10'}`}
                                    style={{cursor: 'pointer'}}
                                >
                                    <FontAwesomeIcon icon={item.icon} style={{width: 20}} className={activeTab === item.id ? 'text-primary' : ''} />
                                    <span className="small fw-medium">{item.label}</span>
                                </Nav.Link>
                            ))}
                        </Nav>

                    </div>


                    <div className="p-3 border-top border-white-10 text-center">
                        <small className="opacity-25">© 2026 Desti-k labo</small>
                    </div>
                </aside>


                <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                    <main className="flex-grow-1 overflow-auto p-4 p-lg-5 bg-light">
                        <Container fluid>
                            {renderContent()}
                        </Container>
                    </main>
                </div>

                <style>{`
        .bg-white-10 { background: rgba(255,255,255,0.08); }
        .bg-white-5 { background: rgba(255,255,255,0.04); }
        .hover-bg-white-10:hover { background: rgba(255,255,255,0.05); opacity: 1; }
        .text-primary-light { color: #6366f1; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .nav-link:hover { color: white !important; }
      `}</style>
            </div>

    )
}


const CustomerByIdInformation = () =>{

    const {id} = useParams();
    const customer = CustomerList.find(customer => customer.id === parseInt(id));

    return (
        <div className="container shadow rounded p-4">
            <h4 className="fw-bold text-center m-3">
                More information about
                <span className=" bg-primary text-white p-4 mx-3 rounded">
                    {customer.civility.name}
                </span>
            </h4>
            <div className="my-5 py-4">
                <p className="bg-info rounded text-light text-center fw-bold p-3">patient numero ( {customer.id} )</p>
            </div>
            <div className="py-5">
                <h5 className="border-b text-shadow-current fw-bolder">1.  civility  </h5>
                <ul className="list-inline p-3 ">
                    <li className="fw-bold p-1 ">nom : <span className="text-primary ">{customer.civility.name}</span></li>
                    <li className="fw-bold p-1 "> prenom : <span className="text-primary">{customer.civility.surname}</span></li>
                    <li className="fw-bold p-1"> Email : <span className="text-primary">{customer.civility.email}</span></li>
                    <li className="fw-bold p-1"> Sex :  <span className="text-primary">{customer.civility.sexe}</span></li>
                    <li className="fw-bold p-1"> Birthday : <span className="text-primary">{customer.civility.dateOfBirth}</span></li>
                    <li className="fw-bold p-1"> phone : <span className="text-primary">{customer.civility.phoneNumber}</span></li>
                </ul>
            </div>

            <div className="py-1">
                <h5 className="border-b text-shadow-current fw-bolder">2. Medical information </h5>
                <ul className="list-inline p-3 ">
                    <li className="fw-bold p-1 ">ddr : <span className="text-primary ">{customer.medicalInformation.ddr}</span></li>
                    <li className="fw-bold p-1 "> current antibiotic : <span className="text-primary"> {customer.medicalInformation.currentAntibiotic}</span></li>
                    <li className="fw-bold p-1"> date delivered ordonance : <span className="text-primary">{customer.medicalInformation.ordonnanceData}</span></li>
                    <li className="fw-bold p-1"> Doctor names :  <span className="text-primary">{customer.medicalInformation.prescriptMedecin}</span></li>
                    <li className="fw-bold p-1"> recent travel : <span className="text-primary">{customer.medicalInformation.recentTravel}</span></li>
                </ul>
            </div>

            <div className="py-1">
                <h5 className="border-b text-shadow-current fw-bolder">3. Administration documentations  </h5>
                <ul className="list-inline p-3 ">
                    <li className="fw-bold p-1 ">national card identity : <span className="text-primary ">{customer.adminDoc.identityCard}</span></li>
                    <li className="fw-bold p-1 "> mutual card : <span className="text-primary"> {customer.adminDoc.mutualCard}</span></li>
                    <li className="fw-bold p-1"> vital card : <span className="text-primary">{customer.adminDoc.vitalCard}</span></li>
                </ul>
            </div>

        </div>
    )
}

export default CustomerById;