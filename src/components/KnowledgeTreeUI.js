import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages, addTopicToTree, deleteTopicFromTree } from "../store/actions";
import { Grid, Container, Button, TextField, Box } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";
import { fetchKnowledgeTreeData } from "../utils/helpers";
import { ADD_TOPIC_TO_TREE } from "../store/actions";


const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);
  const [newTopic, setNewTopic] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(setColumns([(knowledgeTree.map(item => item.id))]));
  }, [knowledgeTree, dispatch]);

  const getBranchingTopicsAndMessages = (path) => {
    let currentLevel = knowledgeTree;
    const result = [];
    for (let i = 0; i < 2; i++) {
      console.log(i);
      const topic = currentLevel.find((item) => item.id === path[i]);
      console.log(topic);
      if (topic) {
        result.push(topic.id);
        currentLevel = topic.branchingTopics;
        // console.log("branchingTopics:" + JSON.stringify(topic.branchingTopics));
      } else {
        console.log("BREAKKKKKKKKKK");
        break;
      }
      console.log("LOL");
    }
  
    return result;
  };

  const handleItemClick = (item, columnIndex) => {
    const newSelectedItems = [...selectedItems.slice(0, columnIndex), item];
    const newColumns = columns.slice(0, columnIndex + 1);
    // Assume the getBranchingTopicsAndMessages function is defined
    const branchingTopics = getBranchingTopicsAndMessages(newSelectedItems);

    if (branchingTopics) {
      newColumns.push(branchingTopics);
    }

    dispatch(setSelectedItems(newSelectedItems));
    dispatch(setColumns(newColumns));
  };

  const deleteItem = () => {

    dispatch(deleteTopicFromTree(selectedItems));
  }

  const handleAddTopic = (docId, addToCurrent) => {
    dispatch({
      type: 'ADD_TOPIC_TO_TREE',
      payload: {
        path: ['C#1', 'Algorithms']
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

  // const handleToggleDeleteMode = () => {
  //   setDeleteMode((prevDeleteMode) => !prevDeleteMode);
  //   setSelectedItem(null);
  // };

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
          onClick={() => handleAddTopic(newTopic, true)}
        >
          Add To Current
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#007bff", color: "#ffffff" } }}
          onClick={() => handleAddTopic(newTopic, false)}
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
          onClick={deleteItem}
        >
          {deleteMode ? "Exit Delete Mode" : "Delete Mode"}
        </Button>
        <Button onClick={ () => console.log(columns)} >check columns</Button>
      </Box>
    </Container>
  );
};

export default KnowledgeTreeUI;
