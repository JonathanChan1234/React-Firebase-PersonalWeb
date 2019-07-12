import React from 'react';
import Firebase from 'firebase/firebase';

class TTTNewGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            passwordDisabled: false,
            type: ""
        };
    }

    handleTypeChange(e) {
        this.setState({ type: e.target.value });
        if (e.target.value === "private") {
            this.setState({ passwordDisabled: false });
        } else {
            this.setState({ passwordDisabled: true });
        }
    }

    render() {
        return (
            <div className="w-50">
                <form
                    className="needs-validation"
                    onSubmit={(e) => this.props.startNewGame(e, {
                        game_state: [],
                        name: this.state.name,
                        next_player: "O",
                        password: this.state.password,
                        created_at: Firebase.firestore.Timestamp.fromDate(new Date()),
                        updated_at: Firebase.firestore.Timestamp.fromDate(new Date())
                    })}
                    noValidate>
                    <div className="form-group">
                        <label htmlFor="nameInput">Name</label>
                        <input
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}
                            id="nameInput"
                            type="text"
                            name="name"
                            className="form-control"
                            aria-describedby="nameHelp"
                            placeholder="Enter the name"
                            required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-tooltip">
                            You must fill in the name of the game
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password}
                            id="passwordInput"
                            type="password"
                            name="password"
                            className="form-control"
                            aria-describedby="passwordHelp"
                            placeholder="Enter the password"
                            disabled={this.state.passwordDisabled}
                            required />
                        <div className="valid-feedback">
                            Looks good!
                            </div>
                        <div className="invalid-tooltip">
                            You must fill in the password for the game
                            </div>
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input custom-control-input"
                                value="private"
                                onClick={(e) => this.handleTypeChange(e)}
                                name="type"
                                type="radio"
                                id="privateRadio"
                                required />
                            <label
                                className="form-check-label custom-control-label"
                                htmlFor="privateRadio"
                                style={{ fontSize: '12px' }}>
                                Private</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input custom-control-input"
                                value="public"
                                onChange={(e) => this.handleTypeChange(e)}
                                name="type"
                                type="radio"
                                id="publicRadio"
                                required />
                            <label
                                className="form-check-label custom-control-label"
                                htmlFor="publicRadio"
                                style={{ fontSize: '12px' }}>
                                Public (No password is requried)</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">OK</button>
                </form>
            </div >
        );
    }
}

export default TTTNewGameForm;