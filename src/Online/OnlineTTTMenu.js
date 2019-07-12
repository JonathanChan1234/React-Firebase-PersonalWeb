import React from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';

import App from '../firebase/index';
import TTTGameTitle from './TTTGameTitle';
import TTTNewGameModal from './TTTNewGameModal';
import TTTGamePasswordModal from './TTTGamePasswordModal';

const app = new App();
class OnlineTTTMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            showNewGameModal: false,
            showPasswordModal: false,
            currentGame: {}
        };
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = app.firestore.collection("TTTGames")
            .orderBy('name', 'desc')
            .onSnapshot((snapshot) => {
                var games = [];
                snapshot.forEach(item => {
                    let game = {
                        id: item.id,
                        game_state: item.data().game_state,
                        password: item.data().password,
                        name: item.data().name,
                        created_at: item.data().created_at
                    }
                    games.push(game);
                });
                this.setState({ games: games });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    startNewGame(e, game) {
        e.preventDefault();
        app.firestore.collection("TTTGames").add({
            game_state: [],
            owner: app.auth.currentUser.uid,
            name: game.name,
            next_player: game.next_player,
            password: game.password,
            created_at: game.created_at,
            updated_at: game.updated_at
        }).then(ref => {
            this.setState({ show: false });
            localStorage.setItem("currentGame", ref.id);
            this.props.history.push('/simple');
        }).catch(err => {
            alert("add new game " + err);
            console.log(err);
        });
    }

    renderGameMenuList() {
        return this.state.games.map(game => {
            return (
                <ListGroup.Item>
                    <TTTGameTitle
                        key={game.id}
                        game={game}
                        handleOnClick={this.onItemClick} />
                </ListGroup.Item>
            );
        });
    }

    onItemClick(game) {
        this.setState({ currentGame: game, showPasswordModal: true });
    }

    enterGameRoom() {
        this.setState({ showPasswordModal: false })
    }

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

    render() {
        let hideModal = () => {
            this.setState({ showNewGameModal: false });
        }

        return (
            <div>
                <Button
                    variant="primary"
                    className="mb-5"
                    onClick={() => this.setState({ showNewGameModal: true })}>
                    Start A New Game</Button>
                <Button
                    variant="warning"
                    className="mb-5"
                    onClick={() => { this.deleteAllGameEntry() }}>
                    Delete All Entries</Button>
                <TTTGamePasswordModal
                    game={this.state.currentGame}
                    show={this.state.showPasswordModal}
                    onHide={() => { this.setState({ showPasswordModal: false }) }}
                    enterGameRoom={this.enterGameRoom.bind(this)} />
                <TTTNewGameModal
                    startNewGame={this.startNewGame.bind(this)}
                    show={this.state.showNewGameModal}
                    onHide={hideModal} />
                <ListGroup
                    style={{ width: '30rem' }}>
                    {this.renderGameMenuList()}
                </ListGroup>
            </div>
        );
    }
}

export default OnlineTTTMenu;