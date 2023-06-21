import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';

const GetUserTreeDataFromDatabase = () => {
  const [knowledgeTree, setKnowledgeTree] = useState(null);

  useEffect(() => {
    const fetchKnowledgeTreeData = async () => {
      const currentUser = auth?.currentUser;
      if (!currentUser) return;

      const userRef = doc(db, `users/${currentUser.uid}`);
      const userDocSnapshot = await getDoc(userRef);
      const userData = userDocSnapshot.data();
      const knowledgeTreeData = userData.knowledgeTree;
      setKnowledgeTree(knowledgeTreeData);
    };

    console.log('fetchKnowledgeTreeData');

    fetchKnowledgeTreeData();
  }, []);

  return (
    <div>
      {/* <h1>KnowledgeTree</h1>
      {knowledgeTree ? <p>{knowledgeTree}</p> : <p>Loading...</p>} */}
    </div>
  );
};

export default GetUserTreeDataFromDatabase;