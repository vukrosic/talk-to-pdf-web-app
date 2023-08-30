import React, { useState } from "react";
import CourseModel from "../services/CourseModel";
import CourseView from "../views/CourseView";

const CourseController = () => {
  const { course, updateCourse } = CourseModel();
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddTopic = () => {
    if (!course) return;
console.log("12312312321")
  };

  const handleDeleteTopic = (topicIndex) => {
    if (!course) return;
console.log("12312312321")
  };

  const handleUpdateTopic = (topicIndex, newTopicName) => {
    if (!course) return;
console.log("12312312321")
  };

  const handleUpdateLesson = (topicIndex, lessonIndex, newLessonTitle, newLessonXP) => {
    if (!course) return;
console.log("12312312321")
  };

  const handleAddLesson = (topicIndex, newLessonXP) => {
    if (!course) return;
console.log("12312312321")
  };

  const handleDeleteLesson = (topicIndex, lessonIndex) => {
    if (!course) return;
console.log("12312312321")
  };

  return (
    <CourseView
      course={course}
      editMode={editMode}
      handleEditMode={handleEditMode}
      handleAddTopic={handleAddTopic}
      handleDeleteTopic={handleDeleteTopic}
      handleUpdateTopic={handleUpdateTopic}
      handleUpdateLesson={handleUpdateLesson}
      handleAddLesson={handleAddLesson}
      handleDeleteLesson={handleDeleteLesson}
    />
  );
};

export default CourseController;