import { setColumns, setSelectedItems, setMessages, addTopicToTree, deleteTopicFromTree } from "../store/actions";



export const callOpenAIAPIFunctions = async (messages, model, dispatch) => {

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: 'gpt-3.5-turbo-0613',
    messages: [
      { role: "user", content: "Give me the topics for lesson2." },
    ],
    stream: true,
    functions: [
      {
        name: "list_topics_for_learning_python",
        description: "List the topics for learning Python",
        parameters: {
          type: "array",
          properties: {
            lessonName: {
              type: "string",
              description: "The name of the lesson",
            },
          },
          required: ["lessonName"],
        },
      },
    ],
    function_call: "name: list_topics_for_learning_python"
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const reader = (await response.body).getReader();
  const decoder = new TextDecoder();
  let partialResponse = '';
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    partialResponse += chunk;
    // console.log("Partial response:", partialResponse); // Debugging log
    while (partialResponse.includes('\n')) {
      const lineIndex = partialResponse.indexOf('\n');
      const line = partialResponse.slice(0, lineIndex);
      partialResponse = partialResponse.slice(lineIndex + 1);
  
      if (line.startsWith('data:')) {
        const data = line.slice(6);
        if (data.trim() === "[DONE]") {
          // Streaming is complete
          console.log("Streaming is complete"); // Debugging log
          break;
        } else {
          const parsedData = JSON.parse(data);
          if (parsedData.choices && parsedData.choices.length > 0) {
            const functionArguments = parsedData.choices[0]?.delta?.function_call?.arguments;
            if (functionArguments) {
              console.log(functionArguments); // Debugging log
              result += functionArguments;
              // console.log("Result:", result); // Debugging log
              dispatch(setColumns([[result]]));
            }
          }
        }
      }
    }
  }
  
  
  console.log(result);
};
