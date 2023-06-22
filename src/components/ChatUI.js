import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Container,
  TextField,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import DeveloperBoardSharpIcon from '@mui/icons-material/DeveloperBoardSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MessageContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const MessageCard = styled(Card)(({ theme, messageRole }) => ({
  marginTop: theme.spacing(1),
  elevation: messageRole === 'user' ? 1 : 3,
}));

const ChatUI = ({ messages }) => {
  // change {messages.map((message, index) => ( to filteredMessages
  const filteredMessages = messages.filter((message) => message.role !== 'system');
  const [newMessage, setNewMessage] = useState('');

  return (
    <div>
      <Container>
        <MessageContainer>
          <Grid container>
            {filteredMessages.map((message, index) => (
              <Grid key={index} item xs={12}>
                <MessageCard messageRole={message.role}>
                  <CardHeader
                    avatar={
                      message.role === 'user' ? (
                        <AccountCircleSharpIcon sx={{ fontSize: 32 }} color="primary" />
                      ) : (
                        <DeveloperBoardSharpIcon sx={{ fontSize: 32 }} color="secondary" />
                      )
                    }
                  />

                  <CardContent>
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
                        {message.content}
                      </Markdown>
                    </Typography>
                  </CardContent>
                </MessageCard>
              </Grid>
            ))}
          </Grid>
        </MessageContainer>
      </Container>
    </div>
  );
};

export default ChatUI;
