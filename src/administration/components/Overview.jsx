import {Button, Card, Col, Row} from "react-bootstrap";

import {
    faChartPie,
    faFlask, faHouseUser,
    faSync,
    faUserDoctor,
    faUsers, faUsersRectangle
} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useMemo, useState} from "react";
import {StatCard} from "./StatCard";
import {Transaction} from "../../caisse/components/Transaction";
import {CustomerList} from "../../connexion/utils/CustomerList";

const Overview = () => {
    const [filterMoises, setFilterMoises] = useState('Tous');
    const nomsMois = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const imprimerRapport = () => {
        window.print();
    }

    const donneesFiltrees = useMemo(() => {
        let transacs = [...Transaction];
        let clients = [...CustomerList];

        if (filterMoises !== 'Tous') {
            const indexMois = nomsMois.indexOf(filterMoises);
            transacs = Transaction.filter(t => new Date(t.date || Date.now()).getMonth() === indexMois);
            clients = CustomerList.filter(t => new Date(t.date || Date.now()).getMonth() === indexMois);
        }
        return {transacs, clients};
    }, [filterMoises]);

    const totalCA = donneesFiltrees.transacs.reduce((acc, t) => acc + t.montant, 0);

    const affluence = [0, 2, 3, 4, 5, 6].map(index => {
        const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
        const count = donneesFiltrees.clients.filter(c => new Date(c.civility.dateOfBirth).getDate() === index).length;
        return {jour: jours[index], count};
    })

    const maxAffluence = Math.max(...affluence.map(a => a.count)) || 1;

    return <div className="animate-fade-in">
        <Row className="g-4 mb-4">
            {/* Cards de Stats */}
            <StatCard title="TRANSACTIONS" value={donneesFiltrees.transacs.length} change={maxAffluence.toLocaleString()} up icon={faChartPie} color="#6366f1"/>
            <StatCard title="TOTAL CUSTOMERS" value={donneesFiltrees.clients.length} change="16%" icon={faUsers} color="#10b981"/>
            <StatCard title="TASK PROGRESS" value="75.5%" progress="75" icon={faFlask} color="#f59e0b"/>
            <StatCard title="TOTAL PROFIT" value="$15k" icon={faChartPie} color="#6366f1"/>
        </Row>
        <Row className="g-4">
            <Col lg={8}>

                <Card className="border-0 shadow-sm p-4 h-100">
                    <div className="d-flex justify-content-between mb-4">
                        <h5 className="fw-bold text-dark">Sales</h5>
                        <Button variant="link" className="text-secondary p-0 text-decoration-none"><FontAwesomeIcon
                            icon={faSync} className="me-2"/>Sync</Button>
                    </div>
                    <div className="bg-light rounded d-flex align-items-end justify-content-around p-3"
                         style={{height: '300px'}}>
                        {/* Simulation de graphique en barres */}
                        {donneesFiltrees.transacs.map((h, i) => (
                            <div key={i} style={{
                                height: `${h}%`,
                                width: '12%',
                                background: 'linear-gradient(to top, #6366f1, #a855f7)',
                                borderRadius: '4px 4px 0 0',
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "white"
                            }} >trans</div>

                        ))}{donneesFiltrees.clients.map((h, i) => (
                        <div key={i} style={{
                            height: `${h}%`,
                            width: '12%',
                            background: 'black',
                            borderRadius: '4px 4px 0 0',
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "white"
                        }} >clients
                            <span >{}</span>
                        </div>
                    ))}
                    </div>
                </Card>


            </Col>
            <Col lg={4}>
                <Card className="border-0 shadow-sm p-4 h-100 text-center">
                    <h5 className="fw-bold text-dark text-start mb-4">Traffic source</h5>
                    <div className="position-relative mx-auto mb-4" style={{width: '200px', height: '200px'}}>
                        <div
                            className="rounded-circle border-5 h-100 w-100 d-flex align-items-center justify-content-center"
                            style={{borderColor: '#6366f1 !important', borderWidth: '20px !important'}}>
                            <span className="fw-bold">63%</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around mt-4">
                        <div><FontAwesomeIcon icon={faUserDoctor} className="text-secondary d-block mb-1 mx-4"/><small
                            className="fw-bold">new client</small><h6>63%</h6></div>
                        <div><FontAwesomeIcon icon={faUsersRectangle}
                                              className="text-secondary d-block mb-1 mx-4"/><small className="fw-bold">old
                            client</small><h6>15%</h6></div>
                        <div><FontAwesomeIcon icon={faHouseUser} className="text-secondary d-block mb-1 mx-4"/><small
                            className="fw-bold">client vip</small><h6>22%</h6></div>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
};

export default Overview;