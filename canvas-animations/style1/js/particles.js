function createParticles(draw) {
  let mouse = null;
  let count = 0;
  let particles = [];

  function loadParticles() {
    let xGrid = window.innerWidth/config.particles.gridGap>>0;
    let yGrid = window.innerHeight/config.particles.gridGap>>0;
    count = xGrid*yGrid;
    count = Math.max(config.particles.particleRange[0], count);
    count = Math.min(config.particles.particleRange[1], count);
    console.log(count);
    for(let i = 0; i < count; i++) {
      let particle = getParticle(draw);
      particle.setY((Math.random()*window.innerHeight)>>0);
      particles.push(particle);
    }
  }

  function loadMouse() {
    mouse = getParticle(draw);
    mouse.setRadius(0);
    document.body.addEventListener('mousemove', (event) => {
      mouse.setX(event.clientX);
      mouse.setY(event.clientY + window.pageYOffset);
    });
  }

  function getConnectionStrength(p1, p2) {
    let dx = Math.abs(p1.getX() - p2.getX());
    let dy = Math.abs(p1.getY() - p2.getY());
    let dm = Math.max(dx, dy);
    return Math.max(1 - dm/config.particles.maxConnectionDistance, 0);
  }

  function loadConnections() {
    particles.forEach((p1, i) => {
      particles.forEach((p2, j) => {
        let globalAlpha = getConnectionStrength(p1, p2);
        if(globalAlpha > 0 && i != j) {
          let type = 'line';
          let position = [[p1.getX(), p1.getY()], [p2.getX(), p2.getY()]];
          let fillStyle = config.color.light;
          globalAlpha /= config.particles.connectionFadeFactor;
          draw(type, position, fillStyle, globalAlpha);
        }
      });
      let type = 'line';
      let position = [[p1.getX(), p1.getY()], [mouse.getX(), mouse.getY()]];
      let fillStyle = config.color.light;
      let globalAlpha = getConnectionStrength(p1, mouse);
      globalAlpha /= config.particles.connectionFadeFactor;
      draw(type, position, fillStyle, globalAlpha);
    });
  }

  function update(frame) {
    while(particles.length < count) { particles.push(getParticle(draw)); }
    loadConnections();
    particles.forEach(particle => particle.update());
    particles = particles.filter(particle => particle.isActive());
  }

  function addParticle() {
    particles.push(getParticle(draw));
  }

  loadMouse();
  loadParticles();

  return { update: update };
}
