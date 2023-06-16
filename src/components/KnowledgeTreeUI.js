import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages, addTopicToTree, deleteTopicFromTree } from "../store/actions";
import { Grid, Container, Button, TextField, Box, FormControl, InputLabel } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";
import { fetchKnowledgeTreeData } from "../utils/helpers";
import { ADD_TOPIC_TO_TREE } from "../store/actions";
import { terminate } from "firebase/firestore";
import { callOpenAIAPIFunctions } from "./CallOpenAIAPIFunctions";
import { callOpenAIAPI } from "./CallOpenAIAPI";


const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);
  const [newTopic, setNewTopic] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [topicGenerationPrompt, setTopicGenerationPrompt] = useState(null);

  useEffect(() => {

    if(selectedItems.length > 0) {
      setSelectedItem(selectedItems.slice(0, selectedItems.length - 1));
    }
    if(columns.length > 1) {
        setSelectedItem(columns.slice(0, columns.length - 2).concat(columns.slice(-1)));
    }
    else {
      dispatch(setColumns([(knowledgeTree.map(item => item.id))]));
    }

    // console.log(selectedItems);
    // console.log(columns);
  }, [knowledgeTree, dispatch]);




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
    // if (!isTopicUnique) {
    //   alert("Topic already exists in the column");
    //   return;
    // }
  
    currentTopic.push({ id: addedTopic, branchingTopics: [] });
  
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


  const test = () => {

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
    const model = "gpt-3.5-turbo-0613";
    const messages = [
      { role: "user", content: topicGenerationPrompt },
    ]
    callOpenAIAPI(messages, model, addBranchingTopic, handleItemClick, selectedItems, addToCurrent)
  }
  



  const handleItemClick = (item, columnIndex) => {
    // set topic generation prompt
    
    const newSelectedItems = [...selectedItems.slice(0, columnIndex), item];
    const branchingTopics = getBranchingTopics(newSelectedItems);
    const newColumns = [...columns.slice(0, columnIndex + 1), branchingTopics];
    setTopicGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(newSelectedItems) + " Give me an enumerated list of 5 subtopics of the last element I can study from. All should be subtopics of the last topic in the array, not of each other. Put each subtopic in new line, starting with a number, for example '1.', and no other characters or subtopics in the same line.");
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
      {messages.length > 0 && <ChatUI messages={messages} />}

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
            
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 2, bgcolor: "#FFC107", color: "#fff", width: "200px", "&:hover": { bgcolor: "#FFCA28" } }}
          onClick={() => addBranchingTopic(newTopic, false)}
        >
          Add Subtopic
        </Button>

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
            variant="outlined"
            value={topicGenerationPrompt}
            onChange={(e) => {
              setTopicGenerationPrompt(e.target.value);
            }}
            style={{ marginTop: '20px' }}
          />
        </FormControl>


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
            onClick={() => { setTopicGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(selectedItems) + " Give me an enumerated list of 5 subtopics of the last element I can study from. All should be subtopics of the last topic in the array, not of each other. Put each subtopic in new line, starting with a number, for example '1.', and no other characters or subtopics in the same line.") }}
            disabled={selectedItems.length <= 0}
          >
            Reset Prompt
          </Button>
        </Box>
        

        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
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
            onClick={removeItem}
          >
            Delete
          </Button>
        </Box>
      </Box>

    </Container>
  );
};

export default KnowledgeTreeUI;
