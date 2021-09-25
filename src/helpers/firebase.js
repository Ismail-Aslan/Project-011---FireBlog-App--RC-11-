// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  increment,
  setDoc
} from "firebase/firestore";

import {firebaseConfig} from "../FirebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUser = async(email, password,name) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
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

    updateProfile(auth.currentUser, {
      displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      console.log("ok");
    }).catch((error) => {
      console.log(error);
    });
};

export const logIn = async(email, password) => {
  const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...

      
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/user-not-found") {
        alert("Please sign up to continue!");
      }
      if (errorCode == "auth/wrong-password") {
        alert("Invalid password!");
      }
    });
    
     
};

export const continueWithGoogle = () => {
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
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const userObserver = (setCurrentUser, setPending) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setCurrentUser(user);
      setPending(false);
    } else {
      // User is signed out
      setCurrentUser(null);
      setPending(false);
      // ...
    }
  });
};

export const logOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      alert("Çıkış yapıldı!");
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

// firestore

const db = getFirestore();

export const addData = async (currentUser, title, content, image) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      author: currentUser.email,
      title: title,
      content: content,
      comment_count:0,
      get_like_count: 0,
      image: image,
      published_date: new Date().toISOString(),
      // published_date: new Date().toLocaleString(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const readBlogs = async (setData,setPending) => {
  const blogsColl = await getDocs(collection(db, "blogs"));
 
  // querySnapshot.docs.map(async(el) => {
  //   const x = await getDocs(collection(db, "blogs",el.id,"comments"));

  //   x.docs.map(el => console.log(el.data()))
  //   console.log(x.docs.length);
  // })

  setData(blogsColl.docs);
  setPending(false);
  // console.log(blogsColl.docs[0]);
  // console.log(blogsColl.size);
  

};

export const updateLike = async (id,user) => {
  const likeRef = doc(db, "blogs", id);
  await updateDoc(likeRef, {
    get_like_count: increment(1),
  });
};
export const updateComment = async (id,userComment,user) => {
  const commentsRef = collection(db, "blogs", id , "comments");
  const commemt_countRef = doc(db, "blogs", id );
  await updateDoc(commemt_countRef, {
      comment_count:increment(1)
    });
  await addDoc(commentsRef, {
      
      userComment:userComment,
      author:user
       
    });
    
  
};



export const readDetails = async (setData,id) => {
  
  const detailsData = await getDoc(doc(db, "blogs",id));

  console.log(detailsData.data());
  setData(detailsData.data())
 
};