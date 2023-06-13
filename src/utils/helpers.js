import { getDocs, collection } from 'firebase/firestore';

const fetchKnowledgeTreeData = async (ref) => {
    const data = [];
    const docsSnapshot = await getDocs(ref);
  
    for (const docSnapshot of docsSnapshot.docs) {
      const docData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
        branchingTopics: null,
      };
  
      const subColRef = collection(ref, docSnapshot.id, 'branching-topics');
      docData.branchingTopics = await fetchKnowledgeTreeData(subColRef);
  
      data.push(docData);
    }
  
    return data;
  };

export default fetchKnowledgeTreeData;