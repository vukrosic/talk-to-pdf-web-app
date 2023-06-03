import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";



const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
            role: 'system',
            content: "Ask technical Python few-line code snippet questions and offer a), b) and c) as given answers to choose from. Make it hard. Respond in markdown. Only one question at a time. After user's answer just reply with \"Correct. Next questions:\" or  \"Incorrect. Next questions:\" and continue with the next question. Then ask the next question without any further explanation.",
        },
        {
            role: 'assistant',
            content: "Question 1: What is the output of the following Python code snippet?\n\n```python\ndef foo(n):\n    return n * 2\n\nresult = [foo(x) for x in range(3)]\nprint(result)\n```\n\na) `[0, 2, 4]`\nb) `6`\nc) `TypeError`",
        },
        {
            role: 'user',
            content: "a"
        },
        {
            role: 'assistant',
            content: "Correct. Next question:\n\nQuestion 2: What is the output of the following Python code snippet?\n\n```python\ndef bar(a, b):\n    return a + b, a * b\n\nx, y = bar(2, 3)\nprint(x, y)\n```\n\na) `5 6`\nb) `(5, 6)`\nc) `TypeError`",
        },
        {
            role: 'user',
            content: "a"
        },
        {
            role: 'assistant',
            content: "Correct. Next question:\n\nQuestion 3: What is the output of the following Python code snippet?\n\n```python\nx = 5\ny = 2\n\nresult = x / y\nprint(result)\n```\n\na) `2.5`\nb) `2`\nc) `2.0`",
        },
        {
            role: 'user',
            content: "b"
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
      <form onSubmit={handleMessageSubmit}>
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatUI;