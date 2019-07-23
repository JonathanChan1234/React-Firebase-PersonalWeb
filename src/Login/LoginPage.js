import React from 'react';
import Firebase from 'firebase/firebase';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import App from '../firebase/index';

const app = new App();
const provider = new Firebase.auth.GoogleAuthProvider();

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ["", ""],
            loginMessage: "",
            validated: false
        };
    }

    signInWithGoogle() {
        app.auth.setPersistence(Firebase.auth.Auth.Persistence.SESSION).then(() => {
            return app.auth.signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log({ token, user })
            }).catch(function (error) {
                // Handle Errors here.
                this.setState({ loginMessage: error.message });
            });
        }).catch((error) => {
            this.setState({ loginMessage: error.message });
        });
    }

    signInWithOwnEmail() {
        app.auth.setPersistence(Firebase.auth.Auth.Persistence.SESSION).then(() => {
            return app.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch(error => {
                    // Handle Errors here.
                    this.setState({ loginMessage: error.message });
                })
        }).catch((error) => {
            this.setState({ loginMessage: error.message });
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let form = e.currentTarget;
        let [email, password] = ["", ""];
        if (!form.checkValidity()) {
            for (let i = 0; i < form.elements.length; ++i) {
                let formElement = form.elements[i];
                // Check whether the input element is valid/ need to be validated/ is not button
                if (!formElement.validity.valid && formElement.tagName !== 'button' &&
                    formElement.willValidate) {
                    if (formElement.name === "email") email = formElement.validationMessage;
                    else password = formElement.validationMessage;
                }
            }
        } else {
            this.signInWithOwnEmail();
        }
        this.setState({ errorMessage: [email, password] });
    }

    render() {
        const [emailErrMsg, passwordErrMsg] = this.state.errorMessage;
        return (
            <div className="d-flex flex-column align-items-center text-center">
                <h3>Sign In to Your Account</h3>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={(e) => { this.handleFormSubmit(e) }}>
                    <FormGroup>
                        <FormControl
                            name="email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email}
                            style={{ "width": "20rem" }}
                            className="mt-2 row"
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            required />
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{emailErrMsg}</div>
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            name="password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password}
                            style={{ "width": "20rem" }}
                            className="mt-2 row"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            required />
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{passwordErrMsg}</div>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{ "width": "10rem" }}
                            className="">
                            Sign In</Button>
                    </FormGroup>
                </Form>
                <div
                    onClick={() => { this.props.history.push('/signup'); }}
                    className="mt-1"
                    style={{ "textDecoration": "underline", "fontSize": "1rem", "color": "blue", "cursor": "pointer" }}>
                    Do not have an account yet?</div>
                <Button
                    className="mt-1"
                    variant="secondary"
                    onClick={() => this.signInWithGoogle()}
                    style={{ "width": "20rem" }}>
                    Continue With Your Google Account</Button>
                <div className='text-danger mt-1' style={{ "fontSize": "1rem" }}>
                    {this.state.loginMessage}
                </div>
            </div>
        );
    }
}

export default LoginPage;