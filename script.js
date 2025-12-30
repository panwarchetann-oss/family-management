import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// 🔴 YAHAN firebaseConfig paste hoga (next step)
const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
      alert(error.message);
    });
}

window.verifyOTP = function () {
  const otp = document.getElementById("otp").value;
  confirmationResult.confirm(otp)
    .then(() => {
      alert("Login success");
    })
    .catch(() => {
      alert("Wrong OTP");
    });
}
