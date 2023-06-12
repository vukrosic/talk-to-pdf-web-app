import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Feedback from './components/Feedback';
import About from './components/About';
import SignIn from './components/SignIn';
import KnowledgeTree from './components/KnowledgeTree';
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
import MindMap from './components/MindMap';


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
            {/* <MenuItem component={Link} to="/java" onClick={handleMenuClose}>
              Java
            </MenuItem>
            <MenuItem component={Link} to="/javascript" onClick={handleMenuClose}>
              JavaScript
            </MenuItem>
            <MenuItem component={Link} to="/c" onClick={handleMenuClose}>
              C
            </MenuItem>
            <MenuItem component={Link} to="/cpp" onClick={handleMenuClose}>
              C++
            </MenuItem>
            <MenuItem component={Link} to="/go" onClick={handleMenuClose}>
              Go
            </MenuItem>
            <MenuItem component={Link} to="/csharp" onClick={handleMenuClose}>
              C#
            </MenuItem>
            <MenuItem component={Link} to="/ruby" onClick={handleMenuClose}>
              Ruby
            </MenuItem>
            <MenuItem component={Link} to="/swift" onClick={handleMenuClose}>
              Swift
            </MenuItem>
            <MenuItem component={Link} to="/kotlin" onClick={handleMenuClose}>
              Kotlin
            </MenuItem>
            <MenuItem component={Link} to="/rust" onClick={handleMenuClose}>
              Rust
            </MenuItem>
            <MenuItem component={Link} to="/php" onClick={handleMenuClose}>
              PHP
            </MenuItem>
            <MenuItem component={Link} to="/sql" onClick={handleMenuClose}>
              SQL
            </MenuItem>
            <MenuItem component={Link} to="/typescript" onClick={handleMenuClose}>
              TypeScript
            </MenuItem>
            <MenuItem component={Link} to="/react" onClick={handleMenuClose}>
              React
            </MenuItem>
            <MenuItem component={Link} to="/svelte" onClick={handleMenuClose}>
              Svelte
            </MenuItem>
            <MenuItem component={Link} to="/nodejs" onClick={handleMenuClose}>
              Node.js
            </MenuItem>
            <MenuItem component={Link} to="/r" onClick={handleMenuClose}>
              R
            </MenuItem>
            <MenuItem component={Link} to="/matlab" onClick={handleMenuClose}>
              MATLAB
            </MenuItem>
            <MenuItem component={Link} to="/perl" onClick={handleMenuClose}>
              Perl
            </MenuItem>
            <MenuItem component={Link} to="/scala" onClick={handleMenuClose}>
              Scala
            </MenuItem>
            <MenuItem component={Link} to="/dart" onClick={handleMenuClose}>
              Dart
            </MenuItem>
            <MenuItem component={Link} to="/objc" onClick={handleMenuClose}>
              Objective-C
            </MenuItem>
            <MenuItem component={Link} to="/julia" onClick={handleMenuClose}>
              Julia
            </MenuItem>
            <MenuItem component={Link} to="/lua" onClick={handleMenuClose}>
              Lua
            </MenuItem>
            <MenuItem component={Link} to="/html" onClick={handleMenuClose}>
              HTML
            </MenuItem>
            <MenuItem component={Link} to="/css" onClick={handleMenuClose}>
              CSS
            </MenuItem>
            <MenuItem component={Link} to="/erlang" onClick={handleMenuClose}>
              Erlang
            </MenuItem>
            <MenuItem component={Link} to="/groovy" onClick={handleMenuClose}>
              Groovy
            </MenuItem> */}
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
            <Route path="/" element={<KnowledgeTree />} />
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