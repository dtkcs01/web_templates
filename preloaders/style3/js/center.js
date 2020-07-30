function createCenter(draw) {
  const constants = getConstants();
  const radius = constants.center.radius;
  const colour = constants.canvas.colour;
  var points = [];

  function addPoints() {
    const pointsCount = constants.center.pointsCount;
    const pathAmplitude = constants.point.pathAmplitude;
    const pathDeviation = constants.point.pathDeviation;
    const path = [];
    const diff = 360/pointsCount>>0;

    for(let i = 0; i < 360; i++) {
      let t = (i*Math.PI)/180;
      let x = pathAmplitude*Math.sin(t) - 4*pathDeviation*Math.cos(t);
      let y = pathAmplitude*Math.cos(t) - 2*pathDeviation*Math.cos(t);
      path.push([x, y]);
    }

    for(let i = 0; i < pointsCount; i++) {
      points.push(createPoint(path, i*diff, draw));
    }
  }

  function addShades(ctx, x, y) {
    let type = 'circle';
    let filter = `blur(${ constants.center.radius/4 }px)`;
    let positionLight = [x - constants.center.radius/3, y - constants.center.radius/3, constants.center.radius/2, 0, 2*Math.PI, true];
    let positionDark = [x + constants.center.radius/3, y + constants.center.radius/3, constants.center.radius/2, 0, 2*Math.PI, true];
    let globalAlpha = 0.5;
    let fillStyleLight = colour.light;
    let fillStyleDark = colour.dark;

    draw(type, positionDark, fillStyleDark, globalAlpha, filter);
    draw(type, positionLight, fillStyleLight, globalAlpha, filter);
  }

  function addAtmosphere(ctx, x, y) {
    let gradientStartX = x - 2*constants.center.radius;
    let gradientStartY = y - 2*constants.center.radius;
    let gradientEndX = x + constants.center.radius;
    let gradientEndY = y + constants.center.radius;

    let fillStyle = ctx.createLinearGradient(gradientStartX, gradientStartY, gradientEndX, gradientEndY);
    fillStyle.addColorStop(0, colour.primary);
    fillStyle.addColorStop(1, colour.dark);

    let position = [x, y, radius, 0, 2*Math.PI, true];
    let globalAlpha = 0.5;
    let type = 'circle';

    draw(type, position, fillStyle, globalAlpha);
  }

  function addPlanet(ctx, x, y) {
    let type = 'circle';
    let  position = [x, y, radius - 10, 0, 2*Math.PI, true];
    let fillStyle = colour.primary
    let globalAlpha = 0.7;

    draw(type, position, fillStyle, globalAlpha);
  }

  function update(ctx, x, y) {
    addPlanet(ctx, x, y);
    addAtmosphere(ctx, x, y);
    addShades(ctx, x, y);
    points.forEach(point => point.update(ctx, x, y));
  }

  addPoints();

  return {
    update: update
  };
}
