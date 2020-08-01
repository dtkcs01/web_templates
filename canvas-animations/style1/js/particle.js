function getParticle(draw) {
  let x = Math.random()*window.innerWidth>>0;
  let y = window.innerHeight;
  let radius = ((Math.random()*config.particle.maxRadius)>>0) + 1;
  let upSpeed = ((Math.random()*config.particle.upSpeedLimit)>>0) + 1;
  let sidewaySpeed = ((Math.random()*config.particle.sidewaySpeedLimit)>>0) + 1;
  sidewaySpeed = (Math.random()*2>>0)? sidewaySpeed: -sidewaySpeed;

  function update(isMouse = false) {

    let type = 'circle';
    let position = [x, y, radius, 0, 2*Math.PI, true];
    let fillStyle = config.color.primary;

    draw(type, position, fillStyle);
    if(!isMouse) {
      y -= upSpeed;
      x -= sidewaySpeed;
      if(x < 0 || x > window.innerWidth) { sidewaySpeed = -sidewaySpeed; }
    }
  }

  function isActive() { return y > 0; }
  function setX(nx) { x = nx; }
  function setY(ny) { y = ny; }
  function setRadius(nradius) { radius = nradius; }
  function getX(nx) { return x; }
  function getY(ny) { return y; }
  function getRadius(nradius) { return radius; }

  return {
    update: update,
    setX: setX,
    setY: setY,
    isActive: isActive,
    setRadius: setRadius,
    getRadius: getRadius,
    getX: getX,
    getY: getY
  };
}
