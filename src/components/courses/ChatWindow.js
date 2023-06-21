import React, { useState, useRef, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import ChatUI from '../ChatUI';
import { callOpenAIAPIFunctions } from './CallOpenAIAPI';

const exampleMessages = [
  { role: 'user', content: 'Hi, how are you?' },
  { role: 'assistant', content: 'Bot is typing...' },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState(exampleMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessage = async () => {
    // Call the OpenAI API to get a response
    const response = await callOpenAIAPIFunctions(messages, "gpt-3.5-turbo");

    // Add the response to the conversation
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
      { role: 'assistant', content: response },
    ];
    setMessages(newMessages);
    setNewMessage('');
  };

  return (
    <Container>
      <ChatUI messages={messages}/>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: '50px', marginLeft: '20px' }}>
        <Grid item xs={9}>
          <TextField
            label="Type your message"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleNewMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatWindow;