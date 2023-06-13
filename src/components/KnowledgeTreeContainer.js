import React from "react";
import { useSelector } from "react-redux";
import KnowledgeTreeUI from "./KnowledgeTreeUI";

const KnowledgeTreeContainer = () => {
  // Access the 'knowledgeTree' state from the Redux store
  const { knowledgeTree } = useSelector((state) => state.knowledgeTree);

  // Check if 'knowledgeTree' exists
  if (knowledgeTree) {
    // Render KnowledgeTreeUI component and pass 'knowledgeTree' as a prop
    return <KnowledgeTreeUI knowledgeTree={knowledgeTree} />;
  } else {
    // Render a loading message
    return <p>Loading...</p>;
  }
};

export default KnowledgeTreeContainer;
