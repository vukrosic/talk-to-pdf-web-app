import React from 'react';
import { Typography, Box, Container, Link } from '@mui/material';

const About = () => {
  return (
    <div>
      <Container maxWidth="md">
        <div> </div>
        <br />
        <br />
        <br />
        <Typography variant="h4" component="h1">
          About
        </Typography>
        <Box>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              bgcolor: '#fff',
              width: '70%',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '5px',
              alignSelf: 'center',
              margin: '0 auto',
              padding: '1rem',
              border: '1px solid #333',
              mt: 4,
              mb: 4,
            }}
          >
            Learn with ChatGPT. Generate and explore topics, subtopics, and lessons, and engage with ChatGPT in a conversation about the lesson you are learning.
          </Typography>
          <br />
          <Typography variant="h5" component="h2">
            Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions or concerns, feel free to get in touch with me at{' '}
            <Link href="mailto:vukrosic1@gmail.com" target="_blank" rel="noopener noreferrer">
              vukrosic1@gmail.com
            </Link>
          </Typography>
          <br />
          <Typography variant="h5" component="h2">
            Privacy Policy
          </Typography>
          <Typography paragraph>
            Please read our{' '}
            <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>{' '}
            for more information.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default About;
