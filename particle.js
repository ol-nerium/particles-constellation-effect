export default class Particle {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 8 + 8);
    this.minRadius = this.radius;
    this.maxRadius = this.radius * 7;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - 2 * this.radius);
    this.vx = Math.random() * 0.2 - 0.1;
    this.vy = Math.random() * 0.2 - 0.1;

    // this.pushX = 0;
    // this.pushY = 0;
    // this.friction = 0.8;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.save();
    context.fillStyle = "white";
    context.beginPath();
    context.arc(
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.3,
      this.radius * 0.6,
      0,
      Math.PI * 2
    );
    context.fill();
    context.restore();
  }

  update() {
    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = this.effect.mouse.radius / distance;
      if (distance < this.effect.mouse.radius && this.radius < this.maxRadius) {
        this.radius += 2;
      }
    }
    if (this.radius > this.minRadius) {
      this.radius -= 0.5;
    }

    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    }
    if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    }
    if (this.y > this.effect.height - this.radius) {
      this.y = this.effect.height - this.radius;
      this.vy *= -1;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - 2 * this.radius);
  }
}
