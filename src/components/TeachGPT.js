// import React, { useState } from "react";
// // import { callOpenAIAPI } from "./CallOpenAIAPI";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import ChatUI from "./ChatUI";
// import { auth, db } from "../config/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { usePremiumStatus } from "../stripe/usePremiumStatus";


// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`wrapped-tabpanel-${index}`}
//       aria-labelledby={`wrapped-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </Typography>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `wrapped-tab-${index}`,
//     "aria-controls": `wrapped-tabpanel-${index}`,
//   };
// }

// const initialMessages = () => ({
//   lesson: [{
//     role: "assistant",
//     content: "Generate an interactive advanced python programing language lesson about a random topic from advanced python. Use markdown. Generate code snippets, bulletpoints, examples, lists, analysis, etc. Don't make it too common and predictable topic.",
//   }],

//   snippet: [{
//     role: "assistant",
//     content: "Generate a random code snippet in python programing language and ask me a question about it. Don't make it too common and predictable code snippet."
//   }],

//   quiz: [{
//     role: "assistant",
//     content: "Generate an interactive advanced machine learning in python programing language lesson about a random topic from machine learning in python. Use markdown. Generate code snippets, bulletpoints, examples, lists, analysis, etc. Don't make it too common and predictable topic.",
//   }],

//   datastruc: [{
//     role: "assistant",
//     content: "Generate an interactive advanced data structures and algorithms in python programing language lesson about a random topic from data structures and algorithms in python. Use markdown. Generate code snippets, bulletpoints, examples, lists, analysis, etc. Don't make it too common and predictable topic.",
//   }],

//   code: [{
//     role: "assistant",
//     content: "Generate a random python code with an intentional bug and ask me to correct it.",
//   }]
// });

// const TeachGPT = () => {
//   const [input, setInput] = useState("");
//   const [tabValue, setTabValue] = useState(0);
//   const [messages, setMessages] = useState(initialMessages());
//   const [freeMessages, setFreeMessages] = useState(0);
//   const userisPremium = usePremiumStatus(auth?.currentUser);

//   // effect set message on effect
//   React.useEffect(() => {
//     getFreeMessages();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const resetAllConversation = () => {
//     setMessages(initialMessages());
//   };

//   const getFreeMessages = async () => {
//     try {
//       const docRef = doc(db, "users", auth?.currentUser?.uid);
//       const docSnap = await getDoc(docRef);
//       if(docSnap.exists()) {
//         setFreeMessages(docSnap.data().freeTrial);
//         return docSnap.data().freeTrial;
//       } else {
//         console.log("Document does not exist");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const substractAFreeMessage = async () => {
//     const freeMessagesRemaining = await getFreeMessages();
//     try {
//       const docRef = doc(db, "users", auth?.currentUser?.uid);
//       const docSnap = await setDoc(docRef, {
//         freeTrial: freeMessagesRemaining - 1
//       }, { merge: true });
//       setFreeMessages(freeMessagesRemaining - 1);
//       console.log("Document written with ID: ", docSnap.id);
//     } catch (error) {
//       console.log(error);
//     }
    
//   }; 



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // check if user is premium
//     if(!userisPremium) {
//       getFreeMessages();
//       if(freeMessages <= 0) {
//         alert("You have no more free messages left. Please purchase a premium plan.");
//         return;
//       }
//       substractAFreeMessage();
//     }

//     try {
//       const docRef = doc(db, "users", auth?.currentUser?.id);
//       const docSnap = await getDoc(docRef);
//       if(docSnap.exists()) { 
//         console.log("Document data:", docSnap.data().stripeId);
//         return docSnap.data().freeTrial;
//       } else {
//         console.log("Document does not exist");
//       }
//     } catch (error) {
//       console.log(error);
//     }


//     // if the user in not logged in, redirect to /signin
//     if (!auth.currentUser) {
//       console.log("User is not logged in");
//       window.location.href = "/signin";
//       return;
//     }

//     // make a for loop that goes through all the messages and check if the length is greater than 5
//     for(let key in messages) {
//       if(messages[key].length >= 5) {
//         alert("Currently we limit the number of messages to 5. Please reset the conversations.");
//         return;
//       }
//     }

//     const tabKeys = ["lesson", "snippet", "quiz", "datastruc", "code"]; // Add other keys here
//     const key = tabKeys[tabValue];
//     // if input trim is not emptry
//     if (input.trim()) {
//       const newMessage = { role: "user", content: input };
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [key]: [...prevMessages[key], newMessage],
//       }));
//       setInput("");
//     }

//     try {
//       await callOpenAIAPI(messages[key], "gpt-3.5-turbo");
//     } catch (error) {
//       console.error("Error while calling OpenAI API:", error);
//     }
//   };



// const callOpenAIAPI = async (messages1, model) => {
//   const apiKey = "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";
//   const url = "https://api.openai.com/v1/chat/completions";


//   const requestBody = {
//     model: model,
//     messages: messages1,
//     stream: true,
//   };

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify(requestBody),
//   });

//   const reader = response.body.getReader();
//   let decoder = new TextDecoder();
//   let partialResponse = '';
//   // add a new message to the messages array
//   let newMessage = { role: "assistant", content: "" };
//   const tabKeys = ["lesson", "snippet", "quiz", "datastruc", "code"]; // Add other keys here
//   const key = tabKeys[tabValue];
//   let updatedContent = "";

//   setMessages((prevMessages) => ({
//     ...prevMessages,
//     [key]: [...prevMessages[key], newMessage],
//   }));


//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     partialResponse = decoder.decode(value);
//     const lines = partialResponse.split('\n');
//     for (const line of lines) {
//       if (line.startsWith('data:')) {
//         const data = line.slice(6);
//         if (data.trim() === "[DONE]") {
//           return;
//         } else {
//           const parsedData = JSON.parse(data);
//           if (parsedData.choices && parsedData.choices.length > 0) {
//             const delta = parsedData.choices[0]?.delta;
            
//             if (delta && delta.hasOwnProperty('content')) {
//               const content = delta.content;
//               updatedContent += content;
//               setMessages((prevMessages) => {
//                 const lastIndex = prevMessages[key].length - 1;
//                 // Create a new copy of the messages array
//                 const newArray = [...prevMessages[key]];
//                 // Update the message content in the array
//                 newArray[lastIndex] = {
//                   ...newArray[lastIndex],
//                   content: updatedContent,
//                 };
//                 return {
//                   ...prevMessages,
//                   [key]: newArray,
//                 };
//               });
//             } else {
//               console.log('Content property not found in delta.');
//             }
//           }
          
//         }
//       }
//     }

//   }
// };



//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//         height: "100%",
//       }}
//     >
//     <br></br>
//     <Typography variant="h5">Learn python through a chat conversation.</Typography>
//     <br></br>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
//           <Tab label="Advanced Python Lesson" {...a11yProps(0)} />
//           <Tab label="Code Snippet Question" {...a11yProps(1)} />
//           <Tab label="Machine Learning / AI Lesson" {...a11yProps(2)} />
//           <Tab label="Data Structures and Algorithms Lesson" {...a11yProps(3)} />
//           <Tab label="Code Debugging" {...a11yProps(4)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={tabValue} index={0}>
//         <h1>Advanced Python Lesson</h1>
//         <ChatUI messages={messages.lesson} />
//       </TabPanel>
//       <TabPanel value={tabValue} index={1}>
//         <h1>Python Code Snippet Question</h1>
//         <ChatUI messages={messages.snippet} />
//       </TabPanel>
//       <TabPanel value={tabValue} index={2}>
//         <h1>Machine Learning / AI Lesson</h1>
//         <ChatUI messages={messages.quiz} />
//       </TabPanel>
//       <TabPanel value={tabValue} index={3}>
//         <h1>Python Data Structures and Algorithms Lesson</h1>
//         <ChatUI messages={messages.datastruc} />
//       </TabPanel>
//       <TabPanel value={tabValue} index={4}>
//         <h1>Python Code Snippet Debugging</h1>
//         <ChatUI messages={messages.code} />
//       </TabPanel>

//       <Box sx={{ width: "60%", mt: 2, mx: "auto" }}>
//       <TextField
//          fullWidth
//           id="outlined-multiline-static"
//           label="Your message"
//           multiline
//           rows={4}
//           variant="outlined"
//           value={input}
//           onChange={handleInputChange}
//       />
//     </Box>
//     <Box sx={{ width: "60%", mx: "auto", textAlign: "right" }}>
//     <Button
//       type="submit"
//       variant="contained"
//       sx={{ mt: 3, mb: 2, minWidth: "200px" }}
//     >
//       Submit
//     </Button>
//     <br/>
//     {!userisPremium ? <div><Typography variant="h6">You have {freeMessages} free messages left.</Typography><br></br> </div>
//     : <div></div>}

    
//     <Button
//       onClick={resetAllConversation}
//       variant="contained"
//       color="error"
//       sx={{ mt: 1, minWidth: "200px" }}
//     >
//       Reset All Conversations
//     </Button>
// </Box>
//     </Box>
//   );
// };

// export default TeachGPT;