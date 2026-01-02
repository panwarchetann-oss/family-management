import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const phone = user.phoneNumber;
  const docRef = doc(db, "users", phone);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    document.getElementById("welcome").innerText = "User not found";
    return;
  }

  const data = docSnap.data();

  document.getElementById("welcome").innerText =
    data.role === "admin" ? "Welcome Admin" : "Welcome Member";

  document.getElementById("name").innerText = "Name: " + (data.name || "-");
  document.getElementById("phone").innerText = "Phone: " + data.phone;
  document.getElementById("dob").innerText = "DOB: " + (data.dob || "-");
  document.getElementById("blood").innerText = "Blood Group: " + (data.bloodGroup || "-");

  if (data.role === "admin") {
    document.getElementById("adminPanel").style.display = "block";
  }
});

/* Logout */
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

