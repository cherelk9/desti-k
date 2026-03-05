import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {Card, Col} from "react-bootstrap";

const StatCard = ({ title, value, change, up, icon, color, progress }) => (
    <Col md={6} xl={3}>
        <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <p className="text-secondary small fw-bold mb-1 uppercase">{title}</p>
                    <h3 className="fw-bold mb-0">{value}</h3>
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{width: 48, height: 48, backgroundColor: color}}>
                    <FontAwesomeIcon icon={icon} />
                </div>
            </div>
            {change && (<div className="mt-3 small">
                            <span className={up ? 'text-success' : 'text-danger'}>
                                <FontAwesomeIcon icon={up ? faArrowUp : faArrowDown} className="me-1" /> {change}
                            </span>
                            <span className="text-muted ms-2">since last month</span>
                        </div>
            )}
            {progress && (
                <div className="progress mt-4" style={{height: 4}}>
                    <div className="progress-bar" style={{width: `${progress}%`, backgroundColor: color}}></div>
                </div>
            )}
        </Card>
    </Col>
);

export  {StatCard};