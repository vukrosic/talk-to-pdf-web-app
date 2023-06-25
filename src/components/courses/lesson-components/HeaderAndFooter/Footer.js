import React from "react";
import { Button, Container } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

const Footer = ({ onNextLesson }) => {
  return (
    <Container maxWidth="md" style={{ display: "flex", justifyContent: "space-between", width: "55%", marginBottom: "2em" }}>
      <Button 
        variant="outlined"
        style={{ 
          color: '#4C6BAE',
          borderColor: '#4C6BAE',
          textAlign: "left",
          fontSize: "1.0em",
          paddingRight: "2em",
          paddingLeft: "2em",
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
        }}
      >
        Back
      </Button>
      
      <Button style={{ fontSize: "1.5em", padding: "0.5em" }}>
        <LockIcon />
      </Button>

      <Button 
        variant="contained" 
        onClick={onNextLesson}
        style={{ 
          backgroundColor: '#4C6BAE',
          color: 'white',
          fontSize: "1.0em",
          paddingRight: "2em",
          paddingLeft: "2em",
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
        }}
      >
        Next
      </Button>
      
    </Container>
  );
};

export default Footer;
