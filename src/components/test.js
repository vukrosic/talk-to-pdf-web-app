import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are counter. You count to 10.",
      timestamp: new Date(),
    },
  ]);


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
