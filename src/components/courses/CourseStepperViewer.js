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

const CourseStepperViewer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [courseData, setCourseData] = useState(null); // State to store course data
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data from Firestore database
        const courseDoc = doc(db, "courses", id);
        const courseSnapshot = await getDoc(courseDoc);

        if (courseSnapshot.exists()) {
          const data = courseSnapshot.data();
          setCourseData(data);
        } else {
          console.log("No such course document!");
        }
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]); // Fetch course data when the id parameter changes

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Check if courseData is still loading
  if (!courseData) {
    return <div>Loading...</div>;
  }

  const courseContent = courseData.lessons; // Assuming the course data has a 'content' property

  return (
    <Container maxWidth="lg" py={8}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {courseContent.map((_lesson, index) => (
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
          <LessonViewer lesson={courseContent[activeStep]} />
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
          disabled={activeStep === courseContent.length - 1}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default CourseStepperViewer;
