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
  await setData(detailsData.data())
 
};

export const readComments = async (setComments,id) => {
  const detailsComments = await getDocs(collection(db, "blogs",id,"comments"));
  // console.log(detailsComments.docs);
  // console.log(detailsComments.size);
  setComments(detailsComments.docs)
}










export const deleteBlog = async(id)=>{
  // deleteCollection(db, collection(db,"blogs",id,"comments"), 3);

  // async function deleteCollection(db, collectionPath, batchSize) {
  //   const collectionRef = collection(collectionPath);
  //   const query = collectionRef.orderBy('__name__').limit(batchSize);
  
  //   return new Promise((resolve, reject) => {
  //     deleteQueryBatch(db, query, resolve).catch(reject);
  //   });
  // }
  
  // async function deleteQueryBatch(db, query, resolve) {
  //   const snapshot = await query.get();
  
  //   const batchSize = snapshot.size;
  //   if (batchSize === 0) {
  //     // When there are no documents left, we are done
  //     resolve();
  //     return;
  //   }
  
  //   // Delete documents in a batch
  //   const batch = batch();
  //   snapshot.docs.forEach((doc) => {
  //     batch.delete(doc.ref);
  //   });
  //   await batch.commit();
  
  //   // Recurse on the next process tick, to avoid
  //   // exploding the stack.
  //   process.nextTick(() => {
  //     deleteQueryBatch(db, query, resolve);
  //   });
  // }





}