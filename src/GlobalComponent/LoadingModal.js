import React from 'react';
import { Modal } from 'react-bootstrap';

class LoadingModal extends React.Component {
    render() {
        return(
            <Modal
                show={this.props.show}>
                <Modal.Header>
                    Loading ...
                </Modal.Header>
                <Modal.Body>
                    <div className="loader"></div>
                </Modal.Body>
            </Modal>
        );
    }
}
export default LoadingModal;