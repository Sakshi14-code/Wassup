import firebase from "firebase";
const dotenv = require('dotenv').config();

// Configure Firebase.
// const config = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const config = {
  apiKey: "AIzaSyDdvf7B3X5iTVFL6TjwId4TijmtHlNxev8",
  authDomain: "wassup-f800e.firebaseapp.com",
  projectId: "wassup-f800e",
  storageBucket: "wassup-f800e.appspot.com",
  messagingSenderId: "491434502883",
  appId: "1:491434502883:web:b898d168be84a19879b3d6"
};

firebase.initializeApp(config);

export default firebase;
