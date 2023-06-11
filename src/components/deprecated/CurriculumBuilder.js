import React, { useState } from "react";
import { callOpenAIAPI } from "../CallOpenAIAPI";
import ChatUI from "../ChatUI";
import { Grid, TextareaAutosize, CardHeader, CardContent, Typography, TextField, Button, Snackbar } from '@mui/material';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from "../../config/firebase";
import { updateDoc, doc } from 'firebase/firestore';
import {
  arrayUnion,
  getDocs,
  setDoc,
  query,
  where
} from 'firebase/firestore';


const CurriculumBuilder = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are the personal AI coding teacher that teaches people coding 1 on 1. Here's a step-by-step explanation of what you as a personal AI coding teacher do.\n\n1. User Input and Assessment:\nUsers complete an initial assessment and provide input regarding their current skill level, coding experience, goals, and preferred programming languages by answering 5 questions. This information allows you to understand the user's starting point and desired learning objectives.\n \n2. Pre-defined Curriculum Outlines:\nBased on general coding concepts and industry-specific best practices, you generate pre-defined curriculum outlines covering various difficulty levels (beginner, intermediate, advanced), programming languages (Python, Java, JavaScript, C++, etc.), and specialized fields (Web development, Data Science, Machine Learning, etc.).\n3. Customization of Curriculum:\nYou take the user's input and assessment outcome to select the most suitable predefined curriculum outline. You then further ask the user if he wants to customize the curriculum by adding or removing modules and topics, ensuring it aligns with the user's objectives, goals, and learning pace.\n\nBuild such a curriculum after asking me appropriate questions.",
    },
    {
      role: "assistant",
      content: "Hello! I am your personal AI coding teacher. I'm excited to help you on your journey to learn programming. Let's start by understanding your background, objectives, and preferences. Please answer the following questions:\n\n1. What is your current programming skill level (beginner, intermediate, advanced)?\n2. What programming languages, if any, are you familiar with?\n3. Which programming language(s) are you interested in learning or improving your skills in?\n4. Are there any specific areas you'd like to focus on (e.g., web development, data science, machine learning, etc.)?\n5. What are your short-term and long-term goals related to programming?",
    }
  ]);
  // "You are buildi\nng a software engineering curriculum on simple python. It should have a form of 1. module \n a) submodule \n i. subsubmodule.",
  const [newMessage, setNewMessage] = useState('');

  const [curriculum, setCurriculum] = useState([
    {
      title: 'Test Module1qw1231',
      subModules: [
        {
          title: 'Test Submodule1',
          subSubModules: [
            {
              title: 'Test SubSubModule1',
            },
            {
              title: 'Test SubSubModule6',
            }
          ],
          title2: 'Test Submodule2',
          subSubModules2: [
            {
              title: 'Test SubSubModule2',
            },
            {
              title: 'Test SubSubModule2',
            }
          ],
        },
      ],
    },
  ]);
  const [isMessageLimitExceeded, setMessageLimitExceeded] = useState(false);


  const parseCurriculum = (response) => {
    const moduleRegex = /(\d+\.)\s(.*?)(?=\n|$)/g;
    const subModuleRegex = /(\b[a-z]\)\s)(.*?)(?=\n|$)/g;
    const subSubModuleRegex = /(\b[ivx]+\.)\s(.*?)(?=\n|$)/g;

    const modules = [...response.matchAll(moduleRegex)].map((match) => ({
      number: match[1],
      title: match[2],
      subModules: [],
    }));
  
    const subModules = [...response.matchAll(subModuleRegex)].map((match) => ({
      letter: match[1],
      title: match[2],
      subSubModules: [],
    }));
  
    const subSubModules = [
      ...response.matchAll(subSubModuleRegex),
    ].map((match) => ({
      greekLetter: match[1],
      title: match[2],
    }));
  
    // Assign sub-submodules to submodules
    subModules.forEach((subModule) => {
      subSubModules.forEach((subSubModule, index) => {
        if (subSubModule.title.startsWith(subModule.title)) {
          subModule.subSubModules.push(subSubModule);
          subSubModules.splice(index, 1);
        }
      });
    });
  
    // Assign submodules to modules
    modules.forEach((module) => {
      subModules.forEach((subModule, index) => {
        if (subModule.title.startsWith(module.title)) {
          module.subModules.push(subModule);
          subModules.splice(index, 1);
        }
      });
    });
  
    setCurriculum(modules);
  };


  const addMessage = (content) => {
    const newMessage = {
      role: "assistant",
      content: content,
    };
  
    if (messages.length >= 5) {
      setMessageLimitExceeded(true);
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };
  
  
  const handleSubmit = async () => {
    if (messages.length >= 5) {
      setMessageLimitExceeded(true);
      return;
    }
  
    const newUserMessage = {
      role: "user",
      content: newMessage,
    };
  
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setNewMessage('');
  
    const response = await callOpenAIAPI([...messages, newUserMessage], "gpt-4");
    parseCurriculum(response);
    addMessage(response);
  };



  const handleSaveCurriculum = async () => {
    if (!auth.currentUser) {
      // Alert or handle the situation when a user is not signed-in
      console.error('User not signed in');
      return;
    }

    const curriculumsRef = collection(
      db,
      `users/${auth.currentUser.uid}/curriculums`
    );

    const existingCurriculumQuery = query(
      curriculumsRef,
      where('title', '==', curriculum[0].title)
    );

    try {
      const existingCurriculumSnapshot = await getDocs(existingCurriculumQuery);
      if (existingCurriculumSnapshot.empty) {
        // No curriculum with the same title exists, create a new one
        await addDoc(curriculumsRef, curriculum[0]);
        console.log('Curriculum successfully added to user');
      } else {
        // Curriculum with the same title exists, update it
        const existingCurriculumDoc = existingCurriculumSnapshot.docs[0];
        await setDoc(existingCurriculumDoc.ref, curriculum[0]);
        console.log('Curriculum successfully updated');
      }
    } catch (error) {
      console.error('Error saving curriculum to user:', error);
    }
  };


  
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Typography variant="h2">Curriculum Builder</Typography>
      </div>
      <ChatUI messages={messages} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '80vw',
          gap: '8px',
        }}
      >
        <TextareaAutosize
          aria-label="New Message"
          placeholder="New Message"
          rowsMin={3}
          value={newMessage}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            resize: 'vertical',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="contained"
            onClick={handleSaveCurriculum}
            style={{ backgroundColor: curriculum ? undefined : '#ccc' }}
            disabled={curriculum.length === 0}
          >
            Save Curriculum
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
      </div>
      <Snackbar
        open={isMessageLimitExceeded}
        autoHideDuration={4000}
        onClose={() => setMessageLimitExceeded(false)}
        message="You have reached the message limit. Please refresh the page to try again."
      />
    </div>
  );
  
  
  
};

export default CurriculumBuilder;

