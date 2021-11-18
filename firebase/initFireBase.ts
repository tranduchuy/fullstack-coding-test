import * as firebase from 'firebase/app';
import 'firebase/auth';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "858803936063",
  appId: "1:858803936063:web:e55ae26cda1f10af8c518a"
};

export default function initFireBase() {
  if (!firebase.getApps().length) {

    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase was successfully init.');
  }
}