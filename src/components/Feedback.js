import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from "../config/firebase";

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = auth?.currentUser?.email ?? "anonymous";
      const docRef = await addDoc(collection(db, 'feedback'), {
        userEmail,
        content: feedback,
        timestamp: new Date(),
      });
      console.log('Feedback submitted with ID: ', docRef.id);
      setFeedback('');
      setOpenDialog(true);
    } catch (error) {
      console.error('Error submitting feedback: ', error);
    }
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Feedback Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="feedback-input"
          label="Feedback"
          variant="outlined"
          value={feedback}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </form>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Feedback Submitted</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Thank you for your feedback!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Feedback;
