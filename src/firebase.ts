import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APPID,
});
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const provider = new GoogleAuthProvider();