import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchKnowledgeTree } from "../store/actions";
import KnowledgeTreeContainer from "./KnowledgeTreeContainer";

const KnowledgeTreeWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const knowledgeTreeData = [
      {
        id: "C#1",
        branchingTopics: [
          {
            id: "Algorithms",
            branchingTopics: [
              {
                id: "Djikstra",
                branchingTopics: [
                  {
                    id: "Djiktra1",
                    branchingTopics: []
                  }
                ]
              }
            ]
          },
          {
            id: "Data Types",
            branchingTopics: [
              {
                id: "Integers",
                branchingTopics: []
              }
            ]
          }
        ]
      },
      {
        id: "Python",
        branchingTopics: [
          {
            id: "Data Types",
            branchingTopics: [
              {
                id: "Arrays",
                branchingTopics: []
              },
              {
                id: "Integers",
                branchingTopics: []
              },
              {
                id: "Lists",
                branchingTopics: []
              }
            ]
          }
        ]
      }
    ];

    dispatch(fetchKnowledgeTree(knowledgeTreeData));
  }, [dispatch]);

  return (
    <div>
      <h1>KnowledgeTree</h1>
      <KnowledgeTreeContainer />
    </div>
  );
};

export default KnowledgeTreeWrapper;