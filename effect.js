import Particle from "./particle.js";
import { ctx } from "./script.js";

export default class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 250;

    const canvasRect = this.canvas.getBoundingClientRect();
    const captionRect = document
      .getElementById("caption")
      .getBoundingClientRect();
    this.element = {
      x: captionRect.x - canvasRect.x,
      y: captionRect.y - canvasRect.y,
      width: captionRect.width,
      height: captionRect.height,
    };
    this.maxDistance = 100;
    this.createParticles();

    this.debug = false;

    // this.mouse = {
    //   x: 0,
    //   y: 0,
    //   pressed: false,
    //   radius: 200,
    // };

    this.gradient = this.context.createLinearGradient(0, 0, 0, canvas.height); // x0 y0 x1 y1
    this.gradient.addColorStop(0, "red");
    this.gradient.addColorStop(0.5, "magenta");
    this.gradient.addColorStop(1, "pink");

    // ctx.fillStyle = this.gradient;
    // ctx.strokeStyle = this.gradient;

    window.addEventListener("keydown", (e) => {
      if (e.key === "d") {
        this.debug = !this.debug;
      }
    });

    window.addEventListener("resize", () => {
      this.resize(window.innerWidth, window.innerHeight);
    });
    // window.addEventListener("mousemove", (e) => {
    //   if (this.mouse.pressed) {
    //     this.mouse.x = e.x;
    //     this.mouse.y = e.y;
    //   }
    // });
    // window.addEventListener("mousedown", (e) => {
    //   this.mouse.pressed = true;
    //   this.mouse.x = e.x;
    //   this.mouse.y = e.y;
    // });
    // window.addEventListener("mouseup", (e) => {
    //   this.mouse.pressed = false;
    // });
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i += 1) {
      this.particles.push(new Particle(this, i));
    }
  }

  handleParticles(context) {
    context.fillStyle = this.gradient;
    context.strokeStyle = "white";
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
    if (this.debug) {
      context.strokeRect(
        this.element.x,
        this.element.y,
        this.element.width,
        this.element.height
      );
    }
  }

  connectParticles(context) {
    for (let a = 0; a < this.particles.length; a += 1) {
      for (let b = a; b < this.particles.length; b += 1) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        // const distance = Math.sqrt(dx * dx + dy * dy);
        const distance = Math.hypot(dx, dy); // same
        if (distance < this.maxDistance) {
          context.save();
          const opacity = 1 - distance / this.maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
  //
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    // resize event resets context to its default so:
    // this.element = document.getElementById("caption").getBoundingClientRect();
    this.canvasRect = this.canvas.getBoundingClientRect();
    this.captionRect = document
      .getElementById("caption")
      .getBoundingClientRect();
    this.element = {
      x: this.captionRect.x - this.canvasRect.x,
      y: this.captionRect.y - this.canvasRect.y,
      width: this.captionRect.width,
      height: this.captionRect.height,
    };

    // this.gradient = this.context.createLinearGradient(0, 0, width, height); // x0 y0 x1 y1
    // this.gradient.addColorStop(0, "red");
    // this.gradient.addColorStop(0.5, "white");
    // this.gradient.addColorStop(1, "pink");

    this.particles.forEach((particle) => particle.reset());
  }
}
