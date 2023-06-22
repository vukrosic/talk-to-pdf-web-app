import React, { useState } from "react";
import {
  Typography,
  Container,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import LessonViewer from "./LessonViewer";
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CourseStepperViewer = () => {
  const courseContent = [
    {
      title: "Introduction to Human Anatomy",
      content: 
      "Welcome to the introduction to human anatomy! In this lesson, we will explore the basic concepts and principles of human anatomy.\n        \n        ![Human Anatomy](https://example.com/human-anatomy-image.jpg)\n        \n        ### Lesson Objectives:\n        - Understand the organization of the human body\n        - Learn the primary functions of the different body systems\n        - Identify and describe the major organs and structures\n        \n        ### Lesson Outline:\n        1. Definition and importance of human anatomy\n        2. Body systems overview\n        3. Major organs and structures\n        4. Summary and conclusion\n        \n        Through text, images, and bullet points, you will gain a solid foundation in understanding the structure and organization of the human body.",
      },
    {
      title: "Skeletal System",
      content: `
        In this lesson, we will dive deeper into the skeletal system. We will examine the different types of bones in the human body, such as long bones, short bones, flat bones, and irregular bones. You will learn about their functions, such as providing support, protecting internal organs, and enabling movement. Through interactive diagrams and detailed explanations, you will develop a comprehensive understanding of the skeletal system.
      `,
    },
    {
      title: "Bones of the Skull",
      content: `
        Welcome to the lesson on bones of the skull! In this lesson, we will explore the intricate structure and functions of the skull. You will discover the different bones that make up the skull, including the frontal bone, parietal bones, occipital bone, temporal bones, and more. We will discuss the unique features and roles of these bones, and how they contribute to protecting the brain and supporting facial structures. By utilizing informative descriptions, diagrams, and even video embeds, you will gain a thorough comprehension of the bones of the skull.
      `,
    },
    {
      title: "Bones of the Upper Limb",
      content: `
        Welcome to the lesson on bones of the upper limb! In this lesson, we will focus on the bones of the arm, forearm, and hand. You will learn about the humerus, radius, ulna, carpals, metacarpals, and phalanges. Through detailed explanations and visual aids, you will understand the structure, joints, and movements facilitated by these bones. Whether it's flexion, extension, rotation, or any other movement, you will grasp how the bones of the upper limb contribute to our overall mobility.
      `,
    }
  ];
  const courseContent1 = `
  # Introduction to Human Anatomy
  
  Welcome to the introduction to human anatomy! In this lesson, we will explore the basic concepts and principles of human anatomy.
  
  ![Human Anatomy](https://example.com/human-anatomy-image.jpg)
  
  ## Lesson Objectives:
  - Understand the organization of the human body
  - Learn the primary functions of the different body systems
  - Identify and describe the major organs and structures
  
  ## Lesson Outline:
  1. Definition and importance of human anatomy
  2. Body systems overview
  3. Major organs and structures
  4. Summary and conclusion
  
  Through text, images, and bullet points, you will gain a solid foundation in understanding the structure and organization of the human body.
  `;


  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="lg">
      <Stepper activeStep={activeStep} alternativeLabel>
        {courseContent.map((lesson, index) => (
          <Step key={index}>
            <StepLabel>{lesson.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="course-container">
        <Typography variant="h5" component="h2">
          {courseContent[activeStep].title}
        </Typography>
        <LessonViewer lesson={courseContent[activeStep].content} />
      </div>
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNext}
          disabled={activeStep === courseContent.length - 1}
        >
          Next
        </Button>
        <Markdown
        children={courseContent1}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter style={solarizedlight} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
            ) : (
              <code className={className} {...props}>{children}</code>
            )
          }
        }}
      />
      </div>
    </Container>
  );
};

export default CourseStepperViewer;