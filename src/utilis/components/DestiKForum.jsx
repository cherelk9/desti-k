import {useEffect, useRef, useState} from "react";
import {
    faCashRegister,
    faCircle,
    faHospitalUser,
    faImage,
    faPaperPlane,
    faUserShield
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../administration/components/Button";

import '../components/style/DestiKForum.css'

const DestiKForum = ({currentUserService}) => {
    const [message, setMessage] = useState([{
        id: 1, sender: 'Administration', text: 'Benvenue sur le forum desti-k !', type: 'text', time: '10:00'
    },
        {
            id: 2, sender: 'Accueil', text: 'Patient au box 3 pret', type: 'text', time: '10:05'
        }]);

    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    useEffect(() => {
        scrollToBottom();
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [message]);

    const handleSend = () =>{
        if (inputValue.trim() === '') return;

        const newMessage = {
            id: Date.now(),
            sender : currentUserService,
            text: inputValue,
            type: 'text',
            time: new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
        }

        setMessage([...message, newMessage]);
        setInputValue('');
    }

    const getServiceIcon = (service) => {
        if(service ==='Administration') return faUserShield;
        if(service === 'Caisse') return faCashRegister;
        return  faHospitalUser;
    }

    return(
        <div className="forum-container">
            <div className="forum-header">
                <h3><FontAwesomeIcon icon={faCircle} className="online-dot"/>
                    forum inter-services
                </h3>
                    <span className="service-tag">{currentUserService}</span>

            </div>
            <div className="message-list">

                {message.map((msg)=>(
                    <div key={msg.id} className={`message-wrapper ${msg.sender === currentUserService ? 'own' : ''}`}>
                        <div className={`message-bubble ${msg.sender ? msg.sender.toLowerCase() : 'default'}`}>
                            <div className="message-info">
                                <FontAwesomeIcon icon={getServiceIcon(msg.sender)}/>
                                <span className="sender-name">{msg.sender}</span>
                            </div>
                            <p className="message-text">{msg.text}</p>
                            <span className="message-time">{msg.time}</span>
                        </div>
                    </div>
                ))}

                <div className="forum-input-area">
                    <Button className="icon-btn">
                        <FontAwesomeIcon icon={faImage}/>
                    </Button>
                    <input
                        type="text"
                        placeholder="ecrire un message ici ...."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button className="send-btn" onClick={handleSend}>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DestiKForum;