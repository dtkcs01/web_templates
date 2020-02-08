var ANIMATION_INTERVAL = 50;
var MAX_DISTANCE = 200;
var DIRECTION_DEVIATION = 5;
var SPEED_DEVIATION = 3;
var SPAWN_GAP = 5;
var FADE_FACTOR = 3;
var STROKE_STYLE = "#FFFFFF";
var FILL_STYLE = "#00FFFF";
var RADIUS_LIMIT = 4;
var BLINK_COUNTER = 3;
var INIT_SPAWN = 75;

class Point {
  constructor(is_mouse) {
    this._mouse = is_mouse ? true : false;
    this._x = parseInt(Math.random()*10000)%window.innerWidth;
    this._sizeChange = 1;
    let tmp = parseInt(Math.random()*10)%SPEED_DEVIATION;
    this._blink_counter = 0;
    this._upSpeed = tmp ? tmp : parseInt(SPEED_DEVIATION/2);
    this._direction = parseInt(Math.random()*10)%DIRECTION_DEVIATION - parseInt(DIRECTION_DEVIATION/2);
    this._y = window.innerHeight;
    this._radius = parseInt(Math.random()*10)%RADIUS_LIMIT;
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }

  setX(x) {
    this._x = x;
  }

  setY(y) {
    this._y = y;
  }

  draw() {
    if(this._y > 0) {
      let ctx = CANVAS.context;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this._x, this._y, this._radius, 0, 2*Math.PI, false);
      ctx.fillStyle = FILL_STYLE;
      ctx.globalAlpha = this._radius/(FADE_FACTOR*RADIUS_LIMIT);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
      if(!this._mouse){
        this._y -= this._upSpeed;
        this._x += this._direction;
        if(!this._blink_counter) {
          this._radius += this._sizeChange;
        }
        this._blink_counter = (this._blink_counter + 1)%BLINK_COUNTER;
        this._sizeChange = this._radius > 0 ? this._radius >= RADIUS_LIMIT ? -this._sizeChange : this._sizeChange : -this._sizeChange;
        this._direction = this._x > 0 ? this._x > window.innerWidth ? -this._direction : this._direction : -this._direction;
      }
      return true;
    }
    return false;
  }
}

var loadPoints = function() {
  CANVAS.mousePointer = new Point(true);
  CANVAS.points.push(CANVAS.mousePointer);
  document.body.addEventListener("mousemove", function(e) {
    var x = e.clientX;
    var y = e.clientY;
    CANVAS.mousePointer.setX(x);
    CANVAS.mousePointer.setY(y + window.pageYOffset);
    CANVAS.points.includes(CANVAS.mousePointer) ? "" : CANVAS.points.push(CANVAS.mousePointer);
  });
  for (var i = 0; i < INIT_SPAWN; i++){
    let point = new Point();
    point.setY(parseInt((Math.random())*10000)%window.innerHeight);
    CANVAS.points.push(point);
  }
}

var CANVAS = {
  canvas : document.createElement("canvas"),
  points : [],
  counter : 0,
  init : function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.backgroundColor = "#1C1C1C";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    document.getElementById("canvas-bg").appendChild(this.canvas);
    loadPoints();
    this.interval = setInterval(update, ANIMATION_INTERVAL);
  },
  stopAnimation : function() {
    clearInterval(this.interval);
  },
  wipe : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
};

function drawPoints(point) {
  return point.draw();
}

function drawLines() {
  CANVAS.points.forEach((point1, i) => {
    CANVAS.points.forEach((point2, i) => {
      let ctx = CANVAS.context;
      let x_dist = Math.abs(point1.getX() - point2.getX());
      let y_dist = Math.abs(point1.getY() - point2.getY());
      if(x_dist < MAX_DISTANCE && y_dist < MAX_DISTANCE){
        let p_x = x_dist/MAX_DISTANCE;
        let p_y = y_dist/MAX_DISTANCE;
        let p = (1-p_x)*(1-p_y)/FADE_FACTOR;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(point1.getX(), point1.getY());
        ctx.lineTo(point2.getX(), point2.getY());
        ctx.strokeStyle = STROKE_STYLE;
        ctx.globalAlpha = p;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    });
  });
}

var update = function() {
  CANVAS.wipe();
  CANVAS.points = CANVAS.points.filter(drawPoints);
  drawLines();
  if(!CANVAS.counter){
    CANVAS.points.push(new Point(false));
  }
  CANVAS.counter = (CANVAS.counter + 1)%SPAWN_GAP;
}

window.addEventListener('DOMContentLoaded', (event) => {
    CANVAS.init();
});
