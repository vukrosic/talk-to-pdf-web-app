import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchKnowledgeTree } from "../store/actions";
import KnowledgeTreeContainer from "./KnowledgeTreeContainer";

const KnowledgeTreeWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const knowledgeTreeData = [
      {
        id: "Python",
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
              },
              {
                id: "asdfasdf",
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