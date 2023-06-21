import React from 'react';
import { Typography } from '@mui/material';

const TerminalOutput = ({ output }) => {
  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        color: 'white',
        padding: '1rem',
        fontFamily: 'Monospace',
        whiteSpace: 'pre-wrap',
      }}
    >
      <Typography variant="body1">{output}</Typography>
    </div>
  );
};

export default TerminalOutput;