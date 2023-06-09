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

  const [tabValue, setTabValue] = useState(0);
  const [messagesLesson, setMessagesLesson] = useState([
    {
      role: "assistant",
      content: '7+8=',
    }
  ]);
  const [messagesSnippet, setMessagesSnippet] = useState([
    {
      role: "assistant",
      content: '1+4=";',
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
  
    const newMessage = { role: "user", content: input.trim() };
  
    if (tabValue === 0) {
      const updatedMessagesLesson = [...messagesLesson, newMessage];
      setMessagesLesson(updatedMessagesLesson);
  
      try {
        const response = await callOpenAIAPI(updatedMessagesLesson, "gpt-3.5-turbo");
        const aiMessage = { role: "assistant", content: response };
        setMessagesLesson((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error while calling OpenAI API:", error);
      }
    } else if (tabValue === 1) {
      const updatedMessagesSnippet = [...messagesSnippet, newMessage];
      setMessagesSnippet(updatedMessagesSnippet);
  
      try {
        const response = await callOpenAIAPI(updatedMessagesSnippet, "gpt-3.5-turbo");
        const aiMessage = { role: "assistant", content: response };
        setMessagesSnippet((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error while calling OpenAI API:", error);
      }
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Teach me a random advanced lesson" {...a11yProps(0)} />
          <Tab label="Generate random code snippet" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <h1>Advanced Lesson</h1>
        <ChatUI messages={messagesLesson} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <h1>Random Code Snippet</h1>
        <ChatUI messages={messagesSnippet} />
      </TabPanel>

      <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Your message"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!input}
      >
        Send
      </Button>
    </Box>
  );
};

export default TeachGPT;