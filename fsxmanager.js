function FsxManager() {

  this.objects = [];
  this.G = gravityConstant;

  this.createObject = function(x, y, r, color) {
    object = new FsxObject(x, y, r, color);
    this.objects.push(object);
  }

  this.draw = function() {
    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].draw();
    }
  }

  this.update = function(gravityConstant) {

    this.G = gravityConstant;

    for(var i = 0; i < this.objects.length; i++) {

      if(!this.objects[i].visible) {
        continue;
      }

      for(var j = 0; j < this.objects.length; j++) {

        if(!this.objects[j].visible) {
          continue;
        }

        // F = G * (m1 * m2) /  r^2

        m1 = this.objects[i].mass;
        m2 = this.objects[j].mass;
        distance = p5.Vector.dist(this.objects[j].pos, this.objects[i].pos);

        magnitude = this.G * ((m1 * m2) /  pow(distance, 2));
        force = p5.Vector.sub(this.objects[i].pos, this.objects[j].pos);
        magnitude = constrain(magnitude, 0, 20);
        force.setMag(magnitude);

        if(isFinite(magnitude)) {
          this.objects[j].applyForce(force);
        }

        if(distance <= this.objects[i].r + this.objects[j].r && distance !== 0) {

          var eater;

          if(this.objects[i].r > this.objects[j].r) {
            eater = i;
            gained_radius = this.objects[j].r;
            this.objects[j].visible = false;
          } else {
            eater = j;
            gained_radius = this.objects[i].r;
            this.objects[i].visible = false;
          }

          this.objects[eater].r += gained_radius;
        }

      }


      this.objects[i].update();


    }

  }

  this.applyUniversalForce = function(force) {
    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].applyForce(force);
    }
  }


}
