import React from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import GameBlock from './GameBlock';
import Obstacle from './Obstacle';
import BObstacle from './Letter/BObstacle';
import HObstacle from './Letter/HObstacle';
import DObstacle from './Letter/DObstacle';
import KObstacle from './Letter/KObstacle';
import EObstacle from './Letter/EObstacle';
import LObstacle from './Letter/LObstacke';
import YObstacle from './Letter/YObstacle';

const message = ['h', 'b', 'd', 'k', 'e', 'l', 'l', 'y'];
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
            y_speed: 0,
            score: 0,
            obstacleFrame: 150,
            obstacle_count: 0
        };
    }

    // handle key down action
    handleKeyDown = function (event) {
        // event.preventDefault();
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
            case " ":
                this.gameBlock.accelerateUp(-0.2);
                break;
            default:
                break;
        }
        console.log("--------------------------")
    }

    // handle key up action
    handleKeyUp = function (event) {
        switch (event.key) {
            case " ":
                this.gameBlock.accelerateUp(0.1);
                break;
            default:
                this.gameBlock.stop();
                break;
        }
    }

    /**
     * 1. frame per obstacle default to be 150
     * 2. initialize game block and obstacles
     * 3. game frame rate: 50Hz
     * 4. register listener for keyup and keydown action
     */
    componentDidMount() {
        this.count = 0;
        this.frameNo = 0;
        this.obstacleFrame = 150;
        this.gameContext = this.canvasRef.current.getContext('2d');
        this.gameBlock = new GameBlock(30, 30, "red", 50, 120, this.gameContext);
        this.initGameObstacle();
        this.gameUpdateInterval = setInterval(() => {
            this.updateGameState();
        }, 20);
        document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
        document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    }

    componentWillUnmount() {
        clearInterval(this.gameUpdateInterval);
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    updateGameState() {
        this.clearGameArea();
        if (this.checkCrash(this.obstacles)) {
            this.freezeScreen();
        } else {
            this.updateFrame();
        }
        this.setState({
            x: this.gameBlock.x,
            y: this.gameBlock.y,
            x_speed: this.gameBlock.x_speed,
            y_speed: this.gameBlock.y_speed,
            obstacle_count: this.obstacles.length,
            score: this.frameNo
        });
    }

    checkCrash() {
        for (let i = 0; i < this.obstacles.length; ++i) {
            if (this.gameBlock.checkCrash(this.obstacles[i])) return true;
        }
        return false;
    }

    /**
     * update frame when the player is not yet dead
     */
    updateFrame() {
        this.obstacles.forEach(obstacle => {
            obstacle.updatePosition();
        });
        this.gameBlock.updateBlockPosition();
        this.frameNo++;
        if (this.frameNo === 1 || this.checkInterval()) {
            if (this.frameNo > 1000) {
                this.addCongratulationMessage();
            } else {
                let gap = Math.floor((Math.random() * 50) + 100);
                let upperHeight = Math.floor((Math.random() * 210) + 1);
                let lowerHeight = 360 - upperHeight - gap;
                this.obstacles.push(new Obstacle(upperHeight, 10, "green", 480, 0, this.gameContext));
                this.obstacles.push(new Obstacle(lowerHeight, 10, "yellow", 480, (upperHeight + gap), this.gameContext));
            }
        }
    }

checkInterval() {
    if ((this.frameNo / this.obstacleFrame) % 1 === 0) return true;
    return false
}

/**
 * freeze the screen when the player is dead
 */
freezeScreen() {
    this.gameBlock.stop();
    this.obstacles.forEach(obstacle => {
        obstacle.stopMoving();
    });
}

initGameObstacle() {
    this.obstacles = [];
    this.presetObstacle = [];
    this.count = 0;
}

resetGameArea() {
    this.frameNo = 0;
    this.initGameObstacle();
    this.clearGameArea();
    this.gameBlock.resetPosition();
}

clearGameArea() {
    this.gameContext.clearRect(0, 0, 480, 360);
}

updateObstacleFrame(e) {
    e.preventDefault();
    this.obstacleFrame = this.state.obstacleFrame;
}

addCongratulationMessage() {
    this.obstacleFrame = 150;
    switch (message[this.count]) {
        case 'h':
            this.obstacles.push(new HObstacle("pink", this.gameContext));
            break;
        case 'b':
            this.obstacles.push(new BObstacle("pink", this.gameContext));
            break;
        case 'd':
            this.obstacles.push(new DObstacle("pink", this.gameContext));
            break;
        case 'k':
            this.obstacles.push(new KObstacle("pink", this.gameContext));
            break;
        case 'e':
            this.obstacles.push(new EObstacle("pink", this.gameContext));
            break;
        case 'l':
            this.obstacles.push(new LObstacle("pink", this.gameContext));
            break;
        case 'y':
            this.obstacles.push(new YObstacle("pink", this.gameContext));
            break;
        default:
            break;
    }
    this.count = (this.count + 1) % message.length;
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
                </div>
                <div className="m-3">
                    <Form onSubmit={(e) => this.updateObstacleFrame(e)}>
                        <Form.Label>Frame per obstacle</Form.Label>
                        <FormControl
                            onChange={(e) => { this.setState({ obstacleFrame: e.target.value }) }}
                            name="frame"
                            min="10"
                            className="m-1"
                            type="number"
                            aria-describedby="basic-addon1"
                            required >
                        </FormControl>
                        <Button type="submit">Update</Button>
                    </Form>

                    <Card>
                        <Card.Header>Status</Card.Header>
                        <Card.Text>x: {this.state.x.toFixed(3)}</Card.Text>
                        <Card.Text>y: {this.state.y.toFixed(3)}</Card.Text>
                        <Card.Text>x_speed: {this.state.x_speed.toFixed(3)}</Card.Text>
                        <Card.Text>y_speed: {this.state.y_speed.toFixed(3)}</Card.Text>
                        <Card.Text>obstacle count: {this.state.obstacle_count}</Card.Text>
                        <Card.Text>score: {this.state.score}</Card.Text>
                    </Card>
                </div>
            </div>
        </div>
    );
}
}

export default BirthdayGame;