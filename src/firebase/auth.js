import firebase from "firebase/firebase";
import config from './config';

firebase.initializeApp(config);

export default firebase.auth();