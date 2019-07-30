class LObstacle {
    constructor(color, context) {
        // height = 150, width = 10
        this.x1 = 400;
        this.y1 = 0;
        // height = 10, width = 50
        this.x2 = 410;
        this.y2 = 140;
        this.color = color;
        this.context = context;
    }

    updatePosition() {
        this.x1 -= 1;
        this.x2 -= 1;
        this.updateFrame();
    }

    stopMoving() {
        this.updateFrame();
    }

    updateFrame() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x1, this.y1, 10, 150);
        this.context.fillRect(this.x2, this.y2, 70, 10);
    }
}

export default LObstacle;