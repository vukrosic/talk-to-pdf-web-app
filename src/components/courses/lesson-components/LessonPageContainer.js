import React from "react";
import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import Header from "./HeaderAndFooter/Header";
import Footer from "./HeaderAndFooter/Footer";
import LessonQuestion from "./LessonQuestion";
import LessonText from "./LessonText";
import LessonFillInTheBlank from "./LessonFillInTheBlank";
import LessonCompleted from "./LessonCompleted";
import StreakCompleted from "./StreakCompleted";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  LessonPageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90vh",
  },
  content: {
    flexGrow: 1,
  },
};

const LessonPageContainer = () => {
  const [completed, setCompleted] = useState(false);
  const [ question, setQuestion ] = useState("What's your favourite color?");
  const [ choices, setChoices ] = useState(["Red", "Blue", "Green", "Yellow"]);
  const [ textLessonContent, setTextLessonContent ] = useState([
    {
      id: 0,
      text: "<bold>You can edit this text!</Bold>",
      isTextField: false,
      severity: "info",
      icon: <InfoIcon fontSize="inherit" />
    },
    {
      id: 1,
      text: "This is some text that you can edit.",
      isTextField: true
    },
    {
      id: 2,
      text: "Here is a warning message.",
      isTextField: false,
      severity: "warning",
      icon: <WarningAmberIcon fontSize="inherit" />
    },
    {
      id: 3,
      text: "Another editable text field.",
      isTextField: true
    }
  ]);

  const [lessonMap, setLessonMap] = useState([
    { index: 0, type: "text", content: [] },
    { index: 1, type: "question", question: question, choices: choices },
    { index: 2, type: "filintheblanks", content: [] },
    { index: 3, type: "completed", completed: completed },
  ]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const renderLessonComponent = (lessonType) => {
    switch (lessonType) {
      case "question":
        return <LessonQuestion />;
      case "text":
        return <LessonText textLessonContent={textLessonContent} />;
      case "filintheblanks":
        return <LessonFillInTheBlank />;
      case "completed":
        return <LessonCompleted setCompleted={setCompleted} />;
      case "streak":
        return <StreakCompleted />;
      default:
        return null;
    }
  };

  const onNextLesson = () => {
    setCurrentLessonIndex((prevIndex) =>
      prevIndex < lessonMap.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const onPreviousLesson = () => {
    setCurrentLessonIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  

  return (
    <div style={styles.LessonPageContainer}>
      <div style={styles.content}>
        <Header
          lessonTitle={`Lesson ${lessonMap[currentLessonIndex].index + 1}: ${
            lessonMap[currentLessonIndex].type
          }`}
        />
        {renderLessonComponent(lessonMap[currentLessonIndex].type)}
      </div>
      <Footer onNextLesson={onNextLesson} onPreviousLesson={onPreviousLesson} displayContinue={(currentLessonIndex === lessonMap.length - 1)} />
    </div>
  );
};

export default LessonPageContainer;