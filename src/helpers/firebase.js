// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
        getAuth, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        signInWithPopup, 
        GoogleAuthProvider,
        onAuthStateChanged,
        signOut 
      } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCitGM7yejBryXfUOV3TJCTaDdtQFXaLuE",
  authDomain: "fireblog-app-5b03a.firebaseapp.com",
  projectId: "fireblog-app-5b03a",
  storageBucket: "fireblog-app-5b03a.appspot.com",
  messagingSenderId: "692139903443",
  appId: "1:692139903443:web:79b670e5e4544005f54726",
  measurementId: "G-CFVF36P37S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUser = ( email, password)=> {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export const logIn = ( email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    console.log("--------------------------------------------");

    if (errorCode=="auth/user-not-found"){
      alert("Please sign up to continue!")
    }
    if (errorCode=="auth/wrong-password"){
      alert("Invalid password!")
    }
  });
}

export const continueWithGoogle = ()=> {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}


export const userObserver = (setCurrentUser,setPending)=> {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      
        const uid = user.uid;
        setCurrentUser(user);
        setPending(false)
       
      } else {
        // User is signed out
        setCurrentUser(null)
        setPending(false)
        // ...
      }
    });

}


export const logOut =()=>{

      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}