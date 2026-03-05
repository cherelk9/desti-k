import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faCartPlus,
    faCashRegister,
    faCommentDots,
    faCreditCard,
    faEllipsisV,
    faFileInvoiceDollar,
    faFlask,
    faLock,
    faSearch,
    faUndoAlt,
    faUser,
    } from "@fortawesome/free-solid-svg-icons";

import {Container, Form, InputGroup, Nav, Navbar} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import DestiKForum from "../utilis/components/DestiKForum";




const Caisse= ()=>{

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
        { id: 'enregistrement', icon: faCartPlus, label: 'enregistrement' },
        { id: 'reglement', icon: faCreditCard, label: 'reglement' },
        { id: 'facture en attente', icon: faFileInvoiceDollar, label: 'facture en attente' },
        { id: 'journal de caisse', icon: faCashRegister, label: 'journal de caisse' },
        { id: 'cloture', icon: faLock, label: 'cloture' },
        {id: 'retour', icon: faUndoAlt, label: 'retour' },
        { id: 'forum', icon: faCommentDots, label: 'forum' },
    ]



    const renderContent = () => {
        switch(activeTab) {
            case 'enregistrement': return <div className="p-5">interface d'enregistrement</div> ;
            case 'reglement': return <div className="p-5">pour gerer les paiements (especes ou om)</div> ;
            case 'facture en attente': return <div className="p-5 text-center"> List des dossiers dont le paiement est incomplet</div>;
            case 'journal de caisse': return <div className="p-5 text-center">Historique des transaction de la journee </div>;
            case 'cloture': return <div className="p-5 text-center">fonction pour valider la fin de la journee et le depot a l'administration</div>
            case 'retour': return <div className="p-5">pour annuler une transaction</div>
            case 'forum': return <DestiKForum/>
            default: return <div className="p-5">interface d'enregistrement</div> ;
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
                        <div><small className="d-block opacity-50">Workspace Caisse</small><strong>Desti-k</strong></div>
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

                {/* Bas Fixe */}
                <div className="p-3 border-top border-white-10 text-center">
                    <small className="opacity-25">© 2026 Desti-k labo</small>
                </div>
            </aside>

            {/* MAIN AREA */}
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
                        <FontAwesomeIcon icon={faUser} roundedCircle className="border rounded-circle p-3" />

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

export default Caisse;