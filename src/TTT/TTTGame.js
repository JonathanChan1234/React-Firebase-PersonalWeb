import React from 'react';
import TTTBoard from './TTTBoard'

const checkWinner = (currentState) => {
    const winState = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winState.length; ++i) {
        const [a, b, c] = winState[i];
        if (currentState[a] && currentState[a] === currentState[b] &&
            currentState[b] === currentState[c]) {
            return { winner: currentState[a], winnerState: winState[i] };
        }
    }
    return { winner: null, winnerState: null };
}

class TTTGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: Array(9).fill(null),
            xIsCurrentUser: false,
        }
    }

    startNewGame() {
        this.setState({
            currentState: Array(9).fill(null),
            xIsCurrentUser: false,
        });
    }

    handleClick(index) {
        const currentState = this.state.currentState;

        // Do not update the state when there is a winner and already occupied
        if (checkWinner(currentState).winner || currentState[index]) {
            return;
        }
        currentState[index] = this.state.xIsCurrentUser ? 'X' : 'O';
        this.setState({
            currentState: currentState,
            xIsCurrentUser: !(this.state.xIsCurrentUser)
        })
    }

    render() {
        const currentState = this.state.currentState;
        const { winner, winnerState } = checkWinner(currentState);
        let status;
        if (winner) {
            status = `Player ${(this.state.xIsCurrentUser) ? 'O' : 'X'} won the game`;
        } else {
            status = `Next Player is  ${(this.state.xIsCurrentUser) ? 'X' : 'O'}`;
        }

        return (
            <div id='container'>
                <h1>Tic Tac Toe (Built by React)</h1>
                <div className='game-board'>
                    <TTTBoard
                        squares = {currentState}
                        winnerState = {winnerState}
                        onClick = {i => this.handleClick(i)}/>
                </div>
                <div id="winnerText">{status}</div>

                <button id="newGameButton"
                    className="btn btn-primary"
                    onClick={() => this.startNewGame()}>Start A New Game</button>
            </div>
        );
    }
}

export default TTTGame;