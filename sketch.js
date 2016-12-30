var fsxManager;
var gravityConstant;

function setup() {

  createCanvas(1920, 1080);

  fsxManager = new FsxManager();

  gSlider = createSlider(0, 1000, 1);

  for(var i =0; i < 50; i++) {
    x = random(width);
    y = random(height);
    r = random(15, 30);
    color = {r: random(255), g: random(255), b: random(255)};
    fsxManager.createObject(x, y, r, color);
  }
}

function draw() {
  gravityConstant = gSlider.value() / 100;
  background(0);
  fsxManager.update(gravityConstant);
  fsxManager.draw();
}
