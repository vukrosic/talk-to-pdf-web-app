import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Feedback from './components/Feedback';
import ChatUI from './components/ChatUI';
import Auth from './components/Auth';
import { db } from './config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import QuestionsForm from './components/QuestionsForm';
import TeachGPT from './components/TeachGPT';
import CurriculumBuilder from './components/CurriculumBuilder';
import QnACodeSnippet from './components/QnACodeSnippet';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import LandingPage from './components/LandingPage';

function Navigation() {
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
          <Button color="inherit" component={Link} to="/curriculum">
            Curriculum Builder
          </Button>
          <Button color="inherit" component={Link} to="/TeachGPT">
          TeachGPT
          </Button>
          <Button color="inherit" component={Link} to="/feedback">
            Feedback
          </Button>
          <Button color="inherit" component={Link} to="/auth">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/LandingPage">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/"/>
          <Route path="/auth" element={<Auth />} />
          <Route path="/curriculum" element={<CurriculumBuilder />} />
          <Route path="/qnacodesnippet" element={<QnACodeSnippet />} />
          <Route path="/TeachGPT" element={<TeachGPT />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/LandingPage" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;