function createPoint(path, initialT, draw) {
  const constants = getConstants();
  const radius = constants.point.radius;
  const colour = constants.canvas.colour;
  var t = initialT;
  const speed = initialT%2? 1: 2;

  function update(ctx, x, y) {
    let nx = x + path[t][0];
    let ny = y + path[t][1];
    if((path[t][0] < path[(t+1)%360][0]) || (Math.pow(nx-x, 2) + Math.pow(ny-y, 2) > Math.pow(constants.center.radius, 2))) {
      let type = 'rectangle';
      let position = [nx, ny, radius, radius];
      let fillStyle = colour.light;

      draw(type, position, fillStyle);
    }
    t = (t + speed)%360;
  }

  return {
    update: update
  };
}
