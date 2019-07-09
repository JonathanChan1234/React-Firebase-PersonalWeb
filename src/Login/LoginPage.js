import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from 'firebase/firebase';
import App from '../firebase/index';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.app = new App();
    }

    render() {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={this.app.auth} />
            </div>
        );
    }
}

export default LoginPage;