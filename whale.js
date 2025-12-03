export default class Whale {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * 0.4;
    this.y = this.effect.height * 0.5;
    this.image = document.getElementById("whale3");
    this.angle = 0;
    this.va = 0.01;
    this.curve = this.effect.height * 0.35;
    this.spriteWidth = 420;
    this.spriteHeight = 285;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
    this.maxFrame = 38;
    this.frameTimer = 0;
    this.frameInterval = 1000 / 60;
    this.radius = 200;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(Math.cos(this.angle) * 0.4);
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.spriteWidth * 0.5,
      0 - this.spriteHeight * 0.5,
      this.spriteWidth,
      this.spriteHeight
    );
    context.restore();
  }

  update(deltaTime) {
    this.angle += this.va;
    this.y = this.effect.height * 0.5 + Math.sin(this.angle) * this.curve;
    if (this.angle > Math.PI * 2) this.angle = 0;

    // fps
    if (this.frameTimer > this.frameInterval) {
      // sprite animation

      this.frameX < this.maxFrame ? (this.frameX += 1) : (this.frameX = 0);
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
}
