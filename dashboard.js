// 1️⃣ Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 2️⃣ Firebase config (SAME jo script.js me hai)
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.appspot.com",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

// 3️⃣ Initialize Firebase (MOST IMPORTANT)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 4️⃣ HTML elements
const welcome = document.getElementById("welcome");
const adminPanel = document.getElementById("adminPanel");

// 5️⃣ LOGIN CHECK (YE SAB FIX KAREGA)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ User logged in
    welcome.innerText = "Welcome " + user.phoneNumber;
    adminPanel.style.display = "block";
  } else {
    // ❌ Login nahi hai → wapas login bhejo
    window.location.href = "index.html";
  }
});
