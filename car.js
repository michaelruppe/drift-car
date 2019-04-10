class Car {
  constructor() {
    this.d = createVector(width/2, height/2);
    this.v = createVector(0,0);
    this.a = createVector(0,0);
    this.damping = createVector(0, 0);
    this.angle = 0;
    this.turnRate = 0.1;
    this.f = 1;
    this.m = 5;

    this.w = 18;
    this.l = 30

  }

  centreOnCar() {
    push(); translate(this.d.x, this.d.y); rotate(this.angle);
  }

  show() {
    rectMode(CENTER);
    this.centreOnCar();
    rect(0,0, this.w, this.l);
    rect(0, this.l/2, 2,2)
    pop();
  }

  update() {
    // Add input forces
    if (keyIsPressed) {
      // ACCELERATING (BODY-FIXED to WORLD)
      if (keyIsDown(UP_ARROW)) {
        let bodyAcc = createVector(0,0.2);
        let worldAcc = this.vectBodyToWorld(bodyAcc, this.angle);
        this.a.add(worldAcc);
      }
      // BRAKING (BODY-FIXED TO WORLD)
      if (keyIsDown(DOWN_ARROW)) {
        let bodyAcc = createVector(0,-0.2);
        let worldAcc = this.vectBodyToWorld(bodyAcc, this.angle);
        this.a.add(worldAcc);
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.angle -= this.turnRate;

      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.angle += this.turnRate;
      }
    }


    // Car steering and drifting physics
    let bodyFixedVelocity = this.vectWorldToBody(this.v, this.angle);
    // purely air resistance and axial drag
    let bodyFixedDrag = createVector(bodyFixedVelocity.x * -2, bodyFixedVelocity.y * 0.05);
    // let bodyFixedDrift = createVector(bodyFixedVelocity.x * 0.3, 0)
    // bodyFixedDrag.add(bodyFixedDrift);
    let worldFixedDrag = this.vectBodyToWorld(bodyFixedDrag, this.angle)
    this.a.add(worldFixedDrag.div(this.m)); // Include inertia

    // Physics Engine
    // this.a.add(this.damping);
    this.angle = this.angle % TWO_PI; // Clamp angle to one revolution
    this.v.add(this.a);

    // Fix numerical problems - tiny rounding errors accumulating. Can also think of this as static friction
    // if (abs(this.v.x) < 1e-2) this.v.x = 0;
    // if (abs(this.v.y) < 1e-2) this.v.y = 0;

    this.d.add(this.v);
    this.a = createVector(0,0);
    this.damping = createVector(0,0);
  }


  // Body to world rotation
  vectBodyToWorld(vect, ang) {
    let v = vect.copy();
    let vn = createVector(
      v.x * cos(ang) - v.y * sin(ang),
      v.x * sin(ang) + v.y * cos(ang)
    );
    return vn;
  }

  // Body to world rotation
  vectWorldToBody(vect, ang) {
    let v = vect.copy();
    let vn = createVector(
      v.x * cos(ang) + v.y * sin(ang),
      v.x * sin(ang) - v.y * cos(ang)
    );
    return vn;
  }


}
