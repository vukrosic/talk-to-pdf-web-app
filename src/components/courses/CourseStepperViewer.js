import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import LessonViewer from "./LessonViewer";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const CourseStepperViewer = ({courseContent: lessons, currentStep, setCurrentStep}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
  };

  // Check if courseData is still loading
  if (!lessons) {
    return <div>Loading...</div>;
  }
  console.log("lessons");
  console.log(JSON.stringify(lessons));


  return (
    <Container maxWidth="lg" py={8}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {lessons.map((_lesson, index) => (
          <Step key={index}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card variant="outlined" sx={{ width: "70%", p: 4 }}>
          <LessonViewer lesson={lessons[activeStep]} />
        </Card>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNext}
          disabled={activeStep === lessons.length - 1}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default CourseStepperViewer;
