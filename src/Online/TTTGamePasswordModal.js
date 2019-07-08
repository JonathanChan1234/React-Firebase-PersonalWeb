import React from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';

class TTTGamePasswordModal extends React.Component {
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
                        <h5>{this.props.game.id}</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="passwordForm">
                        {(this.props.game.password !== "") ?
                            <FormControl
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1" /> : null}
                        <Button
                            onClick={() => {this.props.enterGameRoom()}}
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