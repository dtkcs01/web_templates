function addCanvas(){
  const constants = getConstants();
  var canvas = document.createElement('canvas');
  var width = window.innerWidth;
  var height = window.innerHeight;
  var context = null;
  var center = createCenter();

  function initCanvas(){
    let style = '';
    let css = constants.canvas.css;
    for(let key in css) { style += `${key}: ${css[key]};`; }
    canvas.setAttribute('style', style);
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    var interval = setInterval(function () {
      let boundingBox = canvas.getBoundingClientRect();
      let x = boundingBox.width;
      let y = boundingBox.height;
      context.clearRect(0, 0, x, y);
      center.draw(context, x/2>>0, y/2>>0);
    }, 100);
  }

  initCanvas();
}

addCanvas();
