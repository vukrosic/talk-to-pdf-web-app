import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Feedback from './components/Feedback';
import SignIn from './components/SignIn';
import TeachGPT from './components/TeachGPT';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { signOut_ as signOut } from './components/AuthFunctions.js';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createCheckoutSession } from './stripe/createCheckoutSession';
import { usePremiumStatus } from './stripe/usePremiumStatus';
import { AppBlocking } from '@mui/icons-material';
import Stripe from 'stripe';
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';


function Navigation({ user }) {
  const readData = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) { 
        console.log("Document data:", docSnap.data().stripeId);
        return docSnap.data().stripeId;
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  async function handleManageBilling() {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;

    const stripeID = await readData();
    try {
      const stripe = Stripe('sk_test_51MBmbKKEQZnOTK3DkJ9kd4xmMSBldLb2aPXhJzmKuIkiL9dGWCka6JezH1dRHDJS5sOKr0VlsW3pWVo8DX4emhT8002KxkxVKj');
  
      // Create a customer portal session
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeID,
        return_url: baseUrl,
      });
  
      // Redirect the user to the customer portal session
      window.location = session.url;
    } catch (err) {
      console.error(err);
      alert('Error creating customer portal session');
    }
  }

  const userisPremium = usePremiumStatus(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Teacher GPT
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home 
          </Button>
          <Button color="inherit" component={Link} to="/feedback">
            Feedback 
          </Button>
          {user ? (
            <div>
              {userisPremium ? (
                <div>
                <Button color="inherit" onClick={handleManageBilling}>
                  Manage subscription 
                </Button>
                <Button color="inherit" onClick={signOut}>
                  Sign Out 
                </Button>
                </div>
              ) : (
                <div>
                <Button

                  color="inherit"
                  onClick={() => createCheckoutSession(user.uid)}
                >
                  Get Premium 
                </Button>
                <Button color="inherit" onClick={signOut}>
                  Sign Out 
                </Button>
              </div>
              )}
              
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Router>
          <Navigation user={user} />
          <Routes>
            <Route path="/" element={<TeachGPT />} />
            <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;