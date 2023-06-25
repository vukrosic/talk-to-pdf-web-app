import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "courses", id));
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg" py={8}>
        <Typography variant="h4" component="h2" align="center" mb={4}>
          Manage Courses
        </Typography>
        <Paper variant="outlined" elevation={3} sx={{ p: 4 }}>
          {courses.map((course) => (
            <Box key={course.id} mb={4}>
              <Typography variant="h6" component="h3">
                {course.title}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Paper>
  
        <Box mt={4}>
          <Typography variant="h6">Course Titles:</Typography>
          {courses.map((course) => (
            <Typography variant="body1" key={course.id}>
              {course.title}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
  
};

export default ManageCourses;
