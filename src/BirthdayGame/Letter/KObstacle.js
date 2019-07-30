class KObstacle {
    constructor(color, context) {
        // height = 150, width = 10
        this.x1 = 400;
        this.y1 = 0;
        // height = 10, width = 50
        this.x2 = 410;
        this.y2 = 70;
        // height = 10, width = 10
        this.x3 = 460;
        this.y3 = 60;
        // height = 10, width = 10
        this.x4 = 460;
        this.y4 = 80;
        // height = 60, width = 10
        this.x5 = 470;
        this.y5 = 0;
        // height = 60, width = 10
        this.x6 = 470;
        this.y6 = 90;
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
        this.context.fillRect(this.x1, this.y1, 10, 150);
        this.context.fillRect(this.x2, this.y2, 50, 10);
        this.context.fillRect(this.x3, this.y3, 10, 10);
        this.context.fillRect(this.x4, this.y4, 10, 10);
        this.context.fillRect(this.x5, this.y5, 10, 60);
        this.context.fillRect(this.x6, this.y6, 10, 60);
    }
}

export default KObstacle;