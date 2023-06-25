import React from "react";
import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LockIcon from "@mui/icons-material/Lock";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CourseSyllabus.css";

const courses = {
  introduction: {
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development and build your first website.",
    lessons: {
      HTML: [
        {
          title: "Lesson 1",
          completed: false,
          xp: 10,
        },
        {
          title: "Lesson 2",
          completed: false,
          xp: 10,
        },
      ],
      CSS: [
        {
          title: "Lesson 1",
          completed: false,
          xp: 10,
        },
      ],
      JavaScript: [
        {
          title: "Lesson 1",
          completed: false,
          xp: 10,
        },
        {
          title: "Lesson 2",
          completed: false,
          xp: 10,
        },
        {
          title: "Lesson 3",
          completed: false,
          xp: 10,
        },
      ],
    },
  },
};

const CourseSyllabus = () => {
  const [course, setCourse] = useState(courses.introduction);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddTopic = () => {
    setCourse((prevState) => {
      const newTopic = `New Topic ${Object.keys(prevState.lessons).length + 1}`;
      const newDefaultLesson = {
        title: "Default Lesson",
        completed: false,
        xp: 10,
      };
      const newLessons = {
        ...prevState.lessons,
        [newTopic]: [newDefaultLesson],
      };
      return {
        ...prevState,
        lessons: newLessons,
      };
    });
  };

  const handleDeleteTopic = (topicIndex) => {
    setCourse((prevState) => {
      const updatedTopics = Object.keys(prevState.lessons).filter(
        (_, index) => index !== topicIndex
      );
      const updatedLessons = updatedTopics.reduce((acc, topic) => {
        acc[topic] = prevState.lessons[topic];
        return acc;
      }, {});
      return {
        ...prevState,
        lessons: updatedLessons,
      };
    });
  };

  const handleUpdateTopic = (topicIndex, newTopicName) => {
    setCourse((prevState) => {
      const updatedTopics = Object.keys(prevState.lessons).map((topic, index) =>
        index === topicIndex ? newTopicName : topic
      );
      const updatedLessons = updatedTopics.reduce((acc, topic) => {
        acc[topic] = prevState.lessons[topic];
        return acc;
      }, {});
      return {
        ...prevState,
        lessons: updatedLessons,
      };
    });
  };

  const handleUpdateLesson = (topicIndex, lessonIndex, newLessonTitle, newLessonXP) => {
    setCourse((prevState) => {
      const topic = Object.keys(prevState.lessons)[topicIndex];
      const updatedLessons = [...prevState.lessons[topic]];
      updatedLessons.splice(lessonIndex, 1, {
        ...prevState.lessons[topic][lessonIndex],
        title: newLessonTitle,
        xp: newLessonXP,
      });
      return {
        ...prevState,
        lessons: {
          ...prevState.lessons,
          [topic]: updatedLessons,
        },
      };
    });
  };
  

  const handleAddLesson = (topicIndex, newLessonXP) => {
    setCourse((prevState) => {
      const topic = Object.keys(prevState.lessons)[topicIndex];
      const updatedLessons = [...prevState.lessons[topic]];
      const newLesson = {
        title: `Lesson ${updatedLessons.length + 1}`,
        completed: false,
        xp: newLessonXP,
      };
      updatedLessons.push(newLesson);
      return {
        ...prevState,
        lessons: {
          ...prevState.lessons,
          [topic]: updatedLessons,
        },
      };
    });
  };
  

  const handleDeleteLesson = (topicIndex, lessonIndex) => {
    setCourse((prevState) => {
      const topic = Object.keys(prevState.lessons)[topicIndex];
      const updatedLessons = [...prevState.lessons[topic]];
      updatedLessons.splice(lessonIndex, 1);
      return {
        ...prevState,
        lessons: {
          ...prevState.lessons,
          [topic]: updatedLessons,
        },
      };
    });
  };

  return (
    <Container maxWidth="lg" className="Container">
      <Grid container spacing={2} justifyContent="center" className="Content">
        <Grid item xs={12} md={8}>
          <div className="TitleContainer">
            <Typography variant="h4" component="h1" className="Title">
              {course.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              className="Description"
            >
              {course.description}
            </Typography>
          </div>
          {Object.entries(course.lessons).map(([topic, lessons], topicIndex) => (
            <Accordion key={topicIndex} className="TopicAccordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="AccordionSummary"
                aria-controls={`panel${topicIndex + 1}-content`}
                id={`panel${topicIndex + 1}-header`}
              >
                {topicIndex === 0 ? (
                  <PlayCircleFilledIcon className="TopicIcon" />
                ) : (
                  <LockIcon className="TopicIcon" />
                )}
                {editMode ? (
                  <TextField
                    defaultValue={topic}
                    onBlur={(e) => handleUpdateTopic(topicIndex, e.target.value)}
                    size="small"
                    label="Topic"
                    variant="outlined"
                    className="EditTopicTextField"
                  />
                ) : (
                  <Typography variant="h6" className="AccordionTitle">
                    {topic}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                {lessons.map((lesson, lessonIndex) => (
                  <Card key={lessonIndex} className="LessonCard">
                    <CardContent>
                      <div className="LessonContainer">
                        <div className="LessonIconContainer">
                          <HistoryEduIcon className="LessonIcon" />
                        </div>
                        <div className="LessonTitleContainer">
                          {editMode ? (
                            <TextField
                              defaultValue={lesson.title}
                              onBlur={(e) =>
                                handleUpdateLesson(
                                  topicIndex,
                                  lessonIndex,
                                  e.target.value
                                )
                              }
                              size="small"
                              label="Lesson Title"
                              variant="outlined"
                              className="EditLessonTextField"
                            />
                          ) : (
                            <Typography variant="h6" className="LessonTitle">
                              {lesson.title}
                            </Typography>
                          )}
                        </div>
                        {editMode ? (
                        <div className="LessonXPContainer">
                          <TextField
                            defaultValue={lesson.xp}
                            onBlur={(e) =>
                              handleUpdateLesson(
                                topicIndex,
                                lessonIndex,
                                lesson.title,
                                parseInt(e.target.value)
                              )
                            }
                            type="number"
                            size="small"
                            label="XP"
                            variant="outlined"
                            className="EditLessonXPTextField"
                          />
                        </div>
                      ) : (
                        <div className="XPContainer">{lesson.xp}XP</div>
                      )}
                        {editMode && (
                          <Button
                            variant="outlined"
                            onClick={() => handleDeleteLesson(topicIndex, lessonIndex)}
                            className="DeleteLessonButton"
                            startIcon={<DeleteIcon />}
                            size="small"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {editMode && (
                  <Button
                    variant="outlined"
                    onClick={() => handleAddLesson(topicIndex)}
                    className="AddLessonButton"
                    startIcon={<AddIcon />}
                    size="small"
                  >
                    Add Lesson
                  </Button>
                )}
              </AccordionDetails>
              {editMode && (
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteTopic(topicIndex)}
                  className="DeleteTopicButton"
                  startIcon={<DeleteIcon />}
                  size="small"
                >
                  Delete Topic
                </Button>
              )}
            </Accordion>
          ))}
          {editMode && (
            <Grid container spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleAddTopic}
                className="AddTopicButton"
              >
                Add Topic
              </Button>
            </Grid>
          )}
          <Grid container spacing={2} justifyContent="flex-end" className="Content">
            <Button
              variant="contained"
              onClick={handleEditMode}
              className={`EditButton ${editMode ? "editMode" : ""}`}
              style={{ backgroundColor: editMode ? "green" : "blue" }}
            >
              {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseSyllabus;
