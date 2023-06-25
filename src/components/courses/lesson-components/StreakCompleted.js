import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

function StreakCompleted() {
    const npContainerStyles = {
        padding: '2px 8px',
        backgroundColor: '#fca311',
        color: '#fff',
        fontWeight: 400,
        borderRadius: 4,
        marginLeft: 20,
      };

  return (
    <Container>
      {/* Animation */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Paper elevation={3} style={{width: '100px', height: '100px', border: '10px solid #fca311', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h4" style={{ color: "#333" }}>
            2
            </Typography>
        </Paper>
      </Box>

      {/* Streak Message */}
      <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 600}}>
        days streak
      </Typography>
      <Typography variant="body1" align="center"
          color="text.secondary"
          style={{ marginBottom: 20, fontWeight: 500, fontSize: 16 }}
        >
          You reached a 2-day milestone. Dedication deserves a reward, enjoy!
      </Typography>

      {/* XP Rewards */}
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
        <Typography variant="h5" style={{ color: '#666' }}>
            <span style={npContainerStyles}>+6XP</span>
        </Typography>
        </Grid>
      </Box>
    </Container>
  );
}

export default StreakCompleted;