import React, { useState } from 'react';
import { Container, Grid, Typography, TextareaAutosize, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatWindow from './ChatWindow';
import TerminalOutput from './TerminalOutput';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CodeEditor = ({ code, setCode }) => {
  const [output, setOutput] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };
  
  const runCode = () => {
    const logs = [];
    
    // Override console.log to capture the logged messages
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(arg => JSON.stringify(arg)).join(' '));
    };
  
    try {
      // Use eval to execute the code
      eval(code);
      
      // Set the output to the captured logged messages
      setOutput(logs.join('\n'));
    } catch (error) {
      console.error('Error:', error);
      setOutput(`Error: ${error.message}`);
    } finally {
      // Restore the original console.log function
      console.log = originalConsoleLog;
    }
  };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Enter your JavaScript code:
            </Typography>
            <TextareaAutosize
              value={code}
              onChange={handleCodeChange}
              rows={10}
              style={{
                width: '100%',
                height: '60vh',
                backgroundColor: '#303030',
                color: 'white',
                padding: '1rem',
                fontSize: '1rem',
                fontFamily: 'Monospace'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={runCode} variant="contained" color="primary">Run</Button>
          </Grid>
          <Grid item xs={12}>
            <TerminalOutput output={output} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CodeEditor;