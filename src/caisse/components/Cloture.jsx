import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock, faCheckCircle, faCoins,
    faMobileAlt, faMoneyBillWave, faChartBar,
    faExclamationTriangle, faPrint
} from "@fortawesome/free-solid-svg-icons";
import './style/Cloture.css';

const Cloture = ({ journals = [], attentes = [], onCloture }) => {
    const [confirmed, setConfirmed]   = useState(false);
    const [clotured,  setClotured]    = useState(false);
    const [motif,     setMotif]       = useState('');

    const totalEspece = journals
        .filter(t => t.mode === 'Espece')
        .reduce((s, t) => s + Number(t.montant), 0);

    const totalOM = journals
        .filter(t => t.mode === 'OM')
        .reduce((s, t) => s + Number(t.montant), 0);

    const totalMOMO = journals
        .filter(t => t.mode === 'MOMO')
        .reduce((s, t) => s + Number(t.montant), 0);

    const totalMobile  = totalOM + totalMOMO;
    const totalJournee = totalEspece + totalMobile;
    const nbTransactions = journals.length;
    const nbAttentes     = attentes.length;

    const dateStr = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const heureStr = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit'
    });

    const handleCloture = () => {
        const rapport = {
            id:            Date.now(),
            date:          dateStr,
            heure:         heureStr,
            totalEspece,
            totalOM,
            totalMOMO,
            totalMobile,
            totalJournee,
            nbTransactions,
            nbAttentes,
            motif,
        };
        if (typeof onCloture === 'function') onCloture(rapport);
        setClotured(true);
        setTimeout(() => window.print(), 600);
    };

    if (clotured) {
        return (
            <div className="clt-root">
                <div className="clt-success-card">
                    <div className="clt-success-icon">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <h2 className="clt-success-title">Caisse clôturée</h2>
                    <p className="clt-success-sub">
                        La journée du <strong>{dateStr}</strong> a été clôturée à <strong>{heureStr}</strong>.
                    </p>
                    <div className="clt-success-total">
                        {totalJournee.toLocaleString('fr-FR')} FCFA encaissés
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="clt-root">

            {/* ── En-tête ── */}
            <div className="clt-header">
                <div className="clt-header-left">
                    <div className="clt-header-icon">
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                    <div>
                        <h2 className="clt-title">Clôture de caisse</h2>
                        <p className="clt-subtitle">{dateStr} — {heureStr}</p>
                    </div>
                </div>
            </div>

            {/* ── Alerte si attentes non réglées ── */}
            {nbAttentes > 0 && (
                <div className="clt-warning">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span>
                        <strong>{nbAttentes} facture{nbAttentes > 1 ? 's' : ''} en attente</strong> non réglée{nbAttentes > 1 ? 's' : ''}.
                        Il est conseillé de les régler avant la clôture.
                    </span>
                </div>
            )}

            {/* ── Résumé financier ── */}
            <div className="clt-section-title">
                <FontAwesomeIcon icon={faChartBar} style={{ marginRight: 8 }} />
                Résumé de la journée
            </div>

            <div className="clt-metrics-grid">
                <div className="clt-metric clt-metric-green">
                    <div className="clt-metric-icon">
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                    </div>
                    <div>
                        <p className="clt-metric-label">Espèces</p>
                        <p className="clt-metric-value">
                            {totalEspece.toLocaleString('fr-FR')} FCFA
                        </p>
                    </div>
                </div>

                <div className="clt-metric clt-metric-orange">
                    <div className="clt-metric-icon">
                        <FontAwesomeIcon icon={faMobileAlt} />
                    </div>
                    <div>
                        <p className="clt-metric-label">Mobile (OM + MoMo)</p>
                        <p className="clt-metric-value">
                            {totalMobile.toLocaleString('fr-FR')} FCFA
                        </p>
                        <p className="clt-metric-detail">
                            OM : {totalOM.toLocaleString('fr-FR')} —
                            MoMo : {totalMOMO.toLocaleString('fr-FR')}
                        </p>
                    </div>
                </div>

                <div className="clt-metric clt-metric-blue clt-metric-total">
                    <div className="clt-metric-icon">
                        <FontAwesomeIcon icon={faCoins} />
                    </div>
                    <div>
                        <p className="clt-metric-label">Total journée</p>
                        <p className="clt-metric-value clt-big">
                            {totalJournee.toLocaleString('fr-FR')} FCFA
                        </p>
                        <p className="clt-metric-detail">
                            {nbTransactions} transaction{nbTransactions > 1 ? 's' : ''} validée{nbTransactions > 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Tableau des transactions ── */}
            {journals.length > 0 && (
                <div className="clt-table-wrap">
                    <table className="clt-table">
                        <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Examen</th>
                            <th>Mode</th>
                            <th style={{ textAlign: 'right' }}>Montant</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {journals.map((t, i) => (
                            <tr key={t.id ?? i}>
                                <td>{t.name}</td>
                                <td className="clt-td-muted">{t.nameExam || '—'}</td>
                                <td>
                                        <span className={`clt-badge-mode ${t.mode === 'Espece' ? 'green' : 'orange'}`}>
                                            {t.mode}
                                        </span>
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 600 }}>
                                    {Number(t.montant).toLocaleString('fr-FR')} FCFA
                                </td>
                                <td className="clt-td-muted">{t.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {journals.length === 0 && (
                <div className="clt-empty">
                    Aucune transaction enregistrée pour cette journée.
                </div>
            )}

            {/* ── Motif (optionnel) ── */}
            <div className="clt-motif-block">
                <label className="clt-motif-label">
                    Observations / motif de clôture <span>(optionnel)</span>
                </label>
                <textarea
                    className="clt-motif-input"
                    placeholder="Ex : Fin de journée normale, tout réglé..."
                    value={motif}
                    onChange={e => setMotif(e.target.value)}
                    rows={3}
                />
            </div>

            {/* ── Confirmation ── */}
            {!confirmed ? (
                <button className="clt-btn-confirm" onClick={() => setConfirmed(true)}>
                    <FontAwesomeIcon icon={faLock} />
                    Procéder à la clôture de caisse
                </button>
            ) : (
                <div className="clt-confirm-zone">
                    <div className="clt-confirm-alert">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <span>
                            Confirmez-vous la clôture ? Cette action va verrouiller
                            la journée et générer le rapport d'impression.
                        </span>
                    </div>
                    <div className="clt-confirm-btns">
                        <button
                            className="clt-btn-cancel"
                            onClick={() => setConfirmed(false)}
                        >
                            Annuler
                        </button>
                        <button
                            className="clt-btn-valider"
                            onClick={handleCloture}
                        >
                            <FontAwesomeIcon icon={faPrint} />
                            Confirmer et imprimer
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Cloture;