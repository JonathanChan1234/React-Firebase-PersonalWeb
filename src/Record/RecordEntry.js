import React from 'react';
import { Button } from 'react-bootstrap';
import {timestampToDateString} from "../Utility/utils";

class RecordEntry extends React.Component {
    render() {
        return (
            <tr style={{"fontSize": "1rem"}}>
                <th scope="row">{timestampToDateString(this.props.record.date)}</th>
                <td>{this.props.record.description}</td>
                <td>{this.props.record.category}</td>
                <td>
                    <span>$ {this.props.record.amount}</span>
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
            </tr>
        );
    }
}

export default RecordEntry;