import { createStore, combineReducers } from "redux";
import knowledgeTreeReducer from "./reducers";

const rootReducer = combineReducers({ knowledgeTree: knowledgeTreeReducer });

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
