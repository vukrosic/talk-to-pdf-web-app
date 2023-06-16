import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages, addTopicToTree, deleteTopicFromTree } from "../store/actions";
import { Grid, Container, Button, TextField, Box } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";
import { fetchKnowledgeTreeData } from "../utils/helpers";
import { ADD_TOPIC_TO_TREE } from "../store/actions";
import { terminate } from "firebase/firestore";


const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);
  const [newTopic, setNewTopic] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  

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



  function addBranchingTopic(addToCurrent) {
    if (newTopic === "") {
      alert("Please enter a topic name");
      return;
    }
  
    const count = addToCurrent ? selectedItems.length - 1 : selectedItems.length;
    let currentTopic = selectedItems
      .slice(0, count)
      .reduce((acc, topicId) => acc.find((topic) => topic.id === topicId).branchingTopics, knowledgeTree);
  
    // Check if the new topic already exists in the current column
    const isTopicUnique = currentTopic.every((topic) => topic.id !== newTopic);
    if (!isTopicUnique) {
      alert("Topic already exists in the column");
      return;
    }
  
    currentTopic.push({ id: newTopic, branchingTopics: [] });
  
    updateItemInColumns(addToCurrent ? 1 : 0);
    return true;
  }
  
  
  function updateItemInColumns(subtract) {
    const columnIndex = selectedItems.length - subtract;
    const newColumns = columns.map((column, index) =>
      index === columnIndex ? [...column, newTopic] : column
    );
    
    dispatch(setSelectedItems(selectedItems.slice(0)));
    dispatch(setColumns(newColumns));
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
  
  


  const handleItemClick = (item, columnIndex) => {
    const newSelectedItems = [...selectedItems.slice(0, columnIndex), item];
    const branchingTopics = getBranchingTopics(newSelectedItems);
    const newColumns = [...columns.slice(0, columnIndex + 1), branchingTopics];
     
    dispatch(setSelectedItems(newSelectedItems));
    dispatch(setColumns(newColumns));
};

  const deleteItem = () => {

    dispatch(deleteTopicFromTree(selectedItems));
    selectedItems.pop();
  }

  const handleAddTopic = (docId, addToCurrent) => {
    dispatch({
      type: 'ADD_TOPIC_TO_TREE',
      payload: {
        path: ['Python', 'asdfsaf'],
      },
    });
  };

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
      <TextField
        fullWidth
        label="Add Topic"
        variant="outlined"
        value={newTopic}
        onChange={(e) => {
          setNewTopic(e.target.value);
        }}
      />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#007bff", color: "#ffffff" } }}
          onClick={() => addBranchingTopic(true)}
        >
          Add Below
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#007bff", color: "#ffffff" } }}
          onClick={() => addBranchingTopic(false)}
        >
          Add To Next
        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: deleteMode ? "red" : "#f5f5f5",
            color: deleteMode ? "white" : "#0000a0",
            width: "200px",
            "&:hover": {
              bgcolor: "red",
              color: "#f5f5f5",
            },
          }}
          onClick={removeItem}
        >
          Delete
        </Button>
        <Button onClick={ () => console.log(selectedItems)} >check columns</Button>
      </Box>
    </Container>
  );
};

export default KnowledgeTreeUI;
