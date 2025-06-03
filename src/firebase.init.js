// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADHdyvCxusRYryVB8lvl2UaY1cuO77j3E",
  authDomain: "email-password-authentic-b6c81.firebaseapp.com",
  projectId: "email-password-authentic-b6c81",
  storageBucket: "email-password-authentic-b6c81.firebasestorage.app",
  messagingSenderId: "93983935091",
  appId: "1:93983935091:web:014bc1c343bde6c0047806",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
