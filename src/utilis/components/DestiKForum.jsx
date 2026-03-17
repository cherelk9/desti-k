import { useEffect, useRef, useState } from "react";
import {
    faCashRegister, faCircle, faHospitalUser,
    faPaperPlane, faUserShield, faFlask,
    faSmile, faHashtag
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SERVICES_CONFIG = {
    'Caisse':          { color: '#3b82f6', bg: '#eff6ff', initiale: 'CA' },
    'Administration':  { color: '#8b5cf6', bg: '#f5f3ff', initiale: 'AD' },
    'Accueil':         { color: '#10b981', bg: '#ecfdf5', initiale: 'AC' },
    'Laboratoire':     { color: '#f59e0b', bg: '#fffbeb', initiale: 'LA' },
    'default':         { color: '#6b7280', bg: '#f9fafb', initiale: '??' },
};

const getConfig = (service) =>
    SERVICES_CONFIG[service] || SERVICES_CONFIG['default'];

const getServiceIcon = (service) => {
    if (service === 'Administration') return faUserShield;
    if (service === 'Caisse') return faCashRegister;
    if (service === 'Laboratoire') return faFlask;
    return faHospitalUser;
};

// Messages de démonstration
const DEMO_MESSAGES = [
    { id: 1, sender: 'Accueil',        text: 'Bonjour à tous ! Le patient Elembe Ongouda est en salle d\'attente.',         time: '08:12' },
    { id: 2, sender: 'Caisse',         text: 'Reçu. Sa facture est déjà prête, il peut passer directement.',              time: '08:14' },
    { id: 3, sender: 'Administration', text: 'Merci. N\'oubliez pas la réunion de service à 10h ce matin.',               time: '08:15' },
    { id: 4, sender: 'Laboratoire',    text: 'Les résultats du patient #4421 sont disponibles, vous pouvez les imprimer.', time: '08:30' },
];

const DestiKForum = ({ currentUserService }) => {
    const [messages, setMessages] = useState(DEMO_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMessage = {
            id: Date.now(),
            sender: currentUserService,
            text: inputValue.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        inputRef.current?.focus();
    };

    const config = getConfig(currentUserService);

    return (
        <div style={styles.wrapper}>
            {/* ── HEADER ── */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <div style={styles.headerIcon}>
                        <FontAwesomeIcon icon={faHashtag} style={{ fontSize: 14, color: '#fff' }} />
                    </div>
                    <div>
                        <div style={styles.headerTitle}>Forum inter-services</div>
                        <div style={styles.headerSub}>
                            <span style={styles.onlineDot} />
                            {messages.length} messages · En ligne
                        </div>
                    </div>
                </div>
                <div style={{ ...styles.serviceBadge, background: config.bg, color: config.color, border: `1.5px solid ${config.color}30` }}>
                    <FontAwesomeIcon icon={getServiceIcon(currentUserService)} style={{ marginRight: 6, fontSize: 11 }} />
                    {currentUserService}
                </div>
            </div>

            {/* ── LISTE DES MESSAGES ── */}
            <div style={styles.messageList}>
                {/* Séparateur de date */}
                <div style={styles.dateDivider}>
                    <span style={styles.dateDividerLine} />
                    <span style={styles.dateDividerText}>Aujourd'hui</span>
                    <span style={styles.dateDividerLine} />
                </div>

                {messages.map((msg, index) => {
                    const isOwn = msg.sender === currentUserService;
                    const cfg = getConfig(msg.sender);
                    const prevSender = index > 0 ? messages[index - 1].sender : null;
                    const showHeader = msg.sender !== prevSender;

                    return (
                        <div
                            key={msg.id}
                            style={{
                                ...styles.messageRow,
                                flexDirection: isOwn ? 'row-reverse' : 'row',
                                marginTop: showHeader ? 16 : 4,
                            }}
                        >
                            {/* Avatar */}
                            {showHeader && (
                                <div style={{
                                    ...styles.avatar,
                                    background: cfg.bg,
                                    color: cfg.color,
                                    border: `2px solid ${cfg.color}40`,
                                    marginLeft: isOwn ? 10 : 0,
                                    marginRight: isOwn ? 0 : 10,
                                }}>
                                    {cfg.initiale}
                                </div>
                            )}
                            {!showHeader && <div style={{ width: isOwn ? 46 : 46 }} />}

                            {/* Bulle */}
                            <div style={{ maxWidth: '65%' }}>
                                {showHeader && (
                                    <div style={{
                                        ...styles.senderName,
                                        textAlign: isOwn ? 'right' : 'left',
                                        color: cfg.color,
                                    }}>
                                        <FontAwesomeIcon icon={getServiceIcon(msg.sender)} style={{ marginRight: 4, fontSize: 10 }} />
                                        {msg.sender}
                                    </div>
                                )}
                                <div style={{
                                    ...styles.bubble,
                                    background: isOwn ? '#2563eb' : '#ffffff',
                                    color: isOwn ? '#ffffff' : '#1e293b',
                                    borderRadius: isOwn
                                        ? '18px 4px 18px 18px'
                                        : '4px 18px 18px 18px',
                                    boxShadow: isOwn
                                        ? '0 4px 15px rgba(37,99,235,0.25)'
                                        : '0 2px 8px rgba(0,0,0,0.07)',
                                }}>
                                    {msg.text}
                                    <span style={{
                                        ...styles.time,
                                        color: isOwn ? 'rgba(255,255,255,0.65)' : '#94a3b8',
                                    }}>
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Indicateur "en train d'écrire" */}
                {isTyping && (
                    <div style={{ ...styles.messageRow, marginTop: 8 }}>
                        <div style={{ ...styles.avatar, background: '#f1f5f9', color: '#94a3b8', border: '2px solid #e2e8f0', marginRight: 10 }}>
                            ···
                        </div>
                        <div style={{ ...styles.bubble, background: '#f1f5f9', color: '#94a3b8', borderRadius: '4px 18px 18px 18px' }}>
                            <span style={styles.typingDot} /><span style={{ ...styles.typingDot, animationDelay: '.15s' }} /><span style={{ ...styles.typingDot, animationDelay: '.3s' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* ── ZONE DE SAISIE ── */}
            <div style={styles.inputArea}>
                <div style={styles.inputWrapper}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Écrire un message..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        style={styles.input}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        style={{
                            ...styles.sendBtn,
                            background: inputValue.trim() ? '#2563eb' : '#e2e8f0',
                            cursor: inputValue.trim() ? 'pointer' : 'default',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            style={{ fontSize: 14, color: inputValue.trim() ? '#fff' : '#94a3b8' }}
                        />
                    </button>
                </div>
                <div style={styles.inputHint}>
                    Appuyez sur <kbd style={styles.kbd}>Entrée</kbd> pour envoyer · Service : <strong style={{ color: config.color }}>{currentUserService}</strong>
                </div>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-6px); }
                }
            `}</style>
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '75vh',
        maxWidth: 760,
        margin: '0 auto',
        background: '#f8fafc',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(37,99,235,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)',
        flexShrink: 0,
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
    },
    headerTitle: {
        fontWeight: 700,
        fontSize: 15,
        color: '#ffffff',
        letterSpacing: '-0.2px',
    },
    headerSub: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        color: 'rgba(255,255,255,0.75)',
        marginTop: 2,
    },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: '#4ade80',
        display: 'inline-block',
        boxShadow: '0 0 0 2px rgba(74,222,128,0.35)',
    },
    serviceBadge: {
        padding: '6px 14px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.3px',
    },
    messageList: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
    },
    dateDivider: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        margin: '8px 0 16px',
    },
    dateDividerLine: {
        flex: 1,
        height: 1,
        background: '#e2e8f0',
    },
    dateDividerText: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: 600,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
    },
    messageRow: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 800,
        flexShrink: 0,
        letterSpacing: '0.5px',
    },
    senderName: {
        fontSize: 11,
        fontWeight: 700,
        marginBottom: 4,
        letterSpacing: '0.3px',
        textTransform: 'uppercase',
    },
    bubble: {
        padding: '10px 14px',
        fontSize: 14,
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        flexWrap: 'wrap',
        wordBreak: 'break-word',
    },
    time: {
        fontSize: 10,
        flexShrink: 0,
        marginLeft: 'auto',
        marginTop: 2,
        alignSelf: 'flex-end',
    },
    typingDot: {
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: '#94a3b8',
        margin: '0 2px',
        animation: 'bounce 1.2s infinite',
    },
    inputArea: {
        padding: '12px 20px 16px',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        flexShrink: 0,
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#f1f5f9',
        borderRadius: 14,
        padding: '6px 6px 6px 16px',
        border: '1.5px solid #e2e8f0',
        transition: 'border-color .2s',
    },
    input: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        outline: 'none',
        fontSize: 14,
        color: '#1e293b',
        padding: '6px 0',
    },
    sendBtn: {
        width: 38,
        height: 38,
        borderRadius: 10,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all .2s',
        flexShrink: 0,
    },
    inputHint: {
        fontSize: 11,
        color: '#94a3b8',
        marginTop: 8,
        textAlign: 'center',
    },
    kbd: {
        background: '#e2e8f0',
        padding: '1px 5px',
        borderRadius: 4,
        fontSize: 10,
        fontFamily: 'monospace',
        color: '#475569',
    },
};

export default DestiKForum;