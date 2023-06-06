import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
} from 'firebase/firestore';

const levels = [
  { level: 'beginner', label: 'Beginner' },
  { level: 'intermediate', label: 'Intermediate' },
  { level: 'advanced', label: 'Advanced' },
];

const QuestionsForm = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [level, setLevel] = useState('');
  const [languages, setLanguages] = useState('');
  const [interestedLanguages, setInterestedLanguages] = useState('');
  const [shortTermGoals, setShortTermGoals] = useState('');
  const [longTermGoals, setLongTermGoals] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in to submit the answers.');
      return;
    }

    await setDoc(doc(collection(db, 'users'), user.uid), {
      level,
      languages,
      interestedLanguages,
      shortTermGoals,
      longTermGoals,
    });

    alert('Your answers have been submitted successfully.');
  };

  const questionComponents = [
    <TextField
      fullWidth
      select
      value={level}
      label="What is your current programming skill level (beginner, intermediate, advanced)?"
      variant="outlined"
      onChange={(e) => setLevel(e.target.value)}
    >
      {levels.map((option) => (
        <MenuItem key={option.level} value={option.level}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>,
    <TextField
      fullWidth
      label="What programming languages, if any, are you familiar with?"
      variant="outlined"
      value={languages}
      onChange={(e) => setLanguages(e.target.value)}
    />,
    <TextField
      fullWidth
      label="Which programming language(s) are you interested in learning or improving your skills in?"
      variant="outlined"
      value={interestedLanguages}
      onChange={(e) => setInterestedLanguages(e.target.value)}
    />,
    <TextField
      fullWidth
      label="Are there any specific areas you'd like to focus on (e.g., web development, data science, machine learning, etc.)?"
      variant="outlined"
      value={shortTermGoals}
      onChange={(e) => setShortTermGoals(e.target.value)}
    />,
    <TextField
      fullWidth
      label="What are your short-term and long-term goals related to programming?"
      variant="outlined"
      value={longTermGoals}
      onChange={(e) => setLongTermGoals(e.target.value)}
    />,
  ];

  return (
    <Box
      m={3}
      noValidate
      autoComplete="off"
    >
      <Stepper activeStep={currentQuestion} alternativeLabel>
        {questionComponents.map((_, index) => (
          <Step key={index}>
            <StepLabel>{`Question ${index + 1}`}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {questionComponents[currentQuestion]}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
            }}
            disabled={currentQuestion === 0}
          >
            Back
          </Button>
          {currentQuestion === questionComponents.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (currentQuestion < questionComponents.length - 1)
                  setCurrentQuestion(currentQuestion + 1);
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionsForm;