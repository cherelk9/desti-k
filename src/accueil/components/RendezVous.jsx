import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt, faCalendarPlus, faTrash, faClock,
    faUser, faEdit, faCheck, faTimes, faSearch,
    faChevronLeft, faChevronRight,
    faExclamationCircle, faStethoscope, faHeartbeat,
    faClipboardList
} from "@fortawesome/free-solid-svg-icons";

// ── Constantes ──────────────────────────────────────────────────────────────
const MOTIFS = [
    { value: 'consultation', label: 'Consultation',  color: '#2563eb', bg: '#eff6ff'  },
    { value: 'suivi',        label: 'Suivi',          color: '#059669', bg: '#ecfdf5'  },
    { value: 'urgence',      label: 'Urgence',        color: '#dc2626', bg: '#fef2f2'  },
    { value: 'analyse',      label: 'Analyse',        color: '#d97706', bg: '#fffbeb'  },
    { value: 'controle',     label: 'Contrôle',       color: '#7c3aed', bg: '#f5f3ff'  },
];

const HEURES = Array.from({ length: 20 }, (_, i) => {
    const h = Math.floor(i / 2) + 8;
    const m = i % 2 === 0 ? '00' : '30';
    return `${String(h).padStart(2, '0')}:${m}`;
});

const JOURS_COURTS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MOIS_NOMS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

const getMotif = (v) => MOTIFS.find(m => m.value === v) || MOTIFS[0];

const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
};

const isSameDay = (a, b) => {
    const da = new Date(a), db = new Date(b);
    return da.getFullYear()===db.getFullYear() && da.getMonth()===db.getMonth() && da.getDate()===db.getDate();
};

// ── Calendrier mini ──────────────────────────────────────────────────────────
const MiniCalendar = ({ selected, onChange, rdvs }) => {
    const [viewDate, setViewDate] = useState(new Date(selected || Date.now()));

    const year  = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const offset   = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

    const hasRdv = (date) => date && rdvs.some(r => isSameDay(r.date, date));
    const isSelected = (date) => date && selected && isSameDay(date, selected);
    const isToday = (date) => date && isSameDay(date, new Date());

    return (
        <div style={{ userSelect:'none' }}>
            {/* Navigation mois */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <button onClick={() => setViewDate(new Date(year, month-1, 1))} style={cs.navBtn}>
                    <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize:11 }}/>
                </button>
                <span style={{ fontWeight:700, fontSize:14, color:'#1e293b' }}>
                    {MOIS_NOMS[month]} {year}
                </span>
                <button onClick={() => setViewDate(new Date(year, month+1, 1))} style={cs.navBtn}>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize:11 }}/>
                </button>
            </div>

            {/* En-têtes jours */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:4 }}>
                {JOURS_COURTS.map(j => (
                    <div key={j} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:'#94a3b8', padding:'2px 0', textTransform:'uppercase', letterSpacing:'.5px' }}>
                        {j}
                    </div>
                ))}
            </div>

            {/* Grille jours */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
                {cells.map((date, i) => (
                    <div key={i}
                         onClick={() => date && onChange(date.toISOString().split('T')[0])}
                         style={{
                             aspectRatio:'1', display:'flex', flexDirection:'column',
                             alignItems:'center', justifyContent:'center',
                             borderRadius:8, fontSize:12, fontWeight:600,
                             cursor: date ? 'pointer' : 'default',
                             background: date
                                 ? isSelected(date) ? '#2563eb'
                                     : isToday(date)    ? '#eff6ff'
                                         : 'transparent'
                                 : 'transparent',
                             color: date
                                 ? isSelected(date) ? '#fff'
                                     : isToday(date)    ? '#2563eb'
                                         : '#374151'
                                 : 'transparent',
                             position:'relative',
                             transition:'background .15s',
                         }}
                    >
                        {date ? date.getDate() : ''}
                        {date && hasRdv(date) && !isSelected(date) && (
                            <div style={{ width:4, height:4, borderRadius:'50%', background: isToday(date) ? '#2563eb' : '#2563eb', position:'absolute', bottom:3 }}/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ── Carte RDV ────────────────────────────────────────────────────────────────
const RdvCard = ({ rdv, onDelete, onEdit }) => {
    const motif = getMotif(rdv.motif);
    return (
        <div style={{
            display:'flex', alignItems:'center', gap:14,
            padding:'14px 16px', borderRadius:14,
            background:'#fff', border:'1px solid #e2e8f0',
            boxShadow:'0 2px 8px rgba(0,0,0,.04)',
            transition:'box-shadow .2s, transform .2s',
            cursor:'default',
        }}
             onMouseOver={e => { e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,.09)'; e.currentTarget.style.transform='translateY(-1px)'; }}
             onMouseOut={e  => { e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,.04)';  e.currentTarget.style.transform='translateY(0)'; }}
        >
            {/* Heure */}
            <div style={{
                width:56, height:56, borderRadius:14, flexShrink:0,
                background: motif.bg, color: motif.color,
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                fontWeight:800, fontSize:13, lineHeight:1.2,
            }}>
                {rdv.heure || '--'}
            </div>

            {/* Infos */}
            <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:14, color:'#0f172a', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {rdv.patient}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                    <span style={{
                        padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700,
                        background: motif.bg, color: motif.color,
                        border:`1px solid ${motif.color}30`,
                    }}>
                        {motif.label}
                    </span>
                    {rdv.notes && (
                        <span style={{ fontSize:11, color:'#94a3b8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:160 }}>
                            {rdv.notes}
                        </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <button onClick={() => onEdit(rdv)} style={{ ...cs.iconBtn, color:'#2563eb', background:'#eff6ff' }}
                        title="Modifier">
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize:12 }}/>
                </button>
                <button onClick={() => onDelete(rdv.id)} style={{ ...cs.iconBtn, color:'#dc2626', background:'#fef2f2' }}
                        title="Supprimer">
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize:12 }}/>
                </button>
            </div>
        </div>
    );
};

// ── Formulaire RDV ───────────────────────────────────────────────────────────
const RdvForm = ({ initial, dateSelected, onSave, onCancel }) => {
    const [form, setForm] = useState(initial || {
        patient:'', heure:'08:00', motif:'consultation', notes:''
    });
    const [errors, setErrors] = useState({});

    const set = (k, v) => setForm(f => ({ ...f, [k]:v }));

    const validate = () => {
        const e = {};
        if (!form.patient.trim()) e.patient = 'Nom requis';
        if (!form.heure)          e.heure   = 'Heure requise';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({ ...form, date: dateSelected, id: initial?.id || Date.now() });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Patient */}
            <div style={cs.field}>
                <label style={cs.label}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight:5 }}/>
                    Nom du patient *
                </label>
                <input
                    type="text"
                    placeholder="ex : Dupont Jean"
                    value={form.patient}
                    onChange={e => set('patient', e.target.value)}
                    style={{ ...cs.input, borderColor: errors.patient ? '#dc2626' : '#e2e8f0' }}
                />
                {errors.patient && <span style={cs.error}>{errors.patient}</span>}
            </div>

            {/* Heure */}
            <div style={cs.field}>
                <label style={cs.label}>
                    <FontAwesomeIcon icon={faClock} style={{ marginRight:5 }}/>
                    Heure *
                </label>
                <select value={form.heure} onChange={e => set('heure', e.target.value)}
                        style={{ ...cs.input, borderColor: errors.heure ? '#dc2626' : '#e2e8f0' }}>
                    {HEURES.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                {errors.heure && <span style={cs.error}>{errors.heure}</span>}
            </div>

            {/* Motif */}
            <div style={cs.field}>
                <label style={cs.label}>
                    <FontAwesomeIcon icon={faStethoscope} style={{ marginRight:5 }}/>
                    Motif
                </label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {MOTIFS.map(m => (
                        <button key={m.value} type="button"
                                onClick={() => set('motif', m.value)}
                                style={{
                                    padding:'5px 12px', borderRadius:20, fontSize:12, fontWeight:700,
                                    border:`1.5px solid ${form.motif===m.value ? m.color : '#e2e8f0'}`,
                                    background: form.motif===m.value ? m.bg : '#f8fafc',
                                    color: form.motif===m.value ? m.color : '#64748b',
                                    cursor:'pointer', transition:'all .15s',
                                }}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notes */}
            <div style={cs.field}>
                <label style={cs.label}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ marginRight:5 }}/>
                    Notes (optionnel)
                </label>
                <textarea
                    placeholder="Observations, instructions particulières..."
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    rows={2}
                    style={{ ...cs.input, resize:'vertical', minHeight:60 }}
                />
            </div>

            {/* Boutons */}
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
                {onCancel && (
                    <button type="button" onClick={onCancel} style={cs.cancelBtn}>
                        <FontAwesomeIcon icon={faTimes} style={{ marginRight:6 }}/>
                        Annuler
                    </button>
                )}
                <button type="submit" style={cs.submitBtn}>
                    <FontAwesomeIcon icon={initial ? faCheck : faCalendarPlus} style={{ marginRight:6 }}/>
                    {initial ? 'Enregistrer les modifications' : 'Ajouter le rendez-vous'}
                </button>
            </div>
        </form>
    );
};

// ── Composant principal ──────────────────────────────────────────────────────
const RendezVous = () => {
    const today = new Date().toISOString().split('T')[0];

    const [dateSelected, setDateSelected] = useState(today);
    const [rdvs, setRdvs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('rdvs') || '[]'); }
        catch { return []; }
    });
    const [editTarget, setEditTarget] = useState(null);   // rdv en cours d'édition
    const [showForm,   setShowForm]   = useState(false);
    const [search, setSearch] = useState('');
    const [filterMotif, setFilterMotif] = useState('tous');
    const [view, setView] = useState('jour'); // 'jour' | 'liste'

    // Persistance
    useEffect(() => { localStorage.setItem('rdvs', JSON.stringify(rdvs)); }, [rdvs]);

    // CRUD
    const saveRdv = (rdv) => {
        setRdvs(prev => {
            const exists = prev.find(r => r.id === rdv.id);
            return exists ? prev.map(r => r.id===rdv.id ? rdv : r) : [...prev, rdv];
        });
        setEditTarget(null);
        setShowForm(false);
    };
    const deleteRdv  = (id) => setRdvs(prev => prev.filter(r => r.id !== id));
    const startEdit  = (rdv) => { setEditTarget(rdv); setShowForm(true); };
    const cancelForm = () => { setEditTarget(null); setShowForm(false); };

    // RDV du jour sélectionné (filtrés + triés)
    const rdvsDuJour = useMemo(() => {
        return rdvs
            .filter(r => isSameDay(r.date, dateSelected))
            .filter(r => filterMotif==='tous' || r.motif===filterMotif)
            .filter(r => !search || r.patient.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => (a.heure||'').localeCompare(b.heure||''));
    }, [rdvs, dateSelected, filterMotif, search]);

    // Tous les RDV triés (vue liste)
    const tousRdvs = useMemo(() => {
        return [...rdvs]
            .filter(r => filterMotif==='tous' || r.motif===filterMotif)
            .filter(r => !search || r.patient.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => new Date(a.date)-new Date(b.date) || (a.heure||'').localeCompare(b.heure||''));
    }, [rdvs, filterMotif, search]);

    // Stats rapides
    const todayCount  = rdvs.filter(r => isSameDay(r.date, today)).length;
    const weekCount   = rdvs.filter(r => {
        const d = new Date(r.date), now = new Date();
        const startW = new Date(now); startW.setDate(now.getDate() - now.getDay());
        const endW   = new Date(startW); endW.setDate(startW.getDate() + 6);
        return d >= startW && d <= endW;
    }).length;
    const urgCount = rdvs.filter(r => r.motif==='urgence').length;

    return (
        <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", color:'#1e293b', maxWidth:1200 }}>

            {/* ── EN-TÊTE ── */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
                <div>
                    <h2 style={{ fontWeight:800, fontSize:24, margin:0, letterSpacing:'-0.4px' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight:10, color:'#2563eb' }}/>
                        Rendez-vous
                    </h2>
                    <p style={{ margin:'3px 0 0', fontSize:13, color:'#64748b' }}>
                        {formatDate(dateSelected)}
                    </p>
                </div>
                <button
                    onClick={() => { setEditTarget(null); setShowForm(!showForm); }}
                    style={{
                        ...cs.submitBtn, width:'auto', padding:'10px 20px',
                        boxShadow: showForm ? 'none' : '0 4px 14px rgba(37,99,235,.35)',
                        background: showForm ? '#f1f5f9' : 'linear-gradient(135deg,#1d4ed8,#2563eb)',
                        color: showForm ? '#64748b' : '#fff',
                    }}
                >
                    <FontAwesomeIcon icon={showForm ? faTimes : faCalendarPlus} style={{ marginRight:8 }}/>
                    {showForm ? 'Fermer' : 'Nouveau RDV'}
                </button>
            </div>

            {/* ── STATS RAPIDES ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24 }}>
                {[
                    { label:"Aujourd'hui",  value:todayCount, icon:faCalendarAlt,   color:'#2563eb', bg:'#eff6ff' },
                    { label:'Cette semaine',value:weekCount,  icon:faHeartbeat,      color:'#059669', bg:'#ecfdf5' },
                    { label:'Urgences',     value:urgCount,   icon:faExclamationCircle, color:'#dc2626', bg:'#fef2f2' },
                ].map((stat, i) => (
                    <div key={i} style={{ background:'#fff', borderRadius:14, padding:'16px 20px', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:14, boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
                        <div style={{ width:42, height:42, borderRadius:12, background:stat.bg, color:stat.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>
                            <FontAwesomeIcon icon={stat.icon}/>
                        </div>
                        <div>
                            <p style={{ margin:0, fontSize:10, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.5px', fontWeight:700 }}>{stat.label}</p>
                            <p style={{ margin:0, fontSize:22, fontWeight:800, color:stat.color }}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── LAYOUT PRINCIPAL ── */}
            <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:20 }}>

                {/* ── COLONNE GAUCHE ── */}
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

                    {/* Calendrier */}
                    <div style={{ background:'#fff', borderRadius:16, padding:20, border:'1px solid #e2e8f0', boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
                        <MiniCalendar selected={dateSelected} onChange={setDateSelected} rdvs={rdvs}/>
                        <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:6 }}>
                            <div style={{ width:8, height:8, borderRadius:'50%', background:'#2563eb' }}/>
                            <span style={{ fontSize:11, color:'#94a3b8' }}>Points = jours avec RDV</span>
                        </div>
                    </div>

                    {/* Formulaire */}
                    {showForm && (
                        <div style={{ background:'#fff', borderRadius:16, padding:22, border:'1px solid #e2e8f0', boxShadow:'0 2px 8px rgba(0,0,0,.04)', animation:'slideDown .22s ease' }}>
                            <h6 style={{ fontWeight:700, fontSize:14, margin:'0 0 16px', color:'#0f172a' }}>
                                <FontAwesomeIcon icon={editTarget ? faEdit : faCalendarPlus} style={{ marginRight:8, color:'#2563eb' }}/>
                                {editTarget ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
                            </h6>
                            <RdvForm
                                initial={editTarget}
                                dateSelected={dateSelected}
                                onSave={saveRdv}
                                onCancel={editTarget ? cancelForm : null}
                            />
                        </div>
                    )}
                </div>

                {/* ── COLONNE DROITE ── */}
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

                    {/* Barre outils */}
                    <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                        {/* Recherche */}
                        <div style={{ position:'relative', flex:1, minWidth:180 }}>
                            <FontAwesomeIcon icon={faSearch} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', fontSize:13 }}/>
                            <input
                                placeholder="Rechercher un patient..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ ...cs.input, paddingLeft:36, margin:0 }}
                            />
                        </div>

                        {/* Filtre motif */}
                        <select value={filterMotif} onChange={e => setFilterMotif(e.target.value)}
                                style={{ ...cs.input, width:'auto', margin:0, paddingLeft:12 }}>
                            <option value="tous">Tous les motifs</option>
                            {MOTIFS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>

                        {/* Toggle vue */}
                        <div style={{ display:'flex', background:'#f1f5f9', borderRadius:10, padding:3 }}>
                            {['jour','liste'].map(v => (
                                <button key={v} onClick={() => setView(v)} style={{
                                    padding:'6px 14px', borderRadius:8, border:'none', fontSize:12, fontWeight:700,
                                    background: view===v ? '#fff' : 'transparent',
                                    color: view===v ? '#2563eb' : '#94a3b8',
                                    boxShadow: view===v ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
                                    cursor:'pointer', transition:'all .15s', textTransform:'capitalize',
                                }}>{v === 'jour' ? 'Jour' : 'Tous'}</button>
                            ))}
                        </div>
                    </div>

                    {/* Liste RDV */}
                    {view === 'jour' ? (
                        <div>
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                                <h6 style={{ margin:0, fontWeight:700, fontSize:13, color:'#64748b', textTransform:'uppercase', letterSpacing:'.5px' }}>
                                    {rdvsDuJour.length} rendez-vous · {new Date(dateSelected).toLocaleDateString('fr-FR', { day:'numeric', month:'long' })}
                                </h6>
                                <div style={{ display:'flex', gap:6 }}>
                                    <button onClick={() => {
                                        const d = new Date(dateSelected); d.setDate(d.getDate()-1);
                                        setDateSelected(d.toISOString().split('T')[0]);
                                    }} style={cs.navBtn}>
                                        <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize:11 }}/>
                                    </button>
                                    <button onClick={() => setDateSelected(today)} style={{ ...cs.navBtn, fontSize:10, padding:'4px 10px', width:'auto' }}>
                                        Aujourd'hui
                                    </button>
                                    <button onClick={() => {
                                        const d = new Date(dateSelected); d.setDate(d.getDate()+1);
                                        setDateSelected(d.toISOString().split('T')[0]);
                                    }} style={cs.navBtn}>
                                        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize:11 }}/>
                                    </button>
                                </div>
                            </div>

                            {rdvsDuJour.length > 0 ? (
                                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                    {rdvsDuJour.map(rdv => (
                                        <RdvCard key={rdv.id} rdv={rdv} onDelete={deleteRdv} onEdit={startEdit}/>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ background:'#fff', borderRadius:16, padding:'48px 24px', textAlign:'center', border:'1px solid #e2e8f0' }}>
                                    <div style={{ fontSize:40, marginBottom:12 }}>📅</div>
                                    <p style={{ fontWeight:700, color:'#1e293b', margin:'0 0 6px' }}>Aucun rendez-vous ce jour</p>
                                    <p style={{ color:'#94a3b8', fontSize:13, margin:0 }}>Cliquez sur "Nouveau RDV" pour en ajouter un</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Vue liste complète groupée par date
                        <div>
                            {tousRdvs.length > 0 ? (() => {
                                const groups = {};
                                tousRdvs.forEach(r => {
                                    const k = new Date(r.date).toISOString().split('T')[0];
                                    if (!groups[k]) groups[k] = [];
                                    groups[k].push(r);
                                });
                                return Object.entries(groups).map(([date, list]) => (
                                    <div key={date} style={{ marginBottom:20 }}>
                                        <div style={{
                                            display:'flex', alignItems:'center', gap:10, marginBottom:10,
                                            cursor:'pointer',
                                        }} onClick={() => { setDateSelected(date); setView('jour'); }}>
                                            <div style={{
                                                padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700,
                                                background: isSameDay(date,today) ? '#2563eb' : '#f1f5f9',
                                                color: isSameDay(date,today) ? '#fff' : '#475569',
                                            }}>
                                                {isSameDay(date,today) ? "Aujourd'hui" : new Date(date).toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short' })}
                                            </div>
                                            <div style={{ flex:1, height:1, background:'#f1f5f9' }}/>
                                            <span style={{ fontSize:11, color:'#94a3b8', fontWeight:600 }}>{list.length} rdv</span>
                                        </div>
                                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                            {list.map(rdv => (
                                                <RdvCard key={rdv.id} rdv={rdv} onDelete={deleteRdv} onEdit={r => { setDateSelected(date); startEdit(r); }}/>
                                            ))}
                                        </div>
                                    </div>
                                ));
                            })() : (
                                <div style={{ background:'#fff', borderRadius:16, padding:'48px 24px', textAlign:'center', border:'1px solid #e2e8f0' }}>
                                    <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                                    <p style={{ fontWeight:700, color:'#1e293b', margin:'0 0 6px' }}>Aucun résultat</p>
                                    <p style={{ color:'#94a3b8', fontSize:13, margin:0 }}>Modifiez vos filtres ou ajoutez un rendez-vous</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideDown {
                    from { opacity:0; transform:translateY(-10px); }
                    to   { opacity:1; transform:translateY(0); }
                }
            `}</style>
        </div>
    );
};

// ── Styles partagés ──────────────────────────────────────────────────────────
const cs = {
    navBtn: {
        width:30, height:30, borderRadius:8, border:'1px solid #e2e8f0',
        background:'#f8fafc', color:'#64748b', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:12, flexShrink:0,
    },
    iconBtn: {
        width:32, height:32, borderRadius:8, border:'none',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', transition:'opacity .15s',
    },
    field: { marginBottom:14 },
    label: { display:'block', fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:6 },
    input: {
        width:'100%', padding:'9px 12px', borderRadius:10,
        border:'1.5px solid #e2e8f0', fontSize:13, color:'#1e293b',
        outline:'none', background:'#f8fafc', boxSizing:'border-box',
        fontFamily:'inherit',
    },
    error: { fontSize:11, color:'#dc2626', marginTop:4, display:'block' },
    submitBtn: {
        width:'100%', padding:'11px 0', borderRadius:12, border:'none',
        background:'linear-gradient(135deg,#1d4ed8,#2563eb)', color:'#fff',
        fontSize:13, fontWeight:700, cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 4px 14px rgba(37,99,235,.3)', transition:'opacity .2s',
    },
    cancelBtn: {
        flex:1, padding:'11px 0', borderRadius:12,
        border:'1.5px solid #e2e8f0', background:'#f8fafc',
        color:'#64748b', fontSize:13, fontWeight:600, cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
    },
};

export default RendezVous;