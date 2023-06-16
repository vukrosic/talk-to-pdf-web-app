// ../store/actions.js

export const FETCH_KNOWLEDGE_TREE = "FETCH_KNOWLEDGE_TREE";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS";
export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_TOPIC_TO_TREE = "ADD_TOPIC_TO_TREE";
export const DELETE_TOPIC_FROM_TREE = "DELETE_TOPIC_FROM_TREE";
export const UPDATE_KNOWLEDGE_TREE = "UPDATE_KNOWLEDGE_TREE";

export const fetchKnowledgeTree = (knowledgeTreeData) => ({
  type: FETCH_KNOWLEDGE_TREE,
  payload: knowledgeTreeData,
});

export const setColumns = (columns) => ({
  type: SET_COLUMNS,
  payload: columns,
});

export const setSelectedItems = (selectedItems) => ({
  type: SET_SELECTED_ITEMS,
  payload: selectedItems,
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const updateKnowledgeTree = (knowledgeTree) => ({
  type: UPDATE_KNOWLEDGE_TREE,
  payload: knowledgeTree,
});
// export const addTopicToTree = (id, parent) => ({
//   type: ADD_TOPIC_TO_TREE,
//   payload: { id, parent },
// });

export const deleteTopicFromTree = (path) => ({
  type: DELETE_TOPIC_FROM_TREE,
  payload: { path },
});
