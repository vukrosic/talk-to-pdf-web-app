import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Typography, Box, Divider } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SaveLessons from './SaveLessons';
import ChatWindow from './ChatWindow';

const LessonViewer = ({ lesson, task }) => {

  return (
    <div className="lesson-content">
      {lesson && (
        <div>
          <Typography variant="body2">
            <Markdown
              options={{
                overrides: {
                  pre: ({ children }) => (
                    <SyntaxHighlighter
                      language="javascript"
                      style={solarizedlight}
                      children={children.props.children}
                    />
                  ),
                },
              }}
            >
              {lesson}
            </Markdown>
          </Typography>
          {task && (
            <>
              <Box mt={3} mb={1}>
                <Divider />
              </Box>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                Task:
              </Typography>
              <Typography variant="body2">
                <Markdown>{task}</Markdown>
              </Typography>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonViewer;


