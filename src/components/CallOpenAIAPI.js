// // import { Configuration, OpenAIApi } from "openai";

// // export const callOpenAIAPI = async (messages, model) => {
//     // const configuration = new Configuration({ apiKey: "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" });
//     // const openai = new OpenAIApi(configuration);
//     // try {
//     //     const completion = await openai.createChatCompletion({ model: model, messages });
// //         console.log(completion.data.choices[0].message.content);
// //         return completion.data.choices[0].message.content;
// //     } catch (err) {
// //         console.log(err);
// //     }
// // };

// export const callOpenAIAPI = async (messages, model) => {
//     const apiKey = "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";
//     const url = "https://api.openai.com/v1/chat/completions";
  
//     const requestBody = {
//       model: model,
//       messages: messages,
//       stream: true,
//     };
  
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify(requestBody),
//     });
  
//     const reader = response.body.getReader();
//     let decoder = new TextDecoder();
//     let partialResponse = '';
  
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       partialResponse += decoder.decode(value);
//       const lines = partialResponse.split('\n');
  
//       for (const line of lines) {
//         if (line.startsWith('data:')) {
//           const data = line.slice(6);
//             console.log("1111111111111111111");
//           if (data.trim() === "[DONE]") {
//             // Streaming is complete
//             break;
//           } else {
//             console.log("222222222");
//             const parsedData = JSON.parse(data);
//             if (parsedData.choices && parsedData.choices.length > 0) {
//               const content = parsedData.choices[0]?.delta?.content;
//               if (content) {
//                 console.log(content);
//                 // You can perform any logic with the streamed response here
//               }
//             }
//           }
//         }
//       }
  
//       // Remove processed lines from partialResponse
//       partialResponse = lines.pop();
//     }
//   };
  
  