import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBb8hkxNV94ck2Jfc0bnSLw3QjFwD0PncU",
    authDomain: "prbancodd.firebaseapp.com",
    projectId: "prbancodd",
    storageBucket: "prbancodd.appspot.com",
    messagingSenderId: "865022191477",
    appId: "1:865022191477:web:6bdb3663e8dcdead9dd53c",
    measurementId: "G-RBN8VDT7GN"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const bd = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)

  export { bd, auth };
