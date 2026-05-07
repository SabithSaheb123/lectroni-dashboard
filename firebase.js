// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "lectroni-dashboard.firebaseapp.com",
  projectId: "lectroni-dashboard",
  storageBucket: "lectroni-dashboard.appspot.com",
  messagingSenderId: "683606587025",
  appId: "1:683606587025:web:88a644009f35af150f1b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DOC_ID = "main-dashboard";

export async function saveDashboardData(data) {
  await setDoc(doc(db, "dashboard", DOC_ID), data);
}

export async function getDashboardData() {
  const snap = await getDoc(doc(db, "dashboard", DOC_ID));

  if (snap.exists()) {
    return snap.data();
  }

  return null;
}

export function listenDashboardRealtime(callback) {
  return onSnapshot(doc(db, "dashboard", DOC_ID), (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
}
