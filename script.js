import Effect from "./effect.js";

window.addEventListener("load", () => {
  // setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); // x0 y0 x1 y1
  gradient.addColorStop(0, "pink");
  gradient.addColorStop(0.5, "red");
  gradient.addColorStop(1, "magenta");

  ctx.fillStyle = gradient;
  ctx.strokeStyle = gradient;

  const effect = new Effect(canvas, ctx);
  effect.handleParticles(ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
