import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchKnowledgeTree } from "../store/actions";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import KnowledgeTreeContainer from "./KnowledgeTreeContainer";
import { fetchKnowledgeTreeData } from '../utils/helpers';



const KnowledgeTreeWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    
    const fetchAndDispatchKnowledgeTreeData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
    
      const knowledgeTreeRef = collection(db, `users/${currentUser.uid}/KnowledgeTree`);
      const knowledgeTreeData = await fetchKnowledgeTreeData(knowledgeTreeRef);
      console.log(JSON.stringify(knowledgeTreeData));
      dispatch(fetchKnowledgeTree(knowledgeTreeData));
    };


    fetchAndDispatchKnowledgeTreeData();
  }, [dispatch]);

  return (
    <div>
      <h1>KnowledgeTree</h1>
      <KnowledgeTreeContainer />
    </div>
  );
};

export default KnowledgeTreeWrapper;