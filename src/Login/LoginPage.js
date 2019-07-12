import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                <h1>Sign In to Your Account</h1>
                <FormGroup>
                    <FormControl
                        onChange={(e) => this.setState({email: e.target.value})}
                        value={this.state.email}
                        style={{ "width": "20rem" }}
                        className="mt-2 row"
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1" />
                    <FormControl
                        onChange={(e) => this.setState({password: e.target.value})}
                        value={this.state.password}
                        style={{ "width": "20rem" }}
                        className="mt-2 row"
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1" />
                    <div className="row">
                        <Button
                            onClick={() => { this.props.signInWithOwnEmail(this.state.email, this.state.password) }}
                            type="submit"
                            variant="primary"
                            style={{ "width": "10rem" }}
                            className="mt-2 mr-1 column">
                            Sign In</Button>
                        <Button
                            onClick={() => { this.props.signUpWithOwnEmail(this.state.email, this.state.password) }}
                            type="submit"
                            variant="warning"
                            style={{ "width": "10rem" }}
                            className="mt-2 mr-1 column">
                            Sign Up</Button>
                    </div>

                </FormGroup>
                <Button
                    variant="secondary"
                    onClick={() => this.props.signInWithGoogle()}
                    style={{ "width": "20rem" }}>
                    Continue With Your Google Account</Button>
            </div>
        );
    }
}

export default LoginPage;