// import { updateDoc, doc, getDocs, collection } from 'firebase/firestore';

// const updateKnowledgeTreeData = async (ref, documentId, updatedData) => {
//     try {
//       const docRef = doc(ref, documentId);
//       await updateDoc(docRef, updatedData);
//       console.log(`Document with ID ${documentId} updated successfully`);
//     } catch (e) {
//       console.error('Error updating document:', e);
//     }
//   };


//   const findDocumentInTree = async (ref, targetDocumentId) => {
//     const docsSnapshot = await getDocs(ref);
//     for (const docSnapshot of docsSnapshot.docs) {
//       if (docSnapshot.id === targetDocumentId) {
//         return ref; // Found the document, return its parent reference
//       }
//       const subColRef = collection(ref, docSnapshot.id, 'branching-topics');
//       const result = await findDocumentInTree(subColRef, targetDocumentId);
//       if (result) {
//         return result; // Found in the subcollection, return the result
//       }
//     }
//     return null; // Not found in this level
//   };