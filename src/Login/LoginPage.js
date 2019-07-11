import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button } from 'react-bootstrap';
import Firebase from 'firebase/firebase';
import App from '../firebase/index';

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

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Please sign-in:</h1>
                <Button onClick={() => this.props.signIn()}>Sign In With Your Google Account</Button>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth} />
            </div>
        );
    }
}

export default LoginPage;