// 🔹 Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Admin phone number (APNA NUMBER DAALO)
const ADMIN_PHONE = "+919876543210"; // example

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.firebasestorage.app",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1",
  measurementId: "G-HXQCLRQ9PZ"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Setup Recaptcha
window.setupRecaptcha = function () {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" },
    auth
  );
};

// 🔹 Send OTP
window.sendOTP = function () {
  const phone = document.getElementById("phone").value;
  setupRecaptcha();

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent");
    })
    .catch((error) => {
      alert(error.message);
    });
};

// 🔹 Verify OTP + Save user + Redirect
window.verifyOTP = async function () {
  const otp = document.getElementById("otp").value;

  try {
    // OTP verify
    await window.confirmationResult.confirm(otp);
    alert("Login success");

    const phone = document.getElementById("phone").value;
    const role = phone === ADMIN_PHONE ? "admin" : "member";

    // Save user in Firestore
    await setDoc(
      doc(db, "users", phone),
      {
        phone: phone,
        role: role,
        name: "",
        dob: "",
        bloodGroup: ""
      },
      { merge: true }
    );

    // 🔁 Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    alert(error.message);
  }
};

