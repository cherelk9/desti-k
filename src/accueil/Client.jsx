import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faUser,
    faIdCard,
    faShieldHalved,
    faStethoscope,
    faFilePrescription,
    faClock,
    faUtensils,
    faCapsules,
    faPlaneDeparture,
    faPhone,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Client = () => {
    return (
        <div className="container-fluid">
                {/*

                    <button type="button" className="btn btn-info py-2 m-3" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    ...
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                    </div>
                    </div>

                */}


                    <div className="container py-2 ">
                        <div className="card  border-0  overflow-hidden">

                            {/* Header */}
                            <div className="card-header bg-primary text-white p-4">
                                <h3 className="mb-0 fw-bold"><FontAwesomeIcon icon={faStethoscope}
                                                                              className="me-2"/> Admission &
                                    Renseignements Cliniques</h3>
                            </div>

                            <div className="card-body p-4 p-md-5 bg-white">
                                <form className="row g-4">

                                    {/* --- SECTION 1 : ÉTAT CIVIL & COORDONNÉES --- */}
                                    <div className="col-12"><h5 className="text-primary border-bottom pb-2">1. État Civil & Coordonnées</h5></div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Nom de naissance</label>
                                        <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Nom" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Prénom</label>
                                        <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Prénom" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Date & Lieu de naissance</label>
                                        <div className="input-group">
                                            <input type="date" className="form-control bg-light border-0 shadow-sm" />
                                            <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Ville" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Sexe</label>
                                        <select className="form-select bg-light border-0 shadow-sm">
                                            <option>Masculin</option>
                                            <option>Féminin</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Taille (cm) / Poids (kg)</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control bg-light border-0 shadow-sm" placeholder="cm" />
                                            <input type="number" className="form-control bg-light border-0 shadow-sm" placeholder="kg" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Téléphone</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faPhone} /></span>
                                            <input type="tel" className="form-control bg-light border-0 shadow-sm" placeholder="6..." />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faEnvelope} /></span>
                                            <input type="email" className="form-control bg-light border-0 shadow-sm" placeholder="examplet@mail.com" />
                                        </div>
                                    </div>

                                    {/* --- SECTION 2 : DOCUMENTS ADMINISTRATIFS --- */}
                                    <div className="col-12 mt-5"><h5 className="text-primary border-bottom pb-2">2. Documents Administratifs</h5></div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Carte Vitale (N° Sécu)</label>
                                        <div className="input-group border rounded shadow-sm">
                                            <span className="input-group-text bg-success text-white border-0"><FontAwesomeIcon icon={faIdCard} /></span>
                                            <input type="text" className="form-control border-0" placeholder="1 80 01..." />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Carte Mutuelle</label>
                                        <div className="input-group border rounded shadow-sm">
                                            <span className="input-group-text bg-info text-white border-0"><FontAwesomeIcon icon={faShieldHalved} /></span>
                                            <input type="text" className="form-control border-0" placeholder="N° Adhérent" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Pièce d'Identité</label>
                                        <div className="row">
                                            <div className="col-5">
                                                <select className="form-select bg-light border-0 shadow-sm">
                                                    <option>CNI</option>
                                                    <option>Passeport</option>
                                                    <option>Titre de Séjour</option>
                                                </select>
                                            </div>
                                            <div className="col-7">
                                                <input type="number" className="form-control bg-light border-0 shadow-sm" />
                                            </div>
                                        </div>


                                    </div>

                                    {/* --- SECTION 3 : PRESCRIPTION & CLINIQUE --- */}
                                    <div className="col-12 mt-5"><h5 className="text-primary border-bottom pb-2">3. Prescription & Informations Médicales</h5></div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Médecin Prescripteur</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faUser} /></span>
                                            <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Dr. Nom Prénom" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Date de l'Ordonnance</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faFilePrescription} /></span>
                                            <input type="date" className="form-control bg-light border-0 shadow-sm" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Dernières Règles (DDR)</label>
                                        <input type="date" className="form-control bg-light border-0 shadow-sm" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Antibiotiques en cours ?</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faCapsules} /></span>
                                            <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Nom du médicament" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Voyage récent (Paludisme)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faPlaneDeparture} /></span>
                                            <input type="text" className="form-control bg-light border-0 shadow-sm" placeholder="Pays visité" />
                                        </div>
                                    </div>

                                    {/* --- SECTION 4 : ÉTAT AU MOMENT DU PRÉLÈVEMENT --- */}
                                    <div className="col-12 mt-5"><h5 className="text-primary border-bottom pb-2">4. État au Prélèvement</h5></div>

                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">Heure de Réveil</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0"><FontAwesomeIcon icon={faClock} /></span>
                                            <input type="time" className="form-control bg-light border-0 shadow-sm" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 d-flex align-items-end pb-2">
                                        <div className="form-check form-switch px-4 py-2 border rounded bg-light w-100 shadow-sm">
                                            <input className="form-check-input" type="checkbox" id="jeune" />
                                            <label className="form-check-label fw-semibold" htmlFor="jeune"><FontAwesomeIcon icon={faUtensils} className="me-2"/> Patient à Jeun</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Heure de prise des médicaments</label>
                                        <input type="time" className="form-control bg-light border-0 shadow-sm" />
                                    </div>

                                    <div className="col-12 mt-5">
                                        <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow">
                                            Enregistrer l'Admission
                                        </button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
        </div>




    )
}

export default Client;