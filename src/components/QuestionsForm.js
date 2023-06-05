import React, { useState } from 'react';
import { Button, TextField, MenuItem, Typography, Box } from '@mui/material';
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

  return (
    <Box
      component="form"
      m={3}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        select
        value={level}
        label="What is your current programming skill level (beginner, intermediate, advanced)?"
        variant="outlined"
        onChange={(e) => setLevel(e.target.value)}
        sx={{ mt: 2 }}
      >
        {levels.map((option) => (
          <MenuItem key={option.level} value={option.level}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="What programming languages, if any, are you familiar with?"
        variant="outlined"
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Which programming language(s) are you interested in learning or improving your skills in?"
        variant="outlined"
        value={interestedLanguages}
        onChange={(e) => setInterestedLanguages(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Are there any specific areas you'd like to focus on (e.g., web development, data science, machine learning, etc.)?"
        variant="outlined"
        value={shortTermGoals}
        onChange={(e) => setShortTermGoals(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="What are your short-term and long-term goals related to programming?"
        variant="outlined"
        value={longTermGoals}
        onChange={(e) => setLongTermGoals(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default QuestionsForm;