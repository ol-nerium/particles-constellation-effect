export default class Particle {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;
    0;
    this.radius = Math.floor(Math.random() * 15 + 7);
    this.buffer = this.radius * 4;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - 2 * this.radius);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;

    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.8;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update() {
    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = distance / this.effect.mouse.radius;
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX -= Math.cos(angle) * force;
        this.pushY -= Math.sin(angle) * force;
      }
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < this.buffer) {
      this.x = this.buffer;
      this.vx *= -1;
    }
    if (this.x > this.effect.width - this.buffer) {
      this.x = this.effect.width - this.buffer;
      this.vx *= -1;
    }
    if (this.y < this.buffer) {
      this.y = this.buffer;
      this.vy *= -1;
    }
    if (this.y > this.effect.height - this.buffer) {
      this.y = this.effect.height - this.buffer;
      this.vy *= -1;
    }
  }

  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }
}
