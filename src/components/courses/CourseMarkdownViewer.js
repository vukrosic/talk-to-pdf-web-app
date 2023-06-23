import React from "react";
import {
  Typography,
  Container,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CourseMarkdownViewer = (props) => {
  const { courseContent } = props;
    console.log(props);
  return (
    <Markdown
      children={courseContent}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={solarizedlight}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
      }}
    />
  );
};

export default CourseMarkdownViewer;