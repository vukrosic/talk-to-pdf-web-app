// src/components/LessonCard.js

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import DeleteIcon from "@mui/icons-material/Delete";

const LessonCard = ({ editMode, lesson, handleUpdate, handleDelete }) => {
  return (
    <Card className="LessonCard">
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
                  handleUpdate(e.target.value, lesson.xp)
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
                 handleUpdate(lesson.title, e.target.value)
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
              onClick={handleDelete}
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
  );
};

export default LessonCard;