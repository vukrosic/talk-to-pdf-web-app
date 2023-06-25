import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LockIcon from "@mui/icons-material/Lock";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import courseData from "./CourseData";
import "./CourseSyllabus.css";

const CourseSyllabus = () => {
  const course = courseData;

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
          {course.lessons.reduce((acc, lesson) => {
            const topicIndex = acc.findIndex(
              (topic) => topic.title === lesson.topic
            );
            if (topicIndex === -1) {
              acc.push({ title: lesson.topic, lessons: [lesson] });
            } else {
              acc[topicIndex].lessons.push(lesson);
            }
            return acc;
          }, []).map((topic, index) => (
            <Accordion key={index} className="TopicAccordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="AccordionSummary"
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                {index === 0 ? (
                  <PlayCircleFilledIcon className="TopicIcon" />
                ) : (
                  <LockIcon className="TopicIcon" />
                )}
                <Typography variant="h6" className="AccordionTitle">
                  {topic.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="AccordionDetails">
                {topic.lessons.map((lesson, lessonIndex) => (
                  <Card key={lessonIndex} className="LessonCard">
                    <CardContent>
                      <div className="LessonContainer">
                        <div className="LessonIconContainer">
                          <HistoryEduIcon className="LessonIcon" />
                        </div>
                        <div className="LessonTitleContainer">
                          <Typography variant="h6" className="LessonTitle">
                            {lesson.title}
                          </Typography>
                        </div>
                        <div className="XPContainer">+10XP</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseSyllabus;