// firebaseConfig.js
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);

export default app;



export const db = getFirestore(app);