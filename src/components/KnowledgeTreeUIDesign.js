import React from "react";
import { Grid, Container } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";

const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const selectedItems = [];
  const columns = [{ items: knowledgeTree }];
  const messages = [];

  const handleItemClick = (item, columnIndex) => {
    // Handle item click logic here
  };

  const renderColumns = (items, columnIndex) => {
    if (items.length === 0) {
      return null;
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
