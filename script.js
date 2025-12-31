import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔹 Firebase Config (APNA HI REHNA CHAHIYE) */
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.appspot.com",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1"
};

/* 🔹 ADMIN NUMBER (EXACT FORMAT) */
const ADMIN_PHONE = "+916265235974";

/* ✅ Initialize Firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ✅ VERY IMPORTANT: Auth Persistence */
setPersistence(auth, browserLocalPersistence);

/* UI elements */
const phoneInput = document.getElementById("phone");
const otpInput = document.getElementById("otp");
const sendOtpBtn = document.getElementById("sendOtp");
const verifyOtpBtn = document.getElementById("verifyOtp");

/* 🔹 Setup Recaptcha */
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  { size: "invisible" },
  auth
);

/* 🔹 SEND OTP */
sendOtpBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();

  if (!phone.startsWith("+")) {
    alert("+916265235974");
    return;
  }

  try {
    window.confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );
    alert("OTP sent successfully");
  } catch (error) {
    alert(error.message);
  }
});

/* 🔹 VERIFY OTP */
verifyOtpBtn.addEventListener("click", async () => {
  const otp = otpInput.value.trim();

  if (!otp) {
    alert("OTP daalo");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;

    const phone = user.phoneNumber;
    const role = phone === ADMIN_PHONE ? "admin" : "member";

    /* 🔹 Save / Update user in Firestore */
    await setDoc(
      doc(db, "users", phone),
      {
        phone: phone,
        role: role,
        lastLogin: new Date()
      },
      { merge: true }
    );

    /* 🔹 Local storage (dashboard use karega) */
    localStorage.setItem("userPhone", phone);

    alert("Login successful");

    /* ✅ FINAL REDIRECT */
    window.location.href = "dashboard.html";

  } catch (error) {
    alert("Invalid OTP");
  }
});
