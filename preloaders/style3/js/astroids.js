function createAstroids(draw) {
  const constants = getConstants();
  let astroids = [];
  let frame = 0;

  function update() {
    if(frame == 0) { astroids.push(createAstroid(draw)); }
    astroids.forEach(astroid => astroid.update());
    astroids = astroids.filter(astroid => astroid.isActive());
    frame = (frame + 1)%constants.astroids.spawnGap;
  }

  return { update: update };
}
