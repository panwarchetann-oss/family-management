import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔥 Firebase Config (same jo script.js me hai) */
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

/* 🔐 Login check */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const phone = user.phoneNumber;
  const userRef = doc(db, "users", phone);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    alert("User not found");
    return;
  }

  const data = snap.data();
  document.getElementById("welcome").innerText = "Welcome " + data.name;

  if (data.role === "admin") {
    document.getElementById("adminPanel").style.display = "block";
  }
});

/* ➕ Add family member */
document.getElementById("saveMember").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const bloodGroup = document.getElementById("bloodGroup").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !phone) {
    alert("Name & phone required");
    return;
  }

  try {
    await setDoc(doc(db, "users", phone), {
      name,
      phone,
      dob,
      bloodGroup,
      role,
      createdAt: serverTimestamp()
    });

    alert("Family member added successfully ✅");

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("bloodGroup").value = "";

  } catch (err) {
    alert("Error: " + err.message);
  }
});
