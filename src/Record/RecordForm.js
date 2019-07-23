import React from 'react';
import Firebase from 'firebase/firebase'
import App from '../firebase/index';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const app = new App();
class RecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errMsg: Array(4).fill(""),
            currentItem: "",
            currentAmount: 0,
            currentCategory: "food",
            currentType: "",
            incomeChecked: true,
            outcomeChecked: false
        };
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.state.currentAmount !== 0 &&
            this.state.currentItem !== "" &&
            this.state.currentType !== "") {
            app.firestore.collection("records").add({
                uid: this.app.auth.currentUser.uid,
                amount: parseInt(this.state.currentAmount),
                description: this.state.currentItem,
                category: this.state.currentCategory,
                type: this.state.currentType,
                date: Firebase.firestore.Timestamp.fromDate(new Date())
            }).then(ref => {
                alert(`Add item ref no ${ref.id}`)
            }).catch(err => {
                alert(err)
            });
        } else {
            alert("Please fill in all the field");
        }
    }

    render() {
        const [itemErrMsg, amountErrMsg, categoryErrMsg, typeErrMsg] = this.state.errMsg;
        return (
            <div>
                <Form
                    noValidate
                    className="d-flex flex-column align-item-center text-center"
                    validated={this.state.validated}
                    onSubmit={(e) => { this.handleFormSubmit(e) }}>
                    <FormGroup>
                        <FormControl
                            name="item"
                            onChange={(e) => this.setState({ currentItem: e.target.value })}
                            value={this.state.currentItem}
                            style={{ "width": "20rem" }}
                            className="mt-2 row"
                            type="text"
                            placeholder="Item"
                            aria-label="Item"
                            maxLength="20"
                            aria-describedby="basic-addon1"
                            required >
                        </FormControl>
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{itemErrMsg}</div>                        </FormGroup>
                    <FormGroup>
                        <FormControl
                            name="amount"
                            onChange={(e) => this.setState({ currentAmount: e.target.value })}
                            value={this.state.currentAmount}
                            style={{ "width": "20rem" }}
                            className="mt-2 row"
                            type="number"
                            placeholder="Amount"
                            aria-label="Amount"
                            aria-describedby="basic-addon1"
                            required >
                        </FormControl>
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{amountErrMsg}</div>
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            style={{ "width": "20rem" }}
                            className="mt-2 row"
                            onChange={(e) => { this.setState({ currentCategory: e.target.value }) }}
                            value={this.state.currentCategory}
                            as="select">
                            <option>Food</option>
                            <option>Transportation</option>
                            <option>Work</option>
                            <option>Entertainment</option>
                            <option>Others</option>
                        </FormControl>
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{categoryErrMsg}</div>
                    </FormGroup>
                    <FormGroup>
                        <Form.Check
                            onChange={() => {
                                this.setState({ 
                                    incomeChecked: !this.state.incomeChecked, 
                                    outcomeChecked: !this.state.outcomeChecked});
                            }}
                            checked={this.state.incomeChecked}
                            type="radio"
                            id="income"
                            label="income">
                        </Form.Check>
                        <Form.Check
                            onChange={() => {
                                this.setState({ 
                                    incomeChecked: !this.state.incomeChecked, 
                                    outcomeChecked: !this.state.outcomeChecked});
                            }}
                            checked={this.state.outcomeChecked}
                            type="radio"
                            id="outcome"
                            label="outcome">
                        </Form.Check>
                        <div className='text-danger' style={{ "fontSize": "1rem" }}>{typeErrMsg}</div>
                    </FormGroup>
                    <Button>Add Record</Button>
                </Form>
            </div>
        );
    }
}

export default RecordForm;