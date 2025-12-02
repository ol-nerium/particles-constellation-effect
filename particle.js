export default class Particle {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;

    this.pushX = 0.5;
    this.pushY = 0.3;
    this.friction = 0.6;

    this.image = document.getElementById("stars_sprite");

    this.spriteWidth = 50;
    this.spriteHeight = 50;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);

    this.sizeModifier = Math.random() + 0.4;
    this.width = Math.floor(this.spriteWidth * this.sizeModifier);
    this.height = Math.floor(this.spriteHeight * this.sizeModifier);
    this.buffer = this.width * 2;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.minSize = this.width;
    this.maxSize = this.width * 2;

    this.x = this.width + Math.random() * (this.effect.width - this.width);
    this.y = this.height + Math.random() * (this.effect.height - this.height);
    this.vx = Math.random() * 1.2 - 0.6;
    this.vy = Math.random() * 1.2 - 0.6;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth, // sx rectangular
      this.frameY * this.spriteHeight, // sy area
      this.spriteWidth, // sw cropped out
      this.spriteHeight, // sh from stylesheet
      this.x - this.halfWidth,
      this.y - this.halfHeight,
      this.width,
      this.height
    );
  }

  update() {
    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = this.effect.mouse.radius / distance;
      if (distance < this.effect.mouse.radius && this.width < this.maxSize) {
        this.width += 2;
        this.height += 2;
      }
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }
    if (this.width > this.minSize) {
      this.width -= 1;
      this.height -= 1;
    }

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

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;
  }

  reset() {
    this.x = this.width + Math.random() * (this.effect.width - this.width);
    this.y = this.height + Math.random() * (this.effect.height - this.height);
  }
}
