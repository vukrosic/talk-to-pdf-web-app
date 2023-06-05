import React, { useState } from 'react';
import { callOpenAIAPI } from './CallOpenAIAPI';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TeachGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const response = await callOpenAIAPI(updatedMessages, 'gpt-3.5-turbo');
      const aiMessage = { role: 'assistant', content: response };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error while calling OpenAI API:', error);
    }

    setInput('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          overflowY: 'scroll',
        }}
      >
        {messages.map((message, index) => (
          <Typography
            key={index}
            sx={{
              my: 1,
              mx: message.role === 'user' ? 'auto' : 'inherit',
              textAlign: message.role === 'user' ? 'right' : 'left',
            }}
          >
            {message.role === 'assistant' ? 'AI: ' : 'You: '}
            {message.content}
          </Typography>
        ))}
      </Box>
      <Box sx={{ width: '100%', mt: 2 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Your message"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!input}
      >
        Send
      </Button>
    </Box>
  );
};

export default TeachGPT;