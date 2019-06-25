import React from 'react';
import firebase from "firebase/firebase";

import db from '../firebase/firestore';
import Record from '../Object/Record';
import RecordForm from './RecordForm';
import RecordEntry from './RecordEntry';
import RecordFilter from './RecordFilter';
import RecordDialog from './RecordDialog';

class RecordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordList: [],
            deleteItemId: "",
            sortOrder: "",
            dateFilter: ""
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleRecordDelete = this.handleRecordDelete.bind(this);
        this.resetDeleteItem = this.resetDeleteItem.bind(this);
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
                this.unsubscribe = db.collection('records')
                    .orderBy('date', 'desc')
                    // .limit(2)
                    .onSnapshot((snapshot) => {
                        console.log("sort by date 1")
                        this.updateRecord(snapshot);
                    });
                break;
            case "Sort By Amount":
                this.unsubscribe = db.collection('records')
                    .orderBy('amount', 'desc')
                    // .limit(2)
                    .onSnapshot((snapshot) => {
                        console.log("sort by amount")
                        this.updateRecord(snapshot);
                    });
                break;
            case "Sort By Category":
                this.unsubscribe = db.collection('records')
                    .orderBy('category', 'desc')
                    // .limit(2)
                    .onSnapshot((snapshot) => {
                        console.log("sort by category")
                        this.updateRecord(snapshot);
                    });
                break;
            default:
                this.unsubscribe = db.collection('records')
                    .orderBy('date', 'desc')
                    // .limit(2)
                    .onSnapshot((snapshot) => {
                        console.log("sort default")
                        this.updateRecord(snapshot);
                    });
                break;
        }
    }

    updateRecord(snapshot) {
        console.log("update record")
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
        console.log("delete item " + this.state.deleteItemId);
        if (this.state.deleteItemId !== "") {
            console.log("delete item haha");
            db.collection("records").doc(this.state.deleteItemId).delete()
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
                handleRecordDelete={this.handleRecordDelete} />)
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
                    deleteItem={this.deleteItem}
                    resetDeleteItem={this.resetDeleteItem} />
                <h1>Record List</h1>
                <RecordForm />

                <RecordFilter
                    recordList = {this.state.recordList}
                    sortOrder={this.state.sortOrder}
                    dateFilter={this.state.dateFilter}
                    onFilterChange={this.handleFilterChange}
                    onDateFilterChange={this.handleDateFilterChange} />

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