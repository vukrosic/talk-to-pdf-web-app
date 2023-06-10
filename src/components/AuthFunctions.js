import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
auth.languageCode = 'it';

export const signIn = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
}

export const signInWithGoogle = async () => {
    try {
        signInWithPopup(auth, provider)
    } catch (error) {
        console.log(error);
    }
}

export const signOut_ = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}