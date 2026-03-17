import { useState } from "react";
import Enregistrement from "../components/EnregistrementCaisse";
import FactureEnAttente from "../FacturesEnAttente";
import JournalDeCaisse from "../components/JournalDeCaisse";
import ReglementFacture from "../components/Reglement";
import { Transaction } from "../components/Transaction";
import Cloture from "../components/Cloture";
import Retour from "../components/Retour";

const GestionDeCaisses = ({ searchTerm }) => {

    // ── Pré-charger les transactions dans le journal
    const [attentes,  setAttentes]  = useState(() => {
        // Les transactions existantes partent en "attente" pour être réglables
        return Transaction.map(t => ({
            ...t,
            id:       String(t.id),
            nameExam: t.nameExam,
            mode:     'en attente',
        }));
    });

    const [journals,  setJournals]  = useState([]);  // journal vide au départ
    const [activeTab, setActiveTab] = useState('enregistrement');
    const [dossierActif, setDossierActif] = useState(null);

    // 1. Enregistrement → liste d'attente
    const ajouterEnAttente = (nouveauDossier) => {
        const dossierNormalise = {
            ...nouveauDossier,
            id:            String(nouveauDossier.id),
            name:          nouveauDossier.patientName  || nouveauDossier.name,
            nameExam:      nouveauDossier.examen       || nouveauDossier.nameExam,
            montant:       Number(nouveauDossier.total ?? nouveauDossier.montant ?? 0),
            detailsPanier: nouveauDossier.detailsPanier || [],
            date:          new Date().toLocaleDateString('fr-FR'),
            mode:          'en attente',
        };
        setAttentes(prev => [...prev, dossierNormalise]);
        setActiveTab('attente'); // ← redirect auto vers factures en attente
    };

    // 2. Clic "Régler" → ouvrir règlement avec le bon dossier
    const ouvrirReglement = (id) => {
        const facture = attentes.find(f => f.id === String(id));
        if (facture) {
            setDossierActif(facture);
            setActiveTab('reglement'); // ← redirect auto vers règlement
        }
    };

    // 3. Finaliser depuis ReglementFacture → journal
    const finaliserPaiement = (transaction) => {
        const factureRegler = attentes.find(f => f.id === dossierActif?.id);
        if (factureRegler) {
            setJournals(prev => [...prev, {
                id:       transaction.id,
                name:     transaction.name,
                montant:  transaction.montant,
                mode:     transaction.mode,
                nameExam: factureRegler.nameExam,
                date:     transaction.date,
                status:   'Paye',
            }]);
            setAttentes(prev => prev.filter(f => f.id !== dossierActif.id));
            setDossierActif(null);
            setActiveTab('journal'); // ← redirect auto vers journal
        }
    };

    // ── Config des onglets
    const tabs = [
        { key: 'enregistrement', label: 'Enregistrement' },
        {
            key:   'attente',
            label: 'Factures en attente',
            badge: attentes.length,
        },
        {
            key:   'reglement',
            label: 'Règlement',
            badge: dossierActif ? 1 : 0,
            alert: !!dossierActif,
        },
        { key: 'journal', label: 'Journal de caisse' },
    ];

    return (
        <div style={{ padding: '1rem' }}>

            {/* ── Barre d'onglets ── */}
            <div style={{
                display:      'flex',
                gap:          4,
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '1.5rem',
                flexWrap:     'wrap',
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            position:     'relative',
                            padding:      '10px 18px',
                            border:       'none',
                            borderBottom: activeTab === tab.key
                                ? '2px solid #185FA5'
                                : '2px solid transparent',
                            background:  'transparent',
                            color:       activeTab === tab.key ? '#185FA5' : '#6b7280',
                            fontWeight:  activeTab === tab.key ? 600 : 400,
                            fontSize:    14,
                            cursor:      'pointer',
                            borderRadius:'4px 4px 0 0',
                            transition:  'all 0.15s',
                            animation:   tab.alert
                                ? 'tab-pulse 1.5s ease-in-out infinite'
                                : 'none',
                        }}
                    >
                        {tab.label}
                        {tab.badge > 0 && (
                            <span style={{
                                marginLeft:   6,
                                background:   tab.alert ? '#ef4444' : '#185FA5',
                                color:        'white',
                                borderRadius: '10px',
                                padding:      '1px 7px',
                                fontSize:     11,
                                fontWeight:   700,
                            }}>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <style>{`
                @keyframes tab-pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.4; }
                }
            `}</style>

            {/* ── Contenu par onglet ── */}
            {activeTab === 'enregistrement' && (
                <Enregistrement onPasserAuReglement={ajouterEnAttente} />
            )}

            {activeTab === 'attente' && (
                <FactureEnAttente
                    list={attentes}
                    onRegler={ouvrirReglement}
                />
            )}

            {activeTab === 'cloture' && (
                <Cloture
                    journals={journals}
                    attentes={attentes}
                    onCloture={(rapport) => console.log('Clôture:', rapport)}
                />
            )}

            {activeTab === 'retour' && (
                <Retour
                    journals={journals}
                    onAnnuler={(t) => {
                        // Retirer du journal
                        setJournals(prev => prev.filter(j => j.id !== t.id));
                    }}
                />
            )}

            {activeTab === 'reglement' && (
                <ReglementFacture
                    dossier={dossierActif}
                    onSaveTransaction={finaliserPaiement}
                />
            )}

            {activeTab === 'journal' && (
                <JournalDeCaisse
                    transaction={journals}
                    searchTerm={searchTerm}
                />
            )}

        </div>
    );
};

export default GestionDeCaisses;