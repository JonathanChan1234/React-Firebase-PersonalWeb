import React from 'react';

class TTTSquare extends React.Component {
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

export default TTTSquare;