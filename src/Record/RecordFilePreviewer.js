import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { timestampToDateString } from "../Utility/utils";

class RecordFilePreviewer extends React.Component {
    render() {
        const record = this.props.record;
        console.log(record)

        return (
            <Modal
                style={{ "fontSize": "1rem" }}
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName="modal-90W"
                aria-labelledby="file-previewer-modal">
                <Modal.Header closeButton>
                    <div className="w-100">
                        <p style={{ "fontSize": "16px" }}>{`Entering Game Room`}</p>
                        <div style={{ "fontSize": "12px" }}>{record.description}</div>
                        <div className="float-right" style={{ "fontSize": "12px" }}>
                            {(record)? timestampToDateString(record.date): ""}
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <img src={record.file} className="w-75 h-75" />
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

export default RecordFilePreviewer;