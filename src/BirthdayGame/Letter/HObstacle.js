class HObstacle {
    constructor(color, context) {
        this.x1 = 470;
        this.y1 = 0;
        this.x2 = 400;
        this.y2 = 0;
        this.x3 = 410;
        this.y3 = 60;
        this.x_speed = 0;
        this.color = color;
        this.context = context;
    }

    updatePosition() {
        this.x1 -= 1;
        this.x2 -= 1;
        this.x3 -= 1;
        this.updateFrame();
    }

    stopMoving() {
        this.updateFrame();
    }

    updateFrame() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x1, this.y1, 10, 150);
        this.context.fillRect(this.x2, this.y2, 10, 150);
        this.context.fillRect(this.x3, this.y3, 60, 10);
    }
}

export default HObstacle;