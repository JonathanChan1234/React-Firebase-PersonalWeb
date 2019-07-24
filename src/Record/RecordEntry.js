import React from 'react';
import cancelIcon from "../static/icons-cancel-24.png";
// import addIcon from '../static/icons-add-24.png';
import { Button } from 'react-bootstrap';
import { timestampToDateString } from "../Utility/utils";
import App from "../firebase/index";

const app = new App();
class RecordEntry extends React.Component {
    uploadRecordImage(e) {
        console.log()
        let storageRef = app.storage.ref(); // Root Ref
        let fileRef = storageRef.child(`image/${this.props.record.id}.jpg`);
        // upload image to firebase storage
        fileRef.put(e.target.files[0]).then((snapshot) => {
            console.log("upload successfully");
            console.log(snapshot);
        })
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
                    {/* <label for="image_uploads">Choose images to upload (PNG, JPG)</label> */}
                    <input
                        onChange={(e) => {this.uploadRecordImage(e)}}
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png"
                        multiple>
                    </input>
                </td>
            </tr>
        );
    }
}

export default RecordEntry;