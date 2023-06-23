import React from 'react';
import {useState, useEffect} from 'react';
import {Grid} from '@mui/material';
import AddCourse from './AddCourse';
import ChatWindow from '../ChatWindow';
import CourseMarkdownViewer from '../CourseMarkdownViewer';

const CourseCreator = () => {
  const [courseContent, setCourseContent] = useState("");
  useEffect(() => {
    console.log(courseContent);
  }, [courseContent]);
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} lg={6}>
        <CourseMarkdownViewer courseContent={courseContent}/>
      </Grid>
      <Grid item xs={12} lg={6}>
        <AddCourse lesson={courseContent} setLesson={setCourseContent} />
      </Grid>
      
      {/* <Grid item xs={12} lg={3.5}>
        <ChatWindow lesson={"a"}/>
      </Grid> */}
    </Grid>
  );
};

export default CourseCreator;
