// src/components/CourseTitle.js

import React from "react";
import { Typography } from "@mui/material";

const CourseTitle = ({ title, description }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" className="Title">
        {title}
      </Typography>
      <Typography variant="subtitle1" component="p" className="Description">
        {description}
      </Typography>
    </div>
  );
};

export default CourseTitle;