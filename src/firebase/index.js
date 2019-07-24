import * as firebase from "firebase/firebase";

import config from './config';

// Singleton firebase class
let instance = null;
class Firebase {
    constructor() {
        if(!instance) {
            firebase.initializeApp(config);
            instance = this;
        }
        this.firestore = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        return instance;
    }
}

export default Firebase;