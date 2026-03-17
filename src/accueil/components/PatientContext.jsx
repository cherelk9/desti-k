import { createContext, useContext, useState } from "react";

const PatientContext = createContext(null);

export const usePatients = () => {
    const ctx = useContext(PatientContext);
    if (!ctx) throw new Error("usePatients must be used inside PatientProvider");
    return ctx;
};

export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);

    const ajouterPatient = (patient) => {
        const nouveau = {
            ...patient,
            id:          Date.now(),
            dateCreation: new Date().toISOString(),
        };
        setPatients(prev => [nouveau, ...prev]);
        return nouveau;
    };

    const supprimerPatient = (id) => {
        setPatients(prev => prev.filter(p => p.id !== id));
    };

    const modifierPatient = (id, data) => {
        setPatients(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    };

    return (
        <PatientContext.Provider value={{ patients, ajouterPatient, supprimerPatient, modifierPatient }}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientContext;