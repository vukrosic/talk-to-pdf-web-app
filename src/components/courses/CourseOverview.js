import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import "./CourseOverview.css";

const CourseOverview = () => {
  const course = {
    title: "Fundamentals of JavaScript",
    subtitle: "Learn the basics of JavaScript from scratch",
    creator: "John Doe",
    price: 50.00,
    whatYouWillLearn: [
      "Basics of Javascript programming",
      "Variables, operators, and data types",
      "Functions, conditional statements, and loops",
      "DOM manipulation and event handling",
      "Arrays, objects, and JSON",
    ],
    courseContent: [
      {
        title: "Introduction to JavaScript",
        content: "Introduction to JavaScript programming and basics",
      },
      {
        title: "Variables and Data Types",
        content: "Learn about variables and data types in JavaScript",
      },
      {
        title: "Functions and Loops",
        content: "Basic and advanced functions and for/while loops",
      },
      {
        title: "DOM Manipulation",
        content: "Introduction to Document Object Model (DOM) manipulation and event handling",
      },
      {
        title: "Arrays and Objects",
        content: "Arrays, objects, and JSON data in JavaScript programming",
      },
    ],
    requirements: "No prior programming experience needed. A computer with an internet connection is required.",
    description: "This course is designed for beginners who want to learn the basics of JavaScript programming. You will learn about variables, data types, functions, conditional statements, loops, DOM manipulation, arrays, objects, and JSON data. This course includes hands-on exercises and quizzes to help reinforce your learning.",
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
          {course.courseContent.map((item, i) => (
            <Card key={i} className="Card">
              <CardContent>
                <Typography variant="h6" component="h4" className="CardTitle">
                  {item.title}
                </Typography>
                <Typography variant="body1" component="p" className="CardContent">
                  {item.content}
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
                {"$" + course.price}
              </Typography>
              <Typography variant="subtitle1" component="p">
                <button className="BuyButton">
                  Buy Now
                </button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CourseOverview;