import { FETCH_KNOWLEDGE_TREE, SET_COLUMNS, SET_SELECTED_ITEMS, SET_MESSAGES } from "./actions";

const initialState = {
  knowledgeTree: null,
  columns: [],
  selectedItems: [],
  messages: [],
};

const knowledgeTreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KNOWLEDGE_TREE:
      return { ...state, knowledgeTree: action.payload };
    case SET_COLUMNS:
      return { ...state, columns: action.payload };
    case SET_SELECTED_ITEMS:
      return { ...state, selectedItems: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

export default knowledgeTreeReducer;