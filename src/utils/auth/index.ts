import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";

import { auth, db } from "../db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { identify, reset } from "../logging";
import { createUniqueHandle } from "..";

const signIn = (activeAgentId?: string) => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      let data = getAdditionalUserInfo(result);

      if (data) {
        let { email, name, picture } = data.profile as any;
        // Update the user object associated with this logged in user with this data:
        const docRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          // if document exists, update data:
          console.log("doc already exists, setDoc().");
          await setDoc(docRef, { email }, { merge: true }); // We're setting the email in case it's changed?
        } else {
          // if document doesn't exist, create a new document with default data
          console.log("doc doesn't exist, creating a new user doc.");
          await setDoc(docRef, {
            email,
            name,
            handle: createUniqueHandle(name),
          });
        }

        identify(email);

        console.log("user object created and saved!");

        if (activeAgentId) {
          return (window.location.href = `/chat?activeAgent=${activeAgentId}`);
        }

        // Redirect user to the home page:
        window.location.href = "/chat";
      } else {
        signOut();
      }

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const signOut = () => {
  reset();
  firebaseSignOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = "/";
    })
    .catch((error) => {
      // An error happened.
    });
};

export const getIdToken = async () => {
  let token = await auth.currentUser?.getIdToken();
  return token;
};

export const getUserId = () => {
  let userId = auth.currentUser?.uid;
  return userId;
};

export { auth, signIn, signOut };
