// src/components/TopicAccordion.js

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LockIcon from "@mui/icons-material/Lock";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LessonCard from "./LessonCard";

const TopicAccordion = ({
  topic,
  lessons,
  topicIndex,
  editMode,
  handleUpdateTopic,
  handleDeleteTopic,
  handleUpdateLesson,
  handleAddLesson,
  handleDeleteLesson,
}) => {
  return (
    <Accordion className="TopicAccordion">
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
          <LessonCard
            key={lessonIndex}
            editMode={editMode}
            lesson={lesson}
            handleUpdate={(title, xp) =>
              handleUpdateLesson(topicIndex, lessonIndex, title, xp)
            }
            handleDelete={() =>
              handleDeleteLesson(topicIndex, lessonIndex)
            }
          />
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
  );
};

export default TopicAccordion;