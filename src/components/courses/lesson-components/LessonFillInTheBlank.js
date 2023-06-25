import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";

function LessonFillInTheBlank() {
    const options = ["saw", "eat", "go", "play"]; // Sample options
    const [selectedOption, setSelectedOption] = useState("");
    const emptyBoxButton = (
      <Button variant="outlined" style={{ width: 80, minHeight:20, textTransform: 'capitalize' }}>
        &nbsp;
      </Button>
    );
  
    const handleOptionClick = option => setSelectedOption(option);
  
    return (
      <Container>
        <Typography variant="h5" style={{ marginBottom: 20, textAlign: "center" }}>
          Select the correct option to fill in the gap:
        </Typography>
  
        <Typography variant="body1" gutterBottom style={{ marginBottom: 30, textAlign: "center" }}>
          I {selectedOption ? selectedOption : emptyBoxButton} my friend yesterday.
        </Typography>
  
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {options.map(option => (
            <Grid item key={option}>
              <Button variant="contained" onClick={() => handleOptionClick(option)}>
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }


export default LessonFillInTheBlank;