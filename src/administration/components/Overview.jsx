import {Button, Card, Col, Row} from "react-bootstrap";

import {
    faChartPie,
    faFlask, faHouseUser,
    faSync,
    faUserDoctor,
    faUsers, faUsersRectangle
} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {StatCard} from "./StatCard";

const Overview = () => (
    <div className="animate-fade-in">
        <Row className="g-4 mb-4">
            {/* Cards de Stats */}
            <StatCard title="BUDGET" value="$24k" change="+12%" up icon={faChartPie} color="#6366f1" />
            <StatCard title="TOTAL CUSTOMERS" value="1.6k" change="16%" icon={faUsers} color="#10b981" />
            <StatCard title="TASK PROGRESS" value="75.5%" progress="75" icon={faFlask} color="#f59e0b" />
            <StatCard title="TOTAL PROFIT" value="$15k" icon={faChartPie} color="#6366f1" />
        </Row>
        <Row className="g-4">
            <Col lg={8}>
                <Card className="border-0 shadow-sm p-4 h-100">
                    <div className="d-flex justify-content-between mb-4">
                        <h5 className="fw-bold text-dark">Sales</h5>
                        <Button variant="link" className="text-secondary p-0 text-decoration-none"><FontAwesomeIcon icon={faSync} className="me-2"/>Sync</Button>
                    </div>
                    <div className="bg-light rounded d-flex align-items-end justify-content-around p-3" style={{height: '300px'}}>
                        {/* Simulation de graphique en barres */}
                        {[40, 70, 30, 90, 60, 80, 95].map((h, i) => (
                            <div key={i} style={{height: `${h}%`, width: '12%', background: 'linear-gradient(to top, #6366f1, #a855f7)', borderRadius: '4px 4px 0 0'}}></div>
                        ))}
                    </div>
                </Card>
            </Col>
            <Col lg={4}>
                <Card className="border-0 shadow-sm p-4 h-100 text-center">
                    <h5 className="fw-bold text-dark text-start mb-4">Traffic source</h5>
                    <div className="position-relative mx-auto mb-4" style={{width: '200px', height: '200px'}}>
                        <div className="rounded-circle border-5 h-100 w-100 d-flex align-items-center justify-content-center" style={{borderColor: '#6366f1 !important', borderWidth: '20px !important'}}>
                            <span className="fw-bold">63%</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around mt-4">
                        <div><FontAwesomeIcon icon={faUserDoctor} className="text-secondary d-block mb-1 mx-4"/><small className="fw-bold">new client</small><h6>63%</h6></div>
                        <div><FontAwesomeIcon icon={faUsersRectangle} className="text-secondary d-block mb-1 mx-4"/><small className="fw-bold">old client</small><h6>15%</h6></div>
                        <div><FontAwesomeIcon icon={faHouseUser} className="text-secondary d-block mb-1 mx-4"/><small className="fw-bold">client vip</small><h6>22%</h6></div>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
);

export default Overview;