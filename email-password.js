const form = document.querySelector(".sign-in");
const formButton = document.getElementById("form-button");

// there some function like onSuthStatechange ,signOutSetup,signOut, in google-auth.js
// there are also working in this file
// so when you use both file different then make sure to include these function

const firebaseConfig = {
  apiKey: "AIzaSyBawX2CGp0l-1sVyh5Iuc2vWxiVMB0EY1c",
  authDomain: "authenticate-login-form.firebaseapp.com",
  projectId: "authenticate-login-form",
  storageBucket: "authenticate-login-form.appspot.com",
  messagingSenderId: "1092688882740",
  appId: "1:1092688882740:web:e384c1cafbb0c28a24ee61",
};
// importing modules for google auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// intializing the web app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailPassSignIn = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "===", errorMessage);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  emailPassSignIn(emailValue, passwordValue);
});
