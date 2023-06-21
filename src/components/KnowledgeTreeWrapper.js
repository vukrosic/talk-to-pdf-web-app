import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchKnowledgeTree } from "../store/actions";
import KnowledgeTreeContainer from "./KnowledgeTreeContainer";
import { auth, db } from '../config/firebase';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  Grid,
  Container,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Typography
} from "@mui/material";

const KnowledgeTreeWrapper = () => {
  const dispatch = useDispatch();
  // const [knowledgeTree, setKnowledgeTree] = useState(null);


 useEffect(() => {
const knowledgeTreeData = [
      {
        "id": "Python",
        "branchingTopics": []
      },
      {
        "id": "Javascript",
        "branchingTopics": []
      },
      {
        "id": "Java",
        "branchingTopics": []
      },
      {
        "id": "C++",
        "branchingTopics": []
      },
      {
        "id": "C#",
        "branchingTopics": []
      },
      {
        "id": "Ruby",
        "branchingTopics": []
      },
      {
        "id": "Go",
        "branchingTopics": []
      },
      {
        "id": "Swift",
        "branchingTopics": []
      },
      {
        "id": "PHP",
        "branchingTopics": []
      },
      {
        "id": "Rust",
        "branchingTopics": []
      },
      {
        "id": "TypeScript",
        "branchingTopics": []
      },
      {
        "id": "Kotlin",
        "branchingTopics": []
      },
      {
        "id": "Perl",
        "branchingTopics": []
      },
      {
        "id": "Haskell",
        "branchingTopics": []
      },
      {
        "id": "Scala",
        "branchingTopics": []
      },
      {
        "id": "Lua",
        "branchingTopics": []
      },
      {
        "id": "R",
        "branchingTopics": []
      },
      {
        "id": "Shell",
        "branchingTopics": []
      },
      {
        "id": "Objective-C",
        "branchingTopics": []
      },
      {
        "id": "MATLAB",
        "branchingTopics": []
      },
      {
        "id": "Dart",
        "branchingTopics": []
      },
      {
        "id": "Groovy",
        "branchingTopics": []
      },
      {
        "id": "VB.NET",
        "branchingTopics": []
      },
      {
        "id": "Elixir",
        "branchingTopics": []
      },
      {
        "id": "Julia",
        "branchingTopics": []
      },
      {
        "id": "COBOL",
        "branchingTopics": []
      },
      {
        "id": "Fortran",
        "branchingTopics": []
      },
      {
        "id": "Prolog",
        "branchingTopics": []
      },
      {
        "id": "Lisp",
        "branchingTopics": []
      },
      {
        "id": "Ada",
        "branchingTopics": []
      },
      {
        "id": "Scheme",
        "branchingTopics": []
      }
        ]


    dispatch(fetchKnowledgeTree(knowledgeTreeData));
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchKnowledgeTreeFromDB = async () => {
  //     const currentUser = auth?.currentUser;
  //     if (!currentUser) return;

  //     const userRef = doc(db, `users/${currentUser.uid}`);
  //     const userDocSnapshot = await getDoc(userRef);
  //     const userData = userDocSnapshot.data();
  //     setKnowledgeTree(userData.knowledgeTree);
  //   };
  
  //   fetchKnowledgeTreeFromDB();
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchKnowledgeTree(JSON.parse(knowledgeTree)));
  // }, [knowledgeTree]);
  
  // useEffect(() => {
  //   const updateKnowledgeTreeInDB = async () => {
  //     if (!knowledgeTree) return;
  
  //     const currentUser = auth?.currentUser;
  //     if (!currentUser) return;
  
  //     const userRef = doc(db, `users/${currentUser.uid}`);
  //     await updateDoc(userRef, { knowledgeTree: JSON.stringify(knowledgeTree) });
  //   };
  
  //   updateKnowledgeTreeInDB();
  // }, [db, knowledgeTree]);

  // useEffect(() => {
  //   // get knowledge tree from database only when db is instanciated
  //   if (!db) return;
  
  //   const currentUser = auth.currentUser;
  //   if (!currentUser) return;
  
  //   const userRef = doc(db, `users/${currentUser.uid}`);
  //   getDoc(userRef).then((docSnapshot) => {
  //     const data = docSnapshot.data();
  //     // check if data exists and knowledgeTree is in the data
  //     if (data && "knowledgeTree" in data) {
  //       const { knowledgeTree } = data;
  //       dispatch(fetchKnowledgeTree(JSON.parse(knowledgeTree)));
  //       setKnowledgeTree(knowledgeTree);
  //     }
  //   });
  // }, [db, dispatch]);

  // useEffect(() => {
  //   if (!db || !knowledgeTree) return;
  
  //   const currentUser = auth.currentUser;
  //   if (!currentUser) return;
  
  //   const userRef = doc(db, `users/${currentUser.uid}`);
  //   updateDoc(userRef, { knowledgeTree: knowledgeTree });
  // }, [db, knowledgeTree]);

  return (
    <div>
       <Grid container spacing={3}>
      <Grid item xs={12}>
      
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          bgcolor: "#fff",
          width: "70%",
          display: "flex",
          justifyContent: "center",
          borderRadius: "5px",
          alignSelf: "center",
          margin: "0 auto",
          padding: "1rem",
          border: "1px solid #333",
          mt: 4
        }}
      >
          Learn with ChatGPT. Generate and explore topics, subtopics and lessons, and engage with ChatGPT in a conversation about the lesson you are learning.
        </Typography>
        <Typography
        variant="body1"
        gutterBottom
        sx={{
          bgcolor: "#fff",
          width: "70%",
          display: "flex",
          justifyContent: "center",
          borderRadius: "5px",
          alignSelf: "center",
          margin: "0 auto",
          color: "red",
          mt: 1,
          mb: 5
        }}
      >
          This tool is still in alpha, bugs are possible. Refresh the page if you encounter any issues. Currently, refreshing will remove all generated data.
        </Typography>
      </Grid>
    </Grid>
      <KnowledgeTreeContainer />
    </div>
  );
};

export default KnowledgeTreeWrapper;