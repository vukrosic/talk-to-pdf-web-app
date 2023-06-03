import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
