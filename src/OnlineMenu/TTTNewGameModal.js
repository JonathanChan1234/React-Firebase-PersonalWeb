import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import TTTNewGameForm from './TTTNewGameForm';

class TTTNewGameModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName="modal-90W"
                aria-labelledby="newGameModalLabel">
                <Modal.Header closeButton>
                    <Modal.Title id="newGameModalLabel">
                        Start A New Game
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TTTNewGameForm
                        startNewGame={this.props.startNewGame} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>
                        Close
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default TTTNewGameModal;