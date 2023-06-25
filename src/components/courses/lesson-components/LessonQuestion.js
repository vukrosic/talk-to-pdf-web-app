import React from "react";
import { Container, Typography, Button, Radio } from "@mui/material";

const LessonQuestion = ({ question, option1, option2 }) => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container 
    >
      <Typography variant="body1" style={{ textAlign: "left", marginBottom: "1em" }}>
        {question}
      </Typography>

      <Button 
        variant="outlined"
        style={{ 
            width: "100%", 
            marginBottom: "1em",
            color: selectedOption === option1 ? '#4C6BAE' : '#000',
            borderColor: selectedOption === option1 ? '#4C6BAE' : '#000',
            backgroundColor: 'white',
            boxShadow: '0px 2px 1px -1px #4C6BAE',
            textAlign: "left",
        }}
        startIcon={<Radio checked={selectedOption === option1} color="primary" onChange={handleChange} value={option1} />}
      >
        {option1}
      </Button>

      <Button 
        variant="outlined"
        style={{ 
            width: "100%", 
            marginBottom: "1em",
            color: selectedOption === option2 ? '#4C6BAE' : '#000',
            borderColor: selectedOption === option2 ? '#4C6BAE' : '#000',
            backgroundColor: 'white',
            boxShadow: '0px 2px 1px -1px #4C6BAE',
            textAlign: "left",
        }}
        startIcon={<Radio checked={selectedOption === option2} color="primary" onChange={handleChange} value={option2} />}
      >
        {option2}
      </Button>
    </Container>
  );
};

export default LessonQuestion;