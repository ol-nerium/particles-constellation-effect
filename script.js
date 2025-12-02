import Effect from "./effect.js";

window.addEventListener("load", () => {
  // setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  ctx2.strokeStyle = "blue";
  ctx2.lineWidth = 3;

  const effect = new Effect(canvas, ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.05)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // could work but unnecessary with css blur

    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx, ctx2);
    requestAnimationFrame(animate);
  }
  animate();
});
