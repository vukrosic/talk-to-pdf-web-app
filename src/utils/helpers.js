import { getDocs, collection, doc, addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import {auth} from '../config/firebase';

const fetchKnowledgeTreeData = async (ref) => {
  // const docsSnapshot = await getDocs(ref);

  // const dataPromises = docsSnapshot.docs.map(async (docSnapshot) => {
  //   const docData = {
  //     id: docSnapshot.id,
  //     ...docSnapshot.data(),
  //   };
  //   delete docData.messages;

  //   const branchingTopicsRef = collection(ref, docSnapshot.id, "branching-topics");
  //   const branchingTopicsData = fetchKnowledgeTreeData(branchingTopicsRef);
  //   docData.branchingTopics = await branchingTopicsData;

  //   return docData;
  // });

  // const results = await Promise.all(dataPromises);

  // return results;
};



const addDocumentToTree = async (rootPath, treePath, newDocData) => {
  let currentRef = collection(db, ...rootPath);

  // Iterate through the treePath to generate the reference to the parent node
  for (let i = 0; i < treePath.length; i++) {
    const docId = treePath[i];
    currentRef = collection(currentRef, docId, 'branching-topics');
  }

  // Check if the document already exists
  const existingDocRef = doc(currentRef, newDocData.id);

  // Set the new document data instead of checking if it exists
  await setDoc(existingDocRef, newDocData);

  console.log('Document added successfully');
};


const addDocumentToTopic = async (topicsList, docId) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const rootPath = ['users', currentUser.uid, 'KnowledgeTree'];
  const newDocData = {
    id: docId,
  };

  try {
    await addDocumentToTree(rootPath, topicsList, newDocData);
    console.log('Document added successfully');
  } catch (error) {
    console.error('Error adding document:', error);
  }
};


const addDocumentToTreeForCurrentUser = async (treePath, docId) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  let currentRef = collection(db, 'users', currentUser.uid, 'KnowledgeTree');

  // Iterate through the treePath to generate the reference to the parent node
  for (let i = 0; i < treePath.length; i++) {
    const docId = treePath[i];
    currentRef = collection(currentRef, docId, 'branching-topics');
  }

  // Check if the document already exists
  const existingDocRef = doc(currentRef, docId);

  // Set the new document data
  const newDocData = {
    id: docId,
  };
  
  try {
    await setDoc(existingDocRef, newDocData);
    console.log('Document added successfully');
  } catch (error) {
    console.error('Error adding document:', error);
  }
};


const deleteDocument = async (treePath, docId) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  let currentRef = collection(db, 'users', currentUser.uid, 'KnowledgeTree');

  // Iterate through the treePath to generate the reference to the parent node
  for (let i = 0; i < treePath.length; i++) {
    const parentId = treePath[i];
    currentRef = collection(currentRef, parentId, 'branching-topics');
  }

  // Delete the document
  const documentRef = doc(currentRef, docId);
  
  try {
    await deleteDoc(documentRef);
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

export { fetchKnowledgeTreeData, addDocumentToTopic, addDocumentToTreeForCurrentUser, deleteDocument };