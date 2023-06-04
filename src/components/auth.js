import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const provider = new GoogleAuthProvider();
auth.languageCode = 'it';


function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(error){
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try{
            signInWithPopup(auth, provider)
        }
        catch(error){
            console.log(error);
        };
    }

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
                    <h1 className="text-center mb-4">Login</h1>
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
                    <button onClick={signInWithGoogle} className="btn btn-secondary btn-block mt-2">Sign in with google</button>
                    <button onClick={signOut_} className="btn btn-danger btn-block mt-2">Sign out</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Auth;