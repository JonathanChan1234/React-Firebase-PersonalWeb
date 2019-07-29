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

    handleKeyDown(event) {
        // event.preventDefault();
        const key = event.key;
        console.log(key)
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
            case " ":
                this.gameBlock.accelerateUp(-0.2);
                break;
            default:
                break;
        }
        console.log("--------------------------")
    }

    handleKeyUp(event) {
        switch (event.key) {
            case " ":
                this.gameBlock.accelerateUp(0.1);
                break;
            default:
                this.gameBlock.stop();
                break;
        }
    }

    componentDidMount() {
        this.frameNo = 0;
        this.gameContext = this.canvasRef.current.getContext('2d');
        this.gameBlock = new GameBlock(30, 30, "red", 50, 120, this.gameContext);
        this.obstacles = [];
        // this.obstacle = new Obstacle(150, 10, "green", 100, 260, this.gameContext);
        this.gameUpdateInterval = setInterval(() => {
            this.updateGameState();
        }, 20);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        clearInterval(this.gameUpdateInterval);
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    updateGameState() {
        this.clearGameArea();
        if (this.checkCrash(this.obstacles)) {
            this.gameBlock.stop();
            this.obstacle.stopMoving();
        } else {
            this.obstacles.forEach(obstacle => {
                obstacle.updatePosition();
            });
            this.gameBlock.updateBlockPosition();
        }
        this.frameNo++;
        if(this.frameNo === 1 && this.checkInterval()) {
            let x = 480;
            let y = 360 - 200; 
            this.obstacles.push(new Obstacle(150, 10, "green", x, y, this.gameContext))
        }
        this.setState({
            x: this.gameBlock.x,
            y: this.gameBlock.y,
            x_speed: this.gameBlock.x_speed,
            y_speed: this.gameBlock.y_speed
        });
    }

    checkCrash() {
        this.obstacles.forEach(obstacle => {
            if(this.gameBlock.checkCrash(obstacle)) return true;
        });
        return false;
    }
    
    checkInterval() {
        if((this.frameNo / 150) % 1 === 0) return true;
        return false
    }

    resetGameArea() {
        this.clearGameArea();
        this.gameBlock.resetPosition();
        this.obstacle.resetPosition();
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
                        <Button onClick={() => { this.resetGameArea() }}>Start New Game</Button>
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
                            <Card.Text>x: {this.state.x.toFixed(3)}</Card.Text>
                            <Card.Text>y: {this.state.y.toFixed(3)}</Card.Text>
                            <Card.Text>x_speed: {this.state.x_speed.toFixed(3)}</Card.Text>
                            <Card.Text>y_speed: {this.state.y_speed.toFixed(3)}</Card.Text>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default BirthdayGame;