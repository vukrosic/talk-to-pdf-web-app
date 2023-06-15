import {
  FETCH_KNOWLEDGE_TREE,
  SET_COLUMNS,
  SET_SELECTED_ITEMS,
  SET_MESSAGES,
  ADD_TOPIC_TO_TREE,
  DELETE_TOPIC_FROM_TREE
} from "./actions";

const initialState = {
  knowledgeTree: null,
  columns: [],
  selectedItems: [],
  messages: []
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
     case ADD_TOPIC_TO_TREE: {
      const { id, parent } = action.payload;
      return { ...state, knowledgeTree: [...state.knowledgeTree, { id, parent }] }; //add new topic to end of array
    }
    case DELETE_TOPIC_FROM_TREE: {
      const deleteTopicFromTree = (knowledgeTree, path) => {
          if (path.length === 0) return [];
  
          if (path.length === 1) {
              return knowledgeTree.filter(topic => topic.id !== path[0]);
          }
  
          return knowledgeTree.map(topic => {
              if (topic.id === path[0]) {
                  topic.branchingTopics = deleteTopicFromTree(topic.branchingTopics, path.slice(1));
              }
              return topic;
          });
      };
  
      return {
          ...state,
          knowledgeTree: deleteTopicFromTree(state.knowledgeTree, action.payload.path)
      };
  }
      
    
    default:
      return state;
  }
};

export default knowledgeTreeReducer;
