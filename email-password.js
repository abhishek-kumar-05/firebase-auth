const form = document.querySelector(".sign-in");
// const formButton = document.getElementById("form-button");
const accountSignIn = document.getElementById("logging-in");
const authError = document.querySelector(".error-message");
const buttonContainer = document.getElementById("change-state");

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
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// intializing the web app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// creating a user email account with password
const emailPassSignUp = (name, email, password) => {
  // calling firebase createUserWithEmailAndPassword function
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Update user's display name
      return updateProfile(user, {
        displayName: name,
        photoURL: "./assets/emptyuser.jpeg",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // checking if the the account is already created and the displaying messsage for three second
      if (errorCode === "auth/email-already-in-use") {
        authError.style.display = "block";
        authError.textContent =
          "You already created account with this email and password";
        setTimeout(() => {
          authError.style.display = "none";
        }, 3000);
      }
    });
};
// signing in a user whose user email and password are created
const emailPassSignIn = (email, password) => {
  // calling firebase signInWithEmailAndPassword function
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      enableSignUpFunction();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // checking if the user is adding new account and displaying message for three second
      if (errorCode === "auth/invalid-login-credentials") {
        authError.style.display = "block";
        authError.textContent =
          "No account was found with this email and password";
        setTimeout(() => {
          authError.style.display = "none";
        }, 3000);
      }
    });
};

// function creating login setup
function enableLoginFunction() {
  const signUpState = document.getElementById("form-signup-button");
  // removing old signup setup
  if (signUpState) {
    signUpState.remove();
    document.getElementById("nameholder").style.display = "none";
  }
  // checking if previous signin button is there
  if (!document.getElementById("form-signin-button")) {
    // creating a button element, setting new class,id,textContent and appending to parent element
    const changeStatebutton = document.createElement("button");
    changeStatebutton.classList.add("button");
    changeStatebutton.id = "form-signin-button";
    changeStatebutton.textContent = "LogIn";
    buttonContainer.appendChild(changeStatebutton);
  }
  // changing textContent of element with id message
  document.getElementById("message").textContent =
    "If you want to create a account click";
  accountSignIn.innerHTML = "<u>SignUp</u>";
}
// function creating signUp setup
function enableSignUpFunction() {
  const signInState = document.getElementById("form-signin-button");
  // removing old login state
  if (signInState) {
    signInState.remove();
    document.getElementById("nameholder").style.display = "block";
  }
  // checking if previous signup button is there
  if (!document.getElementById("form-signup-button")) {
    // creating a button element, setting new class,id,textContent and appending to parent element
    const changeStatebutton = document.createElement("button");
    changeStatebutton.classList.add("button");
    changeStatebutton.id = "form-signup-button";
    changeStatebutton.textContent = "SignUp";
    changeStatebutton.type = "submit";
    buttonContainer.appendChild(changeStatebutton);
  }
  // changing textContent of element with id message
  document.getElementById("message").textContent =
    "If you aready having a account click";
  accountSignIn.innerHTML = "<u>LogIn</u>";
}

// initiating the eventlistener to for signup
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  emailPassSignUp(nameValue, emailValue, passwordValue);
  // resetting form after submission
  form.reset();
});

// creating a toggle button to change the loginState
let loginState = false;
accountSignIn.addEventListener("click", () => {
  loginState = !loginState;
  if (loginState) {
    // calling function to set login setup
    enableLoginFunction();
  } else {
    // calling function to set signUp setup
    enableSignUpFunction();
  }
});

// initiating the eventlistener to for signin
form.addEventListener("click", (e) => {
  if (e.target.id === "form-signin-button") {
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    emailPassSignIn(emailValue, passwordValue);
    // reseting form after submission
    form.reset();
    e.preventDefault();
  }
});
