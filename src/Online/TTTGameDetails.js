import React from 'react';

class TTTGameDetails extends React.Component {
    isActiveTab() {
        if (this.props.active === 'active') return "show active";
        return "";
    }

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