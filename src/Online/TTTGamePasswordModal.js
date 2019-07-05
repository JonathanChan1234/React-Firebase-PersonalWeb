import React from 'react';
import { Modal } from 'react-bootstrap';

class TTTGamePasswordModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName="modal-90W"
                aria-labelledby="newGameModalLabel">
                <Modal.Header>
                    {`Please Enter the password for game room ${this.props.gameId}`} 
                </Modal.Header>
                <Modal.Body>
                    <p>Your password</p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TTTGamePasswordModal;