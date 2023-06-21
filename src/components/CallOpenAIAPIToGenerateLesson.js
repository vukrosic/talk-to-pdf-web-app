import { setColumns, setMessages } from "../store/actions";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../config/firebase";

export const callOpenAIAPIToGenerateLesson = async (messages, model, saveMessagesByPath, selectedItems) => {
    if(messages.length > 8){
      alert("Currently we only support up to 8 messages. Please remove some messages and try again.");
      return;
    }
    const apiKey = "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";
    const url = "https://api.openai.com/v1/chat/completions";
  
    const requestBody = {
      model: model,
      messages: messages,
      stream: true,
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
  
    const reader = response.body.getReader();
    let decoder = new TextDecoder();
    let partialResponse = '';
    let result = '';
    // add a message that you will later append to
    saveMessagesByPath("assistant", "", false);
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      partialResponse += decoder.decode(value);
      const lines = partialResponse.split('\n');
  
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(6);
          if (data.trim() === "[DONE]") {
            // Streaming is complete
            break;
          } else {
            const parsedData = JSON.parse(data);
            if (parsedData.choices && parsedData.choices.length > 0) {
              const content = parsedData.choices[0]?.delta?.content;
              if (content) {
                result += content;
                saveMessagesByPath("assistant", result, true);
              }
            }
          }
        }
      }
  
      // Remove processed lines from partialResponse
      partialResponse = lines.pop();
    }
    // add it to database
    const feedbackRef = doc(db, "feedback/generated-lessons");
    var newLesson;
    if (typeof selectedItems === 'undefined') {
      newLesson = "Selected items undefined - " + " \n " + result;
    } else {
      newLesson = selectedItems.join(" > ") + " \n " + result;
    }
    

    updateDoc(feedbackRef, {
      Lessons: arrayUnion(newLesson)
    });
    console.log(result);
};
  
  
