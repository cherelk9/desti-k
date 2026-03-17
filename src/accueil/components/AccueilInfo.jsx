import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserDoctor, faHandshake, faCommentDots,
    faHouse, faUsers, faArrowRight, faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import Client from "../Client";
import ListePatients from "./Listepatients";
import RendezVous from "../components/RendezVous";
import DestiKForum from "../../utilis/components/DestiKForum";
import { usePatients } from "./PatientContext";

const dataMenu = [
    {
        id: 'ajouter patient',
        icon: faUserDoctor,
        color: '#185FA5', bg: '#eff6ff',
        label: 'Ajouter un patient',
        description: "Enregistrer un nouveau patient avec ses informations cliniques complètes.",
    },
    {
        id: 'liste des patients',
        icon: faUsers,
        color: '#059669', bg: '#ecfdf5',
        label: 'Liste des patients',
        description: "Consulter, rechercher et exporter la liste complète des patients.",
    },
    {
        id: 'rendez-vous',
        icon: faHandshake,
        color: '#7c3aed', bg: '#f5f3ff',
        label: 'Rendez-vous',
        description: "Gérer les rendez-vous programmés et le calendrier de la semaine.",
    },
    {
        id: 'forum',
        icon: faCommentDots,
        color: '#d97706', bg: '#fffbeb',
        label: 'Forum',
        description: "Messagerie interne entre les équipes du laboratoire Desti-K.",
    },
];

export default function AccueilInfo({ forcedTab, onTabChange }) {
    const [activeTab, setActiveTab] = useState(
        forcedTab && forcedTab !== 'overview' ? forcedTab : 'accueil'
    );
    const { patients } = usePatients();

    // Sync avec la sidebar Accueil.jsx
    useEffect(() => {
        if (forcedTab && forcedTab !== 'overview' && forcedTab !== activeTab) {
            setActiveTab(forcedTab);
        }
    }, [forcedTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'ajouter patient':
                return <Client onSuccess={() => setActiveTab('liste des patients')} />;
            case 'liste des patients':
                return <ListePatients onAjouterClick={() => setActiveTab('ajouter patient')} />;
            case 'rendez-vous':
                return <RendezVous />;
            case 'forum':
                return <DestiKForum />;
            default:
                return <Dashboard setActiveTab={setActiveTab} patients={patients} />;
        }
    };

    return (
        <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
            {/* Barre de navigation onglets */}
            <div style={{
                display:'flex', alignItems:'center', gap:4,
                background:'#fff', borderRadius:14, padding:6,
                marginBottom:24, border:'1px solid #e2e8f0',
                boxShadow:'0 2px 8px rgba(0,0,0,0.04)',
                flexWrap:'wrap',
            }}>
                <button onClick={() => setActiveTab('accueil')} style={{
                    padding:'8px 16px', border:'none', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:600,
                    background: activeTab==='accueil' ? '#185FA5' : 'transparent',
                    color: activeTab==='accueil' ? '#fff' : '#64748b',
                    transition:'all .15s', display:'flex', alignItems:'center', gap:6,
                }}>
                    <FontAwesomeIcon icon={faHouse}/> Accueil
                </button>

                {dataMenu.map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                        padding:'8px 16px', border:'none', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:600,
                        background: activeTab===item.id ? '#185FA5' : 'transparent',
                        color: activeTab===item.id ? '#fff' : '#64748b',
                        transition:'all .15s', display:'flex', alignItems:'center', gap:6,
                        position:'relative',
                    }}>
                        <FontAwesomeIcon icon={item.icon}/>
                        {item.label}
                        {/* Badge patients sur liste */}
                        {item.id==='liste des patients' && patients.length > 0 && (
                            <span style={{
                                background:'#dc2626', color:'#fff',
                                borderRadius:20, padding:'1px 7px', fontSize:10, fontWeight:800,
                                marginLeft:2,
                            }}>{patients.length}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Contenu */}
            <div style={{ flex:1 }}>
                {renderContent()}
            </div>
        </div>
    );
}

/* ── Dashboard d'accueil ── */
function Dashboard({ setActiveTab, patients }) {
    const aujourd = new Date().toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

    return (
        <div style={{ maxWidth:960, margin:'0 auto' }}>

            {/* Bannière */}
            <div style={{
                background:'linear-gradient(135deg, #185FA5 0%, #1a7fd4 60%, #0ea5e9 100%)',
                borderRadius:20, padding:'32px 40px', marginBottom:28,
                display:'flex', justifyContent:'space-between', alignItems:'center',
                boxShadow:'0 8px 32px rgba(24,95,165,0.25)',
                position:'relative', overflow:'hidden',
            }}>
                {/* Cercles décoratifs */}
                <div style={{ position:'absolute', top:-40, right:80, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.07)' }}/>
                <div style={{ position:'absolute', bottom:-30, right:220, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>

                <div style={{ position:'relative', zIndex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                        <div style={{ width:44, height:44, borderRadius:12, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                            <FontAwesomeIcon icon={faHeartbeat} style={{ color:'#fff' }}/>
                        </div>
                        <div>
                            <h2 style={{ margin:0, color:'#fff', fontWeight:900, fontSize:22, letterSpacing:'-0.3px' }}>
                                Bienvenue au service Accueil
                            </h2>
                            <p style={{ margin:0, color:'rgba(255,255,255,0.75)', fontSize:13 }}>
                                Laboratoire Desti-K — {aujourd}
                            </p>
                        </div>
                    </div>
                    <p style={{ margin:0, color:'rgba(255,255,255,0.65)', fontSize:13, maxWidth:480 }}>
                        Gérez l'admission des patients, les rendez-vous et la communication entre équipes.
                    </p>
                </div>

                <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                    <p style={{ margin:0, color:'rgba(255,255,255,0.6)', fontSize:11, textTransform:'uppercase', letterSpacing:1 }}>Patients enregistrés</p>
                    <p style={{ margin:0, color:'#fff', fontSize:48, fontWeight:900, lineHeight:1 }}>{patients.length}</p>
                </div>
            </div>

            {/* Cartes menu */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {dataMenu.map(item => (
                    <div key={item.id}
                         onClick={() => setActiveTab(item.id)}
                         style={{
                             background:'#fff', borderRadius:16, padding:'24px 28px',
                             border:'1px solid #e2e8f0', cursor:'pointer',
                             boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
                             transition:'all .2s', display:'flex', flexDirection:'column', gap:16,
                         }}
                         onMouseOver={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor=item.color; }}
                         onMouseOut={e  => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor='#e2e8f0'; }}
                    >
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                            <div style={{ width:48, height:48, borderRadius:14, background:item.bg, color:item.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                                <FontAwesomeIcon icon={item.icon}/>
                            </div>
                            {item.id==='liste des patients' && patients.length > 0 && (
                                <span style={{ background:'#dc2626', color:'#fff', borderRadius:20, padding:'2px 10px', fontSize:11, fontWeight:800 }}>
                                    {patients.length}
                                </span>
                            )}
                        </div>
                        <div>
                            <h4 style={{ margin:'0 0 6px', fontWeight:800, fontSize:15, color:'#0f172a' }}>{item.label}</h4>
                            <p style={{ margin:0, fontSize:13, color:'#64748b', lineHeight:1.5 }}>{item.description}</p>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:6, color:item.color, fontSize:12, fontWeight:700 }}>
                            Ouvrir <FontAwesomeIcon icon={faArrowRight} style={{ fontSize:10 }}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}