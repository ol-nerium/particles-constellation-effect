export default class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 7 + 3);

    this.x = this.effect.element.x + Math.random() * this.effect.element.width;

    this.y = -Math.random() * this.effect.height * 0.5;

    this.vx = Math.random() * 2 - 1;
    this.vy = 0;
    this.gravity = this.radius * 0.001;
    this.friction = 0.8;
    this.bounced = 0;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    //for collision detection
    if (this.effect.debug) {
      context.fillRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }

  update() {
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    if (
      this.y > this.effect.height + this.radius + this.effect.maxDistance ||
      this.x < -this.radius - this.effect.maxDistance ||
      this.x > this.effect.width + this.radius + this.effect.maxDistance
    ) {
      this.reset();
      // this.y = this.effect.height - this.radius;
      // this.vy *= -0.6;
    }
    //collision detection:
    // if (
    //   rect1.x < rect2.x + rect2.w &&
    //   rect1.x + rect1.x > rect2.x &&
    //   rect1.y < rect2.y + rect2.h &&
    //   rect1.h + rect1.y > rect2.y
    // ) {
    //   //collision detected!
    // }
    if (
      this.x - this.radius <
        this.effect.element.x + this.effect.element.width &&
      this.x + this.radius > this.effect.element.x &&
      this.y - this.radius < this.effect.element.y + 5 &&
      this.y + this.radius > this.effect.element.y &&
      this.bounced < 10
    ) {
      //collision detected!
      this.vx *= 1.5;
      this.vy *= -0.5;
      this.y = this.effect.element.y - this.radius;
      this.bounced += 1;
    }
  }

  reset() {
    this.x = this.effect.element.x + Math.random() * this.effect.element.width;
    this.y =
      -this.radius -
      this.effect.maxDistance -
      Math.random() * this.effect.height * 0.2;
    this.bounced = 0;

    this.vy = 0;
    this.vx = Math.random() * 2 - 1;
  }
}
