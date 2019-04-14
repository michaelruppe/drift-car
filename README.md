# Drift Car

Try the car out for yourself! Control the [demo](https://michaelruppe.github.io/drift-car/example/index.html) with arrow keys.

A car class with somewhat realistic-looking friction mechanics.


Using the class is easy! Copy _car.js_ into your p5 project directory and create a car in your script:
```javascript
car = new Car(); // Initialises car in the middle of the canvas.
// OR
car = new Car(x, y, angle); // Initialises car with desired location, angle
```
you need to call the following once every loop through `draw()` .
```javascript
car.update(); // simulates the car
car.show();   // renders the car
```

---

This class is a slight improvement on using the classic slidey-spaceship as a car vehicle. It doesn't come close to an accurate representation of vehicle steering - for one thing, the car can turn in place! While it's possible to implement a [more accurate model](http://planning.cs.uiuc.edu/node695.html), you lose the fun of being able to directly control angle-rate by pressing arrow keys. More accurate models of vehicle dynamics use *steering angle* as an input for control. Since all we have are on/off keys on a keyboard, this wouldn't be much fun to control.
