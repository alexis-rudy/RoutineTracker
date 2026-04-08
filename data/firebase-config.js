// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const requiredEnvVars = [
  "EXPO_PUBLIC_FIREBASE_API_KEY",
  "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "EXPO_PUBLIC_FIREBASE_PROJECT_ID",
  "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "EXPO_PUBLIC_FIREBASE_APP_ID",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing Firebase environment variables: ${missingEnvVars.join(", ")}. Add them to .env and restart Expo.`,
  );
}

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;

export const db = getFirestore(app);

function normalizeTaskItem(item) {
  if (typeof item === "string") {
    return { title: item, done: false };
  }

  if (!item || typeof item !== "object") {
    return null;
  }

  return {
    ...item,
    done: item.done === true || item.done === "true",
  };
}

export async function uploadJSONToFirestore(collectionName, jsonData) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.warn(`No upload data for ${collectionName}.`);
    return 0;
  }

  let uploadedCount = 0;

  try {
    for (const rawItem of jsonData) {
      const item = normalizeTaskItem(rawItem);

      if (!item || !item.title) {
        continue;
      }

      await addDoc(collection(db, collectionName), item);
      uploadedCount += 1;
    }

    console.log(`Uploaded ${uploadedCount} records to ${collectionName}.`);
    return uploadedCount;
  } catch (error) {
    console.error(`Error uploading JSON to ${collectionName}:`, error);
    throw error;
  }
}

export async function seedTaskCollections() {
  const sources = [
    ["morning_tasks", require("./morning-tasks.json")],
    ["afternoon_tasks", require("./afternoon-tasks.json")],
    ["evening_tasks", require("./evening-tasks.json")],
  ];

  const results = {};

  for (const [collectionName, payload] of sources) {
    results[collectionName] = await uploadJSONToFirestore(
      collectionName,
      payload,
    );
  }

  return results;
}
