import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RecordForm from './RecordForm';

class RecordModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName="modal-90W"
                aria-labelledby="recordModalLabel">
                <Modal.Header closeButton>
                    <Modal.Title id="newGameModalLabel">
                        Add a new record
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecordForm  handleFormSubmit={this.props.handleRecordSubmit}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>
                        Close
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default RecordModal;
