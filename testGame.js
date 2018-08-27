


var l,c,r;
var images = [];
var goldImages = [];
var tray;

var paper;
var paper2;
var paper3;
var papers = [];
var hrWorker;
var score = 0;

var doOnce = true;

var release = false;
var goldGo = false;

var caughtGold = false;

var play = false;

function setup() {
  canvas = createCanvas(window.innerWidth/3, 500);
  canvas.parent('sketch-holder');
  paper = new Paper();
  paper2 = new Paper();
  paper3 = new Paper();
  papers.push(paper);
  papers.push(paper2);
  papers.push(paper3);
  hrWorker = new HRrep();
  l = loadImage("1white.png");
  c = loadImage("2white.png");
  r = loadImage("3white.png");
  tray = loadImage("tray.png");
  images.push(l);
  images.push(c);
  images.push(r);
  images.push(c);
  gl = loadImage("1gold.png");
  gc = loadImage("2gold.png");
  gr = loadImage("3gold.png");
  goldImages.push(gl);
  goldImages.push(gc);
  goldImages.push(gr);
  goldImages.push(gc);
  setTimeout(function(){
    release = true;
  },5000);
  // console.log(papers[0].x + " | " + (papers[0].x+15));
}

function draw(){
  if(!play){
    mainMenu();
  }
  else if (!caughtGold && play){
    playGame();
    // $(document).ready(function() {
    //   // $('.newTrigger').click();
    //
    //   $(".newTrigger").click(function(e){
    //     e.preventDefault();
    //     // e.stopPropagation();
    //     window.location.href='siteindex.html';
    //     // window.location.href = '/some/new/page';
    //     return false;
    //   });
    // });
  }
  else{
    background(0,0,255);
    if(doOnce){
      window.location.href = "Nick_White_resume.pdf";
    }
  }

}


function checkCatch(){

  for (p in papers){
    if (hrWorker.x < papers[p].x && (hrWorker.x+hrWorker.width) > (papers[p].x+15) && papers[p].y > hrWorker.y && papers[p].hasntScoredYet){
      score++;
      papers[p].hasntScoredYet = false;
    }
    // console.log("PC: " + papers[p].pictureCounter);
  }

}

function checkGoldCatch(){
  if (hrWorker.x < goldPaper.x && (hrWorker.x+hrWorker.width) > (goldPaper.x+15) && goldPaper.y > hrWorker.y && goldPaper.hasntScoredYet){
    caughtGold = true;
  }
}


function checkDistance(){

  for (p in papers){
    if(papers[p].y > papers[p].spawnHeight && papers[p].hasntMadeNewOne){
      papers.push(new Paper());
      papers[p].hasntMadeNewOne = false;
    }
    if(papers[p].y > height || !papers[p].hasntScoredYet){
    //   // papers[p] = new Paper();
      papers.splice(p,1);
    //   papers.push(new Paper());
    }
  }

}

function mousePressed(){
  if(mouseX > (width/2-95) && mouseX < (width/2+305) && mouseY > 400 && mouseY < 440){
    play = true;
  }
}


function mainMenu(){
  background(51);
  textSize(45);
  text("CV Catcher",(width/2)-125,75);
  push();
  translate(width*0.5-15, height*0.5);
  rotate(frameCount / 100.0);
  star(0, 0, 80, 100, 20);
  pop();
  image(goldImages[3], (width/2)-45, 210, 60,70);

  if(mouseX > (width/2-95) && mouseX < (width/2+305) && mouseY > 400 && mouseY < 440){
    fill(0,255,0);
  }else{
    fill(150,255,150);
  }
  noStroke();
  rect(width/2-90,400,150,40);
  fill(0);
  textSize(30);
  text("PLAY",(width/2)-55,430);
}


function playGame(){
  background(51);
  fill(255,0,0);
  for(p in papers){
    papers[p].fall();
    if(papers[p].hasntScoredYet){
      papers[p].display();
    }
  }

  textSize(20);
  text(score,10,20);
  checkCatch();

  // console.log("score: " + score);
  // console.log("hr: " + hrWorker.x + " | " + (hrWorker.x+hrWorker.width));
  checkDistance();
  if(release){
      goldPaper = new Paper("G");
      release = false;
      goldGo = true;
  }
  if(goldGo){
    goldPaper.fall();
    goldPaper.display();
    checkGoldCatch();
  }

  hrWorker.display();
  if(keyIsDown(68)){
    hrWorker.move();
  }
  else if(keyIsDown(65)){
    hrWorker.moveBack();
  }
  // console.log("Size of papers: " + papers.length);
}




// Paper class
function Paper(style) {
  this.width = 40;
  this.height = 40;
  this.x = random(width-this.width);
  this.y = random(-500,0);
  this.hasntMadeNewOne = true;
  this.hasntScoredYet = true;
  this.pictureCounter = Math.floor(random(4));
  this.spawnHeight = random(height/2);


  this.fall = function() {
    if(style == "G"){
      this.y+=2;
    }else{
      this.y++;
    }
  };

  this.display = function() {
    if(style == "G"){
      this.takeFrom = goldImages[this.pictureCounter];
    }
    else{
      this.takeFrom = images[this.pictureCounter];
    }
    image(this.takeFrom, this.x,this.y,this.width,this.height);
    if(frameCount %20 == 0){ //12
      this.pictureCounter++;
    }
    if(this.pictureCounter == 4){
      this.pictureCounter = 0;
    }
  }
};

function HRrep(){
  this.x = 25;
  this.width = 30;
  this.height = 40;
  this.y = height-(this.height);

  this.move = function() {
    this.x+=3;
  };
  this.moveBack = function() {
    this.x-=3;
  };

  this.display = function() {
    // fill(255,0,0);
    image(tray,this.x,this.y,60,40);
    // rect(this.x,this.y,this.width,this.height);
  }

}



// Function from https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
