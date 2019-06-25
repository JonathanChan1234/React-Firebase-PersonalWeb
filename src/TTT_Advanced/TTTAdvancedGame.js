import React from 'react';
import TTTAdvancedBoard from './TTTAdvancedBoard';
import db from '../firebase/firestore';

const checkWinner = (currentState) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    var winningNodes = [];
    var winnerBlock = [];
    for (let k = 0; k < 9; ++k) {
        for (let i = 0; i < lines.length; ++i) {
            var [a, b, c] = lines[i];
            a = a + (9 * k);
            b = b + (9 * k);
            c = c + (9 * k);
            if (currentState[a] && currentState[a] === currentState[b] && currentState[a] === currentState[c]) {
                winningNodes.push(a);
                winningNodes.push(b);
                winningNodes.push(c);
                winnerBlock.push({ winner: currentState[a], winnerNodes: [a, b, c], winnerBlock: Math.floor(a / 9) })
            }
        }
    }
    return { winner: winnerBlock, winnerState: winningNodes };
}

const checkBoxAvailibity = (currentState, block) => {
    for (let i = block * 9; i < ((block + 1) * 9); ++i) {
        if (!currentState[i]) {
            return true;
        }
    }
    return false;
}

class TTTAdvancedGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: Array(81).fill(null),
            previousPosition: null,
            xIsCurrentUser: false,
            winnerRow: [],
            xScore: 0,
            oScore: 0,
            alertText: '',
            users: []
        };
    }

    componentDidMount() {        
        db.collection('users').onSnapshot((snapspot) => {
            var users = []
            snapspot.forEach(user => {
                users.push(user.data());
            })
            this.setState({
                users: users
            })
            console.log(users)
        }); 
    }

    handleClick(index) {
        var currentState = this.state.currentState;
        var previousPosition = this.state.previousPosition;
        console.log(previousPosition)
        if (currentState[index]) {
            return;
        }

        if (previousPosition || previousPosition === 0) {
            let block = previousPosition % 9;

            // All the box in the block are selected
            if (!checkBoxAvailibity(currentState, block)) {
                this.updateState(index);
            }
            else if (index >= block * 9 && index < ((block + 1) * 9)) {
                this.updateState(index);
            } else {
                this.setState({
                    alertText: "Please select the correct box"
                });
            }
        } else {
            this.updateState(index);
        }
    }

    updateState(index) {
        var currentState = this.state.currentState;
        currentState[index] = (this.state.xIsCurrentUser) ? 'X' : 'O';

        const { winner, winnerState } = checkWinner(currentState);
        if (winner.length > 0) {
            this.updateSocre(winner);
        }

        this.setState({
            currentState: currentState,
            xIsCurrentUser: !this.state.xIsCurrentUser,
            previousPosition: index,
            alertText: "",
            winnerRow: winnerState,
        });
    }

    updateSocre(gameState) {
        var xScore = 0;
        var oScore = 0;

        gameState.forEach(element => {
            if (element.winner === 'O') {
                oScore++;
            } else {
                xScore++;
            }
        });

        this.setState({
            xScore: xScore,
            oScore: oScore,
        })
    }

    startNewGame() {
        this.setState({
            currentState: Array(81).fill(null),
            previousPosition: null,
            xIsCurrentUser: false,
            alertText: '',
            xScore: 0,
            oScore: 0
        })
    }

    render() {
        const currentState = this.state.currentState;
        const { winner, winnerState } = checkWinner(currentState);
        let status;
        if (winner) {
            // status = `Player ${(this.state.xIsCurrentUser) ? 'O' : 'X'} won the game`;

        } else {
            status = `Next Player is  ${(this.state.xIsCurrentUser) ? 'X' : 'O'}`;
        }
        let alertText = "";
        if (this.state.alertText !== "") alertText = this.state.alertText;
        console.log(this.state)
        return (
            <div id='container'>
                <h1>Ultimate Tic Tac Toe (Built by React)</h1>
                <div className='game-container'>
                    <TTTAdvancedBoard
                        squares={currentState}
                        currentBlock={this.state.previousPosition}
                        winnerState={winnerState}
                        onClick={i => this.handleClick(i)} />
                </div>
                <div id="winnerText">{status}</div>
                <div>{`X's Score: ${this.state.xScore}`}</div>
                <div>{`O's Score: ${this.state.oScore}`}</div>
                <div>{`${alertText}`}</div>
                <button id="newGameButton"
                    className="btn btn-primary"
                    onClick={() => this.startNewGame()}>Start A New Game</button>
            </div>
        );
    }
}

export default TTTAdvancedGame;