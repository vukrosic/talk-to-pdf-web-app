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
    lessons: [""],
    lessonTitles: [""], // Add the lessonTitles array here
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

  const handleArrayChange = (event, index, field) => {
    const { value } = event.target;
    let updatedArray = [...course[field]];
    updatedArray[index] = value;
    setCourse({ ...course, [field]: updatedArray });
  };

  const handleLessonChange = (event, index) => {
    handleArrayChange(event, index, "lessons");
  };

  const addLesson = () => {
    let updatedLessons = [...course.lessons, ""];
    let updatedLessonTitles = [...course.lessonTitles, ""];
    setCourse({ ...course, lessons: updatedLessons, lessonTitles: updatedLessonTitles });
  };

  const removeLesson = (index) => {
    let updatedLessons = [...course.lessons];
    updatedLessons.splice(index, 1);
    let updatedLessonTitles = [...course.lessonTitles];
    updatedLessonTitles.splice(index, 1);
    setCourse({ ...course, lessons: updatedLessons, lessonTitles: updatedLessonTitles });
  };


  const handleFreeCheckBoxChange = (event) => {
    setCourse({ ...course, free: event.target.checked });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "courses"), {
      ...course,
      enrollmentCount: parseInt(course.enrollmentCount, 10),
    });

    console.log("Document written with ID: ", docRef.id);

    setCourse({
      title: "",
      creator: "",
      enrollmentCount: 0,
      thumbnail: "",
      lessons: [""],
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
          <Typography variant="h8" component="h8" align="left" mb={4}>
          Title, lessons and creator fields are required.
        </Typography>
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
              {course.lessons.map((lesson, index) => (
                <Grid item xs={12} key={index}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        required
                        label={`Lesson ${index + 1}`}
                        variant="outlined"
                        value={lesson}
                        onChange={(event) => handleLessonChange(event, index)}
                        inputProps={{ maxLength: 280 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeLesson(index)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={addLesson}>
                  Add Lesson
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="creator"
                  label="Creator"
                  variant="outlined"
                  value={course.creator}
                  onChange={handleInputChange}
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