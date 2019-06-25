import React from 'react';
import TTTAdvancedSquare from './TTTAdvancedSquare';

/**
 * props:
 * squares: currentState
 * winnerState: winning block (3)
 */
class TTTAdvancedBoard extends React.Component {

    createBoard(row, col, block) {
        const currentBlock = this.props.currentBlock % 9;
        var board = [];
        let blockCounter = 0;
        for (let k = 0; k < block; ++k) {
            var blo = [];
            for (let i = 0; i < row; ++i) {
                const columns = [];
                for (let j = 0; j < col; ++j) {
                    columns.push(this.renderSquare(blockCounter++));
                }
                blo.push(<div key={i} className="board-row">{columns}</div>);
            }
            if(currentBlock === k) {
                board.push(<div key={`game-board-${k}`} className={`game-board-${k} game-board-green game-board`}>{blo}</div>)
            } else {
                board.push(<div key={`game-board-${k}`} className={`game-board-${k} game-board`}>{blo}</div>)
            }
        }
        return board;
    }

    renderSquare(index) {
        const currentState = this.props.squares;
        const winnerState = this.props.winnerState;
        var winnerClass = '';
        for(let i = 0; i < winnerState.length; ++i) {
            if(winnerState[i] === index) {
                winnerClass = 'square-green';
                break;
            }
        }

        return <TTTAdvancedSquare
            winnerClass={`${winnerClass}`}
            key={index}
            value={currentState[index]}
            onClick={() => this.props.onClick(index)}
        />;
    }

    render() {
        return this.createBoard(3, 3, 9);
    }
}

export default TTTAdvancedBoard;