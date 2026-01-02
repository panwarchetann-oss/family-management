import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const welcome = document.getElementById("welcome");
const adminPanel = document.getElementById("adminPanel");
const addMemberBtn = document.getElementById("addMemberBtn");
const addMemberForm = document.getElementById("addMemberForm");
const saveMember = document.getElementById("saveMember");

// Auth check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    welcome.innerText = "User not found";
    return;
  }

  const data = snap.data();
  welcome.innerText = "Welcome " + data.role;

  if (data.role === "admin") {
    adminPanel.style.display = "block";
  }
});

// 👉 BUTTON CLICK FIX
addMemberBtn.addEventListener("click", () => {
  addMemberForm.style.display = "block";
});

// Save member
saveMember.addEventListener("click", async () => {
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
  addMemberForm.style.display = "none";
});
