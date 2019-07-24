import React from 'react';

class RecordDialog extends React.Component {
    getDialogTitle() {
        switch (this.props.dialog) {
            case "delete":
                return "Do you want to delete this item?";
            default:
                return "Error";
        }
    }

    getDialogOptions() {
        switch (this.props.dialog) {
            case "delete":
                return "Delete";
            default:
                return "Error";
        }
    }

    render() {
        return (
            <div
                className="modal fade"
                style={{ "fontSize": "1.5rem" }}
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title" id="exampleModalLabel">Delete Record</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.getDialogTitle()}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => this.props.resetDeleteItem()}>
                                Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => this.props.deleteItem()}>
                                {this.getDialogOptions()}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecordDialog