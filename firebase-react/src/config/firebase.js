// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2H3AOqIncrX5zXLyGdPHdv3qrhljPWRs",
  authDomain: "fir-react-89f29.firebaseapp.com",
  projectId: "fir-react-89f29",
  storageBucket: "fir-react-89f29.appspot.com",
  messagingSenderId: "76447422927",
  appId: "1:76447422927:web:935e77cccae4251f251aba",
  measurementId: "G-6QDH1YX865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
