import React from "react";
import { Typography, IconButton, Button, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinearProgress from './LinearProgress';

// Style for linear progress
const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '60%',
  marginRight: 2,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const Header = ({ lessonTitle }) => {
  const numOfComments = 12;
  const numOfHearts = 100;

  return (
    <Box className="HeaderContainer" sx={{ display: 'flex', alignItems: 'center'}}>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" color="text.secondary" sx={{ flex: 1, textAlign: 'center', marginRight: 'auto' }}>
        {lessonTitle}
      </Typography>
      <ProgressContainer>
        <LinearProgress />
      </ProgressContainer>
      <IconButton edge="end" color="error" aria-label="like">
        <FavoriteIcon />
      </IconButton>
      <Typography variant="body1" color="text.secondary" sx={{ marginLeft: 1 }}>
        {numOfHearts}
      </Typography>
      <Button variant="text" color="primary" onClick={() => console.log('clicked')}>
        {`${numOfComments} Comments`}
      </Button>
    </Box>
  );
};

export default Header;
