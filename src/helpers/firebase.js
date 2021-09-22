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

import { 
        getFirestore,
        collection,
        addDoc,
        getDocs
      } from "firebase/firestore";

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
        alert("Çıkış yapıldı!")
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}



// firestore

const db = getFirestore();



export const addData = async(currentUser,title,content,image) => {

  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      author: currentUser.email,
      title: title,
      content: content,
      get_comment_count: 0,
      get_like_count: 0,
      image: image,
      published_date: Date.now()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

// Add a second document with a generated ID.

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }



export const readData = async() => {

  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    console.log(doc);
    console.log(`${doc.id} => ${doc.data()}`);
});

}