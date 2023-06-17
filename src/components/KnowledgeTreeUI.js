import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages, addTopicToTree, deleteTopicFromTree } from "../store/actions";
import { Grid, Container, Button, TextField, Box, FormControl, InputLabel } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";
import { fetchKnowledgeTreeData } from "../utils/helpers";
import { ADD_TOPIC_TO_TREE } from "../store/actions";
import { terminate } from "firebase/firestore";
import { callOpenAIAPIFunctions } from "./CallOpenAIAPIFunctions";
import { callOpenAIAPI } from "./CallOpenAIAPIToGenerateTopics";
import { callOpenAIAPIToGenerateLesson } from "./CallOpenAIAPIToGenerateLesson";
import { getMergedStatus } from "antd/es/_util/statusUtils";


const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);
  const [newTopic, setNewTopic] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [topicGenerationPrompt, setTopicGenerationPrompt] = useState("");
  const [lessonGenerationPrompt, setLessonGenerationPrompt] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [messagesStore, setMessagesStore] = useState({});
  const [currentMessages, setCurrentMessages] = useState([]);
  const [userConvPrompt, setUserConvPrompt] = useState([]);
  const [model, setModel] = useState("gpt-3.5-turbo-0613");

  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectedItem(selectedItems.slice(0, selectedItems.length - 1));
    }
  
    const newColumns = columns.length > 1
      ? columns.slice(0, columns.length - 2).concat(columns.slice(-1))
      : [knowledgeTree.map(item => item.id)];
  
    dispatch(setColumns(newColumns));
  }, [knowledgeTree, dispatch]);
  

  useEffect(() => {
    const path = selectedItems.join(" > ");
    if (!(path in messagesStore)){
      saveMessagesByPath("assistant", lessonGenerationPrompt, false)
    }
    setCurrentMessages(getMessagesByPath(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    setCurrentMessages(getMessagesByPath(selectedItems));
  }, [messagesStore]);

  function getBranchingTopics(path) {
    let currentTopic = knowledgeTree;
  
    // Traverse the path
    for (let i = 0; i < path.length; i++) {
      const topicId = path[i];
      const nextTopic = currentTopic.find((topic) => topic.id === topicId);
  
      if (nextTopic) {
        currentTopic = nextTopic.branchingTopics;
      } else {
        // Path is invalid, return empty array
        return [];
      }
    }
  
    // Return the IDs of the branching topics of the last topic in the path
    return currentTopic.map((topic) => topic.id);
  }



  function addBranchingTopic(addedTopic, addToCurrent) {
    if (addedTopic === "") {
      alert("Please enter a topic name");
      return;
    }
  
    const count = addToCurrent ? selectedItems.length - 1 : selectedItems.length;
    let currentTopic = selectedItems
      .slice(0, count)
      .reduce((acc, topicId) => acc.find((topic) => topic.id === topicId).branchingTopics, knowledgeTree);
    // Check if the new topic already exists in the current column
    const isTopicUnique = currentTopic.every((topic) => (topic.id !== addedTopic));
    if (!isTopicUnique) {
      alert("Topic already exists in the column");
      return;
    }
  
    currentTopic.push({ id: addedTopic, branchingTopics: [], messages: [{role:"assistant",content:"Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify([...selectedItems, addedTopic]) + " Generate a comprehensive, detailed, university level lesson about [\"" + addedTopic + "\"], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."}] });
  
    updateItemInColumns(addedTopic, addToCurrent ? 1 : 0);

  }
  
  
  function updateItemInColumns(addedTopic, subtract) {
    const columnIndex = selectedItems.length - subtract;
    const newColumns = columns.map((column, index) => {
      if (index === columnIndex) {
        return [...column, addedTopic];
      } else {
        return column;
      }
    });
    // console.log(newColumns);
    dispatch(setSelectedItems(selectedItems.slice(0)));
    dispatch(setColumns(newColumns));
  }

  function saveMessagesByPath(role, content, overwriteLastMessage = false) {
    const path = selectedItems.join(" > ");
    if (!(path in messagesStore)) {
      setMessagesStore((prevMessagesStore) => ({
        ...prevMessagesStore,
        [path]: [{
          role: role,
          content: content,
        }]
      }));
    } else {
      if (overwriteLastMessage) {
        setMessagesStore((prevMessagesStore) => {
          const newMessagesStore = { ...prevMessagesStore };
          const messages = newMessagesStore[path];
          const lastMessage = messages[messages.length - 1];
          if (lastMessage.role === role) {
            const updatedMessages = messages.slice(0, messages.length - 1);
            updatedMessages.push({ role: role, content: content });
            newMessagesStore[path] = updatedMessages;
          } else {
            messages.push({ role: role, content: content });
          }
          return newMessagesStore;
        });
      } else {
        setMessagesStore((prevMessagesStore) => {
          const newMessagesStore = {...prevMessagesStore};
          newMessagesStore[path] = [
            ...newMessagesStore[path],
            { role: role, content: content },
          ];
          return newMessagesStore;
        });
      }
    }
  }


  function removeLastMessageByPath() {
    console.log("??????????????????????????????????????????")
    const path = selectedItems.join(" > ");
    if (messagesStore != undefined && (path in messagesStore)) {
      setMessagesStore((prevMessagesStore) => {
        const newMessagesStore = { ...prevMessagesStore };
        const messages = newMessagesStore[path];
        messages.pop(); // Remove the last message from the array
        return newMessagesStore;
      });
    }
  }
  
  
  

  const getMessagesByPath = (path) => {
    const formattedPath = path.join(" > ");
    if (formattedPath in messagesStore) {
      return messagesStore[formattedPath];
    } else {
      console.log("Key does not exist:", formattedPath);
      return null; // or any default value you prefer
    }
  }
  

  const test = () => {

    // console.log(JSON.stringify(selectedItems));
    // callOpenAIAPIToGenerateLesson(messagesPyPath, model, setMessages);
    // console.log(messagesStore)
  }

  // function getMessagesForPath(selectedItems) {
  //   let currentPath = "";
  //   let messages = {};
  
  //   // Iterate over the selected items and build the path for each item.
  //   for (let i = 0; i < selectedItems.length; i++) {
  //     const item = selectedItems[i];
  //     currentPath += item;
      
  //     // Save messages for the current path if available.
  //     if (messagesByPath[currentPath]) {
  //       messages = { ...messages, ...messagesByPath[currentPath] };
  //     }
      
  //     // Add a separator (">") if there are more items.
  //     if (i < selectedItems.length - 1) {
  //       currentPath += " > ";
  //     }
  //   }
  
  //   return messages;
  // }
  

  // function getMessagesByPath(path) {
  //     let currentItem = null;
    
  //     for (let i=0; i < knowledgeTree.length; i++){
  //       if (knowledgeTree[i].id === path[0]){
  //           currentItem = knowledgeTree[i];
  //           break;
  //       }
  //     }
    
  //     if (currentItem === null) return null;
    
  //     for (let i = 1; i < path.length; i++) {
  //       let found = false;
  //       for (let j=0; j < currentItem.branchingTopics.length; j++){
  //         if (currentItem.branchingTopics[j].id === path[i]){
  //             currentItem = currentItem.branchingTopics[j];
  //             found = true;
  //             break;
  //         }
  //       }
    
  //       if (!found) return null; 
  //     }
    
  //     if (!currentItem.hasOwnProperty('messages')) {
  //       console.log(selectedItems);
  //       currentItem.messages = [
  //         {
  //           "role": "assistant",
  //           "content": "Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify([...path]) + " Generate a comprehensive, detailed, university level lesson about [\"" + path[path.length - 1] + "\"], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
  //         }
  //       ];
  //     }
    
  //     return currentItem.messages;
  //   }
  
  
  
  

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };
  
  function generateLesson() {
    callOpenAIAPIToGenerateLesson(currentMessages, model, saveMessagesByPath);
  }

  const removeItem = () => {
    const columnIndex = selectedItems.length - 1;
    const newSelectedItems = selectedItems.slice(0, -1);
    const newColumns = columns.map((column, index) => {
    if (index === columnIndex) {
      return column.filter((item) => item !== selectedItems[columnIndex]);
    }
    return column;
  });
    dispatch(setSelectedItems(newSelectedItems));
    dispatch(setColumns(newColumns.slice(0, columnIndex+1)));
    deleteItem();
  };
  
  
  const generateTopics = async (addToCurrent) => {
    const messages = [
      { role: "user", content: topicGenerationPrompt },
    ]
    callOpenAIAPI(messages, model, addBranchingTopic, handleItemClick, selectedItems, addToCurrent)
  }
  

  const addUserMessageAndCallOpenAIAPI = async () => {
    const newCurrentMessages = [...currentMessages, { role: "user", content: userConvPrompt }];
    callOpenAIAPIToGenerateLesson(newCurrentMessages, model, saveMessagesByPath);
    saveMessagesByPath("user", userConvPrompt, false);
  }



  const handleItemClick = (item, columnIndex) => {
    // add messages if there isn't any
    // saveMessagesByPath(selectedItems);
    // setCurrentMessages(getMessagesByPath(selectedItems));
    // set topic generation prompt
    const newSelectedItems = [...selectedItems.slice(0, columnIndex), item];
    const branchingTopics = getBranchingTopics(newSelectedItems);
    const newColumns = [...columns.slice(0, columnIndex + 1), branchingTopics];
    setTopicGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(newSelectedItems) + " Give me an enumerated list of 5 subtopics of the last element I can study from. All should be subtopics of the last topic in the array, not of each other. Put each subtopic in new line, starting with a number, for example '1.', and no other characters or subtopics in the same line.");
    setLessonGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(newSelectedItems) + " Generate a comprehensive, detailed, university level lesson about " + JSON.stringify(newSelectedItems[newSelectedItems.length - 1]) + ", while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand.")
    // dispatch(setMessages(getMessagesByPath(newSelectedItems))) ;
    dispatch(setSelectedItems(newSelectedItems));
    dispatch(setColumns(newColumns));
};

  const deleteItem = () => {

    dispatch(deleteTopicFromTree(selectedItems));
    selectedItems.pop();
  }


  const renderColumns = (items, columnIndex) => {
    if (items.length === 0) {
      return null;
    }
    const column = (
      <Column
        key={columnIndex}
        items={items}
        onItemClick={(item) => {
          handleItemClick(item, columnIndex);
        }}
        selectedItem={selectedItems[columnIndex]}
      />
    );
    return column;
}

  return (
    <Container>
      <Grid container spacing={2} wrap="nowrap">
        {columns.map((column, index) => renderColumns(column, index))}
      </Grid>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <TextField
          fullWidth
          label="Add Topic"
          variant="outlined"
          value={newTopic}
          onChange={(e) => {
            setNewTopic(e.target.value);
          }}
        />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 1, bgcolor: "#FFC107", color: "#fff", width: "200px", "&:hover": { bgcolor: "#FFCA28" } }}
            onClick={() => addBranchingTopic(newTopic, false)}
          >
            Add Subtopic
          </Button>
          <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                ml: 1,
                bgcolor: "#f5f5f5",
                color: "#0000a0",
                width: "200px",
                "&:hover": {
                  bgcolor: "#DC3545",
                  color: "#fff",
                },
              }}
              onClick={removeItem}
            >
              Delete Subtopic
            </Button>
          </Box>

      {showForm && (
        <FormControl fullWidth variant="outlined">
          <InputLabel
            htmlFor="generation-prompt-input"
            style={{ position: 'absolute', top: '-10px', backgroundColor: '#FFF', padding: '0 5px' }}
          >
            Generation Prompt
          </InputLabel>
          <TextField
            id="generation-prompt-input"
            fullWidth
            multiline
            variant="outlined"
            value={lessonGenerationPrompt}
            onChange={(e) => {
              setLessonGenerationPrompt(e.target.value);
            }}
            style={{ marginTop: '20px' }}
          />
        </FormControl>
      )}


        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, mr: 1, bgcolor: "#00b3ff", color: "#fff", width: "200px", "&:hover": { bgcolor: "#2196F3" } }}
            onClick={() => { generateTopics(false) }}
            disabled={selectedItems.length <= 0}
          >
            Generate Subtopic
          </Button>

          <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          sx={{ mt: 1, ml: 1, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#DC3545", color: "#fff" } }} 
          onClick={toggleFormVisibility}
          disabled={selectedItems.length <= 0}
          >
            Edit prompt
          </Button>
          {showForm && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, ml: 1, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#DC3545", color: "#fff" } }}
            onClick={() => { setTopicGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(selectedItems) + " Give me an enumerated list of 5 subtopics of the last element I can study from. All should be subtopics of the last topic in the array, not of each other. Put each subtopic in new line, starting with a number, for example '1.', and no other characters or subtopics in the same line.") }}
            disabled={selectedItems.length <= 0}
          >
            Reset Prompt
          </Button>
          )}
        </Box>
        

        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          
          {/* <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: deleteMode ? "#DC3545" : "#f5f5f5",
              color: deleteMode ? "#fff" : "#0000a0",
              width: "200px",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "#fff",
              },
            }}
            onClick={test}
          >
            Test
          </Button> */}


        </Box>

      </Box>
        <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: deleteMode ? "#DC3545" : "#f5f5f5",
              color: deleteMode ? "#fff" : "#0000a0",
              width: "200px",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "#fff",
              },
            }}
            onClick={generateLesson}
          >
            Generate Lesson
          </Button>
          {currentMessages !== null && currentMessages.length > 0 && <ChatUI messages={currentMessages} />}

          <FormControl fullWidth variant="outlined" sx={{ mt: 8}}>
          <InputLabel
            htmlFor="generation-prompt-input"
            style={{ position: 'absolute', top: '-10px', backgroundColor: '#FFF', padding: '0 5px' }}
          >
            Talk / Ask about the lesson
          </InputLabel>
          <TextField
            id="generation-prompt-input"
            fullWidth
            multiline
            variant="outlined"
            value={userConvPrompt}
            onChange={(e) => {
              setUserConvPrompt(e.target.value);
            }}
            style={{ marginTop: '20px' }}
          />
         <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 1, bgcolor: "#FFC107", color: "#fff", width: "200px", "&:hover": { bgcolor: "#FFCA28" } }}
            onClick={addUserMessageAndCallOpenAIAPI}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              bgcolor: deleteMode ? "#DC3545" : "#f5f5f5",
              color: deleteMode ? "#fff" : "#0000a0",
              width: "200px",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "#fff",
              },
            }}
            onClick={removeLastMessageByPath}
            >
            Remove Last Message
          </Button>
        </FormControl>

    </Container>
  );
};

export default KnowledgeTreeUI;
