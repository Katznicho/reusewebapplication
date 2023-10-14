import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: 'AIzaSyDnpNDu2bgT553XvYMntx5B0HD3fKzyD0A',
  authDomain: 'reuse-f0081.firebaseapp.com',
  projectId: 'reuse-f0081',
  storageBucket: 'reuse-f0081.appspot.com',
  messagingSenderId: '51604544208',
  appId: '1:51604544208:web:a0dad3a15c405bb4221cd5',
  measurementId: 'G-Q3TLHLZN75'
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

export const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};



