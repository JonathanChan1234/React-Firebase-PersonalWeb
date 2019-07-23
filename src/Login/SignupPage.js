import React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { signUpNewUser } from '../api/api';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            errorMessage: Array(3).fill(""),
            signUpMessage: "",
            validated: false
        };
    }

    async signUpWithOwnEmail() {
        const info = this.state;
        try {
            let result = await signUpNewUser(info.email, info.password, info.username, "");
            if (result.success === 1) {
                this.props.history.push("/");
            } else {
                this.setState({ signUpMessage: result.message });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let form = e.currentTarget;
        let [username, email, password] = Array(3).fill("");
        if (!form.checkValidity()) {
            for (let i = 0; i < form.elements.length; ++i) {
                let formElement = form.elements[i];
                // Check whether the input element is valid/ need to be validated/ is not button
                if (!formElement.validity.valid && formElement.tagName !== 'button' &&
                    formElement.willValidate) {
                    if (formElement.name === "email") email = formElement.validationMessage;
                    else if (formElement.name === "username") username = formElement.validationMessage;
                    else password = formElement.validationMessage;
                }
            }
            console.log([username, email, password])
        } else {
            this.signUpWithOwnEmail();
        }
        this.setState({ errorMessage: [username, email, password] });
    }

    render() {
        const [usernameErrMsg, emailErrMsg, passwordErrMsg] = this.state.errorMessage;
        return (
            <div className="d-flex flex-column align-items-center text-center">
                <h3>Become A New Member</h3>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={(e) => { this.handleFormSubmit(e) }}>
                    <FormGroup>
                        <FormControl
                            name="username"
                            onChange={(e) => this.setState({ username: e.target.value })}
                            value={this.state.username}
                            style={{ "width": "20rem" }}
                            className="mt-2 row"
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                            maxLength="20"
                            aria-describedby="basic-addon1"
                            required />
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{usernameErrMsg}</div>
                    </FormGroup>
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
                            minLength="8"
                            // pattern="/^(?=.*[0-9]$)(?=.*[a-zA-Z])/gm"
                            required />
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{passwordErrMsg}</div>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{ "width": "10rem" }}
                            className="">
                            Create Account</Button>
                    </FormGroup>
                </Form>
                <div className='text-danger mt-1' style={{ "fontSize": "1rem" }}>
                    {this.state.loginMessage}
                </div>
            </div>
        );
    }
}

export default SignupPage;