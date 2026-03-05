import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCalendarPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Badge, Button, Card, CardBody, CardHeader, Col, Form, ListGroup, Row} from "react-bootstrap";


const RendezVous = () =>{

    const [dateSelected, setDateSelected] = useState(new Date());


    const [nouveauRdv, setNouveauRdv] = useState({patient: '', heure: '', date: '', motif: ''});

    const [rdvs, setRdvs] = useState(()=>{
        const saved = localStorage.getItem("nouveauRdv");
        return saved ? JSON.parse(saved) : [];
    });

    //sauvegarder automatiquement le rendez vous
    useEffect(() => {
        localStorage.setItem("rdvs", JSON.stringify(rdvs));
    },[rdvs])

    const rdvsDuJourney = rdvs.filter(rdv =>
        rdv.date === dateSelected
    )
    const ajouterRdv = (e)=>{
        e.preventDefault()
        const  rdvComplet = {
            ...nouveauRdv,
            id: Date.now(),
            date: dateSelected
        }
        setRdvs([...rdvs, rdvComplet]);
        setNouveauRdv({patient: '', heure: '', date: '', motif: ''});
    }

   const supprimerRdv = (id) =>{
        setRdvs(rdvs.filter(rdv => rdv.id !== id))
   }

    return (
        <div className="animate-fade-in">
            <h3 className="mb-4"><FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary"/> Gestionnaire de rendez-vous </h3>
            <Row>
                <Col lg={4}>
                    <Card className="shadow-sm border-0 mb-4 ">
                        <CardHeader className="bg-primary text-white fw-bold">Programmer</CardHeader>
                        <CardBody>
                            <Form onSubmit={ajouterRdv}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold" column={1}>choisir la date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dateSelected}
                                        onChange={(e)=>setDateSelected(e.target.value)}
                                        className="form-control-lg border-primary"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold" column={2}>
                                        nom du patient
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nom du patient"
                                        value={nouveauRdv.patient}
                                        onChange={(e)=>setNouveauRdv({...nouveauRdv, patient: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold" column={2}>Type/Motif</Form.Label>
                                            <Form.Select value={nouveauRdv.motif}
                                                onChange={(e)=>setNouveauRdv({...nouveauRdv, motif: e.target.value})}
                                            >
                                                <option value="consultation" className="small fw-bold text-success">Consultation</option>
                                                <option value="suivie" className="small fw-bold text-info">Suivie</option>
                                                <option value="Urgence" className="small fw-bold text-danger">Urgence</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold shadow-sm">
                                    <FontAwesomeIcon icon={faCalendarPlus} className="me-2"/>Enregister le rendez-vous
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={7}>
                    <Card className="shadow-sm border-0 h-100 mb-4 ">
                        <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
                            <div>
                                <span className="fw-bold d-block text-dark">Rendez-vous</span>
                                <small className="text-muted">{new Date(dateSelected).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})}</small>
                            </div>
                            <Badge bg={rdvsDuJourney.length>0 ? "success" : "secondary"}>
                                {rdvsDuJourney.length} rdv
                            </Badge>
                        </Card.Header>
                        <ListGroup variant="flush"
                                   style={{maxHeight: '500px', overflowY: 'auto'}}>
                            {rdvsDuJourney.length > 0 ? (
                                rdvsDuJourney.map((rdv) =>
                                    (<ListGroup.Item key={rdv.id}
                                        className="p-3 border-s border-4 border-primary m-2 shadow-sm rounded">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded p-2 me-3 text-primary text-center" style={{width: '60px'}}>
                                                    <small className="d-block fw-bold">{rdv.heure}</small>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">
                                                        {rdv.patient}
                                                    </h6>
                                                    <Badge bg="light" text="dark" className="border">{rdv.motif}</Badge>

                                                </div>
                                            </div>
                                            <Button variant="link"    className="text-danger" onClick={()=>supprimerRdv(rdv.id)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </div>
                                    </ListGroup.Item>)
                                ))
                            :
                                (
                                    <div className="p-5 text-center">
                                        <div className="text-muted mb-2">
                                            <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="opacity-25"/>
                                        </div>
                                        <p className="text-muted mb-2">
                                            Aucun rendez-vous prevu pour cette date.
                                        </p>
                                    </div>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default RendezVous