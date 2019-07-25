import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase/firebase';
import { Button, ProgressBar, Modal } from 'react-bootstrap';

import cancelIcon from "../static/icons-cancel-24.png";
// import addIcon from '../static/icons-add-24.png';
import { timestampToDateString } from "../Utility/utils";
import App from "../firebase/index";

const app = new App();
class RecordEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: "", uploadProgress: 0 };
    }

    // upload a file for the record
    uploadRecordFile(e) {
        const record = this.props.record;
        let fileInput = e.currentTarget;    // input element
        let file = e.target.files[0];   // upload file
        // // Create Bootstrap ProgressBar element
        // let progressBar = document.createElement("div");
        // ReactDOM.render(<ProgressBar now={this.state.uploadProgress} />, progressBar);
        // // Replace the input element with ProgressBar element
        // fileInput.parentNode.replaceChild(progressBar, fileInput);

        let path = `images/${this.props.record.id}.jpg`;
        let storageRef = app.storage.ref(); // Root Ref
        let fileRef = storageRef.child(path);
        // upload image to firebase storage
        let uploadTask = fileRef.put(file)
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.setState({ uploadProgress: progress })
            switch (snapshot.state) {
                case Firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case Firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        }.bind(this), function (error) {
            // Handle unsuccessful uploads
            console.log(error.message);
        }, function () { // successful upload
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                app.firestore.collection("records").doc(record.id)
                    .set({ file: downloadURL, path: path }, { merge: true });
            });
        });
    }

    // Delete the associated file
    removeRecordFile() {
        let currentRecord = this.props.record;
        let storageRef = app.storage.ref();
        storageRef.child(currentRecord.path).delete().then(() => {
            console.log("file delete")
            app.firestore.collection("records").doc(currentRecord.id).update({
                file: Firebase.firestore.FieldValue.delete(),
                path: Firebase.firestore.FieldValue.delete()
            });
        }).catch(err => {
            // handle error
        })
    }

    renderRecordFile() {
        if (this.props.record.file) {
            return (
                <div className="d-flex justify-content-between">
                    <img src={this.props.record.file} alt={""} />
                    <img
                        name={this.props.record.id}
                        src={cancelIcon}
                        style={{ "cursor": "pointer" }}
                        height="24px"
                        width="24px"
                        alt=""
                        onClick={() => { this.removeRecordFile() }} />
                </div>
            );
        } else {
            return (
                <input
                    onChange={(e) => { this.uploadRecordFile(e) }}
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    multiple />);
        }
    }

    render() {
        return (
            <tr style={{ "fontSize": "1rem" }}>
                <th scope="row">{timestampToDateString(this.props.record.date)}</th>
                <td>{this.props.record.description}</td>
                <td>{this.props.record.category}</td>
                <td>
                    <span>$ {this.props.record.amount}</span>
                    <img
                        src={cancelIcon}
                        alt="cancel"
                        className="ml-2"
                        value={this.props.record.id}
                        style={{ "cursor": "pointer" }}
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={(e) => { this.props.handleRecordDelete(e) }} />
                    <Button
                        variant="warning"
                        className="ml-2"
                        size="sm"
                        value={this.props.record.id}
                        onClick={(e) => this.props.handleRecordDelete(e)}
                        data-toggle="modal"
                        data-target="#exampleModal">
                        Remove</Button>
                </td>
                <td>
                    {this.renderRecordFile()}
                </td>
            </tr>
        );
    }
}

export default RecordEntry;