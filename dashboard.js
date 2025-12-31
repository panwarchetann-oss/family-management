import { 
  getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore();

const form = document.getElementById("addMemberForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = memberName.value.trim();
    const phone = memberPhone.value.trim();
    const dob = memberDOB.value.trim();
    const blood = memberBlood.value.trim();

    if (!name || !phone) {
      alert("Name & Phone required");
      return;
    }

    try {
      await addDoc(collection(db, "familyMembers"), {
        name: name,
        phone: phone,
        dob: dob,
        bloodGroup: blood,
        addedBy: localStorage.getItem("userPhone"),
        createdAt: new Date()
      });

      alert("✅ Family Member Added Successfully");
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  });
}

