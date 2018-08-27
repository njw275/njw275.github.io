

var ball;
var canDragBall = false;
var canDrag = false;

function setup() {
  img = loadImage("cv.png");
  var cnv = createCanvas(400, 80);
  cnv.parent('draggingHolder');
  ball = new Ball();
}

function draw() {
  // background(255);
  background('rgba(40,232,243, 0)')
  // background('rgba(40,232,243, 0.1)');
  // fill(40,242,130);
  // noStroke();
  // rect(0,0,109,80);
  //
  // fill(243,17,91);
  // noStroke();
  // rect(288,0,120,80);

  stroke(0);
  fill(0);
  ball.display();

}

function mousePressed(){
  if(ball.x-12.5 < mouseX && mouseX < ball.x+12.5 && ball.y-12.5 < mouseY && mouseY < ball.y+12.5){
    canDrag = true;
  }
}

function mouseReleased(){
  canDrag = false;
  var ballxprev = ball.x;
  ball.x = width/2;
  ball.y = height/2;

  if(ballxprev < ((width/2)/3)){
    console.log("LEFT");
    window.open("SoftEng-CV.pdf");
  }
  else if(ballxprev > (width*(2/3))){
    console.log("RIGHT");
      window.open("Creative-CV.pdf");
  }
  else{
    console.log("idk");
  }
  clear();

}

function mouseDragged() {
  if (canDrag){
    clear();
    ball.x = mouseX
    ball.y = mouseY;
  }
}



function Ball() {
  this.x = width/2;
  this.y = height/2;


  // Draw the ball
  this.display = function() {
    // ellipse(this.x,this.y,25,25);
    imageMode(CENTER);
    image(img,this.x,this.y, img.width/25, img.height/25);
  }
}
