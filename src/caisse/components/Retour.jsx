import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRotateLeft, faSearch, faTrash,
    faCheckCircle, faExclamationTriangle,
    faUser, faCalendar, faFlask
} from "@fortawesome/free-solid-svg-icons";

/* ── Styles inline (remplace Retour.css introuvable) ── */
const S = {
    root:        { padding:'1.5rem', maxWidth:900, margin:'0 auto' },
    header:      { display:'flex', alignItems:'center', gap:16, marginBottom:24 },
    headerIcon:  { width:48, height:48, borderRadius:12, background:'#fee2e2', color:'#dc2626', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 },
    title:       { margin:0, fontSize:20, fontWeight:800, color:'#111827' },
    subtitle:    { margin:'4px 0 0', fontSize:13, color:'#6b7280' },
    searchBar:   { display:'flex', alignItems:'center', gap:10, background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:10, padding:'10px 14px', marginBottom:20, boxShadow:'0 1px 3px rgba(0,0,0,0.05)' },
    searchIcon:  { color:'#9ca3af', fontSize:14, flexShrink:0 },
    searchInput: { border:'none', outline:'none', fontSize:14, color:'#111827', width:'100%', background:'transparent' },
    confirmPanel:{ background:'#fff', border:'1.5px solid #fbbf24', borderRadius:12, padding:20, marginBottom:20, boxShadow:'0 2px 8px rgba(251,191,36,0.15)' },
    confirmHead: { display:'flex', alignItems:'center', gap:8, fontWeight:700, color:'#92400e', fontSize:14, marginBottom:16, paddingBottom:12, borderBottom:'1px solid #fde68a' },
    infoGrid:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 },
    infoCell:    { display:'flex', flexDirection:'column', gap:3, background:'#fafafa', borderRadius:8, padding:'10px 12px' },
    infoKey:     { fontSize:11, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600 },
    infoVal:     { fontSize:14, fontWeight:700, color:'#111827' },
    motifLabel:  { display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 },
    motifInput:  { width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 12px', fontSize:13, color:'#111827', resize:'vertical', outline:'none', fontFamily:'inherit', boxSizing:'border-box' },
    btnRow:      { display:'flex', gap:10, justifyContent:'flex-end', marginTop:16 },
    btnCancel:   { padding:'10px 18px', border:'1.5px solid #e5e7eb', borderRadius:8, background:'#fff', color:'#6b7280', fontSize:13, fontWeight:600, cursor:'pointer' },
    btnValider:  { display:'flex', alignItems:'center', gap:8, padding:'10px 18px', border:'none', borderRadius:8, background:'#dc2626', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' },
    btnDisabled: { display:'flex', alignItems:'center', gap:8, padding:'10px 18px', border:'none', borderRadius:8, background:'#fca5a5', color:'#fff', fontSize:13, fontWeight:700, cursor:'not-allowed' },
    list:        { display:'flex', flexDirection:'column', gap:8 },
    item:        { display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:12, padding:'14px 16px', cursor:'pointer', transition:'all 0.15s' },
    itemSelected:{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff5f5', border:'1.5px solid #dc2626', borderRadius:12, padding:'14px 16px', cursor:'pointer', boxShadow:'0 2px 8px rgba(220,38,38,0.1)' },
    itemLeft:    { display:'flex', alignItems:'center', gap:12 },
    avatar:      { width:40, height:40, borderRadius:10, background:'#dbeafe', color:'#185FA5', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, flexShrink:0 },
    itemName:    { margin:0, fontWeight:700, color:'#111827', fontSize:14 },
    itemExam:    { margin:'2px 0 0', fontSize:12, color:'#6b7280', maxWidth:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
    itemRight:   { display:'flex', alignItems:'center', gap:12 },
    badgeGreen:  { padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700, background:'#d1fae5', color:'#065f46' },
    badgeOrange: { padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700, background:'#fef3c7', color:'#92400e' },
    itemMontant: { fontWeight:800, color:'#111827', fontSize:14, minWidth:100, textAlign:'right' },
    itemDate:    { fontSize:11, color:'#9ca3af', minWidth:90, textAlign:'right' },
    empty:       { textAlign:'center', padding:'48px 20px', color:'#9ca3af', fontSize:14, background:'#f9fafb', borderRadius:12, border:'1.5px dashed #e5e7eb' },
    annulees:    { marginTop:20, padding:'12px 16px', background:'#ecfdf5', border:'1px solid #6ee7b7', borderRadius:10 },
    annuleesTitle:{ margin:0, fontSize:13, fontWeight:600, color:'#065f46' },
};

const Retour = ({ journals = [], onAnnuler }) => {
    const [recherche,   setRecherche]   = useState('');
    const [selectId,    setSelectId]    = useState(null);
    const [motifRetour, setMotifRetour] = useState('');
    const [annulees,    setAnnulees]    = useState([]);

    // Filtre
    const filtered = journals.filter(t => {
        if (annulees.includes(t.id)) return false;
        if (!recherche.trim()) return true;
        const q = recherche.toLowerCase();
        return (
            t.name?.toLowerCase().includes(q) ||
            t.mode?.toLowerCase().includes(q) ||
            t.nameExam?.toLowerCase().includes(q)
        );
    });

    const transactionSelectionnee = journals.find(t => t.id === selectId);

    const handleAnnuler = () => {
        if (!transactionSelectionnee || !motifRetour.trim()) return;
        if (typeof onAnnuler === 'function') {
            onAnnuler({
                ...transactionSelectionnee,
                motifRetour,
                dateRetour: new Date().toLocaleString('fr-FR'),
            });
        }
        setAnnulees(prev => [...prev, selectId]);
        setSelectId(null);
        setMotifRetour('');
    };

    return (
        <div style={S.root}>

            {/* En-tête */}
            <div style={S.header}>
                <div style={S.headerIcon}>
                    <FontAwesomeIcon icon={faRotateLeft}/>
                </div>
                <div>
                    <h2 style={S.title}>Annulation de transaction</h2>
                    <p style={S.subtitle}>Sélectionnez une transaction validée pour l'annuler</p>
                </div>
            </div>

            {/* Barre de recherche */}
            <div style={S.searchBar}>
                <FontAwesomeIcon icon={faSearch} style={S.searchIcon}/>
                <input
                    type="text"
                    style={S.searchInput}
                    placeholder="Rechercher par nom, examen ou mode..."
                    value={recherche}
                    onChange={e => setRecherche(e.target.value)}
                />
            </div>

            {/* Panel de confirmation */}
            {selectId && transactionSelectionnee && (
                <div style={S.confirmPanel}>
                    <div style={S.confirmHead}>
                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                        Transaction sélectionnée pour annulation
                    </div>

                    <div style={S.infoGrid}>
                        <div style={S.infoCell}>
                            <span style={S.infoKey}>
                                <FontAwesomeIcon icon={faUser} style={{ marginRight:4 }}/>Patient
                            </span>
                            <span style={S.infoVal}>{transactionSelectionnee.name}</span>
                        </div>
                        <div style={S.infoCell}>
                            <span style={S.infoKey}>
                                <FontAwesomeIcon icon={faFlask} style={{ marginRight:4 }}/>Examen
                            </span>
                            <span style={S.infoVal}>{transactionSelectionnee.nameExam || '—'}</span>
                        </div>
                        <div style={S.infoCell}>
                            <span style={S.infoKey}>Montant</span>
                            <span style={{ ...S.infoVal, color:'#059669', fontSize:16 }}>
                                {Number(transactionSelectionnee.montant).toLocaleString('fr-FR')} FCFA
                            </span>
                        </div>
                        <div style={S.infoCell}>
                            <span style={S.infoKey}>
                                <FontAwesomeIcon icon={faCalendar} style={{ marginRight:4 }}/>Date
                            </span>
                            <span style={S.infoVal}>{transactionSelectionnee.date}</span>
                        </div>
                    </div>

                    <div>
                        <label style={S.motifLabel}>
                            Motif de l'annulation <span style={{ color:'#dc2626' }}>*</span>
                        </label>
                        <textarea
                            style={S.motifInput}
                            placeholder="Ex : Erreur de saisie, doublon, demande du patient..."
                            value={motifRetour}
                            onChange={e => setMotifRetour(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div style={S.btnRow}>
                        <button style={S.btnCancel}
                                onClick={() => { setSelectId(null); setMotifRetour(''); }}>
                            Annuler la sélection
                        </button>
                        <button
                            style={motifRetour.trim() ? S.btnValider : S.btnDisabled}
                            onClick={handleAnnuler}
                            disabled={!motifRetour.trim()}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                            Confirmer l'annulation
                        </button>
                    </div>
                </div>
            )}

            {/* Liste des transactions */}
            {filtered.length === 0 ? (
                <div style={S.empty}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize:32, opacity:0.3, display:'block', marginBottom:8 }}/>
                    {journals.length === 0
                        ? 'Aucune transaction dans le journal.'
                        : 'Aucune transaction ne correspond à votre recherche.'}
                </div>
            ) : (
                <div style={S.list}>
                    {filtered.map((t, i) => (
                        <div
                            key={t.id ?? i}
                            style={selectId === t.id ? S.itemSelected : S.item}
                            onClick={() => { setSelectId(t.id); setMotifRetour(''); }}
                        >
                            <div style={S.itemLeft}>
                                <div style={S.avatar}>
                                    {t.name?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div>
                                    <p style={S.itemName}>{t.name}</p>
                                    <p style={S.itemExam}>{t.nameExam || '—'}</p>
                                </div>
                            </div>
                            <div style={S.itemRight}>
                                <span style={t.mode === 'Espece' ? S.badgeGreen : S.badgeOrange}>
                                    {t.mode}
                                </span>
                                <span style={S.itemMontant}>
                                    {Number(t.montant).toLocaleString('fr-FR')} FCFA
                                </span>
                                <span style={S.itemDate}>{t.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Transactions annulées cette session */}
            {annulees.length > 0 && (
                <div style={S.annulees}>
                    <p style={S.annuleesTitle}>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight:6, color:'#059669' }}/>
                        {annulees.length} transaction{annulees.length > 1 ? 's' : ''} annulée{annulees.length > 1 ? 's' : ''} cette session
                    </p>
                </div>
            )}

        </div>
    );
};

export default Retour;