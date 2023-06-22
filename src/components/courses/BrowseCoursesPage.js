import { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, Card, CardContent, CardMedia, TextField } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import CourseOverview from "./CourseOverview";
import { Link } from "react-router-dom";

const BrowseCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail}
                alt={course.title}
                sx={{ objectFit: "cover" }}
              />
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
                  {course.creator} | {course.enrollmentCount} enrolled
                </Typography>
                <Link to={`/courses/${course.id}`}>
                  <Button variant="contained" fullWidth>
                    Enroll Now
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

export default BrowseCoursesPage;