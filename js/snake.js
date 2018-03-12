//Defining variables.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Get width and height from the canvas element
var width = canvas.width;
var height = canvas.height;

//Work out the width and height in blocks
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

//Set the score to 0
var score = 0;

//Draw the border
var drawBorder = function() {
  ctx.fillStile = "Gray";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};

//Draw the score in the top-left corner
var drawSCore = function() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, blockSize, blockSize);
};

//Clear the interval and display Game Over text
var gameOver = function() {
  clearIntervar(intervalId);
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over", width / 2, height / 2);
};

//Draw a circle
var circle = function(x, y, radius, fillCircle){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
      ctx.fill();
    }  else {
      ctx.stroke();
    }
};

//The block constructor
var Block = function(col, row) {
  this.col = col;
  this.row = row;
};

//Draw a square at the block's location
Block.prototype.drawSquare = function(color) {
  var x = this.col * blockSize;
  var y = this.col * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

//Draw a circle at the block's location
Block.prototype.drawCircle = function(color) {
  var centerX = this.col * blockSize + blockSize / 2;
  var centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};

//Check if this block is in tje same location as another block
Block.prototype.equal = function(otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

//The snake constructor
var Snake = function() {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];

  this.direction = "right";
  this.nextDirection = "right"
};

//Draw a square for each segment of the snake's body
Snake.prototype.draw = function() {
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("Blue");
  }
};

//Create a new head and add it to the beginning of the
//snake to move the snake in it's current direction
 Snake.prototype.move = function() {
   var head = this.segments[0];
   var newHead;

   this.direction = this.nextDirection;

   if(this.direction === "right") {
     newHead = newBlock(head.col + 1, head.row);
   } else if (this.direction === "down") {
     newHead = new Block(head.col, head.row + 1);
   } else if (this.direction === "left") {
     newHead = new Block(head.col -1, head.row);
   } else if (this.direction === "up") {
     newHead = new Block(head.col, head.row -1);
   }

   if (this.checkCollision(newHead)) {
     gameOver();
     return;
   }

   this.segments.unshift(newHead);

   if(newHead.equal(apple.position)) {
     score++;
     apple.move();
   } else {
     this.segments.pop();
   }
 };

 //Check if the snake's new head has collided with the wall of itself
 Snake.prototype.checkCollision = function(head) {
   var leftCollision = (head.col === 0);
   var topCollision = (head.row === 0);
   var rightCollision = (head.col === widthInBlocks -1);
   var bottomCollision = (head.row === heightInBlocks -1);

   var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

   var selfCollision = false;

   for (var i = 0; i < this.segments.length; i++) {
     if (head.equal(this.segments[i])) {
       selfCollision = true;
     }
   }
   return wallCollision || selfCollision;
 };

 //Set the snake's next direction based on the keyboard
 Snake.prototype.setDirection = function(newDirection) {
   if (this.diection === "up" && newDirection === "down") {
     return;
   } else if (this.direction === "right" && newDirection === "left") {
     return;
   } else if (this.direction === "down" && newDirection === "up") {
     return;
   } else if (this.direction === "left" && newDirection === "right") {
     return;
   }
   this.newDirection = newDirection;
 }
