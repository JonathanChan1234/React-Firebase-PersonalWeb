import React from 'react';
import { Modal } from 'react-bootstrap';

class TTTGamePasswordModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.showPasswordModal}
                onHide={this.props.onHide}
                dialogClassName="modal-90W"
                aria-labelledby="newGameModalLabel">
                <Modal.Header>
                    Please Enter the password
                </Modal.Header>
                <Modal.Body>
                    <p>Password</p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TTTGamePasswordModal;