import React from 'react';
import { Button, Card } from 'react-bootstrap';
import GameBlock from './GameBlock';
import Obstacle from './Obstacle';

class BirthdayGame extends React.Component {
    constructor(props) {
        super(props);
        this.canvasHeight = 360;
        this.canvasWidth = 480;
        this.canvasRef = React.createRef();
        this.state = {
            x: 50,
            y: 120,
            x_speed: 0,
            y_speed: 0
        };
    }

    componentDidMount() {
        this.gameContext = this.canvasRef.current.getContext('2d');
        this.gameBlock = new GameBlock(30, 30, "red", 50, 120, this.gameContext);
        this.obstacle = new Obstacle(150, 10, "green", 100, 160, this.gameContext);
        this.gameUpdateInterval = setInterval(() => {
            this.updateGameState();
        }, 20);
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            switch (key) {
                case "ArrowUp":
                    this.gameBlock.moveUp();
                    break;
                case "ArrowDown":
                    this.gameBlock.moveDown();
                    break;
                case "ArrowLeft":
                    this.gameBlock.moveLeft();
                    break;
                case "ArrowRight":
                    this.gameBlock.moveRight();
                    break;
                default:
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            this.gameBlock.stop();
        });
    }

    componentWillUnmount() {
        clearInterval(this.gameUpdateInterval);
        document.removeEventListener("keydown");
        document.removeEventListener('keyup');
    }

    updateGameState() {
        this.clearGameArea();
        this.obstacle.updatePosition();
        if(this.gameBlock.checkCrash(this.obstacle)) this.gameBlock.stop();
        this.gameBlock.updateBlockPosition();
        this.setState({
            x: this.gameBlock.x,
            y: this.gameBlock.y,
            x_speed: this.gameBlock.x_speed,
            y_speed: this.gameBlock.y_speed
        });
    }

    resetGameArea() {
        this.clearGameArea();
        this.gameBlock.resetPosition();
    }

    clearGameArea() {
        this.gameContext.clearRect(0, 0, 480, 360);
    }

    moveUp() {
        this.gameBlock.moveUp();
    }

    moveDown() {
        this.gameBlock.moveDown();
    }

    moveLeft() {
        this.gameBlock.moveLeft();
    }

    moveRight() {
        this.gameBlock.moveRight();
    }

    render() {
        return (
            <div>
                <h5>Birthday Game</h5>
                <div className="d-flex flex-row align-items-center w-100">
                    <canvas
                        ref={this.canvasRef}
                        id="birthday-game-area"
                        className="game-area"
                        height="360px"
                        width="480px" />
                    <div className="d-flex flex-column m-3">
                        <Button onClick={() => { this.resetGameArea() }}>Clear Game Area</Button>
                        <Button onClick={() => { this.moveUp() }}>Move Up</Button>
                        <br></br>
                        <Button onClick={() => { this.moveLeft() }}>Move Left</Button>
                        <Button onClick={() => { this.moveRight() }}>Move Right</Button>
                        <br></br>
                        <Button onClick={() => { this.moveDown() }}>Move Down</Button>
                    </div>
                    <div className="m-3">
                        <Card>
                            <Card.Header>Status</Card.Header>
                            <Card.Text>x: {this.state.x}</Card.Text>
                            <Card.Text>y: {this.state.y}</Card.Text>
                            <Card.Text>x_speed: {this.state.x_speed}</Card.Text>
                            <Card.Text>y_speed: {this.state.y_speed}</Card.Text>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default BirthdayGame;