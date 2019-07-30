class YObstacle {
    constructor(color, context) {
        // height = 40, width = 10
        this.x1 = 400;
        this.y1 = 0;
        // height = 10, width = 70
        this.x2 = 405;
        this.y2 = 60;
        // height = 10, width = 70
        this.x3 = 430;
        this.y3 = 80;
        // height = 10, width = 10
        this.x4 = 465;
        this.y4 = 0;
        // // height = 60, width = 10
        // this.x5 = 460;
        // this.y5 = 0;
        this.color = color;
        this.context = context;
    }

    updatePosition() {
        this.x1 -= 1;
        this.x2 -= 1;
        this.x3 -= 1;
        this.x4 -= 1;
        // this.x5 -= 1;
        this.updateFrame();
    }

    stopMoving() {
        this.updateFrame();
    }

    updateFrame() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x1, this.y1, 20, 60);
        this.context.fillRect(this.x2, this.y2, 70, 20);
        this.context.fillRect(this.x3, this.y3, 20, 70);
        this.context.fillRect(this.x4, this.y4, 20, 60);
        // this.context.fillRect(this.x5, this.y5, 20, 60);
    }
}

export default YObstacle;