import { useMemo, useState } from "react";
import { Transaction } from "../../caisse/components/Transaction";
import { CustomerList } from "../../connexion/utils/CustomerList";
import { ExamenDisponibles } from "../../caisse/components/ExamenDisponibles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf, faUsers, faMoneyBillWave, faFlask,
    //faTrendingUp,
    faArrowTrendUp
    ,faArrowUp, faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ── Palette cohérente avec le thème bleu Desti-k ──
const BLUE   = '#2563eb';
const BLUE_L = '#eff6ff';
const COLORS  = ['#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe'];

const NOMS_MOIS = [
    'Janvier','Février','Mars','Avril','Mai','Juin',
    'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
];
const JOURS = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

// ── Tooltip personnalisé ──
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background:'#1e293b', borderRadius:10, padding:'10px 16px',
            boxShadow:'0 8px 24px rgba(0,0,0,.25)', border:'1px solid #334155'
        }}>
            <p style={{color:'#94a3b8',fontSize:11,margin:'0 0 6px',textTransform:'uppercase',letterSpacing:'.5px'}}>{label}</p>
            {payload.map((p,i)=>(
                <p key={i} style={{color:p.color,fontSize:13,fontWeight:700,margin:'2px 0'}}>
                    {p.name} : {p.name==='patients' ? p.value : `${Number(p.value).toLocaleString()} FCFA`}
                </p>
            ))}
        </div>
    );
};

// ── Placeholder quand il n'y a pas de données ──
const EmptyState = ({ label }) => (
    <div style={{height:180,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div style={{fontSize:30,marginBottom:8}}>📊</div>
        <p style={{fontSize:12,color:'#94a3b8',margin:0}}>{label}</p>
        <p style={{fontSize:11,color:'#cbd5e1',margin:'4px 0 0'}}>Les données s'afficheront automatiquement</p>
    </div>
);

const StatsDashboard = () => {
    const [filterMois, setFilterMois] = useState('Tous');

    // ── Filtrage ──
    const { transacs, clients } = useMemo(() => {
        if (filterMois === 'Tous') return { transacs: Transaction, clients: CustomerList };
        const idx = NOMS_MOIS.indexOf(filterMois);
        return {
            transacs: Transaction.filter(t => new Date(t.date || Date.now()).getMonth() === idx),
            clients:  CustomerList.filter(c => new Date(c.date || Date.now()).getMonth() === idx),
        };
    }, [filterMois]);

    // ── KPIs ──
    const totalCA      = transacs.reduce((s, t) => s + (Number(t.montant) || 0), 0);
    const nbExamens    = transacs.length;
    const moyenneVisite= clients.length > 0 ? Math.round(totalCA / clients.length) : 0;

    // ── Données graphique recettes / affluence par jour ──
    const donneesJours = useMemo(() => JOURS.map((jour, i) => ({
        jour,
        recettes: transacs
            .filter(t => new Date(t.date || Date.now()).getDay() === i)
            .reduce((s, t) => s + (Number(t.montant) || 0), 0),
        patients: clients
            .filter(c => new Date(c.date || Date.now()).getDay() === i).length,
    })), [transacs, clients]);

    // ── Popularité des examens ──
    const popularite = useMemo(() => {
        const compteur = {};
        transacs.forEach(t => {
            const nom = t.nameExam || t.examen || '—';
            compteur[nom] = (compteur[nom] || 0) + 1;
        });
        return Object.entries(compteur)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }, [transacs]);

    const kpis = [
        { label:'Affluence',       value:`${clients.length} clients`, icon:faUsers,         color:'#2563eb', bg:'#eff6ff', evo:'+8%'  },
        { label:'Recettes totales', value:`${totalCA.toLocaleString()} CFA`, icon:faMoneyBillWave, color:'#059669', bg:'#ecfdf5', evo:'+12%', highlight:true },
        { label:'Examens effectués',value:nbExamens,                   icon:faFlask,         color:'#d97706', bg:'#fffbeb', evo:'+5%'  },
        { label:'Recette moyenne',  value:`${moyenneVisite.toLocaleString()} CFA`, icon:faArrowTrendUp, color:'#7c3aed', bg:'#f5f3ff', evo:'+3%'  },
    ];

    return (
        <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", color:'#1e293b', padding:'0 0 32px' }}>

            {/* ── EN-TÊTE ── */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
                <div>
                    <h2 style={{ fontWeight:800, fontSize:26, margin:0, letterSpacing:'-0.5px' }}>
                        Rapport Médical
                    </h2>
                    <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:13 }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight:6, color:BLUE }} />
                        Période : <strong style={{ color:'#1e293b' }}>{filterMois}</strong>
                    </p>
                </div>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <select
                        value={filterMois}
                        onChange={e => setFilterMois(e.target.value)}
                        style={s.select}
                    >
                        <option value="Tous">Toute période</option>
                        {NOMS_MOIS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <button onClick={() => window.print()} style={s.printBtn}>
                        <FontAwesomeIcon icon={faFilePdf} style={{ marginRight:8 }} />
                        Imprimer
                    </button>
                </div>
            </div>

            {/* ── KPI CARDS ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
                {kpis.map((kpi, i) => (
                    <div key={i} style={{
                        ...s.kpiCard,
                        border: kpi.highlight ? `2px solid ${kpi.color}` : '1px solid #e2e8f0',
                        boxShadow: kpi.highlight ? `0 4px 20px ${kpi.color}22` : '0 2px 8px rgba(0,0,0,.05)',
                    }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                            <div style={{ ...s.kpiIcon, background:kpi.bg, color:kpi.color }}>
                                <FontAwesomeIcon icon={kpi.icon} />
                            </div>
                            <span style={{ fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:20, background:'#ecfdf5', color:'#059669' }}>
                                <FontAwesomeIcon icon={faArrowUp} style={{ marginRight:3, fontSize:9 }} />
                                {kpi.evo}
                            </span>
                        </div>
                        <p style={{ color:'#64748b', fontSize:11, textTransform:'uppercase', letterSpacing:'.5px', margin:'14px 0 4px', fontWeight:600 }}>
                            {kpi.label}
                        </p>
                        <p style={{ fontSize: kpi.highlight ? 22 : 20, fontWeight:800, margin:0, color: kpi.highlight ? kpi.color : '#0f172a', letterSpacing:'-0.5px' }}>
                            {kpi.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ── GRAPHIQUES LIGNE 1 ── */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>

                {/* Area chart recettes */}
                <div style={s.card}>
                    <div style={s.cardHead}>
                        <h6 style={s.cardTitle}>Recettes par jour de la semaine</h6>
                        <span style={s.liveTag}>● Live</span>
                    </div>
                    {donneesJours.some(d => d.recettes > 0) ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={donneesJours} margin={{ top:10, right:10, left:0, bottom:0 }}>
                                <defs>
                                    <linearGradient id="gRecettes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%"  stopColor={BLUE} stopOpacity={0.25}/>
                                        <stop offset="95%" stopColor={BLUE} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                <XAxis dataKey="jour" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                                <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}
                                       tickFormatter={v => v >= 1000 ? `${v/1000}k` : v}/>
                                <Tooltip content={<CustomTooltip/>}/>
                                <Area type="monotone" dataKey="recettes" name="recettes"
                                      stroke={BLUE} strokeWidth={2.5} fill="url(#gRecettes)"
                                      dot={{ fill:BLUE, r:4 }} activeDot={{ r:6 }}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : <EmptyState label="Aucune recette pour cette période"/>}
                </div>

                {/* Bar chart affluence */}
                <div style={s.card}>
                    <div style={s.cardHead}>
                        <h6 style={s.cardTitle}>Affluence / jour</h6>
                    </div>
                    {donneesJours.some(d => d.patients > 0) ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={donneesJours} margin={{ top:10, right:10, left:0, bottom:0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                                <XAxis dataKey="jour" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
                                <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false}/>
                                <Tooltip content={<CustomTooltip/>}/>
                                <Bar dataKey="patients" name="patients" fill={BLUE} radius={[6,6,0,0]} maxBarSize={32}/>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : <EmptyState label="Aucune donnée d'affluence"/>}
                </div>
            </div>

            {/* ── GRAPHIQUES LIGNE 2 ── */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>

                {/* Pie popularité */}
                <div style={s.card}>
                    <div style={s.cardHead}>
                        <h6 style={s.cardTitle}>Popularité des examens</h6>
                    </div>
                    {popularite.length > 0 ? (
                        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                            <ResponsiveContainer width="45%" height={180}>
                                <PieChart>
                                    <Pie data={popularite} cx="50%" cy="50%"
                                         innerRadius={42} outerRadius={72}
                                         dataKey="value" paddingAngle={3}>
                                        {popularite.map((_,i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                                    </Pie>
                                    <Tooltip formatter={v => [v, 'fois']}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ flex:1 }}>
                                {popularite.map((item, i) => (
                                    <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                                        <div style={{ width:10, height:10, borderRadius:'50%', background:COLORS[i%COLORS.length], flexShrink:0 }}/>
                                        <span style={{ fontSize:12, color:'#475569', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                            {item.name}
                                        </span>
                                        <span style={{ fontSize:12, fontWeight:700, color:'#0f172a' }}>{item.value}×</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <EmptyState label="Aucun examen enregistré"/>}
                </div>

                {/* Tableau récapitulatif */}
                <div style={s.card}>
                    <div style={s.cardHead}>
                        <h6 style={s.cardTitle}>Détail des activités</h6>
                        <span style={{ fontSize:11, color:'#94a3b8' }}>{transacs.length} enregistrements</span>
                    </div>
                    <div style={{ maxHeight:200, overflowY:'auto' }}>
                        {transacs.length > 0 ? (
                            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                                <thead>
                                <tr>
                                    {['Date','Patient','Montant'].map(h => (
                                        <th key={h} style={{ color:'#94a3b8', fontWeight:600, fontSize:10, textTransform:'uppercase', letterSpacing:'.5px', padding:'4px 8px', textAlign: h==='Montant'?'right':'left', borderBottom:'1px solid #f1f5f9' }}>{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {transacs.map((t, i) => (
                                    <tr key={i} style={{ borderBottom:'1px solid #f8fafc' }}>
                                        <td style={{ padding:'7px 8px', color:'#64748b', fontSize:11 }}>{t.date || 'N/A'}</td>
                                        <td style={{ padding:'7px 8px', fontWeight:600 }}>{t.name || '—'}</td>
                                        <td style={{ padding:'7px 8px', textAlign:'right', fontWeight:700, color:'#059669' }}>
                                            {(Number(t.montant)||0).toLocaleString()} FCFA
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : <EmptyState label="Aucune transaction pour cette période"/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Styles ──
const s = {
    kpiCard:  { background:'#ffffff', borderRadius:16, padding:'20px 20px 18px' },
    kpiIcon:  { width:40, height:40, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 },
    card:     { background:'#ffffff', borderRadius:16, padding:'20px 20px 16px', border:'1px solid #e2e8f0', boxShadow:'0 2px 8px rgba(0,0,0,.04)' },
    cardHead: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
    cardTitle:{ fontWeight:700, fontSize:13, margin:0, color:'#0f172a', letterSpacing:'-0.2px' },
    liveTag:  { fontSize:10, color:'#059669', fontWeight:700, background:'#ecfdf5', padding:'2px 8px', borderRadius:20 },
    select:   { padding:'8px 14px', borderRadius:10, border:'1px solid #e2e8f0', fontSize:13, color:'#1e293b', background:'#fff', cursor:'pointer', outline:'none' },
    printBtn: { padding:'8px 18px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#1d4ed8,#2563eb)', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 12px rgba(37,99,235,.3)' },
};

export default StatsDashboard;