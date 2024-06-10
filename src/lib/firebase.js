import { initializeApp, getApps, getApp,} from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyDquefGIA9-oDFG1MaGQXK13P8kd0fME8E",
  authDomain: "pointofsale-e9c67.firebaseapp.com",
  projectId: "pointofsale-e9c67",
  storageBucket: "pointofsale-e9c67.appspot.com",
  messagingSenderId: "873672400366",
  appId: "1:873672400366:web:99a14043f5c5bb03a302ff",
  measurementId: "G-DBYGYSG3W1"
};

if (!getApps().length) {
  initializeApp(config);
}

export const firebaseApp = getApps();
export const appFb = getApp();
export const auth = getAuth();
export const db = getFirestore();