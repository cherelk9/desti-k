import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDatabase, faCheckCircle, faGlobe, faFilePdf,
    faCreditCard, faClock, faSync, faArrowRight, faBolt,
    faServer, faChartLine
} from "@fortawesome/free-solid-svg-icons";

const IntegrationsPage = () => {
    const [integrations, setIntegrations] = useState([
        {
            id: 1,
            name: 'Base de données Clients',
            status: 'connected',
            icon: faDatabase,
            description: 'Gestion centralisée des profils patients',
            version: 'v2.1.0',
            lastUpdate: '15 mars 2026',
            uptime: '99.9%',
            color: '#185FA5',
            features: ['Synchronisation temps réel', 'Sauvegarde automatique', 'Cryptage E2E']
        },
        {
            id: 2,
            name: 'Système de Paiement',
            status: 'connected',
            icon: faCreditCard,
            description: 'Traitement des transactions sécurisé',
            version: 'v3.0.2',
            lastUpdate: '12 mars 2026',
            uptime: '99.95%',
            color: '#10B981',
            features: ['Espèces', 'Orange Money', 'MTN MoMo']
        },
        {
            id: 3,
            name: 'Rapports PDF',
            status: 'active',
            icon: faFilePdf,
            description: 'Génération de documents et rapports',
            version: 'v1.5.3',
            lastUpdate: '10 mars 2026',
            uptime: '98.5%',
            color: '#F59E0B',
            features: ['Reçus', 'Factures', 'Rapports journaliers']
        },
        {
            id: 4,
            name: 'Serveur de Résultats',
            status: 'pending',
            icon: faGlobe,
            description: 'Plateforme de résultats d\'analyses',
            version: 'v2.0.0-beta',
            lastUpdate: 'En configuration',
            uptime: 'N/A',
            color: '#8B5CF6',
            features: ['Intégration LIS', 'Notifications patients', 'API REST']
        }
    ]);

    const [expandedId, setExpandedId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setIntegrations(prev =>
                prev.map(int => ({
                    ...int,
                    lastUpdate: new Date().toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                }))
            );
            setRefreshing(false);
        }, 1500);
    };

    const getStatusInfo = (status) => {
        const statuses = {
            connected: { label: 'Connecté', color: '#10B981', bgColor: '#D1FAE5', icon: faCheckCircle },
            active: { label: 'Actif', color: '#F59E0B', bgColor: '#FEF3C7', icon: faBolt },
            pending: { label: 'En attente', color: '#EF4444', bgColor: '#FEE2E2', icon: faClock }
        };
        return statuses[status] || statuses.pending;
    };

    const filteredIntegrations = filterStatus === 'all'
        ? integrations
        : integrations.filter(i => i.status === filterStatus);

    const stats = {
        total: integrations.length,
        connected: integrations.filter(i => i.status === 'connected' || i.status === 'active').length,
        pending: integrations.filter(i => i.status === 'pending').length,
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fc 0%, #f0f4f8 100%)', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* HEADER */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '40px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#1a1a1a',
                            margin: '0 0 8px 0'
                        }}>
                            <FontAwesomeIcon icon={faSync} style={{ marginRight: '12px', color: '#185FA5' }} />
                            Intégrations Système
                        </h1>
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: 0
                        }}>
                            Gérez et surveillez toutes vos intégrations en temps réel
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: refreshing ? '#d1d5db' : '#185FA5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: refreshing ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: refreshing ? 'none' : '0 2px 8px rgba(24, 95, 165, 0.3)',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faSync}
                            style={{
                                animation: refreshing ? 'spin 1s linear infinite' : 'none'
                            }}
                        />
                        {refreshing ? 'Actualisation...' : 'Actualiser'}
                    </button>
                </div>

                {/* STATS */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    {[
                        { icon: faServer, label: 'Total', value: stats.total, color: '#185FA5' },
                        { icon: faCheckCircle, label: 'Opérationnels', value: stats.connected, color: '#10B981' },
                        { icon: faClock, label: 'En attente', value: stats.pending, color: '#EF4444' }
                    ].map((stat, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: `${stat.color}20`,
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: stat.color
                            }}>
                                <FontAwesomeIcon icon={stat.icon} style={{ fontSize: '20px' }} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{stat.label}</p>
                                <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FILTERS */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '12px',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { id: 'all', label: 'Tous' },
                        { id: 'connected', label: 'Connectés' },
                        { id: 'active', label: 'Actifs' },
                        { id: 'pending', label: 'En attente' }
                    ].map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setFilterStatus(filter.id)}
                            style={{
                                padding: '8px 12px',
                                border: 'none',
                                background: filterStatus === filter.id ? '#185FA5' : 'transparent',
                                color: filterStatus === filter.id ? 'white' : '#6b7280',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* CARDS GRID */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px'
                }}>
                    {filteredIntegrations.map(integration => {
                        const statusInfo = getStatusInfo(integration.status);
                        const isExpanded = expandedId === integration.id;

                        return (
                            <div
                                key={integration.id}
                                onClick={() => setExpandedId(isExpanded ? null : integration.id)}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    boxShadow: isExpanded ? '0 10px 25px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    border: `2px solid ${isExpanded ? integration.color : '#e5e7eb'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Card Header */}
                                <div style={{
                                    background: `linear-gradient(135deg, ${integration.color}15 0%, ${integration.color}05 100%)`,
                                    borderBottom: `2px solid ${integration.color}30`,
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            background: integration.color,
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            flexShrink: 0
                                        }}>
                                            <FontAwesomeIcon icon={integration.icon} style={{ fontSize: '20px' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                margin: '0 0 4px 0',
                                                fontSize: '16px',
                                                fontWeight: '700',
                                                color: '#1a1a1a'
                                            }}>
                                                {integration.name}
                                            </h3>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '13px',
                                                color: '#6b7280',
                                                lineHeight: '1.4'
                                            }}>
                                                {integration.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        background: statusInfo.bgColor,
                                        color: statusInfo.color,
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}>
                                        <FontAwesomeIcon icon={statusInfo.icon} />
                                        {statusInfo.label}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div style={{ padding: '16px 20px' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '12px',
                                        marginBottom: '12px'
                                    }}>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: '600' }}>Version</p>
                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{integration.version}</p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: '600' }}>Disponibilité</p>
                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#10B981' }}>{integration.uptime}</p>
                                        </div>
                                    </div>
                                    <p style={{
                                        margin: '0 0 8px 0',
                                        fontSize: '11px',
                                        color: '#6b7280'
                                    }}>
                                        <strong>Mis à jour :</strong> {integration.lastUpdate}
                                    </p>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div style={{
                                        padding: '16px 20px',
                                        background: '#f9fafb',
                                        borderTop: '1px solid #e5e7eb'
                                    }}>
                                        <p style={{
                                            margin: '0 0 8px 0',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            color: '#1a1a1a',
                                            textTransform: 'uppercase'
                                        }}>
                                            Fonctionnalités
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '6px'
                                        }}>
                                            {integration.features.map((feature, idx) => (
                                                <div key={idx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontSize: '13px',
                                                    color: '#4b5563'
                                                }}>
                                                    <FontAwesomeIcon
                                                        icon={faArrowRight}
                                                        style={{
                                                            fontSize: '10px',
                                                            color: integration.color
                                                        }}
                                                    />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Button */}
                                <div style={{
                                    padding: '12px 20px',
                                    background: integration.status === 'pending' ? '#FEE2E2' : '#F0F9FF',
                                    borderTop: '1px solid #e5e7eb'
                                }}>
                                    <button style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        background: integration.status === 'pending' ? '#EF4444' : '#10B981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        {integration.status === 'pending' ? 'Configurer' : 'Gérer'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default IntegrationsPage;