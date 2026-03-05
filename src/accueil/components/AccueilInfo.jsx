import {useState} from "react";
import {faCommentDots, faHandshake, faHouse, faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../administration/components/Button";
import {Card} from "react-bootstrap";

import Client from "../Client";
import RendezVous from "./RendezVous";
import DestiKForum from "../../utilis/components/DestiKForum";

export default function AccueilInfo(){


    const [activeTab, setActiveTab] = useState('accueil');

    const dataMenu = [
        { id: 'ajouter patient', icon: faUserDoctor, description: "ajouter un nouveau patient en remplissant ces informations dans la fiche suivante",label: 'ajouter patient' },
        { id: 'rendez-vous', icon: faHandshake, description: "voir la liste des rendez-vous programme pour la semaine",label: 'rendez-vous' },
        { id: 'forum', icon: faCommentDots, description : "ici, se trouve tous les messages echange a dest-k entre les differentes equipes" ,label: 'forum' },
    ]

    const renderContent = () => {
        switch(activeTab) {
            case 'ajouter patient': return <Client/>;
            case 'rendez-vous': return <RendezVous/>;
            case 'forum': return <DestiKForum/>;
            default: return (
            <div className="container">
                <div className="row justify-content-center py-5" >
                    {dataMenu.map((item) => (
                        <div className="col-sm-6 mb-4" key={item.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={item.icon}
                                                     className="text-primary mb-2" size="lg"/>
                                    <span className="mx-3 card-title fw-bold text-uppercase">{item.label}</span>
                                    <p className="card-text">{item.description}</p>
                                    <Button onClick={() => setActiveTab(item.id)}
                                            className="btn btn-primary btn-sm">
                                        <FontAwesomeIcon icon={item.icon}/>
                                        ouvrir
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> ) ;
        }
    };

    return (
        <div className="flex-grow-1 overflow-auto py-3 px-3 custom-scroll">
            <Card className="row justify-content-center py-2 mb-4">
                <div className="d-flex justify-content-around">
                    {dataMenu.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{cursor: 'pointer'}}
                            className={`p-2 rounded ${activeTab === item.id ? 'bg-primary text-white' : 'text-muted'}`}
                        >
                            <FontAwesomeIcon icon={item.icon}/>
                        </div>
                    ))}
                    <div onClick={() => setActiveTab('accueil')}
                         style={{cursor: 'pointer'}}
                         className="p-2">
                        <FontAwesomeIcon icon={faHouse}/>
                    </div>
                </div>
            </Card>

            {renderContent()}
        </div>

    )
}
