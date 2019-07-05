import React from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';

class TTTGamePasswordModal extends React.Component {
    submitForm(e) {
        e.preventDefault()
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName="modal-90W"
                aria-labelledby="newGameModalLabel">
                <Modal.Header closeButton>
                    <div>
                        <h3>Are you sure that you want to enter this game room</h3>
                        <h5>{this.props.gameId}</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        onSubmit={(e) => this.submitForm(e)}
                        controlId="passwordForm">
                        {(this.state.type === "private") ? 
                            <FormControl
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1" /> : null}
                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-2">
                            Enter</Button>
                    </FormGroup>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TTTGamePasswordModal;