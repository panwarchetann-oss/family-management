import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX",
  projectId: "XXXX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loading = document.getElementById("loading");
const adminPanel = document.getElementById("adminPanel");
const memberPanel = document.getElementById("memberPanel");

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
