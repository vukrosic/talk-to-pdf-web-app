import React from 'react';
import {Grid} from '@mui/material';
import AddCourse from './AddCourse';
import ChatWindow from '../ChatWindow';

const CourseCreator = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        <AddCourse />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ChatWindow lesson={"adsfasdf"}/>
      </Grid>
    </Grid>
  );
};

export default CourseCreator;
