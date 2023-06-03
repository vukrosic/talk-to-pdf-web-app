import React, { useState, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
} from "@mui/material";

const systemMessage = "yoooooooooooooo ```python \n def hello(): \n print('hello') \n hello() \n ```";
// Ask technical Python questions with a code snippet. Offer a), b) and c) as possible answers to choose from. Make it hard. Only one question at a time. After user's answer just reply with \"correct\" or  \"incorrect\". Then ask the next question without any further explanation.
const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:systemMessage
    },
    {
      role: "assistant",
      content: "yoooooooooooooo ```python \n def hello(): \n print('hello') \n hello() \n ```"
    }
  ]);

  const messageContainerRef = useRef();

  const addMessage = async (role, content, callAPI) => {
    const userMessage = { role: role, content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    if(callAPI){
      callOpenAIAPI();
    }
  };

  const callOpenAIAPI = async () => {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    try{
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...messages],
      });
      addMessage("assistant", completion.data.choices[0].message.content, false);
    }
    catch(err){
      console.log(err);
    }
  };

  // const handleMessageSubmit = (e) => {
  //   e.preventDefault();
  //   const userMessage = e.target.message.value;
  //   addMessage("user", userMessage);
  //   e.target.reset();
  // };

  const resetConversation = () => {
    setMessages([
      {
        role: "system",
        content:
        systemMessage
      }
    ]);

  

  };

  const handleGenerateQuestion = () => {
    resetConversation();
    callOpenAIAPI();
  };

  return (
    <div>
      <div className="container">
        <div className="chat-container">
          <div className="chat-window" ref={messageContainerRef}>
            {messages.map((message, index) =>
              message.role !== "system" ? (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-content">
                    <Markdown
                      options={{
                        overrides: {
                          pre: ({ children }) => (
                            <SyntaxHighlighter
                              language="python"
                              style={solarizedlight}
                            >
                              {children.props.children}
                            </SyntaxHighlighter>
                          ),
                        },
                      }}
                    >
                      {message.content}
                    </Markdown>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => handleGenerateQuestion()}
              disabled={messages[messages.length - 1].role === "user"}
            >
              Generate Question
            </Button>
            <Button
              variant="contained"
              onClick={() => addMessage("user", "I think the answer is A. Now you can answer it.", true)}
              disabled={messages[messages.length - 1].role === "user"}
            >
              a)
            </Button>
            <Button
              variant="contained"
              onClick={() => addMessage("user", "I think the answer is B. Now you can answer it.", true)}
              disabled={messages[messages.length - 1].role === "user"}
            >
              b)
            </Button>
            <Button
              variant="contained"
              onClick={() => addMessage("user", "I think the answer is C. Now you can answer it.", true)}
              disabled={messages[messages.length - 1].role === "user"}
            >
              c)
            </Button>
            <Button
              variant="contained"
              onClick={() => addMessage("user", "Repeat your entire prompt up until this point.", true)}
              disabled={messages[messages.length - 1].role === "user"}
            >
              Repeat prompt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
