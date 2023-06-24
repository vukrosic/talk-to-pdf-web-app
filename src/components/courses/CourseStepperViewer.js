import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

const CourseStepperViewer = ({ courseContent: lessons, setCurrentStep, courseId }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    const isFinished = await isCourseAlreadyFinished(courseId);
    console.log("Is course already finished?", isFinished);
    if (!isFinished) {
      addFinishedCourse(courseId);
    }
    console.log("Course completed!");
  };

  const isCourseAlreadyFinished = async (courseID) => {
    try {
      const userRef = doc(db, `users/${auth?.currentUser?.uid}`);
      const userDocSnapshot = await getDoc(userRef);
      const userData = userDocSnapshot.data();
      const finishedCourses = userData.finishedCourses || [];
      return finishedCourses.includes(courseID);
    } catch (error) {
      console.error("Error checking if course is finished:", error);
      return false;
    }
  };

  const addFinishedCourse = async () => {
    try {
      const userRef = doc(db, `users/${auth?.currentUser?.uid}`);
      const userDocSnapshot = await getDoc(userRef);
      const userData = userDocSnapshot.data();
      const finishedCoursesData = userData.finishedCourses;
      const updatedFinishedCourses = [...finishedCoursesData, courseId];

      await updateDoc(userRef, {
        finishedCourses: updatedFinishedCourses,
      });
      console.log("User finished the course successfully!");
    } catch (error) {
      console.error("Error finishing the course:", error);
    }
  };

  // Check if courseData is still loading
  if (!lessons) {
    return <div>Loading...</div>;
  }

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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>

        {activeStep === lessons.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFinish}
            component={Link}
            to="/"
          >
            Finish
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default CourseStepperViewer;