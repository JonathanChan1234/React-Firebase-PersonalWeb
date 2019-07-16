import React from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';

import App from '../firebase/index';
import TTTGameTitle from './TTTGameTitle';
import TTTNewGameModal from './TTTNewGameModal';
import EnterTTTGameModal from './EnterTTTGameModal';

const app = new App();

const retrieveGameList = (snapshot) => {
    let games = [];
    snapshot.forEach(item => {
        let game = {
            id: item.id,
            game_state: item.data().game_state,
            password: item.data().password,
            name: item.data().name,
            description: item.data().description,
            created_at: item.data().created_at
        }
        games.push(game);
    });
    return games;
}
class OnlineTTTMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            showNewGameModal: false,
            showPasswordModal: false,
            currentGame: {}
        };
    }

    componentDidMount() {
        this.unsubscribe = app.firestore.collection("TTTGames")
            .orderBy('created_at', 'desc')
            .onSnapshot((snapshot) => {
                this.setState({ games: retrieveGameList(snapshot) });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    startNewGame(e, game) {
        e.preventDefault();
        app.firestore.collection("TTTGames").add({
            game_state: Array(9).fill(""),
            owner: app.auth.currentUser.uid,
            name: game.name,
            description: game.description,
            next_player: game.next_player,
            password: game.password,
            created_at: game.created_at,
            updated_at: game.updated_at
        }).then(ref => {
            this.setState({ show: false });
            localStorage.setItem("currentGame", ref.id);
            this.props.history.push(`/online/${ref.id}`);
        }).catch(err => {
            alert("add new game " + err);
            console.log(err);
        });
    }

    /**
     * Enter game room after clicking the game card
     */
    enterGameRoom(game) {
        // Dismiss the modal
        this.setState({ showPasswordModal: false });
        // Store the current game id into local storage
        localStorage.setItem("currentGame", game.id);
        // redirect to the game room
        this.props.history.push(`/online/${game.id}`)
    }

    /**
     * sort all the game owned
     */
    sortOwnGame() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.unsubscribe = app.firestore.collection("TTTGames")
            .where("owner", "==", app.auth.currentUser.uid)
            .orderBy('created_at', 'desc')
            .onSnapshot((snapshot) => {
                this.setState({ games: retrieveGameList(snapshot) });
            });
    }

    /**
     * show all the game room
     */
    showAllGame() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.unsubscribe = app.firestore.collection("TTTGames")
            .orderBy('created_at', 'desc')
            .onSnapshot((snapshot) => {
                this.setState({ games: retrieveGameList(snapshot) });
            });
    }

    /**
     * Delete all game entries (for testing only)
     */
    deleteAllGameEntry() {
        axios.post("http://localhost:5001/arduino-wifi-f0e68/us-central1/app/games/deleteAllGame")
            .then((response) => {
                console.log(response)
                if (response.data.success === 1) {
                    alert("All entry deleted");
                } else {
                    alert("Something is wrong");
                }
            }).catch(err => console.log(err));
    }

    renderGameMenuList() {
        return this.state.games.map((game, index) => {
            return (
                <ListGroup.Item key={index}>
                    <TTTGameTitle
                        game={game}
                        handleOnClick={(game) => { this.setState({ currentGame: game, showPasswordModal: true }); }} />
                </ListGroup.Item>
            );
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="d-flex flex-column w-25">
                    <Button
                        variant="primary"
                        className="mb-1"
                        onClick={() => this.setState({ showNewGameModal: true })}>
                        Start A New Game</Button>
                    <Button
                        variant="success"
                        className="mb-1"
                        onClick={() => { this.sortOwnGame() }}>
                        Your Own Game</Button>
                    <Button
                        variant="warning"
                        className="mb-1"
                        onClick={() => { this.showAllGame() }}>
                        Show All Game</Button>
                    <Button
                        variant="danger"
                        className="mb-3"
                        onClick={() => { this.deleteAllGameEntry() }}>
                        Delete All Entries</Button>
                </div>

                <EnterTTTGameModal
                    game={this.state.currentGame}
                    show={this.state.showPasswordModal}
                    onHide={() => { this.setState({ showPasswordModal: false }) }}
                    enterGameRoom={this.enterGameRoom.bind(this)} />
                <TTTNewGameModal
                    startNewGame={this.startNewGame.bind(this)}
                    show={this.state.showNewGameModal}
                    onHide={() => { this.setState({ showNewGameModal: false }); }} />
                <ListGroup
                    style={{ width: '30rem' }}>
                    {this.renderGameMenuList()}
                </ListGroup>
            </div>
        );
    }
}

export default OnlineTTTMenu;