import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartPlus,
    faCashRegister,
    faCommentDots,
    faCreditCard,
    faEllipsisV,
    faFileInvoiceDollar,
    faFlask,
    faLock,
    faSearch, faSignOut,
    faUndoAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Form, InputGroup, Nav, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import DestiKForum from "../utilis/components/DestiKForum";
import ReglementFacture from "./components/Reglement";
import JournalDeCaisse from "./components/JournalDeCaisse";
import Enregistrement from "./components/EnregistrementCaisse";
import FactureEnAttente from "./FacturesEnAttente";
import ProfileModal from "../administration/components/ProfileModal";
import Cloture from "./components/Cloture";
import Retour from "./components/Retour";


const Caisse = () => {
    const location = useLocation();
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState('enregistrement');
    const [users, setUsers] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    const [attentes, setAttentes] = useState([]);
    const [journals, setJournals] = useState([]);
    const [factureSelectionner, setFactureSelectionner] = useState(null);


    useEffect(() => {
        const data = localStorage.getItem("userConnecte");
        if (data) {
            setUsers(JSON.parse(data));
        }
    }, []);


    useEffect(() => {
        if (location.state?.message) {
            setWelcomeMessage(location.state.message);
            const timer = setTimeout(() => setWelcomeMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const getServiceLabel = () => {
        if (!users) return 'Caisse';
        return users.role;
    };

    const ajouterEnAttente = (nouveauDossier) => {
        const dossierNormalise = {
            id:            String(nouveauDossier.id),
            name:          nouveauDossier.patientName || nouveauDossier.name || '—',
            nameExam:      nouveauDossier.examen      || nouveauDossier.nameExam || '—',
            montant:       Number(nouveauDossier.total ?? nouveauDossier.montant ?? 0),
            detailsPanier: nouveauDossier.detailsPanier || [],
            date:          new Date().toLocaleDateString('fr-FR'),
            mode:          'en attente',
        };

        console.log('✅ Dossier normalisé ajouté :', dossierNormalise); // debug

        setAttentes(prev => [...prev, dossierNormalise]);
        setActiveTab('facture en attente');
    };


    const ouvrirReglement = (id) => {
        const facture = attentes.find((f) => f.id === String(id));
        if (facture) {
            console.log('✅ Facture sélectionnée pour règlement :', facture);
            setFactureSelectionner(facture);
            setActiveTab('reglement');
        }
    };


    const finaliserPaiement = (transaction) => {
        if (factureSelectionner) {
            const facturePayer = {
                id:       transaction.id,
                name:     transaction.name,
                montant:  transaction.montant,
                mode:     transaction.mode,     // ← string "Espece" / "OM" / "MOMO"
                nameExam: factureSelectionner.nameExam,
                date:     transaction.date,
                status:   'Paye',
            };

            console.log('✅ Paiement finalisé :', facturePayer); // debug

            setJournals(prev => [...prev, facturePayer]);
            setAttentes(prev => prev.filter(f => f.id !== factureSelectionner.id));
            setFactureSelectionner(null);
            setActiveTab('journal de caisse');
        }
    };

    const menuDatas = [
        { id: 'enregistrement', icon: faCartPlus, label: 'enregistrement' },
        { id: 'reglement', icon: faCreditCard, label: 'reglement' },
        {
            id: 'facture en attente',
            icon: faFileInvoiceDollar,
            label: (
                <span className="d-flex align-items-center gap-2">
                    facture en attente
                    {attentes.length > 0 && (
                        <span className="badge bg-danger rounded-pill" style={{fontSize: '10px'}}>
                            {attentes.length}
                        </span>
                    )}
                </span>
            )
        },
        { id: 'journal de caisse', icon: faCashRegister, label: 'journal de caisse' },
        { id: 'cloture', icon: faLock, label: 'cloture' },
        { id: 'retour', icon: faUndoAlt, label: 'retour' },
        { id: 'forum', icon: faCommentDots, label: 'forum' },
        { id: 'deconnexion', icon: faSignOut, label: <Link to="/" className="text-white">deconnexion</Link> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'enregistrement':
                return <Enregistrement onPasserAuReglement={ajouterEnAttente} />;

            case 'reglement':
                return (
                    <ReglementFacture
                        dossier={factureSelectionner}
                        onSaveTransaction={finaliserPaiement}
                    />
                );

            case 'facture en attente':
                return (
                    <FactureEnAttente
                        list={attentes}
                        onRegler={ouvrirReglement}
                    />
                );

            case 'journal de caisse':
                return (
                    <JournalDeCaisse
                        transaction={journals}
                        searchTerm={searchTerm}
                    />
                );

            case 'cloture':
                return (
                    <Cloture
                        journals={journals}
                        attentes={attentes}
                        onCloture={(rapport) => console.log('Clôture:', rapport)}
                    />
                );

            case 'retour':
                return <Retour
                    journals={journals}
                    onAnnuler={(t)=>{
                        setJournals(prev=>prev.filter(f => f.id !== t));
                    }}
                />;

            case 'forum':
                return <DestiKForum currentUserService={getServiceLabel()} />;

            case 'deconnexion':
                return null;

            default:
                return <div className="p-5">Interface d'enregistrement</div>;
        }
    };

    return (
        <div className="d-flex vh-100 overflow-hidden bg-light">
            {/* ASIDE (SIDEBAR) */}
            <aside
                className="d-flex flex-column text-white shadow-lg bg-primary"
                style={{ width: '280px', zIndex: 1000 }}
            >
                {/* Top Fixe */}
                <div className="p-4 border-bottom border-white-10">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="bg-primary rounded p-1" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faFlask} />
                        </div>
                        <h5 className="m-0 fw-bold">Desti-k</h5>
                    </div>
                    <div className="bg-white-10 rounded p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <small className="d-block opacity-50">Workspace Caisse</small>
                            <strong>Desti-k</strong>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisV} className="opacity-50" />
                    </div>
                </div>

                {/* Milieu Scrollable */}
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
                        <InputGroup.Text className="bg-transparent border-0">
                            <FontAwesomeIcon icon={faSearch} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-0 shadow-none"
                        />
                    </InputGroup>
                    <div
                        onClick={() => setShowProfile(true)}
                        style={{
                            cursor: 'pointer',
                            padding: '6px 8px',
                            borderRadius: '50%',
                            border: '2px solid #e2e8f0',
                            marginLeft: 'auto'
                        }}
                        title="Mon profil"
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </Navbar>

                {/* Body Content */}
                <main className="flex-grow-1 overflow-auto p-4 p-lg-5 bg-light">
                    {welcomeMessage && (
                        <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
                            {welcomeMessage}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setWelcomeMessage('')}
                                aria-label="Close"
                            />
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
                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .nav-link:hover { color: white !important; }
            `}</style>
        </div>
    );
};

export default Caisse;