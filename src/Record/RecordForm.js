import React from 'react';
import Firebase from 'firebase/firebase'
import App from '../firebase/index';
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';

const app = new App();
class RecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errMsg: Array(4).fill(""),
            submitMessage: "",
            currentItem: "",
            currentAmount: 0,
            currentCategory: "food",
            currentType: "",
            incomeChecked: false,
            outcomeChecked: true
        };
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let form = e.currentTarget;
        let errMsg = Array(4).fill("");
        if (!form.checkValidity()) {
            // Check error in every input element in the form
            for (let i = 0; i < form.elements.length; ++i) {
                let formElement = form.elements[i];
                // Check whether the input element is valid/ need to be validated/ is not button
                if (!formElement.validity.valid && formElement.tagName !== 'button' &&
                    formElement.willValidate) {
                    errMsg[i] = formElement.validationMessage;
                }
            }
        } else {
            app.firestore.collection("records").add({
                uid: app.auth.currentUser.uid,
                amount: parseInt(this.state.currentAmount),
                description: this.state.currentItem,
                category: this.state.currentCategory,
                type: this.state.currentType,
                date: Firebase.firestore.Timestamp.fromDate(new Date())
            }).then(ref => {
                console.log(`ref ${ref.id} added`)
                this.setState({
                    submitMessage: "Record Added",
                    currentItem: "",
                    currentAmount: 0,
                    currentCategory: "food",
                    currentType: "",
                    incomeChecked: false,
                    outcomeChecked: true
                });
            }).catch(err => {
                this.setState({ submitMessage: err.message });
            });
        }
        this.setState({ errMsg: errMsg });
    }

    render() {
        const [itemErrMsg, amountErrMsg, categoryErrMsg, typeErrMsg] = this.state.errMsg;
        return (
            <Form
                noValidate
                style={{ "fontSize": "1rem" }}
                className="d-flex flex-column align-item-center w-50"
                validated={this.state.validated}
                onSubmit={(e) => { this.handleFormSubmit(e) }}>
                <FormGroup>
                    <Form.Label>Item</Form.Label>
                    <FormControl
                        name="item"
                        onChange={(e) => this.setState({ currentItem: e.target.value })}
                        value={this.state.currentItem}
                        className="mt-1"
                        type="text"
                        placeholder="Item"
                        aria-label="Item"
                        maxLength="20"
                        aria-describedby="basic-addon1"
                        required >
                    </FormControl>
                    <div className='text-danger' style={{ "fontSize": "1rem" }}>{itemErrMsg}</div>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Amount</Form.Label>
                    <FormControl
                        name="amount"
                        onChange={(e) => this.setState({ currentAmount: e.target.value })}
                        value={this.state.currentAmount}
                        min="1"
                        className="mt-1"
                        type="number"
                        placeholder="Amount"
                        aria-label="Amount"
                        aria-describedby="basic-addon1"
                        required >
                    </FormControl>
                    <div className='text-danger' style={{ "fontSize": "1rem" }}>{amountErrMsg}</div>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Category</Form.Label>
                    <FormControl
                        className="mt-1"
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
                    <FormLabel>Type</FormLabel>
                    <Form.Check
                        onChange={() => {
                            this.setState({
                                incomeChecked: !this.state.incomeChecked,
                                outcomeChecked: !this.state.outcomeChecked
                            });
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
                                outcomeChecked: !this.state.outcomeChecked
                            });
                        }}
                        checked={this.state.outcomeChecked}
                        type="radio"
                        id="outcome"
                        label="outcome">
                    </Form.Check>
                    <div className='text-danger' style={{ "fontSize": "1rem" }}>{typeErrMsg}</div>
                </FormGroup>
                <Button type="submit">Add Record</Button>
                <div className='text-danger' style={{ "fontSize": "1rem" }}>{this.state.submitMessage}</div>
            </Form>
        );
    }
}

export default RecordForm;