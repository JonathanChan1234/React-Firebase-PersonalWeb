import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
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
            <div className="d-flex flex-column justify-content-center">
                <h1>Sign In to Your Account</h1>
                <FormGroup
                    controlId="accountForm">
                    <FormControl
                        style={{ "width": "20rem" }}
                        className="mt-2"
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1" />
                    <FormControl
                        style={{ "width": "20rem" }}
                        className="mt-2"
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1" />
                    <Button
                        onClick={() => { this.props.signInWithEmail() }}
                        type="submit"
                        variant="primary"
                        style={{ "width": "20rem" }}
                        className="mt-2">
                        Sign In</Button>
                </FormGroup>
                <Button
                    variant="secondary"
                    onClick={() => this.props.signIn()}
                    style={{ "width": "20rem" }}>
                    Sign In With Your Google Account</Button>
                {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth} /> */}
            </div>
        );
    }
}

export default LoginPage;