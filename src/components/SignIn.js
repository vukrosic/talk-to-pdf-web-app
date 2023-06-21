import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const provider = new GoogleAuthProvider();
auth.languageCode = 'it';


function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            const docRef = doc(collection(db, 'users'), user.uid);
    
            const docSnapshot = await getDoc(docRef);
            if (!docSnapshot.exists()) {
                // Account is created for the first time
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    providerId: user.providerId,
                    photoURL: user.photoURL,
                    freeTrial: 15,
                    knowledgeTree: '[ { "id": "Computer Science", "branchingTopics": [ { "id": "Programming Languages", "branchingTopics": [ { "id": "Python", "branchingTopics": [] }, { "id": "Javascript", "branchingTopics": [] } ] } ] } ]',
                    messagesStore: ""
                };
                await setDoc(docRef, userData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            const docRef = doc(collection(db, 'users'), user.uid);
    
            const docSnapshot = await getDoc(docRef);
            if (!docSnapshot.exists()) {
                // Account is created for the first time
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    providerId: user.providerId,
                    photoURL: user.photoURL,
                    freeTrial: 15,
                    knowledgeTree: '[ { "id": "Computer Science", "branchingTopics": [ { "id": "Programming Languages", "branchingTopics": [ { "id": "Python", "branchingTopics": [] }, { "id": "Javascript", "branchingTopics": [] } ] } ] } ]',
                    messagesStore: ""
                };
                await setDoc(docRef, userData);
            } 
        } catch (error) {
            console.log(error);
        }
    };


    const signOut_ = async () => {
        try{
            await signOut(auth);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card mt-5">
                <div className="card-body">
                    <h1 className="text-center mb-4">Login / Register</h1>
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <button onClick={signIn} className="btn btn-primary btn-block">Sign in</button>
                    <button onClick={signInWithGoogle} className="btn btn-danger btn-block mt-2">Sign in with google</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Auth;