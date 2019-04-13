let car;

function setup() {
  let canvas = createCanvas(600,600, WEBGL);
  canvas.parent('sketch-holder');
  car = new Car();

}

function draw() {
  translate(-width/2, -height/2, 0);
  frameRate(60);
  background(127);

  car.update();
  car.show();

}
