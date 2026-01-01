import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.firebasestorage.app",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 UI Elements
const welcome = document.getElementById("welcome");
const adminPanel = document.getElementById("adminPanel");
const addMemberBtn = document.getElementById("addMemberBtn");
const memberForm = document.getElementById("memberForm");
const saveMember = document.getElementById("saveMember");

// 🔹 Auth Check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const role = snap.data().role;
    welcome.innerText = "Welcome " + role;

    if (role === "admin") {
      adminPanel.style.display = "block";
    }
  }
});

// 🔹 Show form
addMemberBtn.onclick = () => {
  memberForm.style.display =
    memberForm.style.display === "none" ? "block" : "none";
};

// 🔹 Save member
saveMember.onclick = async () => {
  const name = document.getElementById("memberName").value;
  const phone = document.getElementById("memberPhone").value;

  if (!name || !phone) {
    alert("Fill all details");
    return;
  }

  await setDoc(doc(db, "familyMembers", phone), {
    name,
    phone,
    role: "member"
  });

  alert("Member added successfully");
  memberForm.style.display = "none";
};
