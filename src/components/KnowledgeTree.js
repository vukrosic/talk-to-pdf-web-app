// import React, { useEffect, useState } from 'react';
// import { auth, db } from '../config/firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import KnowledgeTreeUI from './KnowledgeTreeUI';
// import ChatUI from './ChatUI';

// const fetchKnowledgeTreeData = async (ref) => {
//   const data = [];
//   const docsSnapshot = await getDocs(ref);

//   for (const docSnapshot of docsSnapshot.docs) {
//     const docData = {
//       id: docSnapshot.id,
//       ...docSnapshot.data(),
//       branchingTopics: null,
//     };

//     const subColRef = collection(ref, docSnapshot.id, 'branching-topics');
//     docData.branchingTopics = await fetchKnowledgeTreeData(subColRef);

//     data.push(docData);
//   }

//   return data;
// };


// const KnowledgeTree = () => {
//   const [knowledgeTree, setKnowledgeTree] = useState(null);

//   useEffect(() => {
//     const fetchAndSetKnowledgeTreeData = async () => {
//       const currentUser = auth.currentUser;
//       if (!currentUser) return;

//       const knowledgeTreeRef = collection(db, `users/${currentUser.uid}/KnowledgeTree`);
//       const knowledgeTreeData = await fetchKnowledgeTreeData(knowledgeTreeRef);
//       console.log(knowledgeTreeData);
//       console.log(JSON.stringify(knowledgeTreeData));
//       setKnowledgeTree(knowledgeTreeData);
//     };

//     fetchAndSetKnowledgeTreeData();
//   }, []);

//   return (
//     <div>
//       <h1>KnowledgeTree</h1>
//       {knowledgeTree ? (
//         <KnowledgeTreeUI knowledgeTree={knowledgeTree} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default KnowledgeTree;