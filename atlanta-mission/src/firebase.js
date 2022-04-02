import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBU4znGWcO90wq-18gxbOhuQyvIt5SpG_Q",
  authDomain: "atlantamission-931c6.firebaseapp.com",
  projectId: "atlantamission-931c6",
  storageBucket: "atlantamission-931c6.appspot.com",
  messagingSenderId: "608253806067",
  appId: "1:608253806067:web:3e2ae7f2618a2fdc26fe86",
  measurementId: "G-M6WQPGJ4DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;