import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = {
      role: "user",
      content: input,
    };
    setInput("");
    setMessages((prev) => [...prev, userMessage]);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages.concat(userMessage),
    });

    const aiMessageContent = completion.data.choices[0].message.content.trim();
    const aiMessage = {
      role: "assistant",
      content: aiMessageContent,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <Typography
            key={index}
            sx={{
              my: 1,
              mx: message.role === "user" ? "auto" : "inherit",
              textAlign: message.role === "user" ? "right" : "left",
            }}
          >
            {message.role === "assistant" ? "AI: " : "You: "}
            {message.content}
          </Typography>
        ))}
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Your message"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!input}
      >
        Send
      </Button>
    </Box>
  );
}

export default ChatInterface;