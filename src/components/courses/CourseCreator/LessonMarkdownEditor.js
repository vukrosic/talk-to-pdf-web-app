import React from 'react';
import { Container, Grid, Typography, TextField, TextareaAutosize } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LessonMarkdownEditor = ({ markdown, setMarkdown }) => {
  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              value={markdown}
              onChange={handleMarkdownChange}
              multiline
              rows={37}
              fullWidth
              InputProps={{
                style: {
                  backgroundColor: '#303030',
                  color: 'white',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontFamily: 'Monospace',
                },
              }}
            />

          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LessonMarkdownEditor;
