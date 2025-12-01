import Effect from "./effect.js";

// setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const effect = new Effect(canvas, ctx);

let opacity = 0.1;
let direction = 1;
function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  opacity -= 0.0005 * direction;
  if (opacity < 0) {
    opacity = 0;
    direction = -1;
  }
  if (opacity > 0.1) {
    direction = 1;
  }

  ctx.fillStyle = `rgba(0,0,0, ${Math.floor(opacity * 1000) / 1000})`;

  console.log(ctx.fillStyle);

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();

export { ctx };
