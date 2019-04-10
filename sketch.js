let car;

function setup() {
  let canvas = createCanvas(600,600);
  canvas.parent('sketch-holder');
  car = new Car();

}

function draw() {
  background(127);

  car.update();
  car.show();

}
