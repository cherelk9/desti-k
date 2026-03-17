import DestiKForum from "../utilis/components/DestiKForum";
import ProfileModal from "../administration/components/ProfileModal"


import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Overview from "./components/Overview";
import AddEmployer from "./AddEmployer";
import Customers from "./components/Customers";
import Account from "./components/Account";
import {
    faBell,
    faChartPie, faClinicMedical, faCommentDots, faEllipsisV,
    faExclamationTriangle, faFlask,
    faGear,
    faPlus, faSearch, faSignOut,
    faSync, faUser,
    faUserCircle,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Container, InputGroup, Nav, Navbar, Form} from "react-bootstrap";
import IntegrationsPage from "./components/IntegrationsPage";
import ListeExamens from "./components/ListeExamens";
import StatsDashboard from "./components/StatsDashboard";

const AdminDashboard = () => {
    const location = useLocation();
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    // Récupération de l'utilisateur connecté
    useEffect(() => {
        const data = localStorage.getItem('userConnecte');
        if (data) {
            setUsers(JSON.parse(data));
        }
    }, []);

    // Gestion du message de bienvenue transmis par la navigation
    useEffect(() => {
        if (location.state?.message) {
            setWelcomeMessage(location.state.message);
            const timer = setTimeout(() => setWelcomeMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    // Fonction pour obtenir le libellé du service à afficher dans le forum
    const getServiceLabel = () => {
        if (!users) return 'Administration'; // valeur par défaut
        return users.role === 'Admin' ? 'Administration' : users.role;
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <StatsDashboard/>;
            case 'addEmployer':
                return <AddEmployer searchTermer={searchTerm} />;
            case 'integrations':
                return <IntegrationsPage/>;
            case 'customers':
                return <Customers searchTerm={searchTerm} />;
            case 'settings':
                return <div className="p-5 text-center">Paramètres de l'application</div>;
            case 'account':
                return (
                    <Account users={users}/>
                );
            case 'addExamen': return <ListeExamens/>
            case 'forum': return <DestiKForum currentUserService={getServiceLabel()} />;
            case'deconnexion': return;
            default:
                return <Overview />;
        }
    };

    const menuDatas = [
        { id: 'overview', icon: faChartPie, label: 'Overview' },
        { id: 'customers', icon: faUsers, label: 'Customers' },
        { id: 'integrations', icon: faSync, label: 'Integrations' },
        { id: 'settings', icon: faGear, label: 'Settings' },
        { id: 'account', icon: faUserCircle, label: 'Account' },
        { id: 'addEmployer', icon: faPlus, label: 'Add Employer' },
        { id: 'error', icon: faExclamationTriangle, label: 'Error' },
        {id:'addExamen', icon: faClinicMedical, label: 'Add Examen' },
        { id: 'forum', icon: faCommentDots, label: 'Forum' },
        {id: 'deconnexion', icon: faSignOut, label: <Link to="/" className="text-white">deconnexion</Link> },
    ];

    return (
        <div className="d-flex vh-100 overflow-hidden bg-light">
            {/* ASIDE (SIDEBAR) */}
            <aside
                className="d-flex flex-column text-white shadow-lg bg-primary"
                style={{ width: '280px', zIndex: 1000 }}
            >
                {/* Top fixe */}
                <div className="p-4 border-bottom border-white-10">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="bg-primary rounded p-1" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faFlask} />
                        </div>
                        <h5 className="m-0 fw-bold">Desti-k</h5>
                    </div>
                    <div className="bg-white-10 rounded p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <small className="d-block opacity-50">Workspace administration</small>
                            <strong>Desti-k</strong>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisV} className="opacity-50" />
                    </div>
                </div>

                {/* Milieu scrollable */}
                <div className="flex-grow-1 overflow-auto py-3 px-3 custom-scroll">
                    <Nav className="flex-column gap-1">
                        {menuDatas.map((item) => (
                            <Nav.Link
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`text-white d-flex align-items-center gap-3 p-2 rounded transition-all ${
                                    activeTab === item.id
                                        ? 'bg-white-10 text-primary-light'
                                        : 'opacity-75 hover-bg-white-10'
                                }`}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    style={{ width: 20 }}
                                    className={activeTab === item.id ? 'text-primary' : ''}
                                />
                                <span className="small fw-medium">{item.label}</span>
                            </Nav.Link>
                        ))}
                    </Nav>
                </div>

                {/* Bas fixe */}
                <div className="p-3 border-top border-white-10 text-center">
                    <small className="opacity-25">© 2026 Desti-k labo</small>
                </div>
            </aside>

            {/* MAIN AREA */}
            <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                {/* Navbar */}
                <Navbar bg="white" className="px-4 py-2 border-bottom">
                    <InputGroup className="border-0 shadow-none w-25">
                        <InputGroup.Text className="bg-transparent border-0">
                            <FontAwesomeIcon icon={faSearch} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-0 shadow-none"
                        />
                    </InputGroup>
                    <div className="ms-auto d-flex align-items-center gap-3">
                        <FontAwesomeIcon icon={faUsers} className="text-muted" />
                        <div className="position-relative">
                            <FontAwesomeIcon icon={faBell} className="text-muted"/>
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-white rounded-circle"></span>
                        </div>
                        <div
                            onClick={() => setShowProfile(true)}
                            style={{ cursor:'pointer', padding:'6px 8px', borderRadius:'50%', border:'2px solid #e2e8f0' }}
                            title="Mon profil"
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </div>
                </Navbar>

                {/* Contenu principal avec message de bienvenue */}
                <main className="flex-grow-1 overflow-auto p-4 p-lg-5 bg-light">
                    {welcomeMessage && (
                        <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
                            {welcomeMessage}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setWelcomeMessage('')}
                                aria-label="Fermer"
                            ></button>
                        </div>
                    )}
                    <Container fluid>{renderContent()}</Container>
                </main>
            </div>

            {showProfile && (
                <ProfileModal
                    users={users}
                    onClose={() => setShowProfile(false)}
                />
            )}

            <style>{`
                .bg-white-10 { background: rgba(255,255,255,0.08); }
                .bg-white-5 { background: rgba(255,255,255,0.04); }
                .hover-bg-white-10:hover { background: rgba(255,255,255,0.05); opacity: 1; }
                .text-primary-light { color: #6366f1; }
                .custom-scroll::-webkit-scrollbar { width: 4px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .nav-link:hover { color: white !important; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;