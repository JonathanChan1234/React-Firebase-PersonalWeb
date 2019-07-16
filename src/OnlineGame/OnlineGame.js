import React from 'react';
import Firebase from 'firebase/firebase';
import App from '../firebase/index';
import OnlineGameBoard from './OnlineGameBoard';

const app = new App();
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

const resetGameState = (gameId) => {
    app.firestore.collection("TTTGames").doc(gameId)
        .update({
            game_state: []
        }).then((result) => {
            alert("game reset");
        }).catch((err) => {
            console.log(err)
        });
}

class OnlineGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: "",
            opponent: "",
            name: "",
            description: "",
            created_at: "",
            updated_at: "",
            next_player: "",
            currentState: Array(9).fill(null),
        };
    }

    componentDidMount() {
        // Check if the browser contains the game token
        if (localStorage.getItem('currentGame')
            !== this.props.match.params.id) {
            this.props.history.push('/');
        }
        this.gameId = localStorage.getItem('currentGame');

        // Add snapshot listener for any game update
        this.unsubscribe = app.firestore.collection("TTTGames")
            .doc(localStorage.getItem('currentGame'))
            .onSnapshot(snapshot => {
                console.log(snapshot.data());
                this.updateGameState(snapshot.data());
            });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    updateGameState(game) {
        this.setState({
            updated_at: game.updated_at,
            next_player: game.next_player,
            owner: game.owner,
            currentState: game.game_state
        });
    }

    handleClick(index) {

        const currentState = this.state.currentState;
        var next_player;

        // Do not update the state when there is a winner and already occupied
        if (checkWinner(currentState).winner || currentState[index]) {
            return;
        }

        // Check if the user is the current player
        if (app.auth.currentUser.uid !== this.state.next_player) {
            console.log("You are not current player");
            return;
        }

        // update the current state with their uid
        if ((this.state.owner === app.auth.currentUser.uid)) {
            // If the current player is the owner
            currentState[index] = this.state.owner;
            next_player = this.state.opponent;
        } else {
            currentState[index] = this.state.opponent;
            next_player = this.state.owner;
        }

        console.log(currentState)

        app.firestore.collection("TTTGames")
            .doc(this.gameId)
            .update({
                updated_at: Firebase.firestore.Timestamp.fromDate(new Date()),
                game_state: currentState,
                next_player: next_player
            })
            .then(res => {
                console.log("update successfully")
            })
            .catch(err => {
                console.log("error")
            });
    }

    render() {
        const currentState = this.state.currentState;
        const { winner, winnerState } = checkWinner(currentState);
        let status;
        if (winner) {
            status = `Player ${(this.state.next_player) ? 'O' : 'X'} won the game`;
        } else {
            status = `Next Player is  ${(this.state.next_player) ? 'X' : 'O'}`;
        }

        return (
            <div id='container'>
                <div className='game-board'>
                    <OnlineGameBoard
                        owner={this.state.owner}
                        squares={currentState}
                        winnerState={winnerState}
                        onClick={i => this.handleClick(i)} />
                </div>
                <div id="winnerText">{status}</div>
                <button className="btn-primary" onClick={() => resetGameState(this.gameId)}>Reset Game State</button>
            </div>
        );
    }
}

export default OnlineGame;