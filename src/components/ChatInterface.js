// import React, { useState, useEffect } from "react";
// import { Configuration, OpenAIApi } from "openai";

// const ChatUI = () => {
//   const [messages, setMessages] = useState([{ role: "user", content: "Hello world" }]);
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     const fetchOpenAIResponse = async () => {
//       const configuration = new Configuration({
//         apiKey: process.env.OPENAI_API_KEY,
//       });
//       const openai = new OpenAIApi(configuration);

//       const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages,
//       });

//       setResponse(completion.data.choices[0].message.content);
//     };

//     fetchOpenAIResponse();
//   }, [messages]);

//   const handleMessageSubmit = (e) => {
//     e.preventDefault();
//     const newMessage = {
//       role: "user",
//       content: e.target.message.value,
//     };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     e.target.reset();
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.role}`}>
//             {message.content}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleMessageSubmit}>
//         <input type="text" name="message" placeholder="Type your message..." />
//         <button type="submit">Send</button>
//       </form>
//       {response && (
//         <div className="message ai">
//           <strong>AI:</strong> {response}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatUI;
