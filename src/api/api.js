import axios from 'axios';
import Firebase from 'firebase/firebase';
import App from '../firebase/index';

const app = new App();
const domain = "http://localhost:5001/arduino-wifi-f0e68/us-central1/app";
// const userRequest = axios.create({
//     baseURL: `${domain}/users`
// });
// const recordRequest = axios.create({
//     baseURL: `${domain}/records`
// });
const gameRequest = axios.create({
    baseURL: `${domain}/games`
});

// Delete record item
export async function deleteItem(record) {
    try {
        await app.firestore.collection("records").doc(record.id).delete();
        await app.storage.child("")
    } catch(err){
        
    }
}

// Sign up with a new user
export async function signUpNewUser(email, password, displayName, photoURL) {
    try {
        // Set the persistance of authentification as Session
        await app.auth.setPersistence(Firebase.auth.Auth.Persistence.SESSION);
        // Create new user
        await app.auth.createUserWithEmailAndPassword(email, password);
        let user = app.auth.currentUser;
        //update the profile of new registered user
        await user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        });
        return { success: 1, message: "create new user successfully" };
    } catch (err) {
        return { success: 0, message: err.message };
    }
}

// Cloud Function API
export const enterGameRoom = (data) => gameRequest.post("/enterGame", data);
export const deleteGameRoom = () => gameRequest.post('/deleteAllGame');
