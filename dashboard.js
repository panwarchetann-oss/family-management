import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Firebase config (same as script.js)
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.firebasestorage.app",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1",
  measurementId: "G-HXQCLRQ9PZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const phone = user.phoneNumber;
  const snap = await getDoc(doc(db, "users", phone));

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("welcome").innerText =
    `Welcome ${data.role.toUpperCase()}`;

  if (data.role === "admin") {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("memberPanel").style.display = "block";
  }
});
