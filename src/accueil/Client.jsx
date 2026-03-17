import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faFilePrescription, faPhone, faMap,
    faBusinessTime, faHospitalSymbol, faEyeDropper,
    faUsers, faCheckCircle, faTimes, faHeartbeat
} from "@fortawesome/free-solid-svg-icons";
import { usePatients } from "./components/PatientContext";

const Field = ({ label, children, required }) => (
    <div style={{ marginBottom: 0 }}>
        <label style={{
            display: 'block', fontSize: 10, fontWeight: 700,
            color: '#64748b', textTransform: 'uppercase',
            letterSpacing: '0.8px', marginBottom: 6,
        }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
        {children}
    </div>
);

const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: 10,
    fontSize: 13, color: '#1e293b', background: '#f8fafc',
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color .2s, box-shadow .2s',
};

const SectionCard = ({ icon, iconColor, iconBg, title, children }) => (
    <div style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    }}>
        <div style={{
            padding: '16px 24px', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', gap: 12,
        }}>
            <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: iconBg, color: iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, flexShrink: 0,
            }}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <h5 style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{title}</h5>
        </div>
        <div style={{ padding: '20px 24px' }}>
            {children}
        </div>
    </div>
);

const INIT = {
    nom: '', dateNaissance: '', sexe: 'Male', adresse: '', contact: '', profession: '',
    medecinPrescripteur: '', motif: '',
    pathologie: '', allergies: '',
    examens: '', typePrelevement: 'Sang', aJeun: false, preleveur: '', observations: '',
    urgenceRelation: 'FAMILLE', urgenceNom: '', urgenceContact: '', urgenceEmail: '', urgenceAdresse: '',
};

const Client = ({ onSuccess }) => {
    const { ajouterPatient } = usePatients();
    const [form,    setForm]    = useState(INIT);
    const [errors,  setErrors]  = useState({});
    const [success, setSuccess] = useState(false);

    const set = (k, v) => {
        setForm(f => ({ ...f, [k]: v }));
        if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.nom.trim())     e.nom     = 'Nom requis';
        if (!form.contact.trim()) e.contact = 'Contact requis';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (!validate()) return;

        ajouterPatient({
            nom:                  form.nom,
            dateNaissance:        form.dateNaissance,
            sexe:                 form.sexe,
            adresse:              form.adresse,
            contact:              form.contact,
            profession:           form.profession,
            medecinPrescripteur:  form.medecinPrescripteur,
            motif:                form.motif,
            pathologie:           form.pathologie,
            allergies:            form.allergies,
            examens:              form.examens,
            typePrelevement:      form.typePrelevement,
            aJeun:                form.aJeun,
            preleveur:            form.preleveur,
            observations:         form.observations,
            urgenceRelation:      form.urgenceRelation,
            urgenceNom:           form.urgenceNom,
            urgenceContact:       form.urgenceContact,
            urgenceEmail:         form.urgenceEmail,
            urgenceAdresse:       form.urgenceAdresse,
            statut:               'Actif',
        });

        setSuccess(true);
        setForm(INIT);
        setTimeout(() => {
            setSuccess(false);
            if (typeof onSuccess === 'function') onSuccess();
        }, 2000);
    };

    const inp = (key, placeholder, type = 'text', extra = {}) => (
        <input
            type={type}
            placeholder={placeholder}
            value={form[key]}
            onChange={e => set(key, e.target.value)}
            style={{
                ...inputStyle,
                borderColor: errors[key] ? '#ef4444' : '#e2e8f0',
                boxShadow: errors[key] ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                ...extra,
            }}
            onFocus={e => { e.target.style.borderColor = '#185FA5'; e.target.style.boxShadow = '0 0 0 3px rgba(24,95,165,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = errors[key] ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = errors[key] ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'; }}
        />
    );

    const sel = (key, options) => (
        <select value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle}>
            {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
    );

    if (success) return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '80px 20px', textAlign: 'center',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg,#059669,#10b981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, color: '#fff', marginBottom: 24,
                boxShadow: '0 8px 32px rgba(5,150,105,0.3)',
                animation: 'popIn .4s cubic-bezier(.175,.885,.32,1.275)',
            }}>
                <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h3 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Patient enregistré !</h3>
            <p style={{ color: '#64748b', fontSize: 14 }}>Les informations ont été ajoutées à la liste des patients.</p>
            <style>{`@keyframes popIn { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }`}</style>
        </div>
    );

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 0 40px' }}>

            {/* En-tête */}
            <div style={{
                background: 'linear-gradient(135deg, #185FA5 0%, #1a7fd4 100%)',
                borderRadius: 20, padding: '28px 32px', marginBottom: 28,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 8px 32px rgba(24,95,165,0.25)',
            }}>
                <div>
                    <h2 style={{ margin: 0, color: '#fff', fontWeight: 900, fontSize: 22, letterSpacing: '-0.3px' }}>
                        <FontAwesomeIcon icon={faHeartbeat} style={{ marginRight: 10 }}/>
                        Admission & Renseignement clinique
                    </h2>
                    <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                        Enregistrement des données patient — Laboratoire Desti-K
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Date</p>
                    <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: 14 }}>
                        {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

                    {/* Section 1 — État civil */}
                    <SectionCard icon={faUser} iconColor="#185FA5" iconBg="#eff6ff" title="1. État Civil & Coordonnées">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <Field label="Nom complet" required>
                                    {inp('nom', 'Nom et Prénom...')}
                                    {errors.nom && <span style={{ fontSize: 11, color: '#ef4444', marginTop: 4, display: 'block' }}>{errors.nom}</span>}
                                </Field>
                            </div>
                            <Field label="Date de naissance">{inp('dateNaissance', '', 'date')}</Field>
                            <Field label="Sexe">{sel('sexe', ['Male', 'Female', 'Autre'])}</Field>
                            <Field label="Contact" required>
                                {inp('contact', '+237...', 'tel')}
                                {errors.contact && <span style={{ fontSize: 11, color: '#ef4444', marginTop: 4, display: 'block' }}>{errors.contact}</span>}
                            </Field>
                            <Field label="Profession">{inp('profession', 'Profession...')}</Field>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <Field label="Adresse">{inp('adresse', 'Ville, quartier...')}</Field>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Colonne droite : Prescriptions + Antécédents */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <SectionCard icon={faFilePrescription} iconColor="#059669" iconBg="#ecfdf5" title="2. Prescriptions">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <Field label="Médecin prescripteur">{inp('medecinPrescripteur', 'Dr. Nom Complet...')}</Field>
                                <Field label="Motif / Symptômes">
                                    <textarea
                                        placeholder="Symptômes, raison de la visite..."
                                        value={form.motif}
                                        onChange={e => set('motif', e.target.value)}
                                        rows={3}
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
                                        onFocus={e => { e.target.style.borderColor = '#185FA5'; e.target.style.boxShadow = '0 0 0 3px rgba(24,95,165,0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </Field>
                            </div>
                        </SectionCard>

                        <SectionCard icon={faHospitalSymbol} iconColor="#dc2626" iconBg="#fef2f2" title="3. Antécédents">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <Field label="Pathologies">{inp('pathologie', 'HTA, Diabète...')}</Field>
                                <Field label="Allergies">
                                    <input
                                        type="text"
                                        placeholder="AUCUNE"
                                        value={form.allergies}
                                        onChange={e => set('allergies', e.target.value)}
                                        style={{
                                            ...inputStyle,
                                            borderColor: '#fecaca', background: '#fff5f5',
                                            color: '#dc2626',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#fecaca'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </Field>
                            </div>
                        </SectionCard>
                    </div>
                </div>

                {/* Section 4 — Prélèvement */}
                <div style={{ marginBottom: 20 }}>
                    <SectionCard icon={faEyeDropper} iconColor="#7c3aed" iconBg="#f5f3ff" title="4. Détails du prélèvement">
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
                            <Field label="Examens demandés">{inp('examens', 'NFS, Widal, etc...')}</Field>
                            <Field label="Type de prélèvement">{sel('typePrelevement', ['Sang', 'Urine', 'Selles', 'Autres'])}</Field>
                            <Field label="&nbsp;">
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '10px 14px', background: '#fefce8',
                                    border: '1.5px solid #fde68a', borderRadius: 10, cursor: 'pointer',
                                    height: 42, boxSizing: 'border-box',
                                }} onClick={() => set('aJeun', !form.aJeun)}>
                                    <div style={{
                                        width: 18, height: 18, borderRadius: 5,
                                        background: form.aJeun ? '#d97706' : '#fff',
                                        border: `2px solid ${form.aJeun ? '#d97706' : '#d1d5db'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0, transition: 'all .15s',
                                    }}>
                                        {form.aJeun && <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 10, color: '#fff' }}/>}
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#92400e' }}>À JEUN</span>
                                </div>
                            </Field>
                            <Field label="Préleveur">{inp('preleveur', 'Nom du préleveur...')}</Field>
                            <div style={{ gridColumn: '2 / -1' }}>
                                <Field label="Observations">
                                    <textarea
                                        placeholder="Observations particulières..."
                                        value={form.observations}
                                        onChange={e => set('observations', e.target.value)}
                                        rows={2}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        onFocus={e => { e.target.style.borderColor = '#185FA5'; e.target.style.boxShadow = '0 0 0 3px rgba(24,95,165,0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </Field>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                {/* Section 5 — Urgence */}
                <div style={{ marginBottom: 28 }}>
                    <SectionCard icon={faUsers} iconColor="#0891b2" iconBg="#ecfeff" title="5. Personne à contacter en cas d'urgence">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                            <Field label="Relation">
                                {sel('urgenceRelation', ['FEMME / MARIÉ', 'FAMILLE', 'COMPAGNE', 'AMI(E)', 'COLLÈGUE', 'AUTRES'])}
                            </Field>
                            <Field label="Nom complet">{inp('urgenceNom', 'Nom complet...')}</Field>
                            <Field label="Contact">{inp('urgenceContact', '+237...', 'tel')}</Field>
                            <Field label="Email">{inp('urgenceEmail', 'email@...', 'email')}</Field>
                            <div style={{ gridColumn: '2 / -1' }}>
                                <Field label="Adresse">{inp('urgenceAdresse', 'Ville, quartier...')}</Field>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                {/* Boutons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setForm(INIT)}
                            style={{
                                padding: '12px 28px', border: '1.5px solid #e2e8f0',
                                borderRadius: 12, background: '#fff', color: '#64748b',
                                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                        <FontAwesomeIcon icon={faTimes}/>
                        Réinitialiser
                    </button>
                    <button type="submit"
                            style={{
                                padding: '12px 32px', border: 'none',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #185FA5, #1a7fd4)',
                                color: '#fff', fontSize: 14, fontWeight: 700,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                                boxShadow: '0 4px 16px rgba(24,95,165,0.35)',
                                transition: 'opacity .2s',
                            }}
                            onMouseOver={e => e.currentTarget.style.opacity = '.88'}
                            onMouseOut={e  => e.currentTarget.style.opacity = '1'}
                    >
                        <FontAwesomeIcon icon={faCheckCircle}/>
                        Enregistrer le patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Client;