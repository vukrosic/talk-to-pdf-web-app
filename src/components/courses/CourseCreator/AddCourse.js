import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
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
    tasks: [""],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleLessonChange = (event, index) => {
    const { value } = event.target;
    let updatedLessons = [...course.lessons];
    updatedLessons[index] = value;
    setCourse({ ...course, lessons: updatedLessons });
  };

  const handleTaskChange = (event, index) => {
    const { value } = event.target;
    let updatedTasks = [...course.tasks];
    updatedTasks[index] = value;
    setCourse({ ...course, tasks: updatedTasks });
  };

  const addLesson = () => {
    let updatedLessons = [...course.lessons, ""];
    setCourse({ ...course, lessons: updatedLessons });
  };

  const removeLesson = (index) => {
    let updatedLessons = [...course.lessons];
    updatedLessons.splice(index, 1);
    setCourse({ ...course, lessons: updatedLessons });
  };

  const addTask = () => {
    let updatedTasks = [...course.tasks, ""];
    setCourse({ ...course, tasks: updatedTasks });
  };

  const removeTask = (index) => {
    let updatedTasks = [...course.tasks];
    updatedTasks.splice(index, 1);
    setCourse({ ...course, tasks: updatedTasks });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert enrollmentCount to a number
    const enrollmentCount = parseInt(course.enrollmentCount, 10);

    const docRef = await addDoc(collection(db, "courses"), {
      ...course,
      enrollmentCount: enrollmentCount,
    });

    console.log("Document written with ID: ", docRef.id);

    setCourse({
      title: "",
      creator: "",
      enrollmentCount: 0,
      thumbnail: "",
      lessons: [""],
      tasks: [""],
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
                  required
                  name="creator"
                  label="Creator"
                  variant="outlined"
                  value={course.creator}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="enrollmentCount"
                  label="Enrollment Count"
                  type="number"
                  variant="outlined"
                  value={course.enrollmentCount}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="thumbnail"
                  label="Thumbnail URL"
                  variant="outlined"
                  value={course.thumbnail}
                  onChange={handleInputChange}
                />
              </Grid>
              {course.lessons.map((lesson, index) => (
                <Grid key={index} item xs={12}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        required
                        label={`Lesson ${index + 1}`}
                        variant="outlined"
                        value={lesson}
                        onChange={(event) => handleLessonChange(event, index)}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addLesson}
                >
                  Add Lesson
                </Button>
              </Grid>
              {course.tasks.map((task, index) => (
                <Grid key={index} item xs={12}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        required
                        label={`Task ${index + 1}`}
                        variant="outlined"
                        value={task}
                        onChange={(event) => handleTaskChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeTask(index)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addTask}
                >
                  Add Task
                </Button>
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