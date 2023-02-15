import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "kwizz-8f691.firebaseapp.com",
  projectId: "kwizz-8f691",
  storageBucket: "kwizz-8f691.appspot.com",
  messagingSenderId: "812829358774",
  appId: "1:812829358774:web:336ce75166daf168c8c417",
  measurementId: "G-9BXC0R2EG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{
    app,
    analytics
}