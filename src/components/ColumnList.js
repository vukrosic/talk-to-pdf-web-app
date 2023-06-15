// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setColumns, setSelectedItems, setMessages } from "../store/actions";
// import { Grid } from "@mui/material";
// import Column from "./Column";

// const ColumnList = () => {
//   const dispatch = useDispatch();
//   const columns = useSelector((state) => state.knowledgeTree.columns);
//   const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);

//   const handleItemClick = (item, columnIndex) => {
//     const newSelectedItems = [...selectedItems.slice(0, columnIndex), item.id];
//     const newColumns = columns.slice(0, columnIndex + 1);

//     if (item.branchingTopics) {
//       newColumns.push({ items: item.branchingTopics });
//     }
    
//     dispatch(setSelectedItems(newSelectedItems));
//     dispatch(setColumns(newColumns));
//     if (item.messages) {
//       const messagesArray = Object.keys(item.messages).map((key) => ({
//         role: key,
//         content: item.messages[key],
//       }));
//       dispatch(setMessages(messagesArray));
//     } else {
//       dispatch(setMessages([]));
//     }
//   };

//   return (
//     <Grid container spacing={2} wrap="nowrap">
//       {
//         columns.map((column, index) => (
//           <Column
//             key={index}
//             items={column.items}
//             onItemClick={(item) => handleItemClick(item, index)}
//             selectedItem={selectedItems[index]}
//             branchingTopics={column.items.branchingTopics}
//           />
//         ))
//       }
//     </Grid>
//   );
// };

// export default ColumnList;