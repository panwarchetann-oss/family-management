import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Firebase config (same jo script.js me hai)
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.appspot.com",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Auth check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const phone = user.phoneNumber;
  const userRef = doc(db, "users", phone);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    document.getElementById("welcome").innerText = "User not found";
    return;
  }

  const data = snap.data();
  document.getElementById("welcome").innerText =
    `Welcome ${data.role === "admin" ? "Admin" : "Member"}`;

  if (data.role === "admin") {
    document.getElementById("adminPanel").style.display = "block";
  }
});

// 🔹 Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// 🔹 Add family member
document.getElementById("saveMember").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;
  const blood = document.getElementById("blood").value;

  if (!name || !phone) {
    alert("Name & phone required");
    return;
  }

  await setDoc(doc(db, "users", phone), {
    name,
    phone,
    dob,
    bloodGroup: blood,
    role: "member",
    createdAt: serverTimestamp()
  });

  alert("Family member added ✅");

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("blood").value = "";
});

