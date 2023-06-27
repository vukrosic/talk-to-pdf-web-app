import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, setDoc, updateDoc, addDoc, doc } from "firebase/firestore";

const CourseModel = () => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      const currentUser = auth?.currentUser;
      if (!currentUser) return;

      const courseRef = collection(db, `users/${currentUser.uid}/created_courses`);
      const courseSnapshot = await getDocs(courseRef);
      if (!courseSnapshot.empty) {
        const courseData = courseSnapshot.docs[0].data();
        setCourse(courseData);
      }
    };

    loadCourse();
  }, []);

  const updateCourse = async (newCourse) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const courseRef = collection(db, `users/${currentUser.uid}/created_courses`);
    await updateDoc(courseRef, newCourse);
    setCourse(newCourse);
  };

  const addCourse = async (newCourse) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const courseRef = collection(db, `users/${currentUser.uid}/created_courses`);
    const docRef = await addDoc(courseRef, newCourse);
    const courseSnapshot = await getDocs(doc(db, `users/${currentUser.uid}/created_courses/${docRef.id}`));
    if (!courseSnapshot.empty) {
      const courseData = courseSnapshot.docs[0].data();
      setCourse(courseData);
    }
  };

  return { course, updateCourse, addCourse };
};

export default CourseModel;