import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages } from "../store/actions";
import { Grid, Container } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";

const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);

  useEffect(() => {
    // Reinitialize the columns state when the knowledgeTree prop changes
    dispatch(setColumns([{ items: knowledgeTree }]));
  }, [knowledgeTree, dispatch]);

  const handleItemClick = (item, columnIndex) => {
    const newSelectedItems = [...selectedItems.slice(0, columnIndex), item];
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
  };

  const renderColumns = (items, columnIndex) => {
    if (items.length === 0) {
      return null; // Don't render the column if there are no items
    }

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

  return (
    <Container>
      <Grid container spacing={2} wrap="nowrap">
        {columns.map((column, index) => renderColumns(column.items, index))}
      </Grid>
      {messages.length > 0 && <ChatUI messages={messages} />}
    </Container>
  );
};

export default KnowledgeTreeUI;