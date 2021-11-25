var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;
var player1,player2;

var gameState=0;
var database;
var player, form,game;

var playerCount = 0;
var allPlayers;
var bulletGroup;
var players;
var bullet;
var life=3;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  bulletGroup = new Group()
  zombieGroup = new Group()
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  

}

function draw() {
  background(bgImg); 
  if (playerCount === 2) {
    game.update(1);
  }
  if (gameState === 1) {
    clear(); 
    game.play();
  }
  if (gameState === 2) {  
    game.end();
  }
}
