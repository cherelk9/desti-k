import {faCarCrash, faDatabase, faFileDownload, faFilePdf, faGlobe} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IntegrationsPage =()=>{

    const integration =[
        {
            name:'Base de donnee Clients',
            status: 'Connected',
            icon: faDatabase
        },
        {
            name:'system paiement',
            status: 'Connected',
            icon: faCarCrash
        },
        {
            name:'Rapport PDF',
            status: 'Actif',
            icon: faFilePdf
        },
        {
            name:'serveur de Resultats',
            status: 'en attente',
            icon: faGlobe
        }]

        const style = {
            container: {
                padding: '40px',
                backgroundColor: '#ffffff'
            },
            title: {
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '25px',
            },
            item: {
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #eee',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }
        }


    return(
        <div style={style.container}>
            <h2 style={style.title}>Liste des integrations </h2>
            <div className="row">
                {
                    integration.map((item, index) => (
                        <div className ="col-md-6 mb-3"
                             key={index}>
                            <div style={style.item}>
                                <div className="d-flex align-items-center">
                                    <span style={{fontSize: '24px', marginRight: '15px'}}><FontAwesomeIcon icon={item.icon}/></span>
                                    <div>
                                        <div className="fw-bold text-dark">{item.name}</div>
                                        <small className="text-muted"> Service System </small>
                                    </div>
                                </div>
                                <span className={`badge ${item.status === 'Connected' ? 'bg-success' : 'bg-secondary'}`}>{item.status}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export  default IntegrationsPage;