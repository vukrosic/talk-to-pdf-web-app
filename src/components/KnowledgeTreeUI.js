import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setSelectedItems, setMessages, addTopicToTree, deleteTopicFromTree } from "../store/actions";
import { Grid, Container, Button, TextField, Box, FormControl, InputLabel } from "@mui/material";
import Column from "./Column";
import ChatUI from "./ChatUI";
import { fetchKnowledgeTreeData } from "../utils/helpers";
import { ADD_TOPIC_TO_TREE } from "../store/actions";
import { terminate } from "firebase/firestore";
import { callOpenAIAPIFunctions } from "./CallOpenAIAPIFunctions";
import { callOpenAIAPI } from "./CallOpenAIAPIToGenerateTopics";
import { callOpenAIAPIToGenerateLesson } from "./CallOpenAIAPIToGenerateLesson";
import { getMergedStatus } from "antd/es/_util/statusUtils";
// import { GetUserTreeDataFromDatabase } from "./GetUserTreeDataFromDatabase";
import { auth, db } from '../config/firebase';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';


const KnowledgeTreeUI = ({ knowledgeTree }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.knowledgeTree.columns);
  const selectedItems = useSelector((state) => state.knowledgeTree.selectedItems);
  const messages = useSelector((state) => state.knowledgeTree.messages);
  const [newTopic, setNewTopic] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [topicGenerationPrompt, setTopicGenerationPrompt] = useState("");
  const [lessonGenerationPrompt, setLessonGenerationPrompt] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [messagesStore, setMessagesStore] = useState({});
  const [currentMessages, setCurrentMessages] = useState([]);
  const [userConvPrompt, setUserConvPrompt] = useState([]);
  const [model, setModel] = useState("gpt-3.5-turbo-0613");
  const [knowledgeTreeState, setKnowledgeTreeState] = useState(knowledgeTree);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // save messagesStore to db
 // Load messages from the database when the component mounts or currentUser changes
 useEffect(() => {
  const loadMessages = async (userId) => {
    // Load messages from the database
    const userRef = doc(db, `users/${userId}`);
    const loadedMessagesStore = await userRef.messagesStore; // Load from database

    // Update the state only if there are messages in the database
    if (loadedMessagesStore) {
      setMessagesStore(JSON.parse(loadedMessagesStore));
    }

    setIsInitialLoad(false); // Set initial load to false after loading messages
  };

  const currentUser = auth?.currentUser;
  if (!currentUser) return;

  loadMessages(currentUser.uid);
}, [auth?.currentUser]);

// Save messages to the database when messagesStore changes and it's not the initial load
useEffect(() => {
  if (!messagesStore || isInitialLoad) return;

  const currentUser = auth?.currentUser;
  if (!currentUser) return;

  const userRef = doc(db, `users/${currentUser.uid}`);
  const stringifiedMessagesStore = JSON.stringify(messagesStore);

  getDoc(userRef).then((docSnapshot) => {
    if (docSnapshot.exists() && docSnapshot.data()) {
      const { knowledgeTree } = docSnapshot.data() ?? {}; // Add optional chaining and a default value
      // Perform necessary operations with knowledgeTree

      updateDoc(userRef, { messagesStore: stringifiedMessagesStore });
    }
  });
}, [messagesStore, isInitialLoad]);



  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectedItem(selectedItems.slice(0, selectedItems.length - 1));
    }
  
    const newColumns = columns.length > 1
      ? columns.slice(0, columns.length - 2).concat(columns.slice(-1))
      : [knowledgeTree.map(item => item.id)];
  
    dispatch(setColumns(newColumns));
  }, [knowledgeTree, dispatch]);


  useEffect(() => {
    const fetchKnowledgeTreeData = async () => {
      const currentUser = auth?.currentUser;
      if (!currentUser) return;

      const userRef = doc(db, `users/${currentUser.uid}`);
      const userDocSnapshot = await getDoc(userRef);
      if(!userDocSnapshot.exists()) return;
      const userData = userDocSnapshot.data();
      if(userData?.messagesStore !== undefined && userData?.messagesStore !== "")
        setMessagesStore(JSON.parse(userData.messagesStore));
    };
    fetchKnowledgeTreeData();
  }, [db]);


  useEffect(() => {
    const path = selectedItems.join(" > ");
    if (!(path in messagesStore)){
      saveMessagesByPath("assistant", lessonGenerationPrompt, false)
    }
    setCurrentMessages(getMessagesByPath(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    setCurrentMessages(getMessagesByPath(selectedItems));
  }, [messagesStore]);

  function getBranchingTopics(path) {
    let currentTopic = knowledgeTree;
  
    // Traverse the path
    for (let i = 0; i < path.length; i++) {
      const topicId = path[i];
      const nextTopic = currentTopic.find((topic) => topic.id === topicId);
  
      if (nextTopic) {
        currentTopic = nextTopic.branchingTopics;
      } else {
        // Path is invalid, return empty array
        return [];
      }
    }
  
    // Return the IDs of the branching topics of the last topic in the path
    return currentTopic.map((topic) => topic.id);
  }

  // save knowledge tree in database on update
  useEffect(() => {
    if (!knowledgeTreeState) return;
    const currentUser = auth?.currentUser;
    if (!currentUser) return;
    const userRef = doc(db, `users/${currentUser.uid}`);
    const stringifiedKnowledgeTree = JSON.stringify(knowledgeTreeState);
    updateDoc(userRef, { knowledgeTree: stringifiedKnowledgeTree });
  }, [knowledgeTreeState]);



  function addBranchingTopic(addedTopic, addToCurrent) {
    if (addedTopic === "") {
      alert("Please enter a topic name");
      return;
    }
  
    // add it to database
    const feedbackRef = doc(db, "feedback/generated-topics");
    var newTopic = selectedItems.join(" > ") + " > " + addedTopic;

    updateDoc(feedbackRef, {
      Topics: arrayUnion(newTopic)
    });

    const count = addToCurrent ? selectedItems.length - 1 : selectedItems.length;
  
    let currentTopic = selectedItems
      .slice(0, count)
      .reduce((acc, topicId) => acc.find((topic) => topic.id === topicId).branchingTopics, knowledgeTree);
  
    const isTopicUnique = currentTopic.every((topic) => (topic.id !== addedTopic));
    if (!isTopicUnique) {
      alert("Topic already exists in the column");
      return;
    }
  
    setKnowledgeTreeState(prevKnowledgeTree => {
      const newKnowledgeTree = JSON.parse(JSON.stringify(prevKnowledgeTree));
      currentTopic.push({ id: addedTopic, branchingTopics: [], messages: [{ role: "assistant", content: "Here you have an array." }] });
      return newKnowledgeTree;
    });
  
    updateItemInColumns(addedTopic, addToCurrent ? 1 : 0);
  }
  
  
  function updateItemInColumns(addedTopic, subtract) {
    const columnIndex = selectedItems.length - subtract;
    const newColumns = columns.map((column, index) => {
      if (index === columnIndex) {
        return [...column, addedTopic];
      } else {
        return column;
      }
    });
    // console.log(newColumns);
    dispatch(setSelectedItems(selectedItems.slice(0)));
    dispatch(setColumns(newColumns));
  }

  function saveMessagesByPath(role, content, overwriteLastMessage = false) {
    const path = selectedItems.join(" > ");
    if (!(path in messagesStore)) {
      setMessagesStore((prevMessagesStore) => ({
        ...prevMessagesStore,
        [path]: [{
          role: role,
          content: content,
        }]
      }));
    } else {
      if (overwriteLastMessage) {
        setMessagesStore((prevMessagesStore) => {
          const newMessagesStore = { ...prevMessagesStore };
          const messages = newMessagesStore[path];
          const lastMessage = messages[messages.length - 1];
          if (lastMessage.role === role) {
            const updatedMessages = messages.slice(0, messages.length - 1);
            updatedMessages.push({ role: role, content: content });
            newMessagesStore[path] = updatedMessages;
          } else {
            messages.push({ role: role, content: content });
          }
          return newMessagesStore;
        });
      } else {
        setMessagesStore((prevMessagesStore) => {
          const newMessagesStore = {...prevMessagesStore};
          newMessagesStore[path] = [
            ...newMessagesStore[path],
            { role: role, content: content },
          ];
          return newMessagesStore;
        });
      }
    }
  }


  function removeLastMessageByPath() {
    const path = selectedItems.join(" > ");
    if (messagesStore != undefined && (path in messagesStore)) {
      setMessagesStore((prevMessagesStore) => {
        const newMessagesStore = { ...prevMessagesStore };
        const messages = newMessagesStore[path];
        if (messages.length > 1) {
          messages.pop(); // Remove the last message from the array
        }
        return newMessagesStore;
      });
    }
  }
  
  
  
  

  const getMessagesByPath = (path) => {
    const formattedPath = path.join(" > ");
    if (formattedPath in messagesStore) {
      return messagesStore[formattedPath];
    } else {
      //console.log("Key does not exist:", formattedPath);
      return null; // or any default value you prefer
    }
  }
  

  const test = () => {
      console.log(messagesStore);
    
  }

  

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };
  
  function generateLesson() {
    callOpenAIAPIToGenerateLesson(currentMessages, model, saveMessagesByPath, selectedItems);
  }

  const removeItem = () => {
    const columnIndex = selectedItems.length - 1;
    const newSelectedItems = selectedItems.slice(0, -1);
    const newColumns = columns.map((column, index) => {
    if (index === columnIndex) {
      return column.filter((item) => item !== selectedItems[columnIndex]);
    }
    return column;
  });
    dispatch(setSelectedItems(newSelectedItems));
    dispatch(setColumns(newColumns.slice(0, columnIndex+1)));
    deleteItem();
  };
  
  
  const generateTopics = async (addToCurrent) => {
    const messages = [
      { role: "user", content: topicGenerationPrompt },
    ]
    callOpenAIAPI(messages, model, addBranchingTopic, handleItemClick, selectedItems, addToCurrent)
  }
  

  const addUserMessageAndCallOpenAIAPI = async () => {
    const newCurrentMessages = [...currentMessages, { role: "user", content: userConvPrompt }];
    callOpenAIAPIToGenerateLesson(newCurrentMessages, model, saveMessagesByPath);
    saveMessagesByPath("user", userConvPrompt, false);
  }



  const handleItemClick = (item, columnIndex) => {
    // add messages if there isn't any
    // saveMessagesByPath(selectedItems);
    // setCurrentMessages(getMessagesByPath(selectedItems));
    // set topic generation prompt
    const newSelectedItems = [...selectedItems.slice(0, columnIndex), item];
    const branchingTopics = getBranchingTopics(newSelectedItems);
    const newColumns = [...columns.slice(0, columnIndex + 1), branchingTopics];
    setTopicGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(newSelectedItems) + " Give me an enumerated list of 5 subtopics of the last element I can study from. All should be subtopics of the last topic in the array, not of each other. Put each subtopic in new line, starting with a number, for example '1.', and no other characters or subtopics in the same line.");
    setLessonGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(newSelectedItems) + " Generate a comprehensive, detailed, university level lesson about " + JSON.stringify(newSelectedItems[newSelectedItems.length - 1]) + ", while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, code snippets if applicable and other formatting to make the lesson easy to read and understand.")
    // dispatch(setMessages(getMessagesByPath(newSelectedItems))) ;
    dispatch(setSelectedItems(newSelectedItems));
    dispatch(setColumns(newColumns));
};

  const deleteItem = () => {

    dispatch(deleteTopicFromTree(selectedItems));
    selectedItems.pop();
  }


  const renderColumns = (items, columnIndex) => {
    if (items.length === 0) {
      return null;
    }
    const column = (
      <Column
        key={columnIndex}
        items={items}
        onItemClick={(item) => {
          handleItemClick(item, columnIndex);
        }}
        selectedItem={selectedItems[columnIndex]}
      />
    );
    return column;
}

  return (
    <Container>
      <Grid container spacing={2} wrap="nowrap">
        {columns.map((column, index) => renderColumns(column, index))}
      </Grid>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <TextField
          fullWidth
          label="Add Topic"
          variant="outlined"
          value={newTopic}
          sx={{ mt: 4}}
          onChange={(e) => {
            setNewTopic(e.target.value);
          }}
        />
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 1, bgcolor: "#FFC107", color: "#fff", width: "200px", "&:hover": { bgcolor: "#FFCA28" } }}
            onClick={() => addBranchingTopic(newTopic, false)}
          >
            Add Subtopic
          </Button>
          <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                ml: 1,
                bgcolor: "#f5f5f5",
                color: "#0000a0",
                width: "200px",
                "&:hover": {
                  bgcolor: "#DC3545",
                  color: "#fff",
                },
              }}
              onClick={removeItem}
            >
              Delete Subtopic
            </Button>
          </Box>

      {showForm && (
        <FormControl fullWidth variant="outlined">
          <InputLabel
            htmlFor="generation-prompt-input"
            style={{ position: 'absolute', top: '-10px', backgroundColor: '#FFF', padding: '0 5px' }}
          >
            Generation Prompt
          </InputLabel>
          <TextField
            id="generation-prompt-input"
            fullWidth
            multiline
            variant="outlined"
            value={lessonGenerationPrompt}
            onChange={(e) => {
              setLessonGenerationPrompt(e.target.value);
            }}
            style={{ marginTop: '20px' }}
          />
        </FormControl>
      )}


        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, mr: 1, bgcolor: "#00b3ff", color: "#fff", width: "200px", "&:hover": { bgcolor: "#2196F3" } }}
            onClick={() => { generateTopics(false) }}
            disabled={selectedItems.length <= 0}
          >
            Generate Subtopic
          </Button>

          <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          sx={{ mt: 1, ml: 1, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#DC3545", color: "#fff" } }} 
          onClick={toggleFormVisibility}
          disabled={selectedItems.length <= 0}
          >
            Edit prompt
          </Button>
          {showForm && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, ml: 1, bgcolor: "#f5f5f5", color: "#0000a0", width: "200px", "&:hover": { bgcolor: "#DC3545", color: "#fff" } }}
            onClick={() => { setTopicGenerationPrompt("Here you have an array. Each element is a subtopic of the previous: " + JSON.stringify(selectedItems) + " Give me an enumerated list of 5 subtopics of the last element I can study from. All should be subtopics of the last topic in the array, not of each other. Put each subtopic in new line, starting with a number, for example '1.', and no other characters or subtopics in the same line.") }}
            disabled={selectedItems.length <= 0}
          >
            Reset Prompt
          </Button>
          )}
        </Box>
        

        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          
          {/* <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: deleteMode ? "#DC3545" : "#f5f5f5",
              color: deleteMode ? "#fff" : "#0000a0",
              width: "200px",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "#fff",
              },
            }}
            onClick={test}
          >
            Test
          </Button> */}


        </Box>

      </Box>
        <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: deleteMode ? "#DC3545" : "#f5f5f5",
              color: deleteMode ? "#fff" : "#0000a0",
              width: "200px",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "#fff",
              },
            }}
            onClick={generateLesson}
          >
            Generate Lesson
          </Button>
          {currentMessages !== null && currentMessages.length > 0 && <ChatUI messages={currentMessages} />}

          <FormControl fullWidth variant="outlined" sx={{ mt: 8}}>
          <InputLabel
            htmlFor="generation-prompt-input"
            style={{ position: 'absolute', top: '-10px', backgroundColor: '#FFF', padding: '0 5px' }}
          >
            Talk / Ask about the lesson
          </InputLabel>
          <TextField
            id="generation-prompt-input"
            fullWidth
            multiline
            variant="outlined"
            value={userConvPrompt}
            onChange={(e) => {
              setUserConvPrompt(e.target.value);
            }}
            style={{ marginTop: '20px' }}
          />
         <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 1, bgcolor: "#FFC107", color: "#fff", width: "200px", "&:hover": { bgcolor: "#FFCA28" } }}
            onClick={addUserMessageAndCallOpenAIAPI}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              bgcolor: deleteMode ? "#DC3545" : "#f5f5f5",
              color: deleteMode ? "#fff" : "#0000a0",
              width: "200px",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "#fff",
              },
            }}
            onClick={removeLastMessageByPath}
            >
            Remove Last Message
          </Button>
        </FormControl>

    </Container>
  );
};

export default KnowledgeTreeUI;
