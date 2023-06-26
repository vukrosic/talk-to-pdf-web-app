// // src/views/CourseView.js

// import React from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Button,
//   TextField,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
// import LockIcon from "@mui/icons-material/Lock";
// import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// // import "./CourseSyllabus.css";

// const CourseView = ({ course, editMode, handleEditMode, handleAddTopic, handleDeleteTopic, handleUpdateTopic, handleUpdateLesson, handleAddLesson, handleDeleteLesson }) => {
//   return (
//     <Container maxWidth="lg" className="Container">
//       {course && (
//         <Grid container spacing={2} justifyContent="center" className="Content">
//           <Grid item xs={12} md={8}>
//             <div className="TitleContainer">
//               <Typography variant="h4" component="h1" className="Title">
//                 {course.title}
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 component="p"
//                 className="Description"
//               >
//                 {course.description}
//               </Typography>
//             </div>
//             {Object.entries(course.lessons).map(([topic, lessons], topicIndex) => (
//               <Accordion key={topicIndex} className="TopicAccordion">
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   className="AccordionSummary"
//                   aria-controls={`panel${topicIndex + 1}-content`}
//                   id={`panel${topicIndex + 1}-header`}
//                 >
//                   {topicIndex === 0 ? (
//                     <PlayCircleFilledIcon className="TopicIcon" />
//                   ) : (
//                     <LockIcon className="TopicIcon" />
//                   )}
//                   {editMode ? (
//                     <TextField
//                       defaultValue={topic}
//                       onBlur={(e) => handleUpdateTopic(topicIndex, e.target.value)}
//                       size="small"
//                       label="Topic"
//                       variant="outlined"
//                       className="EditTopicTextField"
//                     />
//                   ) : (
//                     <Typography variant="h6" className="AccordionTitle">
//                       {topic}
//                     </Typography>
//                   )}
//                 </AccordionSummary>
//                 <AccordionDetails className="AccordionDetails">
//                   {lessons.map((lesson, lessonIndex) => (
//                     <Card key={lessonIndex} className="LessonCard">
//                       <CardContent>
//                         <div className="LessonContainer">
//                           <div className="LessonIconContainer">
//                             <HistoryEduIcon className="LessonIcon" />
//                           </div>
//                           <div className="LessonTitleContainer">
//                             {editMode ? (
//                               <TextField
//                                 defaultValue={lesson.title}
//                                 onBlur={(e) =>
//                                   handleUpdateLesson(
//                                     topicIndex,
//                                     lessonIndex,
//                                     e.target.value
//                                   )
//                                 }
//                                 size="small"
//                                 label="Lesson Title"
//                                 variant="outlined"
//                                 className="EditLessonTextField"
//                               />
//                             ) : (
//                               <Typography variant="h6" className="LessonTitle">
//                                 {lesson.title}
//                               </Typography>
//                             )}
//                           </div>
//                           {editMode ? (
//                             <div className="LessonXPContainer">
//                               <TextField
//                                 defaultValue={lesson.xp}
//                                 onBlur={(e) =>
//                                   handleUpdateLesson(
//                                     topicIndex,
//                                     lessonIndex,
//                                     lesson.title,
//                                     parseInt(e.target.value)
//                                   )
//                                 }
//                                 type="number"
//                                 size="small"
//                                 label="XP"
//                                 variant="outlined"
//                                 className="EditLessonXPTextField"
//                               />
//                             </div>
//                           ) : (
//                             <div className="XPContainer">{lesson.xp}XP</div>
//                           )}
//                           {editMode && (
//                             <Button
//                               variant="outlined"
//                               onClick={() => handleDeleteLesson(topicIndex, lessonIndex)}
//                               className="DeleteLessonButton"
//                               startIcon={<DeleteIcon />}
//                               size="small"
//                             >
//                               Delete
//                             </Button>
//                           )}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                   {editMode && (
//                     <Button
//                       variant="outlined"
//                       onClick={() => handleAddLesson(topicIndex)}
//                       className="AddLessonButton"
//                       startIcon={<AddIcon />}
//                       size="small"
//                     >
//                       Add Lesson
//                     </Button>
//                   )}
//                 </AccordionDetails>
//                 {editMode && (
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleDeleteTopic(topicIndex)}
//                     className="DeleteTopicButton"
//                     startIcon={<DeleteIcon />}
//                     size="small"
//                   >
//                     Delete Topic
//                   </Button>
//                 )}
//               </Accordion>
//             ))}
//             {editMode && (
//               <Grid container spacing={2} justifyContent="flex-end">
//                 <Button
//                   variant="contained"
//                   onClick={handleAddTopic}
//                   className="AddTopicButton"
//                 >
//                   Add Topic
//                 </Button>
//               </Grid>
//             )}
//             <Grid container spacing={2} justifyContent="flex-end" className="Content">
//               <Button
//                 variant="contained"
//                 onClick={handleEditMode}
//                 className={`EditButton ${editMode ? "editMode" : ""}`}
//                 style={{ backgroundColor: editMode ? "green" : "blue" }}
//               >
//                 {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default CourseView;



// src/views/CourseView.js

import React from "react";
import { Container, Grid, Button } from "@mui/material";
import CourseTitle from "../components/CourseTitle";
import TopicAccordion from "../components/TopicAccordion";

const CourseView = ({
  course,
  editMode,
  handleEditMode,
  handleAddTopic,
  handleDeleteTopic,
  handleUpdateTopic,
  handleUpdateLesson,
  handleAddLesson,
  handleDeleteLesson,
}) => {
  return (
    <Container maxWidth="lg" className="Container">
      {course && (
        <Grid container spacing={2} justifyContent="center" className="Content">
          <Grid item xs={12} md={8}>
            <CourseTitle title={course.title} description={course.description} />

            {Object.entries(course.lessons).map(([topic, lessons], topicIndex) => (
              <TopicAccordion
                key={topicIndex}
                topic={topic}
                lessons={lessons}
                topicIndex={topicIndex}
                editMode={editMode}
                handleUpdateTopic={handleUpdateTopic}
                handleDeleteTopic={handleDeleteTopic}
                handleUpdateLesson={handleUpdateLesson}
                handleAddLesson={handleAddLesson}
                handleDeleteLesson={handleDeleteLesson}
              />
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

export default CourseView;