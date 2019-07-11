import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Firebase from 'firebase/firebase';

import TTTGame from './TTT/TTTGame';
import TTTAdvancedGame from './TTT_Advanced/TTTAdvancedGame';
import LoginPage from './Login/LoginPage';
import RecordPage from './Record/RecordPage';
import OnlineTTTMenu from './Online/OnlineTTTMenu';
import FirebaseApp from './firebase/index';

const app = new FirebaseApp();
const provider = new Firebase.auth.GoogleAuthProvider();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSignedIn: false };
    }

    componentDidMount() {
        this.unregisterAuthObserver = app.auth.onAuthStateChanged(
            (user) => {
                console.log(user)
                this.setState({ isSignedIn: !!user })
            });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    signIn() {
        app.auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log({ token, user })
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log({ errorCode, errorMessage, credential })
        });
    }

    signout() {
        app.auth.signOut().then(() => {
            alert("Sign out successfully");
        }).catch(err => {
            alert(err);
        });
    }

    render() {
        if (this.state.isSignedIn) {
            return (
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="/">
                                <img src="/logo.png" width="30" height="30" alt="" />Jonathan's Website
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                                    <li className="nav-item"><Link to="/advanced" className="nav-link">Advanced</Link></li>
                                    <li className="nav-item"><Link to="/record" className="nav-link">Record</Link></li>
                                    <li className="nav-item"><Link to="/online" className="nav-link">Play Online</Link></li>
                                    <li className="nav-item" style={{ cursor: 'pointer' }} onClick={() => { this.signout() }}><a className='nav-link'>Sign Out</a></li>
                                </ul>
                            </div>
                        </nav>
                        <hr></hr>
                        <Route path='/' exact component={TTTGame} />
                        <Route path='/advanced' component={TTTAdvancedGame} />
                        <Route path='/record' component={RecordPage} />
                        <Route path='/online' component={OnlineTTTMenu} />
                        <Route path='./game' component={TTTGame} />
                    </div>
                </Router>
            );
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        <img src="/logo.png" width="30" height="30" alt="" />Jonathan's Website
                    </a>
                </nav>
                <hr></hr>
                <Router>
                    <Route path='/' exact render={() => <LoginPage signIn={this.signIn} />} />
                </Router>
            </div>
        );
    }
}

export default App;