import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch, faFilePdf, faUser, faPhone, faVenusMars,
    faCalendar, faTrash, faEye, faTimes, faUsers,
    faFlask, faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import { usePatients } from "./PatientContext";

/* ── Modal détail patient ── */
const ModalDetail = ({ patient, onClose }) => {
    if (!patient) return null;
    const rows = [
        { label: 'Nom complet',        value: patient.nom },
        { label: 'Date de naissance',  value: patient.dateNaissance || '—' },
        { label: 'Sexe',               value: patient.sexe || '—' },
        { label: 'Contact',            value: patient.contact || '—' },
        { label: 'Adresse',            value: patient.adresse || '—' },
        { label: 'Profession',         value: patient.profession || '—' },
        { label: 'Médecin',            value: patient.medecinPrescripteur || '—' },
        { label: 'Examens',            value: patient.examens || '—' },
        { label: 'Prélèvement',        value: patient.typePrelevement || '—' },
        { label: 'À jeun',             value: patient.aJeun ? 'Oui' : 'Non' },
        { label: 'Pathologies',        value: patient.pathologie || '—' },
        { label: 'Allergies',          value: patient.allergies || 'Aucune' },
        { label: 'Préleveur',          value: patient.preleveur || '—' },
        { label: 'Observations',       value: patient.observations || '—' },
        { label: 'Contact urgence',    value: patient.urgenceNom ? `${patient.urgenceNom} (${patient.urgenceRelation}) — ${patient.urgenceContact}` : '—' },
    ];

    return (
        <>
            <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', zIndex:9998, backdropFilter:'blur(4px)' }}/>
            <div style={{
                position:'fixed', inset:0, zIndex:9999,
                display:'flex', alignItems:'center', justifyContent:'center', padding:20,
            }}>
                <div style={{
                    background:'#fff', borderRadius:20, width:'100%', maxWidth:600,
                    maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column',
                    boxShadow:'0 32px 80px rgba(0,0,0,0.2)',
                    animation:'slideUp .25s cubic-bezier(.22,1,.36,1)',
                }}>
                    {/* Header */}
                    <div style={{
                        background:'linear-gradient(135deg,#185FA5,#1a7fd4)',
                        padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center',
                    }}>
                        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                            <div style={{
                                width:44, height:44, borderRadius:12,
                                background:'rgba(255,255,255,0.2)',
                                display:'flex', alignItems:'center', justifyContent:'center',
                                fontSize:18, color:'#fff', fontWeight:900,
                            }}>
                                {patient.nom?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                                <p style={{ margin:0, color:'#fff', fontWeight:800, fontSize:16 }}>{patient.nom}</p>
                                <p style={{ margin:0, color:'rgba(255,255,255,0.7)', fontSize:12 }}>
                                    #{String(patient.id).slice(-6)} · {patient.sexe} · {patient.statut}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} style={{
                            width:32, height:32, borderRadius:8, border:'none',
                            background:'rgba(255,255,255,0.15)', color:'#fff',
                            cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center',
                        }}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{ overflowY:'auto', padding:24 }}>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                            {rows.map((r, i) => (
                                <div key={i} style={{
                                    background:'#f8fafc', borderRadius:10, padding:'10px 14px',
                                    gridColumn: ['Observations', 'Contact urgence'].includes(r.label) ? '1/-1' : undefined,
                                }}>
                                    <p style={{ margin:0, fontSize:10, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.5px', fontWeight:700 }}>{r.label}</p>
                                    <p style={{ margin:'3px 0 0', fontSize:13, fontWeight:600, color:'#0f172a' }}>{r.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>
        </>
    );
};

/* ── Export PDF ── */
const exporterPDF = (patients) => {
    const lignes = patients.map((p, i) => `
        <tr style="background:${i%2===0?'#fff':'#f8fafc'}">
            <td>#${String(p.id).slice(-4)}</td>
            <td><strong>${p.nom}</strong></td>
            <td>${p.sexe || '—'}</td>
            <td>${p.contact || '—'}</td>
            <td>${p.examens || '—'}</td>
            <td>${p.typePrelevement || '—'}</td>
            <td>${new Date(p.dateCreation).toLocaleDateString('fr-FR')}</td>
        </tr>`).join('');

    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
    <title>Liste Patients — Desti-K</title>
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:Arial,sans-serif; color:#1e293b; }
        header { background:linear-gradient(135deg,#185FA5,#1a7fd4); color:#fff; padding:24px 32px; display:flex; justify-content:space-between; align-items:center; }
        h1 { font-size:20px; font-weight:900; }
        p.sub { font-size:12px; opacity:.75; margin-top:4px; }
        .meta { text-align:right; font-size:12px; }
        table { width:100%; border-collapse:collapse; margin-top:0; }
        thead tr { background:#185FA5; }
        th { padding:10px 14px; color:#fff; font-size:11px; text-transform:uppercase; letter-spacing:1px; text-align:left; }
        td { padding:10px 14px; font-size:12px; border-bottom:1px solid #e2e8f0; }
        .total { padding:16px 32px; background:#f8fafc; border-top:2px solid #185FA5; font-size:13px; color:#64748b; }
        @media print { @page { margin:0; } body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
    </style></head><body>
    <header>
        <div><h1>LABORATOIRE DESTI-K</h1><p class="sub">Liste des patients enregistrés</p></div>
        <div class="meta"><p>Exporté le ${new Date().toLocaleDateString('fr-FR')}</p><p>${patients.length} patient(s)</p></div>
    </header>
    <table>
        <thead><tr><th>ID</th><th>Nom</th><th>Sexe</th><th>Contact</th><th>Examens</th><th>Prélèvement</th><th>Date enreg.</th></tr></thead>
        <tbody>${lignes}</tbody>
    </table>
    <div class="total">Total : <strong>${patients.length} patient(s)</strong> — © 2026 Laboratoire Desti-K</div>
    <script>window.onload=()=>{window.print();}</script>
    </body></html>`;

    const w = window.open('', '_blank', 'width=900,height=700');
    w.document.write(html);
    w.document.close();
};

/* ── Composant principal ── */
const ListePatients = ({ onAjouterClick }) => {
    const { patients, supprimerPatient } = usePatients();
    const [search,      setSearch]      = useState('');
    const [filtreSexe,  setFiltreSexe]  = useState('tous');
    const [detail,      setDetail]      = useState(null);
    const [confirmDel,  setConfirmDel]  = useState(null);

    const filtered = useMemo(() => {
        return patients.filter(p => {
            const q = search.toLowerCase();
            const matchSearch = !q || p.nom?.toLowerCase().includes(q) || p.contact?.includes(q) || p.examens?.toLowerCase().includes(q);
            const matchSexe   = filtreSexe === 'tous' || p.sexe === filtreSexe;
            return matchSearch && matchSexe;
        });
    }, [patients, search, filtreSexe]);

    const stats = useMemo(() => ({
        total:    patients.length,
        hommes:   patients.filter(p => p.sexe === 'Male').length,
        femmes:   patients.filter(p => p.sexe === 'Female').length,
        avecExam: patients.filter(p => p.examens).length,
    }), [patients]);

    if (patients.length === 0) return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'80px 20px', textAlign:'center' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>👤</div>
            <h3 style={{ fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Aucun patient enregistré</h3>
            <p style={{ color:'#64748b', fontSize:14, marginBottom:24 }}>Commencez par ajouter un nouveau patient.</p>
            {onAjouterClick && (
                <button onClick={onAjouterClick} style={{
                    padding:'12px 28px', border:'none', borderRadius:12,
                    background:'linear-gradient(135deg,#185FA5,#1a7fd4)', color:'#fff',
                    fontSize:14, fontWeight:700, cursor:'pointer',
                    boxShadow:'0 4px 16px rgba(24,95,165,0.3)',
                }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight:8 }}/>
                    Ajouter un patient
                </button>
            )}
        </div>
    );

    return (
        <div style={{ maxWidth:1100, margin:'0 auto' }}>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                    { label:'Total patients', value:stats.total,    icon:faUsers,    color:'#185FA5', bg:'#eff6ff' },
                    { label:'Hommes',          value:stats.hommes,   icon:faVenusMars, color:'#2563eb', bg:'#dbeafe' },
                    { label:'Femmes',          value:stats.femmes,   icon:faHeartbeat, color:'#db2777', bg:'#fce7f3' },
                    { label:'Avec examens',    value:stats.avecExam, icon:faFlask,     color:'#7c3aed', bg:'#f5f3ff' },
                ].map((s, i) => (
                    <div key={i} style={{
                        background:'#fff', borderRadius:14, padding:'16px 20px',
                        border:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:14,
                        boxShadow:'0 2px 8px rgba(0,0,0,0.04)',
                    }}>
                        <div style={{ width:42, height:42, borderRadius:12, background:s.bg, color:s.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>
                            <FontAwesomeIcon icon={s.icon}/>
                        </div>
                        <div>
                            <p style={{ margin:0, fontSize:10, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.5px', fontWeight:700 }}>{s.label}</p>
                            <p style={{ margin:0, fontSize:24, fontWeight:900, color:s.color }}>{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Barre outils */}
            <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
                {/* Recherche */}
                <div style={{ position:'relative', flex:1, minWidth:200 }}>
                    <FontAwesomeIcon icon={faSearch} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', fontSize:13 }}/>
                    <input
                        placeholder="Rechercher par nom, contact, examen..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width:'100%', padding:'10px 14px 10px 36px',
                            border:'1.5px solid #e2e8f0', borderRadius:10,
                            fontSize:13, outline:'none', background:'#fff',
                            boxSizing:'border-box',
                        }}
                    />
                </div>

                {/* Filtre sexe */}
                <select value={filtreSexe} onChange={e => setFiltreSexe(e.target.value)}
                        style={{ padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:13, background:'#fff', outline:'none' }}>
                    <option value="tous">Tous</option>
                    <option value="Male">Hommes</option>
                    <option value="Female">Femmes</option>
                </select>

                {/* Export PDF */}
                <button onClick={() => exporterPDF(filtered)}
                        style={{
                            padding:'10px 20px', border:'none', borderRadius:10,
                            background:'linear-gradient(135deg,#dc2626,#ef4444)', color:'#fff',
                            fontSize:13, fontWeight:700, cursor:'pointer',
                            display:'flex', alignItems:'center', gap:8,
                            boxShadow:'0 2px 8px rgba(220,38,38,0.25)',
                        }}>
                    <FontAwesomeIcon icon={faFilePdf}/>
                    Exporter PDF
                </button>
            </div>

            {/* Tableau */}
            <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                    <tr style={{ background:'#f8fafc', borderBottom:'2px solid #e2e8f0' }}>
                        {['ID', 'Patient', 'Sexe', 'Contact', 'Examens', 'Prélèvement', 'Date', 'Actions'].map(h => (
                            <th key={h} style={{ padding:'12px 16px', fontSize:10, fontWeight:800, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.8px', textAlign:'left' }}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((p, i) => (
                        <tr key={p.id} style={{
                            background: i%2===0 ? '#fff' : '#fafafa',
                            borderBottom:'1px solid #f1f5f9',
                            transition:'background .15s',
                        }}
                            onMouseOver={e => e.currentTarget.style.background='#f0f9ff'}
                            onMouseOut={e  => e.currentTarget.style.background=i%2===0?'#fff':'#fafafa'}
                        >
                            <td style={{ padding:'12px 16px', fontSize:12, color:'#185FA5', fontWeight:700 }}>
                                #{String(p.id).slice(-4)}
                            </td>
                            <td style={{ padding:'12px 16px' }}>
                                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                                    <div style={{
                                        width:34, height:34, borderRadius:10,
                                        background:'linear-gradient(135deg,#185FA5,#1a7fd4)',
                                        color:'#fff', display:'flex', alignItems:'center',
                                        justifyContent:'center', fontWeight:800, fontSize:13, flexShrink:0,
                                    }}>
                                        {p.nom?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p style={{ margin:0, fontWeight:700, fontSize:13, color:'#0f172a' }}>{p.nom}</p>
                                        {p.adresse && <p style={{ margin:0, fontSize:11, color:'#94a3b8' }}>{p.adresse}</p>}
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding:'12px 16px' }}>
                                <span style={{
                                    padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700,
                                    background: p.sexe==='Male' ? '#dbeafe' : p.sexe==='Female' ? '#fce7f3' : '#f1f5f9',
                                    color:      p.sexe==='Male' ? '#1d4ed8' : p.sexe==='Female' ? '#be185d' : '#64748b',
                                }}>
                                    {p.sexe || '—'}
                                </span>
                            </td>
                            <td style={{ padding:'12px 16px', fontSize:12, color:'#374151' }}>
                                <FontAwesomeIcon icon={faPhone} style={{ marginRight:5, color:'#94a3b8', fontSize:10 }}/>
                                {p.contact || '—'}
                            </td>
                            <td style={{ padding:'12px 16px', fontSize:12, color:'#374151', maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                {p.examens || <span style={{ color:'#d1d5db' }}>—</span>}
                            </td>
                            <td style={{ padding:'12px 16px' }}>
                                {p.typePrelevement
                                    ? <span style={{ padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700, background:'#f5f3ff', color:'#7c3aed' }}>{p.typePrelevement}</span>
                                    : <span style={{ color:'#d1d5db' }}>—</span>}
                            </td>
                            <td style={{ padding:'12px 16px', fontSize:11, color:'#94a3b8' }}>
                                <FontAwesomeIcon icon={faCalendar} style={{ marginRight:5 }}/>
                                {new Date(p.dateCreation).toLocaleDateString('fr-FR')}
                            </td>
                            <td style={{ padding:'12px 16px' }}>
                                <div style={{ display:'flex', gap:6 }}>
                                    <button onClick={() => setDetail(p)} style={{
                                        width:32, height:32, border:'none', borderRadius:8,
                                        background:'#eff6ff', color:'#185FA5',
                                        cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                                    }} title="Voir détails">
                                        <FontAwesomeIcon icon={faEye} style={{ fontSize:12 }}/>
                                    </button>
                                    <button onClick={() => setConfirmDel(p.id)} style={{
                                        width:32, height:32, border:'none', borderRadius:8,
                                        background:'#fef2f2', color:'#dc2626',
                                        cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                                    }} title="Supprimer">
                                        <FontAwesomeIcon icon={faTrash} style={{ fontSize:12 }}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div style={{ textAlign:'center', padding:'48px 20px', color:'#94a3b8' }}>
                        <FontAwesomeIcon icon={faSearch} style={{ fontSize:32, opacity:.3, display:'block', marginBottom:12 }}/>
                        Aucun patient ne correspond à votre recherche.
                    </div>
                )}

                {/* Footer */}
                <div style={{ padding:'12px 20px', background:'#f8fafc', borderTop:'1px solid #e2e8f0', fontSize:12, color:'#64748b', display:'flex', justifyContent:'space-between' }}>
                    <span>{filtered.length} patient(s) affiché(s) sur {patients.length}</span>
                    <span>© 2026 Laboratoire Desti-K</span>
                </div>
            </div>

            {/* Modal détail */}
            <ModalDetail patient={detail} onClose={() => setDetail(null)}/>

            {/* Confirm suppression */}
            {confirmDel && (
                <>
                    <div onClick={() => setConfirmDel(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:9998 }}/>
                    <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:9999, background:'#fff', borderRadius:16, padding:28, width:360, boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
                        <h4 style={{ margin:'0 0 8px', fontWeight:800 }}>Confirmer la suppression</h4>
                        <p style={{ color:'#64748b', fontSize:13, margin:'0 0 20px' }}>Cette action est irréversible.</p>
                        <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
                            <button onClick={() => setConfirmDel(null)} style={{ padding:'9px 18px', border:'1.5px solid #e2e8f0', borderRadius:9, background:'#fff', color:'#64748b', fontWeight:600, cursor:'pointer', fontSize:13 }}>Annuler</button>
                            <button onClick={() => { supprimerPatient(confirmDel); setConfirmDel(null); }}
                                    style={{ padding:'9px 18px', border:'none', borderRadius:9, background:'#dc2626', color:'#fff', fontWeight:700, cursor:'pointer', fontSize:13 }}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListePatients;