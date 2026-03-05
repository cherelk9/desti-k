import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faMapMarkerAlt,
    faMicroscope,
    faArrowRight,
    faShieldVirus,
    faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="container-fluid bg-primary">
            <div className="container py-5">
                <div className="row">
                    <div className="col-4">
                        <h2 className="fw-bold text-black"> Nos contact </h2>
                        <p className="lead">
                            Bd, Imam Chafii N0 7 lot Al Hamidia Hay Qods - Sidi Bernoussi - Casablanca
                        </p>
                        <h3>05 22 75 96 90 / 06 66 56 56 06</h3>
                        <p className="fw-bold text-black"></p>
                    </div>

                    <div className="col-4">
                        <h2 className="fw-bold text-black"> Horaire d'ouverture </h2>
                        <p>bonjour le monde je suis entrain de travailler </p>

                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
