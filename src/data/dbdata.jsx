// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
    appId: process.env.APP_APP_ID,
};

/**
 *
 * import React, { useState, useEffect } from 'react';
 * import { db } from './firebase';
 * import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
 *
 * function ItemList() {
 *   const [items, setItems] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState(null);
 *
 *   useEffect(() => {
 *     const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
 *
 *     // onSnapshot établit une écoute en temps réel
 *     const unsubscribe = onSnapshot(q, (querySnapshot) => {
 *       const fetchedItems = [];
 *       querySnapshot.forEach((doc) => {
 *         fetchedItems.push({ id: doc.id, ...doc.data() });
 *       });
 *       setItems(fetchedItems);
 *       setLoading(false);
 *     }, (err) => {
 *       setError('Erreur lors du chargement des articles : ' + err.message);
 *       setLoading(false);
 *       console.error('Erreur Firestore : ', err);
 *     });
 *
 *     // C'est très important : se désabonner de l'écoute quand le composant est démonté
 *     return () => unsubscribe();
 *   }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage
 *
 *   if (loading) return <p>Chargement des articles...</p>;
 *   if (error) return <p style={{ color: 'red' }}>{error}</p>;
 *   if (items.length === 0) return <p>Aucun article à afficher.</p>;
 *
 *   return (
 *     <div>
 *       <h2>Liste des articles</h2>
 *       <ul>
 *         {items.map((item) => (
 *           <li key={item.id}>
 *             <strong>{item.name}</strong>: {item.description}
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 * export default ItemList;
 *
 *
 * import React, { useState } from 'react';
 * import { db } from './firebase'; // Importez l'instance db
 * import { collection, addDoc } from 'firebase/firestore';
 *
 * function AddItemForm() {
 *   const [itemName, setItemName] = useState('');
 *   const [itemDescription, setItemDescription] = useState('');
 *   const [loading, setLoading] = useState(false);
 *   const [error, setError] = useState(null);
 *   const [success, setSuccess] = useState(false);
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     setLoading(true);
 *     setError(null);
 *     setSuccess(false);
 *
 *     try {
 *       // 'items' est le nom de la collection où vous voulez stocker vos données
 *       await addDoc(collection(db, 'items'), {
 *         name: itemName,
 *         description: itemDescription,
 *         createdAt: new Date(),
 *       });
 *       setItemName('');
 *       setItemDescription('');
 *       setSuccess(true);
 *       console.log('Document ajouté avec succès !');
 *     } catch (e) {
 *       setError('Erreur lors de l\'ajout du document : ' + e.message);
 *       console.error('Erreur lors de l\'ajout du document : ', e);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <h2>Ajouter un nouvel article</h2>
 *       {error && <p style={{ color: 'red' }}>{error}</p>}
 *       {success && <p style={{ color: 'green' }}>Article ajouté !</p>}
 *       <div>
 *         <label htmlFor="itemName">Nom de l'article :</label>
 *         <input
 *           id="itemName"
 *           type="text"
 *           value={itemName}
 *           onChange={(e) => setItemName(e.target.value)}
 *           required
 *         />
 *       </div>
 *       <div>
 *         <label htmlFor="itemDescription">Description :</label>
 *         <textarea
 *           id="itemDescription"
 *           value={itemDescription}
 *           onChange={(e) => setItemDescription(e.target.value)}
 *           required
 *         />
 *       </div>
 *       <button type="submit" disabled={loading}>
 *         {loading ? 'Ajout en cours...' : 'Ajouter'}
 *       </button>
 *     </form>
 *   );
 * }
 *
 * export default AddItemForm;
 *
 * import React, { useState, useEffect } from 'react';
 * import { db } from './firebase';
 * import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
 *
 * function ItemList() {
 *   const [items, setItems] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState(null);
 *
 *   useEffect(() => {
 *     const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
 *
 *     // onSnapshot établit une écoute en temps réel
 *     const unsubscribe = onSnapshot(q, (querySnapshot) => {
 *       const fetchedItems = [];
 *       querySnapshot.forEach((doc) => {
 *         fetchedItems.push({ id: doc.id, ...doc.data() });
 *       });
 *       setItems(fetchedItems);
 *       setLoading(false);
 *     }, (err) => {
 *       setError('Erreur lors du chargement des articles : ' + err.message);
 *       setLoading(false);
 *       console.error('Erreur Firestore : ', err);
 *     });
 *
 *     // C'est très important : se désabonner de l'écoute quand le composant est démonté
 *     return () => unsubscribe();
 *   }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage
 *
 *   if (loading) return <p>Chargement des articles...</p>;
 *   if (error) return <p style={{ color: 'red' }}>{error}</p>;
 *   if (items.length === 0) return <p>Aucun article à afficher.</p>;
 *
 *   return (
 *     <div>
 *       <h2>Liste des articles</h2>
 *       <ul>
 *         {items.map((item) => (
 *           <li key={item.id}>
 *             <strong>{item.name}</strong>: {item.description}
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 * export default ItemList;
 *
 *
 * import React, { useState } from 'react';
 * import { db } from './firebase'; // Importez l'instance db
 * import { collection, addDoc } from 'firebase/firestore';
 *
 * function AddItemForm() {
 *   const [itemName, setItemName] = useState('');
 *   const [itemDescription, setItemDescription] = useState('');
 *   const [loading, setLoading] = useState(false);
 *   const [error, setError] = useState(null);
 *   const [success, setSuccess] = useState(false);
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     setLoading(true);
 *     setError(null);
 *     setSuccess(false);
 *
 *     try {
 *       // 'items' est le nom de la collection où vous voulez stocker vos données
 *       await addDoc(collection(db, 'items'), {
 *         name: itemName,
 *         description: itemDescription,
 *         createdAt: new Date(),
 *       });
 *       setItemName('');
 *       setItemDescription('');
 *       setSuccess(true);
 *       console.log('Document ajouté avec succès !');
 *     } catch (e) {
 *       setError('Erreur lors de l\'ajout du document : ' + e.message);
 *       console.error('Erreur lors de l\'ajout du document : ', e);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <h2>Ajouter un nouvel article</h2>
 *       {error && <p style={{ color: 'red' }}>{error}</p>}
 *       {success && <p style={{ color: 'green' }}>Article ajouté !</p>}
 *       <div>
 *         <label htmlFor="itemName">Nom de l'article :</label>
 *         <input
 *           id="itemName"
 *           type="text"
 *           value={itemName}
 *           onChange={(e) => setItemName(e.target.value)}
 *           required
 *         />
 *       </div>
 *       <div>
 *         <label htmlFor="itemDescription">Description :</label>
 *         <textarea
 *           id="itemDescription"
 *           value={itemDescription}
 *           onChange={(e) => setItemDescription(e.target.value)}
 *           required
 *         />
 *       </div>
 *       <button type="submit" disabled={loading}>
 *         {loading ? 'Ajout en cours...' : 'Ajouter'}
 *       </button>
 *     </form>
 *   );
 * }
 *
 * export default AddItemForm;*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);