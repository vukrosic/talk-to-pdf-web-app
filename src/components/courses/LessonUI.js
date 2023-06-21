import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import LessonContent from './LessonContent';
import CodeEditor from './CodeEditor';
import ChatWindow from './ChatWindow';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import SaveLessons from './SaveLessons';

const LessonUI = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [code, setCode] = useState('');
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
      }
    }
  };

  const isLastLesson = currentLessonIndex === lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;

  return (
    <Grid container spacing={2}>
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
          <LessonContent lesson={lessons[currentLessonIndex]} task={tasks[currentLessonIndex]} />
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
            p: 2,
            borderRadius: '5px',
            boxShadow: 1
          }}
        >
          <CodeEditor code={code} setCode={setCode} />
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
          <ChatWindow />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LessonUI;
