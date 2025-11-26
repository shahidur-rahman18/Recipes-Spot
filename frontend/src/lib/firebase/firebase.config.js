// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDvmfg_nAMP_gbo_NmRIZwmr4BgJgX1D0",
  authDomain: "recipes-spot.firebaseapp.com",
  projectId: "recipes-spot",
  storageBucket: "recipes-spot.firebasestorage.app",
  messagingSenderId: "35796271570",
  appId: "1:35796271570:web:68ba395f8d3d8104e4c80b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
