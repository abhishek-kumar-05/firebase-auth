const login_form = document.querySelector(".signInSetup");
const login_button = document.getElementById("signUp");
const googleSignIn = document.getElementById("googleSignIn");
const userProfile = document.getElementById("user-profile");
const signOutSetup = document.querySelector(".google-signOut");
const userButton = document.getElementById("profileButton");

// opening login form
login_button.addEventListener("click", () => {
  login_form.style.display = "block";
});

// closing login form
document.querySelector(".close-button").addEventListener("click", () => {
  login_form.style.display = "none";
});

// creating instance creator function to get current user info
function userInstance(photo, name, email) {
  this.photoURL = photo;
  this.displayName = name;
  this.email = email;
}
// declaring current user variable
let currUser;

// firebase work started
// firebase wep app configuration
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
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// intializing the web app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// when user hit the sign button
const userSignIn = () => {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

/*signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });*/

// creating auth change function  if user is signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.photoURL == null) {
      user.photoURL = "./assets/emptyuser.jpeg";
    }
    // setting timer so the it load properly
    setTimeout(() => {
      currUser = new userInstance(user.photoURL, user.displayName, user.email);
    }, 1000);
    login_form.style.display = login_button.style.display = "none";
    userProfile.style.display = "block";
    userProfile.src = user.photoURL;
  } else {
    userProfile.style.display = "none";
  }
});

// checking is signout setup is created
let checkSetupCreated = false;

//creating google signOut functionality
const userSignOut = () => {
  signOut(auth)
    .then(() => {
      signOutSetup.style.display = "none";
      login_button.style.display = "block";
      // on signout setting checkSetupCreated to false so that on next when click it can open new setup
      checkSetupCreated = false;
    })
    .catch((error) => {});
};
// function to set user profile
async function setCurrUserPhoto() {
  if (currUser.photoURL == null) {
    currUser.photoURL = "./assets/emptyuser.jpeg";
  } else {
    return;
  }
}
// creating sign out setup
function SignOutSetUp() {
  // removing previous signOutSetup card
  signOutSetup.innerHTML = ``;
  // creating new signOutSetup card
  signOutSetup.style.display = "block";
  // setting current user profile if its not loaded
  setCurrUserPhoto();
  // checking if setup already existed or not and currUser also
  if (!checkSetupCreated && currUser) {
    const container = document.createElement("div");
    container.classList.add("sign-out");
    container.innerHTML = `
    <section id="signout-user-info">
      <div class="d-right">
        <button id="close-signout" class="close-button">
          <i class="x-mark fa-solid fa-x"></i>
        </button>
      </div>  
      <p id="email-text" class="userTextContent center">${currUser.email}</p>

      <div>
        <div class="center">
          <img class="center" src="${currUser.photoURL}" alt="user photo" />
        </div>
        <p id="email-text" class="userTextContent center">Hi, ${currUser.displayName}</p>
      </div>
    </section>
    <hr>
    <div class="center">
      <button id="userSignOutButton" class="button center">SignOut</button>
    </div>`;
    signOutSetup.appendChild(container);
    checkSetupCreated = true;
    const googleSignOut = document.getElementById("userSignOutButton");
    googleSignOut.addEventListener("click", userSignOut);

    // adding eventlistner to close button
    document.getElementById("close-signout").addEventListener("click", () => {
      signOutSetup.style.display = "none";
      // on clicking close-button setting checkSetupCreated to false so that on next when click it can open new setup
      checkSetupCreated = false;
    });
  } else {
    console.log("signSetup not working");
  }
}

// all eventlistener statement
// signin eventlistener
googleSignIn.addEventListener("click", userSignIn);
// signout eventlistener
/*creating toogle button so after signoutsetup is created and the user clicked on user button again
then the signoutsetup should close and open new setup when click again*/
userButton.addEventListener("click", () => {
  if (!checkSetupCreated) {
    SignOutSetUp();
  } else {
    signOutSetup.style.display = "none";
    // on closing setting checkSetupCreated to false so that on next when click it can open new setup
    checkSetupCreated = false;
  }
});
