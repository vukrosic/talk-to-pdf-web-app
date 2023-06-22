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
import CourseCreator from './components/courses/CourseCreator/CourseCreator'
import MyCourses from './components/courses/MyCourses';
import CourseOverview from './components/courses/CourseOverview';
import BrowseCoursesPage from './components/courses/BrowseCoursesPage';
import AddCrouse from './components/courses/CourseCreator/AddCourse';
import CourseDetailesPage from './components/courses/CourseDetailsPage';
import CourseViewer from './components/courses/CourseViewer';

function Navigation({ user }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ./GPTeach
          </Typography>
            <Button color="inherit" component={Link} to="/"/>
            <Button color="inherit" component={Link} to="/course-viewer"/>
            <Button color="inherit" component={Link} to="/course-creator"/>
            <Button color="inherit" component={Link} to="/add-course"/>
            <Button color="inherit" component={Link} to="/browse-courses"/>
            <Button color="inherit" component={Link} to="/mycourses"/>
            <Button color="inherit" component={Link} to="/python"/>
            <Button color="inherit" component={Link} to="/feedback"/>
            <Button color="inherit" component={Link} to="/about"/>
            <Button color="inherit" component={Link} to="/knowledgeTree"/>

          {user ? (
            <div>
              <Button color="inherit" component={Link} to="/"> Home </Button>
              <Button color="inherit" component={Link} to="/course-viewer"> Course Viewer </Button>
              <Button color="inherit" component={Link} to="/course-creator"> Course Creator </Button>
              <Button color="inherit" component={Link} to="/mycourses">My Courses</Button>
              <Button color="inherit" component={Link} to="/about"> About </Button>
              <Button color="inherit" component={Link} to="/feedback"> Feedback </Button>
              <Button color="inherit" component={Link} to="/add-course"> Add Course </Button>
              <Button color="inherit" component={Link} to="/knowledgeTree"> Knowledge Tree </Button>
              <Button color="inherit" onClick={signOut}>
                  Sign Out 
              </Button>
              
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/"> Home </Button>
              <Button color="inherit" component={Link} to="/course-viewer"> Course Viewer </Button>
              <Button color="inherit" component={Link} to="/course-creator"> Course Creator </Button>
              <Button color="inherit" component={Link} to="/mycourses">My Courses</Button>
              <Button color="inherit" component={Link} to="/about"> About </Button>
              <Button color="inherit" component={Link} to="/feedback"> Feedback </Button>
              <Button color="inherit" component={Link} to="/add-course"> Add Course </Button>
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
            <Route path="/" element={<BrowseCoursesPage />} />
            <Route path="/course-viewer" element={<CourseViewer />} />
            <Route path="/create" element={<AddCrouse />} />
            <Route path="/course-creator" element={<CourseCreator />} />
            <Route path="/courses/:id" element={<CourseDetailesPage />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/python" element={<Python />} />
            <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-course" element={<AddCrouse />} />
            <Route path="/knowledgeTree" element={<KnowledgeTreeWrapper />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;