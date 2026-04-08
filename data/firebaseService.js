import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";

/**
 * Subscribe to unfinished tasks from a collection in real-time
 * @param {string} collectionName - Name of the Firestore collection (e.g., 'morning_tasks')
 * @param {Function} callback - Function to call when tasks change
 * @returns {Function} Unsubscribe function
 */
export function listenToUnfinishedTasks(collectionName, callback) {
  const q = query(collection(db, collectionName), where("done", "==", false));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(tasks);
    },
    (error) => {
      console.error(
        `Error listening to unfinished tasks in ${collectionName}:`,
        error,
      );
    },
  );

  return unsubscribe;
}

/**
 * Subscribe to completed tasks from a collection in real-time
 * @param {string} collectionName - Name of the Firestore collection (e.g., 'morning_tasks')
 * @param {Function} callback - Function to call when tasks change
 * @returns {Function} Unsubscribe function
 */
export function listenToCompletedTasks(collectionName, callback) {
  const q = query(collection(db, collectionName), where("done", "==", true));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(tasks);
    },
    (error) => {
      console.error(
        `Error listening to completed tasks in ${collectionName}:`,
        error,
      );
    },
  );

  return unsubscribe;
}

/**
 * Mark a task as done/completed
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} taskId - ID of the task document
 * @param {boolean} isDone - Whether the task is completed
 */
export async function updateTaskStatus(collectionName, taskId, isDone) {
  try {
    const taskRef = doc(db, collectionName, taskId);
    await updateDoc(taskRef, { done: isDone });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
}

/**
 * Delete a task from Firestore
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} taskId - ID of the task document
 */
export async function deleteTask(collectionName, taskId) {
  try {
    await deleteDoc(doc(db, collectionName, taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

/**
 * Add a new task to a collection
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} title - Task title
 * @returns {Promise<string>} Document ID of the new task
 */
export async function addTask(collectionName, title) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      title,
      done: false,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

/**
 * Add a new calorie entry
 * @param {string} mealName - Name of the meal
 * @param {number} calories - Calorie amount
 * @returns {Promise<string>} Document ID of the new entry
 */
export async function addCalorieEntry(mealName, calories) {
  try {
    const docRef = await addDoc(collection(db, "calorie_entries"), {
      mealName,
      calories: Number(calories),
      timestamp: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding calorie entry:", error);
    throw error;
  }
}

/**
 * Subscribe to all calorie entries in real-time
 * @param {Function} callback - Function to call when entries change
 * @returns {Function} Unsubscribe function
 */
export function listenToCalorieEntries(callback) {
  const q = query(collection(db, "calorie_entries"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(entries);
    },
    (error) => {
      console.error("Error listening to calorie entries:", error);
    },
  );

  return unsubscribe;
}

/**
 * Delete a calorie entry
 * @param {string} entryId - ID of the calorie entry document
 */
export async function deleteCalorieEntry(entryId) {
  try {
    await deleteDoc(doc(db, "calorie_entries", entryId));
  } catch (error) {
    console.error("Error deleting calorie entry:", error);
    throw error;
  }
}

export async function editCalorieEntry(entryId, calories) {
  try {
    const entryRef = doc(db, "calorie_entries", entryId);
    await updateDoc(entryRef, { calories }); // Example edit, replace with actual logic
  } catch (error) {
    console.error("Error editing calorie entry:", error);
    throw error;
  }
}
