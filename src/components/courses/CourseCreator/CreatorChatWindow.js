import React, { useState, useRef, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, CircularProgress } from '@mui/material';
import ChatUI from '../../ChatUI';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { callOpenAIAPI } from '../CallOpenAIAPI';
import { db } from '../../../config/firebase';

const ChatWindow = ({ lesson, task }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [addedNewMessage, setAddedNewMessage] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  useEffect(() => {
    if (lesson && task) {
      // Update messages when lesson and task are defined
      setMessages([
        { role: 'system', content: lesson + " IMPORTANT: do not solve the task for user, but just give him hints." },
        { role: 'assistant', content: "I am here to help you. Ask me any questions about the lesson or the task."}
      ]);
    }
  }, [lesson, task]);

  const saveFeedback = async (role, content) => {
    const userRef = doc(db, 'feedback', 'lesson-editor-chat:chat');
  
    // Retrieve the current messages array from the Firestore document
    const docSnap = await getDoc(userRef);
    const currentMessages = docSnap.exists() ? docSnap.data().messages : [];
  
    // Create the new message string with role and content
    const newMessage = `${role}: ${content}`;
  
    // Concatenate the new message with the current messages array
    const newMessages = [...currentMessages, newMessage];
  
    // Update the Firestore document with the updated messages array
    await updateDoc(userRef, { messages: newMessages });
  };
  
      



  const addNewMessage = async (role, content, updateLast = false) => {
    let newMessages;
    saveFeedback(role, content); // Save user's message
    
    if (updateLast) {
      const updatedMessages = [...messages];
      const lastMessageIndex = updatedMessages.length - 1;

      if (lastMessageIndex >= 0) {
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          content: content,
        };
      }

      newMessages = updatedMessages;
    } else {
      newMessages = [
        ...messages,
        { role: role, content: content }
      ];
    }

    setMessages(newMessages);
    setNewMessage('');
    setAddedNewMessage(!addedNewMessage);
  };

  useEffect(() => {
    const fetchResponse = async () => {
      if (addedNewMessage) {
        setIsWaitingResponse(true); // Set the waiting state before making the API call
        const response = await callOpenAIAPI(messages, "gpt-3.5-turbo", addNewMessage);
        setIsWaitingResponse(false); // Reset the waiting state after receiving the response
        addNewMessage('assistant', response, false);
      }
    };

    fetchResponse();
  }, [addedNewMessage]);

  // Render null if lesson or task is undefined
  if (!lesson || !task) {
    return null;
  }

  return (
    <Container>
      <ChatUI messages={messages} />
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginTop: '50px', marginLeft: '20px' }}
      >
        <Grid item xs={9}>
          <TextField
            label="Type your message"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={() => {addNewMessage("user", newMessage, false)}}>
            Send
          </Button>
        </Grid>
      </Grid>
      {isWaitingResponse ? (
        <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
          <CircularProgress size={20} /> ChatGPT is typing...
        </Typography>
      ) : (null)}
    </Container>
  );
};

export default ChatWindow;
