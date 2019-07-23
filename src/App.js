import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import FirebaseApp from './firebase/index';

import TTTGame from './TTT/TTTGame';
import TTTAdvancedGame from './TTT_Advanced/TTTAdvancedGame';
import LoginPage from './Login/LoginPage';
import RecordPage from './Record/RecordPage';
import OnlineTTTGame from './OnlineGame/OnlineGame';
import OnlineTTTMenu from './OnlineMenu/OnlineTTTMenu';
import SettingPage from './Setting/index';
import SignupPage from './Login/SignupPage';
import { handleAccountError } from "./Utility/utils";

const app = new FirebaseApp();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            displayName: "",
            email: "",
            photoURL: "",
            uid: "",
            token: ""
        };
    }

    componentDidMount() {
        this.unregisterAuthObserver = app.auth.onAuthStateChanged(
            (user) => {
                this.setState({ isSignedIn: !!user })
                if (user != null) {
                    this.setState({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid
                    });
                    user.getIdToken().then(token => {
                        console.log("Token: " + token);
                        this.setState({ token: token });
                    }).catch(err => {
                        console.log(err)
                    });
                }
            });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    signout() {
        app.auth.signOut().then(() => {
            alert("Sign out successfully");
        }).catch(error => {
            handleAccountError(error);
        });
    }

    render() {
        if (this.state.isSignedIn) {
            return (
                <Router>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/" className="d-flex align-items-center">
                            <img src="/logo.png" width="50" height="50" alt="" />
                            <div className="ml-1">TT Chan</div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link to="/" className="nav-text nav-link">Simple</Link>
                                <Link to="/advanced" className="nav-text nav-link">Advanced</Link>
                                <Link to="/record" className="nav-text nav-link">Record</Link>
                                <Link to="/menu" className="nav-text nav-link">Online</Link>
                            </Nav>
                            <Nav>
                                <NavDropdown
                                    title={(this.state.displayName) ? this.state.displayName : this.state.email}
                                    id="collasible-nav-dropdown"
                                    className="nav-text">
                                    <NavDropdown.Item href="settting">Setting</NavDropdown.Item>
                                    <NavDropdown.Item href="/" onClick={() => { this.signout() }}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr></hr>
                    <Switch>
                        <Route path='/' exact component={TTTGame} />
                        <Route path='/advanced' component={TTTAdvancedGame} />
                        <Route path='/record' component={RecordPage} />
                        <Route path='/menu' component={OnlineTTTMenu} />
                        <Route path='/game' component={TTTGame} />
                        <Route path='/setting' component={SettingPage} />
                        <Route path='/online/:id' component={OnlineTTTGame} />
                        <Route component={NoMatch} />
                    </Switch>
                </Router>
            );
        }
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src="/logo.png" width="30" height="30" alt="" />Jonathan's Website
                    </a>
                    </nav>
                    <hr></hr>
                    <Switch>
                        <Route path='/' exact component={LoginPage} />
                        <Route path='/signup' render={() => <SignupPage />} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

function NoMatch({ location }) {
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default App;