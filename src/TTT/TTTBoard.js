import React from 'react';
import TTTSquare from './TTTSquare';

/**
 * props:
 * squares: currentState
 * winnerState: winning block (3)
 */
class TTTBoard extends React.Component {

    createBoard(row, col) {
        var board = [];
        let blockCounter = 0;
        for (let i = 0; i < row; ++i) {
            const columns = [];
            for (let i = 0; i < col; ++i) {
                columns.push(this.renderSquare(blockCounter++));
            }
            board.push(<div key={i} className="board-row">{columns}</div>);
        }
        return board;
    }

    renderSquare(index) {
        const currentState = this.props.squares;
        const winnerState = this.props.winnerState;

        const winnerClass = (winnerState &&
            ((winnerState[0] === index) ||
                (winnerState[1] === index) ||
                (winnerState[2] === index))) ?
            'square-green' : ''

        return <TTTSquare
            winnerClass={`${winnerClass}`}
            key={index}
            value={currentState[index]}
            onClick={() => this.props.onClick(index)}
        />;
    }

    render() {
        return this.createBoard(3, 3);
    }
}

export default TTTBoard;