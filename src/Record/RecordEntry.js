import React from 'react';

const convertReadableDate = (time) => {
    let t = new Date(1970, 0, 1);
    t.setSeconds(time.seconds);
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
}

class RecordEntry extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{convertReadableDate(this.props.record.date)}</th>
                <td>{this.props.record.description}</td>
                <td>{this.props.record.category}</td>
                <td>
                    <span>$ {this.props.record.amount}</span>
                    <button
                        className="btn btn-warning"
                        value={this.props.record.id}
                        onClick={(e) => this.props.handleRecordDelete(e)}
                        data-toggle="modal" 
                        data-target="#exampleModal">
                        Remove</button>
                </td>
            </tr>
        );
    }
}

export default RecordEntry;