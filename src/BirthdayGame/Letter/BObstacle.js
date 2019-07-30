class BObstacle {
    constructor(color, context) {
        this.x1 = 410;
        this.y1 = 0;
        this.x2 = 410;
        this.y2 = 65;
        this.height = 10;
        this.width = 60;
        this.x3 = 410;
        this.y3 = 140;
        this.x4 = 400;
        this.y4 = 0;
        this.x5 = 470;
        this.y5 = 10;
        this.x6 = 470;
        this.y6 = 75;
        this.x_speed = 0;
        this.color = color;
        this.context = context;
    }

    updatePosition() {
        this.x1 -= 1;
        this.x2 -= 1;
        this.x3 -= 1;
        this.x4 -= 1;
        this.x5 -= 1;
        this.x6 -= 1;
        this.updateFrame();
    }

    stopMoving() {
        this.updateFrame();
    }

    updateFrame() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x1, this.y1, 60, 10);
        this.context.fillRect(this.x2, this.y2, 60, 10);
        this.context.fillRect(this.x3, this.y3, 60, 10);
        this.context.fillRect(this.x4, this.y4, 10, 150);
        this.context.fillRect(this.x5, this.y5, 10, 55);
        this.context.fillRect(this.x6, this.y6, 10, 65);
    }
}

export default BObstacle;