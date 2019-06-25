import React from 'react';
import { findAllMonth } from '../Utility/utils';

class RecordFilter extends React.Component {
    getOption() {
        let month = findAllMonth(this.props.recordList);
        let options = [];
        month.forEach(element => {
            options.push(<option value={element} key={element}>{element}</option>)
        })
        return options;
    }

    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <select
                            className="form-control form-control-lg"
                            value={this.props.sortOrder}
                            onChange={(e) => this.props.onFilterChange(e)}>
                            <option>Sort By Date</option>
                            <option>Sort By Amount</option>
                            <option>Sort By Item</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <select
                            value={this.props.dateFilter}
                            onChange={(e) => this.props.onDateFilterChange(e)}
                            className="form-control form-control-lg">
                            {this.getOption()}
                        </select>
                    </div>
                </div>
            </form>
        )
    }
}

export default RecordFilter;