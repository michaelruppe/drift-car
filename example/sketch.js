// Example use of the Car class. Leaves a colour-coded trail behind
// the car to indicate when it was sliding.


let car;
let trail = []; // Leave a trail behind the car
const TRAIL_LENGTH = 100;

function setup() {
  createCanvas(600,600);
  frameRate(60);

  car = new Car();
}

function draw() {
  background(127);

  car.update();
  car.show();

  // Save the current location, AND drift state as an object
  // to trail. That way we can do cool things when we render
  // the trail.
  trail.push({
    position: car.getPos(),  // A vector(x,y)
    drifting: car.isDrift(), // true / false
  });

  // Delete the oldest car position if the trail is long enough.
  if (trail.length > TRAIL_LENGTH) trail.splice(0,1);

  // Render the car's trail. Change color of trail depending on whether
  // drifting or not.
  stroke(255); strokeWeight(3); noFill();
  for (let p of trail){
    // Colour the trail to show when drifting
    if(p.drifting) {
      stroke(255,100,100);
    } else {
      stroke(255);
    }
    point(p.position.x, p.position.y);
  }


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
