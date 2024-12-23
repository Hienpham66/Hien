// Import các hàm cần thiết từ SDK Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Cấu hình Firebase của bạn (Lấy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDJwRe9zskEYElHzIF8YWFvIaB-6smpEKU",  // Thay thế bằng apiKey của bạn
  authDomain: "chatapp-d03c0.firebaseapp.com",        // Thay thế bằng authDomain của bạn
  projectId: "chatapp-d03c0",                         // Thay thế bằng projectId của bạn
  storageBucket: "chatapp-d03c0.appspot.com",         // Thay thế bằng storageBucket của bạn
  messagingSenderId: "745755141877",                  // Thay thế bằng messagingSenderId của bạn
  appId: "1:745755141877:web:2a583a287ccc94a48c07bc", // Thay thế bằng appId của bạn
  measurementId: "G-CN8G3L780P"                       // Thay thế bằng measurementId của bạn
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy tham chiếu đến Firebase Realtime Database
const db = getDatabase(app);

export { db };
