import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy2kj5vABLbWFbcaK9cKRX19ldkSE3B1c",
  authDomain: "personal-teacher-gpt.firebaseapp.com",
  databaseURL: "https://personal-teacher-gpt-default-rtdb.firebaseio.com",
  projectId: "personal-teacher-gpt",
  storageBucket: "personal-teacher-gpt.appspot.com",
  messagingSenderId: "266393942599",
  appId: "1:266393942599:web:bd61bb3cd9386f58f60f62",
  measurementId: "G-MQKS8Q0E02"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);