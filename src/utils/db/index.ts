import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  Firestore,
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7yEIBIPvuJVro0OuE2fuPSL_xgE7aJd4",
  authDomain: "typemagic-18c6c.firebaseapp.com",
  projectId: "typemagic-18c6c",
  storageBucket: "typemagic-18c6c.appspot.com",
  messagingSenderId: "331537953798",
  appId: "1:331537953798:web:04fbba820c7985ddaf3f87",
  measurementId: "G-80YL57YXBB",
};

import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";

let analytics;
let db: Firestore;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(app);

if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

async function setDocumentByPath(documentPath: string, data: any) {
  const docRef = doc(db, documentPath);
  await setDoc(docRef, data);
}

// Access Firebase services using shorthand notation
db = getFirestore(app);

// ====================
// HELPER FUNCS
// ====================

export { analytics, db, auth, storage };
