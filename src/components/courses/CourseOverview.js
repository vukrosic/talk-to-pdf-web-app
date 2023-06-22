import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import "./CourseOverview.css";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";

const CourseOverview = ({ course }) => {
    const [enrolled, setEnrolled] = useState(false);
  
    // Check if the user is enrolled when the component mounts
    useEffect(() => {
      const checkEnrollment = async () => {
        try {
          const userRef = doc(db, `users/${auth?.currentUser?.uid}`);
          const userDocSnapshot = await getDoc(userRef);
          const userData = userDocSnapshot.data();
          const enrolledCoursesData = userData.enrolledCourses;
          setEnrolled(enrolledCoursesData.includes(course.id));
        } catch (error) {
          console.error("Error checking enrollment:", error);
        }
      };
  
      checkEnrollment();
    }, [course.id]);

    const enrollUser = async () => {
        try {
          const userRef = doc(db, `users/${auth?.currentUser?.uid}`);
          const userDocSnapshot = await getDoc(userRef);
          const userData = userDocSnapshot.data();
          const enrolledCoursesData = userData.enrolledCourses;
          const updatedEnrolledCourses = [...enrolledCoursesData, course.id];
      
          await updateDoc(userRef, {
            enrolledCourses: updatedEnrolledCourses,
          });
      
          console.log("User enrolled in the course successfully!");
        } catch (error) {
          console.error("Error enrolling user:", error);
        }
      };
  return (
    <Container maxWidth="lg" className="Container">
      <Grid container spacing={2} className="Content">
        <Grid item xs={12} md={8} className="LeftColumn">
          <Typography variant="h4" component="h1" className="Title">
            {course.title}
          </Typography>
          <Typography variant="h6" component="h2" className="Subtitle">
            {course.subtitle}
          </Typography>
          <Typography variant="subtitle1" component="p" className="Creator">
            Created by {course.creator}
          </Typography>
          <Typography variant="h6" component="h3" className="WhatYouWillLearnTitle">
            What You Will Learn:
          </Typography>
          {course.whatYouWillLearn.map((item, i) => (
            <Typography key={i} variant="subtitle1" component="p" className="ListItem">
              {item}
            </Typography>
          ))}
          <Typography variant="h6" component="h3" className="CourseContentTitle">
            Course Content:
          </Typography>
          {course.lessons.map((lesson, i) => (
            <Card key={i} className="Card">
              <CardContent>
                <Typography variant="h6" component="h4" className="CardTitle">
                  {course.lessonTitles[i]}
                </Typography>
                <Typography variant="body1" component="p" className="CardContent">
                  {lesson}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h6" component="h3" className="RequirementsTitle">
            Requirements:
          </Typography>
          <Typography variant="body1" component="p" className="CardContent">
            {course.requirements}
          </Typography>
          <Typography variant="h6" component="h3" className="DescriptionTitle">
            Description:
          </Typography>
          <Typography variant="body1" component="p" className="CardContent">
            {course.description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} className="RightColumn">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" className="Price">
                {course.free ? "Free" : "$" + course.price}
              </Typography>
              <Typography variant="subtitle1" component="p">
                {enrolled ? (
                  <button className="EnterButton" onClick={console.log("123123")}>
                    Enter Course
                  </button>
                ) : (
                  <button className="EnrollButton" onClick={enrollUser}>
                    Enroll Now
                  </button>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseOverview;
