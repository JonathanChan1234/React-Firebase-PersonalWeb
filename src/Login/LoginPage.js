import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from 'firebase/firebase';
import App from '../firebase/index';
import { Button } from 'react-bootstrap';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

const app = new App();
const provider = new Firebase.auth.GoogleAuthProvider();

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSignedIn: false };
    }

    componentDidMount() {
        this.unregisterAuthObserver = app.auth.onAuthStateChanged(
            (user) => {
                console.log("sign in successfully")
                this.setState({ isSignedIn: !!user })
            });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    handleOnClick() {
        app.auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log({token, user})
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log({errorCode, errorMessage, credential})
          });
    }

    render() {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <Button onClick={() => this.handleOnClick()}>Sign In</Button>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth} />
            </div>
        );
    }
}

export default LoginPage;