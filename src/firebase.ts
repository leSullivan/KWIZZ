import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaZxC_x-FXGD_Y_kQK8Z4NdQzLYTFjoF4",
  authDomain: "kwizz-8f691.firebaseapp.com",
  projectId: "kwizz-8f691",
  storageBucket: "kwizz-8f691.appspot.com",
  messagingSenderId: "812829358774",
  appId: "1:812829358774:web:336ce75166daf168c8c417",
  measurementId: "G-9BXC0R2EG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//auth
const loginEmailPassword = async (email: string, password: string) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials.user);
  } catch (error) {
    console.log(error);
  }
};

const registerEmailPassword = async (email:string, password:string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    } catch (error) {
    console.log(error);
  }
};

const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);
    console.log(userCredentials.user);
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (email:string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "success"
  } catch (e:any) {
    return e.code
  }
};

export { app, analytics, auth, db, loginEmailPassword, registerEmailPassword, loginGoogle, logout, resetPassword };
