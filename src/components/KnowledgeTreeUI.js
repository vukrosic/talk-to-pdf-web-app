import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  TextField,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import ChatUI from './ChatUI';

const Collection = ({ item, onClick, isSelected }) => (
  <Box mb={1}>
    <Button
      fullWidth
      variant={isSelected ? 'contained' : 'outlined'}
      color="primary"
      sx={{
        bgcolor: isSelected ? '#e0e0e0' : 'transparent',
        color: isSelected ? 'red' : 'inherit',
        '&:hover': {
          color: isSelected ? 'white' : 'inherit',
        },
      }}
      onClick={onClick}
    >
      {item.id}
    </Button>
  </Box>
);

const Column = ({ items, onItemClick, selectedItem }) => (
  <Grid item>
    <Card>
      <CardContent>
        {items.map((item, index) => (
          <Collection
            key={index}
            item={item}
            onClick={() => onItemClick(item)}
            isSelected={selectedItem === item}
          />
        ))}
      </CardContent>
    </Card>
  </Grid>
);

const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const [columns, setColumns] = useState([{ items: knowledgeTree }]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleItemClick = (item, columnIndex) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems.slice(0, columnIndex), item];
      return newSelectedItems;
    });

    setColumns((prevColumns) => {
      const newColumns = prevColumns.slice(0, columnIndex + 1);
      newColumns.push({ items: item.branchingTopics });
      return newColumns;
    });

    if (item.messages) {
      setMessages((prevMessages) => {
        const newMessages = [];
        const roles = Object.keys(item.messages);
        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          const content = item.messages[role];
          newMessages.push({ role, content });
        }
        return newMessages;
      });
    } else {
      setMessages([]);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} wrap="nowrap">
        {columns.map((column, index) => (
          <Column
            key={index}
            items={column.items || []}
            onItemClick={(item) => handleItemClick(item, index)}
            selectedItem={selectedItems[index]}
          />
        ))}
      </Grid>
      {messages.length > 0 && <ChatUI messages={messages} />}
    </Container>
  );
};

export default KnowledgeTreeUI;