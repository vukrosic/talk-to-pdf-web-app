import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are counter. You count to 10.",
    },
  ]);

  const addMessage = (content, role) => {
    const newMessage = { role, content };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (role === "user") {
      openAIAPICall([...messages, newMessage], "gpt-3.5-turbo").then((aiResponse) => {
        addMessage(aiResponse, "assistant");
      });
    }
    console.log(messages);
  };

  const openAIAPICall = async (messages, model) => {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model,
      messages,
    });

    return completion.data.choices[0].message.content;
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const userMessage = e.target.message.value;
    addMessage(userMessage, "user");
    e.target.reset();
  };

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
      <form onSubmit={handleMessageSubmit}>
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatUI;