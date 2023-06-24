import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { Grid } from '@mui/material';
import CourseStepperViewer from './CourseStepperViewer';
import CourseMarkdownViewer from './CourseMarkdownViewer';
import ChatWindow from './ChatWindow';
import { db } from '../../config/firebase';

const CourseViewer = () => {
  const [courseData, setCourseData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); // Add currentStep state
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

  // log currentStep when it changes using useEffect
  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        {courseData && (
          <CourseStepperViewer
            courseContent={courseData.lessons}
            setCurrentStep={setCurrentStep}
            courseId={id}
          />
        )}
      </Grid>
      <Grid item xs={12} lg={6}>
        {courseData && (
          <ChatWindow
            lesson={courseData.lessons[currentStep]} // Pass the lesson for the current step as a prop
          />
        )}
      </Grid>
    </Grid>
  );
};


export default CourseViewer;