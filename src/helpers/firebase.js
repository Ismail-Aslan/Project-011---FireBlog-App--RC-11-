// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
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
  deleteDoc,
  setDoc,
  get
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
      displayName: name, photoURL: "https://picsum.photos/200/300"
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
      author: currentUser.displayName,
      title: title,
      content: content,
      comment_count:0,
      likes: [],
      image: image,
      publish_date: new Date().toISOString(),
      // publish_date: new Date().toLocaleString(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const readBlogs = async (setData,setPending) => {
  const blogsColl = await getDocs(collection(db, "blogs"));
  setData(blogsColl.docs);
  setPending(false);
};
export const updateBlog = async(id,title,image,content) => {
  await updateDoc(doc(db, "blogs", id), {
    title: title,
    image: image,
    content:content
  });
}

export const updateLike = async (id,newLikes) => {
  const likeRef = doc(db, "blogs", id);
  await updateDoc(likeRef, {
    likes: newLikes
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



export const readDetails = async (setData,setLikeCount,id) => { 
  const detailsData = await getDoc(doc(db, "blogs",id));
  await setData(detailsData.data())
  setLikeCount(detailsData.data().likes?.length)
};

export const readComments = async (setComments,id) => {
  const detailsComments = await getDocs(collection(db, "blogs",id,"comments"));
  // console.log(detailsComments.docs);
  // console.log(detailsComments.size);
  setComments(detailsComments.docs)
}










export const deleteBlog = async(id)=>{
  // yorumların tamamını getiriyoruz
  const detailsComments = await getDocs(collection(db, "blogs",id,"comments"));
  // getirdiğimiz yorumları map ederek sırayla siliyoruz
  detailsComments.docs.map(async(el)=>await deleteDoc(doc(db, "blogs", id,"comments",el.id)))
  // daha sonrada yazıyı siliyoruz
  await deleteDoc(doc(db, "blogs", id));
}