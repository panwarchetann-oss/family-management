import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔹 SAME firebaseConfig jo script.js me hai */
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.appspot.com",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

/* 🔹 INITIALIZE AGAIN (YEHI MISSING THA) */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const welcome = document.getElementById("welcome");
const adminPanel = document.getElementById("adminPanel");
const addBtn = document.getElementById("addMember");

/* 🔹 CHECK LOGIN STATUS */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  /* 🔹 GET ROLE FROM FIRESTORE */
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    welcome.innerText = "User data not found";
    return;
  }

  const data = snap.data();

  welcome.innerText = `Welcome ${data.role}`;

  if (data.role === "admin") {
    adminPanel.style.display = "block";
  }
});

/* 🔹 BUTTON CLICK */
addBtn.addEventListener("click", () => {
  alert("Next step: Add Family Member form yaha banega");
});
