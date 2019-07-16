import React from 'react';
import OnlineGameBlock from './OnlineGameBlock';

const getBlockValue = (block_user, owner) => {
    if (block_user) {
        if (owner === block_user) {
            return "O";
        }
        return "X";
    }
}
class OnlineGameBoard extends React.Component {
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

        return <OnlineGameBlock
            winnerClass={`${winnerClass}`}
            key={index}
            value={getBlockValue(currentState[index], this.props.owner)}
            onClick={() => this.props.onClick(index)} />;
    }

    render() {
        return this.createBoard(3, 3);
    }
}

export default OnlineGameBoard;