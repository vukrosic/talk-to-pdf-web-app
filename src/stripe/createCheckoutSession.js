import initializeStripe from './initializeStripe';
import { db } from '../config/firebase';
import { collection, query, onSnapshot, orderBy, addDoc, doc, getFirestore } from 'firebase/firestore';

export async function createCheckoutSession(uid) {
  try {
    const userCollection = collection(db, 'users');
    const userDoc = doc(userCollection, uid);
    const checkoutSessionsCollection = collection(userDoc, 'checkout_sessions');
    
    const checkoutSessionRef = await addDoc(checkoutSessionsCollection, {
      price: 'price_1NHDABKEQZnOTK3Dec3biZo5',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(checkoutSessionRef, async (snap) => {
      const { sessionId } = snap.data();

      if (sessionId) {
        const stripe = await initializeStripe();
        stripe.redirectToCheckout({ sessionId });
      }
    });

  } catch (error) {
    console.error("Error creating checkout session: ", error);
  }
}