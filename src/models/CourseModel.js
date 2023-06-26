import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, setDoc } from "firebase/firestore";

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
    await setDoc(courseRef, newCourse);
    setCourse(newCourse);
  };

  return { course, updateCourse };
};

export default CourseModel;