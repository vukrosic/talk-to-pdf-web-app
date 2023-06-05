import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LanguageSelect from "./LanguageSelect";
import { message } from "antd";

const ChatUI = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");

  const [messagesQuestion, setMessagesQuestion] = useState([{ role: "system", content:"Generate code snippet in " + selectedLanguage + " and a question that asks something about it. Do not answer it." }]);
  const [messagesAnswer, setMessageAnswer] = useState([{ role: "system", content:"Answer the following question about the code snippet." }]);

  const callOpenAIAPI = async (messages, generatingQuestion) => {
    if (!generatingQuestion) setMessageAnswer(prevState => [...prevState, {role: "assistant", content: currentQuestion}]);

    const configuration = new Configuration({ apiKey: "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" });
    const openai = new OpenAIApi(configuration);
    try {
      const completion = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages });
      
      if (generatingQuestion) {
        setCurrentQuestion(completion.data.choices[0].message.content);
        setMessageAnswer([{ role: "system", content:"Answer the following question about the code snippet." }, { role: "assistant", content: completion.data.choices[0].message.content }]);
      } else setCurrentAnswer(completion.data.choices[0].message.content);
    } catch (err) {
      console.log(err);
    }
  };

  const CodeBlock = ({ code }) => {
    return (
      <Markdown
        options={{
          overrides: {
            pre: ({ children }) => {
              return (
                <SyntaxHighlighter language={selectedLanguage} style={solarizedlight}>
                  {children.props.children}
                </SyntaxHighlighter>
              );
            },
          },
        }}
      >
        {code}
      </Markdown>
    );
  };
  

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setMessagesQuestion([{ role: "system", content:"Generate code snippet in " + event.target.value + " and a question that asks something about it. Do not answer it." }]);
  };

  return (
    <div className="container">
      <div className="button-group">
        <LanguageSelect
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
          className="language-select"
        />
        <Button variant="contained" className="generate-button" onClick={() => callOpenAIAPI(messagesQuestion, true)}>
          Generate Question
        </Button>
        <Button variant="contained" className="answer-button" onClick={() => callOpenAIAPI(messagesAnswer, false)}>
          Answer Question
        </Button>
      </div>
      <div className="chat-container">
        <div className="chat-window">
          <CodeBlock code={currentQuestion} />
          <CodeBlock code={currentAnswer} />
        </div>
      </div>
    </div>
  );
  
};

export default ChatUI;