import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX93N6oAbvNWbYQmapAnj7ancLtivN74U",
  authDomain: "the-wizard-of-incentive.firebaseapp.com",
  projectId: "the-wizard-of-incentive",
  storageBucket: "the-wizard-of-incentive.firebasestorage.app",
  messagingSenderId: "665067968647",
  appId: "1:665067968647:web:58fee353540afa652f4022",
  measurementId: "G-DBJVHL6WXW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const experimentsCollection = collection(db, "experiments");

export { db, experimentsCollection };