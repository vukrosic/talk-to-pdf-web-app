// import React, { useState } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   TextField,
//   IconButton,
//   Button,
//   Box,
// } from '@mui/material';
// import ChatUI from './ChatUI';

// const Collection = ({ item, onClick, isSelected }) => (
//   <Box mb={1}>
//     <Button
//       fullWidth
//       variant={isSelected ? 'contained' : 'outlined'}
//       color="primary"
//       sx={{
//         bgcolor: isSelected ? '#e0e0e0' : 'transparent',
//         color: isSelected ? 'red' : 'inherit',
//         '&:hover': {
//           color: isSelected ? 'white' : 'inherit',
//         },
//       }}
//       onClick={onClick}
//     >
//       {item.id}
//     </Button>
//   </Box>
// );

// const Column = ({ items, onItemClick, selectedItem }) => (
//   <Grid item>
//     <Card>
//       <CardContent>
//         {items.map((item, index) => (
//           <Collection
//             key={index}
//             item={item}
//             onClick={() => onItemClick(item)}
//             isSelected={selectedItem === item}
//           />
//         ))}
//       </CardContent>
//     </Card>
//   </Grid>
// );

// const KnowledgeTreeUI = ({ knowledgeTree }) => {
//   const [columns, setColumns] = useState([{ items: knowledgeTree }]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [messages, setMessages] = useState([]);

//   const handleItemClick = (item, columnIndex) => {
//     setSelectedItems((prevSelectedItems) => {
//       const newSelectedItems = [...prevSelectedItems.slice(0, columnIndex), item];
//       return newSelectedItems;
//     });

//     setColumns((prevColumns) => {
//       const newColumns = prevColumns.slice(0, columnIndex + 1);
//       newColumns.push({ items: item.branchingTopics });
//       return newColumns;
//     });

//     if (item.messages) {
//       setMessages((prevMessages) => {
//         const newMessages = [];
//         const roles = Object.keys(item.messages);
//         for (let i = 0; i < roles.length; i++) {
//           const role = roles[i];
//           const content = item.messages[role];
//           newMessages.push({ role, content });
//         }
//         return newMessages;
//       });
//     } else {
//       setMessages([]);
//     }
//   };

//   return (
//     <Container>
//       <Grid container spacing={2} wrap="nowrap">
//         {columns.map((column, index) => (
//           <Column
//             key={index}
//             items={column.items || []}
//             onItemClick={(item) => handleItemClick(item, index)}
//             selectedItem={selectedItems[index]}
//           />
//         ))}
//       </Grid>
//       {messages.length > 0 && <ChatUI messages={messages} />}
//     </Container>
//   );
// };

// export default KnowledgeTreeUI;





import React from "react";
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

  const renderColumns = (items, columnIndex) => (
    <Column
      key={columnIndex}
      items={items}
      onItemClick={(item) => handleItemClick(item, columnIndex)}
      selectedItem={selectedItems[columnIndex]}
      branchingTopics={items.branchingTopics}
    />
  );
  

  console.log("Columns:", JSON.stringify(columns, null, 2));

  return (
    <Container>
      <Grid container spacing={2} wrap="nowrap">
        {renderColumns(knowledgeTree, 0)}
        {columns.map((column, index) => renderColumns(column.items, index))}
      </Grid>
      {messages.length > 0 && <ChatUI messages={messages} />}
    </Container>
  );
};

export default KnowledgeTreeUI;