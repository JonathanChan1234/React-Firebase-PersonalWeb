class Obstacle {
    constructor(height, width, color, x, y, context) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.color = color;
        this.context = context;
        this.initObstacle();
    }

    initObstacle() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePosition() {
        this.x += -1;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    stopMoving() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    remove() {
        this.x = 0;
        this.y = 0;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, 0, 0);
    }

    resetPosition() {
        this.x = 100;
        this.y = 0;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Obstacle;