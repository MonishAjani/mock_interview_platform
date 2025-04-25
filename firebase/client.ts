
import { initializeApp, getApp,getApps } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_QJOr-SEIsqIubEFO7OyFzVYFNXxBPxY",
    authDomain: "mock-interview-platform-b2339.firebaseapp.com",
    projectId: "mock-interview-platform-b2339",
    storageBucket: "mock-interview-platform-b2339.firebasestorage.app",
    messagingSenderId: "164809762931",
    appId: "1:164809762931:web:ebaae3c5c0b0f760a46206",
    measurementId: "G-ZJ61DB80R3"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);