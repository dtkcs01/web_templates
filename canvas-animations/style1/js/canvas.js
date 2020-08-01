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

  return { init: init };
}

loadCanvas().init();
