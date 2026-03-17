import React from 'react';

import {HeartPulse} from "lucide-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faUser,
    faFilePrescription,
    faPhone,
    faMap,
    faBusinessTime,
    faHospitalSymbol,
    faEyeDropper,
    faUsers,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import {CustomerList} from "../connexion/utils/CustomerList";
import {Button} from "react-bootstrap";

const Client = () => {

    return (
        <div className="container">
            <div className=" bg-slate-50 p-0 m-0 font-sans text-slate-800">
                <div className ="max-w-5xl mx-auto space-y-8">
                    {/*en tete*/}
                    <header className="bg-primary rounded-2xl p-4 text-white shadow-lg flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold items-center gap-3">
                                <HeartPulse
                                    w-8 h-8
                                />
                                Admission & Renseignement clinique
                            </h1>
                            <p className="text-blue-100 mt-1">Enregistrement des donnees patients et laboratoire</p>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-sm opacity-80 italic">ID Patient: {CustomerList.length + 1}</p>
                            <p className="text-sm font-semibold">Reception : 20/05/2026
                            </p>
                            <p className="text-sm text-sm font-semibold fs-6"> date : {new Date().toLocaleTimeString()}</p>
                        </div>
                    </header>

                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        onSubmit={()=>{}}>

                        {/** identification des clients*/}
                        <div className=" card border-1 shadow-sm mb-4"
                             style={{borderRadius: '1rem'}}>
                            <div className="card-header bg-white py-3 border-0">
                                <h5 className="mb-0 text-primary fw-bold">
                                    <FontAwesomeIcon icon={faUser} className="me-2" />
                                    1. Etat Civil & Coordonnees
                                </h5>
                            </div>

                            <div className="card-body border-top p-4">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase"> Nom Complet</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg bg-light border-1 fs-6"
                                            placeholder="Nom et Prenom ..."/>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase"> Date de Naissance </label>
                                        <input
                                            type="date"
                                            className="form-control form-control-lg bg-light border-1 fs-6"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase"> Sex </label>
                                        <select
                                            className="form-control form-control-lg bg-light border-1 fs-6">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>undefined</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            Adresse
                                        </label>
                                        <div className="input-group">
                                        <span className="input-group-text bg-light border-1">
                                            <FontAwesomeIcon icon={faMap} className="me-2"/>
                                        </span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg bg-light border-1 fs-6"
                                                placeholder="Ville , quartier..."/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase">Contact</label>
                                        <div className="input-group">
                                        <span className="input-group-text bg-light border-1">
                                            <FontAwesomeIcon icon={faPhone} className="me-2"/>
                                        </span>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg bg-light border-1 fs-6"
                                                placeholder="+237..."/>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase">Profession</label>
                                        <div className="input-group">
                                        <span className="input-group-text bg-light border-1">
                                            <FontAwesomeIcon icon={faBusinessTime} className="me-2"/>
                                        </span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg bg-light border-1 fs-6"
                                                placeholder="Profession"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/**Medical**/}
                        <div className="row">
                            <div className="col-6">
                                <div className="card border-0 shadow-sm h-100 mb-4"
                                     style={{borderRadius: '1rem'}}>

                                    <div className="card-header bg-white py-3 border-1">
                                        <h5 className="mb-0 text-success fw-bold">
                                            <FontAwesomeIcon icon={faFilePrescription} className="me-2"/>
                                            2. Prescriptions
                                        </h5>
                                    </div>
                                    <div className="card-body border-top p-4">
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted text-uppercase">Medecin Prescripteur</label>
                                            <input type="text"
                                                   className="form-control form-control-lg bg-light border-1 fs-6"
                                                   placeholder="Dr. Nom Complet..."/>
                                        </div>
                                        <label
                                            className="form-label small fw-bold text-muted text-uppercase">Motif</label>
                                        <textarea
                                            className="form-control  bg-light border-1 fs-6"
                                            rows="3"
                                            placeholder="symptomes...">
                                    </textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card border-0 shadow-sm h-100 mb-4"
                                     style={{borderRadius: '1rem'}}
                                >
                                    <div className="card-header bg-white py-3 border-1">
                                        <h5 className="mb-0 text-danger fw-bold">
                                            <FontAwesomeIcon icon={faHospitalSymbol} className="me-2"/>
                                            3. Antecedents
                                        </h5>
                                    </div>
                                    <div className="card-body border-top p-4">
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted text-uppercase">Pathologie</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-1"
                                                placeholder="HTA, Diabete..."/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold  text-danger
                                         text-uppercase font-monospace"> Allergies</label>
                                            <input
                                                type="text"
                                                className="form-control border-danger-subtle bg-danger-subtle text-danger"
                                                placeholder="AUCUNE"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 shadow-sm  mb-4 mt-4"
                                style={{borderRadius: '1rem'}}
                        >
                            <div className="card-header bg-white py-3 border-1">
                                <h5 className="mb-0 text-purple fw-bold"
                                    style={{color: '#6f42c1'}}>
                                    <FontAwesomeIcon icon={faEyeDropper} className="me-2"/>
                                    4. Details du prelevement
                                </h5>
                            </div>
                            <div className="card-body border-top p-4">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            Examens demandes
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg bg-primary-subtle border-1 fs-6"
                                            placeholder="NFS, widal, etc...."
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase">TYPE</label>
                                        <select className="form-control form-control-lg bg-light border-1 fs-6">
                                            <option>Sang</option>
                                            <option>Urine</option>
                                            <option>Selles</option>
                                            <option>Autres</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 d-flex align-items-end">
                                        <div className="form-label form-switch p-3 bg-warning-subtle rounded w-100 border border-warning-subtle">
                                            <input
                                                type="checkbox"
                                                className="form-check-input ms-0 me-2"
                                                id="fasting" />
                                            <label htmlFor="fasting"
                                                    className="form-check-label fw-bold text-warning-emphasis">
                                            PATIENT A JEUN </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            Preleveur
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg bg-light border-1 fs-6"
                                            placeholder="Nom complet du Preleveur"
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            Observations
                                        </label>
                                        <textarea
                                            className="form-control form-control-lg bg-light border-1 fs-6"
                                            placeholder="Observations..."
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="card border-0 shadow-sm  mb-4 mt-4"
                             style={{borderRadius: '1rem'}}
                        >
                            <div className="card-header bg-white py-3 border-1">
                                <h5 className="mb-0 text-purple fw-bold"
                                    style={{color: 'yellowgreen'}}>
                                    <FontAwesomeIcon icon={faUsers} className="me-2"/>
                                    5. PERSONNES A CONTACTER EN CAS D'URGENCE
                                </h5>
                            </div>
                            <div className="card-body border-top p-4">
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase">RELATION</label>
                                        <select className="form-control form-control-lg bg-light border-1 fs-6">
                                            <option>FEMME / MARIE</option>
                                            <option>FAMILLE</option>
                                            <option>COMPAGNE</option>
                                            <option>AMI (E)</option>
                                            <option>COLLEGE</option>
                                            <option>AUTRES</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                            <label className="form-label small fw-bold text-muted text-uppercase">NOM COMPLET</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg bg-light border-1 fs-6"
                                                placeholder="NOM COMPLET..."/>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase">Contact</label>
                                        <div className="input-group">
                                        <span className="input-group-text bg-light border-1">
                                            <FontAwesomeIcon icon={faPhone} className="me-2"/>
                                        </span>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg bg-light border-1 fs-6"
                                                placeholder="+237..."/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            email
                                        </label>
                                        <input
                                            className="form-control form-control-lg bg-light border-1 fs-6"
                                            placeholder="email..."

                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            Adresse
                                        </label>
                                        <div className="input-group">
                                        <span className="input-group-text bg-light border-1">
                                            <FontAwesomeIcon icon={faMap} className="me-2"/>
                                        </span>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg bg-light border-1 fs-6"
                                                placeholder="Ville , quartier..."/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mb-5">
                            <Button
                                type="submit"
                                className="btn btn-light btn-lg px-4 border shadow-sm">
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className="btn btn-primary btn-lg px-4 border shadow">
                                <FontAwesomeIcon icon={faCheckCircle} className="me-2"/>
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Client;