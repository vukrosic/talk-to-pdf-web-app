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




const testSystemMessage = "yoooooooooooooo ```python \n def hello(): \n print('hello') \n hello() \n ```";



// Ask technical Python questions with a code snippet. Offer a), b) and c) as possible answers to choose from. Make it hard. Only one question at a time. After user's answer just reply with \"correct\" or  \"incorrect\". Then ask the next question without any further explanation.
const ChatUI = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [messagesQuestion, setMessagesQuestion] = useState([
    {
      role: "system",
  content:"Generate code snippet in python and a question that asks something about it. Do not answer it."
    }
  ]);

  const [messagesAnswer, setMessageAnswer] = useState([
    {
      role: "system",
      content:"Answer the following question about the code snippet."
    }
  ]);

  const messageContainerRef = useRef();

  // const addMessage = async (role, content, callAPI) => {
  //   const userMessage = { role: role, content };
  //   setMessages((prevMessages) => [...prevMessages, userMessage]);
  //   messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  //   if(callAPI){
  //     callOpenAIAPI();
  //   }
  // };

  const callOpenAIAPI = async (_messages, generatingQuestion) => {
    if(!generatingQuestion){
      setMessageAnswer([
        {
          role: "system",
          content:"Answer the following question about the code snippet."
        },
        {
          role: "assistant",
          content: currentQuestion
        }
      ])
      console.log("messagesAnswer: ", messagesAnswer);
    }
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    try{
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: _messages
      });
      console.log(messagesQuestion);
      if(generatingQuestion){
        setCurrentQuestion(completion.data.choices[0].message.content);
        setMessageAnswer([
          {
            role: "system",
            content:"Answer the following question about the code snippet."
          },
          {
            role: "assistant",
            content: completion.data.choices[0].message.content
          }
        ])
        console.log("messagesAnswer: ", messagesAnswer);
      }
      else{
        setCurrentAnswer(completion.data.choices[0].message.content);
      }
      //addMessage("assistant", completion.data.choices[0].message.content, false);
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

  // const resetConversation = () => {
  //   setMessages([
  //     {
  //       role: "system",
  //       content:
  //       systemMessage
  //     }
  //   ]);

  

  // };

  

  const handleGenerateQuestion = () => {
    callOpenAIAPI(messagesQuestion, true);
  };
  
  const handleAnswerQuestion = () => {
    callOpenAIAPI(messagesAnswer, false);
  };

  return (
    <div>
      <div className="container">
        <div className="chat-container">
        <div className="chat-window" ref={messageContainerRef}>
        <div>
      <Markdown
        options={{
          overrides: {
            pre: ({ children }) => (
              <SyntaxHighlighter language="python" style={solarizedlight}>
                {children.props.children}
              </SyntaxHighlighter>
            ),
          },
        }}
      >
        {currentQuestion}
      </Markdown>
    </div>
    
    <Markdown
        options={{
          overrides: {
            pre: ({ children }) => (
              <SyntaxHighlighter language="python" style={solarizedlight}>
                {children.props.children}
              </SyntaxHighlighter>
            ),
          },
        }}
      >
        {currentAnswer}
      </Markdown>
</div>
          <div>
          </div>
          <div>
            {/* <Button
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
            </Button> */}

            <Button
              variant="contained"
              onClick={handleGenerateQuestion}
              // disabled={messages[messages.length - 1].role === "user"}
            >
              Generate Question
            </Button>

            <Button
              variant="contained"
              onClick={handleAnswerQuestion}
              // disabled={messages[messages.length - 1].role === "user"}
            >
              Answer Question
            </Button>

            {/* <div>
              <Typography variant="h6">Current Question: {currentQuestion}</Typography>
              <Typography variant="h6">Current Answer: {currentAnswer}</Typography>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
