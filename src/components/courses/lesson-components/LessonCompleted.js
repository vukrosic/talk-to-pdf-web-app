import React from "react";
import { useEffect } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

function LessonCompleted( setCompleted ) {
  
  const xpContainerStyles = {
    padding: '2px 8px',
    backgroundColor: '#fca311',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 4,
    marginLeft: 20,
  };

  const gemContainerStyles = {
    padding: '2px 8px',
    borderRadius: 4,
    marginLeft: 20,
  };

  useEffect(() => {
    setCompleted(true);
  }, []);
      
  return (
    <Container>
      {/* Animation */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography variant="h4" style={{ color: "green" }}>
          🎉
        </Typography>
      </Box>

      {/* Completion Message */}
      <Typography variant="h5" align="center" gutterBottom>
        Lesson completed!
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" style={{ marginBottom: 20 }}>
        You learned Your first C# Program. You’re one step closer to reaching your goal!
      </Typography>

      {/* XP and Diamond Rewards */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f5f5f5"
        width={150}
        height={80}
        borderRadius={10}
        margin="auto"
      >
        <Grid container direction="column" alignItems="center" spacing={0}>
        <Grid item style={{ marginBottom: '1em' }}>
        <Typography variant="h5" style={{ color: '#666' }}>
            <span style={xpContainerStyles}>+10xp</span>
        </Typography>
        </Grid>
        <Grid item>
            <Typography variant="h5" style={{ background: 'linear-gradient(to right, purple , pink)', webkitBackgroundClip: 'text', color: 'transparent', cursor: 'pointer' }} onHover={{color: '#fff'}}>
            <span style={gemContainerStyles}>+10💎</span>
            </Typography>
        </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LessonCompleted;