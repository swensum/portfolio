// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection name for testimonials
const TESTIMONIALS_COLLECTION = 'testimonials';

// Export functions
export const getTestimonials = async () => {
  try {
    const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
    const q = query(testimonialsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const testimonials = [];
    querySnapshot.forEach((doc) => {
      testimonials.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const addTestimonial = async (testimonialData) => {
  try {
    const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
    const docRef = await addDoc(testimonialsRef, {
      ...testimonialData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
};

export default db;