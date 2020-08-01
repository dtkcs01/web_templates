/*
  function initialize() {
    // constants.js module
    // particle.js module
    // particles.js module
    // canvas.js module
  }
*/

function initialize() {
  const config = {
    'color': {
      'dark': '#2C2C2C',
      'light': '#FFFFFF',
      'primary': '#00FFFF'
    },
    'canvas': {
      'css': {
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'background-color': '#2C2C2C'
      },
      'refreshRate': 50
    },
    'particles': {
      'gridGap': 100,
      'incrementFactor': 25,
      'connectionFadeFactor': 1.5,
      'particleRange': [50, 150],
      'maxConnectionDistance': 150
    },
    'particle': {
      'upSpeedLimit': 3,
      'sidewaySpeedLimit': 5,
      'maxRadius': 3
    }
  }

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

  function loadCanvas() {
    let canvas = document.createElement('canvas');
    let ctx = null;
    let particles = null;

    function loadCSS() {
      let style = '';
      let css = config.canvas.css
      for(let key in css){ style += `${ key }: ${ css[key] };` }
      canvas.setAttribute('style', style);
    }

    function draw(type, position, fillStyle = '#FFFFFF', globalAlpha = 1, filter) {
      ctx.save();
      ctx.beginPath();
      if(filter) { ctx.filter = filter; }
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = fillStyle;
      ctx.globalAlpha = globalAlpha;
      if(type == 'circle') { ctx.arc(...position); ctx.fill(); }
      else if(type == 'line') { ctx.moveTo(...position[0]); ctx.lineTo(...position[1]); ctx.stroke(); }
      ctx.closePath();
      ctx.restore();
    }

    function update() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.update();
    }

    function init() {
      loadCSS();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
      document.body.insertBefore(canvas, document.body.childNodes[0]);
      particles = createParticles(draw);
      setInterval(update, config.canvas.refreshRate);
    }

    init();
  }

  loadCanvas();
}
