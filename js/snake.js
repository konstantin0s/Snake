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
