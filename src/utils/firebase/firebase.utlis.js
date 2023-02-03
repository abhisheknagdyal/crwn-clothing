import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider ,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import {
    getFirestore,
    doc,  // retrive document inside the data base
    getDoc,  //get document data 
    setDoc, //set doucment data
    collection,
    writeBatch,
    query, 
    getDocs,
} from "firebase/firestore";


// Google authantication
const firebaseConfig = {
    apiKey: "AIzaSyAVXmeu1AhgITyyJnsXYDpHv0wLrv9PcdE",
    authDomain: "crwn-clothing-db-1db8c.firebaseapp.com",
    projectId: "crwn-clothing-db-1db8c",
    storageBucket: "crwn-clothing-db-1db8c.appspot.com",
    messagingSenderId: "861263679024",
    appId: "1:861263679024:web:38f2f5250539ab35ea67f5"
};
  

// const firebaseApp = 
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>{
//     signInWithRedirect(auth, googleProvider);
// }


// setting up database for users
export const db = getFirestore();


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const  collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log("done");
};

export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db ,"categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})

    return categoryMap;
}

export const createUserDoumentFromAuth = async (userAuth) => {
    if(!userAuth) return; 

    const userDocRef = doc( db, "users", userAuth.uid );

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());


    // setting the data in data base if user(snapshot) doesnot exist
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
                // ...addtionalInformation,
            });
        } catch(error){
            console.log("error creating user, " , error.message);
        }
    };

    return userDocRef;

}

// sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const  signOutUser = async( ) => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>{
    onAuthStateChanged(
        auth, 
        callback, 
        // errorCallback, 
        // completeCallback 
        );
}