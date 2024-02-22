import admin from "firebase-admin";

// Note re. the private key formatting: https://github.com/gladly-team/next-firebase-auth/discussions/95#discussioncomment-2891225
let serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
    : undefined,
  client_email:
    "firebase-adminsdk-z0cf9@typemagic-18c6c.iam.gserviceaccount.com",
  client_id: "111905503050827831487",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z0cf9%40typemagic-18c6c.iam.gserviceaccount.com",
};
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

try {
  db.settings({ ignoreUndefinedProperties: true });
} catch (e) {}

export const verifyIdToken = async (idToken: string) => {
  let userId = undefined;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    userId = decodedToken.uid;
  } catch (error) {
    return undefined;
  }
  return userId;
};

export const getUserIdForEmail = async (email: string) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    console.log("dafuq, no user? ", email);
    return undefined;
  }
  const userId = snapshot.docs[0].id;
  return userId;
};

export { db, admin };
