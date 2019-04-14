# Drift Car

Try the car out for yourself! [Demo](https://raw.githubusercontent.com/michaelruppe/drift-car/example/index.html)

A car class with somewhat realistic-looking friction mechanics.
Switches lateral friction from static to dynamic depending on body-fixed velocity.

This isn't _technically_ drifting: where the rear slip angle is less than the front, wheels pointed out-of-turn. I just needed to call it something.

Car isn't non-holonomic - it can still spin on the spot. If you fix this, issue a pull request!
