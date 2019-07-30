class GameBlock {
    constructor(height, width, color, x, y, context) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 0;
        this.gravity_speed = 0;
        this.gravity = 0.05;
        this.color = color;
        this.context = context;
        this.initBlock();
    }

    initBlock() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    resetPosition() {
        this.x = 50;
        this.y = 330;
        this.x_speed = 0;
        this.y_speed = 0;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    updateBlockPosition() {
        this.gravity_speed += this.gravity;
        this.y_speed += this.gravity;
        this.x = this.x + this.x_speed;
        this.y = this.y + this.y_speed;
        this.gravity = 0.05;
        if (this.x < 0) this.x = 0;
        if (this.x > 450) this.x = 450;
        if (this.y < 0) this.y = 0;
        if (this.y > 330) {
            this.y = 330;
            this.gravity = 0;
            this.y_speed = 0;
        }
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCrash(obstacle) {
        let selfLeft = this.x;
        let selfRight = this.x + this.width;
        let selfUp = this.y;
        let selfDown = this.y + this.height;
        let obsLeft = obstacle.x;
        let obsRight = obstacle.x + obstacle.width;
        let obsUp = obstacle.y;
        let obsDown = obstacle.y + obstacle.height;
        let x_crash, y_crash = false;
        if (selfLeft <= obsRight &&
            (selfRight >= obsLeft || selfRight >= obsRight)) {
            x_crash = true;
        }
        if ((selfUp >= obsUp && selfUp <= obsDown) ||
            (selfDown >= obsUp && selfDown <= obsDown)) {
            y_crash = true;
        }
        if (x_crash && y_crash) {
            console.log("game over")
            return true;
        }
        return false;
    }

    accelerateUp(speed) {
        this.gravity = speed;
    }

    stop() {
        this.x_speed = 0;
        this.y_speed = 0;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp() {
        // this.x_speed = 0;
        this.y_speed = -1;
    }

    moveDown() {
        // this.x_speed = 0;
        this.y_speed = 1;
    }

    moveLeft() {
        // this.y_speed = 0;
        this.x_speed = -1;
    }

    moveRight() {
        // this.y_speed = 0;
        this.x_speed = 1;
    }
}

export default GameBlock;