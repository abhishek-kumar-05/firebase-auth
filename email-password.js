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
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// intializing the web app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// creating a user email account with password
const emailPassSignUp = (email, password) => {
  // calling firebase createUserWithEmailAndPassword function
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
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
      console.log(user);
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

// function changingSignState() {
//   // changing id of form-signup-button to form-signin-button
//   document.getElementById("form-signup-button").id = "form-signin-button";
//   // changing textContent of form-signing-button from SignUp to LogIn
//   document.getElementById("form-signin-button").textContent = "LogIn";
//   // changing the form-sigin-button type from submit to click
//   document.getElementById("form-signin-button").type = "click";
//   // changing textContent of element with id message
//   document.getElementById("message").textContent =
//     "If you want to create a account click";
//   accountSignIn.innerHTML = "<u>SignUp</u>";
//   // changing id loging in to create-account
//   accountSignIn.id = "create-account";
// }

function enableLoginFunction() {
  const signUpState = document.getElementById("form-signup-button");
  if (signUpState) {
    signUpState.remove();
  }
  const changeStatebutton = document.createElement("button");
  changeStatebutton.classList.add("button");
  changeStatebutton.id = "form-signin-button";
  changeStatebutton.textContent = "LogIn";
  buttonContainer.appendChild(changeStatebutton);
  // changing textContent of element with id message
  document.getElementById("message").textContent =
    "If you want to create a account click";
  accountSignIn.innerHTML = "<u>SignUp</u>";
}
function enableSignUpFunction() {
  const signInState = document.getElementById("form-signin-button");
  if (signInState) {
    signInState.remove();
  }
  const changeStatebutton = document.createElement("button");
  changeStatebutton.classList.add("button");
  changeStatebutton.id = "form-signup-button";
  changeStatebutton.textContent = "SignUp";
  changeStatebutton.type = "submit";
  buttonContainer.appendChild(changeStatebutton);
  // changing textContent of element with id message
  document.getElementById("message").textContent =
    "If you aready having a account click";
  accountSignIn.innerHTML = "<u>LogIn</u>";
}

// initiating the eventlistener to for signup
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  emailPassSignUp(emailValue, passwordValue);
  form.reset();
});

// as the accountSignIn but click then it call the changingSignState function to change the textcontent and id of some element
let loginState = false;
accountSignIn.addEventListener("click", () => {
  loginState = !loginState;
  if (loginState) {
    enableLoginFunction();
  } else {
    enableSignUpFunction();
  }
});

// initiating the eventlistener to for signin
form.addEventListener("click", (e) => {
  if (e.target.id === "form-signin-button") {
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    emailPassSignIn(emailValue, passwordValue);
    form.reset();
    e.preventDefault();
  }
});
