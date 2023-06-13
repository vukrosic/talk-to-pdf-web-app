export const FETCH_KNOWLEDGE_TREE = "FETCH_KNOWLEDGE_TREE";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS";
export const SET_MESSAGES = "SET_MESSAGES";

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