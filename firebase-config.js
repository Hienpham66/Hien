// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDJwRe9zskEYElHzIF8YWFvIaB-6smpEKU",
  authDomain: "chatapp-d03c0.firebaseapp.com",
  projectId: "chatapp-d03c0",
  storageBucket: "chatapp-d03c0.appspot.com",
  messagingSenderId: "745755141877",
  appId: "1:745755141877:web:2a583a287ccc94a48c07bc",
  measurementId: "G-CN8G3L780P",
  databaseURL: "https://chatapp-d03c0-default-rtdb.firebaseio.com/" // URL Firebase Realtime Database
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy tham chiếu đến Firebase Realtime Database
const db = getDatabase(app);

export { db };
