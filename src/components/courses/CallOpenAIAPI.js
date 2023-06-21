export const callOpenAIAPIFunctions = async (messages, model) => {
  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: model,
    messages: messages,
    stream: true
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
    console.log(response);
    throw new Error('Network response was not ok');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let partialResponse = '';
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    partialResponse += chunk;
    while (partialResponse.includes('\n')) {
      const lineIndex = partialResponse.indexOf('\n');
      const line = partialResponse.slice(0, lineIndex);
      partialResponse = partialResponse.slice(lineIndex + 1);

      if (line.startsWith('data:')) {
        const data = line.slice(6);
        if (data.trim() === "[DONE]") {
          console.log("Streaming is complete"); // Debugging log
          break;
        } else {
          const parsedData = JSON.parse(data);
          if (parsedData.choices && parsedData.choices.length > 0) {
            const content = parsedData.choices[0]?.delta?.content;
            if (content) {
              console.log(content); // Debugging log
              // result += content;
              // console.log("Result:", result); // Debugging log
              // dispatch(setColumns([[result]]));
            }
          }
        }
      }
    }
  }
  // console.log("Final Result:", result);
  // if (result) {
  //   console.log("Final Result:", result);
  //   return result;
  // } else {
  //   throw new Error('No result found in API response');
  // }
};