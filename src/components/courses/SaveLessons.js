import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const exampleMarkdown = `
# Example
`;

const SaveLessons = () => {
  const [lessons, setLessons] = useState([exampleMarkdown]);

  const saveMarkdown = async () => {
    const lessonRef = doc(db, 'courses', 'Javascript Fundamentals');
    await setDoc(lessonRef, { lessons }, { merge: true });
  };

  return (
    <div>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <textarea value={lesson} onChange={(e) => {
            const updatedLessons = [...lessons];
            updatedLessons[index] = e.target.value;
            setLessons(updatedLessons);
          }} />
        </div>
      ))}
      <button onClick={() => setLessons([...lessons, ''])}>Add lesson</button>
      <button onClick={saveMarkdown}>Save Lessons</button>
    </div>
  );
};

export default SaveLessons;