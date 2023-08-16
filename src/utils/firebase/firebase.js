// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQobfAYFQtQYv4KqichnjkkBPJDvKvQhc",
  authDomain: "todo-app-f951e.firebaseapp.com",
  projectId: "todo-app-f951e",
  storageBucket: "todo-app-f951e.appspot.com",
  messagingSenderId: "817526372789",
  appId: "1:817526372789:web:a2d86c1d9188cba40b41fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const db = getFirestore(app);
export const createUserFromAuth = async (userauth,aditional) => {
  const userReferance = doc(db, "user", userauth.uid);
  const userSnapshot = await getDoc(userReferance);
  

  if (!userSnapshot.exists()) {
    const { displayName, email } = userauth;
    const createDate = new Date();
    console.log("create", userauth);

    try {
      await setDoc(userReferance, {
        displayName,
        email,
        createDate,
        ...aditional
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userReferance;
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChanged_Listener = (callback) =>
  onAuthStateChanged(auth, callback);
