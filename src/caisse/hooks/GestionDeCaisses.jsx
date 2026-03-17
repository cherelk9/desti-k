import {useState} from "react";
import Enregistrement from "../components/EnregistrementCaisse";
import FactureEnAttente from "../FacturesEnAttente";
import JournalDeCaisse from "../components/JournalDeCaisse";
import ModalReglement from "./ModalReglement";

const GestionDeCaisses = ({searchTerm}) => {
    const [attentes, setAttentes] = useState([]);
    const [journals, setJournals] = useState([]);

    const [factureSelectionner, setFactureSelectionner] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // logique de flux
    //1. ajouter a la liste d'attente (depuis enregistrement)
    const ajouterEnAttente = (nouveauDossier) => {

        const dossierNormalise = {
            ...nouveauDossier,
            id: String(nouveauDossier.id),
            name: nouveauDossier.name,
            nameExam: nouveauDossier.nameExam,
            montant: nouveauDossier.montant,
            date: new Date().toLocaleDateString(),
            mode: 'en attente',
        }

        setAttentes(prev=>[...prev, dossierNormalise]);
        alert("Dossier envoye en attente de reglement !")
    }

    //ouvrir la modale de choix de paiement
    const ouvrirModalReglement = (id) =>{
        const facture  = attentes.find(f=>f.id === id);
        if (facture){
            setFactureSelectionner(facture);
            setShowModal(true);
        }
    }

    //3. finaliser le paiement appele par la modale
    const finaliserPaiement = (modeChoisi) =>{
        if (factureSelectionner){
            reglerFacture(factureSelectionner.id, modeChoisi);
            setShowModal(false);
            setFactureSelectionner(null);
        }
    }

    const reglerFacture = (id, modePaiement) => {
        const factureRegler = attentes.find((f)=>f.id === id);
        if (factureRegler) {
            const facturePayer = {
                ...factureRegler,
                mode: modePaiement,
                status: 'Paye',
                date: `${factureRegler.date}-${new Date().toLocaleDateString()}`,
            }

            setJournals(prev=>[...prev, facturePayer]);
            setAttentes(prev=>prev.filter(f=>f.id!==id));
            alert(`Paiement valide ! ${factureRegler.montant} FCFA enregistre`)
        }
    }

    return (
        <div className="container-fluid py-4">
            <Enregistrement
                onPasserAuReglement={ajouterEnAttente}/>
            <hr className="my-4" />
            <FactureEnAttente
                list={attentes}
                onRegler={ouvrirModalReglement}/>

            <hr className="my-4" />

            <JournalDeCaisse transaction={journals}
                    searchTerm={searchTerm}
            />

            <ModalReglement
                show={showModal}
                montant={factureSelectionner ? factureSelectionner.montant :  0}
                onClose={() => setShowModal(false)}
                onConfirm={finaliserPaiement}/>
        </div>
    )
}

export default GestionDeCaisses;