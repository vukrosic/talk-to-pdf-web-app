// import React, { useState, useEffect } from "react";
// import { Configuration, OpenAIApi } from "openai";
// import Markdown from "markdown-to-jsx";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { auth, db } from "../config/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { callOpenAIAPI } from "./CallOpenAIAPI";
// import {
//   collection,
//   addDoc,
//   query,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";

// const ChatUI = () => {
//   const [messages, setMessages] = useState([
//     {
//       role: "system",
//       content: "You are counter. You count to 10.",
//       timestamp: new Date(),
//     },
//   ]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const userMsgQuery = query(
//           collection(db, `users/${user.uid}/messages`),
//           orderBy("timestamp", "asc")
//         );

//         const unsubscribeSnapshot = onSnapshot(userMsgQuery, (snapshot) => {
//           const fetchedMessages = [];
//           snapshot.forEach((doc) => {
//             fetchedMessages.push(doc.data());
//           });
//           setMessages(fetchedMessages);
//         });

//         return () => {
//           unsubscribeSnapshot();
//         };
//       } else {
//         setMessages([
//           {
//             role: "system",
//             content: "You are counter. You count to 10.",
//             timestamp: new Date(),
//           },
//         ]);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const addMessage = async (content, role) => {
//     const newMessage = { role, content, timestamp: new Date() };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
  
//     if (auth.currentUser) {
//       try {
//         await addDoc(
//           collection(db, `users/${auth.currentUser.uid}/messages`),
//           newMessage
//         );
//       } catch (error) {
//         console.log("Error saving message in Firestore: ", error);
//       }
//     }
  
//     if (role === "user") {
//       const { timestamp, ...newMessageWithoutTimestamp } = newMessage;
//       const messagesWithoutTimestamps = messages.map(({ timestamp, ...rest }) => rest);
//       callOpenAIAPI([...messagesWithoutTimestamps, newMessageWithoutTimestamp], "gpt-3.5-turbo").then((aiResponse) => {
//         addMessage(aiResponse, "assistant");
//         console.log(messagesWithoutTimestamps);
//       });
//     }
//   };


//   const handleMessageSubmit = (e) => {
//     e.preventDefault();
//     const userMessage = e.target.message.value;
//     addMessage(userMessage, "user");
//     e.target.reset();
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.role}`}>
//             <div className="message-content">
//               <Markdown
//                 options={{
//                   overrides: {
//                     pre: ({ children }) => (
//                       <SyntaxHighlighter
//                         language="javascript"
//                         style={solarizedlight}
//                         children={children.props.children}
//                       />
//                     ),
//                   },
//                 }}
//               >
//                 {message.content}
//               </Markdown>
//             </div>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleMessageSubmit}>
//         <input type="text" name="message" placeholder="Type your message..." />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatUI;







// import React, { useState } from "react";
// import Markdown from "markdown-to-jsx";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

// const ChatUI = () => {
//   const [messages, setMessages] = useState([
//     {
//       role: "system",
//       content: "You are counter. You count to 10.",
//       timestamp: new Date(),
//     },
//   ]);

//   // Function to add a new message
//   const addMessage = () => {
//     const newMessage = {
//       role: "user",
//       content: "Hello, how are you?",
//       timestamp: new Date(),
//     };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.role}`}>
//             <div className="message-content">
//               <Markdown
//                 options={{
//                   overrides: {
//                     pre: ({ children }) => (
//                       <SyntaxHighlighter
//                         language="javascript"
//                         style={solarizedlight}
//                         children={children.props.children}
//                       />
//                     ),  
//                   },
//                 }}
//               >
//                 {message.content}
//               </Markdown>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatUI;




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
  console.log("11111111111111111111111111");
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const role = 'user'; // Assuming the new message is from the user
    const content = newMessage;

    // Create a new message object
    const newMessageObj = {
      role,
      content,
    };

    // Update the messages prop with the new message
    const updatedMessages = [...messages, newMessageObj];
    // Perform any additional logic on the updated messages if needed

    console.log('New message:', newMessageObj);
    setNewMessage(''); // Clear the input field after submitting
  };

  return (
    <div>
      <Container>
        <MessageContainer>
          <Grid container>
            {messages.map((message, index) => (
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
