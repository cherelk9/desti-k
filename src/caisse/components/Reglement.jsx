import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle, faPrint, faTriangleExclamation,
    faUser, faCalendar, faFlask, faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const MODES_PAIEMENT = [
    { value: 'Espece', label: 'Espèces',     sub: 'Cash',         icon: '💵' },
    { value: 'OM',     label: 'Orange Money', sub: 'OM',           icon: '🟠' },
    { value: 'MOMO',   label: 'MTN MoMo',     sub: 'Mobile Money', icon: '🟡' },
];

const ReglementFacture = ({ dossier, onSaveTransaction }) => {
    const [modePaiement, setModePaiement] = useState('Espece');
    const [validated,    setValidated]    = useState(false);
    const [historique,   setHistorique]   = useState([]);
    const transactionRef = useRef(null);

    useEffect(() => {
        if (dossier) {
            setModePaiement('Espece');
            setValidated(false);
            transactionRef.current = null;
        }
    }, [dossier?.id]);

    // Normalisation
    const nomPatient = dossier?.name        || dossier?.patientName || '—';
    const montant    = Number(dossier?.montant ?? dossier?.total ?? 0);
    const examens    = dossier?.nameExam    || dossier?.examen      || '—';
    const ref        = dossier?.id ? String(dossier.id).slice(-6) : '—';
    const dateStr    = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const heureStr   = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const modeLabel  = MODES_PAIEMENT.find(m => m.value === modePaiement)?.label || modePaiement;

    const listeExamens = dossier?.detailsPanier?.length
        ? dossier.detailsPanier
        : examens !== '—'
            ? examens.split(',').map((e, i) => ({ uniqueId: i, name: e.trim(), montant: null }))
            : [];

    // ✅ SOLUTION DÉFINITIVE : générer le HTML du reçu et l'imprimer dans une nouvelle fenêtre
    const imprimerRecu = (transaction, modeLabelVal) => {
        const lignesExamens = listeExamens.length > 0
            ? listeExamens.map((ex, i) => `
                <tr style="background:${i % 2 === 0 ? '#fff' : '#f9fafb'}; border-bottom:1px solid #e5e7eb;">
                    <td style="padding:10px 14px; font-size:13px; color:#374151;">
                        <span style="color:#185FA5; margin-right:6px;">•</span>${ex.name}
                    </td>
                    <td style="padding:10px 14px; font-size:13px; text-align:right; color:#374151;">
                        ${ex.montant != null ? `${Number(ex.montant).toLocaleString('fr-FR')} FCFA` : '—'}
                    </td>
                </tr>`).join('')
            : `<tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:10px 14px; font-size:13px; color:#374151;">
                    <span style="color:#185FA5; margin-right:6px;">•</span>Analyses médicales
                </td>
                <td style="padding:10px 14px; font-size:13px; text-align:right; color:#374151;">
                    ${montant.toLocaleString('fr-FR')} FCFA
                </td>
               </tr>`;

        const qrContenu = encodeURIComponent([
            `LABORATOIRE DESTI-K`, `Ref: #${ref}`, `Patient: ${nomPatient}`,
            `Date: ${dateStr}`, `Mode: ${modeLabelVal}`,
            `TOTAL: ${montant.toLocaleString('fr-FR')} FCFA`, `Statut: PAYE`
        ].join(' | '));
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&margin=4&data=${qrContenu}`;

        const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"/>
    <title>Reçu #${ref} — ${nomPatient}</title>
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: Arial, sans-serif; background: #fff; }
        @media print {
            @page { margin: 0; size: A4; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>

<!-- EN-TÊTE -->
<div style="background:linear-gradient(135deg,#185FA5,#1a7fd4); padding:24px 32px; display:flex; justify-content:space-between; align-items:center;">
    <div style="display:flex; align-items:center; gap:14px;">
        <div style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-weight:900; color:#fff; font-size:18px; border:2px solid rgba(255,255,255,0.5);">DK</div>
        <div>
            <div style="color:#fff; font-size:22px; font-weight:900;">LABORATOIRE DESTI-K</div>
            <div style="color:rgba(255,255,255,0.8); font-size:12px;">Analyses médicales — Biologie clinique</div>
        </div>
    </div>
    <div style="text-align:right;">
        <div style="color:rgba(255,255,255,0.7); font-size:11px; text-transform:uppercase; letter-spacing:1px;">REÇU N°</div>
        <div style="color:#fff; font-size:24px; font-weight:900;">#${ref}</div>
    </div>
</div>

<!-- BANDE -->
<div style="height:4px; background:linear-gradient(90deg,#185FA5,#1a7fd4,#185FA5);"></div>

<!-- TITRE -->
<div style="display:flex; justify-content:space-between; align-items:center; padding:16px 32px; border-bottom:1px solid #e5e7eb;">
    <span style="font-size:18px; font-weight:900; color:#111827; letter-spacing:1px;">REÇU DE PAIEMENT</span>
    <span style="background:#d1fae5; color:#065f46; border:1.5px solid #6ee7b7; border-radius:20px; padding:4px 14px; font-size:13px; font-weight:700;">✓ PAYÉ</span>
</div>

<!-- INFOS -->
<div style="display:grid; grid-template-columns:1fr 1fr; padding:20px 32px; border-bottom:1px solid #e5e7eb;">
    <div style="padding-right:24px;">
        <div style="font-size:10px; color:#185FA5; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:10px;">INFORMATIONS PATIENT</div>
        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <td style="color:#6b7280; font-size:12px; padding:5px 0; width:45%;">Nom complet</td>
                <td style="font-weight:700; color:#111827; font-size:13px;">${nomPatient}</td>
            </tr>
            <tr>
                <td style="color:#6b7280; font-size:12px; padding:5px 0;">Référence dossier</td>
                <td style="font-weight:700; color:#111827; font-size:13px;">#${ref}</td>
            </tr>
        </table>
    </div>
    <div style="border-left:1px solid #e5e7eb; padding-left:24px;">
        <div style="font-size:10px; color:#185FA5; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:10px;">INFORMATIONS PAIEMENT</div>
        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <td style="color:#6b7280; font-size:12px; padding:5px 0; width:40%;">Date</td>
                <td style="font-weight:700; color:#111827; font-size:13px;">${dateStr}</td>
            </tr>
            <tr>
                <td style="color:#6b7280; font-size:12px; padding:5px 0;">Heure</td>
                <td style="font-weight:700; color:#111827; font-size:13px;">${heureStr}</td>
            </tr>
            <tr>
                <td style="color:#6b7280; font-size:12px; padding:5px 0;">Mode</td>
                <td style="font-weight:700; color:#185FA5; font-size:13px;">${modeLabelVal}</td>
            </tr>
        </table>
    </div>
</div>

<!-- TABLEAU PRESTATIONS -->
<div style="padding:20px 32px;">
    <table style="width:100%; border-collapse:collapse;">
        <thead>
            <tr style="background:#185FA5;">
                <th style="padding:10px 14px; color:#fff; font-size:11px; text-transform:uppercase; letter-spacing:1px; text-align:left; font-weight:700;">DÉSIGNATION / PRESTATION</th>
                <th style="padding:10px 14px; color:#fff; font-size:11px; text-transform:uppercase; text-align:right; font-weight:700;">MONTANT</th>
            </tr>
        </thead>
        <tbody>
            ${lignesExamens}
        </tbody>
        <tfoot>
            <tr style="background:#185FA5;">
                <td style="padding:12px 14px; color:#fff; font-weight:900; font-size:14px; text-transform:uppercase;">TOTAL PAYÉ</td>
                <td style="padding:12px 14px; color:#fff; font-weight:900; font-size:16px; text-align:right;">${montant.toLocaleString('fr-FR')} FCFA</td>
            </tr>
        </tfoot>
    </table>
</div>

<!-- PIED DE PAGE -->
<div style="display:flex; justify-content:space-between; align-items:flex-end; padding:16px 32px 24px; border-top:2px solid #185FA5; margin-top:8px;">
    <div style="max-width:65%;">
        <p style="font-weight:700; color:#111827; margin-bottom:4px; font-size:13px;">Ce reçu certifie le paiement intégral</p>
        <p style="color:#6b7280; font-size:11px; margin-bottom:8px; line-height:1.6;">
            des prestations d'analyses médicales effectuées au Laboratoire Desti-K.<br/>
            Conservez ce document comme justificatif de paiement.
        </p>
        <p style="color:#9ca3af; font-size:10px;">© 2026 Laboratoire Desti-K — Tous droits réservés</p>
    </div>
    <div style="text-align:center;">
        <img src="${qrUrl}" alt="QR Code" style="width:90px; height:90px;" onload="window.print()"/>
        <p style="font-size:9px; color:#9ca3af; margin-top:4px;">Scannez pour vérifier</p>
    </div>
</div>

</body>
</html>`;

        // ✅ Ouvrir dans une nouvelle fenêtre propre sans CSS parasite
        const fenetre = window.open('', '_blank', 'width=800,height=900');
        fenetre.document.write(html);
        fenetre.document.close();
        // L'impression se déclenche via onload du QR code ci-dessus
    };

    const handleValider = () => {
        if (validated) return;

        const modeLabelVal = MODES_PAIEMENT.find(m => m.value === modePaiement)?.label || modePaiement;

        transactionRef.current = {
            id:      Date.now(),
            name:    nomPatient,
            montant: montant,
            mode:    modePaiement,
            date:    `${dateStr} ${heureStr}`,
            ref:     ref,
        };

        setHistorique(prev => [transactionRef.current, ...prev].slice(0, 5));
        setValidated(true);

        // ✅ Imprimer dans nouvelle fenêtre puis notifier le parent
        imprimerRecu(transactionRef.current, modeLabelVal);

        // Notifier le parent après un délai
        setTimeout(() => {
            if (typeof onSaveTransaction === 'function') {
                onSaveTransaction(transactionRef.current);
            }
        }, 1500);
    };

    // Écran vide
    if (!dossier) {
        return (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'3rem', textAlign:'center', color:'#6b7280' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🧾</div>
                <p style={{ fontSize:18, fontWeight:600, marginBottom:8 }}>Aucun dossier à régler</p>
                <p style={{ fontSize:14, maxWidth:360 }}>
                    Allez dans <strong>Factures en attente</strong> et cliquez sur <strong>Régler</strong>.
                </p>
                {historique.length > 0 && (
                    <div style={{ marginTop:24, width:'100%', maxWidth:480, background:'#f9fafb', borderRadius:12, padding:16, border:'1px solid #e5e7eb' }}>
                        <p style={{ fontWeight:600, color:'#374151', marginBottom:8 }}>
                            <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginRight:6 }}/>
                            Derniers règlements
                        </p>
                        {historique.map(t => (
                            <div key={t.id} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid #e5e7eb' }}>
                                <div>
                                    <span style={{ fontWeight:600, color:'#111827' }}>{t.name}</span>
                                    <span style={{ fontSize:12, color:'#9ca3af', marginLeft:8 }}>{t.date}</span>
                                </div>
                                <span style={{ fontWeight:700, color:'#059669' }}>{Number(t.montant).toLocaleString('fr-FR')} FCFA</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {/* Alerte */}
            {!validated && (
                <div style={{ background:'#fef3c7', border:'1px solid #f59e0b', borderRadius:10, padding:'12px 16px', display:'flex', alignItems:'center', gap:12, marginBottom:20, color:'#92400e' }}>
                    <FontAwesomeIcon icon={faTriangleExclamation}/>
                    <div>
                        <strong>Règlement en attente</strong> — Dossier de{' '}
                        <strong>{nomPatient}</strong> : {montant.toLocaleString('fr-FR')} FCFA
                    </div>
                </div>
            )}

            {/* Résumé dossier */}
            <div style={{ background:'#fff', borderRadius:12, padding:20, border:'1px solid #e5e7eb', marginBottom:16, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                    <span style={{ background:'#185FA5', color:'#fff', borderRadius:'50%', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>1</span>
                    <div>
                        <p style={{ margin:0, fontWeight:700, color:'#111827' }}>Résumé du dossier</p>
                        <p style={{ margin:0, fontSize:12, color:'#6b7280' }}>Vérifiez les informations avant de valider</p>
                    </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {[
                        { label:'Patient',       value:nomPatient,                                icon:faUser },
                        { label:'Date',          value:dateStr,                                   icon:faCalendar },
                        { label:'Référence',     value:`#${ref}` },
                        { label:'Montant total', value:`${montant.toLocaleString('fr-FR')} FCFA`, highlight:true },
                    ].map((m, i) => (
                        <div key={i} style={{ background:'#f9fafb', borderRadius:8, padding:'10px 14px' }}>
                            <p style={{ margin:0, fontSize:11, color:'#6b7280', textTransform:'uppercase' }}>
                                {m.icon && <FontAwesomeIcon icon={m.icon} style={{ marginRight:4 }}/>}{m.label}
                            </p>
                            <p style={{ margin:0, fontWeight:700, color:m.highlight?'#059669':'#111827', fontSize:m.highlight?16:14 }}>
                                {m.value}
                            </p>
                        </div>
                    ))}
                </div>

                {listeExamens.length > 0 && (
                    <div style={{ marginTop:14 }}>
                        <p style={{ fontSize:13, fontWeight:600, color:'#374151', marginBottom:8 }}>
                            <FontAwesomeIcon icon={faFlask} style={{ marginRight:6 }}/>Examens prescrits
                        </p>
                        {listeExamens.map((ex, i) => (
                            <div key={ex.uniqueId ?? i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 10px', background:'#f0fdf4', borderRadius:6, marginBottom:4 }}>
                                <span style={{ color:'#166534', fontSize:13 }}>{ex.name}</span>
                                {ex.montant != null && (
                                    <span style={{ fontWeight:700, color:'#166534', fontSize:13 }}>
                                        {Number(ex.montant).toLocaleString('fr-FR')} FCFA
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mode paiement */}
            <div style={{ background:'#fff', borderRadius:12, padding:20, border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                    <span style={{ background:'#185FA5', color:'#fff', borderRadius:'50%', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>2</span>
                    <div>
                        <p style={{ margin:0, fontWeight:700, color:'#111827' }}>Mode de paiement</p>
                        <p style={{ margin:0, fontSize:12, color:'#6b7280' }}>Sélectionnez comment le patient règle</p>
                    </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
                    {MODES_PAIEMENT.map(mode => (
                        <button key={mode.value}
                                onClick={() => !validated && setModePaiement(mode.value)}
                                disabled={validated}
                                style={{ padding:'14px 10px', border:'2px solid', borderColor:modePaiement===mode.value?'#185FA5':'#e5e7eb', borderRadius:10, background:modePaiement===mode.value?'#eff6ff':'#fff', cursor:validated?'not-allowed':'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:4, transition:'all .15s' }}>
                            <span style={{ fontSize:24 }}>{mode.icon}</span>
                            <span style={{ fontWeight:700, fontSize:13, color:'#111827' }}>{mode.label}</span>
                            <span style={{ fontSize:11, color:'#6b7280' }}>{mode.sub}</span>
                        </button>
                    ))}
                </div>

                <button onClick={handleValider} disabled={validated}
                        style={{ width:'100%', padding:'14px', background:validated?'#d1fae5':'#185FA5', color:validated?'#065f46':'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:700, cursor:validated?'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <FontAwesomeIcon icon={validated ? faCheckCircle : faPrint}/>
                    {validated ? `✓ Paiement de ${nomPatient} enregistré` : 'Valider et imprimer le reçu'}
                </button>
            </div>
        </div>
    );
};

export default ReglementFacture;