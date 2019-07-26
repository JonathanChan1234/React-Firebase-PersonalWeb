import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { timestampToDateString } from "../Utility/utils";

class RecordFilePreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLoader: "block" };
    }
    onImageLoad(e) {
        console.log("loading image")
        if (e.currentTarget.complete) {
            this.setState({ showLoader: "none" });
        }
    }

    render() {
        let record = this.props.record;
        if (record) {
            return (
                <Modal
                    style={{ "fontSize": "1rem" }}
                    show={this.props.show}
                    onHide={this.props.onHide}
                    dialogClassName="modal-90W"
                    aria-labelledby="file-previewer-modal">
                    <Modal.Header closeButton>
                        <div className="w-100">
                            <div style={{ "fontSize": "16px" }}>{record.description}</div>
                            <div className="float-right" style={{ "fontSize": "12px" }}>
                                {(record) ? timestampToDateString(record.date) : ""}
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={record.file} className="w-75 h-75" onLoad={(e) => { this.onImageLoad(e) }} />
                        <div className="loader" style={{"display": this.state.showLoader}}></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default RecordFilePreviewer;