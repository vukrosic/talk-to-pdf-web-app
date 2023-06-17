import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchKnowledgeTree } from "../store/actions";
import KnowledgeTreeContainer from "./KnowledgeTreeContainer";

const KnowledgeTreeWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const knowledgeTreeData = [
      {
        "id": "Computer Science",
        "branchingTopics": [
          {
            "id": "Algorithms and Data Structures",
            "branchingTopics": [],
            "messages": [
              {
                "role": "assistant",
                "content": "Here you have an array. Each element is a subtopic of the previous: ['Computer Science','Algorithms and Data Structures'] Generate a comprehensive, detailed, university level lesson about ['Algorithms and Data Structures'], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
              }
            ]
          },
          {
            "id": "Computer Networks",
            "branchingTopics": [],
            "messages": [
              {
                "role": "assistant",
                "content": "Here you have an array. Each element is a subtopic of the previous: ['Computer Science','Computer Networks'] Generate a comprehensive, detailed, university level lesson about ['Computer Networks'], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
              }
            ]
          },
          {
            "id": "Machine Learning, Artificial Intelligence & Robotics",
            "branchingTopics": [],
            "messages": [
              {
                "role": "assistant",
                "content": "Here you have an array. Each element is a subtopic of the previous: ['Computer Science','Machine Learning, Artificial Intelligence & Robotics'] Generate a comprehensive, detailed, university level lesson about ['Machine Learning, Artificial Intelligence & Robotics'], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
              }
            ]
          },
          {
            "id": "Data Science & Big Data",
            "branchingTopics": [],
            "messages": [
              {
                "role": "assistant",
                "content": "Here you have an array. Each element is a subtopic of the previous: ['Computer Science','Data Science & Big Data'] Generate a comprehensive, detailed, university level lesson about ['Data Science & Big Data'], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
              }
            ]
          },
          {
            "id": "Cyber Security",
            "branchingTopics": [],
            "messages": [
              {
                "role": "assistant",
                "content": "Here you have an array. Each element is a subtopic of the previous: ['Computer Science','Cyber Security'] Generate a comprehensive, detailed, university level lesson about ['Cyber Security'], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
              }
            ]
          },
          {
            "id": "Software Development & Programming",
            "branchingTopics": [],
            "messages": [
              {
                "role": "assistant",
                "content": "Here you have an array. Each element is a subtopic of the previous: ['Computer Science','Software Development & Programming'] Generate a comprehensive, detailed, university level lesson about ['Software Development & Programming'], while taking the into consideration the parent topics. Use markdown, bullet points, exampels, lists, and other formatting to make the lesson easy to read and understand."
              }
            ]
          }
        ]
      },
      {
        "id": "Mathematics",
        "branchingTopics": [
          {
            "id": "Calculus & Analysis",
            "branchingTopics": []
          },
          {
            "id": "Algebra",
            "branchingTopics": []
          },
          {
            "id": "Geometry & Topology",
            "branchingTopics": []
          },
          {
            "id": "Probability & Statistics",
            "branchingTopics": []
          },
          {
            "id": "Discrete Mathematics",
            "branchingTopics": []
          },
          {
            "id": "Mathematical Logic",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Business and Management",
        "branchingTopics": [
          {
            "id": "Marketing & Advertising",
            "branchingTopics": []
          },
          {
            "id": "Leadership & Management Skills",
            "branchingTopics": []
          },
          {
            "id": "Finance & Accounting",
            "branchingTopics": []
          },
          {
            "id": "Entrepreneurship",
            "branchingTopics": []
          },
          {
            "id": "Business Law",
            "branchingTopics": []
          },
          {
            "id": "Business Ethics",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Physics",
        "branchingTopics": [
          {
            "id": "Mechanics & Thermodynamics",
            "branchingTopics": []
          },
          {
            "id": "Electromagnetism & Optics",
            "branchingTopics": []
          },
          {
            "id": "Quantum Mechanics",
            "branchingTopics": []
          },
          {
            "id": "Solid State Physics",
            "branchingTopics": []
          },
          {
            "id": "Astrophysics",
            "branchingTopics": []
          },
          {
            "id": "Particle Physics",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Chemistry",
        "branchingTopics": [
          {
            "id": "Organic Chemistry",
            "branchingTopics": []
          },
          {
            "id": "Inorganic Chemistry",
            "branchingTopics": []
          },
          {
            "id": "Analytical Chemistry",
            "branchingTopics": []
          },
          {
            "id": "Physical Chemistry",
            "branchingTopics": []
          },
          {
            "id": "Environmental Chemistry",
            "branchingTopics": []
          },
          {
            "id": "Biochemistry",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Biology",
        "branchingTopics": [
          {
            "id": "Cell & Molecular Biology",
            "branchingTopics": []
          },
          {
            "id": "Genetics & Evolution",
            "branchingTopics": []
          },
          {
            "id": "Ecology",
            "branchingTopics": []
          },
          {
            "id": "Animal & Plant Biology",
            "branchingTopics": []
          },
          {
            "id": "Human Anatomy",
            "branchingTopics": []
          },
          {
            "id": "Microbiology",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Medicine and Health sciences",
        "branchingTopics": [
          {
            "id": "Anatomy & Physiology",
            "branchingTopics": []
          },
          {
            "id": "Microbiology & Immunology",
            "branchingTopics": []
          },
          {
            "id": "Clinical Medicine",
            "branchingTopics": []
          },
          {
            "id": "Pharmacology",
            "branchingTopics": []
          },
          {
            "id": "Psychiatry",
            "branchingTopics": []
          },
          {
            "id": "Medical Research",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Psychology",
        "branchingTopics": [
          {
            "id": "Developmental Psychology",
            "branchingTopics": []
          },
          {
            "id": "Clinical Psychology",
            "branchingTopics": []
          },
          {
            "id": "Cognitive Psychology",
            "branchingTopics": []
          },
          {
            "id": "Social Psychology",
            "branchingTopics": []
          },
          {
            "id": "Educational Psychology",
            "branchingTopics": []
          },
          {
            "id": "Industrial and Organizational Psychology",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "History",
        "branchingTopics": [
          {
            "id": "Ancient History",
            "branchingTopics": []
          },
          {
            "id": "Medieval History",
            "branchingTopics": []
          },
          {
            "id": "Modern History",
            "branchingTopics": []
          },
          {
            "id": "History of Specific Regions",
            "branchingTopics": []
          },
          {
            "id": "Social History",
            "branchingTopics": []
          },
          {
            "id": "Cultural History",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "English & Literature",
        "branchingTopics": [
          {
            "id": "American Literature",
            "branchingTopics": []
          },
          {
            "id": "British Literature",
            "branchingTopics": []
          },
          {
            "id": "Creative Writing",
            "branchingTopics": []
          },
          {
            "id": "Linguistics",
            "branchingTopics": []
          },
          {
            "id": "World Literature",
            "branchingTopics": []
          },
          {
            "id": "Literary Theory",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Economics",
        "branchingTopics": [
          {
            "id": "Microeconomics",
            "branchingTopics": []
          },
          {
            "id": "Macroeconomics",
            "branchingTopics": []
          },
          {
            "id": "International Economics",
            "branchingTopics": []
          },
          {
            "id": "Development Economics",
            "branchingTopics": []
          },
          {
            "id": "Econometrics",
            "branchingTopics": []
          },
          {
            "id": "Behavioral Economics",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Sociology",
        "branchingTopics": [
          {
            "id": "Social Theory",
            "branchingTopics": []
          },
          {
            "id": "Social Stratification and Inequality",
            "branchingTopics": []
          },
          {
            "id": "Sociology of Gender and Sexuality",
            "branchingTopics": []
          },
          {
            "id": "Crime and Justice",
            "branchingTopics": []
          },
          {
            "id": "Sociology of Health and Illness",
            "branchingTopics": []
          },
          {
            "id": "Race and Ethnicity",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Philosophy",
        "branchingTopics": [
          {
            "id": "Ethics",
            "branchingTopics": []
          },
          {
            "id": "Epistemology",
            "branchingTopics": []
          },
          {
            "id": "Metaphysics",
            "branchingTopics": []
          },
          {
            "id": "Philosophy Of Religion",
            "branchingTopics": []
          },
          {
            "id": "Aesthetics",
            "branchingTopics": []
          },
          {
            "id": "Political Philosophy",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Geography",
        "branchingTopics": [
          {
            "id": "Physical Geography",
            "branchingTopics": []
          },
          {
            "id": "Human Geography",
            "branchingTopics": []
          },
          {
            "id": "Geographic Information Systems (GIS)",
            "branchingTopics": []
          },
          {
            "id": "Environmental Geography",
            "branchingTopics": []
          },
          {
            "id": "Regional Geography",
            "branchingTopics": []
          },
          {
            "id": "Urban Geography",
            "branchingTopics": []
          }
        ]
      },
      {
        "id": "Environmental Science",
        "branchingTopics": [
          {
            "id": "Climate Change and Global Warming",
            "branchingTopics": []
          },
          {
            "id": "Conservation and Biodiversity",
            "branchingTopics": []
          },
          {
            "id": "Environmental Policy",
            "branchingTopics": []
          },
          {
            "id": "Environmental Toxicology",
            "branchingTopics": []
          },
          {
            "id": "Waste Management",
            "branchingTopics": []
          },
          {
            "id": "Sustainable Development",
            "branchingTopics": []
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