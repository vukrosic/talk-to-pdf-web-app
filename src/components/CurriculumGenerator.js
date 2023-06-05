// CurriculumGenerator.js
import React, { useState } from 'react';
import { getFirestore, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { callOpenAIAPI } from './CallOpenAIAPI';

const CurriculumGenerator = () => {
    const [generatedCurriculum, setGeneratedCurriculum] = useState('');

    // Fetch the user's data from Firestore and generate the learning curriculum
    const generateCurriculum = async () => {
        const userRef = doc(collection(db, 'users'), auth.currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists) {
            const {
                level,
                languages,
                interestedLanguages,
                shortTermGoals,
                longTermGoals,
            } = userDoc.data();

            const messages = [
                { role: "system", content: "Generate software engineering curriculum based on the user's 5 questions and answers. It should have modules denotes with numbers, and submodules denoted with letters. Example: 1. Web Development\na. Frontend Development\ni. Advanced JavaScript concepts\nii. React or Angular for building web applications" },
                { role: "user", content: `What is your current programming skill level - (${level})` },
                { role: "user", content: `What programming languages, if any, are you familiar with? - (${languages})` },
                { role: "user", content: `Which programming language(s) are you interested in learning or improving your skills in (${interestedLanguages}) - yes` },
                { role: "user", content: `What are your short-term and long-term goals related to programming - (${shortTermGoals},${longTermGoals})` },
            ];

            // const messages = [
            //     { role: "system", content: "Generate 2 random words." },
            // ];

            console.log("messages: ", messages);
            const response = await callOpenAIAPI(messages, "gpt-3.5-turbo");
            setGeneratedCurriculum(response);
            await updateDoc(userRef, {
                generatedCurriculum: response,
                createdAt: serverTimestamp(),
            });


            // alert('Curriculum generated and saved!');
        } else {
            alert('Error fetching user data');
        }
    };

    return (
        <div>
            <h1>Generate Learning Curriculum</h1>
            <button onClick={generateCurriculum}>Generate Curriculum</button>
            {generatedCurriculum && (
                <div>
                    <h2>Curriculum:</h2>
                    <p>{generatedCurriculum}</p>
                </div>
            )}
        </div>
    );
};

export default CurriculumGenerator;