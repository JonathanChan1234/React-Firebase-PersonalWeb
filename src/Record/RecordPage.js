import React from 'react';
import App from '../firebase/index';
import Record from '../Object/Record';
import RecordModal from './RecordModal';
import RecordEntry from './RecordEntry';
import RecordFilter from './RecordFilter';
import RecordDialog from './RecordDialog';
import { Button } from 'react-bootstrap';

const app = new App();
class RecordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecordModal: false,
            recordList: [],
            deleteItemId: "",
            sortOrder: "",
            dateFilter: ""
        };
    }

    componentDidMount() {
        this.updateOrder();
        console.log(app.auth.currentUser.uid);
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
                        console.log("sort by date 1")
                        this.updateRecord(snapshot);
                    });
                break;
            case "Sort By Amount":
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('amount', 'desc')
                    .onSnapshot((snapshot) => {
                        console.log("sort by amount")
                        this.updateRecord(snapshot);
                    });
                break;
            case "Sort By Category":
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('category', 'desc')
                    .onSnapshot((snapshot) => {
                        console.log("sort by category")
                        this.updateRecord(snapshot);
                    });
                break;
            default:
                this.unsubscribe = app.firestore.collection('records')
                    .where("uid", "==", app.auth.currentUser.uid)
                    .orderBy('date', 'desc')
                    .onSnapshot((snapshot) => {
                        console.log("sort default")
                        this.updateRecord(snapshot);
                    });
                break;
        }
    }

    updateRecord(snapshot) {
        if (snapshot.empty) {
            console.log("No record found");
        } else {
            let recordList = [];
            snapshot.forEach((record) => {
                let obj = new Record(
                    record.id,
                    record.data().amount,
                    record.data().category,
                    record.data().date,
                    record.data().description,
                    record.data().type
                );
                recordList.push(obj);
            });
            this.setState({
                recordList: recordList
            });
        }
    }

    handleRecordDelete(e) {
        this.setState({
            deleteItemId: e.target.value
        });
    }

    deleteItem() {
        if (this.state.deleteItemId !== "") {
            console.log("delete item haha");
            app.firestore.collection("records").doc(this.state.deleteItemId).delete()
                .then(function () {
                    console.log("Delete Successfully")
                })
                .catch(function (error) {
                    console.log("Something is wrong " + error)
                });
        }
    }

    resetDeleteItem() {
        this.setState({
            deleteItemId: ""
        });
    }

    renderTable() {
        var table = [];
        this.state.recordList.forEach((record) => {
            table.push(<RecordEntry
                key={record.id}
                record={record}
                handleRecordDelete={this.handleRecordDelete.bind(this)} />)
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

    render() {
        return (
            <div>
                <RecordDialog
                    dialog="delete"
                    deleteItem={this.deleteItem.bind(this)}
                    resetDeleteItem={this.resetDeleteItem.bind(this)} />
                <h1>Record List</h1>
                <Button
                    onClick={() => { this.setState({ showRecordModal: true }) }}
                    className="mt-1">Click to add a record</Button>
                <RecordModal
                    show={this.state.showRecordModal}
                    onHide={() => this.setState({ showRecordModal: false })} />
                <RecordFilter
                    recordList={this.state.recordList}
                    sortOrder={this.state.sortOrder}
                    dateFilter={this.state.dateFilter}
                    onFilterChange={this.handleFilterChange.bind(this)}
                    onDateFilterChange={this.handleDateFilterChange.bind(this)} />
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RecordPage;