import React, { useState } from "react";
import { callOpenAIAPI } from "./CallOpenAIAPI";
import ChatUI from "./ChatUI";

const CurriculumBuilder = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "what is 1+2=",
    }
  ]);
  // "You are buildi\nng a software engineering curriculum on simple python. It should have a form of 1. module \n a) submodule \n i. subsubmodule.",
  
  const [curriculum, setCurriculum] = useState([]);

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

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };


  const handleSaveCurriculum = async () => {
    const response = await callOpenAIAPI(messages, "gpt-3.5-turbo");
    parseCurriculum(response);
    addMessage(response);
  };

  

  return (
    <div>
      <h1>Curriculum Builder</h1>
      <ChatUI messages={messages} />
      <div>
        <button onClick={handleSaveCurriculum}>Submit</button>
      </div>
    </div>
  );
};

export default CurriculumBuilder;