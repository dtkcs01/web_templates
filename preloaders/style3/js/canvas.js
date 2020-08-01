function addCanvas(){
  const constants = getConstants();
  var canvas = document.createElement('canvas');
  var width = window.innerWidth;
  var height = window.innerHeight;
  var context = null;
  var center = null;
  var astroids = null;
  var frame = 0;

  function initCanvas(){
    let style = '';
    let css = constants.canvas.css;
    for(let key in css) { style += `${ key }: ${ css[key] };`; }
    canvas.setAttribute('style', style);
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    var interval = setInterval(function () {
      if(frame == 0) {
        canvas.width = width = window.innerWidth;
        canvas.height = height = window.innerHeight;
        context.clearRect(0, 0, width, height);
        center.update(context, width/2>>0, height/2>>0);
      }
      astroids.update();
      frame = (frame + 1)%constants.center.refreshRate;
    }, constants.canvas.frameRate);
    center = createCenter(draw);
    astroids = createAstroids(draw);
  }

  function draw(type, position, fillStyle = '#FFFFFF', globalAlpha = 1, filter) {
    context.save();
    context.beginPath();
    if(filter) { context.filter = filter; }
    context.fillStyle = fillStyle;
    context.globalAlpha = globalAlpha;
    if(type == 'circle') { context.arc(...position); context.fill(); }
    else if(type == 'rectangle') { context.fillRect(...position); }
    context.closePath();
    context.restore();
  }

  initCanvas();
}

addCanvas();
