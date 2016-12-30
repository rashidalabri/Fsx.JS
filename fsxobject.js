function FsxObject(x, y, r, color) {

  this.r = r;
  this.cur_r = 0;
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();

  this.visible = true;

  this.color = color;

  this.mass = 2 * PI * this.r;

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.setMag(0);

    this.pos.x = constrain(this.pos.x, this.r, width - this.r);
    this.pos.y = constrain(this.pos.y, this.r,  height - this.r);
  };

  this.draw = function() {
    if(this.visible) {
      this.cur_r = lerp(this.cur_r, this.r, 0.2);
      fill(this.color.r, this.color.g, this.color.b);
      strokeWeight(10);
      stroke(this.color.r, this.color.g, this.color.b, 70);
      ellipse(this.pos.x, this.pos.y, this.cur_r*2);
    }
  };

  this.applyForce = function(force) {
    // F = M * A
    // A = F * 1/Ms
    this.acc.add(p5.Vector.mult(force, 1/this.mass));
  };

}
