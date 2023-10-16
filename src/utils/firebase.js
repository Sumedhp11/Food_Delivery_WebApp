import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCArHFPbDRC7wIEjpN42FDw8UVYwKwIGeA",
  authDomain: "thirdyearproject-bbaf4.firebaseapp.com",
  projectId: "thirdyearproject-bbaf4",
  storageBucket: "thirdyearproject-bbaf4.appspot.com",
  messagingSenderId: "765174927992",
  appId: "1:765174927992:web:88032eedeb5e441403d38d",
  databaseUrl:
    "https://thirdyearproject-bbaf4-default-rtdb.firebaseio.com/https://thirdyearproject-bbaf4-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);
