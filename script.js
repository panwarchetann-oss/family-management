import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtPPp9ImgOI8n4Zxi07aBConpZi4823bU",
  authDomain: "family-management-bd626.firebaseapp.com",
  projectId: "family-management-bd626",
  storageBucket: "family-management-bd626.firebasestorage.app",
  messagingSenderId: "783709611700",
  appId: "1:783709611700:web:e3d1f267f6ab568b5d59e1",
  measurementId: "G-HXQCLRQ9PZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.recaptchaVerifier = new RecaptchaVerifier(
  'recaptcha-container',
  { size: 'normal' },
  auth
);

let confirmationResult;

window.sendOTP = function () {
  const phone = "+91" + document.getElementById("phone").value;
  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent");
    })
    .catch((error) => {
      alert(error. message);
    });
}

window.verifyOTP = function () {
  const otp = document.getElementById("otp").value;
  confirmationResult.confirm(otp)
  .then(async () => {
      alert("Login success");
    
      const phone = document.getElementById("phone").value;
      await setDoc(doc(db, "users", phone), {
        phone: phone,
        dob: "",
        bloodGroup: "",
        name: ""
      });

    })
    .catch(() => {
      alert("Wrong OTP");
    });
}
