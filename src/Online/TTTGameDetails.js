import React from 'react';

class TTTGameDetails extends React.Component {
    render() {
        return (
            <div className={"tab-pane fade " + this.isActiveTab()}
                id={`list-${this.props.name}`}
                role="tabpanel"
                aria-labelledby={`list-${this.props.name}-list`}>
                {this.props.content}</div>
        );
    }
}

export default TTTGameDetails;