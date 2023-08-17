import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMH6L951cMgb-gRmEnspaViu2R5cQIKfk",
    authDomain: "ecommerce-785f3.firebaseapp.com",
    projectId: "ecommerce-785f3",
    storageBucket: "ecommerce-785f3.appspot.com",
    messagingSenderId: "720682789659",
    appId: "1:720682789659:web:9b252d4b6afcff0a1601be",
    measurementId: "G-1SET93XQBT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }