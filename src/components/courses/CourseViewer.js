import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { Grid } from '@mui/material';
import CourseStepperViewer from './CourseStepperViewer';
import CourseMarkdownViewer from './CourseMarkdownViewer';
import ChatWindow from './ChatWindow';
import { db } from '../../config/firebase';

const CourseViewer = ({courseId}) => {
  const [courseData, setCourseData] = useState(null);


  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data from Firestore database
        const courseDoc = doc(db, "courses", courseId);
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
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        {courseData && (
          <CourseStepperViewer courseContent={courseData.lessons} />
        )}
      </Grid>
      <Grid item xs={12} lg={6}>
        {courseData && (
          <ChatWindow lesson={courseData.lessons[0]} />
        )}
      </Grid>
    </Grid>
  );
};

export default CourseViewer;