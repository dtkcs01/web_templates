function createAstroid(draw) {
  const constants = getConstants();
  let x = 0;
  let y = 0;
  if(Math.random()*2>>0) { x = Math.random()*window.innerWidth>>0; }
  else { y = Math.random()*window.innerHeight>>0; }

  function update(){
    let type = 'rectangle';
    let position = [x, y, 1, 1];
    let fillStyle = constants.canvas.colour.light;

    draw(type, position, fillStyle);
    x += 1;
    y += 1;
  }

  function isActive() {
    return x < window.innerWidth && y < window.innerHeight;
  }

  return {
    update: update,
    isActive: isActive
  };
}
