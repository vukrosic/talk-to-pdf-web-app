import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { CssBaseline, AppBar, Toolbar, Typography, Container, TextField } from "@mui/material";       

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
        role: 'system',
        content: "Ask technical Python few-line code snippet questions and offer a), b) and c) as given answers to choose from. Make it hard. Respond in markdown. Only one question at a time. After user's answer just reply with \"Correct. Next questions:\" or  \"Incorrect. Next questions:\" and continue with the next question. Then ask the next question without any further explanation.",
    }
]);

  const addMessage = async (content, role) => {
    const newMessage = { role, content };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    if (role === "user") {
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...messages, newMessage],
      });

      const aiResponse = completion.data.choices[0].message.content;
      addMessage(aiResponse, "assistant");
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const userMessage = e.target.message.value;
    addMessage(userMessage, "user");
    e.target.reset();
  };

  const handleButtonClick = (answer) => {
    addMessage(answer, "user");
  };

  return (
    <div>
      <div className="container">
      <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              <Markdown
                options={{
                  overrides: {
                    pre: ({ children }) => (
                      <SyntaxHighlighter language="javascript" style={solarizedlight} children={children.props.children} />
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
      {/* <form onSubmit={handleMessageSubmit}>
        <TextField id="outlined-basic" label="Input" variant="outlined" type="text" name="message" placeholder="Type your message..." />
        <Button variant="contained" endIcon={<SendIcon />} type="submit">Send</Button>
        </form> */}
        <div>

          <Button variant="contained" onClick={() => handleButtonClick("Next question")}>Next Question</Button>
          <Button variant="contained" onClick={() => handleButtonClick("a)")} disabled={messages[messages.length - 1].role === "user"}>a)</Button>
          <Button variant="contained" onClick={() => handleButtonClick("b)")} disabled={messages[messages.length - 1].role === "user"}>b)</Button>
          <Button variant="contained" onClick={() => handleButtonClick("c)")} disabled={messages[messages.length - 1].role === "user"}>c)</Button>
        </div>

      </div>
      </div>
    </div>
  );
};

export default ChatUI;
