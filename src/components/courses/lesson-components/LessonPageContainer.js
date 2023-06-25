import React from "react";
import { Container, Typography, Button } from "@mui/material";
import Header from "./HeaderAndFooter/Header";
import Footer from "./HeaderAndFooter/Footer";
import LessonQuestion from "./LessonQuestion";
import LessonText from "./LessonText";
import LessonFillInTheBlank from "./LessonFillInTheBlank";
import LessonCompleted from "./LessonCompleted";
import StreakCompleted from "./StreakCompleted";

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

const LessonPageContainer = ({ onNextLesson }) => {
  // Define the lesson data as a constant
  const lesson = {
    type: "text",
    title: "Introduction to Human Anatomy",
    question: "Which of the following is not a component of the integumentary system?",
    option1: "Skin",
    option2: "Hair",
    option3: "Nails",
    option4: "Heart",
    content: "The integumentary system is the largest organ system of the body. It is composed of the skin and its accessory structures including hair, nails, and glands. The integumentary system protects the body from the outside world, regulates body temperature, and helps to store water, fat, and vitamin D.",
  };

  const renderLessonComponent = () => {
    switch (lesson.type) {
      case "question":
        return <LessonQuestion />;
      case "text":
        return <LessonText content={lesson.content} />;
      case "filintheblanks":
        return <LessonFillInTheBlank />;
      case "completed":
        return <LessonCompleted />;
      case "streak":
        return <StreakCompleted />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.LessonPageContainer}>
      <div style={styles.content}>
        <Header lessonTitle={lesson.title} />
        {renderLessonComponent()}
      </div>
      <Footer onNextLesson={onNextLesson} />
    </div>
  );
};

export default LessonPageContainer;
