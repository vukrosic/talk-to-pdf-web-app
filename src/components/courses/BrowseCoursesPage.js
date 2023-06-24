import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Card, CardContent, TextField } from "@mui/material";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import CourseOverview from "./CourseOverview";
import { Link } from "react-router-dom";
import React from "react";
import '../cssDecor/cssBrowseCoursesPage.css';

const BrowseCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolled, setEnrolled] = useState([]);

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

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const userRef = doc(db, `users/${auth?.currentUser?.uid}`);
        const userDocSnapshot = await getDoc(userRef);
        const userData = userDocSnapshot.data();
        const enrolledCoursesData = userData.enrolledCourses;
        setEnrolled(enrolledCoursesData || []);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };

    if (auth.currentUser) {
      checkEnrollment();
    }
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enrollUser = () => {
    // Implement the logic to enroll the current user to the course
  };

  return (
    <Container maxWidth="lg" className="Container">
      <Grid container spacing={2} className="Content">
        <Grid item xs={12}>
          <TextField
            label="Search courses"
            fullWidth
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Grid>
        {filteredCourses.map((course) => (
          <Grid item key={course.id} xs={2} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className="CardTitle"
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="CardSubtitle"
                >
                  {course.free ? "Free" : "Premium"}
                </Typography>
                  <Link to={`/courses/${course.id}/lessons`} className="EnterButton">
                    Enter Course
                  </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BrowseCoursesPage;