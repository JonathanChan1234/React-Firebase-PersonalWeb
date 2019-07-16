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
                    <div className="w-100">
                        <p style={{"fontSize": "16px"}}>{`Entering Game Room`}</p>
                        <div style={{"fontSize": "12px"}}>{this.props.game.name}</div>
                        <div className="float-right" style={{"fontSize": "12px"}}>{this.props.game.id}</div>
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
                            className="mt-2 float-right">
                            Enter</Button>
                    </FormGroup>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TTTGamePasswordModal;