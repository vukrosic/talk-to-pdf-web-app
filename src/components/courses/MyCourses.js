import React, { useState, useEffect } from "react";
import { auth, db } from '../../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Container, Tab, Tabs, Grid, Card, CardContent, Typography } from "@mui/material";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = auth?.currentUser;

  useEffect(() => {
    const fetchCoursesFromDB = async () => {
      if (!currentUser) return;

      const createdCoursesRef = collection(db, `users/${currentUser.uid}/created_courses`);
      const createdCoursesSnapshot = await getDocs(createdCoursesRef);
      const createdCourses = createdCoursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || "",
        description: doc.data().description || "",
      }));


      const userRef = doc(db, `users/${currentUser.uid}`);
      const userDocSnapshot = await getDoc(userRef);
      const userData = userDocSnapshot.data();
      const enrolledCoursesData = userData.enrolledCourses || [];
      setCourses([createdCourses, enrolledCoursesData]);
    };

    fetchCoursesFromDB();

    return () => {
      // Cleanup if needed
    };
  }, [currentUser]);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  if (!currentUser) {
    return <div>Please log in to view your courses</div>;
  }

  return (
    <Container>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Created Courses" />
        <Tab label="Enrolled Courses" />
      </Tabs>

      {courses.length > 0 ? (
        <Grid container spacing={3}>
          {courses[activeTab].map((course) => (
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
      ) : (
        <Typography variant="subtitle1" align="center">
          No courses available in this category.
        </Typography>
      )}
    </Container>
  );
};

export default MyCourses;
