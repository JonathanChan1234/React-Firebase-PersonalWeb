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
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Obstacle;