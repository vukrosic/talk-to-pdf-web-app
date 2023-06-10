import React, { useState } from "react";
import { callOpenAIAPI } from "./CallOpenAIAPI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ChatUI from "./ChatUI";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const TeachGPT = () => {
  const [input, setInput] = useState("");  

  const defaultMessagesLesson = [{
    role: "assistant",
    content: "Generate an interactive advanced python lesson about a random topic from advanced python. User markdown. Generate code snippets, bulletpoints, examples, lists, analysis, etc.",
  },
  {
    role: "assistant",
    content: "Press submit to get an interactive advanced python lesson.",
  }];

  const defaultMessagesSnippet = [{
    role: "assistant",
    content: "Generate a random code snippet in python and ask me a question about it."
  },
  {
    role: "assistant",
    content: "Press submit to get a python code snippet and a question about it.",
  }];

  const defaultMessagesQuiz = [{
    role: "assistant",
    content: "As an AI language model, I'm here to help you with coding challenges and quizzes to test your understanding of various programming concepts in Python. Below you will find a set of challenging tasks designed to push your skills to the next level. Take your time to solve them, and when you're ready, submit your solutions for evaluation. I'll provide feedback and hints to guide you along the way.\n\nExample challenge 1:\nWrite a Python function that takes a list of integers as input and returns the sum of the squares of all the even numbers in the list. I will generate only one challenge for now.",
  },
  {
    role: "assistant",
    content: "Press submit to get a python quiz question.",
  }];

  const defaultMessagesDataStruc = [{
    role: "assistant",
    content: "This area focuses on helping users prepare for coding interviews. When users request a problem, you should provide them a comprehensive data structures and algorithms problem to solve in python. Additionally, you should be ready to offer hints, clarifications, and solutions upon request.",
  },
  {
    role: "assistant",
    content: "Press submit to get a data structure and algorithms (python) question.",
  }];

  const defaultMessagesDebugCode = [{
    role: "assistant",
    content: "You will generate a random python code that needs to be debugged by the user. Then you will evaluate if the user debugged it successfully.\n\nThe code snippet generator will follow these steps to create a random prompt:\n\n1. Select a random Python programming concept from a list, such as loops, conditional statements, functions, error handling, or classes.\n2. Choose a common error related to the selected concept, such as syntax errors, logic errors, or missing/incorrect function arguments.\n3. Generate a short code snippet that demonstrates the chosen error within the context of the selected concept.\n4. Ensure that the same error and concept combination are not repeated in a set period to maintain variety in the generated prompts.\n\nThe generator will follow this process to create unique prompts that will effectively teach users how to debug various types of errors in python code.",
  },
  {
    role: "assistant",
    content: "Press submit to get a broken code to debug in python.",
  }];

  const [tabValue, setTabValue] = useState(0);
  const [messagesLesson, setMessagesLesson] = useState(defaultMessagesLesson);
  const [messagesSnippet, setMessagesSnippet] = useState(defaultMessagesSnippet);
  const [messagesQuiz, setMessagesQuiz] = useState(defaultMessagesQuiz);
  const [messagesDataStruc, setMessagesDataStruc] = useState(defaultMessagesDataStruc);
  const [messagesDebugCode, setMessagesDebugCode] = useState(defaultMessagesDebugCode);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const resetAllConversation = () => {
    setMessagesLesson(defaultMessagesLesson);
    setMessagesSnippet(defaultMessagesSnippet);
    setMessagesQuiz(defaultMessagesQuiz);
    setMessagesDataStruc(defaultMessagesDataStruc);
    setMessagesDebugCode(defaultMessagesDebugCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check how many messages are in the current tab
    // if there are more than 10, set alert to reset conversation
    // if (messagesLesson.length > 10) {
    //   alert("Resetting conversation...");
    //   setMessagesLesson([
        
    let updatedMessages;
    const newMessage = { role: "user", content: input.trim() };
  
    
    // set updatedMessages only
    switch (tabValue) {
      case 0:
        updatedMessages = newMessage.content ? [...messagesLesson, newMessage] : messagesLesson;
        setMessagesLesson(updatedMessages);
        break;
      case 1:
        updatedMessages = newMessage.content ? [...messagesSnippet, newMessage] : messagesSnippet;
        setMessagesSnippet(updatedMessages);
        break;
      case 2:
        updatedMessages = newMessage.content ? [...messagesQuiz, newMessage] : messagesQuiz;
        setMessagesQuiz(updatedMessages);
        break;
      case 3:
        updatedMessages = newMessage.content ? [...messagesDataStruc, newMessage] : messagesDataStruc;
        setMessagesDataStruc(updatedMessages);
        break;
      case 4:
        updatedMessages = newMessage.content ? [...messagesDebugCode, newMessage] : messagesDebugCode;
        setMessagesDebugCode(updatedMessages);
        break;
      default:
        return;
    }
    

    let apiCallType;
  
    switch (tabValue) {
      case 0:
        apiCallType = "lesson";
        break;
      case 1:
        apiCallType = "snippet";
        break;
      case 2:
        apiCallType = "language";
        break;
      case 3:
        apiCallType = "interview";
        break;
      case 4:
        apiCallType = "project_idea";
        break;
      default:
        return;
    }
    
  
    try {
      const response = await callOpenAIAPI(updatedMessages, "gpt-3.5-turbo");
      const aiMessage = { role: "assistant", content: response };
  
      switch (apiCallType) {
        case "lesson":
          setMessagesLesson((prevMessages) => [...prevMessages, aiMessage]);
          break;
        case "snippet":
          setMessagesSnippet((prevMessages) => [...prevMessages, aiMessage]);
          break;
        case "language":
          setMessagesQuiz((prevMessages) => [...prevMessages, aiMessage]);
          break;
        case "interview":
          setMessagesDataStruc((prevMessages) => [...prevMessages, aiMessage]);
          break;
        case "project_idea":
          setMessagesDebugCode((prevMessages) => [...prevMessages, aiMessage]);
          break;
        default:
          return;
      }
    } catch (error) {
      console.error("Error while calling OpenAI API:", error);
    }
  
    setInput("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
    <br></br>
    <Typography variant="h5">Learn python through a chat conversation.</Typography>
    <br></br>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Advanced Python Lesson" {...a11yProps(0)} />
          <Tab label="Code Snippet Question" {...a11yProps(1)} />
          <Tab label="Quiz" {...a11yProps(2)} />
          <Tab label="Data Structures and Algorithms" {...a11yProps(3)} />
          <Tab label="Code Debugging" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <h1>Advanced Python Lesson</h1>
        <ChatUI messages={messagesLesson} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <h1>Python Code Snippet Question</h1>
        <ChatUI messages={messagesSnippet} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <h1>Python Quiz</h1>
        <ChatUI messages={messagesQuiz} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <h1>Python Data Structures and Algorithms</h1>
        <ChatUI messages={messagesDataStruc} />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <h1>Python Code Snippet Debugging</h1>
        <ChatUI messages={messagesDebugCode} />
      </TabPanel>

      <Box sx={{ width: "60%", mt: 2, mx: "auto" }}>
      <TextField
         fullWidth
          id="outlined-multiline-static"
          label="Your message"
          multiline
          rows={4}
          variant="outlined"
          value={input}
          onChange={handleInputChange}
      />
    </Box>
    <Box sx={{ width: "60%", mx: "auto", textAlign: "right" }}>
    <Button
      type="submit"
      variant="contained"
      sx={{ mt: 3, mb: 2, minWidth: "200px" }}
    >
      Submit
    </Button>
    <br/>
    <Button
      onClick={resetAllConversation}
      variant="contained"
      color="error"
      sx={{ mt: 1, minWidth: "200px" }}
    >
      Reset All Conversations
    </Button>
</Box>
    </Box>
  );
};

export default TeachGPT;