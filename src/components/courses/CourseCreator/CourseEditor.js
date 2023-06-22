import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import LessonViewer from '../LessonViewer';
import CreatorChatWindow from './CreatorChatWindow';
import LessonMarkdownEditor from './LessonMarkdownEditor';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const LessonUI = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [markdown, setMarkdown] = useState('');
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadMarkdown();
  }, []);

  const handleNextLesson = () => {
    setCurrentLessonIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentLessonIndex((prevIndex) => prevIndex - 1);
  };

  const loadMarkdown = async () => {
    const lessonRef = doc(db, 'courses', 'Javascript Fundamentals');
    const docSnapshot = await getDoc(lessonRef);
    if (docSnapshot.exists() && docSnapshot.data()) {
      const { lessons, tasks } = docSnapshot.data();
      if (lessons && tasks) {
        setLessons(lessons);
        setTasks(tasks);
        setMarkdown(lessons[currentLessonIndex]);
      }
    }
  };

  const isLastLesson = currentLessonIndex === lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;

  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            overflow: 'auto',
            bgcolor: '#fff',
            width: '100%',
            height: 'calc(100vh - 80px)',
            p: 2,
            borderRadius: '5px',
            boxShadow: 1
          }}
        >
          <LessonViewer lesson={markdown} task={tasks[currentLessonIndex]} />
          <Button disabled={isFirstLesson} onClick={handlePreviousLesson}>
            Previous Lesson
          </Button>
          <Button disabled={isLastLesson} onClick={handleNextLesson}>
            Next Lesson
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            overflow: 'auto',
            bgcolor: '#fff',
            width: '100%',
            height: 'calc(100vh - 80px)',
            borderRadius: '5px',
            boxShadow: 1
          }}
        >
          <LessonMarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            overflow: 'auto',
            bgcolor: '#fff',
            width: '100%',
            height: 'calc(100vh - 80px)',
            p: 2,
            borderRadius: '5px',
            boxShadow: 1
          }}
        >
          <CreatorChatWindow lesson={lessons[currentLessonIndex]} task={tasks[currentLessonIndex]} />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LessonUI;
