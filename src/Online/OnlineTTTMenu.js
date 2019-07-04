import React from 'react';
import axios from 'axios';

import { Button, ListGroup } from 'react-bootstrap';
import db from '../firebase/firestore';
import TTTGameTitle from './TTTGameTitle';
import TTTNewGameModal from './TTTNewGameModal';

class OnlineTTTMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            showNewGameModal: false
        };
    }

    componentDidMount() {
        this.unsubscribe = db.collection("TTTGames")
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
        db.collection("TTTGames").add({
            game_state: [],
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
                        type={(game.password) ? "private" : "public"}
                        name={game.name}
                        created_at={game.created_at} />
                </ListGroup.Item>
            );
        });
    }

    testCloudFunction() {
        axios.get("http://localhost:5001/arduino-wifi-f0e68/us-central1/test/hello")
            .then((response) => {
                console.log(response)
            })
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
                <Button variant="warning"
                    className="mb-5"
                    onClick={() => { this.testCloudFunction() }}>
                    Delete All Entries
                </Button>
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