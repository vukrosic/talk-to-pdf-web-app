import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
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
    </Container>
  );
};

export default CourseDetailsPage;