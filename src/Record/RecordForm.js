import React from 'react';
import Firebase from  'firebase/firebase'
import App from '../firebase/index';

class RecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: "",
            currentAmount: 0,
            currentCategory: "food",
            currentType: "",
        };
        this.app = new App();
    }

    submitRecord(e) {
        e.preventDefault();
        if (this.state.currentAmount !== 0 &&
            this.state.currentItem !== "" &&
            this.state.currentType !== "") {
            this.app.firestore.collection("records").add({
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

    handleItemChange(e) {
        this.setState({
            currentItem: e.target.value
        });
    }

    handleAmountChange(e) {
        this.setState({
            currentAmount: e.target.value
        });
    }

    handleCategoryChange(e) {
        this.setState({
            currentCategory: e.target.value
        });
    }

    handleTypeChange(e) {
        this.setState({
            currentType: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={(e) => this.submitRecord(e)}
                    className="needs-validation"
                    noValidate>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="itemInput">Item</label>
                            <input
                                onChange={(e) => this.handleItemChange(e)}
                                value={this.state.currentItem}
                                id="itemInput"
                                type="text"
                                name="item"
                                className="form-control-lg"
                                aria-describedby="itemHelp"
                                placeholder="Enter Item"
                                required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-tooltip">
                                You must fill in the item name
                            </div>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="amountInput">Amount</label>
                            <input
                                onChange={(e) => this.handleAmountChange(e)}
                                value={this.state.currentAmount}
                                id="amountInput"
                                type="number"
                                name="amount"
                                className="form-control-lg"
                                aria-describedby="amountHelp"
                                placeholder="Enter Amount"
                                required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="categorySelect">Category</label>
                        <select
                            onChange={(e) => this.handleCategoryChange(e)}
                            value={this.state.currentCategory}
                            className="form-control form-control-lg"
                            id="categorySelect"
                            name="category"
                            required>
                            <option>Food</option>
                            <option>Transportation</option>
                            <option>Work</option>
                            <option>Entertainment</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input custom-control-input"
                                value="income"
                                onClick={(e) => this.handleTypeChange(e)}
                                name="type"
                                type="radio"
                                id="incomeRadio"
                                required />
                            <label className="form-check-label custom-control-label" htmlFor="incomeRadio">Income</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input custom-control-input"
                                value="expenditure"
                                onChange={(e) => this.handleTypeChange(e)}
                                name="type"
                                type="radio"
                                id="expenditureRadio"
                                required />
                            <label className="form-check-label custom-control-label" htmlFor="expenditureRadio">Expenditure</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </form>
            </div>
        );
    }
}

export default RecordForm;