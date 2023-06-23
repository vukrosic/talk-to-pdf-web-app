import React, { useState, useEffect } from "react";
import { db } from '../../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCoursesFromDB = async () => {
      const coursesCollectionRef = collection(db, "courses");
      const coursesSnapshot = await getDocs(coursesCollectionRef);
      const courseDocs = coursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(courseDocs);
    };

    fetchCoursesFromDB();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="subtitle1">{course.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllCourses;