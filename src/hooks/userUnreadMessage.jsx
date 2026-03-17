// hooks/useUnreadMessages.js

/**
 * import { useState, useEffect } from "react";
 * import { db } from "../firebase";
 * import { collection, query, onSnapshot } from "firebase/firestore";
 *
 * export const useUnreadMessages = (userId, userService) => {
 *     const [unreadCount, setUnreadCount] = useState(0);
 *
 *     useEffect(() => {
 *         if (!userId) return;
 *         const q = query(collection(db, "messages"));
 *         const unsubscribe = onSnapshot(q, (snapshot) => {
 *             const count = snapshot.docs.filter(doc => {
 *                 const data = doc.data();
 *                 return !data.readBy?.includes(userId) && data.sender !== userService;
 *             }).length;
 *             setUnreadCount(count);
 *         });
 *         return () => unsubscribe();
 *     }, [userId, userService]);
 *
 *     return unreadCount;
 * };
 *
 *
 *
 * // src/firebase.js
 * import { initializeApp } from "firebase/app";
 * import { getFirestore } from "firebase/firestore";
 *
 * const firebaseConfig = {
 *   apiKey: "VOTRE_API_KEY",
 *   authDomain: "VOTRE_AUTH_DOMAIN",
 *   projectId: "VOTRE_PROJECT_ID",
 *   storageBucket: "VOTRE_STORAGE_BUCKET",
 *   messagingSenderId: "VOTRE_SENDER_ID",
 *   appId: "VOTRE_APP_ID"
 * };
 *
 * const app = initializeApp(firebaseConfig);
 * export const db = getFirestore(app);
 *
 *
 *
 * {
 *   id: "auto-généré",
 *   sender: "Administration", // ou "Accueil", "Caisse"
 *   text: "Contenu du message",
 *   timestamp: firebase.firestore.FieldValue.serverTimestamp(), // pour l'ordre
 *   readBy: [] // tableau des IDs des utilisateurs qui ont lu le message
 * }
 *
 * import { useEffect, useRef, useState } from "react";
 * import { db } from "../firebase";
 * import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, arrayUnion } from "firebase/firestore";
 * // ... imports existants
 *
 * const DestiKForum = ({ currentUserService, currentUserId }) => {
 *   const [messages, setMessages] = useState([]);
 *   const [inputValue, setInputValue] = useState('');
 *   const messagesEndRef = useRef(null);
 *
 *   // Charger les messages en temps réel
 *   useEffect(() => {
 *     const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
 *     const unsubscribe = onSnapshot(q, (snapshot) => {
 *       const msgs = snapshot.docs.map(doc => ({
 *         id: doc.id,
 *         ...doc.data()
 *       }));
 *       setMessages(msgs);
 *     });
 *     return () => unsubscribe();
 *   }, []);
 *
 *   // Marquer les nouveaux messages comme lus par cet utilisateur
 *   useEffect(() => {
 *     if (!currentUserId) return;
 *     const unreadMessages = messages.filter(
 *       msg => !msg.readBy?.includes(currentUserId) && msg.sender !== currentUserService
 *     );
 *     unreadMessages.forEach(async (msg) => {
 *       await updateDoc(doc(db, "messages", msg.id), {
 *         readBy: arrayUnion(currentUserId)
 *       });
 *     });
 *   }, [messages, currentUserId, currentUserService]);
 *
 *   const handleSend = async () => {
 *     if (inputValue.trim() === '') return;
 *     await addDoc(collection(db, "messages"), {
 *       sender: currentUserService,
 *       text: inputValue,
 *       timestamp: serverTimestamp(),
 *       readBy: [] // personne ne l'a encore lu
 *     });
 *     setInputValue('');
 *   };
 *
 *   // ... reste du composant (affichage, getServiceIcon, etc.)
 *
 *   // hooks/useUnreadMessages.js
 * import { useState, useEffect } from "react";
 * import { db } from "../firebase";
 * import { collection, query, onSnapshot } from "firebase/firestore";
 *
 * export const useUnreadMessages = (userId, userService) => {
 *   const [unreadCount, setUnreadCount] = useState(0);
 *
 *   useEffect(() => {
 *     if (!userId) return;
 *     const q = query(collection(db, "messages"));
 *     const unsubscribe = onSnapshot(q, (snapshot) => {
 *       const count = snapshot.docs.filter(doc => {
 *         const data = doc.data();
 *         return !data.readBy?.includes(userId) && data.sender !== userService;
 *       }).length;
 *       setUnreadCount(count);
 *     });
 *     return () => unsubscribe();
 *   }, [userId, userService]);
 *
 *   return unreadCount;
 * };
 *
 * // Dans Accueil.jsx
 * import { useUnreadMessages } from "../hooks/useUnreadMessages";
 *
 * const Accueil = () => {
 *   const [users, setUsers] = useState([]);
 *   const currentUserId = users.id; // suppose que l'utilisateur a un id
 *   const unreadCount = useUnreadMessages(currentUserId, users.role);
 *
 *   // Dans le menu, ajoutez un indicateur à côté de l'icône forum
 *   const menuDatas = [
 *     // ... autres items
 *     { id: 'forum', icon: faCommentDots, label: 'forum', badge: unreadCount },
 *   ];
 *
 *   // Dans le rendu de la sidebar
 *   <Nav.Link>
 *     <FontAwesomeIcon icon={item.icon} />
 *     <span>{item.label}</span>
 *     {item.badge > 0 && <span className="badge bg-success ms-auto">{item.badge}</span>}
 *   </Nav.Link>
 *
 *   npm install react-toastify
 *
 *   import { toast } from 'react-toastify';
 *
 * // Dans le useEffect d'écoute des messages
 * useEffect(() => {
 *   const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
 *   const unsubscribe = onSnapshot(q, (snapshot) => {
 *     snapshot.docChanges().forEach((change) => {
 *       if (change.type === "added") {
 *         const newMsg = change.doc.data();
 *         // Si le message n'est pas de l'utilisateur courant
 *         if (newMsg.sender !== currentUserService) {
 *           toast.info(`${newMsg.sender} : ${newMsg.text.substring(0, 30)}...`);
 *         }
 *       }
 *     });
 *     // Mettre à jour la liste
 *     const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 *     setMessages(msgs);
 *   });
 *   return () => unsubscribe();
 * }, [currentUserService]);
 *
 * // Lors de la connexion, après avoir récupéré l'utilisateur
 * if (!localStorage.getItem('userId')) {
 *   localStorage.setItem('userId', 'user_' + Math.random().toString(36).substr(2, 9));
 * }
 * const currentUserId = localStorage.getItem('userId');
 *
 *
 * import { useEffect, useRef, useState } from "react";
 * import { db } from "../firebase";
 * import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, arrayUnion } from "firebase/firestore";
 * import { toast } from 'react-toastify';
 * import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 * import { faCashRegister, faCircle, faHospitalUser, faImage, faPaperPlane, faUserShield } from "@fortawesome/free-solid-svg-icons";
 * import Button from "../../administration/components/Button";
 * import '../components/style/DestiKForum.css';
 *
 * const DestiKForum = ({ currentUserService, currentUserId }) => {
 *   const [messages, setMessages] = useState([]);
 *   const [inputValue, setInputValue] = useState('');
 *   const messagesEndRef = useRef(null);
 *
 *   useEffect(() => {
 *     const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
 *     const unsubscribe = onSnapshot(q, (snapshot) => {
 *       snapshot.docChanges().forEach((change) => {
 *         if (change.type === "added") {
 *           const newMsg = change.doc.data();
 *           if (newMsg.sender !== currentUserService) {
 *             toast.info(`${newMsg.sender} : ${newMsg.text.substring(0, 30)}...`);
 *           }
 *         }
 *       });
 *       const msgs = snapshot.docs.map(doc => ({
 *         id: doc.id,
 *         ...doc.data()
 *       }));
 *       setMessages(msgs);
 *     });
 *     return () => unsubscribe();
 *   }, [currentUserService]);
 *
 *   // Marquer les messages comme lus
 *   useEffect(() => {
 *     if (!currentUserId) return;
 *     const unreadMessages = messages.filter(
 *       msg => !msg.readBy?.includes(currentUserId) && msg.sender !== currentUserService
 *     );
 *     unreadMessages.forEach(async (msg) => {
 *       await updateDoc(doc(db, "messages", msg.id), {
 *         readBy: arrayUnion(currentUserId)
 *       });
 *     });
 *   }, [messages, currentUserId, currentUserService]);
 *
 *   const scrollToBottom = () => {
 *     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 *   };
 *
 *   useEffect(() => {
 *     scrollToBottom();
 *   }, [messages]);
 *
 *   const handleSend = async () => {
 *     if (inputValue.trim() === '') return;
 *     await addDoc(collection(db, "messages"), {
 *       sender: currentUserService,
 *       text: inputValue,
 *       timestamp: serverTimestamp(),
 *       readBy: []
 *     });
 *     setInputValue('');
 *   };
 *
 *   const getServiceIcon = (service) => {
 *     if (service === 'Administration') return faUserShield;
 *     if (service === 'Caisse') return faCashRegister;
 *     return faHospitalUser;
 *   };
 *
 *   return (
 *     <div className="forum-container">
 *       <div className="forum-header">
 *         <h3><FontAwesomeIcon icon={faCircle} className="online-dot" /> Forum inter-services</h3>
 *         <span className="service-tag">{currentUserService}</span>
 *       </div>
 *       <div className="message-list">
 *         {messages.map((msg) => (
 *           <div key={msg.id} className={`message-wrapper ${msg.sender === currentUserService ? 'own' : ''}`}>
 *             <div className={`message-bubble ${msg.sender ? msg.sender.toLowerCase() : 'default'}`}>
 *               <div className="message-info">
 *                 <FontAwesomeIcon icon={getServiceIcon(msg.sender)} />
 *                 <span className="sender-name">{msg.sender}</span>
 *               </div>
 *               <p className="message-text">{msg.text}</p>
 *               <span className="message-time">{msg.time}</span>
 *             </div>
 *           </div>
 *         ))}
 *         <div ref={messagesEndRef} />
 *       </div>
 *       <div className="forum-input-area">
 *         <Button className="icon-btn"><FontAwesomeIcon icon={faImage} /></Button>
 *         <input
 *           type="text"
 *           placeholder="Écrire un message ici..."
 *           value={inputValue}
 *           onChange={(e) => setInputValue(e.target.value)}
 *           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
 *         />
 *         <Button className="send-btn" onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane} /></Button>
 *       </div>
 *     </div>
 *   );
 * };
 *
 * export default DestiKForum;
 * */
