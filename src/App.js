import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Feedback from './components/Feedback';
import About from './components/About';
import SignIn from './components/SignIn';
// import KnowledgeTree from './components/KnowledgeTree';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Menu } from '@mui/material';
import { signOut_ as signOut } from './components/AuthFunctions.js';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createCheckoutSession } from './stripe/createCheckoutSession';
import { usePremiumStatus } from './stripe/usePremiumStatus';
import { AppBlocking } from '@mui/icons-material';
import Stripe from 'stripe';
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import Python from './components/languages/Python';
import { Provider } from "react-redux";
import KnowledgeTreeWrapper from "./components/KnowledgeTreeWrapper";
import store from "./store";
import TestingEnv from './components/TestingEnv';


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

  // State for menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userisPremium = usePremiumStatus(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Teacher GPT
          </Typography>
        {/* Main Navigation Buttons */}
          {/* <Button color="inherit" onClick={handleMenuOpen}>
            Languages 🔽
          </Button> */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/python" onClick={handleMenuClose}>
              Python
            </MenuItem>
          </Menu>
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
            <Route path="/" element={<KnowledgeTreeWrapper />} />
            {/* <Route path="/" element={ <TestingEnv />} /> */}
            <Route path="/python" element={<Python />} />
            <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;