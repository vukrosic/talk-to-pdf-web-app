import React from "react";
import { Button, Container } from "@mui/material";

const Footer = ({ onNextLesson, onPreviousLesson, displayContinue }) => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "55%",
        marginBottom: "2em",
      }}
    >
      <Button
        variant="outlined"
        onClick={onPreviousLesson}
        style={{
          color: "#4C6BAE",
          borderColor: "#4C6BAE",
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

      {displayContinue ? (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#4C6BAE",
            color: "white",
            fontSize: "1.0em",
            paddingRight: "2em",
            paddingLeft: "2em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
          }}
        >
          Continue
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onNextLesson}
          style={{
            backgroundColor: "#4C6BAE",
            color: "white",
            fontSize: "1.0em",
            paddingRight: "2em",
            paddingLeft: "2em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
          }}
        >
          Next
        </Button>
      )}
    </Container>
  );
};

export default Footer;
