import React from 'react';
import { Button, Table } from 'react-bootstrap';
import App from '../firebase/index';
import Record from '../Object/Record';
import RecordModal from './RecordModal';
import RecordEntry from './RecordEntry';
import RecordFilter from './RecordFilter';
import RecordDialog from './RecordDialog';
import RecordFilePreviewer from './RecordFilePreviewer';
import LoadingModal from '../GlobalComponent/LoadingModal';

const app = new App();
class RecordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadingModal: false,
            showRecordModal: false,
            showPreviewModal: false,
            recordList: [],
            currentRecord: null,
            deleteItem: null,
            sortOrder: "",
            dateFilter: ""
        };
    }

    componentDidMount() {
        this.updateOrder();
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    updateOrder() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        switch (this.state.sortOrder) {
            case "Sort By Date":
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('date', 'desc')
                    .onSnapshot((snapshot) => {
                        this.updateRecord(snapshot);
                    });
                break;
            case "Sort By Amount":
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('amount', 'desc')
                    .onSnapshot((snapshot) => {
                        this.updateRecord(snapshot);
                    });
                break;
            case "Sort By Category":
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('category', 'desc')
                    .onSnapshot((snapshot) => {
                        this.updateRecord(snapshot);
                    });
                break;
            default:
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('date', 'desc')
                    .onSnapshot((snapshot) => {
                        this.updateRecord(snapshot);
                    });
                break;
        }
    }

    updateRecord(snapshot) {
        let recordList = [];
        if (!snapshot.empty) {
            snapshot.forEach((record) => {
                let obj = new Record(
                    record.id,
                    record.data().uid,
                    record.data().amount,
                    record.data().category,
                    record.data().date,
                    record.data().description,
                    record.data().type,
                    (record.data().file) ? record.data().file : "",
                    (record.data().path) ? record.data().path : ""
                );
                recordList.push(obj);
            });
        }
        this.setState({ recordList: recordList });
    }

    async deleteItem() {
        this.setState({ showLoadingModal: true });
        let record = this.state.deleteItem;
        if (record.id) {
            try {
                await app.firestore.collection("records").doc(record.id).delete();
                console.log("delete record in database")
                if (record.path) {   //if file exist, delete the photo in storage
                    let storageRef = app.storage.ref().child(record.path)
                    await storageRef.delete();
                    console.log("delete file in storage")
                }
                this.setState({ showLoadingModal: false });
            } catch (error) {
                this.setState({ showLoadingModal: false });
                alert(`Fail to delete the item ${error.message}`);
            }
        }
    }

    renderTable() {
        var table = [];
        this.state.recordList.forEach((record) => {
            table.push(
                <RecordEntry
                    key={record.id}
                    record={record}
                    handleRecordDelete={(record) => { this.setState({ deleteItem: record }); }}
                    previewFile={this.previewFile.bind(this)} />)
        });
        return table;
    }

    handleFilterChange(e) {
        this.setState({
            sortOrder: e.target.value
        });
        this.updateOrder();
    }

    handleDateFilterChange(e) {
        this.setState({
            dateFilter: e.target.value
        });
    }

    previewFile(record) {
        this.setState({
            currentRecord: record,
            showPreviewModal: true
        });
    }

    render() {
        return (
            <div>
                <RecordDialog
                    dialog="delete"
                    deleteItem={this.deleteItem.bind(this)}
                    resetDeleteItem={() => { this.setState({ deleteItemId: "" }) }} />
                <LoadingModal show={this.state.showLoadingModal} />
                <h5>Records</h5>
                <Button
                    onClick={() => { this.setState({ showRecordModal: true }) }}
                    className="mt-1">Click to add a record</Button>
                <RecordModal
                    show={this.state.showRecordModal}
                    onHide={() => this.setState({ showRecordModal: false })} />
                <RecordFilePreviewer
                    show={this.state.showPreviewModal}
                    onHide={() => this.setState({ showPreviewModal: false })}
                    record={this.state.currentRecord} />
                <RecordFilter
                    recordList={this.state.recordList}
                    sortOrder={this.state.sortOrder}
                    dateFilter={this.state.dateFilter}
                    onFilterChange={this.handleFilterChange.bind(this)}
                    onDateFilterChange={this.handleDateFilterChange.bind(this)} />
                <Table className="table table-striped w-75" size="sm" responsive>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Files</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default RecordPage;