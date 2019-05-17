// Example use of the Car class. Leaves a colour-coded trail behind
// the car to indicate when it was sliding.


let car;
let trail = []; // Leave a trail behind the car
const TRAIL_LENGTH = 100;

function setup() {
  let canvas = createCanvas(600,600);
  canvas.parent('sketch-holder');
  frameRate(60);

  car = new Car(width/2, 20, 0);
}

function draw() {
  background(127);

  car.update();

  // Change car colour when drifting
  let nowDrifting = car.isDrift()
  if(nowDrifting) {
    car.col = color(255,100,100);
  } else {
    car.col = color(255, 255, 255);
  }

  car.show();

  // Save the current location, AND drift state as an object
  // to trail. That way we can do cool things when we render
  // the trail.
  trail.push({
    position: car.getPos(),  // A vector(x,y)
    drifting: nowDrifting, // true / false
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


// Prevent arrow-keys and spacebar from scrolling the page.
window.addEventListener("keydown", (key) => {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(key.keyCode) > -1) {
        key.preventDefault();
    }
}, false);
