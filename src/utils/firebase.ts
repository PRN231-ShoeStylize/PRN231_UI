// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxvx68ZvfgxhY587ePA1Xq4-cuGCejONE",
  authDomain: "cuteness-e5586.firebaseapp.com",
  projectId: "cuteness-e5586",
  storageBucket: "cuteness-e5586.appspot.com",
  messagingSenderId: "456957250215",
  appId: "1:456957250215:web:e8bfd4d7dceab9fac42982",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (image: any) => {
  const imageRef = ref(storage, `images/${image.name + v4()}`);

  return await uploadBytes(imageRef, image)
    .then((value) => {
      return getDowloadUrlByRef(value?.ref);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDowloadUrlByRef = async (ref: any) => {
  try {
    const res = await getDownloadURL(ref);
    return res;
  } catch (error) {
    console.log(error);
  }
};
