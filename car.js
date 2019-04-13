class Car {
  constructor() {
    this.d = createVector(width/2, height/2);
    this.v = createVector(0,0);
    this.a = createVector(0,0);
    this.damping = createVector(0, 0);
    this.angle = 0;
    this.turnRateStatic = 0.1;
    this.turnRateDynamic = 0.8 * this.turnRateStatic;
    this.turnRate = this.turnRateStatic;
    this.f = 1;
    this.m = 5;

    this.w = 18;
    this.l = 30

    this.DRIFT_CONSTANT = 1.5;

  }

  show() {
    rectMode(CENTER);
    push(); translate(this.d.x, this.d.y); rotate(this.angle);
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

    let bodyFixedDrag;
    if ( abs(bodyFixedVelocity.x) < this.DRIFT_CONSTANT ) {
      // Gripping
      bodyFixedDrag = createVector(bodyFixedVelocity.x * -2, bodyFixedVelocity.y * 0.05);
      this.turnRate = this.turnRateStatic;
    } else {
      // Drifting
      bodyFixedDrag = createVector(bodyFixedVelocity.x * -0.5, bodyFixedVelocity.y * 0.05);
      this.turnRate = this.turnRateDynamic;
    }




    let worldFixedDrag = this.vectBodyToWorld(bodyFixedDrag, this.angle)
    this.a.add(worldFixedDrag.div(this.m)); // Include inertia

    // Physics Engine
    this.angle = this.angle % TWO_PI; // Clamp angle to one revolution
    this.v.add(this.a);

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
