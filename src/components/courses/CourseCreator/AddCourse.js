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
    lessonTitles: [""],
    tasks: [""],
    subtitle: "",
    whatYouWillLearn: [""],
    requirements: "",
    description: "",
    free: false,
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

  const handleNestedChange = (event, index, subField, field) => {
    const { value } = event.target;
    let updatedArray = [...course[field]];
    updatedArray[index][subField] = value;
    setCourse({ ...course, [field]: updatedArray });
  };

  const handleLessonTitleChange = (event, index) => {
    handleArrayChange(event, index, "lessonTitles");
  };

  const handleLessonChange = (event, index) => {
    handleArrayChange(event, index, "lessons");
  };

  const handleTaskChange = (event, index) => {
    handleArrayChange(event, index, "tasks");
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

  const addTask = () => {
    let updatedTasks = [...course.tasks, ""];
    setCourse({ ...course, tasks: updatedTasks });
  };

  const removeTask = (index) => {
    let updatedTasks = [...course.tasks];
    updatedTasks.splice(index, 1);
    setCourse({ ...course, tasks: updatedTasks });
  };

  const handleFreeCheckBoxChange = (event) => {
    setCourse({ ...course, free: event.target.checked });
  };

  const handleWhatYouWillLearnChange = (event, index) => {
    handleArrayChange(event, index, "whatYouWillLearn");
  };

  const addWhatYouWillLearn = () => {
    let updatedWhatYouWillLearn = [...course.whatYouWillLearn, ""];
    setCourse({ ...course, whatYouWillLearn: updatedWhatYouWillLearn });
  };

  const removeWhatYouWillLearn = (index) => {
    let updatedWhatYouWillLearn = [...course.whatYouWillLearn];
    updatedWhatYouWillLearn.splice(index, 1);
    setCourse({ ...course, whatYouWillLearn: updatedWhatYouWillLearn });
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
      lessonTitles: [""],
      tasks: [""],
      subtitle: "",
      whatYouWillLearn: [""],
      requirements: "",
      description: "",
      free: false,
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="subtitle"
                  label="Course Subtitle"
                  variant="outlined"
                  value={course.subtitle}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="requirements"
                  label="Course Requirements"
                  variant="outlined"
                  value={course.requirements}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="description"
                  label="Course Description"
                  variant="outlined"
                  value={course.description}
                  onChange={handleInputChange}
                />
              </Grid>
              {course.whatYouWillLearn.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      required
                      label={`What You Will Learn - Item ${index + 1}`}
                      variant="outlined"
                      value={item}
                      onChange={(event) =>
                        handleWhatYouWillLearnChange(event, index)
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeWhatYouWillLearn(index)}
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
                onClick={addWhatYouWillLearn}
              >
                Add "What You Will Learn"
              </Button>
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
              {course.lessonTitles.map((lessonTitle, index) => (
                <Grid item xs={12} key={index}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        required
                        label={`Lesson ${index + 1} Title`}
                        variant="outlined"
                        value={lessonTitle}
                        onChange={(event) =>
                          handleLessonTitleChange(event, index)
                        }
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
                <Button variant="contained" color="primary" onClick={addLesson}>
                  Add Lesson
                </Button>
              </Grid>
              {course.tasks.map((task, index) => (
                <Grid item xs={12} key={index}>
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
                <Button variant="contained" color="primary" onClick={addTask}>
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