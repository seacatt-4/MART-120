<html>
  <head>
    <title>
            Homework 11
        </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"></script>
  </head>
    var playerX = 21;
var playerY = 22;

var w = 87; 
var s = 83;
var a = 65;
var d = 68;

var bigBlock = 15;
var lilBlock = 380;

var bigMove;
var lilMove;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(50, 800, 200);
  stroke(0);
  fill(0);
  
  var bigMove = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
  var lilMove = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
  
   bigBlock += bigMove;
  lilBlock -= lilMove;
  
  //player
  strokeWeight (0);
  fill ('pink');
  circle(playerX, playerY, 20);
  
  
  //signs
   fill('magenta');
  strokeWeight(0);
  
  
  //this way
   fill('magenta');
  rect (18, 54, 90, 20);
  triangle (7, 65, 31, 40, 31, 86);
   fill('blue');
  text("T H I S  W A Y ! ! ", 15, 68)
  
  
  //that way
   fill('magenta');
  rect (260, 240, 80, 40);
  triangle (380, 260, 320, 220, 320, 305);
  fill('blue');
  text ("T H A T  W A Y ! !", 270, 265)
  
  
  //the exit
   fill('magenta');
  rect (50, 340, 130, 10);
  triangle (40, 347, 65, 320, 65, 370);
  fill('blue');
  text ("T H E  E X I T !", 65, 349.2);
  
    //objects
  fill('green');
  square (lilBlock, 345, 5);
  fill('orange');
  square (bigBlock, 235, 50);
  
  if (bigBlock > width) {
    bigBlock = 0;
  }
  if (lilBlock < 0) {
    lilBlock = 400;
  }
  
  
  if (keyIsDown(w))
    {
    playerY -= 5;
    }
  if (keyIsDown(a))
  {
    playerX -= 5;
  }
  if (keyIsDown(s))
  {
    playerY += 5;
  }
  if (keyIsDown(d))
    {
      playerX += 5;
    }

    
  
}



</html>