import React, { useState, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "@mui/material/Button";

const QnACodeSnippet = () => {
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
    }
    catch(err){
      console.log(err);
    }
  };

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
        <h1> QnACodeSnippet </h1>
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
            <Button
              variant="contained"
              onClick={handleGenerateQuestion}
            >
              Generate Question
            </Button>

            <Button
              variant="contained"
              onClick={handleAnswerQuestion}
            >
              Answer Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnACodeSnippet;
