import React, {useEffect, useState} from 'react';
import { Container, Nav, Navbar, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartPie, faUsers, faFlask, faGear, faUserCircle, faExclamationTriangle,
    faSearch, faBell, faSync, faEllipsisV, faPlus, faUser, faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import AddEmployer from "./AddEmployer";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Customers from "./components/Customers";
import DestiKForum from "../utilis/components/DestiKForum";



const AdminDashboard = () => {

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
            case 'overview': return <Overview />;
            case 'addEmployer': return <AddEmployer searchTermer={searchTerm}/>;
            case 'integrations': return <div className="p-5 text-center"> List Integration</div>;
            case 'customers': return <Customers searchTerm={searchTerm} />;
            case 'settings': return <div className="p-5 text-center">bonjour je suis une configuration</div>
            case 'account': return <Account  users={users}>
                <button type="button" className="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Account info
                </button>
            </Account>;
            case 'forum': return <DestiKForum/>
            default: return <Overview />;
        }
    };

    const menuDatas = [
        { id: 'overview', icon: faChartPie, label: 'Overview' },
        { id: 'customers', icon: faUsers, label: 'Customers' },
        { id: 'integrations', icon: faSync, label: 'Integrations' },
        { id: 'settings', icon: faGear, label: 'Settings' },
        { id: 'account', icon: faUserCircle, label: 'Account' },
        {id: 'addEmployer', icon: faPlus, label: 'Add Employer' },
        { id: 'error', icon: faExclamationTriangle, label: 'Error' },
        { id: 'forum', icon: faCommentDots, label: 'forum' }
    ]


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
                        <div><small className="d-block opacity-50">Workspace administration</small><strong>Desti-k</strong></div>
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
                        <FontAwesomeIcon icon={faUsers} className="text-muted" />
                        <div className="position-relative">
                            <FontAwesomeIcon icon={faBell} className="text-muted" />
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-white rounded-circle"></span>
                        </div>
                        <FontAwesomeIcon icon={faUser} roundedCircle className="border rounded-circle p-4" />

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
    );
};

export default AdminDashboard;
