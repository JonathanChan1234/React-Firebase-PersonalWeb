import firebase from "firebase/firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "",
    authDomain: "arduino-wifi-f0e68.firebaseapp.com",
    databaseURL: "https://arduino-wifi-f0e68.firebaseio.com",
    projectId: "arduino-wifi-f0e68",
    storageBucket: "arduino-wifi-f0e68.appspot.com",
    messagingSenderId: "279991652674",
    appId: "1:279991652674:web:3a879ff9fb80df18"
};
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();