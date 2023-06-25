import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    creator: "",
    enrollmentCount: 0,
    thumbnail: "",
    lessons: "",
    subtitle: "",
    whatYouWillLearn: [""],
    requirements: "",
    description: "",
    free: true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleArrayChange = (event) => {
    const { value } = event.target;
    setCourse({ ...course, lessons: value });
  };

  const handleFreeCheckBoxChange = (event) => {
    setCourse({ ...course, free: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Split the lessons string into separate lessons based on double new line
    const lessonsArray = course.lessons.split("\n\n");

    const docRef = await addDoc(collection(db, "courses"), {
      ...course,
      lessons: lessonsArray,
      enrollmentCount: parseInt(course.enrollmentCount, 10),
    });

    console.log("Document written with ID: ", docRef.id);

    setCourse({
      title: "",
      creator: "",
      enrollmentCount: 0,
      thumbnail: "",
      lessons: "",
      subtitle: "",
      whatYouWillLearn: [""],
      requirements: "",
      description: "",
      free: true,
    });
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg" py={8}>
        <Typography variant="h4" component="h2" align="center" mb={4}>
          Add a New Course
        </Typography>
        <Paper variant="outlined" elevation={3} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="title"
                  label="Course Title"
                  variant="outlined"
                  value={course.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  required
                  name="lessons"
                  label="Lessons (separate each lesson but 1 empty line)"
                  variant="outlined"
                  value={course.lessons}
                  onChange={handleArrayChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={course.free}
                      onChange={handleFreeCheckBoxChange}
                      name="free"
                    />
                  }
                  label="Free"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Course
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddCourse;