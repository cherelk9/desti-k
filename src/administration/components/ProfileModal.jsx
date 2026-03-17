import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes, faUserShield, faEnvelope, faPhone,
    faCalendarAlt, faIdBadge, faCircle, faKey,
    faBuilding, faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const ROLE_CONFIG = {
    'Admin':       { color:'#2563eb', bg:'#eff6ff',  label:'Administrateur',    initiale:'AD' },
    'Caisse':      { color:'#059669', bg:'#ecfdf5',  label:'Caissier(ère)',      initiale:'CA' },
    'Accueil':     { color:'#d97706', bg:'#fffbeb',  label:"Agent d'accueil",   initiale:'AC' },
    'Laboratoire': { color:'#7c3aed', bg:'#f5f3ff',  label:'Laborantin(e)',      initiale:'LA' },
};

const ProfileModal = ({ users, onClose }) => {
    const role = users?.role || 'Admin';
    const cfg  = ROLE_CONFIG[role] || { color:'#64748b', bg:'#f8fafc', label:role, initiale:'??' };

    // Fermer avec Échap
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const initiales = users?.name
        ? users.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : cfg.initiale;

    const infoRows = [
        {
            icon: faIdBadge,
            label: 'Identifiant',
            value: users?.id
                ? `DK-${String(users.id).slice(-5).toUpperCase()}`
                : 'DK-00001',
        },
        {
            icon: faEnvelope,
            label: 'Email',
            value: users?.email
                || `${(users?.name || 'user').toLowerCase().replace(/\s+/g, '.')}@destik.cm`,
        },
        {
            icon: faPhone,
            label: 'Téléphone',
            value: users?.phone || '+237 6XX XXX XXX',
        },
        {
            icon: faBuilding,
            label: 'Service',
            value: cfg.label,
        },
        {
            icon: faCalendarAlt,
            label: 'Membre depuis',
            value: users?.createdAt || new Date().toLocaleDateString('fr-FR'),
        },
        {
            icon: faKey,
            label: 'Permissions',
            value: role === 'Admin'
                ? 'Accès complet'
                : `Accès limité — ${cfg.label}`,
        },
    ];

    return (
        <>
            {/* ── OVERLAY ── */}
            <div
                onClick={onClose}
                style={{
                    position:'fixed', inset:0, zIndex:9998,
                    background:'rgba(15,23,42,0.55)',
                    backdropFilter:'blur(5px)',
                    WebkitBackdropFilter:'blur(5px)',
                }}
            />

            {/* ── MODALE ── */}
            <div style={{
                position:'fixed', inset:0, zIndex:9999,
                display:'flex', alignItems:'center', justifyContent:'center',
                pointerEvents:'none',
            }}>
                <div style={{
                    background:'#ffffff',
                    borderRadius:24,
                    width:420,
                    maxWidth:'94vw',
                    boxShadow:'0 32px 80px rgba(0,0,0,0.22)',
                    animation:'slideUp .28s cubic-bezier(.22,1,.36,1)',
                    overflow:'hidden',
                    pointerEvents:'all',
                }}>

                    {/* ── BANDEAU HEADER ── */}
                    <div style={{
                        background:`linear-gradient(140deg, ${cfg.color}f0 0%, ${cfg.color} 100%)`,
                        padding:'36px 28px 32px',
                        display:'flex', flexDirection:'column', alignItems:'center',
                        position:'relative', overflow:'hidden',
                    }}>
                        {/* Motif décoratif en arrière-plan */}
                        <div style={{
                            position:'absolute', inset:0,
                            backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                            backgroundSize:'22px 22px',
                        }}/>
                        {/* Cercle décoratif */}
                        <div style={{
                            position:'absolute', top:-40, right:-40,
                            width:160, height:160, borderRadius:'50%',
                            background:'rgba(255,255,255,0.07)',
                        }}/>
                        <div style={{
                            position:'absolute', bottom:-30, left:-30,
                            width:120, height:120, borderRadius:'50%',
                            background:'rgba(255,255,255,0.05)',
                        }}/>

                        {/* Bouton fermer */}
                        <button
                            onClick={onClose}
                            style={{
                                position:'absolute', top:14, right:14,
                                background:'rgba(255,255,255,0.18)',
                                border:'1px solid rgba(255,255,255,0.25)',
                                color:'#fff', width:32, height:32, borderRadius:8,
                                cursor:'pointer', display:'flex', alignItems:'center',
                                justifyContent:'center', fontSize:13, zIndex:1,
                                transition:'background .2s',
                            }}
                            onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.28)'}
                            onMouseOut={e  => e.currentTarget.style.background='rgba(255,255,255,0.18)'}
                        >
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>

                        {/* Avatar */}
                        <div style={{
                            width:76, height:76, borderRadius:20,
                            background:'rgba(255,255,255,0.2)',
                            backdropFilter:'blur(8px)',
                            border:'3px solid rgba(255,255,255,0.5)',
                            boxShadow:`0 0 0 5px ${cfg.color}55`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:26, fontWeight:900, color:'#fff',
                            letterSpacing:'-1px', marginBottom:14,
                            position:'relative', zIndex:1,
                        }}>
                            {initiales}
                            {/* Badge "en ligne" */}
                            <div style={{
                                position:'absolute', bottom:2, right:2,
                                width:14, height:14, borderRadius:'50%',
                                background:'#4ade80',
                                border:'2.5px solid #fff',
                                boxShadow:'0 0 0 2px rgba(74,222,128,0.4)',
                            }}/>
                        </div>

                        <h3 style={{
                            color:'#fff', fontWeight:800, fontSize:20,
                            margin:'0 0 6px', letterSpacing:'-0.3px',
                            position:'relative', zIndex:1, textAlign:'center',
                        }}>
                            {users?.name || 'Utilisateur Desti-k'}
                        </h3>

                        {/* Badges rôle + statut */}
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', position:'relative', zIndex:1 }}>
                            <span style={{
                                padding:'4px 14px', borderRadius:20, fontSize:11, fontWeight:700,
                                background:'rgba(255,255,255,0.2)',
                                border:'1px solid rgba(255,255,255,0.35)',
                                color:'#fff',
                            }}>
                                <FontAwesomeIcon icon={faUserShield} style={{ marginRight:5, fontSize:10 }}/>
                                {cfg.label}
                            </span>
                            <span style={{
                                padding:'4px 14px', borderRadius:20, fontSize:11, fontWeight:700,
                                background:'rgba(74,222,128,0.25)',
                                border:'1px solid rgba(74,222,128,0.45)',
                                color:'#4ade80',
                            }}>
                                <FontAwesomeIcon icon={faCircle} style={{ marginRight:4, fontSize:7 }}/>
                                En ligne
                            </span>
                        </div>
                    </div>

                    {/* ── CORPS ── */}
                    <div style={{ padding:'24px 26px 28px' }}>

                        <p style={{
                            fontSize:10, color:'#94a3b8', textTransform:'uppercase',
                            letterSpacing:'1px', fontWeight:700, margin:'0 0 14px',
                        }}>
                            Informations du compte
                        </p>

                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                            {infoRows.map((row, i) => (
                                <div key={i} style={{
                                    display:'flex', alignItems:'center', gap:12,
                                    padding:'10px 14px', borderRadius:12,
                                    background:'#f8fafc', border:'1px solid #f1f5f9',
                                    transition:'background .15s',
                                }}>
                                    <div style={{
                                        width:34, height:34, borderRadius:10, flexShrink:0,
                                        background:cfg.bg, color:cfg.color,
                                        display:'flex', alignItems:'center', justifyContent:'center',
                                        fontSize:13,
                                    }}>
                                        <FontAwesomeIcon icon={row.icon}/>
                                    </div>
                                    <div>
                                        <p style={{ margin:0, fontSize:10, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.5px', fontWeight:600 }}>
                                            {row.label}
                                        </p>
                                        <p style={{ margin:0, fontSize:13, fontWeight:600, color:'#1e293b' }}>
                                            {row.value}
                                        </p>
                                    </div>
                                    {/* Indicateur de vérification pour l'email */}
                                    {row.label === 'Email' && (
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            style={{ marginLeft:'auto', color:'#059669', fontSize:13 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* ── ACTIONS ── */}
                        <div style={{
                            borderTop:'1px solid #f1f5f9', marginTop:20, paddingTop:20,
                            display:'flex', gap:10,
                        }}>
                            <button
                                onClick={onClose}
                                style={{
                                    flex:1, padding:'10px 0', borderRadius:12,
                                    border:'1.5px solid #e2e8f0', background:'#f8fafc',
                                    color:'#64748b', fontSize:13, fontWeight:600, cursor:'pointer',
                                }}
                            >
                                Fermer
                            </button>
                            <button
                                style={{
                                    flex:2, padding:'10px 0', borderRadius:12, border:'none',
                                    background:`linear-gradient(135deg, ${cfg.color}dd, ${cfg.color})`,
                                    color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer',
                                    boxShadow:`0 4px 14px ${cfg.color}44`,
                                }}
                            >
                                Modifier le profil
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity:0; transform:translateY(28px) scale(0.96); }
                    to   { opacity:1; transform:translateY(0)    scale(1);    }
                }
            `}</style>
        </>
    );
};

export default ProfileModal;