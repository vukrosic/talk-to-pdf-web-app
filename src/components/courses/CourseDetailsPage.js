import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import CourseOverview from "./CourseOverview";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCourse({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        // Handle error when a course with the given ID doesn't exist
        console.log("Course not found");
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return (
      <Container maxWidth="lg">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <CourseOverview course={course} />
      <Grid container spacing={2}>
        {course.lessons.map((lesson) => (
          <Grid key={lesson.id} item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={lesson.thumbnail}
                alt={lesson.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {lesson.title}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  Duration: {lesson.duration}
                </Typography>
                <Link to={`/courses/${course.id}/lessons`}>
                  <Button variant="contained" fullWidth>
                    Start Lesson
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseDetailsPage;