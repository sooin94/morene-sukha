// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9BWzGuvvej0xwseiTkw3qqMxxy4xt7yM",
  authDomain: "morene-sukha.firebaseapp.com",
  projectId: "morene-sukha",
  storageBucket: "morene-sukha.firebasestorage.app",
  messagingSenderId: "357580131881",
  appId: "1:357580131881:web:d6bf48258a6705e7a6d638",
  measurementId: "G-00XKZ8ZGDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const fbAuth=getAuth(app);
export const fbStore=getFirestore(app);
