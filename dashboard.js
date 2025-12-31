import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔹 SAME firebaseConfig jo index/script.js me hai */
const firebaseConfig = {
  apiKey: "AIzaSy....",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.appspot.com",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

/* ✅ STEP 1: initialize app FIRST */
const app = initializeApp(firebaseConfig);

/* ✅ STEP 2: then auth & db */
const auth = getAuth(app);
const db = getFirestore(app);

/* UI elements */
const loading = document.getElementById("loading");
const adminPanel = document.getElementById("adminPanel");
const memberPanel = document.getElementById("memberPanel");

/* ✅ STEP 3: auth check */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  try {
    const phone = user.phoneNumber;
    const snap = await getDoc(doc(db, "users", phone));

    loading.style.display = "none";

    if (snap.exists() && snap.data().role === "admin") {
      adminPanel.style.display = "block";
    } else {
      memberPanel.style.display = "block";
    }

  } catch (err) {
    loading.innerText = "Error loading data";
    console.error(err);
  }
});

