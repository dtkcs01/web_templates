function createCenter() {
  const constants = getConstants();
  var radius = constants.center.radius;
  var delta = constants.center.delta;
  var direction = 1;
  var points = [];
  for(let i = 0; i < 100; i++) { points.push(createPoint()); }

  function draw(ctx, x, y) {
    planet(ctx, x, y);
    shadow(ctx, x, y);
    darkglar(ctx, x, y);
    glar(ctx, x, y);
    points.forEach(point => point.draw(ctx, x, y));
  }

  function glar(ctx, x, y) {

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.filter = `blur(${constants.center.radius/4}px)`;
    ctx.globalAlpha = 0.5;
    ctx.arc(x - constants.center.radius/3, y - constants.center.radius/3, constants.center.radius/2, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  function darkglar(ctx, x, y) {

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#1C1C1C';
    ctx.filter = `blur(${constants.center.radius/4}px)`;
    ctx.globalAlpha = 0.5;
    ctx.arc(x + constants.center.radius/3, y + constants.center.radius/3, constants.center.radius/2, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  function shadow(ctx, x, y) {
    var grd = ctx.createLinearGradient(x - constants.center.radius, y - 2*constants.center.radius, x, y + constants.center.radius/2);
    grd.addColorStop(0, constants.center.fillStyle);
    grd.addColorStop(1, "#2C2C2C");

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.globalAlpha = 0.7;
    ctx.arc(x, y, radius, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  function planet(ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = constants.center.fillStyle;
    ctx.globalAlpha = 0.7;
    ctx.arc(x, y, radius-10, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  function update() {
    radius += direction;
    if(constants.center.radius + delta <= radius) { direction = -1; }
    else if(constants.center.radius - delta >= radius) { direction = 1;}
  }

  return {
    draw: draw
  };
}
