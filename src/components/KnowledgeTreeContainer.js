import React from "react";
import { useSelector } from "react-redux";
import KnowledgeTreeUI from "./KnowledgeTreeUI";

const KnowledgeTreeContainer = () => {
  const { knowledgeTree } = useSelector((state) => state.knowledgeTree);

  return knowledgeTree ? <KnowledgeTreeUI knowledgeTree={knowledgeTree} /> : <p>Loading...</p>;
};

export default KnowledgeTreeContainer;