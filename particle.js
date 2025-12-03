export default class Particle {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 6 + 1);
    this.imageSize = Math.floor(Math.random() * 6 + 8) * this.radius;
    this.halfImageSize = this.imageSize / 2;
    this.x = Math.random() * (this.effect.width + this.effect.maxDistance * 2);
    this.y = Math.random() * this.effect.height;
    this.vx = -1.5;
    this.vy = 0;
    this.initialYPosition = this.y;

    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.99;
    this.image = document.getElementById("star");
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.x - this.halfImageSize,
      this.y - this.halfImageSize,
      this.imageSize,
      this.imageSize
    );
  }

  update() {
    const dx = this.x - this.effect.whale.x;
    const dy = this.y - this.effect.whale.y;
    const distance = Math.hypot(dx, dy);
    const force = this.effect.whale.radius / distance;
    if (distance < this.effect.whale.radius) {
      const angle = Math.atan2(dy, dx);
      this.pushY += Math.sin(angle) * force;
      this.pushX += Math.cos(angle) * force;
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < -this.imageSize - this.effect.maxDistance) {
      this.x = this.effect.width + this.imageSize + this.effect.maxDistance;
    }

    if (this.y < -this.halfImageSize) {
      this.y = this.effect.height + this.halfImageSize;
      this.x = Math.random() * this.effect.width;
    }
    if (this.y > this.effect.height + this.halfImageSize) {
      this.y = -this.halfImageSize;
      this.x = Math.random() * this.effect.width;
    }

    if (this.y < this.initialYPosition)
      this.vy = (Math.random() / 100) * this.imageSize;

    if (this.y > this.initialYPosition)
      this.vy = -(Math.random() / 100) * this.imageSize;

    if (
      this.y < this.initialYPosition * 0.98 &&
      this.y < this.initialYPosition * 0.98
    )
      this.vy = 0;
  }

  reset() {
    this.x = Math.random() * (this.effect.width + this.effect.maxDistance * 2);
    this.y = Math.random() * this.effect.height;
  }
}
