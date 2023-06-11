import React from 'react';
import { Typography, Box, Container, Link } from '@mui/material';
// import { makeStyles } from '@material-ui/system/makeStyles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   content: {
//     marginTop: theme.spacing(4),
//   },
// }));

const About = () => {
//   const classes = useStyles();

  return (
    <div >
      <Container maxWidth="md">
      <div> </div>
      <br></br>
      <br></br>
      <br></br>
        <Typography variant="h4" component="h1">
          About
        </Typography>
        <Box >
          <Typography paragraph>
            Our website offers a unique, chat-based learning experience focused
            on programming. You can find various lessons, code
            snippets, quizzes, and debugging exercises to improve your coding
            skills.
          </Typography>
          <br></br>
          <Typography variant="h5" component="h2">
            Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions or concerns, feel free to get in touch
            with me at{' '}
            <Link href="mailto:vukrosic1@gmail.com" target="_blank" rel="noopener noreferrer">
                vukrosic1@gmail.com
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default About;