import React from "react";
import { Container, Typography } from "@mui/material";

const LessonText = ({ content }) => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "60%",
      }}
    >
      <Typography variant="body1" style={{ textAlign: "left", marginBottom: "1em" }}>
        {content}
      </Typography>
    </Container>
  );
};

export default LessonText;