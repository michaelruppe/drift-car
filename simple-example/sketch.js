// Example of using the Car class

let car;

function setup() {
  createCanvas(600,600);
  frameRate(60);

  car = new Car();
}

function draw() {
  background(127);

  car.update();
  car.show();


  // Keep car onscreen. Car displacement (position) is stored in vector: car.d
  if(car.d.x > width){
    car.d.x = 0;
  } else if(car.d.x < 0) {
    car.d.x = width;
  }
  if(car.d.y > height) {
    car.d.y = 0;
  } else if(car.d.y < 0) {
    car.d.y = height;
  }

}
