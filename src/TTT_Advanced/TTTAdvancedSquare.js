import React from 'react';

class TTTAdvancedSquare extends React.Component {
    render() {
        return (
            <button
                className={`square ${this.props.winnerClass}`}
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export default TTTAdvancedSquare;