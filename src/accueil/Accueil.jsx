import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, Navbar, InputGroup, Form, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse, faUserDoctor, faUsers, faHandshake,
    faCommentDots, faFlask, faEllipsisV,
    faSearch, faUser, faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import AccueilInfo    from "./components/AccueilInfo";
import DestiKForum    from "../utilis/components/DestiKForum";
import ProfileModal   from "../administration/components/ProfileModal";
import { PatientProvider } from "./components/PatientContext";

const Accueil = () => {
    const location = useLocation();
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [searchTerm,     setSearchTerm]     = useState('');
    const [activeTab,      setActiveTab]      = useState('overview');
    const [users,          setUsers]          = useState([]);
    const [showProfile,    setShowProfile]    = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('userConnecte');
        if (data) setUsers(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (location.state?.message) {
            setWelcomeMessage(location.state.message);
            const timer = setTimeout(() => setWelcomeMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const getServiceLabel = () => users?.role || 'Accueil';

    const menuDatas = [
        { id: 'overview',           icon: faHouse,        label: 'Accueil' },
        { id: 'ajouter patient',    icon: faUserDoctor,   label: 'Ajouter patient' },
        { id: 'liste des patients', icon: faUsers,        label: 'Liste des patients' },
        { id: 'rendez-vous',        icon: faHandshake,    label: 'Rendez-vous' },
        { id: 'forum',              icon: faCommentDots,  label: 'Forum' },
        { id: 'deconnexion',        icon: faSignOut,      label: <Link to="/" className="text-white">Déconnexion</Link> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            // ✅ AccueilInfo gère en interne : accueil / ajouter / liste / rdv / forum
            // On lui passe l'onglet demandé depuis la sidebar
            case 'overview':
            case 'ajouter patient':
            case 'liste des patients':
            case 'rendez-vous':
                return <AccueilInfo forcedTab={activeTab} onTabChange={setActiveTab} />;
            case 'forum':
                return <DestiKForum currentUserService={getServiceLabel()} />;
            case 'deconnexion':
                return null;
            default:
                return <AccueilInfo />;
        }
    };

    return (
        // ✅ PatientProvider enveloppe TOUT — les patients sont accessibles partout
        <PatientProvider>
            <div className="d-flex vh-100 overflow-hidden bg-light">

                {/* SIDEBAR */}
                <aside className="d-flex flex-column text-white shadow-lg bg-primary" style={{ width: 280, zIndex: 1000 }}>
                    <div className="p-4 border-bottom border-white-10">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <div className="bg-primary rounded p-1" style={{ width: 32, height: 32 }}>
                                <FontAwesomeIcon icon={faFlask}/>
                            </div>
                            <h5 className="m-0 fw-bold">Desti-k</h5>
                        </div>
                        <div className="bg-white-10 rounded p-3 d-flex justify-content-between align-items-center">
                            <div>
                                <small className="d-block opacity-50">Workspace accueil</small>
                                <strong>Desti-k</strong>
                            </div>
                            <FontAwesomeIcon icon={faEllipsisV} className="opacity-50"/>
                        </div>
                    </div>

                    <div className="flex-grow-1 overflow-auto py-3 px-3 custom-scroll">
                        <Nav className="flex-column gap-1">
                            {menuDatas.map(item => (
                                <Nav.Link
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`text-white d-flex align-items-center gap-3 p-2 rounded transition-all ${
                                        activeTab === item.id ? 'bg-white-10 text-primary-light' : 'opacity-75 hover-bg-white-10'
                                    }`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <FontAwesomeIcon icon={item.icon} style={{ width: 20 }} className={activeTab === item.id ? 'text-primary' : ''}/>
                                    <span className="small fw-medium">{item.label}</span>
                                </Nav.Link>
                            ))}
                        </Nav>
                    </div>

                    <div className="p-3 border-top border-white-10 text-center">
                        <small className="opacity-25">© 2026 Desti-k labo</small>
                    </div>
                </aside>

                {/* MAIN */}
                <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                    <Navbar bg="white" className="px-4 py-2 border-bottom">
                        <InputGroup className="border-0 shadow-none w-25">
                            <InputGroup.Text className="bg-transparent border-0">
                                <FontAwesomeIcon icon={faSearch} className="text-muted"/>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="border-0 shadow-none"
                            />
                        </InputGroup>
                        <div
                            onClick={() => setShowProfile(true)}
                            style={{ cursor:'pointer', padding:'6px 8px', borderRadius:'50%', border:'2px solid #e2e8f0', marginLeft:'auto' }}
                            title="Mon profil"
                        >
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                    </Navbar>

                    <main className="flex-grow-1 overflow-auto p-4 p-lg-5 bg-light">
                        {welcomeMessage && (
                            <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
                                {welcomeMessage}
                                <button type="button" className="btn-close" onClick={() => setWelcomeMessage('')} aria-label="Close"/>
                            </div>
                        )}
                        <Container fluid>{renderContent()}</Container>
                    </main>
                </div>

                {showProfile && <ProfileModal users={users} onClose={() => setShowProfile(false)}/>}

                <style>{`
                    .bg-white-10 { background: rgba(255,255,255,0.08); }
                    .hover-bg-white-10:hover { background: rgba(255,255,255,0.05); opacity: 1; }
                    .text-primary-light { color: #6366f1; }
                    .custom-scroll::-webkit-scrollbar { width: 4px; }
                    .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                    .nav-link:hover { color: white !important; }
                `}</style>
            </div>
        </PatientProvider>
    );
};

export default Accueil;