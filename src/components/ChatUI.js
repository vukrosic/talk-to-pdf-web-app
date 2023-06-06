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










import React from "react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatUI = ({ messages }) => {
  return (
    <div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUI;

