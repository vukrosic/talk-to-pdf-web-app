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
import GetUserTreeDataFromDatabase from './components/GetUserTreeDataFromDatabase';
import LessonUI from './components/courses/LessonUI';
import CourseCreator from './components/courses/CourseCreator/CourseEditor'
import MyCourses from './components/courses/MyCourses';
import CourseOverview from './components/courses/CourseOverview';
import BrowseCoursesPage from './components/courses/BrowseCoursesPage';
import AddCrouse from './components/courses/CourseCreator/AddCourse';

function Navigation({ user }) {
  // const readData = async () => {
  //   try {
  //     const docRef = doc(db, "users", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if(docSnap.exists()) { 
  //       console.log("Document data:", docSnap.data().stripeId);
  //       return docSnap.data().stripeId;
  //     } else {
  //       console.log("Document does not exist");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  // async function handleManageBilling() {
  //   const baseUrl = `${window.location.protocol}//${window.location.host}`;

  //   const stripeID = await readData();
  //   try {
  //     const stripe = Stripe('sk_test_51MBmbKKEQZnOTK3DkJ9kd4xmMSBldLb2aPXhJzmKuIkiL9dGWCka6JezH1dRHDJS5sOKr0VlsW3pWVo8DX4emhT8002KxkxVKj');
  
  //     // Create a customer portal session
  //     const session = await stripe.billingPortal.sessions.create({
  //       customer: stripeID,
  //       return_url: baseUrl,
  //     });
  
  //     // Redirect the user to the customer portal session
  //     window.location = session.url;
  //   } catch (err) {
  //     console.error(err);
  //     alert('Error creating customer portal session');
  //   }
  // }

  // State for menu anchor element
  // const [anchorEl, setAnchorEl] = useState(null);

  // // Open the menu
  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // // Close the menu
  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const userisPremium = usePremiumStatus(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ./SkoolGPT
          </Typography>
            <Button color="inherit" component={Link} to="/"/>
            <Button color="inherit" component={Link} to="/add-course"/>
            <Button color="inherit" component={Link} to="/browse-courses"/>
            <Button color="inherit" component={Link} to="/create"/>
            <Button color="inherit" component={Link} to="/mycourses"/>
            <Button color="inherit" component={Link} to="/course-overview"/>
            <Button color="inherit" component={Link} to="/python"/>
            <Button color="inherit" component={Link} to="/feedback"/>
            <Button color="inherit" component={Link} to="/about"/>
            <Button color="inherit" component={Link} to="/knowledgeTree"/>

          {user ? (
            <div>
              {/* {userisPremium ? (
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
              )} */}
              <Button color="inherit" component={Link} to="/"> Home </Button>
              <Button color="inherit" component={Link} to="/add-course"> Add Course </Button>
              <Button color="inherit" component={Link} to="/browse-courses">Browse Courses</Button>
              <Button color="inherit" component={Link} to="/create"> Create </Button>
              <Button color="inherit" component={Link} to="/mycourses">My Courses</Button>
              <Button color="inherit" component={Link} to="/course-overview">Course Overview</Button>
              <Button color="inherit" component={Link} to="/about"> About </Button>
              <Button color="inherit" component={Link} to="/feedback"> Feedback </Button>
              <Button color="inherit" component={Link} to="/knowledgeTree"> Knowledge Tree </Button>
              <Button color="inherit" onClick={signOut}>
                  Sign Out 
              </Button>
              
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/"> Home </Button>
              <Button color="inherit" component={Link} to="/add-course"> Add Course </Button>
              <Button color="inherit" component={Link} to="/browse-courses">Browse Courses</Button>
              <Button color="inherit" component={Link} to="/create"> Create </Button>
              <Button color="inherit" component={Link} to="/mycourses">My Courses</Button>
              <Button color="inherit" component={Link} to="/course-overview">Course Overview</Button>
              <Button color="inherit" component={Link} to="/about"> About </Button>
              <Button color="inherit" component={Link} to="/feedback"> Feedback </Button>
              <Button color="inherit" component={Link} to="/knowledgeTree"> Knowledge Tree </Button>
              <Button color="inherit" component={Link} to="/signin">
                Sign In
              </Button>
            </div>
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
            <Route path="/" element={<LessonUI />} />
            <Route path="/add-course" element={<AddCrouse />} />
            <Route path="/browse-courses" element={<BrowseCoursesPage />} />
            <Route path="/create" element={<CourseCreator />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/course-overview" element={<CourseOverview />} />
            {/* <Route path="/" element={ <TestingEnv />} /> */}
            <Route path="/python" element={<Python />} />
            <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
            <Route path="/knowledgeTree" element={<KnowledgeTreeWrapper />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;