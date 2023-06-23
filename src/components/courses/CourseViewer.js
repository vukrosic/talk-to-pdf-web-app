import React from 'react';
import {Grid} from '@mui/material';
import CourseStepperViewer from './CourseStepperViewer';
import CourseMarkdownViewer from './CourseMarkdownViewer';
import ChatWindow from './ChatWindow';

const CourseViewer = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        <CourseMarkdownViewer courseContent={"asd"} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ChatWindow lesson={"adsfasdf"}/>
      </Grid>
    </Grid>
  );
};

export default CourseViewer;
