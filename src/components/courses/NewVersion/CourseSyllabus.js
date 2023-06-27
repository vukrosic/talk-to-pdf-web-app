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
import { auth } from "../../../config/firebase";
import { db } from "../../../config/firebase";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";




const CourseSyllabus = () => {
  const [course, setCourse] = useState();
  const [editMode, setEditMode] = useState(false);

  // load course
  useEffect(() => {
    const loadCourse = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
  
      const courseRef = collection(db, `users/${currentUser.uid}/created_courses`);
      const courseSnapshot = await getDocs(courseRef);
      if (!courseSnapshot.empty) {
        const courseData = courseSnapshot.docs[0].data();
        setCourse(courseData);
        console.log(JSON.stringify(courseData));
      }
    };
    loadCourse();
  }, []);

  // // save course
  // useEffect(() => {
  //   const saveCourse = async () => {
  //     if(course === undefined) return;
  //     const currentUser = auth?.currentUser;
  //     if (!currentUser) return;

  //     const courseRef = collection(db, `users/${currentUser.uid}/created_courses`);
  //     await addDoc(courseRef, course);
  //   };
  //   saveCourse();
  // }, [course]);

  // update course
  // useEffect(() => {
  //   const saveCourse = async () => {
  //     const currentUser = auth.currentUser;
  //     if (!currentUser || !course) return;
  //     console.log("course id: " + course.id)
  //     const courseRef = doc(db, `users/${currentUser.uid}/created_courses/iLmFpwy6UaEcFeYGQTxY`);
  //     await setDoc(courseRef, course);
  //   };
  
  //   saveCourse();
  // }, [course]);


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
      console.log("KEYS:");
      console.log(Object.keys(prevState.lessons));
      
      
      const updatedTopics1 = Object.keys(prevState.lessons).map((topic, index) =>
        index === topicIndex ? newTopicName : topic
      );
      const updatedTopics = Object.keys(prevState.lessons).map((topic, index) =>
        index === topicIndex ? {newTopic: newTopicName, oldTopic: topic} : {newTopic: topic, oldTopic: topic}
      );

      const updatedLessons1 = updatedTopics.reduce((acc, topic) => {
        acc[topic] = prevState.lessons[topic];
        return acc;
      }, {});

      const updatedLessons = updatedTopics.reduce((acc, topicObj) => {
        acc[topicObj.newTopic] = prevState.lessons[topicObj.oldTopic];
        return acc;
      }, {});

      console.log("updatedLessons:");
      console.log(updatedLessons);
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
            {course && (
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
            )}
    </Container>
  );
};

export default CourseSyllabus;
