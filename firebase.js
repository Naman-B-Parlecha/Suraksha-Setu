// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlMgjuNZFTQjLgCm6gOBQPTjQa09dWGPo",
  authDomain: "codefury-9007d.firebaseapp.com",
  projectId: "codefury-9007d",
  storageBucket: "codefury-9007d.appspot.com",
  messagingSenderId: "860992417780",
  appId: "1:860992417780:web:22c42887370ae0581513a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
