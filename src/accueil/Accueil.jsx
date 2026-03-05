import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faCommentDots,
    faEllipsisV,
    faFlask,
    faHandshake, faHouse, faSearch, faUser,
    faUserDoctor,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

import {Container, Form, InputGroup, Nav, Navbar} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import Customers from "../administration/components/Customers";
import Client from "./Client";
import AccueilInfo from "./components/AccueilInfo";
import RendezVous from "./components/RendezVous";
import DestiKForum from "../utilis/components/DestiKForum";

const Accueil= ()=>{


    const [searchTerm, setSearchTerm] = useState("");

    const [activeTab, setActiveTab] = useState('overview');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("userConnecte")
        if (data) {
            setUsers(JSON.parse(data))
        }
    },[])



    const menuDatas = [
        {id: 'accueil',icon: faHouse ,label: 'Accueil'},
        { id: 'ajouter patient', icon: faUserDoctor, label: 'ajouter patient' },
        { id: 'liste des patients', icon: faUsers, label: 'liste des patients' },
        { id: 'rendez-vous', icon: faHandshake, label: 'rendez-vous' },
        { id: 'forum', icon: faCommentDots, label: 'forum' },
    ]

    const renderContent = () => {
        switch(activeTab) {
            case 'accueil' : return <AccueilInfo/>;
            case 'ajouter patient': return <Client/>;
            case 'liste des patients': return <Customers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
            case 'rendez-vous': return <RendezVous/>;
            case 'forum': return <DestiKForum/>;
            default: return <AccueilInfo/> ;
        }
    };

    return (

        <div className="d-flex vh-100 overflow-hidden bg-light">

            {/* ASIDE (SIDEBAR) */}
            <aside className="d-flex flex-column text-white shadow-lg bg-primary"
                   style={{ width: '280px', zIndex: 1000 }}>

                {/* Top Fixe */}
                <div className="p-4 border-bottom border-white-10">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="bg-primary rounded p-1" style={{width: 32, height: 32}}><FontAwesomeIcon icon={faFlask}/></div>
                        <h5 className="m-0 fw-bold">Desti-k</h5>
                    </div>
                    <div className="bg-white-10 rounded p-3 d-flex justify-content-between align-items-center">
                        <div><small className="d-block opacity-50">Workspace accueil</small><strong>Desti-k</strong></div>
                        <FontAwesomeIcon icon={faEllipsisV} className="opacity-50" />
                    </div>
                </div>

                {/* Milieu Scrollable */}
                <div className="flex-grow-1 overflow-auto py-3 px-3 custom-scroll">
                    <Nav className="flex-column gap-1">
                        {menuDatas.map(item => (
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

            {/* Navbar */}
            <Navbar bg="white" className="px-4 py-2 border-bottom">
                <InputGroup className="border-0 shadow-none w-25">
                    <InputGroup.Text className="bg-transparent border-0"><FontAwesomeIcon icon={faSearch} className="text-muted"/>></InputGroup.Text>
                    <Form.Control placeholder="Search..."
                                  value={searchTerm}
                                  onChange={e => setSearchTerm(e.target.value)}
                                  className="border-0 shadow-none" />
                </InputGroup>
                <div className="ms-auto d-flex align-items-center gap-3">
                    <FontAwesomeIcon icon={faUser} roundedCircle className="border rounded-circle p-2"/>

                </div>
            </Navbar>

            {/* Body Content */}
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

export default Accueil;