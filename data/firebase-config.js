// firebaseConfig.js
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCnap9_fjFIGg_r-IahxtgmojFudrHcRtg",
    authDomain: "routine-tracker-ad5cb.firebaseapp.com",
    projectId: "routine-tracker-ad5cb",
    storageBucket: "routine-tracker-ad5cb.firebasestorage.app",
    messagingSenderId: "41971045008",
    appId: "1:41971045008:web:ff291e16223bf925d0fe15"
};

const app = initializeApp(firebaseConfig);

export default app;



export const db = getFirestore(app);