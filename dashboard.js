import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.appspot.com",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

/* Init Firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* Elements */
const welcome = document.getElementById("welcome");
const adminPanel = document.getElementById("adminPanel");
const addBtn = document.getElementById("addMemberBtn");
const form = document.getElementById("memberForm");
const saveBtn = document.getElementById("saveMember");

/* Auth check */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const phone = user.phoneNumber;
  const ref = doc(db, "users", phone);
  const snap = await getDoc(ref);

  let role = "member";
  if (snap.exists()) role = snap.data().role;

  welcome.innerText = `Welcome ${role}`;

  if (role === "admin") {
    adminPanel.style.display = "block";
  }
});

/* Show / Hide form */
addBtn.addEventListener("click", () => {
  form.style.display = form.style.display === "none" ? "block" : "none";
});

/* Save member */
saveBtn.addEventListener("click", async () => {
  const name = document.getElementById("mName").value.trim();
  const phone = document.getElementById("mPhone").value.trim();
  const dob = document.getElementById("mDob").value;
  const blood = document.getElementById("mBlood").value.trim();

  if (!name || !phone) {
    alert("Name aur Phone zaruri hai");
    return;
  }

  try {
    await setDoc(doc(db, "users", phone), {
      name,
      phone,
      dob,
      bloodGroup: blood,
      role: "member",
      createdAt: new Date()
    });

    alert("Family member added successfully ✅");

    // clear form
    document.getElementById("mName").value = "";
    document.getElementById("mPhone").value = "";
    document.getElementById("mDob").value = "";
    document.getElementById("mBlood").value = "";
    form.style.display = "none";

  } catch (e) {
    alert("Error saving member");
    console.error(e);
  }
});
