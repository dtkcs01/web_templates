function createPoint() {
  var A = 120;
  var d = 30;
  var t = (Math.random()*360)>>0;
  var speed = ((Math.random()*2)>>0) + 1;
  const constants = getConstants();

  function draw(ctx, x, y) {
    let nx = x + A*Math.sin((t*Math.PI)/180) - 4*d*Math.cos((t*Math.PI)/180);
    let ny = y + A*Math.cos((t*Math.PI)/180) - 2*d*Math.cos((t*Math.PI)/180);
    if((t < 180 || t > 270) || (Math.pow(nx-x, 2) + Math.pow(ny-y, 2) > Math.pow(constants.center.radius, 2))) {
      circle(ctx, nx, ny);
    }
    update();
  }

  function circle(ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.arc(x, y, 1, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  function update(x, y) {
    t = (t+speed)%360;
  }

  return {
    draw: draw
  };
}
