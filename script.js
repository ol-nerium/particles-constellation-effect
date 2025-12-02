import Effect from "./effect.js";

window.addEventListener("load", function () {
  // setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.strokeStyle = "white";

  const effect = new Effect(canvas, ctx);
  effect.handleParticles(ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
