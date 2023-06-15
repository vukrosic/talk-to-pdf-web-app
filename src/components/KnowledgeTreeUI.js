import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages } from "../store/actions";
import { Grid, Container, Button, TextField, Box } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";
import { addDocumentToTopic, deleteDocument } from "../utils/helpers";
import { auth, db } from "../config/firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { fetchKnowledgeTreeData } from '../utils/helpers';
import { fetchKnowledgeTree } from "../store/actions";

const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);
  const [newTopic, setNewTopic] = useState("");
  const [refreshUI, setRefreshUI] = useState(false); // Add refresh state
  const [deleteMode, setDeleteMode] = useState(false); // Add delete mode state
  const [selectedItem, setSelectedItem] = useState(null); // Add selected item state

  useEffect(() => {
    dispatch(setColumns([{ items: knowledgeTree }]));
  }, [knowledgeTree, dispatch]);

  const handleItemClick = (item, columnIndex) => {
    if (deleteMode) {
      // Delete mode is active
      deleteItem(item, columnIndex);
    } else {
      // Delete mode is inactive
      const newSelectedItems = [...selectedItems.slice(0, columnIndex), item.id];
      const newColumns = columns.slice(0, columnIndex + 1);

      if (item.branchingTopics) {
        newColumns.push({ items: item.branchingTopics });
      }

      dispatch(setSelectedItems(newSelectedItems));
      dispatch(setColumns(newColumns));
      if (item.messages) {
        const messagesArray = Object.keys(item.messages).map((key) => ({
          role: key,
          content: item.messages[key],
        }));
        dispatch(setMessages(messagesArray));
      } else {
        dispatch(setMessages([]));
      }
    }
  };

  const deleteItem = async (item, columnIndex) => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      const newColumns = columns.slice(0, columnIndex);
      dispatch(setColumns(newColumns));

      if (item.id === selectedItem) {
        setSelectedItem(null);
      }

      const treePath = selectedItems.slice(0, columnIndex);
      await deleteDocument(treePath, item.id);

      // Fetch updated knowledge tree data
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const knowledgeTreeRef = collection(db, `users/${currentUser.uid}/KnowledgeTree`);
      const knowledgeTreeData = await fetchKnowledgeTreeData(knowledgeTreeRef);
      dispatch(fetchKnowledgeTree(knowledgeTreeData));
    }
  };

  const handleAddTopic = async (docId, addToCurrent) => {
    if(addToCurrent){
      await addDocumentToTopic(selectedItems.slice(0, selectedItems.length - 1), docId);
    }else{
      await addDocumentToTopic(selectedItems.slice(0, selectedItems.length), docId);
    }
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const knowledgeTreeRef = collection(db, `users/${currentUser.uid}/KnowledgeTree`);
    const knowledgeTreeData = await fetchKnowledgeTreeData(knowledgeTreeRef);
    dispatch(fetchKnowledgeTree(knowledgeTreeData));
  };

  const renderColumns = (items, columnIndex) => {
    if (items.length === 0) {
      return null;
    }
    console.log(columnIndex);
    return (
      <Column
        key={columnIndex}
        items={items}
        onItemClick={(item) => handleItemClick(item, columnIndex)}
        selectedItem={selectedItems[columnIndex]}
        branchingTopics={items.branchingTopics}
      />
    );
  };

  useEffect(() => {
    if (refreshUI) {
      console.log("refreshing UI");
      setRefreshUI(false);
    }
  }, [refreshUI]);

  const handleToggleDeleteMode = () => {
    setDeleteMode((prevDeleteMode) => !prevDeleteMode);
    setSelectedItem(null);
  };

  return (
    <Container>
      <Grid container spacing={2} wrap="nowrap">
        {columns.map((column, index) => renderColumns(column.items, index))}
      </Grid>
      {messages.length > 0 && <ChatUI messages={messages} />}
      <TextField
        fullWidth
        label="Add Topic"
        variant="outlined"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
      />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: '#f5f5f5', color: '#0000a0', width: '200px', '&:hover': { bgcolor: '#007bff', color: '#ffffff' } }}
          onClick={() => handleAddTopic(newTopic, true)}
        >
          Add To Current
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: '#f5f5f5', color: '#0000a0', width: '200px', '&:hover': { bgcolor: '#007bff', color: '#ffffff' } }}
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
          onClick={handleToggleDeleteMode}
        >
          {deleteMode ? "Exit Delete Mode" : "Delete Mode"}
        </Button>

      </Box>
    </Container>
  );
};

export default KnowledgeTreeUI;
