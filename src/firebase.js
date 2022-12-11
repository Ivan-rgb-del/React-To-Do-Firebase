import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu_DR_6y8FKA0uH-wNQMQ273qb1FI9HTQ",
  authDomain: "todo-app-fire-1d57d.firebaseapp.com",
  projectId: "todo-app-fire-1d57d",
  storageBucket: "todo-app-fire-1d57d.appspot.com",
  messagingSenderId: "318787387278",
  appId: "1:318787387278:web:0e73a0a488775c7b856edf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);