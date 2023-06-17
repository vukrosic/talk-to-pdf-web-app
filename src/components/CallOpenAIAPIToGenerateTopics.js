import { setColumns } from "../store/actions";

export const callOpenAIAPI = async (messages, model, addBranchingTopic, handleItemClick, selectedItems) => {
    const apiKey = "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";
    const url = "https://api.openai.com/v1/chat/completions";
  
    let selectedItemsTemp = selectedItems;

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
    let wholeResponse = '';
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
                wholeResponse += content;
                if (result.includes('\n')) { // If the result string has '\n'
                  addBranchingTopicAndRefresh(addBranchingTopic, result, handleItemClick, selectedItems)
            
                result = ''; // Resetting the result
                }
            }
            }
          }
        }
      }
      // Remove processed lines from partialResponse
      partialResponse = lines.pop();
    }
    addBranchingTopicAndRefresh(addBranchingTopic, result, handleItemClick, selectedItems)

    // return to previously selected item
    handleItemClick(selectedItemsTemp[selectedItemsTemp.length - 1], selectedItems.length - 1);
  };
  
  
  function addBranchingTopicAndRefresh(addBranchingTopic, result, handleItemClick, selectedItems, addToCurrent){
    result = result.replace(/^\d+\.\s*/, '').replace(/\n$/, '');
    addBranchingTopic(result, false);
    const lastSelectedItem = selectedItems[selectedItems.length - 1];
    const columnIndex = selectedItems.length - 1;
    if(columnIndex >= 0 && lastSelectedItem !== undefined)
      handleItemClick(lastSelectedItem, columnIndex);
  }