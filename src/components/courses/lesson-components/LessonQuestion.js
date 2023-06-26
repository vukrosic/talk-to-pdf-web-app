import React from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const LessonQuestion = (question, choices) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(false);

   const setChoices = (newChoices) => {
    choices = newChoices;
  };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddChoice = () => {
    const isSelected = choices.includes(selectedOption);
    setChoices([...choices, " "]);
    if (!isSelected) {
      setSelectedOption("");
    }
  };
  const handleChoiceChange = (value, index) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleDeleteChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleEditMode = () => {
    setSelectedOption("");
    setIsEditMode((prevState) => !prevState);
  };

  return (
    <Container>
      <Typography variant="body1" style={{ textAlign: "left", marginBottom: "1em" }}>
        {question}
      </Typography>

      {choices.map((choice, index) => (
        <Grid container spacing={1} alignItems="center" key={index}>
          <Grid item xs={isEditMode ? 11 : 12}>
            {isEditMode ? (
              <TextField
                fullWidth
                value={choice}
                variant="outlined"
                style={{
                  marginBottom: "1em",
                  backgroundColor: selectedOption === choice ? "#1a90ff" : "white",
                  color: selectedOption === choice ? "#fff" : "#000",
                }}
                onChange={(event) => handleChoiceChange(event.target.value, index)}
                InputProps={{
                  style: {
                    textAlign: "left",
                  },
                }}
              />
            ) : (
              <Button
                fullWidth
                variant="outlined"
                style={{
                  marginBottom: "1em",
                  backgroundColor: selectedOption === choice ? "#1a90ff" : "white",
                  color: selectedOption === choice ? "#fff" : "#000",
                  textAlign: "left",
                  paddingTop: "1em",
                  paddingBottom: "1em",
                }}
                onClick={() => setSelectedOption(choice)}
              >
                {choice}
              </Button>
            )}
          </Grid>
          {isEditMode && (
            <Grid item xs={1}>
              <IconButton
                onClick={() => handleDeleteChoice(index)}
                color="inherit"
                aria-label="delete choice"
              >
                <Delete />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}

      {isEditMode && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleAddChoice} color="primary" aria-label="add">
            <Add />
          </IconButton>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
        <Button onClick={handleEditMode} variant="text" color="primary">
          {isEditMode ? "Done" : "Edit"}
        </Button>
      </Box>

    </Container>
  );
};

export default LessonQuestion;
